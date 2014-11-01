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
        private AuthContext _ctx;

        private UserManager<CustomIdentityUser> _userManager;

        public AuthRepository()
        {
            _ctx = new AuthContext();
            _userManager = new UserManager<CustomIdentityUser>(new UserStore<CustomIdentityUser>(_ctx));
        }

        public async Task<IdentityResult> RegisterUser(UserModel userModel)
        {
            CustomIdentityUser user = new CustomIdentityUser
            {
                UserName = userModel.UserName,
                Email = userModel.UserName,
                FirstName = userModel.FirstName,
                LastName = userModel.LastName
            };

            var result = await _userManager.CreateAsync(user, userModel.Password);

            return result;
        }

        public async Task<CustomIdentityUser> FindUser(string userName)
        {
            CustomIdentityUser user = _userManager.FindByName(userName);

            return user;
        }

        public async Task<CustomIdentityUser> FindUser(string userName, string password)
        {
            CustomIdentityUser user = await _userManager.FindAsync(userName, password);

            return user;
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();

        }
    }
}
