using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace HomeSite.Models
{
    [Serializable]
    public class ForumPostModel
    {
        public string PostText { get; set; }
        public string ForumIdentifier { get; set; }
        public DateTime Created { get; set; }
        public UserModel User { get; set; }
    }
}