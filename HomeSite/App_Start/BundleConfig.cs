using System.Web;
using System.Web.Optimization;

namespace HomeSite
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.unobtrusive*",
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));
            bundles.Add(new ScriptBundle("~/bundles/moment").Include(
                        "~/Scripts/moment.js"));

            //
            //Google code pretiffy lib
            bundles.Add(new ScriptBundle("~/bundles/prettify").Include(
                        "~/Scripts/Prettify/run_prettify.js", "~/Scripts/Prettify/lang-css.js"));
            bundles.Add(new StyleBundle("~/Content/prettify/css").Include("~/Content/Prettify/prettify.css"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap")
                .Include("~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/bootstrap/css")
                .Include("~/Content/bootstrap.css", "~/Content/bootstrap-glyphicons.css"));

            //ANGULAR
            //
            //bundles.Add(new StyleBundle("~/Content/angular/css")
            //   .Include("~/Content/angular.css"));
            bundles.Add(new ScriptBundle("~/bundles/angular")
               .Include("~/Scripts/angular.js")
               .Include("~/Scripts/ui-bootstrap-0.5.0.js")
               //.Include("~/Scripts/angular-ui.js")
               .Include("~/Scripts/angular-sanitize.js"));

            bundles.Add(new ScriptBundle("~/Scripts/angular")
               .IncludeDirectory("~/Scripts/Models", "*.js")
               .IncludeDirectory("~/Scripts/Modules", "*.js")
               .IncludeDirectory("~/Scripts/Controllers", "*.js"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));
        }
    }
}