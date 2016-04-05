using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace testApi
{
    public partial class Default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ServiceReference1.FinanceApiClient client = new ServiceReference1.FinanceApiClient();
            client.ClientCredentials.UserName.UserName = "test";
            client.ClientCredentials.UserName.Password = "123456";
            var data = client.FinanceGetTCMBSayfalari("TL031");
            Response.Write(data);
        }
    }
}