namespace DattingApp.api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string UserName { get; set; }
     //   public byte[] Password { get; set; }
        // clé
        public byte[] PasswordSalt { get; set; }
        public byte[] PasswordHash { get; set; }
    }
}