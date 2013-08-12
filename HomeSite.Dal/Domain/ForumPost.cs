using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeSite.Dal.Domain
{
    public class ForumPost
    {
        public virtual int ForumPostID { get; set; }
        public virtual string PostText { get; set; }
        public virtual Forum Forum { get; set; }
        public virtual DateTime Created { get; set; }
        public virtual User User { get; set; }
    }
}
