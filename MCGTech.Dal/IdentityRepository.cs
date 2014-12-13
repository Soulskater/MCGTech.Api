using MCGTech.Contracts.User;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Threading.Tasks;

namespace MCGTech.Dal
{
    public class IdentityRepository : IDisposable
    {
        private readonly AuthContext _ctx;

        private readonly UserManager<AppIdentityUser> _userManager;

        public IdentityRepository()
        {
            _ctx = new AuthContext();
            _userManager = new UserManager<AppIdentityUser>(new UserStore<AppIdentityUser>(_ctx));
            
        }

        public async Task<IdentityResult> RegisterUser(AppIdentityUser userModel, string password)
        {
            var result = await _userManager.CreateAsync(userModel, password);

            return result;
        }

        public AppIdentityUser FindByUserId(string id)
        {
            return _userManager.FindById(id);
        }
        
        public AppIdentityUser FindByUserName(string userName)
        {
            return _userManager.FindByName(userName);
        }

        public AppIdentityUser FindUser(string userName, string password)
        {
            return _userManager.Find(userName, password);
        }

        public void Dispose()
        {
            _ctx.Dispose();
            _userManager.Dispose();

        }
    }
}
