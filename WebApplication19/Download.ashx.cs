using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;

namespace WebApplication19
{
     
    public class Download : IHttpHandler
    {

        public static bool DownloadFile(HttpContext httpContext, string filePath)
        {
            bool ret = true;
            try
            {

                switch (httpContext.Request.HttpMethod.ToUpper())
                {  
                    case "GET":
                    case "HEAD":
                        break;
                    default:
                        httpContext.Response.StatusCode = 501;
                        return false;
                }
                if (!File.Exists(filePath))
                {
                    httpContext.Response.StatusCode = 404;
                    return false;
                }



                long startBytes = 0;
                int packSize = 1024 * 10; //read in block，every block 10K bytes
                string fileName = Path.GetFileName(filePath);
                FileInfo myFile = new FileInfo(filePath);
                long fileLength = myFile.Length;
                 
                string lastUpdateTiemStr = File.GetLastWriteTimeUtc(filePath).ToString("r");
                string eTag = HttpUtility.UrlEncode(fileName, Encoding.UTF8) + lastUpdateTiemStr;

                //validate whether the file is too large
                if (myFile.Length > Int64.MaxValue)
                {
                    httpContext.Response.StatusCode = 413;
                    return false;
                }

                if (httpContext.Request.Headers["If-Range"] != null)
                {

                    if (httpContext.Request.Headers["If-Range"].Replace("\"", "") != eTag)
                    {
                        httpContext.Response.StatusCode = 412;
                        return false;
                    }
                }


                try
                {


                    httpContext.Response.Clear();
                    httpContext.Response.Buffer = false;
                    httpContext.Response.AddHeader("Content-MD5", getMd5Hash(myFile.Name));
                    httpContext.Response.AddHeader("Accept-Ranges", "bytes");
                    httpContext.Response.AppendHeader("ETag", "\"" + eTag + "\"");
                    httpContext.Response.AppendHeader("Last-Modified", lastUpdateTiemStr);
                    httpContext.Response.ContentType = "application/octet-stream";
                    httpContext.Response.AddHeader("Content-Disposition", "attachment;filename=" +

                    HttpUtility.UrlEncode(fileName, Encoding.UTF8).Replace("+", "%20"));
                    httpContext.Response.AddHeader("Content-Length", (fileLength - startBytes).ToString());
                    httpContext.Response.AddHeader("Connection", "Keep-Alive");
                    httpContext.Response.ContentEncoding = Encoding.UTF8;
                    if (httpContext.Request.Headers["Range"] != null)
                    {
                        httpContext.Response.StatusCode = 206;
                        string[] range = httpContext.Request.Headers["Range"].Split(new char[] { '=', '-' });
                        startBytes = Convert.ToInt64(range[1]);
                        if (startBytes < 0 || startBytes >= fileLength)
                        {
                            return false;
                        }
                    }
                    if (startBytes > 0)
                    {
                        httpContext.Response.AddHeader("Content-Range", string.Format(" bytes {0}-{1}/{2}", startBytes, fileLength - 1, fileLength));
                    }

                    //send data  
                    int maxCount = (int)Math.Ceiling((fileLength - startBytes + 0.0) / packSize);//download in block
                    for (int i = 0; i < maxCount && httpContext.Response.IsClientConnected; i++)
                    {
                        httpContext.Response.TransmitFile(myFile.FullName, packSize * i, packSize * (i + 1));
                        httpContext.Response.Flush();

                    }

                }
                catch
                {
                    ret = false;
                }
                finally
                {

                }
            }
            catch
            {
                ret = false;
            }
            return ret;
        }
        public static string getMd5Hash(string input)
        {
            // Create a new instance of the MD5CryptoServiceProvider object.
            MD5 md5Hasher = MD5.Create();

            // Convert the input string to a byte array and compute the hash.
            byte[] data = md5Hasher.ComputeHash(Encoding.Default.GetBytes(input));

            // Create a new Stringbuilder to collect the bytes
            // and create a string.
            StringBuilder sBuilder = new StringBuilder();

            // Loop through each byte of the hashed data 
            // and format each one as a hexadecimal string.
            for (int i = 0; i < data.Length; i++)
            {
                sBuilder.Append(data[i].ToString("x2"));
            }

            // Return the hexadecimal string.
            return sBuilder.ToString();
        }

        public void ProcessRequest(HttpContext context)
        {



            DownloadFile(context, @"C:\ufuk\adsız klasör 3\Visual Studio 2015 Ent.iso");
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