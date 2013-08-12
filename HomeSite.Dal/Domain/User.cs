using Iesi.Collections.Generic;
using System;
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
        private ISet<Forum> _forums = new HashedSet<Forum>();
        public virtual ISet<Forum> Forums { get { return _forums; } set { _forums = value; } }
        
        private ISet<ForumPost> _posts = new HashedSet<ForumPost>();
        public virtual ISet<ForumPost> Posts { get { return _posts; } set { _posts = value; } }
    }
}
