using System.ComponentModel.DataAnnotations;

namespace DattingApp.api.Dtos
{
    public class UsersForRegisterDto
    {
        [Required]
         public string UserName { get; set; }
        [Required]
        [StringLength(8,MinimumLength = 4, ErrorMessage= "Taille du mot de passe entre 4 et 8")]
         public string Password { get; set; }
    }
}