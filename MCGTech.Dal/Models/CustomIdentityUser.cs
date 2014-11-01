using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace MCGTech.Dal.Models
{
    public class CustomIdentityUser : IdentityUser, ICustomIdentityUser
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
