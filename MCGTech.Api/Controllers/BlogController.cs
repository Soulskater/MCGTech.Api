using MCGTech.Api.Models;
using MCGTech.Dal;
using MCGTech.Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace MCGTech.Api.Controllers
{
    [RoutePrefix("api/Blog")]
    [Authorize]
    public class BlogController : ApiController
    {
        private AuthRepository _repo = null;

        public BlogController()
        {
            _repo = new AuthRepository();
        }

        [AllowAnonymous]
        public List<Blog> Get()
        {
            using (var context = new MCGTech.Dal.MCGTechContext())
            {
                return context.Blogs.ToList();
            }
        }

        [Route("create")]
        [HttpPost]
        public void CreateBlogEntry([FromBody]BlogEntryModel newEntry)
        {
            using (var context = new MCGTechContext())
            {
                context.Blogs.Add(new Blog()
                {
                    Title = newEntry.Title,
                    Content = newEntry.Content,
                    Created = DateTime.Now
                });
                context.SaveChanges();
            }
        }

        [Route("comment/create")]
        [HttpPost]
        public async void CreateComment(int blogId, string comment)
        {
            var user = await _repo.FindUser(User.Identity.Name);

            using (var context = new MCGTech.Dal.MCGTechContext())
            {
                var blog = context.Blogs.FirstOrDefault(a => a.BlogId == blogId);
                if (blog == null)
                {
                    return;
                }
                blog.Comments.Add(new BlogComment()
                {
                    UserId = user.Id,
                    Comment = comment
                });

                context.SaveChanges();
            }
        }
    }
}
