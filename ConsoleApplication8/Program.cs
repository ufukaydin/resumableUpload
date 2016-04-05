using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml;

namespace ConsoleApplication8
{
    class Program
    {
        static void Main(string[] args)
        {
            var t = new Thread(() => verilerigetirFoto("0"));
            t.Start();

            var t1 = new Thread(() => verilerigetirText("0"));
            t1.Start();


            Console.Read();
        }

        public static void verilerigetirFoto(string start)
        {

            try
            {


                WebRequest request = WebRequest.Create(
                  "https://apiv2.aa.com.tr/abone/search");

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
                postData += "&start_date=*";
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

              


                dynamic x = JsonConvert.DeserializeObject(responseFromServer);

                foreach (dynamic item in x.data.result)
                {
                    string id = item.group_id;
                    if (item.group_id != null)
                    {

                        request = WebRequest.Create(
                        "https://apiv2.aa.com.tr/abone/document/" + item.group_id + "/newsml12");
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
                                    request = WebRequest.Create(
                                "https://apiv2.aa.com.tr/abone/document/" + nodes.Attributes["guid"].Value + "/print");
                                    request.Headers.Add("Authorization", "Basic eWF6aWxpbWFwaToxcWF6MndzWA==");

                                    request.Credentials = CredentialCache.DefaultCredentials;
                                    response = request.GetResponse();

                                    var dataStreamz = response.GetResponseStream();

                                    string idz = nodes.Attributes["guid"].Value;

                                    using (Stream s = File.Create(@"C:\testKlasor\foto\" + idz.Split(':')[3] + ".jpg"))
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
                verilerigetirFoto(start);

            }
            catch (Exception)
            {
                throw;
            }
        }

        public static void verilerigetirText(string start)
        {

            try
            {


                WebRequest request = WebRequest.Create(
                  "https://apiv2.aa.com.tr/abone/search");

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
                postData += "&start_date=*";
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

           


                dynamic x = JsonConvert.DeserializeObject(responseFromServer);

                foreach (dynamic item in x.data.result)
                {
                    string id = item.id;
                    if (item.id != null)
                    {

                        request = WebRequest.Create(
                        "https://apiv2.aa.com.tr/abone/document/" + item.id + "/newsml12");
                        request.Headers.Add("Authorization", "Basic eWF6aWxpbWFwaToxcWF6MndzWA==");

                        request.Credentials = CredentialCache.DefaultCredentials;
                        response = request.GetResponse();


                        var dataStreamx = response.GetResponseStream();


                        if (!File.Exists(@"C:\testKlasor\" + id.Split(':')[3] + ".xml"))
                        {
                            using (Stream s = File.Create(@"C:\testKlasor\text\" + id.Split(':')[3] + ".xml"))
                            {
                                dataStreamx.CopyTo(s);
                            }



                        }


                    }


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
    }
}
