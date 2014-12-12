using System.Security.Principal;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MCGTech.Contracts.User
{
    public class CustomIdentityUser : IdentityUser, ICustomIdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
