using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using DatingApp.API.Helper;
using DatingApp.API.Models;

namespace DatingApp.API.Data
{
    public interface IUserRepository
    {
        Task<PagedList<User>> GetUsers(UserParams userParems);
        Task<User> GetUserById(int Id);
        
        void Add<T>(T entity)where T: class;
        void Delete<T>(T entity)where T: class;

        Task<bool> SaveAll();

        Task<Photo> GetPhoto(int Id);

        Task<Photo> GetMainPhoto(int userId);
        
    }
}