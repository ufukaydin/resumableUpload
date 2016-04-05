using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using System.Web;

namespace WebApplication8
{
    /// <summary>
    /// Summary description for Handler1
    /// </summary>
    public class Handler1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            try
            {
                byte[] x = context.Request.BinaryRead(context.Request.ContentLength);
                var name = context.Request.Headers["filename"];

                using (var stream = new FileStream(@"C:\ufuk\" + name, FileMode.Append))
                {
                    FileInfo d = new FileInfo(@"C:\ufuk\" + name);
                    stream.Write(x, 0, x.Length);
                    context.Response.Write(d.Length);
                  
                }

            }
            catch (Exception ex)
            {


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