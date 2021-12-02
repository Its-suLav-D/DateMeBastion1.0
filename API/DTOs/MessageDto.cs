using System;

namespace API.DTOs
{
    public class MessageDto
    {
        public int Id { get; set; }

        public int SenderId { get; set; }

        public string SenderUserName { get; set; }

        public string SenderPhotoUrl { get; set; }

        public int RecipeintId { get; set; }

        public string RecipeintUserName { get; set; }

        public string RecipeintPhotoUrl { get; set; }

        public string Content { get; set; }

        public DateTime? DateRead { get; set; }

        public DateTime MessageSent { get; set; } = DateTime.Now;
    }
}