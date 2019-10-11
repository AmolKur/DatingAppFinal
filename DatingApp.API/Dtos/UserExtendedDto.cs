using System;
using System.Collections.Generic;
using DatingApp.API.Models;

namespace DatingApp.API.Dtos
{
    public class UserListDto
    {

        public int Id { get; set; }
        public string UserName { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime LastActive { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string MainPhotoUrl { get; set; }        
    }

    public class UserDetailsDto : UserListDto
    {
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interestes { get; set; }
        public ICollection<PhotosForDetailDto> Photos {get; set;}
    }

    public class PhotosForDetailDto{
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public int UserId { get; set; }
    }
}