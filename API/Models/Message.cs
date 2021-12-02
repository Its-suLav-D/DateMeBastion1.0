using System;

namespace API.Models
{
    public class Message
    {
        public int Id { get; set; }

        public int SenderId { get; set; }

        public string SenderUserName { get; set; }

        // Nagivational Property 
        public AppUser Sender { get; set; }

        public int RecipeintId { get; set; }

        public string RecipeintUserName { get; set; }

        // Nagivational Property
        public AppUser Recipeint { get; set; }

        public string Content { get; set; }

        public DateTime? DateRead { get; set; }

        public DateTime MessageSent { get; set; } = DateTime.Now;

        public bool SenderDeleted { get; set; }

        public bool RecipientDeleted { get; set; }




    }
}