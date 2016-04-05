<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="WebApplication5.Default" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <script src="tinysort.min.js"></script>
    <style>
        #map {
            height: 600px;
        }

            #map > svg {
                height: 600px;
                margin: 0 25px;
                width: 1156px;
            }

        body {
            font-family: Arial, Helvetica, sans-serif;
            margin: 0px;
            letter-spacing: -1px;
        }

        ul, li {
            margin: 0;
            padding: 0;
            list-style: none;
        }

        .left {
            float: left;
        }

        .right {
            float: right;
        }

        #BodyDiv {
            width: 1720px;
            height: 930px;
            background: rgb(124,205,196);
            padding: 50px 100px 100px 100px;
            margin: auto;
        }

        #IcerikDiv {
            height: 100%;
            width: 100%;
        }

        #UstKisim {
            height: 155px;
        }

        #OrtaKisim {
            height: 620px;
        }

        #AltKisim {
            height: 155px;
        }

        #LocationAlt {
            width: 320px;
            height: 148px;
            background: #FFFFFF;
            border-radius: 17px;
            float: left;
            margin: 3px 0;
            box-shadow: inset -8px -8px 15px -6px rgba(0,0,0,0.4);
        }

            #LocationAlt > div {
                margin: 5px 0 2px 14px;
                font-size: 32px;
                letter-spacing: -1px;
                line-height: 31px;
                width: 270px;
            }

        #AltIl {
            font-weight: 900;
        }

        #AltIlce {
        }

        #AltLocationOran {
            text-align: right;
            margin-top: 13px !important;
        }

        .PartiUst {
            width: 312px;
            height: 148px;
            background: #FFFFFF;
            border-radius: 17px;
            float: left;
            margin: 3px 2px;
            box-shadow: inset -8px -8px 15px -6px rgba(0,0,0,0.4);
        }

        .PartiAlt {
            width: 275px;
            height: 148px;
            background: #FFFFFF;
            border-radius: 17px;
            float: left;
            margin: 3px 2px;
            box-shadow: inset -8px -8px 15px -6px rgba(0,0,0,0.4);
        }

        #AltSandik {
            float: left;
            margin-left: 100px;
        }

        .LogoUstSol {
            float: left;
            width: 100px;
        }

        .LogoAltSol {
            float: left;
            width: 100px;
        }

        .LogoUstSag {
            float: right;
            width: 205px;
        }

        .LogoAltSag {
            float: right;
            width: 175px;
        }

        .PartiUstDortlu > img {
            width: 80px;
            margin: 10px;
        }

        .PartiUstDegisim {
            text-align: center;
        }

        .PartiUstDortlu > img {
            width: 80px;
            margin: 10px;
        }

        .PartiAltBesli > img {
            width: 80px;
            margin: 10px;
        }

        .PartiUstDegisim {
            text-align: center;
        }

        .PartiAltDegisim {
            text-align: center;
        }

        .LogoUstSag > div {
            width: 198px;
        }

        .LogoAltSag > div {
            width: 170px;
        }


        .DortluLogo {
            height: 43px;
            margin-top: 7px;
        }

            .DortluLogo > span:nth-child(1) {
                float: left;
                margin-left: 28px;
                font-size: 30px;
                font-weight: bolder;
            }

            .DortluLogo > span:nth-child(2) {
                float: right;
                margin-right: 10px;
            }


        .BesliLogo {
            height: 43px;
            margin-top: 7px;
        }

            .BesliLogo > span:nth-child(1) {
                float: left;
                margin-left: 28px;
                font-size: 30px;
                font-weight: bolder;
            }

            .BesliLogo > span:nth-child(2) {
                float: right;
                margin-right: 10px;
            }

        .DortluSonuc {
            height: 43px;
            margin-bottom: 5px;
        }

            .DortluSonuc > span:nth-child(1) {
                float: left;
                font-size: 29px;
                font-weight: 900;
            }

            .DortluSonuc > span:nth-child(2) {
                float: right;
                margin-right: 14px;
                font-size: 29px;
                font-weight: 900;
                text-align: right;
            }

        .BesliSonuc {
            height: 43px;
            margin-bottom: 5px;
        }

            .BesliSonuc > span:nth-child(1) {
                float: left;
                font-size: 29px;
                font-weight: 900;
            }

            .BesliSonuc > span:nth-child(2) {
                float: right;
                margin-right: 19px;
                font-size: 29px;
                font-weight: 900;
            }

        .DortluGecmis {
        }

            .DortluGecmis > span:nth-child(1) {
                float: left;
                font-size: 19px;
            }

            .DortluGecmis > span:nth-child(2) {
                float: right;
                margin-right: 19px;
                font-size: 19px;
                text-align: right;
            }

        .BesliGecmis {
        }

            .BesliGecmis > span:nth-child(1) {
                float: left;
                font-size: 19px;
            }

            .BesliGecmis > span:nth-child(2) {
                float: right;
                margin-right: 19px;
                font-size: 19px;
            }

        .DortluHR {
            height: 1px;
            background: #3C3C3C;
            margin: 5px 0;
        }

        .BesliHR {
            height: 1px;
            background: #3C3C3C;
            margin: 5px 0;
        }

        #AltBesliUl {
            float: left;
        }

            #AltBesliUl > li {
                float: left;
            }

        #OrtaLokasyon {
            width: 450px;
            height: 610px;
            background: rgb(235,225,198);
            float: left;
            border-radius: 25px;
            margin: 5px 0;
            box-shadow: inset 0px 1px 10px 2px rgba(0,0,0,0.4);
        }

        #OrtaAlan {
            width: 1264px;
            height: 610px;
            background: rgb(245, 253, 244);
            border-radius: 25px;
            float: right;
            margin: 5px 0;
            box-shadow: inset -8px -8px 15px -3px rgba(0,0,0,0.4);
        }

        #OrtaLokasyonAdi {
            float: left;
            font-size: 26px;
            font-weight: 900;
            margin: 10px 0 0 20px;
        }

        #OrtaSandik {
            float: left;
            margin-right: 10px;
        }

        #OrtaAcilanSandik {
            float: left;
        }

        #OrtaOranDiv {
            float: right;
            margin: 10px 15px 0 0;
            font-size: 26px;
        }

        #OrtaUstKisim {
            height: 45px;
        }

        #OrtaYuzde {
            float: left;
            font-size: 35px;
            font-weight: 600;
            margin-left: 30px;
        }

        #OrtaBasliklar {
            float: right;
            height: 45px;
            clear: both;
            width: 320px;
            margin-top: 10px;
        }

        #OrtaPerson {
            float: right;
            margin-right: 76px;
        }

        #OrtaHR {
            height: 1px;
            width: 306px;
            background: black;
            clear: both;
        }

        #OrtaBesliUl {
            clear: both;
        }

            #OrtaBesliUl > li {
                width: 424px;
                height: 90px;
                margin: 0 14px;
                padding: 10px 0 0 0;
            }

                #OrtaBesliUl > li:not(:last-child) {
                    border-bottom: 1px solid #4E4E4E;
                }

        .OrtaParti {
            margin-left: 8px;
        }

            .OrtaParti > img {
                width: 80px;
            }

        .OrtaYuzde {
            width: 200px;
            margin-top: 7px;
        }

        .OrtaMSayi {
            width: 70px;
            margin-top: 7px;
        }

        .OrtaYuzde > div:nth-child(1) {
            font-size: 42px;
            font-weight: bolder;
            margin-left: 30px;
        }

        .OrtaYuzde > div:nth-child(2) {
            font-size: 21px;
            margin-left: 30px;
            margin-top: 3px;
        }

        .OrtaMSayi > div:nth-child(1) {
            font-size: 42px;
            font-weight: bolder;
            text-align: right;
        }

        .OrtaMSayi > div:nth-child(2) {
            font-size: 21px;
            text-align: right;
            margin-top: 3px;
        }

        .OrtaDegisim {
            margin: 34px 5px 0 0;
        }

        #UstDortluUl {
        }

        #LogoYeri {
            width: 450px;
            height: 155px;
            float: left;
        }

        #UstDortluDiv {
            width: 1264px;
            height: 155px;
            float: right;
        }
    </style>
    <script>
        $(document).ready(function () {
            var ul = document.getElementById('AltBesliUl')
    , lis = ul.querySelectorAll('li')
    , liHeight = lis[0].offsetHeight
            ;
            ul.style.height = ul.offsetHeight + 'px';
            for (var i = 0, l = lis.length; i < l; i++) {
                var li = lis[i];
                li.style.position = 'absolute';
                li.style.top = i * liHeight + 'px';
            }

            tinysort('ul#AltBesliUl>li', { attr: 'datasi' }).forEach(function (elm, i) {
                setTimeout((function (elm, i) {
                    elm.style.top = i * liHeight + 'px';
                }).bind(null, elm, i), 40);
            });


            setTimeout(function () {

                $("#2").attr("datasi", "31");
               
                ul = document.getElementById('AltBesliUl')
  , lis = ul.querySelectorAll('li')
  , liHeight = lis[0].offsetHeight
                ;
                ul.style.height = ul.offsetHeight + 'px';
                for (var i = 0, l = lis.length; i < l; i++) {
                    var li = lis[i];
                    li.style.position = 'absolute';
                    li.style.top = i * liHeight + 'px';
                }


                tinysort('ul#AltBesliUl>li').forEach(function (elm, i) {
                    setTimeout((function (elm, i) {
                        elm.style.top = i * liHeight + 'px';
                    }).bind(null, elm, i), 40);
                });
            }, 3000);

            setTimeout(function () {

                $("#3").attr("datasi", "15");
               
                ul = document.getElementById('AltBesliUl')
      , lis = ul.querySelectorAll('li')
      , liHeight = lis[0].offsetHeight
                ;
                ul.style.height = ul.offsetHeight + 'px';
                for (var i = 0, l = lis.length; i < l; i++) {
                    var li = lis[i];
                    li.style.position = 'absolute';
                    li.style.top = i * liHeight + 'px';
                }

                tinysort('ul#AltBesliUl>li').forEach(function (elm, i) {
                    setTimeout((function (elm, i) {
                        elm.style.top = i * liHeight + 'px';
                    }).bind(null, elm, i), 40);
                });
            }, 6000);
        });



    </script>
