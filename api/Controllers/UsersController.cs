using System.Text.Json;
using api.Infrastructure;
using api.Infrastructure.Repos;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Npgsql;

namespace api.Controllers;
[Route("[controller]")]
public class UsersController : Controller
{
    private readonly ILogger<UsersController> _logger;
    private readonly IUsersRepository _usersRepository;
    private readonly VevousDbContext _vevousDbContext;

    public UsersController(
        ILogger<UsersController> logger,
        IUsersRepository usersRepository,
        VevousDbContext vevousDbContext)
    {
        _logger = logger;
        _usersRepository = usersRepository;
        _vevousDbContext = vevousDbContext;
    }

    [Authorize]
    [HttpGet("{id}/Teams")]
    public async Task<IActionResult> GetTeamMemberships(int id)
    {
        var teams = await _vevousDbContext.TeamMemberships
            .Where(tm => tm.UserId == id)
            .Include(tm => tm.Team)
            .ToListAsync();

        return Ok(teams);
    }

    [Authorize]
    [HttpPost("Create")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserFormDto createAccountForm)
    {
        var createUserResult = await _usersRepository.CreateUser(createAccountForm);

        return createUserResult.Match<IActionResult>(
            ok: _ => Ok(),
            err: error => BadRequest(new { message = error })
        );
    }
}
