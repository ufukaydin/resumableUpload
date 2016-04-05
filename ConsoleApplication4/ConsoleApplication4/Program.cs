using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication4
{
    class Program
    {
        static void Main(string[] args)
        {
            List<string> ss = new List<string>();
            ss.Add("sdad");
            ss.Add("sdad");
            ss.Add("sdad");
            ss.Add("sdad");
            ss.Add("sdad");
            DirectoryInfo d = new DirectoryInfo(@"\\wsapprt@PortalDrive");

            foreach (DirectoryInfo item in d.GetDirectories())
            {
                Console.WriteLine(item.FullName);
            }
 

            Console.Read();
        }
    }
}
