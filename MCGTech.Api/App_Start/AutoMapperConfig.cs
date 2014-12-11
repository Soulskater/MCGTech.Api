using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MCGTech.Api.Models;
using MCGTech.Dal;
using MCGTech.Dal.Models;

namespace MCGTech.Api.App_Start
{
    public class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            var _repo = new AuthRepository();

            AutoMapper.Mapper.CreateMap<BlogComment, BlogCommentDTO>()
                .ForMember(dest => dest.User,
               opts => opts.MapFrom(src => new UserProfile(_repo.FindUser(src.UserId))));
            AutoMapper.Mapper.CreateMap<Rating, RatingDTO>();
            AutoMapper.Mapper.CreateMap<Blog, BlogDTO>();
            AutoMapper.Mapper.CreateMap<BlogPostDraft, BlogPostDraftDTO>()
                .ForMember(dest => dest.User,
               opts => opts.MapFrom(src => new UserProfile(_repo.FindUser(src.UserId)))); ;
        }
    }
}