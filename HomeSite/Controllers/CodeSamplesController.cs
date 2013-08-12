using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HomeSite.Controllers
{
    [Authorize]
    public class CodeSamplesController : Controller
    {
        //
        // GET: /CodeSamples/
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

    }
}
