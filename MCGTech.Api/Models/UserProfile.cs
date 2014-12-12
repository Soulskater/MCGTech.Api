using MCGTech.Contracts.User;

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