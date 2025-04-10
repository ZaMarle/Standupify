using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using api.Infrastructure;
using api.Infrastructure.Entities;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace api.Controllers;

[Route("[controller]")]
public class Standups : Controller
{
    private readonly ILogger<Standups> _logger;
    private readonly VevousDbContext _vevousDbContext;

    public Standups(ILogger<Standups> logger, VevousDbContext vevousDbContext)
    {
        _logger = logger;
        _vevousDbContext = vevousDbContext;
    }

    [Authorize]
    [HttpGet("{id}")]
    public Task<IActionResult> Get(int id)
    {
        throw new NotImplementedException();
    }

    [Authorize]
    [HttpGet("/list")]
    public Task<IActionResult> List()
    {
        throw new NotImplementedException();
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