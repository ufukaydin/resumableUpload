using SAP.Middleware.Connector;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ConsoleApplication3
{
    class SapBackendConfig : IDestinationConfiguration
    {
        public bool ChangeEventsSupported()
        {
            return false;
        }
        public event RfcDestinationManager.ConfigurationChangeHandler ConfigurationChanged;
        public RfcConfigParameters GetParameters(string destinationName)
        {

            SAP.Middleware.Connector.RfcConfigParameters parms = new SAP.Middleware.Connector.RfcConfigParameters();
            parms.Add(RfcConfigParameters.AppServerHost, "10.254.104.141");
            parms.Add(RfcConfigParameters.SystemNumber, "00");
            parms.Add(RfcConfigParameters.User, "GLOBALRFC");
            parms.Add(RfcConfigParameters.Password, "Global123");
            parms.Add(RfcConfigParameters.Client, "500");
            parms.Add(RfcConfigParameters.Language, "EN");
            parms.Add(RfcConfigParameters.PoolSize, "5");
            parms.Add(RfcConfigParameters.PeakConnectionsLimit, "10");
            parms.Add(RfcConfigParameters.ConnectionIdleTimeout, "600");
            return parms;
        }
    }
}
