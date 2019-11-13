using System.Security.Cryptography.X509Certificates;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace DatingApp.API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;

        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetMainPhoto(int userId)
        {
            var photo = await _context.Photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain == true);
            return photo;
        }

        public async Task<Photo> GetPhoto(int Id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(x=>x.Id == Id);
            return photo;
        }

        public async Task<User> GetUserById(int Id)
        {
            var userToSelect = await _context.Users.Include(p=> p.Photos).FirstOrDefaultAsync(x=>x.Id == Id);
            return userToSelect;

        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await _context.Users.Include(p=> p.Photos).ToListAsync();
            return users;
        }

        public async Task<bool> SaveAll()
        {
            return  await _context.SaveChangesAsync() > 0;
        }

    }
}