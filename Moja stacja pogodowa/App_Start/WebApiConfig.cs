using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Microsoft.Owin.Security.OAuth;
using Moja_stacja_pogodowa.Interfaces;
using Moja_stacja_pogodowa.IoC;
using Moja_stacja_pogodowa.Repositories;
using Moja_stacja_pogodowa.Services;
using Newtonsoft.Json.Serialization;
using Unity;
using Unity.Lifetime;

namespace Moja_stacja_pogodowa
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            var container = new UnityContainer();
            container.RegisterType<IAPIRepository, APIRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IConfigRepository, ConfigRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IWidgetsRepository, WidgetsRepository>(new HierarchicalLifetimeManager());
            config.DependencyResolver = new UnityResolver(container);
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));
            // Web API routes
            config.MapHttpAttributeRoutes();
            //config.EnableCors(new EnableCorsAttribute("*", "*", "*"));

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            // Remove the XML formatter
            config.Formatters.Remove(config.Formatters.XmlFormatter);         
        }
    }
}
