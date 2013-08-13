using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeSite.Dal.Domain
{
    public class Forum
    {
        public virtual int ForumID { get; set; }
        public virtual string Name { get; set; }
        public virtual string Description { get; set; }
        public virtual DateTime Created { get; set; }
        public virtual User Moderator { get; set; }
        public virtual string Identifier { get; set; }
        public virtual ICollection<ForumPost> Posts { get; set; }
    }
}
