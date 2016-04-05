<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebApplication14.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>


    <link rel="stylesheet" type="text/css" href="css/normalize.css" />
    <link rel="stylesheet" type="text/css" href="css/demo.css" />
    <link rel="stylesheet" type="text/css" href="css/component.css" />

</head>
<body>
     <div id="skk">       
         <div style="width:800px;">
         <img src="img/AA_LOGO31.png" id="benimresmim" style="width:100%;"/>
             <input style="width:100%" type="range" min="-180" max="180" step="1" id="derece" value="0" />
             <label id="valuelar"></label>
             </div>
           <canvas  style="cursor:move;"  id="canvas" ></canvas>
        <input type="button" value="cropla" id="cropla" />
          <input type="range" id="bar" min="0" max="100" step="1" value="100">


     </div>

    <div class="container">
       

        <div class="content">

            <div class="component">
                <div class="overlay">
                    <div class="overlay-inner">
                    </div>
                </div>

                <img class="resize-image"  >
                <button class="btn-crop js-crop">Kes </button>
            </div>

          
        </div>


    </div>
    <script src="js/jquery-2.1.1.min.js"></script>
    <script src="js/component.js"></script>
    <script>
        $(document).ready(function () {
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");
            $("#cropla").click(function () {

                $(".resize-image").attr("src", canvas.toDataURL());

                resizeableImage(".resize-image");

            });

     


            canvas.width = $("#benimresmim").width();
            canvas.height = $("#benimresmim").height();
            var startX;
            var startY;
            var isDown = false;
            var canvasOffset = $("#canvas").offset();
            var offsetX = canvasOffset.left;
            var offsetY = canvasOffset.top;

            var cx = canvas.width / 2;
            var cy = canvas.height / 2;
            var w;
            var h;
            var r = 0;

            var img = new Image();
            img.onload = function () {
                w = img.width;
                h = img.height;
                draw();
            }
            img.src = $("#benimresmim").attr("src");


            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                drawRect();
            }

            function drawRect() {
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(r);
                ctx.drawImage(img, 0, 0, img.width, img.height, -w, -h, w * 2, h * 2);
                ctx.restore();
            }





            $("#derece").change(function () {
                var angle = $(this).val();
                $("#valuelar").text(angle);
                r = angle * Math.PI / 180;
                draw();

            });


        });

    </script>
</body>
</html>
