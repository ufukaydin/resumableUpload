﻿using Microsoft.ApplicationServer.Caching;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Caching;
using System.Web;

namespace WebRole.Handlers
{
    /// <summary>
    /// Summary description for GenelVeri
    /// </summary>
    public class GenelVeri : IHttpHandler
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

         

            if (!string.IsNullOrEmpty(context.Request["GumrukDahil"]) && context.Request["GumrukDahil"] == "ok")
            {
                string veri = cache["GenelGumrukDahil"] as string;
                if (veri == null)
                {
                    CacheItemPolicy policy = new CacheItemPolicy();
                    policy.RemovedCallback = new CacheEntryRemovedCallback(Catch);
                    policy.AbsoluteExpiration = DateTime.Now.AddSeconds(60);
                    var TumIller = data.Get("GenelGumrukDahil");
                    if (TumIller != null)
                        cache.Set("GenelGumrukDahil", TumIller, policy);
                    context.Response.Write(TumIller);
                }
                else
                {
                    context.Response.Write(veri);
                }
            }
            else
            {
                string veri = cache["Genel"] as string;
                if (veri == null)
                {
                    CacheItemPolicy policy = new CacheItemPolicy();
                    policy.RemovedCallback = new CacheEntryRemovedCallback(Catch);
                    policy.AbsoluteExpiration = DateTime.Now.AddSeconds(60);
                    var TumIller = data.Get("Genel");
                    if (TumIller != null)
                        cache.Set("Genel", TumIller, policy);
                    context.Response.Write(TumIller);
                }
                else
                {
                    context.Response.Write(veri);
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