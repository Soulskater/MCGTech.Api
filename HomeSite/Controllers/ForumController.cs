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
        public ActionResult CreatePost(DateTime created, string postText, string forumIdentifier)
        {
            using (var repo = new Repository())
            {
                var user = repo.Query<User>(Expression.Eq(Projections.Property("Email"), User.Identity.Name)).First();
                var forum = repo.Query<Forum>(Expression.Eq(Projections.Property("Identifier"), forumIdentifier)).First();
                repo.Add(new ForumPost()
                {
                    Created = created,
                    Forum = forum,
                    User = user,
                    PostText = postText
                });
                var posts = repo.Query<ForumPost>(Expression.Eq(Projections.Property("Forum"), forum));
                return Json(Mapper.Map<IList<ForumPostModel>>(posts));
            }
        }

        [HttpPost]
        public ActionResult CreateForum(DateTime created, string name, string description)
        {
            using (var repo = new Repository())
            {
                var user = repo.Query<User>(Expression.Eq(Projections.Property("Email"), User.Identity.Name)).First();
                repo.Add<Forum>(new Forum()
                {
                    Created = created,
                    Name = name,
                    Moderator = user,
                    Description = description,
                    Identifier = Guid.NewGuid().ToString()
                });
                return Json(Mapper.Map<IList<ForumModel>>(repo.GetList<ForumModel>()));
            }
        }

        [HttpPost]
        public ActionResult GetPosts(string forumIdentifier, int skip, int top)
        {
            using (Repository repo = new Repository())
            {
                var forum = repo.Query<Forum>(Expression.Eq(Projections.Property("Identifier"), forumIdentifier)).First();
                return Json(Mapper.Map<IList<ForumPostModel>>(forum.Posts));
            }
        }

        //
        // GET: /ForumList/
        public ActionResult ForumList()
        {
            using (Repository repo = new Repository())
            {
                return View(Mapper.Map<IList<ForumModel>>(repo.GetList<Forum>()));
            }
        }

        //
        // GET: /Forum/
        public ActionResult Forum()
        {
            var forumIdentifier = Request.QueryString["ID"];
            if (forumIdentifier == null)
                return RedirectToAction("ForumList", "Forum");
            using (var repo = new Repository())
            {
                var forum = repo.Query<Forum>(Expression.Eq(Projections.Property("Identifier"), forumIdentifier)).First();
                return View(Mapper.Map<ForumModel>(forum));
            }
        }
    }
}
