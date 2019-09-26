using System.ComponentModel.DataAnnotations;

namespace DatingApp.API.Controllers
{
    public class UserForLoginDto
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 6, ErrorMessage = "You must specify the password between 6 to 8 length")]
        public string Password { get; set; }
    }
}