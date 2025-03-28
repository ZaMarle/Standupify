using api.Infrastructure.Repos;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;
[Route("[controller]")]
public class TeamsController : Controller
{
    private readonly ILogger<TeamsController> _logger;
    private readonly ITeamsRepository _teamsRepository;

    public TeamsController(ILogger<TeamsController> logger, ITeamsRepository teamsRepository)
    {
        _logger = logger;
        _teamsRepository = teamsRepository;
    }

    [HttpPost]
    public async Task<IActionResult> CreateTeam([FromBody] CreateTeamFormDto createTeamFormDto)
    {
        try
        {
            await _teamsRepository.CreateTeam(createTeamFormDto);
            return Ok();
        }
        catch
        {
            return BadRequest();
        }
    }
}