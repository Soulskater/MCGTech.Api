using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCGTech.Dal.Models
{
    public class BlogComment
    {
        [Key]
        public int BlogCommentId { get; set; }

        public string UserId { get; set; }

        public string Comment { get; set; }

        public DateTime Created { get; set; }

        public Blog Blog { get; set; }
    }
}
