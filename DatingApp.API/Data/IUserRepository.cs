using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUserById(int Id);
        Task<Boolean> UpdateUser(User userToUpdate);
        
    }
}