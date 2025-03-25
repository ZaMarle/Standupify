using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Infrastructure;
public interface IUsersRepository
{
    Task CreateUser(CreateUserFormDto createUserFormDto);
}

public class UsersRepository
{
    public UsersRepository()
    {

    }

    public async Task CreateUser(CreateUserFormDto createUserFormDto)
    {
        throw new NotImplementedException();

        // return Task.CompletedTask;
    }
}

