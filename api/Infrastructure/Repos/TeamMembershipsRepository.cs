using api.Infrastructure.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Infrastructure.Repos;
public interface ITeamMembershipsRepository
{
    Task<IEnumerable<TeamMembership>> GetUserMemberships(int userId);
}

public class TeamMembershipsRepository : ITeamMembershipsRepository
{
    private readonly VevousDbContext _vevousDbContext;

    public TeamMembershipsRepository(VevousDbContext vevousDbContext)
    {
        _vevousDbContext = vevousDbContext;
    }

    public async Task<IEnumerable<TeamMembership>> GetUserMemberships(int userId)
    {
        var teams = await _vevousDbContext.TeamMemberships
            .Where(tm => tm.UserId == userId)
            .Include(tm => tm.Team)
            .Include(tm => tm.User)
            .ToListAsync();

        return teams;
        // throw new NotImplementedException();
    }
}
