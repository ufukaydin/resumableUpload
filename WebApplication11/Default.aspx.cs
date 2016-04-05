using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication11
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            Uri url = new Uri("http://mobilesrv.aa.com.tr/mobile-server/request/news/getListById");
            HttpWebRequest webRequest = (HttpWebRequest)WebRequest.Create(url);
            webRequest.Method = "POST";
            webRequest.ContentType = "application/json";


            //Burada GetrequestStramCallbacke Json object göndermem gerek aşağıda işlemk için
            //GetRequestStreamCallback de tanımladığım Json objecti burdan gönderirsem işimi görecek

            JObject json = new JObject(new JProperty("tabId", 3),
           new JProperty("languageId", 1),
           new JProperty("idList", null),
          new JProperty("latestDate", 0));
            var stream = webRequest.GetRequestStream();
            using (StreamWriter sw = new StreamWriter(stream))
            {
                using (JsonWriter writer = new JsonTextWriter(sw))
                {
                    json.WriteTo(writer, null);
                }
            }


            IAsyncResult ar = webRequest.BeginGetResponse(new AsyncCallback(GetAsyncResponse), webRequest);


        }


        private void GetAsyncResponse(IAsyncResult result)
        {
            HttpWebRequest request = (HttpWebRequest)result.AsyncState;
            if (request.HaveResponse)
            {
                var response = (HttpWebResponse)request.EndGetResponse(result);
                var reader = new System.IO.StreamReader(response.GetResponseStream());
                var data = reader.ReadToEnd(); //BURAYA DATA DÖNER ABİ 

            }
        }
    }
}