using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Runtime.Caching;
using Microsoft.ApplicationServer.Caching;
namespace WebTv.Hubs
{
    // [Authorize]
    public class SecimHub : Hub
    {
        public static void Catch(CacheEntryRemovedArguments c)
        {
            if (c.RemovedReason == CacheEntryRemovedReason.Expired)
            {
                CacheItemPolicy policy = new CacheItemPolicy();
                policy.RemovedCallback = new CacheEntryRemovedCallback(Catch);
                policy.AbsoluteExpiration = DateTime.Now.AddSeconds(30);
                var genel = data.Get(c.CacheItem.Key);
                if (genel != null)
                    c.Source.Set(c.CacheItem.Key, genel, policy);
            }
        }
        private static DataCache data = new DataCache();
        private static ObjectCache cache = MemoryCache.Default;

        public void IslemTetikle(string islem, string deger)
        {
            switch (islem)
            {
                case "Renk0Input":
                case "Renk1Input":
                case "Renk2Input":
                case "Renk3Input":
                case "Renk4Input":
                case "Renk5Input":
                case "Renk6Input":
                case "Renk7Input":
                case "Renk8Input":
                case "Renk9Input":
                case "Renk10Input":
                case "Renk11Input":
                    Clients.Clients(KullanicilariVer()).renkDegistir(islem, deger);
                    break;

                //case "UstSaga":
                //    Clients.Clients(KullanicilariVer()).ustSaga();
                //    break;
                //case "UstSola":
                //    Clients.Clients(KullanicilariVer()).ustSola();
                //    break;
                //case "OrtaSaga":
                //    Clients.Clients(KullanicilariVer()).ortaSaga();
                //    break;
                //case "OrtaSola":
                //    Clients.Clients(KullanicilariVer()).ortaSola();
                //    break;

                case "SiteYon":
                    Clients.Clients(KullanicilariVer()).siteyon(deger);
                    break;

                //case "Harita":
                //    Clients.Clients(KullanicilariVer()).harita();
                //    break;
                //case "Grafik":
                //    Clients.Clients(KullanicilariVer()).grafik();
                //    break; 

                case "OrtaKisimSecim":
                    Clients.Clients(KullanicilariVer()).ortakisimsecim(deger);
                    break;
                case "SeciliParti":
                    Clients.Clients(KullanicilariVer()).seciliparti(deger);
                    break;
                case "OrtaKisimIdler":
                    Clients.Clients(KullanicilariVer()).ortakisimidler(deger);
                    break;
                case "OrtaKisimDonguSuresi":
                    Clients.Clients(KullanicilariVer()).ortakisimdongusuresi(deger);
                    break;
                case "GrafikKisimIdler":
                    Clients.Clients(KullanicilariVer()).grafikkisimidler(deger);
                    break;
                case "GrafikKisimDonguSuresi":
                    Clients.Clients(KullanicilariVer()).grafikkisimdongusuresi(deger);
                    break;
                case "AltKisimIdler":
                    Clients.Clients(KullanicilariVer()).altisimidler(deger);
                    break;
                case "AltKisimDonguSuresi":
                    Clients.Clients(KullanicilariVer()).altisimdongusuresi(deger);
                    break;
                case "AltKisimIlceleriGoster":
                    Clients.Clients(KullanicilariVer()).altkisimilcelerigoster(deger);
                    break; 
                case "HaritaYogunluk":
                    Clients.Clients(KullanicilariVer()).haritayogunluk(deger);
                    break; 
                case "SehirHaritaSecim":
                    Clients.Clients(KullanicilariVer()).haritasehir(deger);
                    break;

                default:
                    break;
            }

        }

        public string HaritaVeri(string Gumruk)
        {
            if (!string.IsNullOrEmpty(Gumruk) && Gumruk == "ok")
            {

                string veri = cache["TurkiyeHaritaGumrukDahil"] as string;
                if (veri == null)
                {
                    CacheItemPolicy policy = new CacheItemPolicy();
                    policy.RemovedCallback = new CacheEntryRemovedCallback(Catch);
                    policy.AbsoluteExpiration = DateTime.Now.AddSeconds(30);
                    var TumIller = data.Get("TurkiyeHaritaGumrukDahil");
                    if (TumIller != null)
                        cache.Set("TurkiyeHaritaGumrukDahil", TumIller, policy);
                    return TumIller.ToString();
                }
                else
                {
                    return veri;
                }
            }
            else
            {

                string veri = cache["TurkiyeHarita"] as string;
                if (veri == null)
                {
                    CacheItemPolicy policy = new CacheItemPolicy();
                    policy.RemovedCallback = new CacheEntryRemovedCallback(Catch);
                    policy.AbsoluteExpiration = DateTime.Now.AddSeconds(30);
                    var TumIller = data.Get("TurkiyeHarita");
                    if (TumIller != null)
                        cache.Set("TurkiyeHarita", TumIller, policy);
                    return TumIller.ToString();
                }
                else
                {
                    return veri;
                }

            }

        }


        public string GenelUstVeri()
        {

            string veri = cache["GenelUstVeri"] as string;
            if (veri == null)
            {
                CacheItemPolicy policy = new CacheItemPolicy();
                policy.RemovedCallback = new CacheEntryRemovedCallback(Catch);
                policy.AbsoluteExpiration = DateTime.Now.AddSeconds(30);
                var TumIller = data.Get("GenelUstVeri");
                if (TumIller != null)
                    cache.Set("GenelUstVeri", TumIller, policy);
                return TumIller.ToString();
            }
            else
            {
                return veri;
            }
        }

