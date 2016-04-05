using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Net;
using System.Diagnostics;
using System.Threading;
namespace PFor
{

    public class UzakPc
    {
        public string PcName { get; set; }
        public string KAdi { get; set; }
        public string Sifre { get; set; }
    }
    public class UzakSql
    {
        public string SqlConnString { get; set; }

    }


    class Program
    {

        private static List<UzakPc> uzakpcList = new List<UzakPc>();
        private static List<UzakSql> uzaksqlList = new List<UzakSql>();
        static void Main(string[] args)
        {
            uzakpcList.Add(new UzakPc() { KAdi = "aaa", Sifre = "06550655", PcName = "aa" });
            uzakpcList.Add(new UzakPc() { KAdi = "aaa", Sifre = "06550655", PcName = "aa" });
            uzakpcList.Add(new UzakPc() { KAdi = "aaa", Sifre = "06550655", PcName = "aa" });
            uzaksqlList.Add(new UzakSql() { SqlConnString="local"  });
            RunWorker();

            Console.Read();

        }





        public static void RunWorker()
        {

            Parallel.ForEach(uzakpcList, (pc) =>
            {
                PerformanceCounter cpu;
                PerformanceCounter memmory;
                while (true)
                {
                    cpu = new PerformanceCounter("Processor Information", "% Processor Time", "_Total",pc.PcName);
                    memmory = new PerformanceCounter("Memory", "Available MBytes",null,pc.PcName);
                    cpu.NextValue();
                    Console.WriteLine(memmory.NextValue());
                    Thread.Sleep(1000);
                    Console.WriteLine(cpu.NextValue());
                }


            });

            Parallel.ForEach(uzaksqlList, (sql) =>
            {
                while (true)
                {
                    //sql için işlemler
                }
            });



        }

    }
}
