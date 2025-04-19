
using api.Infrastructure.Entities;
using NodaTime;

namespace api.Infrastructure.Specifications;
public interface IStandupsPageFilterSpec
{
    public bool IsSatisfiedBy(StandupTeam standupTeam);
}
public class StandupsPageFilterSpec : IStandupsPageFilterSpec
{
    public DateTimeOffset Date { get; set; }
    public List<int> TeamIds { get; set; }
    public List<int> UserIds { get; set; }

    public StandupsPageFilterSpec(
        DateTimeOffset date,
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

        if (Date != default)
        {
            var dateStart = Date.DateTime;
            var dateEnd = dateStart.AddDays(1).AddTicks(-1);

            var start = LocalDateTime.FromDateTime(Date.DateTime);
            var end = LocalDateTime.FromDateTime(dateEnd);

            var createdDateZoned = standupTeam.Standup.GetCreatedDateZoned();
            if (createdDateZoned == null) throw new NullReferenceException("CreatedDateZoned undefined");
            var createdLocal = createdDateZoned.Value.LocalDateTime;

            if (createdLocal < start || createdLocal > end)
            {
                return false;
            }
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
