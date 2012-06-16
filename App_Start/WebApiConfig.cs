using System.Web.Http;

namespace WebstackOfLove
{
    public static class WebApiConfig
    {
        public static void Initialize(HttpConfiguration config)
        {
            config.Routes.MapHttpRoute(
                "apiRoute",
                "api/{controller}/{id}",
                new { id = RouteParameter.Optional }
            );
        }
    }
}