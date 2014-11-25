namespace MCGTech.Dal.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRateUserId : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Rates", "UserId", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Rates", "UserId");
        }
    }
}
