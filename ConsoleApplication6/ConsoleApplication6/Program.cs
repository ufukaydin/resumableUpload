using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using System.IO;
namespace ConsoleApplication6
{
    class Program
    {
        static void Main(string[] args)
        {
            List<string> dd = File.ReadAllLines(@"C:\loglar\30.09.2015_veri.txt").ToList();
            List<string> ff = File.ReadAllLines(@"C:\loglar\30.09.2015_veri.txt").ToList().Distinct().ToList();
            List<string> ddfds = new List<string>();
            for (int i = 1; i < dd.Count; i++)
            {
                if (dd[i] == dd[i-1])
                {
                    ddfds.Add(i.ToString());
                }
                 
            }



            File.WriteAllLines(@"c:\Satir.txt", ddfds);

            Console.Read();
        }
    }
}
