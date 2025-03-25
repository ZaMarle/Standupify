namespace api.Infrastructure.Entities;
public class AuthUser
{
    public int Id { get; set; }
    public int UserId { get; set; }
    public string Password { get; set; }

    public AuthUser(int userId, string password)
    {
        UserId = userId;
        Password = password;
    }
}
