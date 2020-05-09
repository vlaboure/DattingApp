using System.Collections.Generic;
using System.Threading.Tasks;
using DattingApp.api.helpers;
using DattingApp.api.Models;

namespace DattingApp.api.Data
{
    public interface IDattingRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool>SaveAll();
         Task<PagedList<User>> GetUsers(UserParameters parameters);
         Task<User> GetUser(int id);
         Task<Photo> GetPhoto(int id);
         Task<Photo> GetMainPhotoForUser(int photoId);
    }
}