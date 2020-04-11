using System.Runtime.CompilerServices;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DatingApp.API.Dtos
{
    public class UserForRegistorDto
    {
        [Required]
        public string Gender { get; set; }
        [Required]
        public string UserName { get; set; }
        [Required]
        public string KnownAs { get; set; }
        [Required]
        public DateTime DateOfBirth { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Country { get; set; }
        public DateTime LastActive { get; set; }
        public DateTime CreatedOn { get; set; }

        [Required]
        [StringLength(8,MinimumLength = 6, ErrorMessage = "You must specify the password between 6 to 8")]
        public string Password { get; set; }

        public UserForRegistorDto()
        {
            this.LastActive =  DateTime.Now; 
            this.CreatedOn =  DateTime.Now; 
        }
    }
}
