using Microsoft.ApplicationServer.Caching;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Newtonsoft.Json;
namespace WebTv
{
    public partial class Login : System.Web.UI.Page
    {
        private static DataCache data = new DataCache();
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                bool auth = System.Web.HttpContext.Current.User == null ? false : System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
                if (auth)
                {
                    System.Web.Security.FormsAuthentication.RedirectFromLoginPage(System.Web.HttpContext.Current.User.Identity.Name, false);
                }
            }
            else
            {
                string user = username.Value;
                string pass = password.Value;
                Session["user"] = user;
                try
                {
                    DataCache cache = new DataCache("default");
                    var Liste = (List<string>) cache.Get("DemoKullanici");
                   
                    List<User> passList = Liste.Select(o => new User() { password = o.Split(' ')[1], username = o.Split(' ')[0] }).ToList();

                    if (passList.Any(o => o.password == pass && o.username == user))
                    {
                        var s = data.GetCacheItem("SignalrKullanicilari");
                        int l = 0;
                        if (s != null)
                        {
                            Dictionary<string, string> kullanicilar = (Dictionary<string, string>)s.Value;
                             l = kullanicilar.Where(o => o.Value == user).Count();
                            
                        }
                        if (l<2)
                        {
                            System.Web.Security.FormsAuthentication.RedirectFromLoginPage(user, false);
                        }
                        else
                        {
                            Response.Write("<script>alert('" + l + "browser'da sistem açık bırakılmış 2 kullanıcıdan fazla giriş yapılamaz.(Giriş yapmak için lütfen browserları kapatın.)');</script>");
                        }

                   
                    }
                    else
                    {
                        Response.Write("<script>alert('Kullanıcı Şifre Hatalı.');</script>");
                    }
                }
                catch (Exception ex)
                {
                    Response.Write("<script>alert('Hata oluştu.');</script>");
                }
            }
        } 
    }
    public class User
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}