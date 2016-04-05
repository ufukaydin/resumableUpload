using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace resumableUpload.Handlers
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
                var name = context.Request.Headers["filename"];
                if (Convert.ToBoolean(context.Request.Headers["isResume"]))
                {
                    using (var stream = new FileStream(@"C:\ufuk\" + name, FileMode.Append))
                    {
                        FileInfo d = new FileInfo(@"C:\ufuk\" + name);
                        context.Response.Write(d.Length);

                    }

                }
                else if (!Convert.ToBoolean(context.Request.Headers["isResume"]))
                {
                    byte[] x = context.Request.BinaryRead(context.Request.ContentLength);


                    using (var stream = new FileStream(@"C:\ufuk\" + name, FileMode.Append))
                    {
                        FileInfo d = new FileInfo(@"C:\ufuk\" + name); 
                        stream.Write(x, 0, x.Length);
                        context.Response.Write(d.Length);

                    }
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