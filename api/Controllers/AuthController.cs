using api.Helper;
using api.Infrastructure;
using api.Infrastructure.Entities;
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
    public AuthController(VevousDbContext vevousDbContext, JwtService jwtService)
    {
        _vevousDbContext = vevousDbContext;
        _jwtService = jwtService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] SignInUserFormDto signInUserFormDto)
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

        var token = _jwtService.GenerateToken(user.Email);

        return Ok(token);
    }
}
