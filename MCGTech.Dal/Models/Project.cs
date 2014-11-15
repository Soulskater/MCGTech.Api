using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCGTech.Dal.Models
{
    public class Project
    {
        [Key]
        public int ProjectId { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public string GithubUrl { get; set; }
        public string GithubPageUrl { get; set; }
        public string Color { get; set; }
    }
}
