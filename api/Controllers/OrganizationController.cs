using System.Security.Claims;
using api.Infrastructure;
using api.Infrastructure.Entities;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[Route("[controller]")]
public class OrganizationController : Controller
{
    private readonly ILogger<OrganizationController> _logger;
    private readonly VevousDbContext _vevousDbContext;

    public OrganizationController(
        ILogger<OrganizationController> logger,
        VevousDbContext vevousDbContext)
    {
        _logger = logger;
        _vevousDbContext = vevousDbContext;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateOrganizationFormDto createOrganizationFormDto)
    {
        var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value
            ?? throw new Exception("Failed to find user id in claims"));

        try
        {
            var organization = new Organization(null, createOrganizationFormDto.Name, userId, null);

            await _vevousDbContext.AddAsync(organization);
            await _vevousDbContext.SaveChangesAsync();

            return Ok();
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"An error occurred: {ex.Message}");
        }
    }
}