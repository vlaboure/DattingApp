using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DattingApp.api.helpers;
using DattingApp.api.Models;
using Microsoft.EntityFrameworkCore;

namespace DattingApp.api.Data
{
    public class DattingRepository : IDattingRepository
    {
        public DattingRepository(DataContext context)
        {
            _context = context;
        }

        public DataContext _context { get; }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.Photos.Where(u=> u.UserId == userId).
                    FirstOrDefaultAsync(p=>p.IsMain == true);
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.Include(p=>p.Photos).FirstOrDefaultAsync(u=>u.Id ==id);
            return user;
        }

        // ajout des parametres de header à GetUsers
        public async Task<PagedList<User>> GetUsers(UserParameters parameters)
        {
            // modification de la requête au lieu de renvoyer un ToList
            // utilisation de CreateAsync avec le user comme parametre et
            // les pages et taille de page
            var users = _context.Users.Include(p=>p.Photos);
            return await PagedList<User>.CreateAsync(users, parameters.
                                        PageSize, parameters.PageNumber);
        }

         public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}