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
        public void RateBlog(RatingDTO rate)
        {
            var user = _repo.FindUser(User.Identity.Name);

            using (var context = new MCGTech.Dal.MCGTechContext())
            {
                var blog = context.Blogs.FirstOrDefault(a => a.BlogId == rate.BlogId);
                if (blog == null || blog.Ratings.Any(r => r.UserId == user.UserName))
                {
                    return;
                }
                blog.Ratings.Add(new Rating()
                {
                    UserId = user.UserName,
                    Value = rate.Value,
                    Created = DateTime.Now
                });
                context.SaveChanges();
            }
        }

        [Route("draft")]
        public List<BlogPostDraftDTO> GetBlogPostDrafts()
        {
            var context = new MCGTech.Dal.MCGTechContext();
            var drafts = AutoMapper.Mapper.Map<List<BlogPostDraftDTO>>(context.BlogPostDrafts.ToList());

            drafts.Sort(delegate(BlogPostDraftDTO x, BlogPostDraftDTO y)
            {
                return -1 * (x.LastSaved.CompareTo(y.LastSaved));
            });
            return drafts;
        }

        [Route("draft/save")]
        [HttpPost]
        public BlogPostDraftDTO SaveBlogPostDraft([FromBody]BlogPostDraftDTO draft)
        {
            var user = _repo.FindUser(User.Identity.Name);

            BlogPostDraft blogPostDraft;

            using (var context = new MCGTech.Dal.MCGTechContext())
            {
                blogPostDraft = context.BlogPostDrafts.FirstOrDefault(a => a.BlogPostDraftId == draft.BlogPostDraftId);
                if (blogPostDraft != null)
                {
                    blogPostDraft = AutoMapper.Mapper.Map<BlogPostDraft>(draft);
                }
                else
                {
                    blogPostDraft = context.BlogPostDrafts.Add(new BlogPostDraft()
                    {
                        UserId = user.UserName,
                        Title = draft.Title,
                        Content = draft.Content,
                        LastSaved = DateTime.Now
                    });
                }
                context.SaveChanges();
            }

            return AutoMapper.Mapper.Map<BlogPostDraftDTO>(blogPostDraft);
        }

        [Route("draft/delete")]
        [HttpPost]
        public void DeleteBlogPostDraft([FromBody]int blogPostDraftId)
        {
            using (var context = new MCGTech.Dal.MCGTechContext())
            {
                var blogPostDraft = context.BlogPostDrafts.FirstOrDefault(draft => draft.BlogPostDraftId == blogPostDraftId);
                context.BlogPostDrafts.Remove(blogPostDraft);
                context.SaveChanges();
            }
        }

        [Route("create")]
        [HttpPost]
        public void SaveBlogPost([FromBody]BlogPostDraftDTO draft)
        {
            var user = _repo.FindUser(User.Identity.Name);

            using (var context = new MCGTech.Dal.MCGTechContext())
            {
                context.Blogs.Add(new Blog()
                {
                    Title = draft.Title,
                    Content = draft.Content,
                    Created = DateTime.Now
                });
                context.SaveChanges();
            }
        }
    }
}
