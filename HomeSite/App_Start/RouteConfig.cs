using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace HomeSite
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
               "Forums", // Route name
               "Forums", // URL with parameters
               new { controller = "Forum", action = "ForumList", id = UrlParameter.Optional } // Parameter defaults
           );

            routes.MapRoute(
                "Forum", // Route name
                "Forum", // URL with parameters
                new { controller = "Forum", action = "Forum", id = UrlParameter.Optional } // Parameter defaults
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}