</head>
<body>
    <form id="form1" runat="server">
        <div>
            <ul id="AltBesliUl">
                <li id="1" datasi="78">
                    <div class="PartiAlt">
                        <div class="LogoAltSol">
                            <div class="PartiAltBesli">
                                <img src="images/logo2.png" />
                            </div>
                            <div class="PartiAltDegisim">
                                <img src="images/Yukari.png" />
                            </div>
                        </div>
                        <div class="LogoAltSag">
                            <div class="BesliLogo">
                                <span>%</span>
                                <span>
                                    <img src="images/Person.png" /></span>
                            </div>
                            <div class="BesliSonuc">
                                <span class="BesliOran">21,23</span>
                                <span class="BesliMSayi">-</span>
                            </div>
                            <div class="BesliHR">
                            </div>
                            <div class="BesliGecmis">
                                <span>27,22</span>
                                <span>-</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li id="6" datasi="2">
                    <div class="PartiAlt">
                        <div class="LogoAltSol">
                            <div class="PartiAltBesli">
                                <img src="images/logo3.png" />
                            </div>
                            <div class="PartiAltDegisim">
                                <img src="images/Yukari.png" />
                            </div>
                        </div>
                        <div class="LogoAltSag">
                            <div class="BesliLogo">
                                <span>%</span>
                                <span>
                                    <img src="images/Person.png" /></span>
                            </div>
                            <div class="BesliSonuc">
                                <span class="BesliOran">22,23</span>
                                <span class="BesliMSayi">-</span>
                            </div>
                            <div class="BesliHR">
                            </div>
                            <div class="BesliGecmis">
                                <span>27,22</span>
                                <span>-</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li id="2" datasi="3">
                    <div class="PartiAlt">
                        <div class="LogoAltSol">
                            <div class="PartiAltBesli">
                                <img src="images/logo4.png" />
                            </div>
                            <div class="PartiAltDegisim">
                                <img src="images/Yukari.png" />
                            </div>
                        </div>
                        <div class="LogoAltSag">
                            <div class="BesliLogo">
                                <span>%</span>
                                <span>
                                    <img src="images/Person.png" /></span>
                            </div>
                            <div class="BesliSonuc">
                                <span class="BesliOran">23,23</span>
                                <span class="BesliMSayi">-</span>
                            </div>
                            <div class="BesliHR">
                            </div>
                            <div class="BesliGecmis">
                                <span>27,22</span>
                                <span>-</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li id="3" datasi="8">
                    <div class="PartiAlt">
                        <div class="LogoAltSol">
                            <div class="PartiAltBesli">
                                <img src="images/logo5.png" />
                            </div>
                            <div class="PartiAltDegisim">
                                <img src="images/Yukari.png" />
                            </div>
                        </div>
                        <div class="LogoAltSag">
                            <div class="BesliLogo">
                                <span>%</span>
                                <span>
                                    <img src="images/Person.png" /></span>
                            </div>
                            <div class="BesliSonuc">
                                <span class="BesliOran">24,23</span>
                                <span class="BesliMSayi">-</span>
                            </div>
                            <div class="BesliHR">
                            </div>
                            <div class="BesliGecmis">
                                <span>27,22</span>
                                <span>-</span>
                            </div>
                        </div>
                    </div>
                </li>
                <li id="4" datasi="5">
                    <div class="PartiAlt">
                        <div class="LogoAltSol">
                            <div class="PartiAltBesli">
                                <img src="images/logo1.png" />
                            </div>
                            <div class="PartiAltDegisim">
                                <img src="images/Yukari.png" />
                            </div>
                        </div>
                        <div class="LogoAltSag">
                            <div class="BesliLogo">
                                <span>%</span>
                                <span>
                                    <img src="images/Person.png" /></span>
                            </div>
                            <div class="BesliSonuc">
                                <span class="BesliOran">25,23</span>
                                <span class="BesliMSayi">-</span>
                            </div>
                            <div class="BesliHR">
                            </div>
                            <div class="BesliGecmis">
                                <span>27,22</span>
                                <span>-</span>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </form>
</body>
</html>
