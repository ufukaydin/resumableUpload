using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication1
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {

                var myProcess = new Process();

                myProcess.StartInfo.UseShellExecute = false;
                myProcess.StartInfo.FileName = @"C:\Users\aaa\Documents\visual studio 2013\Projects\testConsole\testConsole\bin\Debug\testConsole.exe";

                myProcess.StartInfo.CreateNoWindow = true;
                 

                myProcess.Start();

                myProcess.WaitForExit();


            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}