        public string IlceVeri(string IlKodu)
        {

            if (!string.IsNullOrEmpty(IlKodu))
            {

                int _IlKodu = -1;
                if (int.TryParse(IlKodu, out _IlKodu) && (_IlKodu > 0 && _IlKodu < 82) || (_IlKodu == 601 || _IlKodu == 602 || _IlKodu == 341 || _IlKodu == 342 || _IlKodu == 343 || _IlKodu == 351 || _IlKodu == 352))
                {

                    string veri = cache["Il_" + _IlKodu] as string;
                    if (veri == null)
                    {
                        CacheItemPolicy policy = new CacheItemPolicy();
                        policy.RemovedCallback = new CacheEntryRemovedCallback(Catch);
                        policy.AbsoluteExpiration = DateTime.Now.AddSeconds(30);
                        var TumIller = data.Get("Il_" + _IlKodu);
                        if (TumIller != null)
                        {
                            cache.Set("Il_" + _IlKodu, TumIller, policy);
                        }
                        var EskiVeriler = cache.Get("EskiIl_" + _IlKodu);
                        var ReturnValue = new { Kasim = TumIller, Haziran = EskiVeriler };
                        return Newtonsoft.Json.JsonConvert.SerializeObject(ReturnValue);
                    }
                    else
                    {
                        var EskiVeriler = cache.Get("EskiIl_" + _IlKodu);
                        var ReturnValue = new { Kasim = veri, Haziran = EskiVeriler };
                        return Newtonsoft.Json.JsonConvert.SerializeObject(ReturnValue);

                    }
                }
                else
                {
                    return "";
                }

            }
            else
            {
                return "";
            }

        }
        public string GenelVeri(string Gumruk)
        {
            if (!string.IsNullOrEmpty(Gumruk) && Gumruk == "ok")
            {

                string veri = cache["GenelGumrukDahil"] as string;
                if (veri == null)
                {
                    CacheItemPolicy policy = new CacheItemPolicy();
                    policy.RemovedCallback = new CacheEntryRemovedCallback(Catch);
                    policy.AbsoluteExpiration = DateTime.Now.AddSeconds(30);
                    var TumIller = data.Get("GenelGumrukDahil");
                    if (TumIller != null)
                        cache.Set("GenelGumrukDahil", TumIller, policy);
                    return TumIller.ToString();
                }
                else
                {
                    return veri;
                }
            }
            else
            {

                string veri = cache["Genel"] as string;
                if (veri == null)
                {
                    CacheItemPolicy policy = new CacheItemPolicy();
                    policy.RemovedCallback = new CacheEntryRemovedCallback(Catch);
                    policy.AbsoluteExpiration = DateTime.Now.AddSeconds(30);
                    var TumIller = data.Get("Genel");
                    if (TumIller != null)
                        cache.Set("Genel", TumIller, policy);
                    return TumIller.ToString();
                }
                else
                {
                    return veri;
                }

            }

        }
        public List<string> KullanicilariVer()
        {

            var s = data.GetCacheItem("SignalrKullanicilari");
            if (s != null)
            {
                Dictionary<string, string> kullanicilar = (Dictionary<string, string>)s.Value;
                List<string> l = kullanicilar.Where(o => o.Value == Context.User.Identity.Name && o.Key != Context.ConnectionId).Select(o => o.Key).ToList();
                return l;
            }
            else
            {
                return new List<string>() { };
            }



        }
        public override Task OnConnected()
        {
            string ad = Context.User.Identity.Name;
            if (!string.IsNullOrEmpty(ad))
            {
                try
                {
                    var kullanicilar = (Dictionary<string, string>)data.Get("SignalrKullanicilari");
                    if (kullanicilar == null)
                    {
                        kullanicilar = new Dictionary<string, string>();
                    }

                    kullanicilar.Add(Context.ConnectionId, ad);
                    data.Put("SignalrKullanicilari", kullanicilar);
                }
                catch (Exception ex)
                {

                }

            }

            return base.OnConnected();
        }

        public override Task OnReconnected()
        {
            string ad = Context.User.Identity.Name;
            if (!string.IsNullOrEmpty(ad))
            {
                try
                {
                    var kullanicilar = (Dictionary<string, string>)data.Get("SignalrKullanicilari");
                    if (kullanicilar == null)
                    {
                        kullanicilar = new Dictionary<string, string>();
                    }

                    kullanicilar.Add(Context.ConnectionId, ad);
                    data.Put("SignalrKullanicilari", kullanicilar);
                }
                catch (Exception ex)
                {

                }

            }
            return base.OnReconnected();
        }
        public override Task OnDisconnected(bool stopCalled)
        {
            string ad = Context.User.Identity.Name;
            if (!string.IsNullOrEmpty(ad))
            {
                try
                {
                    var kullanicilar = (Dictionary<string, string>)data.Get("SignalrKullanicilari");
                    if (kullanicilar != null)
                    {
                        kullanicilar.Remove(Context.ConnectionId);
                        data.Put("SignalrKullanicilari", kullanicilar);
                    }
                }
                catch (Exception ex)
                {

                    throw;
                }


            }
            return base.OnDisconnected(stopCalled);
        }

    }
}
