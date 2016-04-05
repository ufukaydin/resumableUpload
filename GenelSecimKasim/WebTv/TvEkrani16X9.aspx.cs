﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace WebTv
{
    public partial class TvEkrani : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            bool auth = System.Web.HttpContext.Current.User == null ? false : System.Web.HttpContext.Current.User.Identity.IsAuthenticated;
            if (!auth)
            {
                System.Web.Security.FormsAuthentication.SignOut();
                Response.Redirect("Login.aspx");
            }
        }
    }
}