﻿using HomeSite.Dal;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace HomeSite.Controllers
{
    [Authorize]
    public class UploadController : Controller
    {
        //
        // GET: /Upload/

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Upload()
        {
            var file = Request.Files[0];

            if (file != null && file.ContentLength > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                var repo = new UserRepository();
                var user = repo.GetList().First(u => u.Email == HttpContext.User.Identity.Name);
                var extension = Path.GetExtension(fileName);
                var path = Path.Combine(Server.MapPath("~/Images/UserProfiles"), user.Identifier + extension);
                file.SaveAs(path);
            }

            return RedirectToAction("Index", "Home");
        }
    }
}
