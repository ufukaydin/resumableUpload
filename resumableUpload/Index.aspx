<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="resumableUpload.Index" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script src="https://code.jquery.com/jquery-2.2.2.min.js" integrity="sha256-36cp2Co+/62rEAAYHLmRCPIych47CvdM+uTBJwSzWjI=" crossorigin="anonymous"></script>
    <script src="resumableUpload.js"></script>
    <title></title>
    <style>
       

        .play:before {
              cursor:pointer;
            content: "\25B6";
        }
          .stop:before { 
              cursor:pointer;
            content: "\2587";
        }
        
    </style>
    <script>
        $(document).ready(function () {
            $("#Yukle").Yukle({ url: "Handlers/Handler1.ashx", BYTES_PER_CHUNK: 200000 });


        });
    </script>
</head>
<body>

    <div>
        <input type="file" id="Yukle" value="Yukle" />
    </div>

</body>
</html>
