using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace SnapShot
{
    class Program
    {
        static void Main(string[] args)
        {
            Thread t = new Thread(new ThreadStart(ResimGetir));
            t.SetApartmentState(ApartmentState.STA); 
            t.Start();
          
            Console.Read();
        }
        public static void ResimGetir()
        {
            Bitmap thumbnail = Bit.GenerateScreenshot("http://localhost:5846/Index.html",2000,768);

            thumbnail.Save(@"c:/ufuktest/thumbnail.png", System.Drawing.Imaging.ImageFormat.Png);

        }
    }
}
