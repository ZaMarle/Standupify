namespace api.Infrastructure.Entities;
public record Organization(int? Id, string Name, int CreatedById, DateTimeOffset? CreatedDate);