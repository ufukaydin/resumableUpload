using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace Servis.Class
{
    public  class Bilgilendirme
    {
        //private SmtpClient client = null;
        //private  MailMessage message = null;
        //string pcName;
        public Bilgilendirme()
        {
            //pcName = System.Environment.MachineName;

            //client = new SmtpClient("smtp-mail.outlook.com", 587);
            //client.DeliveryMethod = SmtpDeliveryMethod.Network;
            //client.UseDefaultCredentials = false;
            //client.Credentials = new System.Net.NetworkCredential("yazilimmd@outlook.com.tr", "Qazxsw'3");
            //client.EnableSsl = true;
            //message = new MailMessage();
            //message.IsBodyHtml = true;
            //message.From = new MailAddress("secimalarm@aa.com.tr", "Genel Seçim Alarm");

            //string emailGidecekKullanicilar = ConfigurationManager.AppSettings["BilgilendirmeEmailKullanicilar"];
            //message.To.Clear();
            //foreach (string to in emailGidecekKullanicilar.Split(';'))
            //{
            //    if (!String.IsNullOrEmpty(to.Trim()))
            //    {
            //        message.To.Add(new MailAddress(to.Trim()));
            //    }
            //}
        }

        
        public   void EventlogaYaz( string mesaj, EventLogEntryType eventLogEntryType , int eventId )
        {
            try
            {

                EventLog.WriteEntry("AzureParser","Genel Seçim Azure Parser" + mesaj,eventLogEntryType, eventId);
            }
            catch (Exception ex)
            {

                
            }
        }


    }
}
