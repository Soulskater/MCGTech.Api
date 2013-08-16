using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeSite.Dal.Domain
{
    public class ChatGroup
    {
        public ChatGroup()
        {
            this.ChatLogs = new System.Collections.Generic.List<ChatLog>();
        }

        public virtual int ChatGroupID { get; set; }
        public virtual DateTime Created { get; set; }
        public virtual bool Inactive { get; set; }
        public virtual ICollection<User> Users { get; set; }
        public virtual ICollection<ChatLog> ChatLogs { get; set; }
    }
}
