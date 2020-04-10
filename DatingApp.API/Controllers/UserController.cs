using System;
using System.Reflection.Metadata;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepo, IMapper mapper)
        {
            _mapper = mapper;
            _userRepo = userRepo;

        }

        
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userRepo.GetUsers();
            var userListDtoObj = _mapper.Map<IEnumerable<UserListDto>>(users);
            return Ok(userListDtoObj);
        }


        [HttpGet("{id}",Name="GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userRepo.GetUserById(id);
            var userDetailDtoObj = _mapper.Map<UserDetailsDto>(user);
            return Ok(userDetailDtoObj);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id,UserEditDto userForEdit)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var user = await _userRepo.GetUserById(id);
            var userDetailDtoObj = _mapper.Map(userForEdit,user);
            if (await _userRepo.SaveAll())
            {
                return NoContent();
            }
            throw new Exception($"Error with updating user with {id}");
        }
    }
}