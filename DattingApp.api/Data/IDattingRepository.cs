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
         Task<Like> GetLike(int userId, int receptId);
         // message d'un user
         Task<Message> GetMessage(int id);
         // message current user avec paramètres 
         Task<PagedList<Message>> GetMessagesForUser(MessageParameters messageParameters);
         // flux de messages entre 2 users
         Task<IEnumerable<Message>> GetMessageThread(int userId, int receptId);
    }
}