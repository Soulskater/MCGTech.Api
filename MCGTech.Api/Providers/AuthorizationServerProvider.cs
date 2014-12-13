using System.Web.Http;
using MCGTech.Contracts.User;
using MCGTech.Dal;
using Microsoft.Owin.Security.OAuth;
using System.Security.Claims;
using System.Threading.Tasks;

namespace MCGTech.Api.Providers
{
    public class AuthorizationServerProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }

        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            context.OwinContext.Response.Headers.Add("Access-Control-Allow-Origin", new[] { "*" });

            AppIdentityUser user;
            using (var repo = new IdentityRepository())
            {
                user = repo.FindUser(context.UserName, context.Password);

                if (user == null)
                {
                    context.SetError("invalid_grant", "The user name or password is incorrect.");
                    context.OwinContext.Response.StatusCode = 401;
                    return;
                }
            }

            var identity = new ClaimsIdentity(context.Options.AuthenticationType, "sub", "");
            
            identity.AddClaim(new Claim("sub", user.UserName));
            identity.AddClaim(new Claim("role", "user"));
            context.Validated(identity);

        }
    }
}