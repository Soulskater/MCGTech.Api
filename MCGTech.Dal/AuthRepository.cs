using System.Web.Security;
using MCGTech.Contracts.User;
using MCGTech.Dal.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCGTech.Dal
{
    public class AuthRepository : IDisposable
    {
        private readonly AuthContext _ctx;

        private readonly UserManager<CustomIdentityUser> _userManager;

        public AuthRepository()
        {
            _ctx = new AuthContext();
            _userManager = new UserManager<CustomIdentityUser>(new UserStore<CustomIdentityUser>(_ctx));
        }

        public async Task<IdentityResult> RegisterUser(CustomIdentityUser userModel, string password)
        {
            var result = await _userManager.CreateAsync(userModel, password);

            return result;
        }

        public async Task<bool> IsInRole(string userId, string role)
        {
            return await _userManager.IsInRoleAsync(userId, role);
        }

        public async Task<IdentityResult> AddToRole(string userId, string role)
        {
            return await _userManager.AddToRoleAsync(userId, role);
        }

        public CustomIdentityUser FindUser(string userName)
        {
            return _userManager.FindByName(userName);
        }

        public async Task<CustomIdentityUser> FindUser(string userName, string password)
        {
            return await _userManager.FindAsync(userName, password);
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();

        }
    }
}
