using Nest;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace elasticCounts
{
    /// <summary>
    /// Summary description for Agg
    /// </summary>
    /// 
    public class Agg : IHttpHandler
    {
        static ConnectionSettings cs = new ConnectionSettings(new Uri(System.Configuration.ConfigurationManager.AppSettings["elastic"])).DefaultIndex(System.Configuration.ConfigurationManager.AppSettings["elasticIndex"]);
        static ElasticClient client = new ElasticClient(cs);

        public void ProcessRequest(HttpContext context)
        {

            int ay = Convert.ToInt32(context.Request["ay"]);
            int yil = Convert.ToInt32(context.Request["yil"]);
            ISearchResponse<HaberModel> searchResults = client.Search<HaberModel>(p => p

               .Aggregations(agg =>
               {
                   agg.DateHistogram("dt", o => o.Aggregations(k => k.Terms("ft", h => h.Field(t => t.HaberTuruId))).Field(k => k.ArsivTarihi).Interval(DateInterval.Day));
                   return agg;
               }).Query(o => o.DateRange(r => r.Field(f => f.ArsivTarihi).GreaterThanOrEquals(new DateTime(yil, ay, 1)).LessThanOrEquals(new DateTime(yil, ay, DateTime.DaysInMonth(yil, ay),23,59,59)))).Sort(o=>o.Ascending(k=>k.HaberTuruId)));

            var facet = (Nest.BucketAggregate)searchResults.Aggregations.First().Value;
            List<JsonVerileri> liste = new List<JsonVerileri>();
            foreach (var item in facet.Items)
            {
                var x = (Nest.DateHistogramBucket)item;
                var y = (Nest.BucketAggregate)x.Aggregations.First().Value;
                foreach (Nest.KeyedBucket keys in y.Items)
                {

                    liste.Add(new JsonVerileri() { tip = keys.Key, VeriSayisi = keys.DocCount, Tarih = x.KeyAsString });

                }


            }
            context.Response.Write(JsonConvert.SerializeObject(liste));


        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
    public class JsonVerileri
    {
        public long? VeriSayisi { get; set; }
        public string Tarih { get; set; }
        public string tip { get; set; }
    }
    public class HaberModel
    {


        public long Id { get; set; }

        public int HaberRevizyonId { get; set; }

        public long YayinId { get; set; }

        public DateTime ArsivTarihi { get; set; }

        public int HaberTuruId { get; set; }

        public int DilId { get; set; }

        public int OncelikId { get; set; }

        public int SaglayiciId { get; set; }

        public int LokasyonId { get; set; }

        public int CountryId { get; set; }

        public int CityId { get; set; }

        public int YayinlayanServisId { get; set; }

        public int YayinlayanKisiId { get; set; }
        public bool YayinlandiMi { get; set; }

        public bool AboneyeGoster { get; set; }

        public bool ArsivHazirDurumu { get; set; }

        public bool KullanimDurumu { get; set; }


        public bool ArsivGuncellendiMi { get; set; }

        public string Copyright { get; set; }


        public string BekliyorFlag { get; set; }

        public string Baslik { get; set; }

        public string Spot { get; set; }

        public string Icerik { get; set; }

        public string Keywords { get; set; }

        public IEnumerable<string> Beklenilenler { get; set; }
        public IEnumerable<int> Kategoriler { get; set; }
        public IEnumerable<int> Bultenler { get; set; }
        public IEnumerable<int> Muhabirler { get; set; }
        public IEnumerable<int> Redaktorler { get; set; }
        public IEnumerable<int> Cevirmenler { get; set; }

        public IEnumerable<int> Gundemler { get; set; }
    }
}