﻿using System;
using System.ComponentModel.DataAnnotations;

namespace MCGTech.Dal.Models
{
    public class Rating
    {
        [Key]
        public int RatingId { get; set; }

        public string UserId { get; set; }

        public Blog Blog { get; set; }

        public int Value { get; set; }

        public DateTime Created { get; set; }
    }
}
