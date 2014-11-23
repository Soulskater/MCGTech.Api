using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MCGTech.Api.Models
{
    public class BlogCommentDTO
    {
        public UserProfile User { get; set; }

        public DateTime Created { get; set; }

        public string Comment { get; set; }

        public int BlogId { get; set; }
    }
}