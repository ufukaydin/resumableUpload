
using System.IO.Compression;
using System.Text;
using Newtonsoft.Json;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading;
using System.Xml;
using Microsoft.ApplicationServer.Caching;
 
namespace Servis.Class
{
    public class IlDagilim
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
        static IlDagilim()
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

                        string yeniDosyaIcerik = BosXmlOku(appRoot + "AA_Secim2015_SecimCevresi.txt");
                        if (!string.IsNullOrEmpty(yeniDosyaIcerik))
                        {
                            try
                            {
                                ToCacheIlDagilimi();
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

                    if (File.Exists(Onbellek.gPath + "AA_Secim2015_SecimCevresi.txt"))
                    {
                        string yeniDosyaIcerik = OnChangedIlDagilimiXml(Onbellek.gPath + "AA_Secim2015_SecimCevresi.txt");
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
                                    ToCacheIlDagilimi();
                                    BosXmllerOkundu = false;
                                }

                            }
                            catch (Exception ex)
                            {


                            }
                        }
                    }

                }
                catch (Exception ex)
                {
                    bilgilendirme.EventlogaYaz("IlDagilimi BB Hata   " + ex.ToString(), EventLogEntryType.Error, 1);
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
                    EventLog.WriteEntry("AzureParser", "Dosya geldi (AA_Secim2015_SecimCevresi.txt) " + DateTime.Now.ToShortTimeString() + "  /  " + +process.Id, EventLogEntryType.Information, 40);

                    FileInfo fileInfo = new FileInfo(source);
                    DateTime dosyaOlusturulmaTarihi = File.GetLastWriteTime(source);
                    gelenDosyaAdi = "AA_Secim2015_SecimCevresi_" + dosyaOlusturulmaTarihi.Year + "_" + dosyaOlusturulmaTarihi.Month + "_" + dosyaOlusturulmaTarihi.Day + "_" + dosyaOlusturulmaTarihi.Hour + "_" + dosyaOlusturulmaTarihi.Minute + "_" + dosyaOlusturulmaTarihi.Second + "_" + dosyaOlusturulmaTarihi.Millisecond;

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
                    EventLog.WriteEntry("AzureParser", "Dosya Okundu - Kopyalandı (AA_Secim2015_SecimCevresi.txt) " + DateTime.Now.ToShortTimeString() + "  /  " + +process.Id, EventLogEntryType.Information, 10);

                    dosyaSonYazilmaTarihi = dosyaTarihi;
                }
                catch (IOException ex)
                {

                }
            }

            return tempXml;

        }

        public static void ToCacheIlDagilimi()
        {
            if (JsonString == null)
            {
                bilgilendirme.EventlogaYaz("ToCacheIlDagilimi JsonStringIller null", EventLogEntryType.Warning, 1);
            }
            else
            {
                try
                {
                    DataCache cache = new DataCache("default");
                    cache.Put("Genel", JsonConvert.SerializeObject(JsonString["AA"]).Replace("@", ""));

                    var Iller = JsonString["AA"]["IlSonuclari"].GetElementsByTagName("Il");

                    List<TurkiyeIlVerileri> turkiyeIlVerileriListesi = new List<TurkiyeIlVerileri>();
                    long birinciPartiOyu = 0;
                    foreach (XmlNode ilVerisi in Iller)
                    {
                        var tempVeri = ilVerisi.SelectSingleNode("Sonuclar")
                                            .SelectNodes("Parti")
                                            .Cast<XmlNode>()
                                            .OrderByDescending(x => Convert.ToInt64(x.Attributes["Oy"].Value))
                                            .First();


                        int ilKod = Convert.ToInt32(ilVerisi.Attributes["Kod"].Value);

                        birinciPartiOyu = Convert.ToInt64(tempVeri.Attributes["Oy"].Value);
                        if (birinciPartiOyu == 0)
                        {
                            turkiyeIlVerileriListesi.Add(new TurkiyeIlVerileri() { IlKod = ilKod, PartiKod = 0 });
                        }
                        else
                        {
                            turkiyeIlVerileriListesi.Add(new TurkiyeIlVerileri() { IlKod = ilKod, PartiKod = Convert.ToInt32(tempVeri.Attributes["No"].Value) });
                        }
                    }
                    string aaaa = JsonConvert.SerializeObject(turkiyeIlVerileriListesi);
                    cache.Put("TurkiyeHarita", JsonConvert.SerializeObject(turkiyeIlVerileriListesi));
                    bilgilendirme.EventlogaYaz("Cache e yazıldı. IlDagilim XML" + DateTime.Now.ToShortTimeString() + process.Id.ToString(), EventLogEntryType.Information,20);
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
                EventLog.WriteEntry("AzureParser", "Bos Xml Okundu (AA_Secim2015_SecimCevresi.txt) " + DateTime.Now.ToShortTimeString() + "  /  " + +process.Id);
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
                                    zip.CreateEntryFromFile(Path.Combine(Onbellek.logPath, gelenDosyaAdi + ".txt"), "AA_Secim2015_SecimCevresi.txt");
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

