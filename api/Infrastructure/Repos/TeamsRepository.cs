using api.Infrastructure.Entities;
using api.Models;

namespace api.Infrastructure.Repos;
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
        using var transaction = await _vevousDbContext.Database.BeginTransactionAsync();

        try
        {
            var team = new Team(createTeamFormDto.TeamName, createTeamFormDto.Description, 1);
            await _vevousDbContext.AddAsync(team);
            await _vevousDbContext.SaveChangesAsync();


        }
        catch (Exception)
        {
            throw;
        }
    }
}