using MCGTech.Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MCGTech.Api.Models
{
    public class UserProfile : ICustomIdentityUser
    {
        public UserProfile(ICustomIdentityUser baseUser)
        {
            FirstName = baseUser.FirstName;
            LastName = baseUser.LastName;
        }

        public string FirstName
        {
            get;
            set;
        }

        public string LastName
        {
            get;
            set;
        }
    }
}