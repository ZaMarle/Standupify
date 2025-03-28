using api.Infrastructure.Entities;
using api.Models;

namespace api.Infrastructure;
public interface ITeamsRepository
{
    Task CreateTeam(CreateTeamFormDto CreateTeamForm);
}

public class TeamsRepository : ITeamsRepository
{
    private readonly VevousDbContext _vevousDbContext;

    public TeamsRepository(VevousDbContext vevousDbContext)
    {
        _vevousDbContext = vevousDbContext;
    }

    public async Task CreateTeam(CreateTeamFormDto createTeamFormDto)
    {
        try
        {
            var team = new Team(createTeamFormDto.TeamName, createTeamFormDto.Description);
            await _vevousDbContext.AddAsync(team);
            await _vevousDbContext.SaveChangesAsync();
        }
        catch (Exception)
        {
            throw;
        }
    }
}