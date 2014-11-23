using MCGTech.Api.Models;
using MCGTech.Dal;
using MCGTech.Dal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
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
            List<BlogDTO> blogs = new List<BlogDTO>();
            var context = new MCGTech.Dal.MCGTechContext();
            context.Blogs.ToList().ForEach(blog =>
            {
                blogs.Add(new BlogDTO()
                {
                    Title = blog.Title,
                    Content = blog.Content,
                    Created = blog.Created,
                    BlogId = blog.BlogId,
                    Comments = blog.Comments.Select(comment => new BlogCommentDTO()
                    {
                        Comment = comment.Comment,
                        BlogId = blog.BlogId,
                        Created = comment.Created,
                        User = new UserProfile(_repo.FindUser(comment.UserId))
                    }).ToList()
                });
            });
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
    }
}
