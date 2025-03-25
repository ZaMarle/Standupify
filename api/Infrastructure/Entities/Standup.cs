using Microsoft.Extensions.Configuration.UserSecrets;

namespace api.Infrastructure.Entities;
public class Standup
{
    public int Id { get; set; }
    public string Yesterday { get; set; }
    public string Today { get; set; }
    public string Blockers { get; set; }
    public int CreatedById { get; set; }
    public DateTime CreatedDate { get; set; }

    public Standup(string yesterday, string today, string blockers)
    {
        this.Yesterday = yesterday;
        this.Today = today;
        this.Blockers = blockers;
    }
}
