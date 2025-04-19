namespace api.Infrastructure.Entities;
public class Team
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int CreatedById { get; set; }
    public DateTimeOffset CreatedDate { get; set; }

    public Team(
        string name,
        string description,
        int createdById)
    {
        Name = name;
        Description = description;
        CreatedById = createdById;
    }
}
