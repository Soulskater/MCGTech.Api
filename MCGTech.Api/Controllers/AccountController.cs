using MCGTech.Api.Extensions;
using MCGTech.Api.Models;
using MCGTech.Contracts.User;
using MCGTech.Dal;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;
using System.Web.Http;

namespace MCGTech.Api.Controllers
{
    [RoutePrefix("api/Account")]
    public class AccountController : ApiController
    {
        private IdentityRepository _repo = null;

        public AccountController()
        {
            _repo = new IdentityRepository();
        }

        // POST api/Account/Register
        [AllowAnonymous]
        [Route("Register")]
        public async Task<IHttpActionResult> Register(UserModelDTO userModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }


            var user = AutoMapper.Mapper.Map<AppIdentityUser>(userModel);

            IdentityResult result = await _repo.RegisterUser(user, userModel.Password);
            IHttpActionResult errorResult = GetErrorResult(result);

            if (errorResult != null)
            {
                return errorResult;
            }

            return Ok();
        }

        [Authorize]
        [Route("user")]
        public async Task<IHttpActionResult> GetUserProfile()
        {
            var user = _repo.FindByUserName(User.Identity.Name);
            if (user != null)
                return Ok(new UserProfile(user));
            else
                return Unauthorized();
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _repo.Dispose();
            }

            base.Dispose(disposing);
        }

        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    // No ModelState errors are available to send, so just return an empty BadRequest.
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }
    }
}
