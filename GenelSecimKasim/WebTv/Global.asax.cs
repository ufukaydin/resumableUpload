using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using System.Xml;
using System.Runtime.Caching;
using Newtonsoft.Json;
using System.Reflection;
namespace WebTv
{
    public class Global : System.Web.HttpApplication
    {
        public static ObjectCache cache = MemoryCache.Default;
        protected void Application_Start(object sender, EventArgs e)
        {

            try
            { 
                string tempXml = File.ReadAllText(HttpContext.Current.Server.MapPath(@"~\") + "/Scripts/AA_Secim2015_Ilce.txt");
                XmlDocument xml = new XmlDocument();
                xml.LoadXml(tempXml);
                XmlDocument JsonString = xml;
                foreach (XmlNode ilNode in JsonString["AA"]["IlceSonuclari"])
                {
                    string IlKodu = ilNode.Attributes["Kod"].Value;
                    cache.Set("EskiIl_" + IlKodu, JsonConvert.SerializeObject(ilNode).Replace("@", ""), new CacheItemPolicy() { AbsoluteExpiration = ObjectCache.InfiniteAbsoluteExpiration });

                }
            }
            catch (Exception ex)
            {
                
              
            }
          
        }
       
        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        protected void Application_Error(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}