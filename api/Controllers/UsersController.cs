using System.Text.Json;
using api.Infrastructure.Repos;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace api.Controllers;
[Route("[controller]")]
public class UsersController : Controller
{
    private readonly ILogger<UsersController> _logger;
    private readonly IUsersRepository _usersRepository;
    private readonly ITeamMembershipsRepository _teamMembershipsRepository;

    public UsersController(
        ILogger<UsersController> logger,
        IUsersRepository usersRepository,
        ITeamMembershipsRepository teamMembershipsRepository)
    {
        _logger = logger;
        _usersRepository = usersRepository;
        _teamMembershipsRepository = teamMembershipsRepository;
    }

    [Authorize]
    [HttpGet("{id}/Teams")]
    public async Task<IActionResult> GetTeamMemberships(int id)
    {
        var teams = await _teamMembershipsRepository.GetUserMemberships(id);
        return Ok(teams);
    }

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
