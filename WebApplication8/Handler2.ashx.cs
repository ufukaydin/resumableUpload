using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace WebApplication8
{
    /// <summary>
    /// Summary description for Handler2
    /// </summary>
    public class Handler2 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
          
            var name = context.Request.Headers["filename"];
            FileInfo d = new FileInfo(@"C:\ufuk\" + name);
            if (d.Exists)
            {
                context.Response.Write(d.Length); 
            }
            else
            {
                context.Response.Write("0");
            }
           
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}