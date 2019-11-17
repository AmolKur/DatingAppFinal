using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        private readonly IMapper _imapper;

        
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            _repo = repo;
            _config = config;
            _imapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserForRegistorDto userDto)
        {
            //validatte the request
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            userDto.UserName = userDto.UserName?.ToLower();
            if (await _repo.UserExists(userDto.UserName))
            {
                return BadRequest("UserName already exist");
            }
            var userToCreate = new Models.User { UserName = userDto.UserName };
            var createdUser = await _repo.Register(userToCreate, userDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserForLoginDto userForLoginDto)
        {

            //throw new Exception("same error");
            var user = await _repo.Login(userForLoginDto.UserName?.ToLower(), userForLoginDto.Password);
            if (user == null)
            {
                return Unauthorized();
            }

            //Token generation - Start

            var claim = new[] {
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim(ClaimTypes.NameIdentifier,user.UserName)
           };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config.GetSection("AppSetting:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDesc = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claim),
                //Expires = DateTime.Now.AddDays(1),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDesc);

            //To send a photo for profile on nav bar
            var userForNav = _imapper.Map<UserListDto>(user);

            //End
            return Ok(new
            {
                token = tokenHandler.WriteToken(token),
                userForNav
            });
            //Token generation - End

        }
    }
}
