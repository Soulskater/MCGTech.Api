using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MCGTech.Api.Models
{
    public class RateDTO
    {
        public int Value { get; set; }

        public int BlogId { get; set; }

        public DateTime Created { get; set; }
    }
}