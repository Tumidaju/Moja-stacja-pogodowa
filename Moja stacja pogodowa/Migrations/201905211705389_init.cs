namespace Moja_stacja_pogodowa.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.APIs",
                c => new
                {
                    Id = c.Int(nullable: false, identity: true),
                    Name = c.String(nullable: false),
                    URL = c.String(nullable: false),
                })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Id, unique: true, name: "APIsIndex");
            CreateTable(
                "dbo.Config",
                c => new
                {
                    Id = c.Int(nullable: false,identity:true),
                    UserId = c.String(nullable: false, maxLength: 128),
                    APIId = c.Int(nullable: false),
                    APIKey = c.String(nullable: false, maxLength: 256),
                    Latitude = c.String(nullable: false, maxLength: 256),
                    Longtitude = c.String(nullable: false, maxLength: 256),
                })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .ForeignKey("dbo.APIs", t => t.APIId, cascadeDelete: true)
                .Index(t => t.Id, unique: true, name: "ConfigIndex");

            CreateTable(
                "dbo.AspNetRoles",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Name = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Name, unique: true, name: "RoleNameIndex");
            
            CreateTable(
                "dbo.AspNetUserRoles",
                c => new
                    {
                        UserId = c.String(nullable: false, maxLength: 128),
                        RoleId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.UserId, t.RoleId })
                .ForeignKey("dbo.AspNetRoles", t => t.RoleId, cascadeDelete: true)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.RoleId);
            
            CreateTable(
                "dbo.AspNetUsers",
                c => new
                    {
                        Id = c.String(nullable: false, maxLength: 128),
                        Email = c.String(maxLength: 256),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(nullable: false, maxLength: 256),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.UserName, unique: true, name: "UserNameIndex");
            
            CreateTable(
                "dbo.AspNetUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.String(nullable: false, maxLength: 128),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.AspNetUserLogins",
                c => new
                    {
                        LoginProvider = c.String(nullable: false, maxLength: 128),
                        ProviderKey = c.String(nullable: false, maxLength: 128),
                        UserId = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => new { t.LoginProvider, t.ProviderKey, t.UserId })
                .ForeignKey("dbo.AspNetUsers", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            Sql("SET IDENTITY_INSERT [dbo].[APIs] ON ; INSERT[dbo].[APIs]([Id], [Name], [URL]) VALUES(1, N'Open Weather Map', N'api.openweathermap.org/data/2.5/');SET IDENTITY_INSERT[dbo].[APIs] OFF;");
            Sql("INSERT [dbo].[AspNetUsers] ([Id], [Email], [EmailConfirmed], [PasswordHash], [SecurityStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEndDateUtc], [LockoutEnabled], [AccessFailedCount], [UserName]) VALUES (N'67c345b9-5e79-42f2-bd24-324577e28a9e', N'admin@myweather.com', 0, N'AKGzGSw5rpO6Qwy7tK9GgbTDvzmCfaJBfCJ81KMGwRqodauJ/q30vOVQcnXpT8vihA==', N'80665c98-90cf-46ef-a64d-ac3b461eb3fd', NULL, 0, 0, NULL, 0, 0, N'admin@myweather.com')");
            Sql("INSERT [dbo].[AspNetRoles] ([Id], [Name]) VALUES (N'1', N'Administrator')");
            Sql("INSERT [dbo].[AspNetUserRoles] ([UserId], [RoleId]) VALUES (N'67c345b9-5e79-42f2-bd24-324577e28a9e', N'1')");
            Sql("SET IDENTITY_INSERT [dbo].[Config] ON ;INSERT [dbo].[Config] ([Id], [UserId], [APIId], [APIKey], [Latitude], [Longtitude]) VALUES (1, N'67c345b9-5e79-42f2-bd24-324577e28a9e', 1, N'test_klucz', N'50.0618', N'19.938');SET IDENTITY_INSERT [dbo].[Config] OFF;");
        }

        public override void Down()
        {
            DropForeignKey("dbo.Config", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.Config", "APIId", "dbo.APIs");
            DropForeignKey("dbo.AspNetUserRoles", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserLogins", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserClaims", "UserId", "dbo.AspNetUsers");
            DropForeignKey("dbo.AspNetUserRoles", "RoleId", "dbo.AspNetRoles");
            DropIndex("dbo.AspNetUserLogins", new[] { "UserId" });
            DropIndex("dbo.AspNetUserClaims", new[] { "UserId" });
            DropIndex("dbo.AspNetUsers", "UserNameIndex");
            DropIndex("dbo.AspNetUserRoles", new[] { "RoleId" });
            DropIndex("dbo.AspNetUserRoles", new[] { "UserId" });
            DropIndex("dbo.AspNetRoles", "RoleNameIndex");
            DropTable("dbo.AspNetUserLogins");
            DropTable("dbo.AspNetUserClaims");
            DropTable("dbo.AspNetUsers");
            DropTable("dbo.AspNetUserRoles");
            DropTable("dbo.AspNetRoles");
        }
    }
}
