using AutoMapper;
using HomeSite.Dal.Domain;
using HomeSite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeSite
{
    public static class MappingConfig
    {
        public static void CreateMapping()
        {
            Mapper.CreateMap<User, UserModel>();
            Mapper.CreateMap<ForumPost, ForumPostModel>()
                .ForMember(a => a.ForumIdentifier, opt => opt.MapFrom(src => src.Forum.Identifier));
            Mapper.CreateMap<Forum, ForumModel>()
                .ForMember(a => a.Moderator, opt => opt.MapFrom(src => Mapper.Map<User, UserModel>(src.Moderator)));
        }
    }
}