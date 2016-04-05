using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web;

namespace VerdaTest
{
    /// <summary>
    /// Summary description for Handler1
    /// </summary>
    public class Handler1 : IHttpHandler
    {

        public void ProcessRequest(HttpContext context)
        {
            var request = (HttpWebRequest)WebRequest.Create("https://verdatest.borsaistanbul.com/files/download?type=203");

       

            request.Method = "GET";
            var kadisifre = System.Text.Encoding.UTF8.GetBytes("U2866API:U2866API");
           
            request.Headers.Add("Authorization", "Basic " + Convert.ToBase64String(kadisifre));

 

            var response = (HttpWebResponse)request.GetResponse();

            var responseString = new StreamReader(response.GetResponseStream()).ReadToEnd();
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