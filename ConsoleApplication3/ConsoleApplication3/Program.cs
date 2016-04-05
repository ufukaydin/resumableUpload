using SAP.Middleware.Connector;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication3
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                if (RfcDestinationManager.TryGetDestination("PRD_000") == null)
                {
                    RfcDestinationManager.RegisterDestinationConfiguration(new SapBackendConfig());
                }
                RfcDestination d = RfcDestinationManager.GetDestination("PRD_000");
                RfcRepository r = d.Repository;
                IRfcFunction f = r.CreateFunction("Z_PERS_FOTO_TOPLU");
                IRfcTable t = f.GetTable("SICIL_URL");
                f.Invoke(d);
                File.WriteAllLines(@"c:\ufuktest\text1.txt", t.Select(o => o.GetString("URL")));
                foreach (var item in t)
                {

                    string sicil = item.GetString("SICIL");
                    string url = item.GetString("URL");
                   

                } 
            }
            catch (Exception ex)
            {
                File.WriteAllText(@"c:\ufuktest\text.txt", ex.Message);
            }
            Console.Read();
        }
    }
}
