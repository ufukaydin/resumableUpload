using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Web;

namespace Sha
{
    /// <summary>
    /// Summary description for DosyaYukle
    /// </summary>
    public class DosyaYukle : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            if (context.Request.Files.Count > 0)
            {
                byte[] fileData = null;
                using (var binaryReader = new BinaryReader(context.Request.Files[0].InputStream))
                {
                    fileData = binaryReader.ReadBytes(context.Request.Files[0].ContentLength);

                    context.Response.ContentType = "text/plain";
                    context.Response.Write(getBase64SHA256Hash(fileData));
                }
            }

          
        }
        static string getBase64SHA256Hash(byte[] documentBytes)
        {
            SHA256Managed hashstring = new SHA256Managed();
            byte[] hash = hashstring.ComputeHash(documentBytes);
            return Convert.ToBase64String(hash);
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