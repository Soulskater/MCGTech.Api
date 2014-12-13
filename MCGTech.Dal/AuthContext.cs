using MCGTech.Contracts.User;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MCGTech.Dal
{
    public class AuthContext : IdentityDbContext<AppIdentityUser>
    {
        public AuthContext()
            : base("AuthContext")
        {

        }
    }
}
