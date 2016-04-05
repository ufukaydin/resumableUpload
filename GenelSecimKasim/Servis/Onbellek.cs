using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Configuration;
using Servis.Class;
using Newtonsoft.Json;
using Microsoft.ApplicationServer.Caching;

namespace Servis
{
    class Onbellek
    {
        private static bool _IsInitiated = false;
        public static bool IsInitiated
        {
            get { return _IsInitiated; }
            set { _IsInitiated = value; }
        }
        public static string gPath = ConfigurationManager.AppSettings["FTPPath"].ToString();
        public static string logPath = ConfigurationManager.AppSettings["LogPath"].ToString();
        public static bool YasakKalktiMi;
        public static Bilgilendirme b = new Bilgilendirme();
        public static BackgroundWorker bb = new BackgroundWorker();
        static Bilgilendirme bilgilendirme = new Bilgilendirme();
        static Onbellek()
        {
            YasakKalktiMi = false;
#if !DEBUG
            gPath = ConfigurationManager.AppSettings["FTPPathRelease"].ToString();
            logPath = ConfigurationManager.AppSettings["LogPathRelease"].ToString();
#endif



            try
            {
                if (!Directory.Exists(gPath))
                {
                    Directory.CreateDirectory(gPath);
                }

                if (!Directory.Exists(logPath))
                {
                    Directory.CreateDirectory(logPath);
                }
            }
            catch (Exception ex)
            {

                b.EventlogaYaz(ex.Message, EventLogEntryType.Error, 1);
            }

            try
            {

                //ToDo: Burası Açılacak.
                Bilgilendirme bilgilendirme = new Bilgilendirme();
                bilgilendirme.EventlogaYaz("Onbellek Başlatılıyor", EventLogEntryType.Warning,2);

            }
            catch (Exception ex)
            {

                EventLog.WriteEntry("AzureParser", "Mail Gönderme Hatası" + ex.Message, EventLogEntryType.Error);
            }
            try
            {
                bb.DoWork += bb_DoWork;
                bb.RunWorkerAsync();

                string appRoot = Environment.GetEnvironmentVariable("RoleRoot");
                appRoot = Path.Combine(appRoot + @"\", @"approot\");
                if (File.Exists(appRoot + @"\DemoKullanicilar.txt"))
                {
                    DataCache cache = new DataCache("default");
                    var kullanicilar = File.ReadLines(appRoot + @"\DemoKullanicilar.txt").ToList();
                    cache.Put("DemoKullanici", kullanicilar);
                    EventLog.WriteEntry("AzureParser", "Demo Kullanıcılar Cache e yazıldı...", EventLogEntryType.Information);
                }

                EventLog.WriteEntry("AzureParser", "Il Dagilimlari Başlatılıyor", EventLogEntryType.Information);
                if (IlDagilim.IsInitiated)
                {
                    EventLog.WriteEntry("AzureParser", "Il Dagilimlari Başlatıldı", EventLogEntryType.SuccessAudit);

                }

                EventLog.WriteEntry("AzureParser", "Il Dagilimlari GumrukDahil Başlatılıyor", EventLogEntryType.Information);
                if (Class.IlDagilimGumrukDahil.IsInitiated)
                {
                    EventLog.WriteEntry("AzureParser", "YurtDısi Dagilimlari GumrukDahil Başlatıldı", EventLogEntryType.SuccessAudit);
                }

                EventLog.WriteEntry("AzureParser", "Ilce Dagilimlari Başlatılıyor", EventLogEntryType.Information);
                if (Class.IlceDagilim.IsInitiated)
                {
                    EventLog.WriteEntry("AzureParser", "Ilce Dagilimlari Başlatıldı", EventLogEntryType.SuccessAudit);
                }

                EventLog.WriteEntry("AzureParser", "YurtDısi Dagilimlari Başlatılıyor", EventLogEntryType.Information);
                if (Class.YurtDisi.IsInitiated)
                {
                    EventLog.WriteEntry("AzureParser", "YurtDısi Dagilimlari Başlatıldı", EventLogEntryType.SuccessAudit);
                }

                bilgilendirme.EventlogaYaz("Onbellek Başlatıldı", EventLogEntryType.Warning, 2);


            }
            catch (Exception ex)
            {

                Bilgilendirme b = new Bilgilendirme();
                b.EventlogaYaz(ex.Message, EventLogEntryType.Error, 1);
            }

            _IsInitiated = true;
        }

        static void bb_DoWork(object sender, DoWorkEventArgs e)
        {
            do
            {
                try
                {
                    if (File.Exists(Onbellek.gPath + "SecimYasagi.txt"))
                    {

                        string yeniDosyaIcerik = OnChangedSecimYasagi(Onbellek.gPath + "SecimYasagi.txt");
                        if (!string.IsNullOrEmpty(yeniDosyaIcerik) && yeniDosyaIcerik == "emre123")
                        {
                            if (!YasakKalktiMi)
                            {
                                bilgilendirme.EventlogaYaz("Onbellek seçim Yasağı Kaldırıldı", EventLogEntryType.Warning,3);
                            }
                            YasakKalktiMi = true;
                        }
                        else
                        {
                            bilgilendirme.EventlogaYaz("Onbellek seçim Yasağı Dosyası içerik Farklı", EventLogEntryType.Warning,4);
                        }
                    }
                    else
                    {
                        if (YasakKalktiMi)
                        {
                            bilgilendirme.EventlogaYaz("Onbellek Seçim Yasağı Devam Ediyor", EventLogEntryType.Warning,5);
                        }
                        YasakKalktiMi = false;
                    }
                }
                catch (Exception ex)
                {
                    bilgilendirme.EventlogaYaz("Onbellek BB Hata   " + ex.ToString(), EventLogEntryType.Error, 1);

                   
                }
                Thread.Sleep(5000);
            } while (true);
        }

        private static string gelenDosyaAdi;
        public static string OnChangedSecimYasagi(string source)
        {
            string tempXml = string.Empty;


            try
            {
                DateTime dosyaOlusturulmaTarihi = File.GetLastWriteTime(source);
                gelenDosyaAdi = "SecimYasagi_" + dosyaOlusturulmaTarihi.Year + "_" + dosyaOlusturulmaTarihi.Month + "_" + dosyaOlusturulmaTarihi.Day + "_" + dosyaOlusturulmaTarihi.Hour + "_" + dosyaOlusturulmaTarihi.Minute + "_" + dosyaOlusturulmaTarihi.Second + "_" + dosyaOlusturulmaTarihi.Millisecond;
                if (!File.Exists(Onbellek.logPath + gelenDosyaAdi + ".txt"))
                {
                    File.Copy(source, Onbellek.logPath + gelenDosyaAdi + ".txt");
                    EventLog.WriteEntry("AzureParser", "Dosya geldi (SecimYasagi.txt) " + DateTime.Now.ToShortTimeString(),EventLogEntryType.Information,30);
                }
                tempXml = File.ReadAllText(source);


            }
            catch (IOException ex)
            {
                bilgilendirme.EventlogaYaz(ex.ToString(), EventLogEntryType.Error, 1);

            }
            return tempXml.ToString();
        }



    }
}
