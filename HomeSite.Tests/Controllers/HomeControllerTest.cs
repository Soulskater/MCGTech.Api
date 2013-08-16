using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using HomeSite;
using HomeSite.Controllers;
using HomeSite.Dal;
using HomeSite.Dal.Domain;
using NHibernate.Criterion;

namespace HomeSite.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Index()
        {
            using (var repo = new Repository())
            {
                var user = repo.Query<User>(Expression.Eq(Projections.Property("UserID"), 6)).First();

                var group = new ChatGroup()
                {
                    Created = DateTime.Now,
                    Inactive = false,
                    Users = new List<User>() { user },
                };
                group.ChatLogs.Add(new ChatLog()
                {
                    Created = DateTime.Now,
                    Message = "TestMessage",
                    Sender = user
                });

                repo.Add(group);
                var list = repo.GetList<ChatGroup>();
            }
        }

        [TestMethod]
        public void About()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.About() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }

        [TestMethod]
        public void Contact()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Contact() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
        }
    }
}
