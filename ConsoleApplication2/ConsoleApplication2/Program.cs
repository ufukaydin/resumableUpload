using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Collections.Generic;
using System.Linq;
using System.Collections.ObjectModel;
using System.Diagnostics;
class MyTcpListener
{

    public static void StartClient()
    {

        try
        {
            //string gonder1 = "Laa1   aajansi1            1                   ";


            //byte[] request1 = System.Text.Encoding.ASCII.GetBytes(gonder1);

            //byte[] listem1 = new byte[49];
            //listem1[0] = 0x0;
            //listem1[1] = 0x2F;
            //Array.Copy(request1, 0, listem1, 2, request1.Length);

            byte[] data = new byte[]{
  0x0, //1
  0x2f,//2
  0x4c,//3
  0x61,//4 a
  0x61,//5 a
  0x31,//6 1 
  0x20,//7 
  0x20,//8
  0x20,//9
  0x61,//10 a
  0x61,//11 a
  0x6A,//12 j
  0x61,//13 a
  0x6E,//14 n
  0x73,//15 s
  0x69,//16 i
  0x31,//17 
  0x20,//18 
  0x20,//19
  0x20,//20
  0x20,//21
  0x20,//22
  0x20,//23
  0x20,//24
  0x20,//25
  0x20,//26
  0x20,//27
  0x20,//28
  0x20,//29
  0x31,//30
  0x20,//31
  0x20,//32
  0x20,//33
  0x20,//34
  0x20,//35
  0x20,//36
  0x20,//37
  0x20,//38
  0x20,//39
  0x20,//40
  0x20,//41
  0x20,//42
  0x20,//43
  0x20,//44
  0x20,//45
  0x20,//46
  0x20,//47
  0x20,//48
  0x31 //49
  
};



            Console.WriteLine("Connecting.....");

            IPAddress ipAddress = IPAddress.Parse("10.57.3.6");
            IPEndPoint remoteEP = new IPEndPoint(ipAddress, 39101);

            // use the ipaddress as in the server program
            Socket sender = new Socket(AddressFamily.InterNetwork,
       SocketType.Stream, ProtocolType.Tcp);
            sender.Connect(remoteEP);
            Console.WriteLine("Connected");
            Console.Write("Enter the string to be transmitted : ");


            Console.WriteLine("Transmitting.....");

            sender.Send(data);
            ObservableCollection<string> s = new ObservableCollection<string>();
            s.CollectionChanged += s_CollectionChanged;
            Stopwatch st = new Stopwatch();
            st.Start();
            int kalansayi = 0;
            while (true)
            {
                byte[] bb = new byte[2048];
                int k = sender.Receive(bb);
                int index = 0;
          
                try
                {
                    do
                    {

                        if (kalansayi == 0)
                        {
                          
                            byte[] sayi = { bb[index + 1], 0, 0, 0 };
                            int say = BitConverter.ToInt32(sayi, 0);

                            if (say > 2047)
                            {
                                break;
                            }


                            if (k < (say + index + 2))
                            {
                                kalansayi = (say + index + 2) - k;
                                s.Add(Encoding.UTF8.GetString(bb, (index + 2), k - (index + 2)));
                         
                                index = 0;
                                break;
                            }
                            else
                            {
                                s.Add(Encoding.UTF8.GetString(bb, index + 2, say));
                                Console.WriteLine(Encoding.UTF8.GetString(bb, index + 2, say));
                                index += say + 2;
                            }




                        }


                        else
                        {

                            string son = s[s.Count - 1] + (Encoding.UTF8.GetString(bb, 0, kalansayi));
                            s[s.Count - 1] = son;
                            Console.WriteLine(son);
                            index = kalansayi;
                            kalansayi = 0;

                        }
                        if (s.Count == 10000)
                        {
                            st.Stop();
                            long sd = st.ElapsedMilliseconds;
                            File.WriteAllLines(@"C:\emre\deneme.txt", s, Encoding.UTF8);
                          
                        }

                    } while (k >= index+2);


                }
                catch (Exception)
                {

                    throw;
                }
              

            }




        }
        catch (Exception e)
        {
            Console.WriteLine(e.ToString());
        }
    }

    static void s_CollectionChanged(object sender, System.Collections.Specialized.NotifyCollectionChangedEventArgs e)
    {
        string[] arr = e.NewItems[0].ToString().Split(';');
        if (arr[0] == "SBDt")
        {
            Debug.WriteLine(arr[0]);
        }

        if (arr[0] == "St")
        {
            Debug.WriteLine(arr[0]);
        }

    }
    public static void HeartBeat(Stream tcp)
    {

    }

    public static void Main()
    {
        StartClient();
        Console.ReadLine();
    }
}