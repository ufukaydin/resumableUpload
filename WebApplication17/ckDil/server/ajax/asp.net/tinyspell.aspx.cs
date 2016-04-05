using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebApplication17.ckDil.server.ajax.asp.net
{
    public partial class tinyspell : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.Write(NanoSpell.RPC.HandlePostRequest(Context));
            Response.Flush();
            Response.End();
        }
    }
}