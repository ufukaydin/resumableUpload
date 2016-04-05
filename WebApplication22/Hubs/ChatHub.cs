using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;
namespace WebApplication22.Hubs
{
    public class ChatHub : Hub
    {
        public void Deneme()
        { 
            
              Clients.Group("Test").deneme("ddd");
        }
        public override System.Threading.Tasks.Task OnReconnected()
        {
            return base.OnReconnected();
        }
        public override System.Threading.Tasks.Task OnDisconnected(bool Stop)
        {
             
            return base.OnDisconnected(Stop);
        }

        public override System.Threading.Tasks.Task OnConnected()
        {

            Groups.Add(Context.ConnectionId, "Test");

            var v = base.OnConnected();
            return v;
        }
    }
}
