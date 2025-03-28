using api.Infrastructure.Entities;
using api.Models;

namespace api.Infrastructure.Repos;
public interface IUsersRepository
{
    Task CreateUser(CreateUserFormDto createUserFormDto);
}

public class UsersRepository : IUsersRepository
{
    private readonly VevousDbContext _vevousDbContext;
    public UsersRepository(VevousDbContext vevousDbContext)
    {
        _vevousDbContext = vevousDbContext;
    }

    public async Task CreateUser(CreateUserFormDto createUserFormDto)
    {
        using var transaction = await _vevousDbContext.Database.BeginTransactionAsync();

        try
        {
            var user = new User(createUserFormDto.FirstName, createUserFormDto.LastName, createUserFormDto.Email);
            _vevousDbContext.Add(user);
            _vevousDbContext.SaveChanges();

            var authUser = new AuthUser(user.Id, createUserFormDto.Password);
            _vevousDbContext.Add(authUser);
            _vevousDbContext.SaveChanges();

            transaction.Commit();
        }
        catch (Exception)
        {
            transaction.Rollback();
            throw;
        }
    }
}

