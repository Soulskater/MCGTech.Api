using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeSite.Dal.Domain
{
    public class ChatLog
    {
        public virtual int ChatLogID { get; set; }
        public virtual ChatGroup ChatGroup { get; set; }
        public virtual User Sender { get; set; }
        public virtual DateTime Created { get; set; }
        public virtual string Message { get; set; }
        //public virtual ICollection<ForumPost> Posts { get; set; }
    }
}
