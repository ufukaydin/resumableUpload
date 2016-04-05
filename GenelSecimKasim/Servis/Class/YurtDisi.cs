using System.IO.Compression;
using Microsoft.ApplicationServer.Caching;
using Microsoft.WindowsAzure.ServiceRuntime;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using System.Xml;
using System.Xml.Linq;
namespace Servis.Class
{
    class YurtDisi
    {


        private static Process process = Process.GetCurrentProcess();
        public static BackgroundWorker bb = new BackgroundWorker();
        public static XmlDocument JsonString;
        private static bool _IsInitiated = false;

        static Bilgilendirme bilgilendirme = new Bilgilendirme();
        public static string JsonStringHarita = "";
        private static DateTime dosyaSonYazilmaTarihi = new DateTime();
        private static DateTime dosyaTarihi = new DateTime();
        private static string gelenDosyaAdi;
        private static bool BosXmllerOkundu;


        public static bool IsInitiated
        {
            get { return _IsInitiated; }
            set { _IsInitiated = value; }
        }
        static YurtDisi()
        {
            try
            {
                BosXmllerOkundu = false;
                bb.DoWork += bb_DoWork;
                bb.RunWorkerAsync();
            }
            catch (Exception ex)
            {
                bilgilendirme.EventlogaYaz(ex.ToString(), EventLogEntryType.Error, 1);
            }
            IsInitiated = true;
        }

