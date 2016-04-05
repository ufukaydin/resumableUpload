using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Management.Automation;
using System.Management.Automation.Runspaces;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication7
{
    class Program
    {
        static void Main(string[] args)
        {
            RunspaceConfiguration runspaceConfiguration = RunspaceConfiguration.Create();
            Runspace runspace = RunspaceFactory.CreateRunspace(runspaceConfiguration);
            runspace.Open();
            RunspaceInvoke scriptInvoker = new RunspaceInvoke(runspace);
            Pipeline pipeline = runspace.CreatePipeline();
            string yol = @"C:\ufuk\aa.ps1";
            Command myCommand = new Command(yol);
            CommandParameter testParam = new CommandParameter("-subID", "e87f6988-74fe-407d-958e-53d97627b7ea");
            CommandParameter testParam1 = new CommandParameter("-thumb", "3595445568F900048C4637F213D94F977A43FF45");
            CommandParameter testParam2 = new CommandParameter("-servisName", "secimtvtest");
 
            myCommand.Parameters.Add(testParam);
            myCommand.Parameters.Add(testParam1);
            myCommand.Parameters.Add(testParam2);
          
            pipeline.Commands.Add(myCommand);
            var result = pipeline.Invoke();

           
        }
    }
}
