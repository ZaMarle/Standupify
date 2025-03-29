namespace api.Models;
public record CreateUserFormDto(string FirstName, string LastName, string Email, string Password, string ConfirmPassword);
