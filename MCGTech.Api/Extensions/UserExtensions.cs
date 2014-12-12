using System;
using System.Security.Principal;
using System.Web;
using MCGTech.Contracts.User;

namespace MCGTech.Api.Extensions
{
    public static class UserExtensions
    {
        public static bool IsInRole(this IPrincipal user, params UserRoles[] roles)
        {
            return user.IsInRole(String.Join(",", roles));
        }

        public static bool IsInRole(this CustomIdentityUser user, params UserRoles[] roles)
        {
            return HttpContext.Current.User.IsInRole(String.Join(",", roles));
        }
    }
}