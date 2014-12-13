using MCGTech.Contracts.User;

namespace MCGTech.Api.Models
{
    public class UserProfile : IAppIdentityUser
    {
        public UserProfile(IAppIdentityUser baseUser)
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