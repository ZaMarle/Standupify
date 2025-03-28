using api.Infrastructure;
using api.Models;
using Microsoft.AspNetCore.Mvc;

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

    [HttpGet("{id}/teams")]
    public async Task<IActionResult> GetTeamMemberships(int id)
    {
        var teams = await _teamMembershipsRepository.GetUserMemberships(id);
        return Ok(teams);
    }

    [HttpPost("CreateUser")]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserFormDto CreateAccountForm)
    {
        try
        {
            await _usersRepository.CreateUser(CreateAccountForm);
            return Ok();
        }
        catch
        {
            return BadRequest();
        }
    }
}