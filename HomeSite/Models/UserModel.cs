using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeSite.Models
{
    public class UserModel
    {
        public string Email { get; set; }
        public string Identifier { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Fullname { get { return this.Firstname + " " + this.Lastname; } }
        //public IList<ForumModel> Forums { get; set; }
        //public IList<ForumPostModel> Posts { get; set; }
    }
}