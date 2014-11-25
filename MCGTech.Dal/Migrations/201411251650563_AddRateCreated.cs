namespace MCGTech.Dal.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRateCreated : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Rates", "Created", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Rates", "Created");
        }
    }
}
