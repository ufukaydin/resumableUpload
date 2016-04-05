using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Xml;

namespace WebApplication13
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
          // verilerigetir("0");
         verilerigetirText("0");
        }
        public void verilerigetir(string start)
        {

            try
            {


                WebRequest request = WebRequest.Create(
                  "https://api.aa.com.tr/abone/search");

                //fd.append('filter_category', "1");
                //fd.append('start_date', "*");
                //fd.append('end_date', "NOW");
                //fd.append('offset', "0");
                //fd.append('limit', "100");
                //fd.append('filter_type', "2");
                //fd.append('filter_language', "1"); 



                request.Headers.Add("Authorization", "Basic eWF6aWxpbWFwaToxcWF6MndzWA==");

                request.Credentials = CredentialCache.DefaultCredentials;

                var postData = "";
                postData += "&start_date=01/09/2016";
                postData += "&end_date=NOW";
                postData += "&offset=" + start;
                postData += "&limit=100";
                postData += "&filter_type=2";
                postData += "&filter_language=1";
                var data = Encoding.ASCII.GetBytes(postData);

                request.Method = "POST";
                request.ContentType = "application/x-www-form-urlencoded";
                request.ContentLength = data.Length;

                using (var stream = request.GetRequestStream())
                {
                    stream.Write(data, 0, data.Length);
                }



                WebResponse response = request.GetResponse();

                Stream dataStream = response.GetResponseStream();

                StreamReader reader = new StreamReader(dataStream);

                string responseFromServer = reader.ReadToEnd();

                Response.Write(responseFromServer);

                Thread.Sleep(500);
                dynamic x = JsonConvert.DeserializeObject(responseFromServer);

                foreach (dynamic item in x.data.result)
                {

                    Thread.Sleep(500);
                    string id = item.group_id;
                    if (item.group_id != null)
                    {

                        request = WebRequest.Create(
                        "https://api.aa.com.tr/abone/document/" + item.group_id + "/newsml29");
                        request.Headers.Add("Authorization", "Basic eWF6aWxpbWFwaToxcWF6MndzWA==");

                        request.Credentials = CredentialCache.DefaultCredentials;
                        response = request.GetResponse();


                        var dataStreamx = response.GetResponseStream();


                        if (!File.Exists(@"C:\testKlasor\" + id.Split(':')[3] + ".xml"))
                        {
                            using (Stream s = File.Create(@"C:\testKlasor\" + id.Split(':')[3] + ".xml"))
                            {
                                dataStreamx.CopyTo(s);
                            }
                            try
                            {
                                XmlDocument xml = new XmlDocument();
                                xml.Load(@"C:\testKlasor\" + id.Split(':')[3] + ".xml");
                                foreach (XmlNode nodes in xml.GetElementsByTagName("newsItem"))
                                {
                                    Thread.Sleep(1000);
                                    request = WebRequest.Create(
                                "https://api.aa.com.tr/abone/document/" + nodes.Attributes["guid"].Value + "/web");
                                    request.Headers.Add("Authorization", "Basic eWF6aWxpbWFwaToxcWF6MndzWA==");

                                    request.Credentials = CredentialCache.DefaultCredentials;
                                    response = request.GetResponse();


                                    var dataStreamz = response.GetResponseStream();


                                  


                                    string idz = nodes.Attributes["guid"].Value;

                                    using (Stream s = File.Create(@"C:\testKlasor\" + idz.Split(':')[3] + ".jpg"))
                                    {
                                        dataStreamz.CopyTo(s);

                                    }
                                    dataStreamz.Close();


                                }
                            }
                            catch (Exception ex)
                            {
                                 
                                 File.AppendAllText(@"C:\testKlasor\Log\test.txt", id + Environment.NewLine);

                            }


                        }


                    }


                }

                reader.Close();
                response.Close();
                start = (Convert.ToInt32(start) + 100).ToString();
                verilerigetir(start);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public void verilerigetirText(string start)
        {

            try
            {


                WebRequest request = WebRequest.Create(
                  "https://api.aa.com.tr/abone/search");

                //fd.append('filter_category', "1");
                //fd.append('start_date', "*");
                //fd.append('end_date', "NOW");
                //fd.append('offset', "0");
                //fd.append('limit', "100");
                //fd.append('filter_type', "2");
                //fd.append('filter_language', "1"); 



                request.Headers.Add("Authorization", "Basic eWF6aWxpbWFwaToxcWF6MndzWA==");

                request.Credentials = CredentialCache.DefaultCredentials;

                var postData = "";
                postData += "&start_date=01/09/2016";
                postData += "&end_date=NOW";
                postData += "&offset=" + start;
                postData += "&limit=100";
                postData += "&filter_type=1";
                postData += "&filter_language=1";
                var data = Encoding.ASCII.GetBytes(postData);

                request.Method = "POST";
                request.ContentType = "application/x-www-form-urlencoded";
                request.ContentLength = data.Length;

                using (var stream = request.GetRequestStream())
                {
                    stream.Write(data, 0, data.Length);
                }



                WebResponse response = request.GetResponse();

                Stream dataStream = response.GetResponseStream();

                StreamReader reader = new StreamReader(dataStream);

                string responseFromServer = reader.ReadToEnd();

                Response.Write(responseFromServer);


                dynamic x = JsonConvert.DeserializeObject(responseFromServer);

                foreach (dynamic item in x.data.result)
                {


                    Thread.Sleep(1000);
                    int k = Dosya(item, "https://api.aa.com.tr");
                  



                }

                reader.Close();
                response.Close();
                start = (Convert.ToInt32(start) + 100).ToString();
                verilerigetirText(start);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public int Dosya(dynamic item, string ipamk)
        {
            string id = item.id;
            if (item.id != null)
            {
                WebRequest request = WebRequest.Create(
                   ipamk + "/abone/document/" + item.id + "/newsml29");
                request.Headers.Add("Authorization", "Basic eWF6aWxpbWFwaToxcWF6MndzWA==");

                request.Credentials = CredentialCache.DefaultCredentials;
                WebResponse response = request.GetResponse();


                var dataStreamx = response.GetResponseStream();

                StreamReader readerz = new StreamReader(dataStreamx);

                string responseFromServer1 = readerz.ReadToEnd();


                using (Stream s = File.Create(@"C:\testKlasor\" + id.Split(':')[3] + ".xml"))
                {
                    dataStreamx.CopyTo(s);
                }
                XmlDocument xml = new XmlDocument();
                dataStreamx.Close();
                readerz.Close();

                if (responseFromServer1.Contains("Dosya Bulunamadı") || responseFromServer1.Contains("yetkiniz yoktur"))
                {
                    File.AppendAllText(@"C:\testKlasor\Log\test.txt", "HATA: " + ipamk + " \"" + id + "\"," + responseFromServer1 + Environment.NewLine);
                    return 0; 
                }
                   
               


            }
            return 0;
        }
    }
}