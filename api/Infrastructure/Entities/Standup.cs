using NodaTime;

namespace api.Infrastructure.Entities;
public class Standup
{
    public int Id { get; set; }
    public string Yesterday { get; set; }
    public string Today { get; set; }
    public string Blockers { get; set; }
    public DateTimeOffset CreatedDate { get; set; }
    public string CreatedDateTz { get; set; }

    public int CreatedById { get; set; }
    public User? CreatedByUser { get; set; }

    public Standup(
        string yesterday,
        string today,
        string blockers,
        int createdById,
        string createdDateTz)
    {
        Yesterday = yesterday;
        Today = today;
        Blockers = blockers;
        CreatedById = createdById;
        CreatedDateTz = createdDateTz;
    }

    public ZonedDateTime? GetCreatedDateZoned()
    {
        if (string.IsNullOrWhiteSpace(CreatedDateTz))
            return null;

        try
        {
            var zone = DateTimeZoneProviders.Tzdb[CreatedDateTz];
            var instant = Instant.FromDateTimeOffset(CreatedDate);
            return instant.InZone(zone);
        }
        catch
        {
            return null; // fallback in case of invalid tz or other error
        }
    }
}
