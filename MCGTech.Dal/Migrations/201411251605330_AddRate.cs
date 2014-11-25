namespace MCGTech.Dal.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRate : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Rates",
                c => new
                    {
                        RateId = c.Int(nullable: false, identity: true),
                        Value = c.Int(nullable: false),
                        Blog_BlogId = c.Int(),
                    })
                .PrimaryKey(t => t.RateId)
                .ForeignKey("dbo.Blogs", t => t.Blog_BlogId)
                .Index(t => t.Blog_BlogId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Rates", "Blog_BlogId", "dbo.Blogs");
            DropIndex("dbo.Rates", new[] { "Blog_BlogId" });
            DropTable("dbo.Rates");
        }
    }
}
