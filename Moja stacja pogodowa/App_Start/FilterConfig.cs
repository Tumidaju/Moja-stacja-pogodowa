using System.Web;
using System.Web.Mvc;

namespace Moja_stacja_pogodowa
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
