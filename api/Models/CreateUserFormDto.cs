using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models;
public record CreateUserFormDto(string FirstName, string LastName, string Email, string Password, string ConfirmPassword);
