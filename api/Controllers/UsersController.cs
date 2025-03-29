using System.Text.Json;
using api.Infrastructure.Repos;
using api.Models;
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
        // if (createUserResult.IsErr()) 
        // {
        //     return BadRequest(createUserResult.);
        // }

        return createUserResult.Match<IActionResult>(
            ok: _ => Ok(),
            err: error => BadRequest(new { message = error })
        );

        // return _signUpUserCommand.Handle(userDto)
        //     .Match<ActionResult>(
        //         ok: _ => Ok(),
        //         err: BadRequest
        //     );

        // try
        // {
        //     await _usersRepository.CreateUser(createAccountForm);
        //     return Ok();
        // }
        // catch (Exception ex)
        // {
        //     if (ex.InnerException is PostgresException postgresEx && postgresEx.SqlState == "23505")
        //     {
        //         // Duplicate email error (unique constraint violation)
        //         return BadRequest("A user with this email already exists.");
        //     }

        //     // Handle other types of exceptions or rethrow
        //     return StatusCode(500, "An error occurred while processing your request.");
        // }
    }
}
