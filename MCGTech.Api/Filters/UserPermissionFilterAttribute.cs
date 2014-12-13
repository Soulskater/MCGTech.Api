using System;
using System.Net.Http;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using MCGTech.Api.Extensions;
using MCGTech.Api.Filters.Exceptions;
using MCGTech.Contracts.User;
using MCGTech.Dal;

namespace MCGTech.Api.Filters
{
    public class UserPermissionFilterAttribute : ActionFilterAttribute, IAuthorizationFilter
    {
        private readonly UserRoles[] _roles;

        public UserPermissionFilterAttribute(params UserRoles[] roles)
        {
            _roles = roles;
        }

        public Task<HttpResponseMessage> ExecuteAuthorizationFilterAsync(HttpActionContext actionContext, CancellationToken cancellationToken, Func<Task<HttpResponseMessage>> continuation)
        {
            var apiController = GetApiControllerFromActionContext(actionContext);

            var user = GetUserFromController(apiController);
            
            if (!user.IsInRole(_roles))
            {
                throw new AuthorizationException("User don't have permission to access to the controller");
            }

            return continuation();
        }

        private AppIdentityUser GetUserFromController(ApiController apiController)
        {
            var user = apiController.User;
            if (!user.Identity.IsAuthenticated)
                throw new InvalidOperationException("The HttpContext.User is null");
            var identityUser = new IdentityRepository().FindByUserName(user.Identity.Name);
            return identityUser;
        }

        private static ApiController GetApiControllerFromActionContext(HttpActionContext actionContext)
        {
            var apiController = actionContext.ControllerContext.Controller as ApiController;
            if (apiController == null)
                throw new InvalidOperationException("");

            return apiController;
        }
    }
}