using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

// State object for reading client data asynchronously
public class StateObject
{
    // Client  socket.
    public Socket workSocket = null;
    // Size of receive buffer.
    public const int BufferSize = 1024;
    // Receive buffer.
    public byte[] buffer = new byte[BufferSize];
    // Received data string.
    public StringBuilder sb = new StringBuilder();
}

public class AsynchronousSocketListener
{
    // Thread signal.
    public static ManualResetEvent allDone = new ManualResetEvent(false);

    public AsynchronousSocketListener()
    {
    }

    public static void StartListening()
    {
        try
        {
            IPAddress ipAd = IPAddress.Parse("127.0.0.1");
            // use local m/c IP address, and 
            // use the same in the client

            /* Initializes the Listener */
            TcpListener myList = new TcpListener(ipAd, 5000);

            /* Start Listeneting at the specified port */
            myList.Start();

            Console.WriteLine("The server is running at port 8001...");
            Console.WriteLine("The local End point is  :" +
                              myList.LocalEndpoint);
            Console.WriteLine("Waiting for a connection.....");

            Socket s = myList.AcceptSocket();
            Console.WriteLine("Connection accepted from " + s.RemoteEndPoint);
             
           

            ASCIIEncoding asen = new ASCIIEncoding();

            while (true)
            {
                 
                s.Send(asen.GetBytes("\nData:"+Guid.NewGuid() + " " + Guid.NewGuid() ));
                Thread.Sleep(2000);
            }

         
             
            Console.WriteLine("\nSent Acknowledgement");
 
            s.Close();
            myList.Stop();
            Console.Read();
        }
        catch (Exception e)
        {
            Console.WriteLine("Error..... " + e.StackTrace);
        }    
    }

 

    public static int Main(String[] args)
    {
        StartListening();
        return 0;
    }
}