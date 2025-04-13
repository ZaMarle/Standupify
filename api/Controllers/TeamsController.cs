using System.Security.Claims;
using System.Text.Json;
using api.Infrastructure;
using api.Infrastructure.Entities;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    [HttpGet("{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        var team = await _vevousDbContext.Teams.FindAsync(id);

        if (team == null)
        {
            return NotFound();
        }

        return Ok(team);
    }

    [Authorize]
    [HttpGet("members")]
    public async Task<IActionResult> GetTeamMemberships([FromQuery] string teams)
    {
        if (string.IsNullOrWhiteSpace(teams))
            return BadRequest("Query params 'teams' not defined");

        var teamIds = JsonSerializer.Deserialize<List<int>>(teams);
        if (teamIds == null)
            return NotFound();

        var existingTeams = await _vevousDbContext.Teams
            .Where(t => teamIds.Contains(t.Id))
            .Select(t => t.Id)
            .ToListAsync();
        if (existingTeams.Count != teamIds.Count)
            return NotFound("One or more team IDs not found");

        var teamMembers = await _vevousDbContext.TeamsMemberships
            .Where(tm => teamIds.Contains(tm.TeamId))
            .Include(tm => tm.User)
            .ToListAsync();

        return Ok(teamMembers);
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> CreateTeam([FromBody] CreateTeamFormDto createTeamFormDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrEmpty(userId))
            return Unauthorized("User not authenticated.");

        using var transaction = await _vevousDbContext.Database.BeginTransactionAsync();

        try
        {
            var team = new Team(createTeamFormDto.TeamName, createTeamFormDto.Description, int.Parse(userId));
            await _vevousDbContext.AddAsync(team);
            await _vevousDbContext.SaveChangesAsync();

            var teamMembership = new TeamMembership(team.Id, int.Parse(userId), "Owner");
            await _vevousDbContext.AddAsync(teamMembership);
            await _vevousDbContext.SaveChangesAsync();

            await transaction.CommitAsync();

            return Ok(team);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTeam(int id)
    {
        var team = await _vevousDbContext.Teams.FindAsync(id);
        if (team == null)
            return NotFound($"Unable to find team with id: {id}");

        _vevousDbContext.Teams.Remove(team);
        var rowsaffected = await _vevousDbContext.SaveChangesAsync();

        if (rowsaffected == 0)
            return StatusCode(500, "Failed to delete, please try again");

        return Ok();
    }
}