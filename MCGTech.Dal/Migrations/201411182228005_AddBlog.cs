namespace MCGTech.Dal.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddBlog : DbMigration
    {
        public override void Up()
        {
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
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.BlogComments", "Blog_BlogId", "dbo.Blogs");
            DropIndex("dbo.BlogComments", new[] { "Blog_BlogId" });
            DropTable("dbo.BlogComments");
            DropTable("dbo.Blogs");
        }
    }
}
