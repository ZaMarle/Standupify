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

            var authUser = new AuthUser(user.Id, createUserFormDto.Password);

            var passwordHasher = new PasswordHasher<AuthUser>();
            var hashedPassword = passwordHasher.HashPassword(authUser, createUserFormDto.Password);

            authUser.Password = hashedPassword;

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
                System.Console.WriteLine("1111111111111111111111111111111");
                System.Console.WriteLine("1111111111111111111111111111111");
                System.Console.WriteLine("1111111111111111111111111111111");
                System.Console.WriteLine("1111111111111111111111111111111");
                System.Console.WriteLine("1111111111111111111111111111111");
                System.Console.WriteLine("1111111111111111111111111111111");
                return Result<Unit>.Err("A user with this email already exists.");
            }

            System.Console.WriteLine("222222222222222222222222222222");
            System.Console.WriteLine("222222222222222222222222222222");
            System.Console.WriteLine("222222222222222222222222222222");
            System.Console.WriteLine("222222222222222222222222222222");
            System.Console.WriteLine("222222222222222222222222222222");
            System.Console.WriteLine("222222222222222222222222222222");
            System.Console.WriteLine("222222222222222222222222222222");
            return Result<Unit>.Err("An error occurred while processing your request.");
        }
    }
}
