using Iesi.Collections.Generic;
using System;
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
        private ISet<ForumPost> _posts = new HashedSet<ForumPost>();
        public virtual ISet<ForumPost> Posts { get { return _posts; } set { _posts = value; } }
    }
}
