using System;

namespace MCGTech.Api.Models
{
    public class BlogPostDraftDTO
    {
        public int BlogPostDraftId { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime LastSaved { get; set; }
    }
}