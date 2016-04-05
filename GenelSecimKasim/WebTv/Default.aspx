<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebTv.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>
    <script src="Scripts/jquery-1.6.4.min.js"></script>
    <script src="Scripts/jquery.signalR-2.2.0.min.js"></script>
    <script src="Scripts/SignalRConnect.js"></script>
    <script>

        //function invokelar()
        //{
        //    SecimBaglanti.invoke("islemTetikle", "tetikle");
        //}

        //var SecimBaglanti = SecimHub.createHubProxy('secimHub');

        //SecimBaglanti.on("tetikle", function (data) {
        //    $("body div").append(data);
        //});

    </script>

    <style>
        #BodyDiv {
            width: 720px;
            height: 405px;
            border: 1px solid gray;
            margin: auto;
            padding: 50px 100px 100px 100px;
        }
    </style>

</head>
<body>
    <div id="BodyDiv">
    </div>
</body>
</html>
