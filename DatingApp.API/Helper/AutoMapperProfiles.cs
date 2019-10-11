using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using DatingApp.API.Models;



namespace DatingApp.API.Helper
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User,UserListDto>()
                .ForMember(dest => dest.MainPhotoUrl, opt  =>
                   opt.MapFrom(src =>src.Photos.FirstOrDefault(x=>x.IsMain).Url))
                .ForMember(dest => dest.Age, opt  =>
                   opt.MapFrom(src =>src.DateOfBirth.Age()));
            CreateMap<User,UserDetailsDto>()
                .ForMember(dest => dest.MainPhotoUrl, opt  =>
                   opt.MapFrom(src =>src.Photos.FirstOrDefault(x=>x.IsMain).Url))
                .ForMember(dest => dest.Age, opt  =>
                   opt.MapFrom(src =>src.DateOfBirth.Age()));
            CreateMap<Photo,PhotosForDetailDto>();
        }
    }
}