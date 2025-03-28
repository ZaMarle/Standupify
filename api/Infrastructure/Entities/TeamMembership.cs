namespace api.Infrastructure.Entities;
public class TeamMembership
{
    public int Id { get; set; }
    public int TeamId { get; set; }
    public int UserId { get; set; }

    public Team? Team { get; set; }  // Navigation Property
    public User? User { get; set; }  // Navigation Property
}
