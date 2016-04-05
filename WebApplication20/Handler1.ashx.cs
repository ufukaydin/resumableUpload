using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication20
{
    /// <summary>
    /// Summary description for Handler1
    /// </summary>
    public class Handler1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            context.Response.Status = "404 dosya sistemde mevcut degil"; 
            context.Response.StatusCode = 404;
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