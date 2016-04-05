using System;
using System.Collections;
using System.Collections.Concurrent;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Text;
using System.Threading;
using System.Xml;
using System.Xml.Serialization;
using Newtonsoft.Json;
using Microsoft.ApplicationServer.Caching;

namespace Servis.Class
{
    class IlceDagilim
    {
        //static FileSystemWatcher watcherIlceDagilimiXml = new FileSystemWatcher();
        private static Process process = Process.GetCurrentProcess();
        public static BackgroundWorker bb = new BackgroundWorker();
        public static XmlDocument JsonString;
        private static bool _IsInitiated = false;
        static Bilgilendirme bilgilendirme = new Bilgilendirme();
        static Hashtable ht = new Hashtable();
        public static string JsonStringHarita = "";
        private static DateTime dosyaSonYazilmaTarihi = new DateTime();
        private static DateTime dosyaTarihi = new DateTime();
        private static bool BosXmllerOkundu;
        private static string gelenDosyaAdi;

        public static bool IsInitiated
        {
            get { return _IsInitiated; }
            set { _IsInitiated = value; }
        }
        static IlceDagilim()
        {
            try
            {

                BosXmllerOkundu = false;
                #region Milletvekillerini listeye ekle

                ht[1] = 14;
                ht[2] = 5;
                ht[3] = 5;
                ht[4] = 4;
                ht[5] = 3;
                ht[7] = 14;
                ht[8] = 2;
                ht[9] = 7;
                ht[10] = 8;
                ht[11] = 2;
                ht[12] = 3;
                ht[13] = 3;
                ht[14] = 3;
                ht[15] = 3;
                ht[16] = 18;
                ht[17] = 4;
                ht[19] = 4;
                ht[18] = 2;
                ht[21] = 11;
                ht[20] = 7;
                ht[23] = 4;
                ht[22] = 3;
                ht[25] = 6;
                ht[24] = 2;
                ht[27] = 12;
                ht[26] = 6;
                ht[29] = 2;
                ht[28] = 4;
                ht[31] = 10;
                ht[30] = 3;
                ht[32] = 4;
                ht[33] = 11;
                ht[38] = 9;
                ht[39] = 3;
                ht[36] = 3;
                ht[37] = 3;
                ht[42] = 14;
                ht[43] = 4;
                ht[40] = 2;
                ht[41] = 11;
                ht[46] = 8;
                ht[47] = 6;
                ht[44] = 6;
                ht[45] = 9;
                ht[51] = 3;
                ht[50] = 3;
                ht[49] = 3;
                ht[48] = 6;
                ht[55] = 9;
                ht[54] = 7;
                ht[53] = 3;
                ht[52] = 5;
                ht[59] = 6;
                ht[58] = 5;
                ht[57] = 2;
                ht[56] = 3;
                ht[63] = 12;
                ht[62] = 2;
                ht[61] = 6;
                ht[60] = 5;
                ht[68] = 3;
                ht[343] = 31;
                ht[69] = 2;
                ht[342] = 26;
                ht[70] = 2;
                ht[341] = 31;
                ht[71] = 3;
                ht[64] = 3;
                ht[65] = 8;
                ht[66] = 4;
                ht[67] = 5;
                ht[76] = 2;
                ht[351] = 13;
                ht[77] = 2;
                ht[78] = 2;
                ht[79] = 2;
                ht[72] = 4;
                ht[73] = 4;
                ht[74] = 2;
                ht[75] = 2;
                ht[81] = 3;
                ht[80] = 4;
                ht[352] = 13;
                ht[601] = 18;
                ht[602] = 14;
                #endregion
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

                        string yeniDosyaIcerik = BosXmlOku(appRoot + "AA_Secim2015_Ilce.txt");
                        if (!string.IsNullOrEmpty(yeniDosyaIcerik))
                        {
                            try
                            {
                                ToCacheIlceDagilimi();
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


                    if (File.Exists(Onbellek.gPath + "AA_Secim2015_Ilce.txt"))
                    {
                      
                      
                        string yeniDosyaIcerik = OnChangedIlceDagilimiXml(Onbellek.gPath + "AA_Secim2015_Ilce.txt");
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
                                    ToCacheIlceDagilimi();
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
                    bilgilendirme.EventlogaYaz("Ilce BB Hata   " + ex.ToString(), EventLogEntryType.Error, 1);
                }
                Thread.Sleep(500);
            } while (true);
        }

       
        public static string OnChangedIlceDagilimiXml(string source)
        {
            string tempXml = string.Empty;

            dosyaTarihi = File.GetLastWriteTime(source);
            if (dosyaSonYazilmaTarihi < dosyaTarihi)
            {
                try
                {
                    EventLog.WriteEntry("AzureParser", "Dosya geldi (AA_Secim2015_Ilce.txt) " + DateTime.Now.ToShortTimeString() + "  /  " + +process.Id, EventLogEntryType.Information, 40);


                    FileInfo fileInfo = new FileInfo(source);
                    DateTime dosyaOlusturulmaTarihi = File.GetLastWriteTime(source);
                    gelenDosyaAdi = "AA_Secim2015_Ilce_" + dosyaOlusturulmaTarihi.Year + "_" + dosyaOlusturulmaTarihi.Month + "_" + dosyaOlusturulmaTarihi.Day + "_" + dosyaOlusturulmaTarihi.Hour + "_" + dosyaOlusturulmaTarihi.Minute + "_" + dosyaOlusturulmaTarihi.Second + "_" + dosyaOlusturulmaTarihi.Millisecond;

                    using (FileStream fsSource = fileInfo.Open(FileMode.Open, FileAccess.Read, FileShare.None))
                    {

                        XmlDocument xml = new XmlDocument();
                        xml.Load(fsSource);
                        JsonString = xml;
                        tempXml = "ok";
                        fsSource.Close();
                        fsSource.Dispose();
                    }
                    File.Copy(source, Onbellek.logPath + gelenDosyaAdi + ".txt", true);
                    EventLog.WriteEntry("AzureParser", "Dosya Okundu - Kopyalandý (AA_Secim2015_Ilce.txt) " + DateTime.Now.ToShortTimeString() + "  /  " + +process.Id, EventLogEntryType.Information, 10);

                    dosyaSonYazilmaTarihi = dosyaTarihi;
                }
                catch (Exception ex)
                {

                }
            }

            return tempXml.ToString();
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
                                    zip.CreateEntryFromFile(Path.Combine(Onbellek.logPath, gelenDosyaAdi + ".txt"), "AA_Secim2015_Ilce.txt");

                                    zip.Dispose();
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

        public static string BosXmlOku(string source)
        {
            string tempXml = string.Empty;
            try
            {

                EventLog.WriteEntry("AzureParser", "Bos Xml Okundu (AA_Secim2015_Ilce.txt) " + DateTime.Now.ToShortTimeString() + "  /  " + +process.Id);
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



        public static void ToCacheIlceDagilimi()
        {
            if (JsonString == null)
            {
                bilgilendirme.EventlogaYaz("ToCacheIlDagilimi JsonStringIller null", EventLogEntryType.Warning, 6);
            }
            else
            {
                try
                {
                    

                    foreach (XmlNode ilNode in JsonString["AA"]["IlceSonuclari"])
                    {
                        int milletvekiliSayisi = 0;
                        int ilKodu = Convert.ToInt32(ilNode.Attributes["Kod"].Value);
                        milletvekiliSayisi = (int)ht[ilKodu];
                        XmlAttribute att = JsonString.CreateAttribute("MilletVekiliSayisi");
                        att.Value = milletvekiliSayisi.ToString();
                        ilNode.Attributes.Append(att);

                        string IlKodu = ilNode.Attributes["Kod"].Value;
                        DataCache cache = new DataCache("default");
                        cache.Put("Il_" + IlKodu, JsonConvert.SerializeObject(ilNode).Replace("@", ""));

                    }
                    
                }
                catch (Exception ex)
                {

                    bilgilendirme.EventlogaYaz(ex.ToString(), EventLogEntryType.Error, 1);
                }
            }
        }
    }
}