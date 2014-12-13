using System;
using System.Collections.Generic;
using MCGTech.Contracts.User;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace MCGTech.Dal
{
    public class IdentityRoleRepository : IDisposable
    {
        private readonly AuthContext _ctx;
        private readonly UserManager<AppIdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public IdentityRoleRepository()
        {
            _ctx = new AuthContext();
            _userManager = new UserManager<AppIdentityUser>(
                new UserStore<AppIdentityUser>(_ctx));
            _roleManager = new RoleManager<IdentityRole>(
                new RoleStore<IdentityRole>(_ctx));
        }

        public bool RoleExists(string name)
        {
            return _roleManager.RoleExists(name);
        }

        public bool IsInRole(string userId, string roleName)
        {
            return _userManager.IsInRole(userId, roleName);
        }

        public bool CreateRole(string name)
        {
            var idResult = _roleManager.Create(new IdentityRole(name));
            return idResult.Succeeded;
        }

        public bool AddUserToRole(string userId, string roleName)
        {
            var idResult = _userManager.AddToRole(userId, roleName);
            return idResult.Succeeded;
        }


        public void ClearUserRoles(string userId)
        {
            var user = _userManager.FindById(userId);
            var currentRoles = new List<IdentityUserRole>();
            currentRoles.AddRange(user.Roles);
            foreach (var role in currentRoles)
            {
                var userRole = _roleManager.FindById(role.RoleId);
                _userManager.RemoveFromRole(userId, userRole.Name);
            }
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();
        }
    }
}
