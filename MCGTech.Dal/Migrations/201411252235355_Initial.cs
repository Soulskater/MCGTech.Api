namespace MCGTech.Dal.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
           CreateTable(
                "dbo.Ratings",
                c => new
                    {
                        RatingId = c.Int(nullable: false, identity: true),
                        UserId = c.String(),
                        Value = c.Int(nullable: false),
                        Created = c.DateTime(nullable: false),
                        Blog_BlogId = c.Int(),
                    })
                .PrimaryKey(t => t.RatingId)
                .ForeignKey("dbo.Blogs", t => t.Blog_BlogId)
                .Index(t => t.Blog_BlogId);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Ratings", "Blog_BlogId", "dbo.Blogs");
            DropIndex("dbo.Ratings", new[] { "Blog_BlogId" });
            DropTable("dbo.Ratings");
        }
    }
}
