using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Management.Automation;
using System.Collections.ObjectModel;
using System.Management.Automation.Runspaces;
namespace Power
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();



        }

        private void button1_Click(object sender, EventArgs e)
        {

            using (PowerShell P = PowerShell.Create())
            {



                P.Commands.AddScript(" Get-WmiObject -List -Class Win32_PerfFormattedData* | Format-Table -Property Name,DisplayName -AutoSize");

                P.Commands.AddCommand("Out-String");


                Collection<PSObject> results = P.Invoke();


                StringBuilder stringBuilder = new StringBuilder();
                foreach (PSObject obj in results)
                {
                    stringBuilder.AppendLine(obj.ToString());
                }

                List<string> ListOfStr = new List<string>();

                foreach (var myString in stringBuilder.ToString().Split(new string[] { Environment.NewLine }, StringSplitOptions.RemoveEmptyEntries))
                {
                    var str = myString.Trim();
                    ListOfStr.Add(str);

                }
                Dictionary<string, string> dd = new Dictionary<string, string>();
                var x = 0;
                foreach (string item in ListOfStr)
                {
                    if (x >5)
                    {
                        try
                        {
                            PowerShell K = PowerShell.Create();
                            P.Commands.AddScript(" Get-WmiObject -Class " + item);
                            P.Commands.AddCommand("Out-String");
                            Collection<PSObject> results1 = P.Invoke();
                            StringBuilder stringBuilder1 = new StringBuilder();
                            foreach (PSObject obj in results)
                            {
                                stringBuilder1.AppendLine(obj.ToString());
                            }
                            dd.Add(item, stringBuilder1.ToString());
                            listBox1.Items.Add(item);
                        }
                        catch (Exception ex) 
                        {

                            Console.Write(ex.Message);
                        }
                     
                        
                    }

                    x++;
                }

            }
        }
    }
}
