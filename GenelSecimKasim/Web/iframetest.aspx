<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="iframetest.aspx.cs" Inherits="WebRole.iframetest" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
</head>
<body>

    <%--<iframe src="http://secim.aa.com.tr/" width="1170" height="695" style="border: none;"></iframe>--%>
    <style>
        /*#wrap {
            width: 600px;
            height: 390px;
            padding: 0;
            overflow: hidden;
        }

        #frame {
            width: 800px;
            height: 520px;
            border: 1px solid black;
        }*/

        iframe body {
            -ms-zoom: 0.82;
            -moz-transform: scale(0.82);
            -moz-transform-origin: 0 0;
            -o-transform: scale(0.82);
            -o-transform-origin: 0 0;
            -webkit-transform: scale(0.82);
            -webkit-transform-origin: 0 0;
        }
    </style>


    <iframe height="720" src="http://secim.aa.com.tr/" scrolling="yes" style="border: none; overflow: hidden !important;" width="970"></iframe>

</body>
</html>
