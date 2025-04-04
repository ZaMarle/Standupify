using api.Helper;
using api.Infrastructure.Entities;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Npgsql;

namespace api.Infrastructure.Repos;
public interface IUsersRepository
{
    Task<Result<Unit>> CreateUser(CreateUserFormDto createUserFormDto);
}

public class UsersRepository : IUsersRepository
{
    private readonly VevousDbContext _vevousDbContext;
    public UsersRepository(VevousDbContext vevousDbContext)
    {
        _vevousDbContext = vevousDbContext;
    }

    public async Task<Result<Unit>> CreateUser(CreateUserFormDto createUserFormDto)
    {
        using var transaction = await _vevousDbContext.Database.BeginTransactionAsync();

        try
        {
            var user = new User(createUserFormDto.FirstName, createUserFormDto.LastName, createUserFormDto.Email);
            _vevousDbContext.Add(user);
            await _vevousDbContext.SaveChangesAsync();

            var passwordHasher = new PasswordHasher<string>();
            var hashedPassword = passwordHasher.HashPassword("", createUserFormDto.Password);

            var authUser = new AuthUser(user.Id, hashedPassword);
            _vevousDbContext.Add(authUser);
            await _vevousDbContext.SaveChangesAsync();

            await transaction.CommitAsync();

            return Result<Unit>.Ok(new Unit());
        }
        catch (Exception ex)
        {
            var isExistingEmailException = ex.InnerException is PostgresException postgresEx && postgresEx.SqlState == "23505";
            if (isExistingEmailException)
            {
                return Result<Unit>.Err("EmailExists");
            }

            return Result<Unit>.Err("An error occurred while processing your request.");
        }
    }
}
