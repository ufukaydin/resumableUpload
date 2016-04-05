<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TvEkrani16X9.aspx.cs" Inherits="WebTv.TvEkrani" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>ANADOLU AJANSI - TV EKRANI</title>

    <link rel="shortcut icon" href="images/aa_logoico.ico" type="image/x-icon" />
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css" />
    <link href="Css/TvEkrani16X9.css" rel="stylesheet" />
    <link href="Css/font-awesome.css" rel="stylesheet" />

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
    <script src="Scripts/jquery.signalR-2.2.0.min.js"></script>
    <script src="Scripts/SignalRConnect.js"></script>
    <script src="Scripts/PartiRenkId_v8.js"></script>
    <script src="Scripts/TurkeyMap_v5.js"></script>
    <script src="Scripts/amcharts.js"></script>
    <script src="Scripts/serial.js"></script>
    <script src="Scripts/TvEkrani16X9.js"></script>

</head>
<body>
    <div id="BodyDiv" class="ZeminRENK">
        <div id="IcerikDiv">
            <div id="UstKisim">
                <div id="LogoYeri"></div>
                <div id="UstDortluDiv">
                    <ul id="UstDortluUl">
                        <li>
                            <div class="PartiUst">
                                <div class="LogoUstSol">
                                    <div class="PartiUstDortlu">
                                        <img id="0_Logo" src="" />
                                    </div>
                                    <div class="PartiUstDegisim">
                                        <i id="0_Ok" class="fa fa-caret-square-o-up Yukari"></i>
                                    </div>
                                </div>
                                <div class="LogoUstSag">
                                    <div class="DortluLogo">
                                        <span>%</span>
                                        <span>
                                            <i class="fa fa-user Person"></i>
                                        </span>
                                    </div>
                                    <div class="DortluSonuc">
                                        <span id="0_Oran" class="DortluOran"></span>
                                        <span id="0_MSayi" class="DortluMSayi"></span>
                                    </div>
                                    <div class="DortluHR">
                                    </div>
                                    <div class="DortluGecmis">
                                        <span id="0_GOran"></span>
                                        <span id="0_GSayi"></span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="PartiUst">
                                <div class="LogoUstSol">
                                    <div class="PartiUstDortlu">
                                        <img id="1_Logo" src="" />
                                    </div>
                                    <div class="PartiUstDegisim">
                                        <i id="1_Ok" class="fa fa-caret-square-o-down Asagi"></i>
                                    </div>
                                </div>
                                <div class="LogoUstSag">
                                    <div class="DortluLogo">
                                        <span>%</span>
                                        <span>
                                            <i class="fa fa-user Person"></i>
                                        </span>
                                    </div>
                                    <div class="DortluSonuc">
                                        <span id="1_Oran" class="DortluOran"></span>
                                        <span id="1_MSayi" class="DortluMSayi"></span>
                                    </div>
                                    <div class="DortluHR">
                                    </div>
                                    <div class="DortluGecmis">
                                        <span id="1_GOran"></span>
                                        <span id="1_GSayi"></span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="PartiUst">
                                <div class="LogoUstSol">
                                    <div class="PartiUstDortlu">
                                        <img id="2_Logo" src="" />
                                    </div>
                                    <div class="PartiUstDegisim">
                                        <i id="2_Ok" class="fa fa-minus-square Degismedi"></i>
                                    </div>
                                </div>
                                <div class="LogoUstSag">
                                    <div class="DortluLogo">
                                        <span>%</span>
                                        <span>
                                            <i class="fa fa-user Person"></i>
                                        </span>
                                    </div>
                                    <div class="DortluSonuc">
                                        <span id="2_Oran" class="DortluOran"></span>
                                        <span id="2_MSayi" class="DortluMSayi"></span>
                                    </div>
                                    <div class="DortluHR">
                                    </div>
                                    <div class="DortluGecmis">
                                        <span id="2_GOran"></span>
                                        <span id="2_GSayi"></span>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="PartiUst">
                                <div class="LogoUstSol">
                                    <div class="PartiUstDortlu">
                                        <img id="3_Logo" src="" />
                                    </div>
                                    <div class="PartiUstDegisim">
                                        <i id="3_Ok" class="fa fa-minus-square Degismedi"></i>
                                    </div>
                                </div>
                                <div class="LogoUstSag">
                                    <div class="DortluLogo">
                                        <span>%</span>
                                        <span>
                                            <i class="fa fa-user Person"></i>
                                        </span>
                                    </div>
                                    <div class="DortluSonuc">
                                        <span id="3_Oran" class="DortluOran"></span>
                                        <span id="3_MSayi" class="DortluMSayi"></span>
                                    </div>
                                    <div class="DortluHR">
                                    </div>
                                    <div class="DortluGecmis">
                                        <span id="3_GOran"></span>
                                        <span id="3_GSayi"></span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div id="OrtaKisimKapsayan">
                <div id="OrtaKisim">
                    <div id="OrtaLokasyon">
                        <div id="OrtaUstKisim">
                            <div id="OrtaLokasyonAdi"></div>
                            <div id="OrtaOranDiv">
                                <div id="OrtaSandik">
                                    <img src="images/Sandik.png" />
                                </div>
                                <div id="OrtaAcilanSandik"></div>
                            </div>
                        </div>

                        <div id="OrtaBasliklar">
                            <div id="OrtaYuzde">%</div>
                            <div id="OrtaPerson">
                                <i class="fa fa-user Person"></i>
                            </div>
                            <div id="OrtaHR"></div>
                        </div>

                        <ul id="OrtaBesliUl">
                            <li>
                                <div class="OrtaParti left">
                                    <img id="0_SagLogo" src="" />
                                </div>
                                <div class="OrtaYuzde left">
                                    <div id="0_SagYuzde"></div>
                                    <div id="0_SagGYuzde"></div>
                                </div>
                                <div class="OrtaMSayi left">
                                    <div id="0_SagMSayi"></div>
                                    <div id="0_SagGMSayi"></div>
                                </div>
                                <div class="OrtaDegisim right">
                                    <i id="0_SagOk" class="fa fa-minus-square Degismedi"></i>
                                </div>
                            </li>
                            <li>
                                <div class="OrtaParti left">
                                    <img id="1_SagLogo" src="" />
                                </div>
                                <div class="OrtaYuzde left">
                                    <div id="1_SagYuzde"></div>
                                    <div id="1_SagGYuzde"></div>
                                </div>
                                <div class="OrtaMSayi left">
                                    <div id="1_SagMSayi"></div>
                                    <div id="1_SagGMSayi"></div>
                                </div>
                                <div class="OrtaDegisim right">
                                    <i id="1_SagOk" class="fa fa-minus-square Degismedi"></i>
                                </div>
                            </li>
                            <li>
                                <div class="OrtaParti left">
                                    <img id="2_SagLogo" src="" />
                                </div>
                                <div class="OrtaYuzde left">
                                    <div id="2_SagYuzde"></div>
                                    <div id="2_SagGYuzde"></div>
                                </div>
                                <div class="OrtaMSayi left">
                                    <div id="2_SagMSayi"></div>
                                    <div id="2_SagGMSayi"></div>
                                </div>
                                <div class="OrtaDegisim right">
                                    <i id="2_SagOk" class="fa fa-minus-square Degismedi"></i>
                                </div>
                            </li>
                            <li>
                                <div class="OrtaParti left">
                                    <img id="3_SagLogo" src="" />
                                </div>
                                <div class="OrtaYuzde left">
                                    <div id="3_SagYuzde"></div>
                                    <div id="3_SagGYuzde"></div>
                                </div>
                                <div class="OrtaMSayi left">
                                    <div id="3_SagMSayi"></div>
                                    <div id="3_SagGMSayi"></div>
                                </div>
                                <div class="OrtaDegisim right">
                                    <i id="3_SagOk" class="fa fa-minus-square Degismedi"></i>
                                </div>
                            </li>
                            <li>
                                <div class="OrtaParti left">
                                    <img id="4_SagLogo" src="" />
                                </div>
                                <div class="OrtaYuzde left">
                                    <div id="4_SagYuzde"></div>
                                    <div id="4_SagGYuzde"></div>
                                </div>
                                <div class="OrtaMSayi left">
                                    <div id="4_SagMSayi"></div>
                                    <div id="4_SagGMSayi"></div>
                                </div>
                                <div class="OrtaDegisim right">
                                    <i id="4_SagOk" class="fa fa-minus-square Degismedi"></i>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <div id="OrtaAlan">

                        <style>
                            #OrtaAlan {
                                width: 1264px;
                                height: 610px;
                                /* background: rgb(245, 253, 244); */
                                border-radius: 5px;
                                float: right;
                                margin: 5px 0;
                                /* box-shadow: inset -8px -8px 15px -3px rgba(0,0,0,0.4); */
                            }

                            #GrafikAlan {
                                float: left;
                                width: 1264px;
                                height: 610px;
                                position: absolute;
                                background: rgb(245, 253, 244);
                                box-shadow: inset -8px -8px 15px -3px rgba(0,0,0,0.4);
                            }

                            #TurkiyeHaritaAlan {
                            }

                            #SehirlerHarita {
                                width: 1261px;
                                height: 610px;
                                /*background: #FDFAFA;*/
                                border-radius: 5px;
                                /*box-shadow: inset -8px -8px 15px -6px rgba(0,0,0,0.4);*/
                            }

                            #BosAlan {
                                background: black;
                                width: 1257px;
                                height: 610px;
                            }

                            #HaritaPng {
                                position: relative;
                                width: 650px;
                                height: 350px;
                                float: right;
                            }

                                #HaritaPng > svg {
                                    width: 650px;
                                    height: 350px;
                                }

                            #mapIlce {
                                position: absolute;
                                bottom: 0;
                                height: 380px;
                                margin: 0 0 15px 0px;
                                width: 520px;
                                margin-left: 100px;
                            }

                                #mapIlce > svg {
                                    bottom: 0; 
                                }
                        </style>

                        <div>
                            <div id="GrafikAlan">
                                <div id="HaritaIl" style="position: absolute; font-weight: bold; left: 77%; top: 6%; font-size: 36px; width: 251px;"></div>
                                <div id="lineChart"></div>
                            </div>

                            <div id="TurkiyeHaritaAlan">
                                <div id="map"></div>
                            </div>

                            <div id="SehirlerHarita">
                                <div id="SehirAdi"></div>
                                <div id="IlcelerLegends"></div>
                                <div id="HaritaPng"></div>
                                <div id="mapIlce"></div>
                            </div>

                            <div id="BosAlan"></div>
                        </div>
                    </div>
                </div>

            </div>

            <div id="AltKisim">
                <div id="LocationAlt">
                    <div id="AltIl"></div>
                    <div id="AltIlce"></div>
                    <div id="AltLocationOran">
                        <span id="AltSandik">
                            <img src="images/Sandik.png" />
                        </span>
                        <span id="AltOran"></span>
                    </div>
                </div>
                <ul id="AltBesliUl">
                    <li>
                        <div class="PartiAlt">
                            <div class="LogoAltSol">
                                <div class="PartiAltBesli">
                                    <img id="0_AltLogo" src="" />
                                </div>
                                <div class="PartiAltDegisim">
                                    <i id="0_AltOk" class="fa fa-minus-square Degismedi"></i>
                                </div>
                            </div>
                            <div class="LogoAltSag">
                                <div class="BesliLogo">
                                    <span>%</span>
                                    <span>
                                        <i class="fa fa-user Person"></i>
                                    </span>
                                </div>
                                <div class="BesliSonuc">
                                    <span id="0_AltOran" class="BesliOran"></span>
                                    <span id="0_AltMSayi" class="BesliMSayi"></span>
                                </div>
                                <div class="BesliHR">
                                </div>
                                <div class="BesliGecmis">
                                    <span id="0_AltGOran"></span>
                                    <span id="0_AltGMSayi"></span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="PartiAlt">
                            <div class="LogoAltSol">
                                <div class="PartiAltBesli">
                                    <img id="1_AltLogo" src="" />
                                </div>
                                <div class="PartiAltDegisim">
                                    <i id="1_AltOk" class="fa fa-minus-square Degismedi"></i>
                                </div>
                            </div>
                            <div class="LogoAltSag">
                                <div class="BesliLogo">
                                    <span>%</span>
                                    <span>
                                        <i class="fa fa-user Person"></i>
                                    </span>
                                </div>
                                <div class="BesliSonuc">
                                    <span id="1_AltOran" class="BesliOran"></span>
                                    <span id="1_AltMSayi" class="BesliMSayi"></span>
                                </div>
                                <div class="BesliHR">
                                </div>
                                <div class="BesliGecmis">
                                    <span id="1_AltGOran"></span>
                                    <span id="1_AltGMSayi"></span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="PartiAlt">
                            <div class="LogoAltSol">
                                <div class="PartiAltBesli">
                                    <img id="2_AltLogo" src="" />
                                </div>
                                <div class="PartiAltDegisim">
                                    <i id="2_AltOk" class="fa fa-minus-square Degismedi"></i>
                                </div>
                            </div>
                            <div class="LogoAltSag">
                                <div class="BesliLogo">
                                    <span>%</span>
                                    <span>
                                        <i class="fa fa-user Person"></i>
                                    </span>
                                </div>
                                <div class="BesliSonuc">
                                    <span id="2_AltOran" class="BesliOran"></span>
                                    <span id="2_AltMSayi" class="BesliMSayi"></span>
                                </div>
                                <div class="BesliHR">
                                </div>
                                <div class="BesliGecmis">
                                    <span id="2_AltGOran"></span>
                                    <span id="2_AltGMSayi"></span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="PartiAlt">
                            <div class="LogoAltSol">
                                <div class="PartiAltBesli">
                                    <img id="3_AltLogo" src="" />
                                </div>
                                <div class="PartiAltDegisim">
                                    <i id="3_AltOk" class="fa fa-minus-square Degismedi"></i>
                                </div>
                            </div>
                            <div class="LogoAltSag">
                                <div class="BesliLogo">
                                    <span>%</span>
                                    <span>
                                        <i class="fa fa-user Person"></i>
                                    </span>
                                </div>
                                <div class="BesliSonuc">
                                    <span id="3_AltOran" class="BesliOran"></span>
                                    <span id="3_AltMSayi" class="BesliMSayi"></span>
                                </div>
                                <div class="BesliHR">
                                </div>
                                <div class="BesliGecmis">
                                    <span id="3_AltGOran"></span>
                                    <span id="3_AltGMSayi"></span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="PartiAlt">
                            <div class="LogoAltSol">
                                <div class="PartiAltBesli">
                                    <img id="4_AltLogo" src="" />
                                </div>
                                <div class="PartiAltDegisim">
                                    <i id="4_AltOk" class="fa fa-minus-square Degismedi"></i>
                                </div>
                            </div>
                            <div class="LogoAltSag">
                                <div class="BesliLogo">
                                    <span>%</span>
                                    <span>
                                        <i class="fa fa-user Person"></i>
                                    </span>
                                </div>
                                <div class="BesliSonuc">
                                    <span id="4_AltOran" class="BesliOran"></span>
                                    <span id="4_AltMSayi" class="BesliMSayi"></span>
                                </div>
                                <div class="BesliHR">
                                </div>
                                <div class="BesliGecmis">
                                    <span id="4_AltGOran"></span>
                                    <span id="4_AltGMSayi"></span>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>
