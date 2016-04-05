using System;
using System.IO;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

class MyTcpListener
{
 


        public static int Main(String[] args)
        {
            string output = "";

            try
            {
                string message = "";
                Int32 port = 13;
                TcpClient client = new TcpClient("127.0.0.1", 5000);
                 
                Byte[] data = new Byte[256];
                data = System.Text.Encoding.ASCII.GetBytes(message);
                 
                NetworkStream stream = client.GetStream();
                 
                stream.Write(data, 0, data.Length);

                output = "Sent: " + message;
                Console.WriteLine(output);
                 
                data = new Byte[256];
                 
                String responseData = String.Empty;
                 
                Int32 bytes = stream.Read(data, 0, data.Length);
                responseData = System.Text.Encoding.ASCII.GetString(data, 0, bytes);
                output = "Received: " + responseData;
                Console.WriteLine(output);
                 
                stream.Close();
                client.Close();
            }
            catch (ArgumentNullException e)
            {
                output = "ArgumentNullException: " + e;
            
            }
            catch (SocketException e)
            {
                output = "SocketException: " + e.ToString();
             
            }
        }
    
}

