using System.Security.Cryptography.X509Certificates;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using DatingApp.API.Helper;
using System;

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

        public async Task<PagedList<User>> GetUsers(UserParams userParems)
        {
            var users =  _context.Users.Include(p=> p.Photos).AsQueryable();

            users = users.Where(x => x.Id != userParems.UserId);
            users = users.Where(x => x.Gender == userParems.Gender);
            if (userParems.MinAge != 3 || userParems.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParems.MaxAge-1);
                var maxDob = DateTime.Today.AddYears(-userParems.MinAge);
                users = users.Where(x => x.DateOfBirth >= minDob && x.DateOfBirth <= maxDob);
            }
            return await PagedList<User>.CreateAsync(users,userParems.PageNumber,userParems.PageSize);
        }


        public async Task<bool> SaveAll()
        {
            return  await _context.SaveChangesAsync() > 0;
        }

    }
}