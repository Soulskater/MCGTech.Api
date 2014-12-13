using MCGTech.Api.Models;
using MCGTech.Contracts.User;
using MCGTech.Dal;
using MCGTech.Dal.Models;

namespace MCGTech.Api.App_Start
{
    public class AutoMapperConfig
    {
        public static void RegisterMappings()
        {
            var _repo = new IdentityRepository();

            AutoMapper.Mapper.CreateMap<BlogComment, BlogCommentDTO>()
                .ForMember(dest => dest.User,
               opts => opts.MapFrom(src => new UserProfile(_repo.FindByUserName(src.UserId))));
            AutoMapper.Mapper.CreateMap<Rating, RatingDTO>();
            AutoMapper.Mapper.CreateMap<Blog, BlogDTO>();
            AutoMapper.Mapper.CreateMap<BlogPostDraft, BlogPostDraftDTO>();
            AutoMapper.Mapper.CreateMap<AppIdentityUser, UserModelDTO>()
                .ForMember(dest => dest.UserName,
                    opts => opts.MapFrom(src => src.Email));
        }
    }
}