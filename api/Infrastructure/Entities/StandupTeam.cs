namespace api.Infrastructure.Entities;
public class StandupTeam
{
    public int Id { get; set; }
    public int StandupId { get; set; }
    public Standup? Standup { get; set; }
    public int TeamId { get; set; }
    public Team? Team { get; set; }

    public StandupTeam(int standupId, int teamId)
    {
        StandupId = standupId;
        TeamId = teamId;
    }
}