        static void bb_DoWork(object sender, DoWorkEventArgs e)
        {
            do
            {
                try
                {

                    if (!Onbellek.YasakKalktiMi && !BosXmllerOkundu)
                    {

                        string appRoot = Environment.GetEnvironmentVariable("RoleRoot");

                        appRoot = Path.Combine(appRoot + @"\", @"approot\BosXmller\");

                        string yeniDosyaIcerik = BosXmlOku(appRoot + "AA_Secim2015_Gumruk.txt");
                        if (!string.IsNullOrEmpty(yeniDosyaIcerik))
                        {
                            try
                            {
                                ToCacheYurtDisiDagilimi();
                                BosXmllerOkundu = true;
                                dosyaSonYazilmaTarihi = new DateTime();
                            }
                            catch (Exception ex)
                            {

                                bilgilendirme.EventlogaYaz(ex.ToString(), EventLogEntryType.Error, 1);

                            }
                        }
                    }
                    else if (Onbellek.YasakKalktiMi && BosXmllerOkundu)
                    {
                        dosyaSonYazilmaTarihi = new DateTime();
                    }

                    if (File.Exists(Onbellek.gPath + "AA_Secim2015_Gumruk.txt"))
                    {

                        string yeniDosyaIcerik = OnChangedIlDagilimiXml(Onbellek.gPath + "AA_Secim2015_Gumruk.txt");
                        if (!string.IsNullOrEmpty(yeniDosyaIcerik))
                        {
                            try
                            {
                                if (File.Exists(Onbellek.logPath + gelenDosyaAdi + ".txt"))
                                {
                                    GelenVeriyiLogla(gelenDosyaAdi);
                                }
                                if (Onbellek.YasakKalktiMi)
                                {
                                    ToCacheYurtDisiDagilimi();
                                    BosXmllerOkundu = false;
                                }

                            }
                            catch (Exception ex)
                            {

                                bilgilendirme.EventlogaYaz(ex.ToString(), EventLogEntryType.Error, 1);
                            }
                        }
                    }


                }
                catch (Exception ex)
                {
                    bilgilendirme.EventlogaYaz("YurtDisi BB Hata   " + ex.ToString(), EventLogEntryType.Error, 1);
                }
                Thread.Sleep(500);
            } while (true);
        }


        public static string OnChangedIlDagilimiXml(string source)
        {
            string tempXml = string.Empty;
            dosyaTarihi = File.GetLastWriteTime(source);
            if (dosyaSonYazilmaTarihi < dosyaTarihi)
            {
                try
                {


                    EventLog.WriteEntry("AzureParser", "Dosya geldi (AA_Secim2015_Gumruk.txt) " + DateTime.Now.ToShortTimeString() + "  /  " + +process.Id, EventLogEntryType.Information, 40);

                    FileInfo fileInfo = new FileInfo(source);
                    DateTime dosyaOlusturulmaTarihi = File.GetLastWriteTime(source);
                    gelenDosyaAdi = "AA_Secim2015_Gumruk_" + dosyaOlusturulmaTarihi.Year + "_" + dosyaOlusturulmaTarihi.Month + "_" + dosyaOlusturulmaTarihi.Day + "_" + dosyaOlusturulmaTarihi.Hour + "_" + dosyaOlusturulmaTarihi.Minute + "_" + dosyaOlusturulmaTarihi.Second + "_" + dosyaOlusturulmaTarihi.Millisecond;


                    using (FileStream fsSource = fileInfo.Open(FileMode.Open, FileAccess.ReadWrite, FileShare.None))
                    {

                        XmlDocument xml = new XmlDocument();
                        xml.Load(fsSource);
                        JsonString = xml;
                        tempXml = "ok";
                        fsSource.Close();
                        fsSource.Dispose();
                    }
                    File.Copy(source, Onbellek.logPath + gelenDosyaAdi + ".txt", true);
                    EventLog.WriteEntry("AzureParser", "Dosya Okundu - Kopyalandı (AA_Secim2015_Gumruk.txt) " + DateTime.Now.ToShortTimeString() + "  /  " + +process.Id, EventLogEntryType.Information, 10);

                    dosyaSonYazilmaTarihi = dosyaTarihi;


                }
                catch (Exception ex)
                {

                }
            }

            return tempXml;

        }

        public static void ToCacheYurtDisiDagilimi()
        {
            if (JsonString == null)
            {
                bilgilendirme.EventlogaYaz("ToCacheYurtDisiDagilimi null", EventLogEntryType.Warning,6);
            }
            else
            {



                try
                {
                    DataCache cache = new DataCache("default");
                    XDocument doc = new XDocument();//= XDocument.Load(Onbellek.gPath + "AA_Secim2015_Gumruk.txt");
                    using (var nodeReader = new XmlNodeReader(JsonString))
                    {
                        nodeReader.MoveToContent();
                        doc = XDocument.Load(nodeReader);
                    }



                    var query1 = from xe in doc.Element("AA").Element("GumrukBolgeleri").Elements("Bolge")
                                 from gr in xe.Elements("AltBolge").Elements("Sonuclar").Elements("Parti").GroupBy(x => x.Attribute("No").Value)
                                 select new { Id = xe.Attribute("Kod"), No = gr.Key, oy = gr.Attributes("Oy").Sum(i => Convert.ToInt64(i.Value)) };


                    var query2 =
                        from xt in doc.Element("AA").Elements("GumrukGeneli")
                        select new
                        {
                            GumrukGeneli = (
                            new
                            {
                                ToplamSandik = xt.Elements("Sandik").Attributes("ToplamSandik").Sum(i => Convert.ToInt64(i.Value))
                            ,
                                AcilanSandik = xt.Elements("Sandik").Attributes("AcilanSandik").Sum(i => Convert.ToInt64(i.Value))
                            ,
                                ToplamSecmen = xt.Elements("Sandik").Attributes("ToplamSecmen").Sum(i => Convert.ToInt64(i.Value))
                            ,
                                AcilanSandikSecmenSayisi = xt.Elements("Sandik").Attributes("AcilanSandikSecmenSayisi").Sum(i => Convert.ToInt64(i.Value))
                            ,
                                KullanilanOy = xt.Elements("Sandik").Attributes("KullanilanOy").Sum(i => Convert.ToInt64(i.Value))
                            ,
                                GecerliOy = xt.Elements("Sandik").Attributes("GecerliOy").Sum(i => Convert.ToInt64(i.Value))
                            ,
                                Partiler = (
                                  from tf in xt.Elements("Sonuclar").Elements("Parti")
                                  select new
                                  {

                                      No = tf.Attribute("No").Value,
                                      oy = tf.Attribute("Oy").Value
                                  }

                                )
                            }
                            ),

                            Ulkeler = (
                                from xe in doc.Element("AA").Element("GumrukBolgeleri").Elements("Bolge")
                                select new
                                {
                                    Adi = xe.Attribute("Ad").Value
                                 ,
                                    ToplamSandik = xe.Elements("AltBolge").Elements("Sandik").Attributes("ToplamSandik").Sum(i => Convert.ToInt64(i.Value))
                                 ,
                                    AcilanSandik = xe.Elements("AltBolge").Elements("Sandik").Attributes("AcilanSandik").Sum(i => Convert.ToInt64(i.Value))
                                 ,
                                    ToplamSecmen = xe.Elements("AltBolge").Elements("Sandik").Attributes("ToplamSecmen").Sum(i => Convert.ToInt64(i.Value))
                                 ,
                                    AcilanSandikSecmenSayisi = xe.Elements("AltBolge").Elements("Sandik").Attributes("AcilanSandikSecmenSayisi").Sum(i => Convert.ToInt64(i.Value))
                                 ,
                                    KullanilanOy = xe.Elements("AltBolge").Elements("Sandik").Attributes("KullanilanOy").Sum(i => Convert.ToInt64(i.Value))
                                 ,
                                    GecerliOy = xe.Elements("AltBolge").Elements("Sandik").Attributes("GecerliOy").Sum(i => Convert.ToInt64(i.Value))
                                 ,
                                    Id = xe.Attribute("Kod").Value,
                                    Partiler = (
                                        from gr in xe.Elements("AltBolge").Elements("Sonuclar").Elements("Parti").GroupBy(x => x.Attribute("No").Value)
                                        select new
                                        {

                                            No = gr.Key,
                                            oy = gr.Attributes("Oy").Sum(i => Convert.ToInt64(i.Value))
                                        }
                                    )

                                })
                        }
                               ;

                    List<YurtDisiVeriUlkePartiOy> listYurdisiVeriUlkePartiOy = new List<YurtDisiVeriUlkePartiOy>();
                    var sss = query1.GroupBy(x => x.Id, (key, value) => value.OrderByDescending(x => x.oy).First()).ToList();
                    var sss1 = query2.ToList();

                    cache.Put("Gumruk", JsonConvert.SerializeObject(sss1));

                    foreach (var item in sss)
                    {
                        int Kod = 0;
                        Kod = item.oy == 0 ? 0 : Convert.ToInt32(item.No);

                        listYurdisiVeriUlkePartiOy.Add(new YurtDisiVeriUlkePartiOy() { Id = Convert.ToInt32(item.Id.Value), Kod = Kod, Oy = item.oy });
                    }
                    cache.Put("YurDisiHarita", JsonConvert.SerializeObject(listYurdisiVeriUlkePartiOy));



                    bilgilendirme.EventlogaYaz("Cache e yazıldı. Yurt Disi XML" + DateTime.Now.ToShortTimeString() + process.Id.ToString(), EventLogEntryType.Information,20);

                }
                catch (Exception ex)
                {
                    bilgilendirme.EventlogaYaz(ex.ToString(), EventLogEntryType.Error, 1);

                }

            }



        }


        public static string BosXmlOku(string source)
        {
            string tempXml = string.Empty;
            try
            {
                EventLog.WriteEntry("AzureParser", "Bos Xml Okundu (AA_Secim2015_Gumruk.txt) " + DateTime.Now.ToShortTimeString() + "  /  " + +process.Id);
                tempXml = File.ReadAllText(source);
                XmlDocument xml = new XmlDocument();
                xml.LoadXml(tempXml);
                JsonString = xml;
            }
            catch (Exception ex)
            {
                bilgilendirme.EventlogaYaz(ex.ToString(), EventLogEntryType.Error, 1);

            }
            return tempXml;
        }


        private static void GelenVeriyiLogla(string gelenDosyaAdi)
        {
            new Thread(x =>
            {

                try
                {
                    if (File.Exists(Onbellek.logPath + gelenDosyaAdi + ".txt"))
                    {
                        if (!File.Exists(Onbellek.logPath + gelenDosyaAdi + ".zip"))
                        {
                            try
                            {
                                using (ZipArchive zip = ZipFile.Open(Path.Combine(Onbellek.logPath, gelenDosyaAdi + ".zip"), ZipArchiveMode.Create))
                                {
                                    zip.CreateEntryFromFile(Path.Combine(Onbellek.logPath, gelenDosyaAdi + ".txt"), "AA_Secim2015_Gumruk.txt");
                                }
                                Storage.GelenXmliStorageLogla(gelenDosyaAdi + ".zip", Onbellek.logPath + gelenDosyaAdi + ".zip");

                            }
                            catch (Exception ex)
                            {
                                bilgilendirme.EventlogaYaz(ex.ToString(), EventLogEntryType.Error, 1);

                            }
                        }
                        File.Delete(Onbellek.logPath + gelenDosyaAdi + ".txt");
                    }

                }
                catch (Exception ex)
                {
                    bilgilendirme.EventlogaYaz(ex.ToString(), EventLogEntryType.Error, 1);

                }
            }).Start();




        }
    }
}
