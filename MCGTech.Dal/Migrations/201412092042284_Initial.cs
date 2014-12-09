namespace MCGTech.Dal.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.BlogComments",
                c => new
                    {
                        BlogCommentId = c.Int(nullable: false, identity: true),
                        UserId = c.String(),
                        Comment = c.String(),
                        Created = c.DateTime(nullable: false),
                        Blog_BlogId = c.Int(),
                    })
                .PrimaryKey(t => t.BlogCommentId)
                .ForeignKey("dbo.Blogs", t => t.Blog_BlogId)
                .Index(t => t.Blog_BlogId);
            
            CreateTable(
                "dbo.Blogs",
                c => new
                    {
                        BlogId = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        Content = c.String(),
                        Created = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.BlogId);
            
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
            
            CreateTable(
                "dbo.BlogPostDrafts",
                c => new
                    {
                        BlogPostDraftId = c.Int(nullable: false, identity: true),
                        UserId = c.String(),
                        Title = c.String(),
                        Content = c.String(),
                        LastSaved = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.BlogPostDraftId);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        ProjectId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Description = c.String(),
                        GithubUrl = c.String(),
                        GithubPageUrl = c.String(),
                        Color = c.String(),
                    })
                .PrimaryKey(t => t.ProjectId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Ratings", "Blog_BlogId", "dbo.Blogs");
            DropForeignKey("dbo.BlogComments", "Blog_BlogId", "dbo.Blogs");
            DropIndex("dbo.Ratings", new[] { "Blog_BlogId" });
            DropIndex("dbo.BlogComments", new[] { "Blog_BlogId" });
            DropTable("dbo.Projects");
            DropTable("dbo.BlogPostDrafts");
            DropTable("dbo.Ratings");
            DropTable("dbo.Blogs");
            DropTable("dbo.BlogComments");
        }
    }
}
