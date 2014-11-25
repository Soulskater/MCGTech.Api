using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MCGTech.Api.Models
{
    public class BlogDTO
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime Created { get; set; }

        public int BlogId { get; set; }

        public List<BlogCommentDTO> Comments { get; set; }

        public List<RatingDTO> Ratings { get; set; }
    }
}