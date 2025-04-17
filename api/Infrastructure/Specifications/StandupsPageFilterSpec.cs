
using api.Infrastructure.Entities;

namespace api.Infrastructure.Specifications;
public interface IStandupsPageFilterSpec
{
    public bool IsSatisfiedBy(StandupTeam standupTeam);
}
public class StandupsPageFilterSpec : IStandupsPageFilterSpec
{
    public DateTime Date { get; set; }
    public List<int> TeamIds { get; set; }
    public List<int> UserIds { get; set; }

    public StandupsPageFilterSpec(
        DateTime date,
        List<int> teamIds,
        List<int> userIds
    )
    {
        Date = date;
        TeamIds = teamIds;
        UserIds = userIds;
    }

    public bool IsSatisfiedBy(StandupTeam standupTeam)
    {
        if (standupTeam.Standup == null)
        {
            throw new ArgumentException("standupTeam Standups not set");
        }

        if (standupTeam.Standup.CreatedDate != Date && Date != default(DateTime))
        {
            return false;
        }

        if (!TeamIds.Contains(standupTeam.TeamId) && TeamIds.Count != 0)
        {
            return false;
        }

        if (!UserIds.Contains(standupTeam.Standup.CreatedById) && UserIds.Count != 0)
        {
            return false;
        }

        return true;
    }
}
