using MCGTech.Dal.Migrations;
using MCGTech.Dal.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MCGTech.Dal
{
    public class MCGTechContext : DbContext
    {
        public DbSet<Project> Projects { get; set; }

        public DbSet<Blog> Blogs { get; set; }

        public DbSet<BlogComment> BlogComments { get; set; } 

        public MCGTechContext()
            : base("name=MCGTechDatabase")
            {
                Database.SetInitializer(new MigrateDatabaseToLatestVersion<MCGTechContext, Configuration>()); 
                //Database.SetInitializer<MCGTechContext>(new DropCreateDatabaseIfModelChanges<MCGTechContext>());
            }
    }
}
