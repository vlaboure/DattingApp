using System.Linq;
using AutoMapper;
using DattingApp.api.Dtos;
using DattingApp.api.Models;

namespace DattingApp.api.helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // création de mapp entre les classes
            CreateMap<User,UserForDetailDto>()   
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                            src.Photos.FirstOrDefault(p => p.IsMain).Url))
                // utilisatation de this.CalcAge pour transformer date naissance en age 
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => 
                            src.DateOfBirth.CalcAge()));            
            CreateMap<User,UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => opt.MapFrom(src => 
                            src.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(dest => dest.Age, opt => opt.MapFrom(src => 
                            src.DateOfBirth.CalcAge()));           
            CreateMap<Photo,PhotoForDetailDto>(); //source - destination    
            CreateMap<UserForUpdateDto,User>();  //source - destination     
            CreateMap<Photo,PhotoForReturnDto>();//source - destination
            CreateMap<PhotoForCreationDto,Photo>();
            CreateMap<UsersForRegisterDto,User>();
            
        }
    }
}