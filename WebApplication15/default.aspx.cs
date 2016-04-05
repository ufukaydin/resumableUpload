using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication15
{
    public partial class _default : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            List<string> dd = new List<string>();

            dd.Add("ssss");
            dd.Add("bbbbb");
            dd.Add("cccc");

            foreach (var item in dd.Select(o=>o.Contains("b")))
            {
                
            }
        }
    }
}