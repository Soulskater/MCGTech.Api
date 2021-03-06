﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCGTech.Dal.Models
{
    public class BlogPostDraft
    {
        [Key]
        public int BlogPostDraftId { get; set; }

        public string UserId { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime LastSaved { get; set; }
    }
}
