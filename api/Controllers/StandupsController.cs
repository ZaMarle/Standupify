using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Infrastructure;
using api.Infrastructure.Entities;
using api.Infrastructure.Repos;
using api.Infrastructure.Specifications;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace api.Controllers;

[Route("[controller]")]
public class StandupsController : Controller
{
    private readonly ILogger<StandupsController> _logger;
    private readonly VevousDbContext _vevousDbContext;
    private readonly IStandupRepository _standupRepository;

    public StandupsController(
        ILogger<StandupsController> logger,
        VevousDbContext vevousDbContext,
        IStandupRepository standupRepository)
    {
        _logger = logger;
        _vevousDbContext = vevousDbContext;
        _standupRepository = standupRepository;
    }

    [Authorize]
    [HttpGet("{id}")]
    public Task<IActionResult> Get(int id)
    {
        throw new NotImplementedException();
    }

    [Authorize]
    [HttpGet("items")]
    public async Task<IActionResult> GetItems(
        [FromQuery] DateTime date,
        [FromQuery] string teams,
        [FromQuery] string users)
    {
        var teamIds = System.Text.Json.JsonSerializer.Deserialize<List<int>>(teams) ?? [];
        var userIds = System.Text.Json.JsonSerializer.Deserialize<List<int>>(users) ?? [];

        var standups = await _standupRepository.Get(new StandupsPageFilterSpec(date, teamIds, userIds));

        return standups.Match<IActionResult>(
            ok: s => Ok(s),
            err: _ => BadRequest()
        );
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateStandupFormDto createStandupFormDto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? throw new Exception("Failed to find user id in claims"));

        using var transaction = await _vevousDbContext.Database.BeginTransactionAsync();

        try
        {
            var standup = new Standup(
                createStandupFormDto.Yesterday,
                createStandupFormDto.Today,
                createStandupFormDto.Blockers,
                userId);

            await _vevousDbContext.AddAsync(standup);
            await _vevousDbContext.SaveChangesAsync();

            foreach (var teamId in createStandupFormDto.TeamIds)
            {
                var standupTeam = new StandupTeam(standup.Id, teamId);
                await _vevousDbContext.AddAsync(standupTeam);
            }

            await _vevousDbContext.SaveChangesAsync();
            await transaction.CommitAsync();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
}