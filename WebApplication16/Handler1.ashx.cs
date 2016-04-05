using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace WebApplication16
{
    /// <summary>
    /// Summary description for Handler1
    /// </summary>
    public class Handler1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            FileInfo file = new FileInfo(@"C:\ufuk\AAVIDEOYAYIN_7258252_100120161422190000_R_POL_20160110000000_aa-video-20160110-7258252.mpg"); 
            if (file.Exists)
            {
                try
                {
               
                    context.Response.AddHeader("Content-Length", file.Length.ToString());
                    context.Response.ContentType = "video/mpeg";
                    context.Response.AppendHeader("Content-Disposition", "attachment; filename=" + file.Name);
                    context.Response.TransmitFile(file.FullName);
                    context.Response.Flush();
                }
                catch (Exception)
                {

                    throw new Exception("Dosya okuma hatası.");
                }


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