namespace api.Infrastructure.Entities;
public class AuthUser
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public required string Password { get; set; }
}
