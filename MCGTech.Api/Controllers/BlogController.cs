using MCGTech.Api.Models;
using MCGTech.Dal;
using MCGTech.Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
        public List<BlogDTO> Get()
        {
            var context = new MCGTech.Dal.MCGTechContext();
            var blogs = AutoMapper.Mapper.Map<List<BlogDTO>>(context.Blogs.ToList());

            blogs.Sort(delegate(BlogDTO x, BlogDTO y)
            {
                return -1 * (x.Created.CompareTo(y.Created));
            });
            return blogs;
        }

        [Route("create")]
        [HttpPost]
        public void CreateBlogEntry([FromBody]BlogDTO newEntry)
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
        public void CreateComment([FromBody]BlogCommentDTO newComment)
        {
            var user = _repo.FindUser(User.Identity.Name);

            using (var context = new MCGTech.Dal.MCGTechContext())
            {
                var blog = context.Blogs.FirstOrDefault(a => a.BlogId == newComment.BlogId);
                if (blog == null)
                {
                    return;
                }
                blog.Comments.Add(new BlogComment()
                {
                    UserId = user.UserName,
                    Comment = newComment.Comment,
                    Created = DateTime.Now
                });
                context.SaveChanges();
            }
        }

        [Route("rate")]
        [HttpPost]
        public void RateBlog(RateDTO rate)
        {
            var user = _repo.FindUser(User.Identity.Name);

            using (var context = new MCGTech.Dal.MCGTechContext())
            {
                var blog = context.Blogs.FirstOrDefault(a => a.BlogId == rate.BlogId);
                if (blog == null || blog.Rates.Any(r=> r.UserId == user.UserName))
                {
                    return;
                }
                blog.Rates.Add(new Rate()
                {
                    UserId = user.UserName,
                    Value = rate.Value,
                    Created = DateTime.Now
                });
                context.SaveChanges();
            }
        }
    }
}
