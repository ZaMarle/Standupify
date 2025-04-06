using System.ComponentModel.DataAnnotations.Schema;

namespace api.Infrastructure.Entities;
public class TeamMembership
{
    public int Id { get; set; }

    [ForeignKey(nameof(Team))]  // Explicitly declare foreign key
    public int TeamId { get; set; }
    public Team? Team { get; set; }  // Navigation Property

    [ForeignKey(nameof(User))]  // Explicitly declare foreign key
    public int UserId { get; set; }
    public User? User { get; set; }  // Navigation Property

    public TeamMembership(int teamId, int userId)
    {
        TeamId = teamId;
        UserId = userId;
    }
}
