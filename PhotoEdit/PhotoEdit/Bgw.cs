using SAP.Middleware.Connector;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Configuration;
namespace PhotoEdit
{
    public class Bgw
    {
        public static bool Durum { get; set; }

        public Bgw()
        {
        }
        public static string LocalUrl = ConfigurationManager.AppSettings["Url"];
        private static BackgroundWorker bw = new BackgroundWorker();
        public static ObservableCollection<UrlSicil> Liste = new ObservableCollection<UrlSicil>();
        public static void Start()
        {


            if (!Durum)
            {
                Liste.CollectionChanged += Liste_CollectionChanged;
                bw.DoWork += bw_DoWork;
                bw.RunWorkerAsync();
            }

        }

        public static void Liste_CollectionChanged(object sender, System.Collections.Specialized.NotifyCollectionChangedEventArgs e)
        {
            if (e.Action == System.Collections.Specialized.NotifyCollectionChangedAction.Add)
            {

                try
                {
                    UrlSicil urlsic = (UrlSicil)e.NewItems[0];
                    WebClient wc = new WebClient();
                    byte[] bytes = wc.DownloadData(urlsic.url);
                    MemoryStream ms = new MemoryStream(bytes);
                    using (System.Drawing.Image original = System.Drawing.Image.FromStream(ms))
                    {

                        int newHeight = 640 * original.Height / original.Width;
                        int newWidth = 640;

                        using (System.Drawing.Bitmap newPic = new System.Drawing.Bitmap(newWidth, newHeight))
                        {
                            using (System.Drawing.Graphics gr = System.Drawing.Graphics.FromImage(newPic))
                            {
                                gr.DrawImage(original, 0, 0, (newWidth), (newHeight));
                                string newFilename = LocalUrl + urlsic.sicil;
                                newPic.Save(newFilename, System.Drawing.Imaging.ImageFormat.Jpeg);
                            }
                        }
                    }
                }
                catch (Exception)
                {


                }

            }

        }
        public static void Stop()
        {
            if (Durum)
            {
                bw.CancelAsync();
            }

        }

        public static void bw_DoWork(object sender, DoWorkEventArgs e)
        {
            while (true)
            {
                YenileriAl();
                TimeSpan t = new TimeSpan(2, 0, 0);
                Thread.Sleep(t);
            }
        }
        public static void YenileriAl()
        {

            try
            {
                Liste.Clear();
                if (RfcDestinationManager.TryGetDestination("PRD_000") == null)
                {
                    RfcDestinationManager.RegisterDestinationConfiguration(new SapBackendConfig());
                }
                RfcDestination d = RfcDestinationManager.GetDestination("PRD_000");
                RfcRepository r = d.Repository;
                IRfcFunction f = r.CreateFunction("Z_PERS_FOTO_TOPLU");
                IRfcTable t = f.GetTable("SICIL_URL");
                f.Invoke(d);

                foreach (var item in t)
                {

                    int sicil = Convert.ToInt32(item.GetString("SICIL"));
                    string url = "https://ikbs.aa.com.tr" + item.GetString("URL");
                    if (Liste.Where(o => o.sicil == sicil + ".jpg").Count() == 0)
                    {
                        if (!string.IsNullOrEmpty(url))
                        {
                            Liste.Add(new UrlSicil() { sicil = sicil + ".jpg", url = url });
                        }

                    }

                }
            }
            catch (Exception ex)
            {
                File.WriteAllText(LocalUrl + "text.txt", ex.Message);
            }



        }

    }
}
