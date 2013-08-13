using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeSite.Dal.Domain
{
    public class User
    {
        public virtual int UserID { get; set; }
        public virtual string Email { get; set; }
        public virtual string Identifier { get; set; }
        public virtual string Firstname { get; set; }
        public virtual string Lastname { get; set; }
        public virtual ICollection<Forum> Forums { get; set; }
        public virtual ICollection<ForumPost> Posts { get; set; }
    }
}
