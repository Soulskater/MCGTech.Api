using Microsoft.AspNet.Identity.EntityFramework;

namespace MCGTech.Contracts.User
{
    public class AppIdentityUser : IdentityUser, IAppIdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
