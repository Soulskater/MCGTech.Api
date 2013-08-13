using HomeSite.Dal.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeSite.Models
{
    public class ForumModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public string Identifier { get; set; }
        public DateTime Created { get; set; }
        public UserModel Moderator { get; set; }
        public IList<ForumPostModel> Posts { get; set; }
        public int Skip { get; set; }
        public int Top { get; set; }
        public int Count { get; set; }
    }
}