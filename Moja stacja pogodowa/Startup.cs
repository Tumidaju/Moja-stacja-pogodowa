using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Serilog;

[assembly: OwinStartup(typeof(Moja_stacja_pogodowa.Startup))]

namespace Moja_stacja_pogodowa
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
            ConfigureAuth(app);
            Log.Logger = new LoggerConfiguration()
            .MinimumLevel.Warning()
            .WriteTo.File("log.txt")
            .CreateLogger();
        }
    }
}
