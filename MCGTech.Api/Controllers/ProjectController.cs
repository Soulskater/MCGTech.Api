using MCGTech.Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MCGTech.Api.Controllers
{
    [RoutePrefix("api/Project")]
    public class ProjectController : ApiController
    {
        [AllowAnonymous]
        public List<Project> Get()
        {
            using (var context = new MCGTech.Dal.MCGTechContext())
            {
                return context.Projects.ToList();
            }
        }
    }
}
