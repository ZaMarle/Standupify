using System.Security.Claims;
using api.Infrastructure;
using api.Infrastructure.Entities;
using api.Infrastructure.Repos;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;
[Route("[controller]")]
public class TeamsController : Controller
{
    private readonly ILogger<TeamsController> _logger;
    private readonly VevousDbContext _vevousDbContext;

    public TeamsController(ILogger<TeamsController> logger, VevousDbContext vevousDbContext)
    {
        _logger = logger;
        _vevousDbContext = vevousDbContext;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateTeam([FromBody] CreateTeamFormDto createTeamFormDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        if (string.IsNullOrEmpty(userId))
        {
            return Unauthorized("User not authenticated.");
        }

        System.Console.WriteLine(userId);

        using var transaction = await _vevousDbContext.Database.BeginTransactionAsync();

        try
        {
            var team = new Team(createTeamFormDto.TeamName, createTeamFormDto.Description, int.Parse(userId));
            await _vevousDbContext.AddAsync(team);
            await _vevousDbContext.SaveChangesAsync();

            await transaction.CommitAsync();

            return Ok();
        }
        catch (Exception)
        {
            // throw;
            return BadRequest();
        }
    }
}