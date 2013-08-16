using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeSite.Dal.Domain
{
    public class UserChatGroup
    {
        public virtual User User { get; set; }
        public virtual ChatGroup ChatGroup { get; set; }
    }
}
