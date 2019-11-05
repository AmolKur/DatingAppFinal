using System.Linq;
using AutoMapper;
using DatingApp.API.Data;
using DatingApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using CloudinaryDotNet;
using System.Threading.Tasks;
using DatingApp.API.Dtos;
using System.Security.Claims;
using CloudinaryDotNet.Actions;

namespace DatingApp.API.Controllers
{
    [Authorize]
    [Route("api/users/{userId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IUserRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudAccount> _cloudSettings;
        private Cloudinary _clourinary;

        public PhotosController(
            IUserRepository repo,
            IMapper mapper,
            IOptions<CloudAccount> cloudSettings)
        {
            _repo = repo;
            _mapper = mapper;
            _cloudSettings = cloudSettings;

            Account acc = new Account(
            _cloudSettings.Value.CloudName,
            _cloudSettings.Value.ApiKey,
            _cloudSettings.Value.SecretKey
            );

            _clourinary = new Cloudinary(acc);
        }

        [HttpGet("{id}",Name="GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);
            var photo = _mapper.Map<PhotosForReturnDto>(photoFromRepo);
            return Ok(photo);
        }

        public async Task<IActionResult> AddPhotos(int userId,[FromForm]PhotoForCreationDto phototoCreate)
        {
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var user = await _repo.GetUserById(userId);
            var uploadResult = new ImageUploadResult();
            var file = phototoCreate.File;
            if (file.Length> 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams(){
                        File = new FileDescription(file.Name,stream),
                        Transformation = //new Transformation().
                        //Width(500).Width(500).Crop("fill").Gravity("face")

                        new Transformation()
                        .Height(100).Width(100).Crop("scale").Chain()
                        .Gravity("face")
                    };

                    uploadResult = _clourinary.Upload(uploadParams);
                }
            }
            phototoCreate.Url = uploadResult.Uri.ToString();
            phototoCreate.PublicId = uploadResult.PublicId;  

           var photo= _mapper.Map<Photo>(phototoCreate);

            if (!user.Photos.Any(x => x.IsMain))
            {
                photo.IsMain = true;
            } 

            user.Photos.Add(photo);
            if (await _repo.SaveAll())
            {
               var photoToreturn = _mapper.Map<PhotosForReturnDto>(photo);
                return CreatedAtRoute("GetPhoto",new {id = photo.Id},photoToreturn);
            }          

            return BadRequest("Error while adding the photo");
        }
        
    }
}