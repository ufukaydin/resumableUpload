using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.WindowsAzure;
using Microsoft.WindowsAzure.Diagnostics;
using Microsoft.WindowsAzure.ServiceRuntime;
using Microsoft.WindowsAzure.Storage;
using Servis.Class;

namespace Servis
{
    public class WorkerRole : RoleEntryPoint
    {
        private readonly CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
        private readonly ManualResetEvent runCompleteEvent = new ManualResetEvent(false);
        static Bilgilendirme bilgilendirme = new Bilgilendirme();
        public override void Run()
        {
            //Trace.TraceInformation("Servis is running");

            try
            {
                this.RunAsync(this.cancellationTokenSource.Token).Wait();
            }
            finally
            {
                this.runCompleteEvent.Set();
            }
        }

        public override bool OnStart()
        {

            ServicePointManager.DefaultConnectionLimit = 12;
            bool result = base.OnStart();
            bool v = Onbellek.IsInitiated;
            if (v)
            {
                EventLog.WriteEntry("AzureParser", "Onbellek Baþlatýldý.", EventLogEntryType.Information);
            }
            else
            {
                EventLog.WriteEntry("AzureParser", "Onbellek Baþlatýlamadý.", EventLogEntryType.Error);
            }
            return result;
        }

        public override void OnStop()
        {
            //Trace.TraceInformation("Servis is stopping");

            this.cancellationTokenSource.Cancel();
            this.runCompleteEvent.WaitOne();

            base.OnStop();

            //Trace.TraceInformation("Servis has stopped");
        }

        private async Task RunAsync(CancellationToken cancellationToken)
        {
            int tempSaniye = 0;
            // TODO: Replace the following with your own logic.
            while (!cancellationToken.IsCancellationRequested)
            {
                //tempSaniye++;
                //Trace.TraceInformation("Working");
                await Task.Delay(10000);
                EventLog.WriteEntry("AzureParser WorkerRole", "Çalýþýyor.", EventLogEntryType.Information, 1);

                //if (tempSaniye == 10)
                //{
                //    bilgilendirme.EventlogaYaz("WorkerRole Çalýþýyor", EventLogEntryType.Information);
                //    tempSaniye = 0;
                //}
            }
        }

    }
}













