using Microsoft.ApplicationServer.Caching;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Web;

namespace WebRole.Handlers
{
    /// <summary>
    /// Summary description for IlceVeri
    /// </summary>
    public class IlceVeri : IHttpHandler
    {

        public static void Catch(CacheEntryRemovedArguments c)
        {
            if (c.RemovedReason == CacheEntryRemovedReason.Expired)
            {
                CacheItemPolicy policy = new CacheItemPolicy();
                policy.RemovedCallback = new CacheEntryRemovedCallback(Catch);
                policy.AbsoluteExpiration = DateTime.Now.AddSeconds(60);
                var genel = data.Get(c.CacheItem.Key);
                if (genel != null)
                c.Source.Set(c.CacheItem.Key, genel, policy);
            }
        }

        static DataCache data = new DataCache();
        public static ObjectCache cache = MemoryCache.Default;

        public void ProcessRequest(HttpContext context)
        {
            TimeSpan freshness = new TimeSpan(0, 0, 0, 60);
            context.Response.Cache.SetExpires(DateTime.Now.Add(freshness));
            context.Response.Cache.SetMaxAge(freshness);
            context.Response.Cache.SetLastModified(DateTime.Now);
            context.Response.Cache.SetCacheability(HttpCacheability.Public);
            context.Response.Cache.SetValidUntilExpires(true);
            context.Response.Cache.VaryByParams["*"] = true;


            if (!string.IsNullOrEmpty(context.Request["IlKodu"]))
            {

                int IlKodu=-1;
                if (int.TryParse(context.Request["IlKodu"], out IlKodu) && (IlKodu > 0 && IlKodu < 82) || (IlKodu == 601 || IlKodu == 602 || IlKodu == 341 || IlKodu == 342 || IlKodu == 343 || IlKodu == 351 || IlKodu == 352))
                {

                    string veri = cache["Il_" + IlKodu] as string;
                    if (veri == null)
                    {
                        CacheItemPolicy policy = new CacheItemPolicy();
                        policy.RemovedCallback = new CacheEntryRemovedCallback(Catch);
                        policy.AbsoluteExpiration = DateTime.Now.AddSeconds(60);
                        var TumIller = data.Get("Il_" + IlKodu);
                        if (TumIller != null)
                            cache.Set("Il_" + IlKodu, TumIller, policy);
                        context.Response.Write(TumIller);
                    }
                    else
                    {
                        context.Response.Write(veri);
                    }
                }

            }

        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}