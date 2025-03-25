namespace api.Infrastructure.Entities;
public class Team
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int CreatedById { get; set; }
    public DateTime CreatedDate { get; set; }

    public Team(string name, string description)
    {
        Name = name;
        Description = description;
    }
}
