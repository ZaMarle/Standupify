using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using api.Helper;
using api.Infrastructure.Entities;
using api.Infrastructure.Specifications;
using Microsoft.EntityFrameworkCore;

namespace api.Infrastructure.Repos;

public interface IStandupRepository
{
    public Task<Result<IEnumerable<Standup>>> Get(IStandupsPageFilterSpec getStandupsSpec);
}

public class StandupRepository : IStandupRepository
{
    private readonly VevousDbContext _vevousDbContext;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ILogger<StandupRepository> _logger;
    public StandupRepository(
        VevousDbContext vevousDbContext,
        IHttpContextAccessor httpContextAccessor,
        ILogger <StandupRepository> logger)
    {
        _vevousDbContext = vevousDbContext;
        _httpContextAccessor = httpContextAccessor;
        _logger = logger;
    }

    public async Task<Result<IEnumerable<Standup>>> Get(IStandupsPageFilterSpec getStandupsSpec)
    {
        var userIdString = _httpContextAccessor?.HttpContext?.User?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        if (string.IsNullOrWhiteSpace(userIdString))
        {
            _logger.LogInformation("User id not found");
            return Result<IEnumerable<Standup>>.Err("User id not found");
        }

        var userId = int.Parse(userIdString);

        var userTeams = await _vevousDbContext.TeamsMemberships
            .Where(tm => tm.UserId == userId)
            .Select(tm => tm.TeamId)
            .ToListAsync();

        var standups = _vevousDbContext.StandupsTeams
            .Where(st => userTeams.Contains(st.TeamId))
            .Include(st => st.Standup)
            .ToList()
            .Where(st => getStandupsSpec.IsSatisfiedBy(st))
            .Select(st => st.Standup)
            .ToList();

        //var s = standups
        //    .Select(st => st.Standup)
        //    .ToList();

        return Result<IEnumerable<Standup>>.Ok(standups);

        // var userStandupIds = new List<int>();
        // foreach (var ut in userTeams)
        // {
        //     await _vevousDbContext.StandupsTeams
        //         .Where(st => st.TeamId == ut)
        //         .Select(st => st.Id)
        //         .ForEachAsync(st =>
        //         {
        //             if (!userStandupIds.Contains(st))
        //             {
        //                 userStandupIds.Add(st);
        //             }
        //         });
        // }

        // var standups = await _vevousDbContext.Standups
        //     .Where(st => userStandupIds.Contains(st.Id) && getStandupsSpec.IsSatisfiedBy(st))
        //     .ToListAsync();

        // return Result<IEnumerable<Standup>>.Ok(standups);
    }
}