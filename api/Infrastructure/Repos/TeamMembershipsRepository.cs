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

        // Efficient style
        // var teams = _vevousDbContext.TeamMemberships
        //     .Where(x => x.UserId == userId)
        //     .Join(
        //         _vevousDbContext.Teams,
        //         tm => tm.TeamId,
        //         team => team.Id,
        //         (tm, team) => new { tm, team })
        //     .Join(
        //         _vevousDbContext.Users,
        //         tmWithTeam => tmWithTeam.tm.UserId,
        //         user => user.Id,
        //         (tmWithTeam, user) => new TeamMebershipDto{
        //             TeamId = tmWithTeam.team.Id,
        //             TeamName = tmWithTeam.team.Name,
        //             UserId = user.Id,
        //             UserName = user.Name
        //         })
        //     .ToListAsync();

        // throw new NotImplementedException();
    }
}
