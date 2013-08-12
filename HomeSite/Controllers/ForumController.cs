using HomeSite.Dal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Web.Mvc;

namespace HomeSite.Controllers
{
    [Authorize]
    public class ForumController : Controller
    {
        //
        // GET: /Forum/
        public ActionResult Index()
        {
            ForumRepository repo = new ForumRepository();
            return View(repo.GetList());
        }
    }
}
