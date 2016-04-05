using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Transports;
using Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebApplication22
{
    class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            string sqlConnectionString = "Server=localhost;Database=SignalR;Trusted_Connection=True;";
            GlobalHost.DependencyResolver.UseSqlServer(sqlConnectionString);
            var tm = GlobalHost.DependencyResolver.Resolve<ITransportManager>() as TransportManager;
            tm.Remove("foreverFrame");
            tm.Remove("longPolling");
            tm.Remove("serverSentEvents");
            app.MapSignalR();
        }
    }
}
