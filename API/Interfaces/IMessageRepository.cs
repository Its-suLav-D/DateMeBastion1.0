using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Helpers;
using API.Models;

namespace API.Interfaces
{
    public interface IMessageRepository
    {
        void addMessage(Message message);

        void DeleteMessage(Message message);

        Task<Message> GetMessage(int id);


        Task<PagedList<MessageDto>> GetMessagesForUser(MessageParams messageParams);
        Task<IEnumerable<MessageDto>> GetMessageThread(string currentUsername, string recipeintUsername);

        Task<bool> SaveAllAsync();



    }
}