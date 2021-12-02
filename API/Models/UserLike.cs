namespace API.Models
{
    public class UserLike
    {
        // User that is Liking the Other User 
        public AppUser SourceUser { get; set; }

        public int SourceUserId { get; set; }

        public AppUser LikedUser { get; set; }

        public int LikedUserId { get; set; }

    }
}