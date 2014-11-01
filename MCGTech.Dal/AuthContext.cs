using MCGTech.Dal.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCGTech.Dal
{
    public class AuthContext : IdentityDbContext<CustomIdentityUser>
    {
        public AuthContext()
            : base("AuthContext")
        {

        }
    }
}
