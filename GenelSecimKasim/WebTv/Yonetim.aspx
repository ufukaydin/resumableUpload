<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Yonetim.aspx.cs" Inherits="WebTv.Yonetim" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>

    <title>ANADOLU AJANSI - TV Yönetim</title>

    <link rel="shortcut icon" href="images/aa_logoico.ico" type="image/x-icon" />
    <link href='http://fonts.googleapis.com/css?family=PT+Sans:400,700' rel='stylesheet' type='text/css' />
    <link href="Css/YonetimTab.css" rel="stylesheet" />
    <link href="Css/bootstrap-switch.css" rel="stylesheet" />
    <link href="Css/font-awesome.css" rel="stylesheet" />

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
    <script src="Scripts/bootstrap-switch.js"></script>
    <script src="Scripts/PartiSecim.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>

</head>
<body>

    <style>
        .CalismaLabel {
            margin-top: 6px;
            color: honeydew;
            font-size: 21px;
        }
    </style>

    <header>
        <h1>YÖNETİM EKRANI</h1>
        <a href="TvEkrani16X9.aspx" target="_blank" class="button white">TELEVİZYON EKRANI</a>
        <%--<div class="CalismaDiv">
            <img src="images/under2.gif" class="CalismaDevamEtmekte" />
            <div class="CalismaLabel">ÇALIŞMA DEVAM ETMEKTEDİR...</div>
        </div>--%>
    </header>

    <div class="cd-tabs">
        <nav>
            <ul class="cd-tabs-navigation">
                <li><a data-content="inbox" class="selected" href="#0">KULLANMA KILAVUZU</a></li>
                <li><a data-content="new" href="#0">RENK</a></li>
                <li><a data-content="settings" href="#0">EKRAN</a></li>
                <li><a data-content="store" href="#0" id="PartiSecim">PARTİ</a></li>
                <li><a data-content="ortakisim" href="#0">ORTA LOKASYON</a></li>
                <li><a data-content="altkisim" href="#0">ALT LOKASYON</a></li>
                <li><a data-content="trash" href="#0">ORTA ALAN</a></li>
                <li><a data-content="grafik" href="#0">GRAFİK</a></li>
                <li><a data-content="turkiyeharitasi" href="#0">TÜRKİYE HARİTASI</a></li>
                <li><a data-content="sehirlerharitasi" href="#0">ŞEHİR HARİTASI</a></li> 
            </ul>
        </nav>
        <ul class="cd-tabs-content">
            <li data-content="inbox" class="selected" style="height: 700px;">
                <div class="KilavuzAciklama">
                    <div class="KilavizBaslik">Kullanma Kılavuzu</div>
                    <div class="KilavuzDetay">Bu ekranı kullanarak televizyon ekranını yönetebilirsiniz. Yapacağınız değişiklikler televizyon ekranına anlık olarak yansıyacağından iki ayrı ekran açmanız yönetim kolaylığı sağlayacaktır. </div>
                </div>
                <div class="KilavuzAciklama">
                    <div class="KilavizBaslik">Renk</div>
                    <ul class="KullanmaKilavuzu">
                        <li>
                            <div>-</div>
                            <div>Belirlenmiş alanların renklerini seçim yaparak yada renk kodu (HEX-COLOR) girerek kanalınız için uygun renkleri ayarlayabilirsiniz.</div>
                        </li>
                    </ul>
                </div>
                <div class="KilavuzAciklama">
                    <div class="KilavizBaslik">Ekran</div>
                    <ul class="KullanmaKilavuzu">
                        <li>
                            <div>-</div>
                            <div>Yapacağınız seçim ile logo ve orta alanların bulunduğu yerleri değiştirebilirsiniz.</div>
                        </li>
                    </ul>
                </div>
                <div class="KilavuzAciklama">
                    <div class="KilavizBaslik">Parti</div>
                    <ul class="KullanmaKilavuzu">
                        <li>
                            <div>-</div>
                            <div>Seçeceğiniz parti alacağı oy oranına tüm alanlarda gösterilecektir.</div>
                        </li>
                    </ul>
                </div>
                <div class="KilavuzAciklama">
                    <div class="KilavizBaslik">Orta Lokasyon</div>
                    <ul class="KullanmaKilavuzu">
                        <li>
                            <div>-</div>
                            <div>Orta kısımdaki alan için bir yada birden fazla seçilen şehir, belirlenmiş süreye bağlı kalarak sıralı bir şekilde gösterilmektedir.</div>
                        </li>
                    </ul>
                </div>
                <div class="KilavuzAciklama">
                    <div class="KilavizBaslik">Alt Lokasyon</div>
                    <ul class="KullanmaKilavuzu">
                        <li>
                            <div>-</div>
                            <div>Alt kısımdaki alan için bir yada birden fazla seçilen şehir ve bu şehirlerin <u>ilçeleri</u>, belirlenmiş süreye bağlı kalarak, sıralı bir şekilde gösterilmektedir.</div>
                        </li>
                    </ul>
                </div>
                <div class="KilavuzAciklama">
                    <div class="KilavizBaslik">Orta Alan Yönetimi</div>
                    <ul class="KullanmaKilavuzu">
                        <li>
                            <div>-</div>
                            <div>Grafik seçeneği ile şehirlerdeki 7 Haziran 2015 seçimleri ile 1 Kasım 2015 seçim sonuçları karşılaştırılabilir.</div>
                        </li>
                        <li>
                            <div>-</div>
                            <div>Türkiye haritasını partilerin almış olduğu oy oranlarına göre ve partilerin şehirlerdeki oy yüzdelerine göre görebilirsiniz.</div>
                        </li>
                        <li>
                            <div>-</div>
                            <div>Şehir seçimi yapılarak partilerin o şehirdeki ilçelerde parti durumları görülebilir.</div>
                        </li>
                    </ul>
                </div>
            </li>
            <li data-content="new" style="height: 1475px;">
                <div class="RenklerLI">
                    <div class="RenkGrup">
                        <div class="RenkAciklama">ARKA PLAN</div>
                        <div class="RenkSecimDiv">
                            <div class="farbtastic" id="Renk0"></div>
                            <span class="help-block">
                                <div class="farbstatTitle">Zemin</div>
                                <input type="text" id="Renk0Input" name="Renk0Input" value="#C3C5CA" class="RenkGosterim" />
                            </span>
                        </div>
                    </div>

                    <div class="RenkGrup">
                        <div class="RenkAciklama">ÜST KISIM</div>
                        <div class="RenkSecimDiv">
                            <div class="farbtastic" id="Renk1"></div>
                            <span class="help-block">
                                <div class="farbstatTitle">Üst Parti Zemin</div>
                                <input type="text" id="Renk1Input" name="Renk1Input" value="#FDFAFA" class="RenkGosterim" />
                            </span>
                        </div>

                        <div class="RenkSecimDiv">
                            <div class="farbtastic" id="Renk3"></div>
                            <span class="help-block">
                                <div class="farbstatTitle">Üst Parti Font</div>
                                <input type="text" id="Renk3Input" name="Renk3Input" value="#800000" class="RenkGosterim" />
                            </span>
                        </div>

                    </div>

                    <div class="RenkGrup">
                        <div class="RenkAciklama">ORTA KISIM</div>
                        <div class="RenkSecimDiv">
                            <div class="farbtastic" id="Renk2"></div>
                            <span class="help-block">
                                <div class="farbstatTitle">Orta Alan</div>
                                <input type="text" id="Renk2Input" name="Renk2Input" value="#FDFAFA" class="RenkGosterim" />
                            </span>
                        </div>

                        <div class="RenkSecimDiv">
                            <div class="farbtastic" id="Renk6"></div>
                            <span class="help-block">
                                <div class="farbstatTitle">Orta Alan Font</div>
                                <input type="text" id="Renk6Input" name="Renk6Input" value="#800000" class="RenkGosterim" />
                            </span>
                        </div>

                    </div>

                    <div class="RenkGrup">
                        <div class="RenkAciklama">ALT KISIM</div>
                        <div class="RenkSecimDiv">
                            <div class="farbtastic" id="Renk4"></div>
                            <span class="help-block">
                                <div class="farbstatTitle">Alt Parti Zemin</div>
                                <input type="text" id="Renk4Input" name="Renk4Input" value="#FDFAFA" class="RenkGosterim" />
                            </span>
                        </div>

                        <div class="RenkSecimDiv">
                            <div class="farbtastic" id="Renk8"></div>
                            <span class="help-block">
                                <div class="farbstatTitle">Alt Parti Font</div>
                                <input type="text" id="Renk8Input" name="Renk8Input" value="#800000" class="RenkGosterim" />
                            </span>
                        </div>

                        <div class="RenkSecimDiv">
                            <div class="farbtastic" id="Renk5"></div>
                            <span class="help-block">
                                <div class="farbstatTitle">Şehir Alt Zemin</div>
                                <input type="text" id="Renk5Input" name="Renk5Input" value="#FDFAFA" class="RenkGosterim" />
                            </span>
                        </div>

                        <div class="RenkSecimDiv">
                            <div class="farbtastic" id="Renk7"></div>
                            <span class="help-block">
                                <div class="farbstatTitle">Şehir Alt Font</div>
                                <input type="text" id="Renk7Input" name="Renk7Input" value="#800000" class="RenkGosterim" />
                            </span>
                        </div>

                    </div>

                    <%--<div class="RenkGrup">
                        <div class="RenkAciklama">IKONLAR</div>

                        <div class="RenkSecimDiv">
                            <div class="farbtastic" id="Renk9"></div>
                            <span class="help-block">
                                <div class="farbstatTitle">Artış İkonu</div>
                                <input type="text" id="Renk9Input" name="Renk9Input" value="#146039" class="RenkGosterim" />
                            </span>
                        </div>

                        <div class="RenkSecimDiv">
                            <div class="farbtastic" id="Renk10"></div>
                            <span class="help-block">
                                <div class="farbstatTitle">Azalış İkonu</div>
                                <input type="text" id="Renk10Input" name="Renk10Input" value="#FF0000" class="RenkGosterim" />
                            </span>
                        </div>

                        <div class="RenkSecimDiv">
                            <div class="farbtastic" id="Renk11"></div>
                            <span class="help-block">
                                <div class="farbstatTitle">Değişmedi İkonu</div>
                                <input type="text" id="Renk11Input" name="Renk11Input" value="#FFA500" class="RenkGosterim" />
                            </span>
                        </div>

                    </div>--%>
                </div>
            </li>
            <li data-content="ortakisim" style="height: 1100px;">
                <div class="OrtaKisimSecim">
                    <input type="radio" name="radiog_dark1" id="check1" class="css-checkbox" checked="checked" />
                    <label for="check1" class="css-label radGroup2" id="ortateksehircheckbox">TEK ŞEHİR SEÇİM</label>

                    <input type="radio" name="radiog_dark1" id="check2" class="css-checkbox" />
                    <label for="check2" class="css-label radGroup2" id="ortacoktansehircheckbox">ÇOKTAN ŞEHİR SEÇİM</label>
                </div>
                <section id="OrtaCoktanSehir">

                    <div class="TekrarSuresiDiv">
                        <div class="TekrarSuresi">
                            Tekrar Süresi : 
                        </div>

                        <div class="styled-select">
                            <select id="OrtaKisimDonguSure">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                                <option value="60">60</option>
                            </select>
                        </div>
                    </div>

                    <div id="OrtaTumunuAt">
                        <i class="fa fa-caret-square-o-left" id="OrtaTumuAtLeft"></i>
                        <i class="fa fa-caret-square-o-right" id="OrtaTumuAtRight"></i>
                    </div>

                    <div id="OrtaBasliklar">
                        <span>BEKLEYEN ŞEHİRLER</span>
                        <span>GÖSTERİMDEKİ ŞEHİRLER</span>
                    </div>

                    <ul id="OrtaTumListe" class="connected sortable list">
                        <li locationid="1">
                            <div>Adana</div>
                        </li>
                        <li locationid="2">
                            <div>Adıyaman</div>
                        </li>
                        <li locationid="3">
                            <div>Afyonkarahisar</div>
                        </li>
                        <li locationid="68">
                            <div>Aksaray</div>
                        </li>
                        <li locationid="5">
                            <div>Amasya</div>
                        </li>
                        <li locationid="601">
                            <div>Ankara 1. Bölge</div>
                        </li>
                        <li locationid="602">
                            <div>Ankara 2. Bölge</div>
                        </li>
                        <li locationid="7">
                            <div>Antalya</div>
                        </li>
                        <li locationid="75">
                            <div>Ardahan</div>
                        </li>
                        <li locationid="8">
                            <div>Artvin</div>
                        </li>
                        <li locationid="9">
                            <div>Aydın</div>
                        </li>
                        <li locationid="4">
                            <div>Ağrı</div>
                        </li>
                        <li locationid="10">
                            <div>Balıkesir</div>
                        </li>
                        <li locationid="74">
                            <div>Bartın</div>
                        </li>
                        <li locationid="72">
                            <div>Batman</div>
                        </li>
                        <li locationid="69">
                            <div>Bayburt</div>
                        </li>
                        <li locationid="11">
                            <div>Bilecik</div>
                        </li>
                        <li locationid="12">
                            <div>Bingöl</div>
                        </li>
                        <li locationid="13">
                            <div>Bitlis</div>
                        </li>
                        <li locationid="14">
                            <div>Bolu</div>
                        </li>
                        <li locationid="15">
                            <div>Burdur</div>
                        </li>
                        <li locationid="16">
                            <div>Bursa</div>
                        </li>
                        <li locationid="17">
                            <div>Çanakkale</div>
                        </li>
                        <li locationid="18">
                            <div>Çankırı</div>
                        </li>
                        <li locationid="19">
                            <div>Çorum</div>
                        </li>
                        <li locationid="20">
                            <div>Denizli</div>
                        </li>
                        <li locationid="21">
                            <div>Diyarbakır</div>
                        </li>
                        <li locationid="81">
                            <div>Düzce</div>
                        </li>
                        <li locationid="22">
                            <div>Edirne</div>
                        </li>
                        <li locationid="23">
                            <div>Elazığ</div>
                        </li>
                        <li locationid="24">
                            <div>Erzincan</div>
                        </li>
                        <li locationid="25">
                            <div>Erzurum</div>
                        </li>
                        <li locationid="26">
                            <div>Eskişehir</div>
                        </li>
                        <li locationid="27">
                            <div>Gaziantep</div>
                        </li>
                        <li locationid="28">
                            <div>Giresun</div>
                        </li>
                        <li locationid="29">
                            <div>Gümüşhane</div>
                        </li>
                        <li locationid="30">
                            <div>Hakkari</div>
                        </li>
                        <li locationid="31">
                            <div>Hatay</div>
                        </li>
                        <li locationid="32">
                            <div>Isparta</div>
                        </li>
                        <li locationid="76">
                            <div>Iğdır</div>
                        </li>
                        <li locationid="341">
                            <div>İstanbul 1. Bölge</div>
                        </li>
                        <li locationid="342">
                            <div>İstanbul 2. Bölge</div>
                        </li>
                        <li locationid="343">
                            <div>İstanbul 3. Bölge</div>
                        </li>
                        <li locationid="351">
                            <div>İzmir 1. Bölge</div>
                        </li>
                        <li locationid="352">
                            <div>İzmir 2. Bölge</div>
                        </li>
                        <li locationid="46">
                            <div>Kahramanmaraş</div>
                        </li>
                        <li locationid="78">
                            <div>Karabük</div>
                        </li>
                        <li locationid="70">
                            <div>Karaman</div>
                        </li>
                        <li locationid="36">
                            <div>Kars</div>
                        </li>
                        <li locationid="37">
                            <div>Kastamonu</div>
                        </li>
                        <li locationid="38">
                            <div>Kayseri</div>
                        </li>
                        <li locationid="79">
                            <div>Kilis</div>
                        </li>
                        <li locationid="41">
                            <div>Kocaeli</div>
                        </li>
                        <li locationid="42">
                            <div>Konya</div>
                        </li>
                        <li locationid="43">
                            <div>Kütahya</div>
                        </li>
                        <li locationid="39">
                            <div>Kırklareli</div>
                        </li>
                        <li locationid="71">
                            <div>Kırıkkale</div>
                        </li>
                        <li locationid="40">
                            <div>Kırşehir</div>
                        </li>
                        <li locationid="44">
                            <div>Malatya</div>
                        </li>
                        <li locationid="45">
                            <div>Manisa</div>
                        </li>
                        <li locationid="47">
                            <div>Mardin</div>
                        </li>
                        <li locationid="33">
                            <div>Mersin</div>
                        </li>
                        <li locationid="48">
                            <div>Muğla</div>
                        </li>
                        <li locationid="49">
                            <div>Muş</div>
                        </li>
                        <li locationid="50">
                            <div>Nevşehir</div>
                        </li>
                        <li locationid="51">
                            <div>Niğde</div>
                        </li>
                        <li locationid="52">
                            <div>Ordu</div>
                        </li>
                        <li locationid="80">
                            <div>Osmaniye</div>
                        </li>
                        <li locationid="53">
                            <div>Rize</div>
                        </li>
                        <li locationid="54">
                            <div>Sakarya</div>
                        </li>
                        <li locationid="55">
                            <div>Samsun</div>
                        </li>
                        <li locationid="56">
                            <div>Siirt</div>
                        </li>
                        <li locationid="57">
                            <div>Sinop</div>
                        </li>
                        <li locationid="58">
                            <div>Sivas</div>
                        </li>
                        <li locationid="63">
                            <div>Şanlıurfa</div>
                        </li>
                        <li locationid="73">
                            <div>Şırnak</div>
                        </li>
                        <li locationid="59">
                            <div>Tekirdağ</div>
                        </li>
                        <li locationid="60">
                            <div>Tokat</div>
                        </li>
                        <li locationid="61">
                            <div>Trabzon</div>
                        </li>
                        <li locationid="62">
                            <div>Tunceli</div>
                        </li>
                        <li locationid="64">
                            <div>Uşak</div>
                        </li>
                        <li locationid="65">
                            <div>Van</div>
                        </li>
                        <li locationid="77">
                            <div>Yalova</div>
                        </li>
                        <li locationid="66">
                            <div>Yozgat</div>
                        </li>
                        <li locationid="67">
                            <div>Zonguldak</div>
                        </li>
                    </ul>

                    <ul id="OrtaSecilenListe" class="connected sortable list">
                    </ul>
                </section>
                <section id="OrtaTekSehir">

                    <div>
                        <input id="radio-1" teklocationid="1" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-1" teklocationid="1" class="radio-custom-label">Adana</label>
                    </div>
                    <div>
                        <input id="radio-2" teklocationid="2" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-2" teklocationid="2" class="radio-custom-label">Adıyaman</label>
                    </div>
                    <div>
                        <input id="radio-3" teklocationid="3" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-3" teklocationid="3" class="radio-custom-label">Afyonkarahisar</label>
                    </div>
                    <div>
                        <input id="radio-68" teklocationid="68" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-68" teklocationid="68" class="radio-custom-label">Aksaray</label>
                    </div>
                    <div>
                        <input id="radio-5" teklocationid="5" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-5" teklocationid="5" class="radio-custom-label">Amasya</label>
                    </div>
                    <div>
                        <input id="radio-601" teklocationid="601" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-601" teklocationid="601" class="radio-custom-label">Ankara 1. Bölge</label>
                    </div>
                    <div>
                        <input id="radio-602" teklocationid="602" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-602" teklocationid="602" class="radio-custom-label">Ankara 2. Bölge</label>
                    </div>
                    <div>
                        <input id="radio-7" teklocationid="7" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-7" teklocationid="7" class="radio-custom-label">Antalya</label>
                    </div>
                    <div>
                        <input id="radio-75" teklocationid="75" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-75" teklocationid="75" class="radio-custom-label">Ardahan</label>
                    </div>
                    <div>
                        <input id="radio-8" teklocationid="8" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-8" teklocationid="8" class="radio-custom-label">Artvin</label>
                    </div>
                    <div>
                        <input id="radio-9" teklocationid="9" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-9" teklocationid="9" class="radio-custom-label">Aydın</label>
                    </div>
                    <div>
                        <input id="radio-4" teklocationid="4" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-4" teklocationid="4" class="radio-custom-label">Ağrı</label>
                    </div>
                    <div>
                        <input id="radio-10" teklocationid="10" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-10" teklocationid="10" class="radio-custom-label">Balıkesir</label>
                    </div>
                    <div>
                        <input id="radio-74" teklocationid="74" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-74" teklocationid="74" class="radio-custom-label">Bartın</label>
                    </div>
                    <div>
                        <input id="radio-72" teklocationid="72" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-72" teklocationid="72" class="radio-custom-label">Batman</label>
                    </div>
                    <div>
                        <input id="radio-69" teklocationid="69" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-69" teklocationid="69" class="radio-custom-label">Bayburt</label>
                    </div>
                    <div>
                        <input id="radio-11" teklocationid="11" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-11" teklocationid="11" class="radio-custom-label">Bilecik</label>
                    </div>
                    <div>
                        <input id="radio-12" teklocationid="12" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-12" teklocationid="12" class="radio-custom-label">Bingöl</label>
                    </div>
                    <div>
                        <input id="radio-13" teklocationid="13" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-13" teklocationid="13" class="radio-custom-label">Bitlis</label>
                    </div>
                    <div>
                        <input id="radio-14" teklocationid="14" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-14" teklocationid="14" class="radio-custom-label">Bolu</label>
                    </div>
                    <div>
                        <input id="radio-15" teklocationid="15" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-15" teklocationid="15" class="radio-custom-label">Burdur</label>
                    </div>
                    <div>
                        <input id="radio-16" teklocationid="16" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-16" teklocationid="16" class="radio-custom-label">Bursa</label>
                    </div>
                    <div>
                        <input id="radio-17" teklocationid="17" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-17" teklocationid="17" class="radio-custom-label">Çanakkale</label>
                    </div>
                    <div>
                        <input id="radio-18" teklocationid="18" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-18" teklocationid="18" class="radio-custom-label">Çankırı</label>
                    </div>
                    <div>
                        <input id="radio-19" teklocationid="19" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-19" teklocationid="19" class="radio-custom-label">Çorum</label>
                    </div>
                    <div>
                        <input id="radio-20" teklocationid="20" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-20" teklocationid="20" class="radio-custom-label">Denizli</label>
                    </div>
                    <div>
                        <input id="radio-21" teklocationid="21" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-21" teklocationid="21" class="radio-custom-label">Diyarbakır</label>
                    </div>
                    <div>
                        <input id="radio-81" teklocationid="81" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-81" teklocationid="81" class="radio-custom-label">Düzce</label>
                    </div>
                    <div>
                        <input id="radio-22" teklocationid="22" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-22" teklocationid="22" class="radio-custom-label">Edirne</label>
                    </div>
                    <div>
                        <input id="radio-23" teklocationid="23" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-23" teklocationid="23" class="radio-custom-label">Elazığ</label>
                    </div>
                    <div>
                        <input id="radio-24" teklocationid="24" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-24" teklocationid="24" class="radio-custom-label">Erzincan</label>
                    </div>
                    <div>
                        <input id="radio-25" teklocationid="25" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-25" teklocationid="25" class="radio-custom-label">Erzurum</label>
                    </div>
                    <div>
                        <input id="radio-26" teklocationid="26" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-26" teklocationid="26" class="radio-custom-label">Eskişehir</label>
                    </div>
                    <div>
                        <input id="radio-27" teklocationid="27" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-27" teklocationid="27" class="radio-custom-label">Gaziantep</label>
                    </div>
                    <div>
                        <input id="radio-28" teklocationid="28" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-28" teklocationid="28" class="radio-custom-label">Giresun</label>
                    </div>
                    <div>
                        <input id="radio-29" teklocationid="29" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-29" teklocationid="29" class="radio-custom-label">Gümüşhane</label>
                    </div>
                    <div>
                        <input id="radio-30" teklocationid="30" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-30" teklocationid="30" class="radio-custom-label">Hakkari</label>
                    </div>
                    <div>
                        <input id="radio-31" teklocationid="31" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-31" teklocationid="31" class="radio-custom-label">Hatay</label>
                    </div>
                    <div>
                        <input id="radio-32" teklocationid="32" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-32" teklocationid="32" class="radio-custom-label">Isparta</label>
                    </div>
                    <div>
                        <input id="radio-76" teklocationid="76" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-76" teklocationid="76" class="radio-custom-label">Iğdır</label>
                    </div>
                    <div>
                        <input id="radio-341" teklocationid="341" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-341" teklocationid="341" class="radio-custom-label">İstanbul 1. Bölge</label>
                    </div>
                    <div>
                        <input id="radio-342" teklocationid="342" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-342" teklocationid="342" class="radio-custom-label">İstanbul 2. Bölge</label>
                    </div>
                    <div>
                        <input id="radio-343" teklocationid="343" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-343" teklocationid="343" class="radio-custom-label">İstanbul 3. Bölge</label>
                    </div>
                    <div>
                        <input id="radio-351" teklocationid="351" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-351" teklocationid="351" class="radio-custom-label">İzmir 1. Bölge</label>
                    </div>
                    <div>
                        <input id="radio-352" teklocationid="352" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-352" teklocationid="352" class="radio-custom-label">İzmir 2. Bölge</label>
                    </div>
                    <div>
                        <input id="radio-46" teklocationid="46" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-46" teklocationid="46" class="radio-custom-label">Kahramanmaraş</label>
                    </div>
                    <div>
                        <input id="radio-78" teklocationid="78" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-78" teklocationid="78" class="radio-custom-label">Karabük</label>
                    </div>
                    <div>
                        <input id="radio-70" teklocationid="70" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-70" teklocationid="70" class="radio-custom-label">Karaman</label>
                    </div>
                    <div>
                        <input id="radio-36" teklocationid="36" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-36" teklocationid="36" class="radio-custom-label">Kars</label>
                    </div>
                    <div>
                        <input id="radio-37" teklocationid="37" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-37" teklocationid="37" class="radio-custom-label">Kastamonu</label>
                    </div>
                    <div>
                        <input id="radio-38" teklocationid="38" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-38" teklocationid="38" class="radio-custom-label">Kayseri</label>
                    </div>
                    <div>
                        <input id="radio-79" teklocationid="79" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-79" teklocationid="79" class="radio-custom-label">Kilis</label>
                    </div>
                    <div>
                        <input id="radio-41" teklocationid="41" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-41" teklocationid="41" class="radio-custom-label">Kocaeli</label>
                    </div>
                    <div>
                        <input id="radio-42" teklocationid="42" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-42" teklocationid="42" class="radio-custom-label">Konya</label>
                    </div>
                    <div>
                        <input id="radio-43" teklocationid="43" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-43" teklocationid="43" class="radio-custom-label">Kütahya</label>
                    </div>
                    <div>
                        <input id="radio-39" teklocationid="39" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-39" teklocationid="39" class="radio-custom-label">Kırklareli</label>
                    </div>
                    <div>
                        <input id="radio-71" teklocationid="71" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-71" teklocationid="71" class="radio-custom-label">Kırıkkale</label>
                    </div>
                    <div>
                        <input id="radio-40" teklocationid="40" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-40" teklocationid="40" class="radio-custom-label">Kırşehir</label>
                    </div>
                    <div>
                        <input id="radio-44" teklocationid="44" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-44" teklocationid="44" class="radio-custom-label">Malatya</label>
                    </div>
                    <div>
                        <input id="radio-45" teklocationid="45" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-45" teklocationid="45" class="radio-custom-label">Manisa</label>
                    </div>
                    <div>
                        <input id="radio-47" teklocationid="47" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-47" teklocationid="47" class="radio-custom-label">Mardin</label>
                    </div>
                    <div>
                        <input id="radio-33" teklocationid="33" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-33" teklocationid="33" class="radio-custom-label">Mersin</label>
                    </div>
                    <div>
                        <input id="radio-48" teklocationid="48" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-48" teklocationid="48" class="radio-custom-label">Muğla</label>
                    </div>
                    <div>
                        <input id="radio-49" teklocationid="49" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-49" teklocationid="49" class="radio-custom-label">Muş</label>
                    </div>
                    <div>
                        <input id="radio-50" teklocationid="50" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-50" teklocationid="50" class="radio-custom-label">Nevşehir</label>
                    </div>
                    <div>
                        <input id="radio-51" teklocationid="51" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-51" teklocationid="51" class="radio-custom-label">Niğde</label>
                    </div>
                    <div>
                        <input id="radio-52" teklocationid="52" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-52" teklocationid="52" class="radio-custom-label">Ordu</label>
                    </div>
                    <div>
                        <input id="radio-80" teklocationid="80" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-80" teklocationid="80" class="radio-custom-label">Osmaniye</label>
                    </div>
                    <div>
                        <input id="radio-53" teklocationid="53" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-53" teklocationid="53" class="radio-custom-label">Rize</label>
                    </div>
                    <div>
                        <input id="radio-54" teklocationid="54" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-54" teklocationid="54" class="radio-custom-label">Sakarya</label>
                    </div>
                    <div>
                        <input id="radio-55" teklocationid="55" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-55" teklocationid="55" class="radio-custom-label">Samsun</label>
                    </div>
                    <div>
                        <input id="radio-56" teklocationid="56" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-56" teklocationid="56" class="radio-custom-label">Siirt</label>
                    </div>
                    <div>
                        <input id="radio-57" teklocationid="57" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-57" teklocationid="57" class="radio-custom-label">Sinop</label>
                    </div>
                    <div>
                        <input id="radio-58" teklocationid="58" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-58" teklocationid="58" class="radio-custom-label">Sivas</label>
                    </div>
                    <div>
                        <input id="radio-63" teklocationid="63" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-63" teklocationid="63" class="radio-custom-label">Şanlıurfa</label>
                    </div>
                    <div>
                        <input id="radio-73" teklocationid="73" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-73" teklocationid="73" class="radio-custom-label">Şırnak</label>
                    </div>
                    <div>
                        <input id="radio-59" teklocationid="59" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-59" teklocationid="59" class="radio-custom-label">Tekirdağ</label>
                    </div>
                    <div>
                        <input id="radio-60" teklocationid="60" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-60" teklocationid="60" class="radio-custom-label">Tokat</label>
                    </div>
                    <div>
                        <input id="radio-61" teklocationid="61" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-61" teklocationid="61" class="radio-custom-label">Trabzon</label>
                    </div>
                    <div>
                        <input id="radio-62" teklocationid="62" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-62" teklocationid="62" class="radio-custom-label">Tunceli</label>
                    </div>
                    <div>
                        <input id="radio-64" teklocationid="64" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-64" teklocationid="64" class="radio-custom-label">Uşak</label>
                    </div>
                    <div>
                        <input id="radio-65" teklocationid="65" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-65" teklocationid="65" class="radio-custom-label">Van</label>
                    </div>
                    <div>
                        <input id="radio-77" teklocationid="77" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-77" teklocationid="77" class="radio-custom-label">Yalova</label>
                    </div>
                    <div>
                        <input id="radio-66" teklocationid="66" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-66" teklocationid="66" class="radio-custom-label">Yozgat</label>
                    </div>
                    <div>
                        <input id="radio-67" teklocationid="67" class="radio-custom" name="orta-radio-group" type="radio" />
                        <label for="radio-67" teklocationid="67" class="radio-custom-label">Zonguldak</label>
                    </div>
                </section>
            </li>
            <li data-content="turkiyeharitasi" style="height: 500px;">
                <div class="SecimNot">
                    Türkiye haritası, seçeceğiniz partinin şehirlerde almış olduğu oy oranlarına göre renklendirilecektir. 
                </div>
                <div>
                    <div class="skin skin-flat">
                        <dl class="clear">
                            <dd class="selected">
                                <div class="skin-section">
                                    <ul class="list" id="TurkiyeYogunlukUL">
                                        <li deger="0">
                                            <input type="radio" name="flat-radio2" id="parti_0" />
                                            <label for="parti_0">
                                                <img src="images/turkey2.png" />
                                            </label>
                                        </li>
                                        <li deger="1">
                                            <input type="radio" name="flat-radio2" id="parti_1" />
                                            <label for="parti_1">
                                                <img src="images/logo1.png" />
                                            </label>
                                        </li>
                                        <li deger="2">
                                            <input type="radio" name="flat-radio2" id="parti_2" />
                                            <label for="parti_2">
                                                <img src="images/logo2.png" />
                                            </label>
                                        </li>
                                        <li deger="3">
                                            <input type="radio" name="flat-radio2" id="parti_3" />
                                            <label for="parti_3">
                                                <img src="images/logo3.png" />
                                            </label>
                                        </li>
                                        <li deger="4">
                                            <input type="radio" name="flat-radio2" id="parti_4" />
                                            <label for="parti_4">
                                                <img src="images/logo4.png" />
                                            </label>
                                        </li>
                                        <li deger="5">
                                            <input type="radio" name="flat-radio2" id="parti_5" />
                                            <label for="parti_5">
                                                <img src="images/logo5.png" />
                                            </label>
                                        </li>
                                        <li deger="6">
                                            <input type="radio" name="flat-radio2" id="parti_6" />
                                            <label for="parti_6">
                                                <img src="images/logo6.png" />
                                            </label>
                                        </li>
                                        <li deger="7">
                                            <input type="radio" name="flat-radio2" id="parti_7" />
                                            <label for="parti_7">
                                                <img src="images/logo7.png" />
                                            </label>
                                        </li>
                                        <li deger="8">
                                            <input type="radio" name="flat-radio2" id="parti_8" />
                                            <label for="parti_8">
                                                <img src="images/logo8.png" />
                                            </label>
                                        </li>
                                        <li deger="9">
                                            <input type="radio" name="flat-radio2" id="parti_9" />
                                            <label for="parti_9">
                                                <img src="images/logo9.png" />
                                            </label>
                                        </li>
                                        <li deger="10">
                                            <input type="radio" name="flat-radio2" id="parti_10" />
                                            <label for="parti_10">
                                                <img src="images/logo10.png" />
                                            </label>
                                        </li>
                                        <li deger="11">
                                            <input type="radio" name="flat-radio2" id="parti_11" />
                                            <label for="parti_11">
                                                <img src="images/logo11.png" />
                                            </label>
                                        </li>
                                        <li deger="12">
                                            <input type="radio" name="flat-radio2" id="parti_12" />
                                            <label for="parti_12">
                                                <img src="images/logo12.png" />
                                            </label>
                                        </li>
                                        <li deger="13">
                                            <input type="radio" name="flat-radio2" id="parti_13" />
                                            <label for="parti_13">
                                                <img src="images/logo13.png" />
                                            </label>
                                        </li>
                                        <li deger="14">
                                            <input type="radio" name="flat-radio2" id="parti_14" />
                                            <label for="parti_14">
                                                <img src="images/logo14.png" />
                                            </label>
                                        </li>
                                        <li deger="15">
                                            <input type="radio" name="flat-radio2" id="parti_15" />
                                            <label for="parti_15">
                                                <img src="images/logo15.png" />
                                            </label>
                                        </li>
                                        <li deger="16">
                                            <input type="radio" name="flat-radio2" id="parti_16" />
                                            <label for="parti_16">
                                                <img src="images/logo16.png" />
                                            </label>
                                        </li>
                                        <li deger="17">
                                            <input type="radio" name="flat-radio2" id="parti_17" />
                                            <label for="parti_17">
                                                <img src="images/logo17.png" />
                                            </label>
                                        </li>
                                        <li deger="18">
                                            <input type="radio" name="flat-radio2" id="parti_18" />
                                            <label for="parti_18">
                                                <img src="images/logo18.png" />
                                            </label>
                                        </li>
                                        <li deger="19">
                                            <input type="radio" name="flat-radio2" id="parti_19" />
                                            <label for="parti_19">
                                                <img src="images/logo19.png" />
                                            </label>
                                        </li>
                                        <li deger="20">
                                            <input type="radio" name="flat-radio2" id="parti_20" />
                                            <label for="parti_20">
                                                <img src="images/logo20.png" />
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </li>
            <li data-content="sehirlerharitasi" style="height: 1000px;">
                <section id="SehirTekSehir">

                    <div>
                        <input id="Sehir-radio-1" teklocationid="1" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-1" teklocationid="1" class="radio-custom-label">Adana</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-2" teklocationid="2" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-2" teklocationid="2" class="radio-custom-label">Adıyaman</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-3" teklocationid="3" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-3" teklocationid="3" class="radio-custom-label">Afyonkarahisar</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-68" teklocationid="68" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-68" teklocationid="68" class="radio-custom-label">Aksaray</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-5" teklocationid="5" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-5" teklocationid="5" class="radio-custom-label">Amasya</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-601" teklocationid="601" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-601" teklocationid="601" class="radio-custom-label">Ankara 1. Bölge</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-602" teklocationid="602" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-602" teklocationid="602" class="radio-custom-label">Ankara 2. Bölge</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-7" teklocationid="7" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-7" teklocationid="7" class="radio-custom-label">Antalya</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-75" teklocationid="75" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-75" teklocationid="75" class="radio-custom-label">Ardahan</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-8" teklocationid="8" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-8" teklocationid="8" class="radio-custom-label">Artvin</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-9" teklocationid="9" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-9" teklocationid="9" class="radio-custom-label">Aydın</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-4" teklocationid="4" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-4" teklocationid="4" class="radio-custom-label">Ağrı</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-10" teklocationid="10" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-10" teklocationid="10" class="radio-custom-label">Balıkesir</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-74" teklocationid="74" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-74" teklocationid="74" class="radio-custom-label">Bartın</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-72" teklocationid="72" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-72" teklocationid="72" class="radio-custom-label">Batman</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-69" teklocationid="69" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-69" teklocationid="69" class="radio-custom-label">Bayburt</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-11" teklocationid="11" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-11" teklocationid="11" class="radio-custom-label">Bilecik</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-12" teklocationid="12" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-12" teklocationid="12" class="radio-custom-label">Bingöl</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-13" teklocationid="13" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-13" teklocationid="13" class="radio-custom-label">Bitlis</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-14" teklocationid="14" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-14" teklocationid="14" class="radio-custom-label">Bolu</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-15" teklocationid="15" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-15" teklocationid="15" class="radio-custom-label">Burdur</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-16" teklocationid="16" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-16" teklocationid="16" class="radio-custom-label">Bursa</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-17" teklocationid="17" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-17" teklocationid="17" class="radio-custom-label">Çanakkale</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-18" teklocationid="18" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-18" teklocationid="18" class="radio-custom-label">Çankırı</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-19" teklocationid="19" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-19" teklocationid="19" class="radio-custom-label">Çorum</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-20" teklocationid="20" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-20" teklocationid="20" class="radio-custom-label">Denizli</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-21" teklocationid="21" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-21" teklocationid="21" class="radio-custom-label">Diyarbakır</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-81" teklocationid="81" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-81" teklocationid="81" class="radio-custom-label">Düzce</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-22" teklocationid="22" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-22" teklocationid="22" class="radio-custom-label">Edirne</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-23" teklocationid="23" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-23" teklocationid="23" class="radio-custom-label">Elazığ</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-24" teklocationid="24" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-24" teklocationid="24" class="radio-custom-label">Erzincan</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-25" teklocationid="25" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-25" teklocationid="25" class="radio-custom-label">Erzurum</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-26" teklocationid="26" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-26" teklocationid="26" class="radio-custom-label">Eskişehir</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-27" teklocationid="27" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-27" teklocationid="27" class="radio-custom-label">Gaziantep</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-28" teklocationid="28" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-28" teklocationid="28" class="radio-custom-label">Giresun</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-29" teklocationid="29" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-29" teklocationid="29" class="radio-custom-label">Gümüşhane</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-30" teklocationid="30" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-30" teklocationid="30" class="radio-custom-label">Hakkari</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-31" teklocationid="31" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-31" teklocationid="31" class="radio-custom-label">Hatay</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-32" teklocationid="32" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-32" teklocationid="32" class="radio-custom-label">Isparta</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-76" teklocationid="76" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-76" teklocationid="76" class="radio-custom-label">Iğdır</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-341" teklocationid="341" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-341" teklocationid="341" class="radio-custom-label">İstanbul 1. Bölge</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-342" teklocationid="342" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-342" teklocationid="342" class="radio-custom-label">İstanbul 2. Bölge</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-343" teklocationid="343" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-343" teklocationid="343" class="radio-custom-label">İstanbul 3. Bölge</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-351" teklocationid="351" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-351" teklocationid="351" class="radio-custom-label">İzmir 1. Bölge</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-352" teklocationid="352" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-352" teklocationid="352" class="radio-custom-label">İzmir 2. Bölge</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-46" teklocationid="46" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-46" teklocationid="46" class="radio-custom-label">Kahramanmaraş</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-78" teklocationid="78" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-78" teklocationid="78" class="radio-custom-label">Karabük</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-70" teklocationid="70" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-70" teklocationid="70" class="radio-custom-label">Karaman</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-36" teklocationid="36" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-36" teklocationid="36" class="radio-custom-label">Kars</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-37" teklocationid="37" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-37" teklocationid="37" class="radio-custom-label">Kastamonu</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-38" teklocationid="38" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-38" teklocationid="38" class="radio-custom-label">Kayseri</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-79" teklocationid="79" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-79" teklocationid="79" class="radio-custom-label">Kilis</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-41" teklocationid="41" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-41" teklocationid="41" class="radio-custom-label">Kocaeli</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-42" teklocationid="42" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-42" teklocationid="42" class="radio-custom-label">Konya</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-43" teklocationid="43" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-43" teklocationid="43" class="radio-custom-label">Kütahya</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-39" teklocationid="39" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-39" teklocationid="39" class="radio-custom-label">Kırklareli</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-71" teklocationid="71" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-71" teklocationid="71" class="radio-custom-label">Kırıkkale</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-40" teklocationid="40" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-40" teklocationid="40" class="radio-custom-label">Kırşehir</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-44" teklocationid="44" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-44" teklocationid="44" class="radio-custom-label">Malatya</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-45" teklocationid="45" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-45" teklocationid="45" class="radio-custom-label">Manisa</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-47" teklocationid="47" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-47" teklocationid="47" class="radio-custom-label">Mardin</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-33" teklocationid="33" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-33" teklocationid="33" class="radio-custom-label">Mersin</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-48" teklocationid="48" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-48" teklocationid="48" class="radio-custom-label">Muğla</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-49" teklocationid="49" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-49" teklocationid="49" class="radio-custom-label">Muş</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-50" teklocationid="50" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-50" teklocationid="50" class="radio-custom-label">Nevşehir</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-51" teklocationid="51" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-51" teklocationid="51" class="radio-custom-label">Niğde</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-52" teklocationid="52" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-52" teklocationid="52" class="radio-custom-label">Ordu</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-80" teklocationid="80" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-80" teklocationid="80" class="radio-custom-label">Osmaniye</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-53" teklocationid="53" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-53" teklocationid="53" class="radio-custom-label">Rize</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-54" teklocationid="54" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-54" teklocationid="54" class="radio-custom-label">Sakarya</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-55" teklocationid="55" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-55" teklocationid="55" class="radio-custom-label">Samsun</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-56" teklocationid="56" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-56" teklocationid="56" class="radio-custom-label">Siirt</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-57" teklocationid="57" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-57" teklocationid="57" class="radio-custom-label">Sinop</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-58" teklocationid="58" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-58" teklocationid="58" class="radio-custom-label">Sivas</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-63" teklocationid="63" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-63" teklocationid="63" class="radio-custom-label">Şanlıurfa</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-73" teklocationid="73" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-73" teklocationid="73" class="radio-custom-label">Şırnak</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-59" teklocationid="59" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-59" teklocationid="59" class="radio-custom-label">Tekirdağ</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-60" teklocationid="60" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-60" teklocationid="60" class="radio-custom-label">Tokat</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-61" teklocationid="61" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-61" teklocationid="61" class="radio-custom-label">Trabzon</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-62" teklocationid="62" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-62" teklocationid="62" class="radio-custom-label">Tunceli</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-64" teklocationid="64" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-64" teklocationid="64" class="radio-custom-label">Uşak</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-65" teklocationid="65" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-65" teklocationid="65" class="radio-custom-label">Van</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-77" teklocationid="77" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-77" teklocationid="77" class="radio-custom-label">Yalova</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-66" teklocationid="66" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-66" teklocationid="66" class="radio-custom-label">Yozgat</label>
                    </div>
                    <div>
                        <input id="Sehir-radio-67" teklocationid="67" class="radio-custom" name="sehir-radio-group" type="radio" />
                        <label for="Sehir-radio-67" teklocationid="67" class="radio-custom-label">Zonguldak</label>
                    </div>
                </section>
            </li>
            <li data-content="grafik" style="height: 1100px;">
                <div class="GrafikKisimSecim">
                    <input type="radio" name="radiog_dark2" id="check3" class="css-checkbox" checked="checked" />
                    <label for="check3" class="css-label radGroup2" id="grafikteksehircheckbox">TEK ŞEHİR SEÇİM</label>

                    <input type="radio" name="radiog_dark2" id="check4" class="css-checkbox" />
                    <label for="check4" class="css-label radGroup2" id="grafikcoktansehircheckbox">ÇOKTAN ŞEHİR SEÇİM</label>
                </div>
                <section id="GrafikCoktanSehir">

                    <div class="TekrarSuresiDiv">
                        <div class="TekrarSuresi">
                            Tekrar Süresi : 
                        </div>

                        <div class="styled-select">
                            <select id="GrafikKisimDonguSure">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                                <option value="60">60</option>
                            </select>
                        </div>
                    </div>

                    <div id="GrafikTumunuAt">
                        <i class="fa fa-caret-square-o-left" id="GrafikTumuAtLeft"></i>
                        <i class="fa fa-caret-square-o-right" id="GrafikTumuAtRight"></i>
                    </div>

                    <div id="GrafikBasliklar">
                        <span>BEKLEYEN ŞEHİRLER</span>
                        <span>GÖSTERİMDEKİ ŞEHİRLER</span>
                    </div>

                    <ul id="GrafikTumListe" class="connected sortable list">
                        <li locationid="1">
                            <div>Adana</div>
                        </li>
                        <li locationid="2">
                            <div>Adıyaman</div>
                        </li>
                        <li locationid="3">
                            <div>Afyonkarahisar</div>
                        </li>
                        <li locationid="68">
                            <div>Aksaray</div>
                        </li>
                        <li locationid="5">
                            <div>Amasya</div>
                        </li>
                        <li locationid="601">
                            <div>Ankara 1. Bölge</div>
                        </li>
                        <li locationid="602">
                            <div>Ankara 2. Bölge</div>
                        </li>
                        <li locationid="7">
                            <div>Antalya</div>
                        </li>
                        <li locationid="75">
                            <div>Ardahan</div>
                        </li>
                        <li locationid="8">
                            <div>Artvin</div>
                        </li>
                        <li locationid="9">
                            <div>Aydın</div>
                        </li>
                        <li locationid="4">
                            <div>Ağrı</div>
                        </li>
                        <li locationid="10">
                            <div>Balıkesir</div>
                        </li>
                        <li locationid="74">
                            <div>Bartın</div>
                        </li>
                        <li locationid="72">
                            <div>Batman</div>
                        </li>
                        <li locationid="69">
                            <div>Bayburt</div>
                        </li>
                        <li locationid="11">
                            <div>Bilecik</div>
                        </li>
                        <li locationid="12">
                            <div>Bingöl</div>
                        </li>
                        <li locationid="13">
                            <div>Bitlis</div>
                        </li>
                        <li locationid="14">
                            <div>Bolu</div>
                        </li>
                        <li locationid="15">
                            <div>Burdur</div>
                        </li>
                        <li locationid="16">
                            <div>Bursa</div>
                        </li>
                        <li locationid="17">
                            <div>Çanakkale</div>
                        </li>
                        <li locationid="18">
                            <div>Çankırı</div>
                        </li>
                        <li locationid="19">
                            <div>Çorum</div>
                        </li>
                        <li locationid="20">
                            <div>Denizli</div>
                        </li>
                        <li locationid="21">
                            <div>Diyarbakır</div>
                        </li>
                        <li locationid="81">
                            <div>Düzce</div>
                        </li>
                        <li locationid="22">
                            <div>Edirne</div>
                        </li>
                        <li locationid="23">
                            <div>Elazığ</div>
                        </li>
                        <li locationid="24">
                            <div>Erzincan</div>
                        </li>
                        <li locationid="25">
                            <div>Erzurum</div>
                        </li>
                        <li locationid="26">
                            <div>Eskişehir</div>
                        </li>
                        <li locationid="27">
                            <div>Gaziantep</div>
                        </li>
                        <li locationid="28">
                            <div>Giresun</div>
                        </li>
                        <li locationid="29">
                            <div>Gümüşhane</div>
                        </li>
                        <li locationid="30">
                            <div>Hakkari</div>
                        </li>
                        <li locationid="31">
                            <div>Hatay</div>
                        </li>
                        <li locationid="32">
                            <div>Isparta</div>
                        </li>
                        <li locationid="76">
                            <div>Iğdır</div>
                        </li>
                        <li locationid="341">
                            <div>İstanbul 1. Bölge</div>
                        </li>
                        <li locationid="342">
                            <div>İstanbul 2. Bölge</div>
                        </li>
                        <li locationid="343">
                            <div>İstanbul 3. Bölge</div>
                        </li>
                        <li locationid="351">
                            <div>İzmir 1. Bölge</div>
                        </li>
                        <li locationid="352">
                            <div>İzmir 2. Bölge</div>
                        </li>
                        <li locationid="46">
                            <div>Kahramanmaraş</div>
                        </li>
                        <li locationid="78">
                            <div>Karabük</div>
                        </li>
                        <li locationid="70">
                            <div>Karaman</div>
                        </li>
                        <li locationid="36">
                            <div>Kars</div>
                        </li>
                        <li locationid="37">
                            <div>Kastamonu</div>
                        </li>
                        <li locationid="38">
                            <div>Kayseri</div>
                        </li>
                        <li locationid="79">
                            <div>Kilis</div>
                        </li>
                        <li locationid="41">
                            <div>Kocaeli</div>
                        </li>
                        <li locationid="42">
                            <div>Konya</div>
                        </li>
                        <li locationid="43">
                            <div>Kütahya</div>
                        </li>
                        <li locationid="39">
                            <div>Kırklareli</div>
                        </li>
                        <li locationid="71">
                            <div>Kırıkkale</div>
                        </li>
                        <li locationid="40">
                            <div>Kırşehir</div>
                        </li>
                        <li locationid="44">
                            <div>Malatya</div>
                        </li>
                        <li locationid="45">
                            <div>Manisa</div>
                        </li>
                        <li locationid="47">
                            <div>Mardin</div>
                        </li>
                        <li locationid="33">
                            <div>Mersin</div>
                        </li>
                        <li locationid="48">
                            <div>Muğla</div>
                        </li>
                        <li locationid="49">
                            <div>Muş</div>
                        </li>
                        <li locationid="50">
                            <div>Nevşehir</div>
                        </li>
                        <li locationid="51">
                            <div>Niğde</div>
                        </li>
                        <li locationid="52">
                            <div>Ordu</div>
                        </li>
                        <li locationid="80">
                            <div>Osmaniye</div>
                        </li>
                        <li locationid="53">
                            <div>Rize</div>
                        </li>
                        <li locationid="54">
                            <div>Sakarya</div>
                        </li>
                        <li locationid="55">
                            <div>Samsun</div>
                        </li>
                        <li locationid="56">
                            <div>Siirt</div>
                        </li>
                        <li locationid="57">
                            <div>Sinop</div>
                        </li>
                        <li locationid="58">
                            <div>Sivas</div>
                        </li>
                        <li locationid="63">
                            <div>Şanlıurfa</div>
                        </li>
                        <li locationid="73">
                            <div>Şırnak</div>
                        </li>
                        <li locationid="59">
                            <div>Tekirdağ</div>
                        </li>
                        <li locationid="60">
                            <div>Tokat</div>
                        </li>
                        <li locationid="61">
                            <div>Trabzon</div>
                        </li>
                        <li locationid="62">
                            <div>Tunceli</div>
                        </li>
                        <li locationid="64">
                            <div>Uşak</div>
                        </li>
                        <li locationid="65">
                            <div>Van</div>
                        </li>
                        <li locationid="77">
                            <div>Yalova</div>
                        </li>
                        <li locationid="66">
                            <div>Yozgat</div>
                        </li>
                        <li locationid="67">
                            <div>Zonguldak</div>
                        </li>
                    </ul>

                    <ul id="GrafikSecilenListe" class="connected sortable list">
                    </ul>

                </section>
                <section id="GrafikTekSehir">

                    <div>
                        <input id="grafik-radio-1" teklocationid="1" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-1" teklocationid="1" class="radio-custom-label">Adana</label>
                    </div>
                    <div>
                        <input id="grafik-radio-2" teklocationid="2" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-2" teklocationid="2" class="radio-custom-label">Adıyaman</label>
                    </div>
                    <div>
                        <input id="grafik-radio-3" teklocationid="3" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-3" teklocationid="3" class="radio-custom-label">Afyonkarahisar</label>
                    </div>
                    <div>
                        <input id="grafik-radio-68" teklocationid="68" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-68" teklocationid="68" class="radio-custom-label">Aksaray</label>
                    </div>
                    <div>
                        <input id="grafik-radio-5" teklocationid="5" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-5" teklocationid="5" class="radio-custom-label">Amasya</label>
                    </div>
                    <div>
                        <input id="grafik-radio-601" teklocationid="601" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-601" teklocationid="601" class="radio-custom-label">Ankara 1. Bölge</label>
                    </div>
                    <div>
                        <input id="grafik-radio-602" teklocationid="602" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-602" teklocationid="602" class="radio-custom-label">Ankara 2. Bölge</label>
                    </div>
                    <div>
                        <input id="grafik-radio-7" teklocationid="7" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-7" teklocationid="7" class="radio-custom-label">Antalya</label>
                    </div>
                    <div>
                        <input id="grafik-radio-75" teklocationid="75" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-75" teklocationid="75" class="radio-custom-label">Ardahan</label>
                    </div>
                    <div>
                        <input id="grafik-radio-8" teklocationid="8" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-8" teklocationid="8" class="radio-custom-label">Artvin</label>
                    </div>
                    <div>
                        <input id="grafik-radio-9" teklocationid="9" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-9" teklocationid="9" class="radio-custom-label">Aydın</label>
                    </div>
                    <div>
                        <input id="grafik-radio-4" teklocationid="4" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-4" teklocationid="4" class="radio-custom-label">Ağrı</label>
                    </div>
                    <div>
                        <input id="grafik-radio-10" teklocationid="10" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-10" teklocationid="10" class="radio-custom-label">Balıkesir</label>
                    </div>
                    <div>
                        <input id="grafik-radio-74" teklocationid="74" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-74" teklocationid="74" class="radio-custom-label">Bartın</label>
                    </div>
                    <div>
                        <input id="grafik-radio-72" teklocationid="72" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-72" teklocationid="72" class="radio-custom-label">Batman</label>
                    </div>
                    <div>
                        <input id="grafik-radio-69" teklocationid="69" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-69" teklocationid="69" class="radio-custom-label">Bayburt</label>
                    </div>
                    <div>
                        <input id="grafik-radio-11" teklocationid="11" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-11" teklocationid="11" class="radio-custom-label">Bilecik</label>
                    </div>
                    <div>
                        <input id="grafik-radio-12" teklocationid="12" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-12" teklocationid="12" class="radio-custom-label">Bingöl</label>
                    </div>
                    <div>
                        <input id="grafik-radio-13" teklocationid="13" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-13" teklocationid="13" class="radio-custom-label">Bitlis</label>
                    </div>
                    <div>
                        <input id="grafik-radio-14" teklocationid="14" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-14" teklocationid="14" class="radio-custom-label">Bolu</label>
                    </div>
                    <div>
                        <input id="grafik-radio-15" teklocationid="15" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-15" teklocationid="15" class="radio-custom-label">Burdur</label>
                    </div>
                    <div>
                        <input id="grafik-radio-16" teklocationid="16" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-16" teklocationid="16" class="radio-custom-label">Bursa</label>
                    </div>
                    <div>
                        <input id="grafik-radio-17" teklocationid="17" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-17" teklocationid="17" class="radio-custom-label">Çanakkale</label>
                    </div>
                    <div>
                        <input id="grafik-radio-18" teklocationid="18" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-18" teklocationid="18" class="radio-custom-label">Çankırı</label>
                    </div>
                    <div>
                        <input id="grafik-radio-19" teklocationid="19" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-19" teklocationid="19" class="radio-custom-label">Çorum</label>
                    </div>
                    <div>
                        <input id="grafik-radio-20" teklocationid="20" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-20" teklocationid="20" class="radio-custom-label">Denizli</label>
                    </div>
                    <div>
                        <input id="grafik-radio-21" teklocationid="21" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-21" teklocationid="21" class="radio-custom-label">Diyarbakır</label>
                    </div>
                    <div>
                        <input id="grafik-radio-81" teklocationid="81" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-81" teklocationid="81" class="radio-custom-label">Düzce</label>
                    </div>
                    <div>
                        <input id="grafik-radio-22" teklocationid="22" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-22" teklocationid="22" class="radio-custom-label">Edirne</label>
                    </div>
                    <div>
                        <input id="grafik-radio-23" teklocationid="23" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-23" teklocationid="23" class="radio-custom-label">Elazığ</label>
                    </div>
                    <div>
                        <input id="grafik-radio-24" teklocationid="24" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-24" teklocationid="24" class="radio-custom-label">Erzincan</label>
                    </div>
                    <div>
                        <input id="grafik-radio-25" teklocationid="25" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-25" teklocationid="25" class="radio-custom-label">Erzurum</label>
                    </div>
                    <div>
                        <input id="grafik-radio-26" teklocationid="26" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-26" teklocationid="26" class="radio-custom-label">Eskişehir</label>
                    </div>
                    <div>
                        <input id="grafik-radio-27" teklocationid="27" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-27" teklocationid="27" class="radio-custom-label">Gaziantep</label>
                    </div>
                    <div>
                        <input id="grafik-radio-28" teklocationid="28" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-28" teklocationid="28" class="radio-custom-label">Giresun</label>
                    </div>
                    <div>
                        <input id="grafik-radio-29" teklocationid="29" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-29" teklocationid="29" class="radio-custom-label">Gümüşhane</label>
                    </div>
                    <div>
                        <input id="grafik-radio-30" teklocationid="30" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-30" teklocationid="30" class="radio-custom-label">Hakkari</label>
                    </div>
                    <div>
                        <input id="grafik-radio-31" teklocationid="31" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-31" teklocationid="31" class="radio-custom-label">Hatay</label>
                    </div>
                    <div>
                        <input id="grafik-radio-32" teklocationid="32" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-32" teklocationid="32" class="radio-custom-label">Isparta</label>
                    </div>
                    <div>
                        <input id="grafik-radio-76" teklocationid="76" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-76" teklocationid="76" class="radio-custom-label">Iğdır</label>
                    </div>
                    <div>
                        <input id="grafik-radio-341" teklocationid="341" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-341" teklocationid="341" class="radio-custom-label">İstanbul 1. Bölge</label>
                    </div>
                    <div>
                        <input id="grafik-radio-342" teklocationid="342" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-342" teklocationid="342" class="radio-custom-label">İstanbul 2. Bölge</label>
                    </div>
                    <div>
                        <input id="grafik-radio-343" teklocationid="343" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-343" teklocationid="343" class="radio-custom-label">İstanbul 3. Bölge</label>
                    </div>
                    <div>
                        <input id="grafik-radio-351" teklocationid="351" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-351" teklocationid="351" class="radio-custom-label">İzmir 1. Bölge</label>
                    </div>
                    <div>
                        <input id="grafik-radio-352" teklocationid="352" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-352" teklocationid="352" class="radio-custom-label">İzmir 2. Bölge</label>
                    </div>
                    <div>
                        <input id="grafik-radio-46" teklocationid="46" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-46" teklocationid="46" class="radio-custom-label">Kahramanmaraş</label>
                    </div>
                    <div>
                        <input id="grafik-radio-78" teklocationid="78" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-78" teklocationid="78" class="radio-custom-label">Karabük</label>
                    </div>
                    <div>
                        <input id="grafik-radio-70" teklocationid="70" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-70" teklocationid="70" class="radio-custom-label">Karaman</label>
                    </div>
                    <div>
                        <input id="grafik-radio-36" teklocationid="36" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-36" teklocationid="36" class="radio-custom-label">Kars</label>
                    </div>
                    <div>
                        <input id="grafik-radio-37" teklocationid="37" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-37" teklocationid="37" class="radio-custom-label">Kastamonu</label>
                    </div>
                    <div>
                        <input id="grafik-radio-38" teklocationid="38" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-38" teklocationid="38" class="radio-custom-label">Kayseri</label>
                    </div>
                    <div>
                        <input id="grafik-radio-79" teklocationid="79" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-79" teklocationid="79" class="radio-custom-label">Kilis</label>
                    </div>
                    <div>
                        <input id="grafik-radio-41" teklocationid="41" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-41" teklocationid="41" class="radio-custom-label">Kocaeli</label>
                    </div>
                    <div>
                        <input id="grafik-radio-42" teklocationid="42" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-42" teklocationid="42" class="radio-custom-label">Konya</label>
                    </div>
                    <div>
                        <input id="grafik-radio-43" teklocationid="43" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-43" teklocationid="43" class="radio-custom-label">Kütahya</label>
                    </div>
                    <div>
                        <input id="grafik-radio-39" teklocationid="39" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-39" teklocationid="39" class="radio-custom-label">Kırklareli</label>
                    </div>
                    <div>
                        <input id="grafik-radio-71" teklocationid="71" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-71" teklocationid="71" class="radio-custom-label">Kırıkkale</label>
                    </div>
                    <div>
                        <input id="grafik-radio-40" teklocationid="40" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-40" teklocationid="40" class="radio-custom-label">Kırşehir</label>
                    </div>
                    <div>
                        <input id="grafik-radio-44" teklocationid="44" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-44" teklocationid="44" class="radio-custom-label">Malatya</label>
                    </div>
                    <div>
                        <input id="grafik-radio-45" teklocationid="45" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-45" teklocationid="45" class="radio-custom-label">Manisa</label>
                    </div>
                    <div>
                        <input id="grafik-radio-47" teklocationid="47" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-47" teklocationid="47" class="radio-custom-label">Mardin</label>
                    </div>
                    <div>
                        <input id="grafik-radio-33" teklocationid="33" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-33" teklocationid="33" class="radio-custom-label">Mersin</label>
                    </div>
                    <div>
                        <input id="grafik-radio-48" teklocationid="48" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-48" teklocationid="48" class="radio-custom-label">Muğla</label>
                    </div>
                    <div>
                        <input id="grafik-radio-49" teklocationid="49" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-49" teklocationid="49" class="radio-custom-label">Muş</label>
                    </div>
                    <div>
                        <input id="grafik-radio-50" teklocationid="50" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-50" teklocationid="50" class="radio-custom-label">Nevşehir</label>
                    </div>
                    <div>
                        <input id="grafik-radio-51" teklocationid="51" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-51" teklocationid="51" class="radio-custom-label">Niğde</label>
                    </div>
                    <div>
                        <input id="grafik-radio-52" teklocationid="52" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-52" teklocationid="52" class="radio-custom-label">Ordu</label>
                    </div>
                    <div>
                        <input id="grafik-radio-80" teklocationid="80" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-80" teklocationid="80" class="radio-custom-label">Osmaniye</label>
                    </div>
                    <div>
                        <input id="grafik-radio-53" teklocationid="53" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-53" teklocationid="53" class="radio-custom-label">Rize</label>
                    </div>
                    <div>
                        <input id="grafik-radio-54" teklocationid="54" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-54" teklocationid="54" class="radio-custom-label">Sakarya</label>
                    </div>
                    <div>
                        <input id="grafik-radio-55" teklocationid="55" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-55" teklocationid="55" class="radio-custom-label">Samsun</label>
                    </div>
                    <div>
                        <input id="grafik-radio-56" teklocationid="56" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-56" teklocationid="56" class="radio-custom-label">Siirt</label>
                    </div>
                    <div>
                        <input id="grafik-radio-57" teklocationid="57" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-57" teklocationid="57" class="radio-custom-label">Sinop</label>
                    </div>
                    <div>
                        <input id="grafik-radio-58" teklocationid="58" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-58" teklocationid="58" class="radio-custom-label">Sivas</label>
                    </div>
                    <div>
                        <input id="grafik-radio-63" teklocationid="63" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-63" teklocationid="63" class="radio-custom-label">Şanlıurfa</label>
                    </div>
                    <div>
                        <input id="grafik-radio-73" teklocationid="73" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-73" teklocationid="73" class="radio-custom-label">Şırnak</label>
                    </div>
                    <div>
                        <input id="grafik-radio-59" teklocationid="59" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-59" teklocationid="59" class="radio-custom-label">Tekirdağ</label>
                    </div>
                    <div>
                        <input id="grafik-radio-60" teklocationid="60" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-60" teklocationid="60" class="radio-custom-label">Tokat</label>
                    </div>
                    <div>
                        <input id="grafik-radio-61" teklocationid="61" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-61" teklocationid="61" class="radio-custom-label">Trabzon</label>
                    </div>
                    <div>
                        <input id="grafik-radio-62" teklocationid="62" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-62" teklocationid="62" class="radio-custom-label">Tunceli</label>
                    </div>
                    <div>
                        <input id="grafik-radio-64" teklocationid="64" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-64" teklocationid="64" class="radio-custom-label">Uşak</label>
                    </div>
                    <div>
                        <input id="grafik-radio-65" teklocationid="65" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-65" teklocationid="65" class="radio-custom-label">Van</label>
                    </div>
                    <div>
                        <input id="grafik-radio-77" teklocationid="77" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-77" teklocationid="77" class="radio-custom-label">Yalova</label>
                    </div>
                    <div>
                        <input id="grafik-radio-66" teklocationid="66" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-66" teklocationid="66" class="radio-custom-label">Yozgat</label>
                    </div>
                    <div>
                        <input id="grafik-radio-67" teklocationid="67" class="radio-custom" name="grafik-radio-group" type="radio" />
                        <label for="grafik-radio-67" teklocationid="67" class="radio-custom-label">Zonguldak</label>
                    </div>
                </section>
            </li>
            <li data-content="altkisim" style="height: 1100px;">
                <div class="AltKisimSecim">
                    <input type="radio" name="radiog_dark3" id="check5" class="css-checkbox" checked="checked" />
                    <label for="check5" class="css-label radGroup2" id="alttek">TEK ŞEHİR SEÇİM</label>

                    <input type="radio" name="radiog_dark3" id="check6" class="css-checkbox" />
                    <label for="check6" class="css-label radGroup2" id="altcoktan">ÇOKTAN LOKASYON SEÇİM</label>
                </div>
                <div class="YonSecimRow2">
                    <input type="checkbox" id="IlceleriGoster" />
                </div>
                <section id="AltCoktanSehir">

                    <div class="TekrarSuresiDiv">
                        <div class="TekrarSuresi">
                            Tekrar Süresi : 
                        </div>

                        <div class="styled-select">
                            <select id="AltKisimDonguSure">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                                <option value="60">60</option>
                            </select>
                        </div>
                    </div>

                    <div id="AltTumunuAt">
                        <i class="fa fa-caret-square-o-left" id="AltTumuAtLeft"></i>
                        <i class="fa fa-caret-square-o-right" id="AltTumuAtRight"></i>
                    </div>

                    <div id="AltBasliklar">
                        <span>BEKLEYEN ŞEHİRLER</span>
                        <span>GÖSTERİMDEKİ ŞEHİRLER VE İLÇELERİ</span>
                    </div>

                    <ul id="AltTumListe" class="connected sortable list">
                        <li locationid="1">
                            <div>Adana</div>
                        </li>
                        <li locationid="2">
                            <div>Adıyaman</div>
                        </li>
                        <li locationid="3">
                            <div>Afyonkarahisar</div>
                        </li>
                        <li locationid="68">
                            <div>Aksaray</div>
                        </li>
                        <li locationid="5">
                            <div>Amasya</div>
                        </li>
                        <li locationid="601">
                            <div>Ankara 1. Bölge</div>
                        </li>
                        <li locationid="602">
                            <div>Ankara 2. Bölge</div>
                        </li>
                        <li locationid="7">
                            <div>Antalya</div>
                        </li>
                        <li locationid="75">
                            <div>Ardahan</div>
                        </li>
                        <li locationid="8">
                            <div>Artvin</div>
                        </li>
                        <li locationid="9">
                            <div>Aydın</div>
                        </li>
                        <li locationid="4">
                            <div>Ağrı</div>
                        </li>
                        <li locationid="10">
                            <div>Balıkesir</div>
                        </li>
                        <li locationid="74">
                            <div>Bartın</div>
                        </li>
                        <li locationid="72">
                            <div>Batman</div>
                        </li>
                        <li locationid="69">
                            <div>Bayburt</div>
                        </li>
                        <li locationid="11">
                            <div>Bilecik</div>
                        </li>
                        <li locationid="12">
                            <div>Bingöl</div>
                        </li>
                        <li locationid="13">
                            <div>Bitlis</div>
                        </li>
                        <li locationid="14">
                            <div>Bolu</div>
                        </li>
                        <li locationid="15">
                            <div>Burdur</div>
                        </li>
                        <li locationid="16">
                            <div>Bursa</div>
                        </li>
                        <li locationid="17">
                            <div>Çanakkale</div>
                        </li>
                        <li locationid="18">
                            <div>Çankırı</div>
                        </li>
                        <li locationid="19">
                            <div>Çorum</div>
                        </li>
                        <li locationid="20">
                            <div>Denizli</div>
                        </li>
                        <li locationid="21">
                            <div>Diyarbakır</div>
                        </li>
                        <li locationid="81">
                            <div>Düzce</div>
                        </li>
                        <li locationid="22">
                            <div>Edirne</div>
                        </li>
                        <li locationid="23">
                            <div>Elazığ</div>
                        </li>
                        <li locationid="24">
                            <div>Erzincan</div>
                        </li>
                        <li locationid="25">
                            <div>Erzurum</div>
                        </li>
                        <li locationid="26">
                            <div>Eskişehir</div>
                        </li>
                        <li locationid="27">
                            <div>Gaziantep</div>
                        </li>
                        <li locationid="28">
                            <div>Giresun</div>
                        </li>
                        <li locationid="29">
                            <div>Gümüşhane</div>
                        </li>
                        <li locationid="30">
                            <div>Hakkari</div>
                        </li>
                        <li locationid="31">
                            <div>Hatay</div>
                        </li>
                        <li locationid="32">
                            <div>Isparta</div>
                        </li>
                        <li locationid="76">
                            <div>Iğdır</div>
                        </li>
                        <li locationid="341">
                            <div>İstanbul 1. Bölge</div>
                        </li>
                        <li locationid="342">
                            <div>İstanbul 2. Bölge</div>
                        </li>
                        <li locationid="343">
                            <div>İstanbul 3. Bölge</div>
                        </li>
                        <li locationid="351">
                            <div>İzmir 1. Bölge</div>
                        </li>
                        <li locationid="352">
                            <div>İzmir 2. Bölge</div>
                        </li>
                        <li locationid="46">
                            <div>Kahramanmaraş</div>
                        </li>
                        <li locationid="78">
                            <div>Karabük</div>
                        </li>
                        <li locationid="70">
                            <div>Karaman</div>
                        </li>
                        <li locationid="36">
                            <div>Kars</div>
                        </li>
                        <li locationid="37">
                            <div>Kastamonu</div>
                        </li>
                        <li locationid="38">
                            <div>Kayseri</div>
                        </li>
                        <li locationid="79">
                            <div>Kilis</div>
                        </li>
                        <li locationid="41">
                            <div>Kocaeli</div>
                        </li>
                        <li locationid="42">
                            <div>Konya</div>
                        </li>
                        <li locationid="43">
                            <div>Kütahya</div>
                        </li>
                        <li locationid="39">
                            <div>Kırklareli</div>
                        </li>
                        <li locationid="71">
                            <div>Kırıkkale</div>
                        </li>
                        <li locationid="40">
                            <div>Kırşehir</div>
                        </li>
                        <li locationid="44">
                            <div>Malatya</div>
                        </li>
                        <li locationid="45">
                            <div>Manisa</div>
                        </li>
                        <li locationid="47">
                            <div>Mardin</div>
                        </li>
                        <li locationid="33">
                            <div>Mersin</div>
                        </li>
                        <li locationid="48">
                            <div>Muğla</div>
                        </li>
                        <li locationid="49">
                            <div>Muş</div>
                        </li>
                        <li locationid="50">
                            <div>Nevşehir</div>
                        </li>
                        <li locationid="51">
                            <div>Niğde</div>
                        </li>
                        <li locationid="52">
                            <div>Ordu</div>
                        </li>
                        <li locationid="80">
                            <div>Osmaniye</div>
                        </li>
                        <li locationid="53">
                            <div>Rize</div>
                        </li>
                        <li locationid="54">
                            <div>Sakarya</div>
                        </li>
                        <li locationid="55">
                            <div>Samsun</div>
                        </li>
                        <li locationid="56">
                            <div>Siirt</div>
                        </li>
                        <li locationid="57">
                            <div>Sinop</div>
                        </li>
                        <li locationid="58">
                            <div>Sivas</div>
                        </li>
                        <li locationid="63">
                            <div>Şanlıurfa</div>
                        </li>
                        <li locationid="73">
                            <div>Şırnak</div>
                        </li>
                        <li locationid="59">
                            <div>Tekirdağ</div>
                        </li>
                        <li locationid="60">
                            <div>Tokat</div>
                        </li>
                        <li locationid="61">
                            <div>Trabzon</div>
                        </li>
                        <li locationid="62">
                            <div>Tunceli</div>
                        </li>
                        <li locationid="64">
                            <div>Uşak</div>
                        </li>
                        <li locationid="65">
                            <div>Van</div>
                        </li>
                        <li locationid="77">
                            <div>Yalova</div>
                        </li>
                        <li locationid="66">
                            <div>Yozgat</div>
                        </li>
                        <li locationid="67">
                            <div>Zonguldak</div>
                        </li>
                    </ul>

                    <ul id="AltSecilenListe" class="connected sortable list">
                    </ul>

                </section>
                <section id="AltTekSehir">

                    <div>
                        <input id="alt-radio-1" teklocationid="1" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-1" teklocationid="1" class="radio-custom-label">Adana</label>
                    </div>
                    <div>
                        <input id="alt-radio-2" teklocationid="2" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-2" teklocationid="2" class="radio-custom-label">Adıyaman</label>
                    </div>
                    <div>
                        <input id="alt-radio-3" teklocationid="3" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-3" teklocationid="3" class="radio-custom-label">Afyonkarahisar</label>
                    </div>
                    <div>
                        <input id="alt-radio-68" teklocationid="68" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-68" teklocationid="68" class="radio-custom-label">Aksaray</label>
                    </div>
                    <div>
                        <input id="alt-radio-5" teklocationid="5" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-5" teklocationid="5" class="radio-custom-label">Amasya</label>
                    </div>
                    <div>
                        <input id="alt-radio-601" teklocationid="601" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-601" teklocationid="601" class="radio-custom-label">Ankara 1. Bölge</label>
                    </div>
                    <div>
                        <input id="alt-radio-602" teklocationid="602" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-602" teklocationid="602" class="radio-custom-label">Ankara 2. Bölge</label>
                    </div>
                    <div>
                        <input id="alt-radio-7" teklocationid="7" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-7" teklocationid="7" class="radio-custom-label">Antalya</label>
                    </div>
                    <div>
                        <input id="alt-radio-75" teklocationid="75" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-75" teklocationid="75" class="radio-custom-label">Ardahan</label>
                    </div>
                    <div>
                        <input id="alt-radio-8" teklocationid="8" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-8" teklocationid="8" class="radio-custom-label">Artvin</label>
                    </div>
                    <div>
                        <input id="alt-radio-9" teklocationid="9" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-9" teklocationid="9" class="radio-custom-label">Aydın</label>
                    </div>
                    <div>
                        <input id="alt-radio-4" teklocationid="4" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-4" teklocationid="4" class="radio-custom-label">Ağrı</label>
                    </div>
                    <div>
                        <input id="alt-radio-10" teklocationid="10" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-10" teklocationid="10" class="radio-custom-label">Balıkesir</label>
                    </div>
                    <div>
                        <input id="alt-radio-74" teklocationid="74" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-74" teklocationid="74" class="radio-custom-label">Bartın</label>
                    </div>
                    <div>
                        <input id="alt-radio-72" teklocationid="72" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-72" teklocationid="72" class="radio-custom-label">Batman</label>
                    </div>
                    <div>
                        <input id="alt-radio-69" teklocationid="69" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-69" teklocationid="69" class="radio-custom-label">Bayburt</label>
                    </div>
                    <div>
                        <input id="alt-radio-11" teklocationid="11" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-11" teklocationid="11" class="radio-custom-label">Bilecik</label>
                    </div>
                    <div>
                        <input id="alt-radio-12" teklocationid="12" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-12" teklocationid="12" class="radio-custom-label">Bingöl</label>
                    </div>
                    <div>
                        <input id="alt-radio-13" teklocationid="13" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-13" teklocationid="13" class="radio-custom-label">Bitlis</label>
                    </div>
                    <div>
                        <input id="alt-radio-14" teklocationid="14" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-14" teklocationid="14" class="radio-custom-label">Bolu</label>
                    </div>
                    <div>
                        <input id="alt-radio-15" teklocationid="15" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-15" teklocationid="15" class="radio-custom-label">Burdur</label>
                    </div>
                    <div>
                        <input id="alt-radio-16" teklocationid="16" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-16" teklocationid="16" class="radio-custom-label">Bursa</label>
                    </div>
                    <div>
                        <input id="alt-radio-17" teklocationid="17" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-17" teklocationid="17" class="radio-custom-label">Çanakkale</label>
                    </div>
                    <div>
                        <input id="alt-radio-18" teklocationid="18" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-18" teklocationid="18" class="radio-custom-label">Çankırı</label>
                    </div>
                    <div>
                        <input id="alt-radio-19" teklocationid="19" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-19" teklocationid="19" class="radio-custom-label">Çorum</label>
                    </div>
                    <div>
                        <input id="alt-radio-20" teklocationid="20" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-20" teklocationid="20" class="radio-custom-label">Denizli</label>
                    </div>
                    <div>
                        <input id="alt-radio-21" teklocationid="21" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-21" teklocationid="21" class="radio-custom-label">Diyarbakır</label>
                    </div>
                    <div>
                        <input id="alt-radio-81" teklocationid="81" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-81" teklocationid="81" class="radio-custom-label">Düzce</label>
                    </div>
                    <div>
                        <input id="alt-radio-22" teklocationid="22" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-22" teklocationid="22" class="radio-custom-label">Edirne</label>
                    </div>
                    <div>
                        <input id="alt-radio-23" teklocationid="23" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-23" teklocationid="23" class="radio-custom-label">Elazığ</label>
                    </div>
                    <div>
                        <input id="alt-radio-24" teklocationid="24" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-24" teklocationid="24" class="radio-custom-label">Erzincan</label>
                    </div>
                    <div>
                        <input id="alt-radio-25" teklocationid="25" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-25" teklocationid="25" class="radio-custom-label">Erzurum</label>
                    </div>
                    <div>
                        <input id="alt-radio-26" teklocationid="26" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-26" teklocationid="26" class="radio-custom-label">Eskişehir</label>
                    </div>
                    <div>
                        <input id="alt-radio-27" teklocationid="27" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-27" teklocationid="27" class="radio-custom-label">Gaziantep</label>
                    </div>
                    <div>
                        <input id="alt-radio-28" teklocationid="28" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-28" teklocationid="28" class="radio-custom-label">Giresun</label>
                    </div>
                    <div>
                        <input id="alt-radio-29" teklocationid="29" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-29" teklocationid="29" class="radio-custom-label">Gümüşhane</label>
                    </div>
                    <div>
                        <input id="alt-radio-30" teklocationid="30" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-30" teklocationid="30" class="radio-custom-label">Hakkari</label>
                    </div>
                    <div>
                        <input id="alt-radio-31" teklocationid="31" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-31" teklocationid="31" class="radio-custom-label">Hatay</label>
                    </div>
                    <div>
                        <input id="alt-radio-32" teklocationid="32" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-32" teklocationid="32" class="radio-custom-label">Isparta</label>
                    </div>
                    <div>
                        <input id="alt-radio-76" teklocationid="76" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-76" teklocationid="76" class="radio-custom-label">Iğdır</label>
                    </div>
                    <div>
                        <input id="alt-radio-341" teklocationid="341" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-341" teklocationid="341" class="radio-custom-label">İstanbul 1. Bölge</label>
                    </div>
                    <div>
                        <input id="alt-radio-342" teklocationid="342" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-342" teklocationid="342" class="radio-custom-label">İstanbul 2. Bölge</label>
                    </div>
                    <div>
                        <input id="alt-radio-343" teklocationid="343" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-343" teklocationid="343" class="radio-custom-label">İstanbul 3. Bölge</label>
                    </div>
                    <div>
                        <input id="alt-radio-351" teklocationid="351" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-351" teklocationid="351" class="radio-custom-label">İzmir 1. Bölge</label>
                    </div>
                    <div>
                        <input id="alt-radio-352" teklocationid="352" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-352" teklocationid="352" class="radio-custom-label">İzmir 2. Bölge</label>
                    </div>
                    <div>
                        <input id="alt-radio-46" teklocationid="46" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-46" teklocationid="46" class="radio-custom-label">Kahramanmaraş</label>
                    </div>
                    <div>
                        <input id="alt-radio-78" teklocationid="78" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-78" teklocationid="78" class="radio-custom-label">Karabük</label>
                    </div>
                    <div>
                        <input id="alt-radio-70" teklocationid="70" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-70" teklocationid="70" class="radio-custom-label">Karaman</label>
                    </div>
                    <div>
                        <input id="alt-radio-36" teklocationid="36" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-36" teklocationid="36" class="radio-custom-label">Kars</label>
                    </div>
                    <div>
                        <input id="alt-radio-37" teklocationid="37" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-37" teklocationid="37" class="radio-custom-label">Kastamonu</label>
                    </div>
                    <div>
                        <input id="alt-radio-38" teklocationid="38" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-38" teklocationid="38" class="radio-custom-label">Kayseri</label>
                    </div>
                    <div>
                        <input id="alt-radio-79" teklocationid="79" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-79" teklocationid="79" class="radio-custom-label">Kilis</label>
                    </div>
                    <div>
                        <input id="alt-radio-41" teklocationid="41" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-41" teklocationid="41" class="radio-custom-label">Kocaeli</label>
                    </div>
                    <div>
                        <input id="alt-radio-42" teklocationid="42" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-42" teklocationid="42" class="radio-custom-label">Konya</label>
                    </div>
                    <div>
                        <input id="alt-radio-43" teklocationid="43" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-43" teklocationid="43" class="radio-custom-label">Kütahya</label>
                    </div>
                    <div>
                        <input id="alt-radio-39" teklocationid="39" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-39" teklocationid="39" class="radio-custom-label">Kırklareli</label>
                    </div>
                    <div>
                        <input id="alt-radio-71" teklocationid="71" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-71" teklocationid="71" class="radio-custom-label">Kırıkkale</label>
                    </div>
                    <div>
                        <input id="alt-radio-40" teklocationid="40" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-40" teklocationid="40" class="radio-custom-label">Kırşehir</label>
                    </div>
                    <div>
                        <input id="alt-radio-44" teklocationid="44" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-44" teklocationid="44" class="radio-custom-label">Malatya</label>
                    </div>
                    <div>
                        <input id="alt-radio-45" teklocationid="45" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-45" teklocationid="45" class="radio-custom-label">Manisa</label>
                    </div>
                    <div>
                        <input id="alt-radio-47" teklocationid="47" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-47" teklocationid="47" class="radio-custom-label">Mardin</label>
                    </div>
                    <div>
                        <input id="alt-radio-33" teklocationid="33" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-33" teklocationid="33" class="radio-custom-label">Mersin</label>
                    </div>
                    <div>
                        <input id="alt-radio-48" teklocationid="48" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-48" teklocationid="48" class="radio-custom-label">Muğla</label>
                    </div>
                    <div>
                        <input id="alt-radio-49" teklocationid="49" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-49" teklocationid="49" class="radio-custom-label">Muş</label>
                    </div>
                    <div>
                        <input id="alt-radio-50" teklocationid="50" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-50" teklocationid="50" class="radio-custom-label">Nevşehir</label>
                    </div>
                    <div>
                        <input id="alt-radio-51" teklocationid="51" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-51" teklocationid="51" class="radio-custom-label">Niğde</label>
                    </div>
                    <div>
                        <input id="alt-radio-52" teklocationid="52" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-52" teklocationid="52" class="radio-custom-label">Ordu</label>
                    </div>
                    <div>
                        <input id="alt-radio-80" teklocationid="80" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-80" teklocationid="80" class="radio-custom-label">Osmaniye</label>
                    </div>
                    <div>
                        <input id="alt-radio-53" teklocationid="53" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-53" teklocationid="53" class="radio-custom-label">Rize</label>
                    </div>
                    <div>
                        <input id="alt-radio-54" teklocationid="54" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-54" teklocationid="54" class="radio-custom-label">Sakarya</label>
                    </div>
                    <div>
                        <input id="alt-radio-55" teklocationid="55" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-55" teklocationid="55" class="radio-custom-label">Samsun</label>
                    </div>
                    <div>
                        <input id="alt-radio-56" teklocationid="56" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-56" teklocationid="56" class="radio-custom-label">Siirt</label>
                    </div>
                    <div>
                        <input id="alt-radio-57" teklocationid="57" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-57" teklocationid="57" class="radio-custom-label">Sinop</label>
                    </div>
                    <div>
                        <input id="alt-radio-58" teklocationid="58" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-58" teklocationid="58" class="radio-custom-label">Sivas</label>
                    </div>
                    <div>
                        <input id="alt-radio-63" teklocationid="63" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-63" teklocationid="63" class="radio-custom-label">Şanlıurfa</label>
                    </div>
                    <div>
                        <input id="alt-radio-73" teklocationid="73" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-73" teklocationid="73" class="radio-custom-label">Şırnak</label>
                    </div>
                    <div>
                        <input id="alt-radio-59" teklocationid="59" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-59" teklocationid="59" class="radio-custom-label">Tekirdağ</label>
                    </div>
                    <div>
                        <input id="alt-radio-60" teklocationid="60" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-60" teklocationid="60" class="radio-custom-label">Tokat</label>
                    </div>
                    <div>
                        <input id="alt-radio-61" teklocationid="61" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-61" teklocationid="61" class="radio-custom-label">Trabzon</label>
                    </div>
                    <div>
                        <input id="alt-radio-62" teklocationid="62" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-62" teklocationid="62" class="radio-custom-label">Tunceli</label>
                    </div>
                    <div>
                        <input id="alt-radio-64" teklocationid="64" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-64" teklocationid="64" class="radio-custom-label">Uşak</label>
                    </div>
                    <div>
                        <input id="alt-radio-65" teklocationid="65" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-65" teklocationid="65" class="radio-custom-label">Van</label>
                    </div>
                    <div>
                        <input id="alt-radio-77" teklocationid="77" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-77" teklocationid="77" class="radio-custom-label">Yalova</label>
                    </div>
                    <div>
                        <input id="alt-radio-66" teklocationid="66" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-66" teklocationid="66" class="radio-custom-label">Yozgat</label>
                    </div>
                    <div>
                        <input id="alt-radio-67" teklocationid="67" class="radio-custom" name="alt-radio-group" type="radio" />
                        <label for="alt-radio-67" teklocationid="67" class="radio-custom-label">Zonguldak</label>
                    </div>
                </section>
            </li>
            <li data-content="store" style="height: 450px;">
                <div class="SecimNot">
                    Belirleyeceğiniz parti, almış olduğu oy oranına göre bütün kısımlarda gösterilecektir.   
                </div>
                <div>
                    <div class="skin skin-flat">
                        <dl class="clear">
                            <dd class="selected">
                                <div class="skin-section">
                                    <ul class="list" id="PartiSecimUL">
                                        <li deger="0">
                                            <input type="radio" name="flat-radio" id="parti0" />
                                            <label for="parti0">
                                                <img src="images/Cancel.png" />
                                            </label>
                                        </li>
                                        <li deger="1">
                                            <input type="radio" name="flat-radio" id="parti1" />
                                            <label for="parti1">
                                                <img src="images/logo1.png" />
                                            </label>
                                        </li>
                                        <li deger="2">
                                            <input type="radio" name="flat-radio" id="parti999" />
                                            <label for="parti2">
                                                <img src="images/bbp.gif" />
                                            </label>
                                        </li>
                                        <li deger="3">
                                            <input type="radio" name="flat-radio" id="parti3" />
                                            <label for="parti3">
                                                <img src="images/logo3.png" />
                                            </label>
                                        </li>
                                        <li deger="4">
                                            <input type="radio" name="flat-radio" id="parti4" />
                                            <label for="parti4">
                                                <img src="images/logo4.png" />
                                            </label>
                                        </li>
                                        <li deger="5">
                                            <input type="radio" name="flat-radio" id="parti5" />
                                            <label for="parti5">
                                                <img src="images/logo5.png" />
                                            </label>
                                        </li>
                                        <li deger="9">
                                            <input type="radio" name="flat-radio" id="parti9" />
                                            <label for="parti9">
                                                <img src="images/logo9.png" />
                                            </label>
                                        </li>
                                        <li deger="10">
                                            <input type="radio" name="flat-radio" id="parti10" />
                                            <label for="parti10">
                                                <img src="images/logo10.png" />
                                            </label>
                                        </li>
                                        <li deger="11">
                                            <input type="radio" name="flat-radio" id="parti11" />
                                            <label for="parti11">
                                                <img src="images/logo11.png" />
                                            </label>
                                        </li>
                                        <li deger="12">
                                            <input type="radio" name="flat-radio" id="parti12" />
                                            <label for="parti12">
                                                <img src="images/logo12.png" />
                                            </label>
                                        </li>
                                        <li deger="13">
                                            <input type="radio" name="flat-radio" id="parti13" />
                                            <label for="parti13">
                                                <img src="images/logo13.png" />
                                            </label>
                                        </li>
                                        <li deger="14">
                                            <input type="radio" name="flat-radio" id="parti14" />
                                            <label for="parti14">
                                                <img src="images/logo14.png" />
                                            </label>
                                        </li>
                                        <li deger="15">
                                            <input type="radio" name="flat-radio" id="parti15" />
                                            <label for="parti15">
                                                <img src="images/logo15.png" />
                                            </label>
                                        </li>
                                        <li deger="16">
                                            <input type="radio" name="flat-radio" id="parti16" />
                                            <label for="parti16">
                                                <img src="images/logo16.png" />
                                            </label>
                                        </li>
                                        <li deger="18">
                                            <input type="radio" name="flat-radio" id="parti18" />
                                            <label for="parti18">
                                                <img src="images/logo18.png" />
                                            </label>
                                        </li>
                                        <li deger="19">
                                            <input type="radio" name="flat-radio" id="parti19" />
                                            <label for="parti19">
                                                <img src="images/logo19.png" />
                                            </label>
                                        </li>
                                        <li deger="20">
                                            <input type="radio" name="flat-radio" id="parti20" />
                                            <label for="parti20">
                                                <img src="images/logo20.png" />
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                            </dd>
                        </dl>
                    </div>
                </div>
            </li>
            <li data-content="settings">
                <div class="YonSecimDiv">
                    <div class="YonAltBaslik">LOGO SOLDA</div>

                    <div class="YonSecenek">
                        <div class="YonRadio">
                            <input type="radio" name="radiog_dark4" id="check7" class="css-checkbox" checked="checked" deger="Yon1" />
                            <label for="check7" class="css-label radGroup2" deger="Yon1">GRAFİK VE HARİTA SEÇİMİ SAĞDA</label>
                        </div>
                        <div class="YonImage">
                            <img src="images/yon1.png" />
                        </div>
                    </div>

                    <div class="YonSecenek">
                        <div class="YonRadio">
                            <input type="radio" name="radiog_dark4" id="check8" class="css-checkbox" deger="Yon2" />
                            <label for="check8" class="css-label radGroup2" deger="Yon2">GRAFİK VE HARİTA SEÇİMİ SOLDA</label>
                        </div>
                        <div class="YonImage">
                            <img src="images/yon2.png" />
                        </div>
                    </div>

                    <div class="YonAltBaslik">LOGO SAĞDA</div>

                    <div class="YonSecenek">
                        <div class="YonRadio">
                            <input type="radio" name="radiog_dark4" id="check9" class="css-checkbox" deger="Yon3" />
                            <label for="check9" class="css-label radGroup2" deger="Yon3">GRAFİK VE HARİTA SEÇİMİ SAĞDA</label>
                        </div>
                        <div class="YonImage">
                            <img src="images/yon3.png" />
                        </div>
                    </div>

                    <div class="YonSecenek">
                        <div class="YonRadio">
                            <input type="radio" name="radiog_dark4" id="check10" class="css-checkbox" deger="Yon4" />
                            <label for="check10" class="css-label radGroup2" deger="Yon4">GRAFİK VE HARİTA SEÇİMİ SOLDA</label>
                        </div>
                        <div class="YonImage">
                            <img src="images/yon4.png" />
                        </div>
                    </div>
                </div>
            </li>
            <li data-content="trash" style="height: 400px;">
                <div class="OrtaGrafikHaritaBos">
                    <div class="OrtaAlanSecim">
                        <i class="fa fa-bar-chart"></i>
                        <input type="radio" name="radiog_dark5" id="check11" class="css-checkbox" checked="checked" deger="grafik" />
                        <label for="check11" class="css-label radGroup2" deger="grafik">GRAFİK</label>
                    </div>

                    <div class="OrtaAlanSecim">
                        <i class="fa fa-signal"></i>
                        <input type="radio" name="radiog_dark5" id="check12" class="css-checkbox" deger="turkiyeharitasi" />
                        <label for="check12" class="css-label radGroup2" deger="turkiyeharitasi">TÜRKİYE VE PARTİ YOĞUNLUK HARİTASI</label>
                    </div>

                    <div class="OrtaAlanSecim">
                        <i class="fa fa-map-marker"></i>
                        <input type="radio" name="radiog_dark5" id="check15" class="css-checkbox" checked="checked" deger="sehirlerharitasi" />
                        <label for="check15" class="css-label radGroup2" deger="sehirlerharitasi">ŞEHİR HARİTALARI</label>
                    </div>

                    <div class="OrtaAlanSecim">
                        <i class="fa fa-desktop"></i>
                        <input type="radio" name="radiog_dark5" id="check13" class="css-checkbox" deger="bos" />
                        <label for="check13" class="css-label radGroup2" deger="bos">BOŞ</label>
                    </div>
                </div>
            </li>
        </ul>
    </div>
    <script src="Scripts/YonetimTab.js"></script>
    <script src="Scripts/jquery.signalR-2.2.0.min.js"></script>
    <script src="Scripts/SignalRConnect.js"></script>
    <script src="Scripts/farbtastic.js"></script>
    <script>
        var SecimBaglanti = SecimHub.createHubProxy('secimHub');

        var JsonVeri;
        var Sehirler;
        var GumrukCheck;

        SecimBaglanti.on("tetikle", function (data) { });

        function invokelar() {
            //SecimBaglanti.invoke("GenelVeri", "ok").done(function (data) { 
            //    JsonVeri = JSON.parse(data); 
            //});
        }

        $(document).ready(function () {

            $("#OrtaSecilenListe").html("");

            var CoktanIdler = [];

            if (getCookie("OrtaKisimDonguSuresi") == "") {
                setCookie("OrtaKisimDonguSuresi", "10");
                $("#OrtaKisimDonguSure").val("10");
            }
            else {
                $("#OrtaKisimDonguSure").val(getCookie("OrtaKisimDonguSuresi"));
            }

            $("#OrtaKisimDonguSure").change(function () {
                setCookie("OrtaKisimDonguSuresi", $(this).val());
                SecimBaglanti.invoke("islemTetikle", "OrtaKisimDonguSuresi", $(this).val());
            });

            var OrtaCoktanIdler = getCookie("CookieOrtaKisimId").split(",");

            OrtaCoktanIdler.forEach(function (deger) {
                $("#OrtaSecilenListe").append($("#OrtaTumListe > li[locationid='" + deger + "']"));
            });

            $('#OrtaTumListe, #OrtaSecilenListe').sortable({
                connectWith: '#OrtaTumListe, #OrtaSecilenListe',
                update: function (event, ui) {

                    if (event.target.id == "OrtaSecilenListe") {
                        CoktanIdler = [];

                        $("#OrtaSecilenListe > li").each(function () {
                            CoktanIdler.push($(this).attr("locationid"));
                        });

                        setCookie("CookieOrtaKisimId", CoktanIdler.join(","));
                        SecimBaglanti.invoke("islemTetikle", "OrtaKisimIdler", CoktanIdler.join(","));
                    }
                }
            });

            $("#ortateksehircheckbox").click(function () {
                $("#OrtaCoktanSehir").hide();
                $("#OrtaTekSehir").fadeIn("fast");
                setCookie("OrtaKisimTip", "Tek");
            });

            $("#ortacoktansehircheckbox").click(function () {
                $("#OrtaTekSehir").hide();
                $("#OrtaCoktanSehir").fadeIn("fast");
                setCookie("OrtaKisimTip", "Coktan");
            });

            $("#OrtaTumuAtRight").click(function () {
                $("#OrtaTumListe > li").each(function () {
                    $("#OrtaSecilenListe").append($(this));
                });

                CoktanIdler = [];

                $("#OrtaSecilenListe > li").each(function () {
                    CoktanIdler.push($(this).attr("locationid"));
                });

                setCookie("CookieOrtaKisimId", CoktanIdler.join(","));

                setTimeout(function () {
                    SecimBaglanti.invoke("islemTetikle", "OrtaKisimIdler", CoktanIdler.join(","));
                }, 500);
            });

            $("#OrtaTumuAtLeft").click(function () {

                $("#OrtaSecilenListe > li").each(function () {
                    $("#OrtaTumListe").append($(this));
                });

                CoktanIdler = [];

                $("#OrtaSecilenListe > li").each(function () {
                    CoktanIdler.push($(this).attr("locationid"));
                });

                setCookie("CookieOrtaKisimId", CoktanIdler.join(","));

                setTimeout(function () {
                    SecimBaglanti.invoke("islemTetikle", "OrtaKisimIdler", CoktanIdler.join(","));
                }, 500);
            });

            if (getCookie("OrtaKisimTip") == "Tek") {
                $("#ortateksehircheckbox").click();
                $("#OrtaTekSehir").show();
                $("#OrtaCoktanSehir").hide();
            }
            else if (getCookie("OrtaKisimTip") == "Coktan") {
                $("#ortacoktansehircheckbox").click();
                $("#OrtaCoktanSehir").show();
                $("#OrtaTekSehir").hide();
            }

            $("#OrtaTekSehir > div > input[teklocationid='" + getCookie("CookieOrtaKisimId") + "']").attr("checked", "checked").parent("div").addClass("SeciliSatir");

            $("#OrtaTekSehir > div > label").click(function () {

                var tekid = $(this).attr("teklocationid");
                setCookie("CookieOrtaKisimId", tekid);

                $("#OrtaTekSehir > div").removeClass("SeciliSatir");
                $(this).parent("div").addClass("SeciliSatir");

                SecimBaglanti.invoke("islemTetikle", "OrtaKisimIdler", $(this).attr("teklocationid"));

            });

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            $("#SehirTekSehir > div > input[teklocationid='" + getCookie("SehirHaritaSecim") + "']").attr("checked", "checked").parent("div").addClass("SeciliSatir");

            $("#SehirTekSehir > div > label").click(function () {

                var tekid = $(this).attr("teklocationid");
                setCookie("SehirHaritaSecim", tekid);

                $("#SehirTekSehir > div").removeClass("SeciliSatir");
                $(this).parent("div").addClass("SeciliSatir");

                SecimBaglanti.invoke("islemTetikle", "SehirHaritaSecim", $(this).attr("teklocationid"));

            });

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            $("#GrafikSecilenListe").html("");

            var CoktanIdler = [];

            if (getCookie("GrafikKisimDonguSuresi") == "") {
                setCookie("GrafikKisimDonguSuresi", "10");
                $("#GrafikKisimDonguSure").val("10");
            }
            else {
                $("#GrafikKisimDonguSure").val(getCookie("GrafikKisimDonguSuresi"));
            }

            $("#GrafikKisimDonguSure").change(function () {
                setCookie("GrafikKisimDonguSuresi", $(this).val());
                SecimBaglanti.invoke("islemTetikle", "GrafikKisimDonguSuresi", $(this).val());
            });

            var GrafikCoktanIdler = getCookie("CookieGrafikKisimId").split(",");

            GrafikCoktanIdler.forEach(function (deger) {
                $("#GrafikSecilenListe").append($("#GrafikTumListe > li[locationid='" + deger + "']"));
            });

            $('#GrafikTumListe, #GrafikSecilenListe').sortable({
                connectWith: '#GrafikTumListe, #GrafikSecilenListe',
                update: function (event, ui) {

                    if (event.target.id == "GrafikSecilenListe") {
                        CoktanIdler = [];

                        $("#GrafikSecilenListe > li").each(function () {
                            CoktanIdler.push($(this).attr("locationid"));
                        });

                        setCookie("CookieGrafikKisimId", CoktanIdler.join(","));
                        SecimBaglanti.invoke("islemTetikle", "GrafikKisimIdler", CoktanIdler.join(","));
                    }
                }
            });

            $("#grafikteksehircheckbox").click(function () {
                $("#GrafikCoktanSehir").hide();
                $("#GrafikTekSehir").fadeIn("fast");
                setCookie("GrafikKisimTip", "Tek");
            });

            $("#grafikcoktansehircheckbox").click(function () {
                $("#GrafikTekSehir").hide();
                $("#GrafikCoktanSehir").fadeIn("fast");
                setCookie("GrafikKisimTip", "Coktan");
            });

            $("#GrafikTumuAtRight").click(function () {
                $("#GrafikTumListe > li").each(function () {
                    $("#GrafikSecilenListe").append($(this));
                });

                CoktanIdler = [];

                $("#GrafikSecilenListe > li").each(function () {
                    CoktanIdler.push($(this).attr("locationid"));
                });

                setCookie("CookieGrafikKisimId", CoktanIdler.join(","));

                setTimeout(function () {
                    SecimBaglanti.invoke("islemTetikle", "GrafikKisimIdler", CoktanIdler.join(","));
                }, 500);
            });

            $("#GrafikTumuAtLeft").click(function () {

                $("#GrafikSecilenListe > li").each(function () {
                    $("#GrafikTumListe").append($(this));
                });

                CoktanIdler = [];

                $("#GrafikSecilenListe > li").each(function () {
                    CoktanIdler.push($(this).attr("locationid"));
                });

                setCookie("CookieGrafikKisimId", CoktanIdler.join(","));

                setTimeout(function () {
                    SecimBaglanti.invoke("islemTetikle", "GrafikKisimIdler", CoktanIdler.join(","));
                }, 500);
            });

            if (getCookie("GrafikKisimTip") == "Tek") {
                $("#grafikteksehircheckbox").click();
                $("#GrafikTekSehir").show();
                $("#GrafikCoktanSehir").hide();
            }
            else if (getCookie("GrafikKisimTip") == "Coktan") {
                $("#grafikcoktansehircheckbox").click();
                $("#GrafikCoktanSehir").show();
                $("#GrafikTekSehir").hide();
            }

            $("#GrafikTekSehir > div > input[teklocationid='" + getCookie("CookieGrafikKisimId") + "']").attr("checked", "checked").parent("div").addClass("SeciliSatir");

            $("#GrafikTekSehir > div > label").click(function () {

                var tekid = $(this).attr("teklocationid");
                setCookie("CookieGrafikKisimId", tekid);

                $("#GrafikTekSehir > div").removeClass("SeciliSatir");
                $(this).parent("div").addClass("SeciliSatir");

                SecimBaglanti.invoke("islemTetikle", "GrafikKisimIdler", $(this).attr("teklocationid"));

            });

            //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

            $("#AltSecilenListe").html("");

            var AltCoktanIdler = [];

            if (getCookie("AltKisimDonguSuresi") == "") {
                setCookie("AltKisimDonguSuresi", "10");
                $("#AltKisimDonguSure").val("10");
            }
            else {
                $("#AltKisimDonguSure").val(getCookie("AltKisimDonguSuresi"));
            }

            $("#AltKisimDonguSure").change(function () {
                setCookie("AltKisimDonguSuresi", $(this).val());
                SecimBaglanti.invoke("islemTetikle", "AltKisimDonguSuresi", $(this).val());
            });

            var AltCoktanIdler = getCookie("CookieAltKisimId").split(",");

            AltCoktanIdler.forEach(function (deger) {
                $("#AltSecilenListe").append($("#AltTumListe > li[locationid='" + deger + "']"));
            });

            $('#AltTumListe, #AltSecilenListe').sortable({
                connectWith: '#AltTumListe, #AltSecilenListe',
                update: function (event, ui) {

                    if (event.target.id == "AltSecilenListe") {
                        AltCoktanIdler = [];

                        $("#AltSecilenListe > li").each(function () {
                            AltCoktanIdler.push($(this).attr("locationid"));
                        });

                        setCookie("CookieAltKisimId", AltCoktanIdler.join(","));
                        SecimBaglanti.invoke("islemTetikle", "AltKisimIdler", AltCoktanIdler.join(","));
                    }
                }
            });

            $("#alttek").click(function () {
                $("#AltCoktanSehir").hide();
                $("#AltTekSehir").fadeIn("fast");
                setCookie("AltKisimTip", "Tek");
            });

            $("#altcoktan").click(function () {
                $("#AltTekSehir").hide();
                $("#AltCoktanSehir").fadeIn("fast");
                setCookie("AltKisimTip", "Coktan");
            });

            $("#AltTumuAtRight").click(function () {
                $("#AltTumListe > li").each(function () {
                    $("#AltSecilenListe").append($(this));
                });

                AltCoktanIdler = [];

                $("#AltSecilenListe > li").each(function () {
                    AltCoktanIdler.push($(this).attr("locationid"));
                });

                setCookie("CookieAltKisimId", AltCoktanIdler.join(","));

                setTimeout(function () {
                    SecimBaglanti.invoke("islemTetikle", "AltKisimIdler", AltCoktanIdler.join(","));
                }, 500);
            });

            $("#AltTumuAtLeft").click(function () {

                $("#AltSecilenListe > li").each(function () {
                    $("#AltTumListe").append($(this));
                });

                AltCoktanIdler = [];

                $("#AltSecilenListe > li").each(function () {
                    AltCoktanIdler.push($(this).attr("locationid"));
                });

                setCookie("CookieAltKisimId", AltCoktanIdler.join(","));

                setTimeout(function () {
                    SecimBaglanti.invoke("islemTetikle", "AltKisimIdler", AltCoktanIdler.join(","));
                }, 500);
            });

            if (getCookie("AltKisimTip") == "Tek") {
                $("#alttek").click();
                $("#AltTekSehir").show();
                $("#AltCoktanSehir").hide();
            }
            else if (getCookie("AltKisimTip") == "Coktan") {
                $("#altcoktan").click();
                $("#AltCoktanSehir").show();
                $("#AltTekSehir").hide();
            }

            $("#AltTekSehir > div > input[teklocationid='" + getCookie("CookieAltKisimId") + "']").attr("checked", "checked").parent("div").addClass("SeciliSatir");

            $("#AltTekSehir > div > label").click(function () {

                var tekid = $(this).attr("teklocationid");
                setCookie("CookieAltKisimId", tekid);

                $("#AltTekSehir > div").removeClass("SeciliSatir");
                $(this).parent("div").addClass("SeciliSatir");

                SecimBaglanti.invoke("islemTetikle", "AltKisimIdler", $(this).attr("teklocationid"));

            });

            //$("[deger='bos']").click(function(){
            //    setCookie("OrtaKisimSecim", "bos");
            //    SecimBaglanti.invoke("islemTetikle", "OrtaKisimSecim", "bos");
            //}); 

            $(".OrtaGrafikHaritaBos > .OrtaAlanSecim > input").click(function () {
                 
                if ($(this).attr("deger") == "bos") {
                    setCookie("OrtaKisimSecim", "bos");
                    SecimBaglanti.invoke("islemTetikle", "OrtaKisimSecim", "bos");
                }
                else {
                    $(".cd-tabs-navigation > li > a[data-content='" + $(this).attr("deger") + "']").trigger("click");
                }

            });

            $(".cd-tabs-navigation > li").click(function () {
                if ($(this).find("a").attr("data-content") == "grafik" || $(this).find("a").attr("data-content") == "turkiyeharitasi" || $(this).find("a").attr("data-content") == "sehirlerharitasi") {
                    setCookie("OrtaKisimSecim", $(this).find("a").attr("data-content"));
                    SecimBaglanti.invoke("islemTetikle", "OrtaKisimSecim", $(this).find("a").attr("data-content"));
                }
            });

            $("#TVEkrani").click(function () {
                window.open("http://localhost:1723/TvEkrani16X9.aspx", "TV EKRANI", "height=800,width=1600");
            });

            $("#IlceleriGoster").bootstrapSwitch({
                onText: "İLÇELER GÖSTERİMDE",
                offText: "İLÇELER GÖSTERİME DAHİL EDİLMEDİ",
                size: "large",
                state: getCookie("AltKisimIlceleriGoster") == "true",
                onColor: "primary",
                offColor: "success",
                labelWidth: 0,
                handleWidth: 300,
                onInit: function (event, state) { },
                onSwitchChange: function (event, state) {
                    if (state) {
                        SecimBaglanti.invoke("islemTetikle", "AltKisimIlceleriGoster", "true");
                        setCookie("AltKisimIlceleriGoster", "true");
                    }
                    else {
                        SecimBaglanti.invoke("islemTetikle", "AltKisimIlceleriGoster", "false");
                        setCookie("AltKisimIlceleriGoster", "false");
                    }
                }
            });

            //$("[name='radiog_dark5']").click(function () {
            //    setCookie("OrtaKisimSecim", $(this).attr("deger"));
            //    SecimBaglanti.invoke("islemTetikle", "OrtaKisimSecim", $(this).attr("deger"));
            //});

            //$("#harita").bootstrapSwitch({
            //    onText: "ŞEHİRLER HARİTASI",
            //    offText: "GRAFİK VE İLK 5 PARTİ",
            //    size: "large",
            //    state: getCookie("harita") == "true",
            //    onColor: "primary",
            //    offColor: "success",
            //    labelWidth: 0,
            //    handleWidth: 300,
            //    onInit: function (event, state) { },
            //    onSwitchChange: function (event, state) {
            //        if (state) {
            //            SecimBaglanti.invoke("islemTetikle", "Harita", "");
            //            setCookie("harita", state);
            //        }
            //        else {
            //            SecimBaglanti.invoke("islemTetikle", "Grafik", "");
            //            setCookie("harita", state);
            //        }
            //    }
            //});

            if (getCookie("SiteYon") != "") {
                $("input[deger='" + getCookie("SiteYon") + "']").attr("checked", "checked");
            }

            $("[name='radiog_dark4']").click(function () {
                setCookie("SiteYon", $(this).attr("deger"));
                SecimBaglanti.invoke("islemTetikle", "SiteYon", $(this).attr("deger"));
            });

            //$("#Sagsol").bootstrapSwitch({
            //    onText: "ÜST KISIM SOLDAN SAĞA",
            //    offText: "ÜST KISIM SAĞDAN SOLA",
            //    size: "large",
            //    state: getCookie("Sagsol") == "true",
            //    onColor: "primary",
            //    offColor: "success",
            //    labelWidth: 0,
            //    handleWidth: 300,
            //    onInit: function (event, state) { },
            //    onSwitchChange: function (event, state) {
            //        if (state) {
            //            SecimBaglanti.invoke("islemTetikle", "UstSaga", "");
            //            setCookie("Sagsol", state);
            //        }
            //        else {
            //            SecimBaglanti.invoke("islemTetikle", "UstSola", "");
            //            setCookie("Sagsol", state);
            //        }
            //    }
            //});

            //$("#OrtaSagsol").bootstrapSwitch({
            //    onText: "ORTA KISIM SOLDAN SAĞA",
            //    offText: "ORTA KISIM SAĞDAN SOLA",
            //    size: "large",
            //    onColor: "primary",
            //    state: getCookie("OrtaSagsol") == "true",
            //    offColor: "success",
            //    labelWidth: 0,
            //    handleWidth: 300,
            //    onInit: function (event, state) { },
            //    onSwitchChange: function (event, state) {
            //        if (state) {
            //            SecimBaglanti.invoke("islemTetikle", "OrtaSaga", "");
            //            setCookie("OrtaSagsol", state);
            //        }
            //        else {
            //            SecimBaglanti.invoke("islemTetikle", "OrtaSola", "");

            //            setCookie("OrtaSagsol", state);
            //        }
            //    }
            //});

            $('.skin-flat input').iCheck({
                checkboxClass: 'icheckbox_flat-red',
                radioClass: 'iradio_flat-red'
            });

            ////////////////////////////////////////////////////////

            if (getCookie("SeciliParti") == "") {
                setCookie("SeciliParti", "0");
            }

            $("#PartiSecimUL > [deger='" + getCookie("SeciliParti") + "']").addClass("seciliParti");
            $("#PartiSecimUL > [deger='" + getCookie("SeciliParti") + "'] > div").addClass("checked");

            $("#PartiSecimUL > li > label").click(function () {
                $("#PartiSecimUL > li").removeClass("seciliParti");
                $(this).parent("").addClass("seciliParti");
                setCookie("SeciliParti", $(this).parent("").attr("deger"));
                SecimBaglanti.invoke("islemTetikle", "SeciliParti", $(this).parent("").attr("deger"));
            });

            $("#PartiSecimUL > li > div > .iCheck-helper").click(function () {
                $("#PartiSecimUL > li").removeClass("seciliParti");
                $(this).parent("").parent("").addClass("seciliParti");
                setCookie("SeciliParti", $(this).parent("").parent("").attr("deger"));
                SecimBaglanti.invoke("islemTetikle", "SeciliParti", $(this).parent("").attr("deger"));
            });

            ////////////////////////////////////////////////////////

            if (getCookie("HaritaYogunluk") == "") {
                setCookie("HaritaYogunluk", "0");
            }

            $("#TurkiyeYogunlukUL > [deger='" + getCookie("HaritaYogunluk") + "']").addClass("seciliParti");
            $("#TurkiyeYogunlukUL > [deger='" + getCookie("HaritaYogunluk") + "'] > div").addClass("checked");

            $("#TurkiyeYogunlukUL > li > label").click(function () {
                $("#TurkiyeYogunlukUL > li").removeClass("seciliParti");
                $(this).parent("").addClass("seciliParti");
                setCookie("HaritaYogunluk", $(this).parent("").attr("deger"));
                SecimBaglanti.invoke("islemTetikle", "HaritaYogunluk", $(this).parent("").attr("deger"));
            });

            $("#TurkiyeYogunlukUL > li > div > .iCheck-helper").click(function () {
                $("#TurkiyeYogunlukUL > li").removeClass("seciliParti");
                $(this).parent("").parent("").addClass("seciliParti");
                setCookie("HaritaYogunluk", $(this).parent("").parent("").attr("deger"));
                SecimBaglanti.invoke("islemTetikle", "HaritaYogunluk", $(this).parent("").attr("deger"));
            });

            ////////////////////////////////////////////////////////

            if (getCookie("Renk0Input") != "") {
                $('#Renk0Input').val(getCookie("Renk0Input"));
            }
            if (getCookie("Renk1Input") != "") {
                $('#Renk1Input').val(getCookie("Renk1Input"));
            }
            if (getCookie("Renk2Input") != "") {
                $('#Renk2Input').val(getCookie("Renk2Input"));
            }
            if (getCookie("Renk3Input") != "") {
                $('#Renk3Input').val(getCookie("Renk3Input"));
            }
            if (getCookie("Renk4Input") != "") {
                $('#Renk4Input').val(getCookie("Renk4Input"));
            }
            if (getCookie("Renk5Input") != "") {
                $('#Renk5Input').val(getCookie("Renk5Input"));
            }
            if (getCookie("Renk6Input") != "") {
                $('#Renk6Input').val(getCookie("Renk6Input"));
            }
            if (getCookie("Renk7Input") != "") {
                $('#Renk7Input').val(getCookie("Renk7Input"));
            }
            if (getCookie("Renk8Input") != "") {
                $('#Renk8Input').val(getCookie("Renk8Input"));
            }
            //if (getCookie("Renk9Input") != "") {
            //    $('#Renk9Input').val(getCookie("Renk9Input"));
            //}
            //if (getCookie("Renk10Input") != "") {
            //    $('#Renk10Input').val(getCookie("Renk10Input"));
            //}
            //if (getCookie("Renk11Input") != "") {
            //    $('#Renk11Input').val(getCookie("Renk11Input"));
            //}

            $('#Renk0').farbtastic("#Renk0Input");
            $('#Renk1').farbtastic("#Renk1Input");
            $('#Renk2').farbtastic("#Renk2Input");
            $('#Renk3').farbtastic("#Renk3Input");
            $('#Renk4').farbtastic("#Renk4Input");
            $('#Renk5').farbtastic("#Renk5Input");
            $('#Renk6').farbtastic("#Renk6Input");
            $('#Renk7').farbtastic("#Renk7Input");
            $('#Renk8').farbtastic("#Renk8Input");
            //$('#Renk9').farbtastic("#Renk9Input");
            //$('#Renk10').farbtastic("#Renk10Input");
            //$('#Renk11').farbtastic("#Renk11Input");

            $('#Renk0Input').change(function () {
                SecimBaglanti.invoke("islemTetikle", "Renk0Input", $(this).val());
                setCookie("Renk0Input", $('#Renk0Input').val());
            });

            $('#Renk1Input').change(function () {
                SecimBaglanti.invoke("islemTetikle", "Renk1Input", $(this).val());
                setCookie("Renk1Input", $('#Renk1Input').val());
            });

            $('#Renk2Input').change(function () {
                SecimBaglanti.invoke("islemTetikle", "Renk2Input", $(this).val());
                setCookie("Renk2Input", $('#Renk2Input').val());
            });

            $('#Renk3Input').change(function () {
                SecimBaglanti.invoke("islemTetikle", "Renk3Input", $(this).val());
                setCookie("Renk3Input", $('#Renk3Input').val());
            });

            $('#Renk4Input').change(function () {
                SecimBaglanti.invoke("islemTetikle", "Renk4Input", $(this).val());
                setCookie("Renk4Input", $('#Renk4Input').val());
            });

            $('#Renk5Input').change(function () {
                SecimBaglanti.invoke("islemTetikle", "Renk5Input", $(this).val());
                setCookie("Renk5Input", $('#Renk5Input').val());
            });

            $('#Renk6Input').change(function () {
                SecimBaglanti.invoke("islemTetikle", "Renk6Input", $(this).val());
                setCookie("Renk6Input", $('#Renk6Input').val());
            });

            $('#Renk7Input').change(function () {
                SecimBaglanti.invoke("islemTetikle", "Renk7Input", $(this).val());
                setCookie("Renk7Input", $('#Renk7Input').val());
            });

            $('#Renk8Input').change(function () {
                SecimBaglanti.invoke("islemTetikle", "Renk8Input", $(this).val());
                setCookie("Renk8Input", $('#Renk8Input').val());
            });

            //$('#Renk9Input').change(function () {
            //    SecimBaglanti.invoke("islemTetikle", "Renk9Input", $(this).val());
            //    setCookie("Renk9Input", $('#Renk9Input').val());
            //});

            //$('#Renk10Input').change(function () {
            //    SecimBaglanti.invoke("islemTetikle", "Renk10Input", $(this).val());
            //    setCookie("Renk10Input", $('#Renk10Input').val());
            //});

            //$('#Renk11Input').change(function () {
            //    SecimBaglanti.invoke("islemTetikle", "Renk11Input", $(this).val());
            //    setCookie("Renk11Input", $('#Renk11Input').val());
            //});

        });

        function setCookie(cname, cvalue) {
            var d = new Date();
            d.setTime(d.getTime() + (100 * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        }

        function getCookie(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        }
    </script>
</body>
</html>
