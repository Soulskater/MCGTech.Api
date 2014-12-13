using System;
using System.Security.Principal;
using System.Web;
using MCGTech.Contracts.User;
using MCGTech.Dal;

namespace MCGTech.Api.Extensions
{
    public static class UserExtensions
    {
        public static bool IsInRole(this IPrincipal user, params UserRoles[] roles)
        {
            return user.IsInRole(String.Join(",", roles));
        }

        public static bool IsInRole(this AppIdentityUser user, params UserRoles[] roles)
        {
            using (var roleRepo = new IdentityRoleRepository())
            {
                return roleRepo.IsInRole(user.Id, String.Join(",", roles));
            }
        }
    }
}