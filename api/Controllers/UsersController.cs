using System.Threading.Tasks;
using api.Infrastructure;
using api.Models;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private readonly ILogger<UsersController> _logger;
        private readonly IUsersRepository _usersRepository;

        public UsersController(ILogger<UsersController> logger, IUsersRepository usersRepository)
        {
            _logger = logger;
            _usersRepository = usersRepository;
        }

        [HttpPost("CreateUser")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserFormDto CreateAccountForm)
        {
            try
            {
                await _usersRepository.CreateUser(CreateAccountForm);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}