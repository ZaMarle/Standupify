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
    private readonly VevousDbContext _vevousDbContext;
    private readonly JwtService _jwtService;
    private static Dictionary<string, string> _refreshTokens = new(); // In-memory storage (use DB in production)

    public AuthController(VevousDbContext vevousDbContext, JwtService jwtService)
    {
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

        var passwordVerificationResult = passwordHasher.VerifyHashedPassword("", savedPasswordHash, signInUserFormDto.Password);

        if (passwordVerificationResult == PasswordVerificationResult.Failed)
        {
            System.Console.WriteLine("Password hash doesnt match");
            return BadRequest();
        }

        var token = _jwtService.GenerateToken(user.Email, user.Id);

        // Refresh token
        var refreshToken = _jwtService.GenerateRefreshToken();
        _refreshTokens[refreshToken] = signInUserFormDto.Email;
        Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions { HttpOnly = true, Secure = true });

        return Ok(token);
    }
}
