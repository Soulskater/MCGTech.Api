using AutoMapper;
using HomeSite.Dal;
using HomeSite.Dal.Domain;
using HomeSite.Models;
using Newtonsoft.Json;
using NHibernate.Criterion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace HomeSite.Controllers
{
    [Authorize]
    public class ForumController : Controller
    {
        [HttpPost]
        public void CreatePost(DateTime created, string postText, string userIdentifier, string forumIdentifier)
        {
            var userRepo = new UserRepository();
            var forumRepo = new ForumRepository();
            var user = userRepo.Query(Expression.Eq(Projections.Property("Identifier"), userIdentifier)).First();
            var forum = forumRepo.Query(Expression.Eq(Projections.Property("Identifier"), forumIdentifier)).First();
            userRepo.Dispose();
            forumRepo.Dispose();
            new Repository<ForumPost>().Add(new ForumPost()
            {
                Created = created,
                Forum = forum,
                User = user,
                PostText = postText
            });
        }

        [HttpPost]
        public ActionResult GetPosts(string forumIdentifier, int skip, int top)
        {
            using (ForumRepository repo = new ForumRepository())
            {
                var forum = repo.Query(Expression.Eq(Projections.Property("Identifier"), forumIdentifier)).First();
                return Json(Mapper.Map<IList<ForumPostModel>>(forum.Posts));
            }
        }

        //
        // GET: /ForumList/
        public ActionResult ForumList()
        {
            using (ForumRepository repo = new ForumRepository())
            {
                return View(Mapper.Map<IList<ForumModel>>(repo.GetList()));
            }
        }

        //
        // GET: /Forum/
        public ActionResult Forum()
        {
            var forumIdentifier = Request.QueryString["ID"];
            if (forumIdentifier == null)
                return RedirectToAction("ForumList", "Forum");
            var forumRepo = new ForumRepository();
            var forum = forumRepo.Query(Expression.Eq(Projections.Property("Identifier"), forumIdentifier)).First();
            return View(Mapper.Map<ForumModel>(forum));
        }
    }
}
