namespace api.Infrastructure.Entities;
public class Team
{
    public int Id { get; set; } // Auto added by sql
    public string Name { get; set; } // enforce this is set
    public string Description { get; set; } // enforce this is set
    public int CreatedById { get; set; } // enforce this is set
    public DateTime CreatedDate { get; set; } // Auto added by sql

    public Team(string name, string description, int createdById)
    {
        Name = name;
        Description = description;
        CreatedById = createdById;
    }
}
