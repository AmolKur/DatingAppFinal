using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;

        }
        public async Task<User> GetUserById(int Id)
        {
            var userToSelect = await _context.Users.FirstOrDefaultAsync(x=>x.Id == Id);
            return userToSelect;

        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.ToListAsync();
            return users;
        }

        public Task<bool> UpdateUser(User userToUpdate)
        {
            throw new System.NotImplementedException();
        }
    }
}