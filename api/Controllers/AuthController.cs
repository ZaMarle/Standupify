using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using api.Helper;
using api.Infrastructure;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers;
[Route("[controller]")]
public class AuthController : Controller
{
    private readonly ILogger<AuthController> _logger;
    private readonly VevousDbContext _vevousDbContext;
    private readonly JwtService _jwtService;
    private static Dictionary<string, string> _refreshTokens = new(); // In-memory storage (use DB in production)

    public AuthController(ILogger<AuthController> logger, VevousDbContext vevousDbContext, JwtService jwtService)
    {
        _logger = logger;
        _vevousDbContext = vevousDbContext;
        _jwtService = jwtService;
    }

    [HttpPost]
    public async Task<IActionResult> SignIn([FromBody] SignInUserFormDto signInUserFormDto)
    {
        var user = await _vevousDbContext.Users
            .Where(u => u.Email.Equals(signInUserFormDto.Email))
            .FirstOrDefaultAsync();

        if (user == null)
        {
            System.Console.WriteLine("User email not found");
            return BadRequest();
        }

        var passwordHasher = new PasswordHasher<string>();
        var hashedPassword = passwordHasher.HashPassword("", signInUserFormDto.Password);

        var savedPasswordHash = await _vevousDbContext.AuthUsers
            .Where(u => u.UserId == user.Id)
            .Select(u => u.Password)
            .FirstOrDefaultAsync();

        var passwordVerificationResult = passwordHasher.VerifyHashedPassword(
            "",
            savedPasswordHash,
            signInUserFormDto.Password);

        if (passwordVerificationResult == PasswordVerificationResult.Failed)
        {
            System.Console.WriteLine("Password hash doesnt match");
            return BadRequest();
        }

        var token = _jwtService.GenerateToken(user.Email, user.Id);

        // Refresh token
        var refreshToken = _jwtService.GenerateRefreshToken();
        _refreshTokens[refreshToken] = token;
        Response.Cookies.Append(
            "refreshToken",
            refreshToken,
            new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None
            });

        return Ok(token);
    }

    [HttpPost("refresh")]
    public IActionResult Refresh()
    {
        if (!Request.Cookies.TryGetValue("refreshToken", out var refreshToken))
        {
            _logger.LogInformation("refreshToken not found in cookies");
            return Unauthorized();
        }

        if (!_refreshTokens.ContainsKey(refreshToken))
        {
            _logger.LogInformation("refrashToken not found in cache");
            return Unauthorized();
        }

        var oldToken = _refreshTokens[refreshToken];
        var handler = new JwtSecurityTokenHandler();
        var token = handler.ReadJwtToken(oldToken); // Decodes the token
        var userId = token.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier")?.Value;
        var email = token.Claims.FirstOrDefault(c => c.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress")?.Value;

        if (userId == null || email == null)
        {
            return Unauthorized();
        }

        var newAccessToken = _jwtService.GenerateToken(email, int.Parse(userId));
        return Ok(new { accessToken = newAccessToken });
    }
}
