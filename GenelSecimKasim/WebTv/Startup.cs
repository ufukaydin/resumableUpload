using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Configuration;
using Microsoft.AspNet.SignalR.Infrastructure;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebTv
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            var Hub = new HubConfiguration(); 
            Hub.EnableDetailedErrors = true;
            var idProvider = new PrincipalUserIdProvider();
            GlobalHost.DependencyResolver.Register(typeof(IUserIdProvider), () => idProvider);
            var config = GlobalHost.DependencyResolver.Resolve<IConfigurationManager>();
            app.MapSignalR();
        }
    }
}
