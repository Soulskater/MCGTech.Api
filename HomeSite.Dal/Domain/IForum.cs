using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HomeSite.Dal.Domain
{
    public abstract class ClientForum
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public abstract string ModeratorName { get; }
        public string Identifier { get; set; }
    }
}
