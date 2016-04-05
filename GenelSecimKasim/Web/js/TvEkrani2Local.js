var FooterRoundTime;
var ChartRoundTime;

var SeciliIl = "1";
var SeciliIlce = "0";
var SecimSeviye = "1"; // 1 sehir - 2 ilce

var GrafikSeciliIl = "0";
var GumrukCheck = "ok";

var JsonVeriGenel;
var JsonVeriIl;
var JsonVeriHarita;

var TekrarSuresi = 60000;
var DonguSuresi = 20000;
var HaritaSeciliParti = "0";
var DonguOran;
var SeciliArkaPlan;
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
$(document).ready(function () {

    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);

    $.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase());

    if (!$.browser.chrome) {
        alert("Sayfamız Chrome tarayıcısında sorunsuz çalışmaktadır. Lütfen Chrome kullanın.");
        $(".TumSayfa").css("margin-top", "-1000px");
        window.location.href = "https://www.google.com.tr/chrome/browser";
    }


    if (getCookie("Renk0") != "") {
        $(".footer,.Title,.footer2").css("background", getCookie("Renk0"));
        $(".Renklendirme1").css("color", getCookie("Renk1"));
        $(".Renklendirme2").css("color", getCookie("Renk2"));
        $(".Renklendirme3").css("color", getCookie("Renk3"));
        $(".Renklendirme4").css("color", getCookie("Renk4"));
        SeciliArkaPlan = getCookie("Renk0");
    }
    else {
        $(".footer,.Title,.footer2").css("background", "#404041");
        $(".Renklendirme1").css("color", "#ffffff");
        $(".Renklendirme2").css("color", "#9BE1FF");
        $(".Renklendirme3").css("color", "#3F3F3F");
        $(".Renklendirme4").css("color", "#DA2424");
        SeciliArkaPlan = "#404041";
    }

    AjaxCalls();


    $("#Sehirler").change(function () {
        SecimSeviye = "1";
        SeciliIl = $(this).val();
        SehirVeri();
        FooterDatalar();

        if ($("#IlIlceRound").prop('checked') == true) {

            clearInterval(FooterRoundTime);

            FooterRoundTime = setInterval(function () {
                RoundSehirIlce();
            }, DonguSuresi);
        }
    });

    $("#Ilceler").change(function () {

        SecimSeviye = "2";
        SeciliIlce = $(this).val();
        FooterDatalar();

        if ($("#IlIlceRound").prop('checked') == true) {

            clearInterval(FooterRoundTime);

            FooterRoundTime = setInterval(function () {
                RoundSehirIlce();
            }, DonguSuresi);
        }
    });

    $("#IlIlceRound").click(function () {

        if ($("#IlIlceRound").prop('checked') == true) {

            $("[name='DonguSuresi']").removeAttr("disabled");

            clearInterval(FooterRoundTime);

            FooterRoundTime = setInterval(function () {
                RoundSehirIlce();
            }, DonguSuresi);
        }
        else {
            $("[name='DonguSuresi']").attr("disabled", "disabled");

            clearInterval(FooterRoundTime);
        }

    });

    $("#CoktanSecimBTN").click(function () {

        clearInterval(FooterRoundTime);

        var SecimVarmi = "0";
        var IlkId;
        $("#SecilmisIller").html("");

        $("#CoktanSecSehirler > div > input[type='checkbox']").each(function () {

            var id = $(this).attr("id").replace("Sehir_", "");

            if ($(this).is(":checked")) {

                if (SecimVarmi == "0") {
                    IlkId = id;
                    $("#SecilmisIller").append("<option selected='selected' value='" + id + "'></option>");
                }
                else {
                    $("#SecilmisIller").append("<option value='" + id + "'></option>");
                }

                SecimVarmi = "1";

            }

        });

        SecimSeviye = "1";
        SeciliIl = IlkId;
        FooterDatalar();

        if (SecimVarmi == "1") { //Seçim yapılmış

            clearInterval(FooterRoundTime);

            FooterRoundTime = setInterval(function () {
                RoundCoktanSehir();
            }, 20000);

        }
    });

    $("#CoktanSecimSifirla").click(function () {
        $("#CoktanSecSehirler > div > input[type='checkbox']").prop('checked', false);

        clearInterval(FooterRoundTime);
    });

    $(document).keydown(function (e) {
        key(e);
    });

    $("[name='DonguSuresi']").click(function () {
        DonguSuresi = $(this).val();

        clearInterval(FooterRoundTime);

        FooterRoundTime = setInterval(function () {
            RoundSehirIlce();
        }, DonguSuresi);
    });

});

function AjaxCalls() {

    GenelVeri();
    HaritaVeri();
    SehirVeri();

    setTimeout(function () {
        AjaxCalls();
    }, TekrarSuresi);

}

function GenelVeri() {
    $.ajax({
        dataType: "json",
        url: "Handlers/GenelVeri.ashx",
        data: {
            GumrukDahil: GumrukCheck
        },
        async: true,
        cache: true,
        success: function (data) {
            JsonVeriGenel = data;

            GenelDatalar();
            FooterDatalar();
            LineChart();
        }
    });
}

function SehirVeri() {
    $.ajax({
        dataType: "json",
        url: "Handlers/IlceVeri.ashx",
        data: {
            IlKodu: SeciliIl
        },
        async: true,
        cache: true,
        success: function (data) {
            JsonVeriIl = data;

            IlcelerCombo();
        }
    });
}

function IlcelerCombo() {

    var Deger = "";

    Deger += "<option value='000'>" + JsonVeriIl.Il.Ad.toUpperCase() + "</option>";

    $.each(JsonVeriIl.Il.Ilce.sort(function (a, b) {
        if (a.Ad.replace('Ç', 'C').replace('İ', 'I').replace('Ö', 'O').replace('Ü', 'U').replace('Ş', 'S') < b.Ad.replace('Ç', 'C').replace('İ', 'I').replace('Ö', 'O').replace('Ü', 'U').replace('Ş', 'S')) return -1;
        if (b.Ad.replace('Ç', 'C').replace('İ', 'I').replace('Ö', 'O').replace('Ü', 'U').replace('Ş', 'S') < a.Ad.replace('Ç', 'C').replace('İ', 'I').replace('Ö', 'O').replace('Ü', 'U').replace('Ş', 'S')) return 1;
        return 0;
    }), function (a, b) {
        Deger += "<option value='" + b.Kod + "'>" + b.Ad + "</option>";
    });

    $("#Ilceler").html("");
    $("#Ilceler").prepend(Deger);

    if (SecimSeviye == "2") {
        $("#Ilceler").val(SeciliIlce);
    }
}

function GenelDatalar() {

    $(".DortParti,#UstBar > .kolon").animate({
        height: 'toggle'
    }, 700);

    $(".kolon > div > span:eq(1)").text("");

    var AcilanSandikOran = ((JsonVeriGenel.AA.TurkiyeGeneli.Sandik.AcilanSandik * 100) / JsonVeriGenel.AA.TurkiyeGeneli.Sandik.ToplamSandik);

    var ProgresOran = AcilanSandikOran;

    AcilanSandikOran = (parseInt(AcilanSandikOran) >= 100) ? 100 : AcilanSandikOran.toFixed(2);

    $("#toplamsandiksayi").text(parseInt(JsonVeriGenel.AA.TurkiyeGeneli.Sandik.ToplamSandik).toLocaleString());
    $("#acilansandiksayi").text(parseInt(JsonVeriGenel.AA.TurkiyeGeneli.Sandik.AcilanSandik).toLocaleString());

    var KatilimOrani = ((JsonVeriGenel.AA.TurkiyeGeneli.Sandik.KullanilanOy * 100) / JsonVeriGenel.AA.TurkiyeGeneli.Sandik.AcilanSandikSecmenSayisi);
    KatilimOrani = (KatilimOrani >= 100) ? '% ' + KatilimOrani : '% ' + KatilimOrani.toFixed(2);

    $("#acilansandikorani").text("% " + AcilanSandikOran);

    ProgresOran = (ProgresOran >= 100) ? 100 : ProgresOran;

    $("#ProgresOranGenel").css("width", ProgresOran + "%");

    var TurkiyeVeri = JsonVeriGenel.AA.TurkiyeGeneli.Sonuclar.Parti;
    var OyOran;
    var LogoId;

    TurkiyeVeri.sort(function (a, b) {
        return b.Oy - a.Oy;
    });

    $("#Birinci_Turkiye").text(parseInt(TurkiyeVeri[0].Oy).toLocaleString());
    $("#Birinci_Millet").text(TurkiyeVeri[0].MilletVekiliSayisi);
    LogoId = (TurkiyeVeri[0].Oy == "0") ? "0" : TurkiyeVeri[0].No;
    $("#Birinci_Logo").attr("src", "../images/logo" + LogoId + ".png");
    OyOran = ((TurkiyeVeri[0].Oy * 100) / JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy).toFixed(2);
    OyOran = (OyOran >= 100) ? 100 : OyOran;
    OyOran = (JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy == "0") ? "0" : OyOran;
    $("#Birinci_Chart").html("<span id='cs-1' data-provide='circular' data-fill-color='" + PartiRenkler[TurkiyeVeri[0].No][1] + "' data-value='" + OyOran + "' data-radius='20' data-percent='true' data-thickness='7'></span>");

    $("#Ikinci_Turkiye").text(parseInt(TurkiyeVeri[1].Oy).toLocaleString());
    $("#Ikinci_Millet").text(TurkiyeVeri[1].MilletVekiliSayisi);
    LogoId = (TurkiyeVeri[1].Oy == "0") ? "0" : TurkiyeVeri[1].No;
    $("#Ikinci_Logo").attr("src", "../images/logo" + LogoId + ".png");
    OyOran = ((TurkiyeVeri[1].Oy * 100) / JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy).toFixed(2);
    OyOran = (OyOran >= 100) ? 100 : OyOran;
    OyOran = (JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy == "0") ? "0" : OyOran;
    $("#Ikinci_Chart").html("<span id='cs-1' data-provide='circular' data-fill-color='" + PartiRenkler[TurkiyeVeri[1].No][1] + "' data-value='" + OyOran + "' data-radius='20' data-percent='true' data-thickness='7'></span>");

    $("#Ucuncu_Turkiye").text(parseInt(TurkiyeVeri[2].Oy).toLocaleString());
    $("#Ucuncu_Millet").text(TurkiyeVeri[2].MilletVekiliSayisi);
    LogoId = (TurkiyeVeri[2].Oy == "0") ? "0" : TurkiyeVeri[2].No;
    $("#Ucuncu_Logo").attr("src", "../images/logo" + LogoId + ".png");
    OyOran = ((TurkiyeVeri[2].Oy * 100) / JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy).toFixed(2);
    OyOran = (OyOran >= 100) ? 100 : OyOran;
    OyOran = (JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy == "0") ? "0" : OyOran;
    $("#Ucuncu_Chart").html("<span id='cs-1' data-provide='circular' data-fill-color='" + PartiRenkler[TurkiyeVeri[2].No][1] + "' data-value='" + OyOran + "' data-radius='20' data-percent='true' data-thickness='7'></span>");

    $("#Dorduncu_Turkiye").text(parseInt(TurkiyeVeri[3].Oy).toLocaleString());
    $("#Dorduncu_Millet").text(TurkiyeVeri[3].MilletVekiliSayisi);
    LogoId = (TurkiyeVeri[3].Oy == "0") ? "0" : TurkiyeVeri[3].No;
    $("#Dorduncu_Logo").attr("src", "../images/logo" + LogoId + ".png");
    OyOran = ((TurkiyeVeri[3].Oy * 100) / JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy).toFixed(2);
    OyOran = (OyOran >= 100) ? 100 : OyOran;
    OyOran = (JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy == "0") ? "0" : OyOran;
    $("#Dorduncu_Chart").html("<span id='cs-1' data-provide='circular' data-fill-color='" + PartiRenkler[TurkiyeVeri[3].No][1] + "' data-value='" + OyOran + "' data-radius='20' data-percent='true' data-thickness='7'></span>");

    CanvasCizme("circular", "#F5F6F7");

    $(".DortParti,#UstBar > .kolon").animate({
        height: 'toggle'
    }, 700);
}

function HaritaVeri() {
    $.ajax({
        dataType: "json",
        url: "Handlers/HaritaVeri.ashx",
        data: {
            GumrukDahil: GumrukCheck
        },
        async: true,
        cache: true,
        success: function (data) {
            JsonVeriHarita = data;

            if (HaritaSeciliParti == "0") {
                TurkiyeHarita();
            }
            else {
                TurkiyeHaritaPartiyeGore(HaritaSeciliParti);
            }
        }
    });
}
var LegendsParti = [];
function TurkiyeHarita() {

    var previouscountyselected = 0;
    var past = null;
    var start = true;

    $("#map").empty();

    var sehirid = "";
    var obj;
    var arr = new Array();
    LegendsParti = [];

    r = Raphael('map');
    r.setViewBox(0, 110, 1020, 600);
    r.setSize('410', '235');

    $.each(JsonVeriHarita, function (a, b) {

        var county = paths[b.IlKod];
        obj = r.path(paths[b.IlKod].path);

        arr[obj.id] = b.IlKod;

        if (paths[b.IlKod].county != undefined) {

            var sehirid = b.IlKod;
            var nosu = paths[b.IlKod].county;
            var renk;

            renk = PartiRenkler[b.PartiKod][1];

            if (b.PartiKod != 0) {
                var pushData = { ad: PartiRenkler[b.PartiKod][0], renk: PartiRenkler[b.PartiKod][1], kod: b.PartiKod };

                if (b.PartiKod > 20) {

                    var Label1 = "BĞMSZ";

                    pushData.ad = Label1;
                }

                if (JSON.stringify(LegendsParti).indexOf(pushData.ad) < 0) {
                    LegendsParti.push(pushData);
                }


            }



            try {
                if (nosu.substring(0, 1) == "0") {
                    if (nosu.substring(1, 2) == b.IlKod) {
                        obj.node.id = 'Sehir' + nosu;
                        obj.attr({ "stroke-width": "1.1", fill: renk, stroke: "#ffffff", title: paths[b.IlKod].name.toString().toUpperCase() });
                        $("#Sehir" + nosu).attr({ test: renk });
                        $("#Sehir" + nosu).parent().attr({ "data-tooltip": paths[b.IlKod].name.toString().toUpperCase(), "class": "simptip-position-bottom" }).removeAttr("title");
                    }
                }
                else {
                    if (nosu == b.IlKod) {
                        obj.node.id = 'Sehir' + nosu;
                        obj.attr({ "stroke-width": "1.1", fill: renk, stroke: "#ffffff", title: paths[b.IlKod].name.toString().toUpperCase() });
                        $("#Sehir" + nosu).attr({ test: renk });
                        $("#Sehir" + nosu).parent().attr({ "data-tooltip": paths[b.IlKod].name.toString().toUpperCase(), "class": "simptip-position-bottom" }).removeAttr("title");
                    }
                }
            }
            catch (e) {

            }
        }
    });

    $("#haritaLegends").html("");

    $.each(LegendsParti, function (a, b) {
        $("#haritaLegends").append("<div><div style='background:" + b.renk + "' ></div><div>" + b.ad + "</div></div>");
    });

}


function TurkiyeHaritaPartiyeGore(PartiKod) {


    $("#map").empty();

    var sehirid = "";
    var obj;
    var arr = new Array();
    r = Raphael('map');
    r.setViewBox(0, 110, 1020, 600);
    r.setSize('750', '450');
    var x = 0;
    var renk;
    var EnyuksekOran = 0;

    $.each(JsonVeriGenel.AA.IlSonuclari.Il, function (a, b) {
        var GecerliOy = b.Sandik.GecerliOy;
        for (var i = 0; i < b.Sonuclar.Parti.length; i++) {
            if (b.Sonuclar.Parti[i].No == PartiKod) {
                var Oran = parseInt(b.Sonuclar.Parti[i].Oy) / GecerliOy;
                EnyuksekOran = EnyuksekOran < Oran ? Oran : EnyuksekOran;
                break;
            }


        }

    });

    $.each(JsonVeriGenel.AA.IlSonuclari.Il, function (a, b) {

        var Sonuclar = b.Sonuclar.Parti;
        var GecerliOy = b.Sandik.GecerliOy;
        Sonuclar.sort(function (x, y) {
            return parseInt(y.Oy) - parseInt(x.Oy);
        });
        var fillOpacity = 1;
        for (var i = 0; i < Sonuclar.length; i++) {
            if (Sonuclar[i].No == PartiKod) {
                fillOpacity = (parseInt(Sonuclar[i].Oy) / GecerliOy) / EnyuksekOran;

                break;
            }

        }


        var county = paths[b.Kod];
        obj = r.path(paths[b.Kod].path);
        arr[obj.id] = b.Kod;

        if (paths[b.Kod].county != undefined) {
            paths[b.Kod].IDLERI = x;
            var sehirid = b.Kod;
            var nosu = paths[b.Kod].county;

            renk = PartiRenkler[PartiKod][1];



            try {
                if (nosu.substring(0, 1) == "0") {
                    if (nosu.substring(1, 2) == b.Kod) {
                        obj.node.id = 'Sehir' + nosu;
                        obj.attr({ "stroke-width": "1.1", fill: renk, stroke: "#ffffff", title: paths[b.Kod].name.toString().toUpperCase(), "fill-opacity": fillOpacity });
                        $("#Sehir" + nosu).attr({ test: renk });
                        // $("#Sehir" + nosu).parent().attr({ "data-tooltip": paths[b.IlKod].name.toString().toUpperCase(), "class": "simptip-position-bottom" }).removeAttr("title");
                        $("#Sehir" + nosu).parent().removeAttr("title");
                    }
                }
                else {
                    if (nosu == b.Kod) {
                        obj.node.id = 'Sehir' + nosu;
                        obj.attr({ "stroke-width": "1.1", fill: renk, stroke: "#ffffff", title: paths[b.Kod].name.toString().toUpperCase(), "fill-opacity": fillOpacity });
                        $("#Sehir" + nosu).attr({ test: renk });
                        //  $("#Sehir" + nosu).parent().attr({ "data-tooltip": paths[b.IlKod].name.toString().toUpperCase(), "class": "simptip-position-bottom" }).removeAttr("title");
                        $("#Sehir" + nosu).parent().removeAttr("title");
                    }
                }
            }
            catch (e) {

            }
        }



        x++;
    });







}

var klavyeDegeri = "";
var selectedTarih = 0;
var chartCursor = new AmCharts.ChartCursor();

function key(e) {

    //console.log(e.keyCode);

    if (e.keyCode == 37) {
        switch (selectedTarih) {
            case 0:
                chartCursor.showCursorAt(2015);
                selectedTarih = 2015;
                break;
            case 2015:
                chartCursor.showCursorAt(2011);
                selectedTarih = 2011;
                break;
            case 2011:
                chartCursor.showCursorAt(2007);
                selectedTarih = 2007;
                break;
            case 2007:
                chartCursor.showCursorAt(2002);
                selectedTarih = 2002;
                break;
        }
    }
    else if (e.keyCode == 39) {
        switch (selectedTarih) {
            case 0:
                chartCursor.showCursorAt(2002);
                selectedTarih = 2002;
                break;
            case 2002:
                chartCursor.showCursorAt(2007);
                selectedTarih = 2007;
                break;
            case 2007:
                chartCursor.showCursorAt(2011);
                selectedTarih = 2011;
                break;
            case 2011:
                chartCursor.showCursorAt(2015);
                selectedTarih = 2015;
                break;
        }
    }
    else if (e.keyCode == 13) {

        if (klavyeDegeri.indexOf("72") >= 0) { // H Harita

            $("#CoktanSecmeli").hide();
            $("#Harita").show();
            $("#Menu").hide();
            $("#Grafik").css("visibility", "hidden");

            HaritaSeciliParti = "0";
            TurkiyeHarita();

        }
        else if (klavyeDegeri.indexOf("77") >= 0) { // M Menü

            $("#CoktanSecmeli").hide();
            $("#Harita").hide();
            $("#Menu").show();
            $("#Grafik").css("visibility", "hidden");

        }
        else if (klavyeDegeri.indexOf("71") >= 0) { // G Grafik

            $("#CoktanSecmeli").hide();
            $("#Harita").hide();
            $("#Menu").hide();
            $("#Grafik").css("visibility", "visible");

        }
        else if (klavyeDegeri.indexOf("75") >= 0) { // K Çoktan seçmeli şehirler

            $("#CoktanSecmeli").show();
            $("#Harita").hide();
            $("#Menu").hide();
            $("#Grafik").css("visibility", "hidden");

        }
        else if (klavyeDegeri.indexOf("89") >= 0) { // Harita renklendirme // Y1 Y2 Y3 PARTİLER Y0

            var aaa = klavyeDegeri.split(';')[1];

            var bbb = ((aaa == "96") ? "48" :
                ((aaa == "97") ? "49" :
                ((aaa == "98") ? "50" :
                ((aaa == "99") ? "51" :
                ((aaa == "100") ? "52" :
                ((aaa == "101") ? "53" :
                ((aaa == "102") ? "54" :
                ((aaa == "103") ? "55" :
                ((aaa == "104") ? "56" :
                ((aaa == "105") ? "57" : aaa))))))))));

            var PartiSira = parseInt(String.fromCharCode(bbb)) - 1;

            if (PartiSira == -1) {
                HaritaSeciliParti = "0";
                TurkiyeHarita();
            }
            else if (PartiSira < LegendsParti.length) {
                HaritaSeciliParti = LegendsParti[PartiSira].kod;
                TurkiyeHaritaPartiyeGore(LegendsParti[PartiSira].kod);
            }

        }
        else if (klavyeDegeri.indexOf("80") >= 0) { // GRAFİK il seçim // P1, P2, P3, P601, P602
            if ($("#Grafik").css("display") != "none") {


                var a = "";
                a = klavyeDegeri.split(";");
                var c = "";

                for (var i = 1; i < a.length; i++) { // P ' den sonraki rakamları alıyoruz - integer olarak yazıyoruz

                    var d = a[i];

                    d = ((d == "96") ? "48" :
                        ((d == "97") ? "49" :
                        ((d == "98") ? "50" :
                        ((d == "99") ? "51" :
                        ((d == "100") ? "52" :
                        ((d == "101") ? "53" :
                        ((d == "102") ? "54" :
                        ((d == "103") ? "55" :
                        ((d == "104") ? "56" :
                        ((d == "105") ? "57" : d))))))))));

                    c += String.fromCharCode(d);
                }

                var b = parseInt(c);

                if ((b >= 0 && b <= 81 && b != 6 && b != 34 && b != 35) || (b == 601) || (b == 602) || (b == 341) || (b == 342) || (b == 343) || (b == 351) || (b == 352)) {

                    console.log("Grafik Seçim : " + b);

                    GrafikSeciliIl = b;

                    $("#SehirlerGrafik > option").removeAttr("selected");
                    $("#SehirlerGrafik > option[value='" + GrafikSeciliIl + "'").attr("selected", "selected");

                    LineChart();
                }
                else {
                    console.log("Grafik Hatalı id : " + b);
                }
            }
        }
        else if (klavyeDegeri.indexOf("84") >= 0) { // GRAFİK TEKRAR ETSİN // T

            clearInterval(ChartRoundTime);
            ChartRoundTime = setInterval(function () {
                RoundLineChart();
            }, 20000);
            console.log("Grafik Tekrar Etsin");

        }
        else if (klavyeDegeri.indexOf("85") >= 0) { // GRAFİK TEKRAR DURSUN // U

            clearInterval(ChartRoundTime);
            console.log("Grafik Tekrar Dursun");

        }
        else if (klavyeDegeri.indexOf("65") >= 0) { // A Harfi - A1, A2, A3, A601, A602

            var a = "";

            a = klavyeDegeri.split(";");

            var c = "";

            for (var i = 1; i < a.length; i++) { // A' dan sonra olan rakamlara bakıyoruz

                var d = a[i];

                d = ((d == "96") ? "48" :
                    ((d == "97") ? "49" :
                    ((d == "98") ? "50" :
                    ((d == "99") ? "51" :
                    ((d == "100") ? "52" :
                    ((d == "101") ? "53" :
                    ((d == "102") ? "54" :
                    ((d == "103") ? "55" :
                    ((d == "104") ? "56" :
                    ((d == "105") ? "57" : d))))))))));

                c += String.fromCharCode(d);

            }

            var b = parseInt(c);

            if ((b >= 1 && b <= 81 && b != 6 && b != 34 && b != 35) || (b == 601) || (b == 602) || (b == 341) || (b == 342) || (b == 343) || (b == 351) || (b == 352)) {

                console.log("Footer Seçim : " + b);

                //clearInterval(FooterRoundTime);

                SeciliIl = b;
                SecimSeviye = "1";

                $("#Sehirler > option").removeAttr("selected");
                $("#Sehirler > option[value='" + SeciliIl + "'").attr("selected", "selected");

                SehirVeri();
                FooterDatalar();
            }
            else {
                console.log("Footer Hatalı id : " + b);
            }

        }
        else if (klavyeDegeri.indexOf("68") >= 0) { // FOOTER TEKRAR ETSİN // D

            if ($("#IlIlceRound").prop('checked') != true) {
                $("#IlIlceRound").click();
                console.log("Footer Tekrar Etsin");
            }

        }
        else if (klavyeDegeri.indexOf("83") >= 0) { // FOOTER TEKRAR DURSUN // S

            if ($("#IlIlceRound").prop('checked') == true) {
                clearInterval(FooterRoundTime);
                $("#IlIlceRound").click();
                console.log("Footer Tekrar Dursun");
            }
        }

        klavyeDegeri = "";
    }
    else {
        klavyeDegeri += e.keyCode.toString() + ';';
    }

    //console.log("Klavye Code Değeri  : " + klavyeDegeri);
}

var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

function LineChart() {

    var lineGecerliOy;
    var chart;
    var chartData = [];
    var PartilerListe = [];

    var BirinciId, IkinciId, UcuncuId, DorduncuId;

    var Birinci_2002 = 1, Ikinci_2002 = 1, Ucuncu_2002 = 1, Dorduncu_2002 = 1;
    var Birinci_2007 = 1, Ikinci_2007 = 1, Ucuncu_2007 = 1, Dorduncu_2007 = 1;
    var Birinci_2011 = 1, Ikinci_2011 = 1, Ucuncu_2011 = 1, Dorduncu_2011 = 1;
    var Birinci_2015 = 1, Ikinci_2015 = 1, Ucuncu_2015 = 1, Dorduncu_2015 = 1;

    if (GrafikSeciliIl == "0") {

        lineGecerliOy = JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy;

        $.each(JsonVeriGenel.AA.TurkiyeGeneli.Sonuclar.Parti, function (a, b) {
            PartilerListe.push({
                No: b.No,
                Adi: b.Adi,
                Oy: b.Oy,
                MilletVekiliSayisi: b.MilletVekiliSayisi
            });
        });

        $("#GrafikTitle").text("");
        $("#GrafikTitle").text("TÜRKİYE");
    }
    else {
        $.each(JsonVeriGenel.AA.IlSonuclari.Il, function (a, b) {
            if (parseInt(b.Kod) == GrafikSeciliIl) {

                lineGecerliOy = b.Sandik.GecerliOy;

                $.each(b.Sonuclar.Parti, function (a, b) {
                    PartilerListe.push({
                        No: b.No,
                        Adi: b.Adi,
                        Oy: b.Oy,
                        MilletVekiliSayisi: b.MilletVekiliSayisi
                    });
                });

                $("#GrafikTitle").text("");
                $("#GrafikTitle").text(b.Ad.toUpperCase());
            }
        });
    }

    PartilerListe.sort(function (a, b) {
        return b.Oy - a.Oy;
    });

    Birinci_2015 = ((PartilerListe[0].Oy * 100) / lineGecerliOy).toFixed(2);
    Ikinci_2015 = ((PartilerListe[1].Oy * 100) / lineGecerliOy).toFixed(2);
    Ucuncu_2015 = ((PartilerListe[2].Oy * 100) / lineGecerliOy).toFixed(2);
    Dorduncu_2015 = ((PartilerListe[3].Oy * 100) / lineGecerliOy).toFixed(2);

    BirinciId = PartilerListe[0].No;
    IkinciId = PartilerListe[1].No;
    UcuncuId = PartilerListe[2].No;
    DorduncuId = PartilerListe[3].No;

    $.getJSON("js/EskiSecim_v8.json", function (data) {

        $.each(data.aaaa.Secim, function (a, b) {
            if (b.IlBolgeID == GrafikSeciliIl) {
                Birinci_2002 = parseFloat(b[BirinciId + "_O"].replace(',', '.')).toFixed(2);
                Ikinci_2002 = parseFloat(b[IkinciId + "_O"].replace(',', '.')).toFixed(2);
                Ucuncu_2002 = parseFloat(b[UcuncuId + "_O"].replace(',', '.')).toFixed(2);
                Dorduncu_2002 = parseFloat(b[DorduncuId + "_O"].replace(',', '.')).toFixed(2);
            }
        });

        $.each(data.bbbb.Secim, function (a, b) {
            if (b.IlBolgeID == GrafikSeciliIl) {
                Birinci_2007 = parseFloat(b[BirinciId + "_O"].replace(',', '.')).toFixed(2);
                Ikinci_2007 = parseFloat(b[IkinciId + "_O"].replace(',', '.')).toFixed(2);
                Ucuncu_2007 = parseFloat(b[UcuncuId + "_O"].replace(',', '.')).toFixed(2);
                Dorduncu_2007 = parseFloat(b[DorduncuId + "_O"].replace(',', '.')).toFixed(2);
            }
        });

        $.each(data.cccc.Secim, function (a, b) {
            if (b.IlBolgeID == GrafikSeciliIl) {
                Birinci_2011 = parseFloat(b[BirinciId + "_O"].replace(',', '.')).toFixed(2);
                Ikinci_2011 = parseFloat(b[IkinciId + "_O"].replace(',', '.')).toFixed(2);
                Ucuncu_2011 = parseFloat(b[UcuncuId + "_O"].replace(',', '.')).toFixed(2);
                Dorduncu_2011 = parseFloat(b[DorduncuId + "_O"].replace(',', '.')).toFixed(2);
            }
        });

        chartData.push({
            date: 2002,
            BIR: Birinci_2002,
            IKI: Ikinci_2002,
            UC: Ucuncu_2002,
            DORT: Dorduncu_2002
        });

        chartData.push({
            date: 2007,
            BIR: Birinci_2007,
            IKI: Ikinci_2007,
            UC: Ucuncu_2007,
            DORT: Dorduncu_2007
        });

        chartData.push({
            date: 2011,
            BIR: Birinci_2011,
            IKI: Ikinci_2011,
            UC: Ucuncu_2011,
            DORT: Dorduncu_2011
        });

        chartData.push({
            date: 2015,
            BIR: Birinci_2015,
            IKI: Ikinci_2015,
            UC: Ucuncu_2015,
            DORT: Dorduncu_2015
        });

        // SERIAL CHART
        chart = new AmCharts.AmSerialChart();
        chart.dataProvider = chartData;
        chart.categoryField = "date";
        // AXES
        var categoryAxis = chart.categoryAxis;
        categoryAxis.axisColor = "#DADADA";

        // first value axis (on the left)
        var valueAxis1 = new AmCharts.ValueAxis();
        valueAxis1.axisColor = "white";
        valueAxis1.axisThickness = 3;
        valueAxis1.gridAlpha = 0.1;
        valueAxis1.gridCount = 8;
        valueAxis1.autoGridCount = false;
        chart.addValueAxis(valueAxis1);

        // 1.Parti
        var line1 = new AmCharts.AmGraph();
        line1.valueAxis = valueAxis1; // we have to indicate which value axis should be used
        line1.title = PartiRenkler[BirinciId][0];
        line1.lineColor = PartiRenkler[BirinciId][1];
        line1.valueField = "BIR";
        line1.bullet = "round"; // square , triangleUp , round
        line1.hideBulletsCount = 30;
        line1.bulletBorderThickness = 1;
        chart.addGraph(line1);

        // 2.Parti
        var line2 = new AmCharts.AmGraph();
        line2.valueAxis = valueAxis1; // we have to indicate which value axis should be used
        line2.title = PartiRenkler[IkinciId][0];
        line2.lineColor = PartiRenkler[IkinciId][1];
        line2.valueField = "IKI";
        line2.bullet = "round";
        line2.hideBulletsCount = 30;
        line2.bulletBorderThickness = 1;
        chart.addGraph(line2);

        // 3.Parti
        var line3 = new AmCharts.AmGraph();
        line3.valueAxis = valueAxis1; // we have to indicate which value axis should be used
        line3.valueField = "UC";
        line3.title = PartiRenkler[UcuncuId][0];
        line3.lineColor = PartiRenkler[UcuncuId][1];
        line3.bullet = "round";
        line3.hideBulletsCount = 30;
        line3.bulletBorderThickness = 1;
        chart.addGraph(line3);

        // 4.Parti
        var line4 = new AmCharts.AmGraph();
        line4.valueAxis = valueAxis1; // we have to indicate which value axis should be used
        line4.valueField = "DORT";
        line4.title = PartiRenkler[DorduncuId][0];
        line4.lineColor = PartiRenkler[DorduncuId][1];
        line4.bullet = "round";
        line4.hideBulletsCount = 30;
        line4.bulletBorderThickness = 1;
        chart.addGraph(line4);

        // CURSOR
        chartCursor.cursorAlpha = 0.1;
        chartCursor.fullWidth = true;
        chartCursor.selectWithoutZooming = true;
        chart.addChartCursor(chartCursor);

        // LEGEND
        var legend = new AmCharts.AmLegend();
        legend.marginLeft = 20;
        chart.addLegend(legend);

        // WRITE
        chart.write("lineChartDiv");
    });
}

function RoundSehirIlce() {

    var a = "";
    var b = "";

    if ($("#IlIlceRound").prop('checked') == true) {

        if (SecimSeviye == "1") { // il
            a = $("#Sehirler > option:selected").val();

            if (a == "67") { // son option zonguldak
                SeciliIl = "1";
                $("#Sehirler > option").removeAttr("selected");
                $("#Sehirler > option[value='" + SeciliIl + "'").attr("selected", "selected");
                SehirVeri();
                FooterDatalar();
            }
            else { // bir sonrakini gönderiyoruz
                SeciliIl = $("#Sehirler > option[value='" + a + "']").next().val();
                $("#Sehirler > option").removeAttr("selected");
                $("#Sehirler > option[value='" + SeciliIl + "'").attr("selected", "selected");
                SehirVeri();
                FooterDatalar();
            }
        }
        else if (SecimSeviye == "2") { // ilçe

            a = $("#Ilceler > option:selected").val();

            if ($('#Ilceler option:last-child').val() == $("#Ilceler > option:selected").val()) { // son option

                SeciliIlce = $('#Ilceler option:first').val();

                $("#Ilceler > option").removeAttr("selected");
                $("#Ilceler > option[value='" + SeciliIlce + "'").attr("selected", "selected");
                FooterDatalar();
            }
            else { // bir sonraki
                SeciliIlce = $("#Ilceler > option[value='" + a + "']").next().val();
                $("#Ilceler > option").removeAttr("selected");
                $("#Ilceler > option[value='" + SeciliIlce + "'").attr("selected", "selected");
                FooterDatalar();
            }
        }
    }
}

function RoundLineChart() {
    a = $("#SehirlerGrafik > option:selected").val();

    if (a == "67") { // son option zonguldak
        GrafikSeciliIl = "1";
        $("#SehirlerGrafik > option").removeAttr("selected");
        $("#SehirlerGrafik > option[value='" + GrafikSeciliIl + "'").attr("selected", "selected");
        LineChart();
    }
    else { // bir sonrakini gönderiyoruz
        GrafikSeciliIl = $("#SehirlerGrafik > option[value='" + a + "']").next().val();
        $("#SehirlerGrafik > option").removeAttr("selected");
        $("#SehirlerGrafik > option[value='" + GrafikSeciliIl + "'").attr("selected", "selected");
        LineChart();
    }
}

function RoundCoktanSehir() {
    a = $("#SecilmisIller > option:selected").val();

    if ($("#SecilmisIller > option:last").val() == a) {

        SeciliIl = $("#SecilmisIller > option:first").val();
        $("#SecilmisIller > option").removeAttr("selected");
        $("#SecilmisIller > option[value='" + SeciliIl + "'").attr("selected", "selected");
        FooterDatalar();
    }
    else {

        SeciliIl = $("#SecilmisIller > option[value='" + a + "']").next().val();
        $("#SecilmisIller > option").removeAttr("selected");
        $("#SecilmisIller > option[value='" + SeciliIl + "'").attr("selected", "selected");
        FooterDatalar();
    }
}

function FooterDatalar() {

    $("#CircularOrani2").html("");
    $("#CircularOrani2").prepend("<span class='AcilanSandikLokasyon Renklendirme1' data-provide='circular3' data-fill-color='#1C5BE5' data-value='" + DonguOran + "' data-radius='25' data-percent='true' data-thickness='10'></span>")

    CanvasCizme("circular3", SeciliArkaPlan);

    $("#LokasyonAdi2").text($("#LokasyonAdi").text());

    $("#ililcetoplamsandiksayi2").text($("#ililcetoplamsandiksayi").text());
    $("#ililcetoplamsecmensayi2").text($("#ililcetoplamsecmensayi").text());
    $("#ililceacilansandiksayi2").text($("#ililceacilansandiksayi").text());
    $("#ililcekullanilanoy2").text($("#ililcekullanilanoy").text());
    $("#ililceacilansandikorani2").text($("#ililceacilansandikorani").text());
    $("#ililcegecerlioy2").text($("#ililcegecerlioy").text());

    $("#Birinci_Sonuc2 > .footerSonuc").text($("#Birinci_Sonuc > .footerSonuc").text());
    $("#Ikinci_Sonuc2 > .footerSonuc").text($("#Ikinci_Sonuc > .footerSonuc").text());
    $("#Ucuncu_Sonuc2 > .footerSonuc").text($("#Ucuncu_Sonuc > .footerSonuc").text());
    $("#Dorduncu_Sonuc2 > .footerSonuc").text($("#Dorduncu_Sonuc > .footerSonuc").text());
    $("#Besinci_Sonuc2 > .footerSonuc").text($("#Besinci_Sonuc > .footerSonuc").text());

    $("#Birinci_M2").text($("#Birinci_M").text());
    $("#Ikinci_M2").text($("#Ikinci_M").text());
    $("#Ucuncu_M2").text($("#Ucuncu_M").text());
    $("#Dorduncu_M2").text($("#Dorduncu_M").text());
    $("#Besinci_M2").text($("#Besinci_M").text());

    $("#Birinci_Footer_Logo2").attr("src", $("#Birinci_Footer_Logo").attr("src"));
    $("#Ikinci_Footer_Logo2").attr("src", $("#Ikinci_Footer_Logo").attr("src"));
    $("#Ucuncu_Footer_Logo2").attr("src", $("#Ucuncu_Footer_Logo").attr("src"));
    $("#Dorduncu_Footer_Logo2").attr("src", $("#Dorduncu_Footer_Logo").attr("src"));
    $("#Besinci_Footer_Logo2").attr("src", $("#Besinci_Footer_Logo").attr("src"));

    $(".footer").animate(
    {
        "left": "-=720px"
    }, 0);

    if (SeciliIlce == "000") {
        SecimSeviye = "1";
    }

    var OranDeger;

    if (SecimSeviye == "1") { // il
        $.each(JsonVeriGenel.AA.IlSonuclari.Il, function (a, b) {

            if (b.Kod == SeciliIl) {

                $("#LokasyonAdi").text(b.Ad.toUpperCase());

                $(".MilletSayisi").show();

                var ToplamOyYuzdeIcin = b.Sandik.GecerliOy;
                var AcilanSandikOran = ((b.Sandik.AcilanSandik * 100) / b.Sandik.ToplamSandik).toFixed(2);

                AcilanSandikOran = (AcilanSandikOran >= 100) ? 100 : AcilanSandikOran;

                $("#CircularOrani1").html("");
                $("#CircularOrani1").prepend("<span class='AcilanSandikLokasyon Renklendirme1' data-provide='circular2' data-fill-color='#1C5BE5' data-value='" + AcilanSandikOran + "' data-radius='25' data-percent='true' data-thickness='10'></span>")

                DonguOran = AcilanSandikOran;

                $("#ililcetoplamsandiksayi").text(parseInt(b.Sandik.ToplamSandik).toLocaleString());
                $("#ililceacilansandiksayi").text(parseInt(b.Sandik.AcilanSandik).toLocaleString());
                $("#ililcetoplamsecmensayi").text(parseInt(b.Sandik.ToplamSecmen).toLocaleString());
                $("#ililcekullanilanoy").text(parseInt(b.Sandik.KullanilanOy).toLocaleString());
                $("#ililceacilansandikorani").text("% " + AcilanSandikOran);
                $("#ililcegecerlioy").text(parseInt(b.Sandik.GecerliOy).toLocaleString());

                var SeciliBolgeVeri = b.Sonuclar.Parti;
                var LogoId;
                var count = 0;
                var DivAdi = "";
                var ilkDortToplam = 0.00;

                var OyOran2 = 0;
                var DigerOy = 0;
                var DigerMSayi = 0;

                SeciliBolgeVeri.sort(function (a, b) {
                    return b.Oy - a.Oy;
                });

                $("#AltKisimDiv").html("");

                for (var i = 0; i < SeciliBolgeVeri.length; i++) {

                    if (count < 4 && SeciliBolgeVeri[i].No != "0") {

                        if (SeciliBolgeVeri[i].Oy != "0" && count < 5) {

                            switch (count) {
                                case 0:
                                    DivAdi = "Birinci";
                                    break;

                                case 1:
                                    DivAdi = "Ikinci";
                                    break;

                                case 2:
                                    DivAdi = "Ucuncu";
                                    break;

                                case 3:
                                    DivAdi = "Dorduncu";
                                    break;

                                case 4:
                                    DivAdi = "Besinci";
                                    break;
                            }

                            if (SeciliBolgeVeri[i].Oy != "0") {

                                OranDeger = ((SeciliBolgeVeri[i].Oy * 100) / ToplamOyYuzdeIcin).toFixed(2);
                                OranDeger = (OranDeger >= 100) ? 100 : OranDeger;
                                OranDeger = (ToplamOyYuzdeIcin == "0") ? "0.00" : OranDeger;

                                LogoId = (SeciliBolgeVeri[i].Oy == "0") ? "0" : SeciliBolgeVeri[i].No;
                                LogoId = (parseInt(LogoId) > 20) ? 21 : LogoId;
                                ilkDortToplam += parseFloat(OranDeger);

                                $("#AltKisimDiv").append(
                                    "<div class='footerParti' id='" + DivAdi + "_Sonuc'>" +
                                    "<div><img id='" + DivAdi + "_Footer_Logo' src='../images/logo" + LogoId + ".png'></div>" +
                                    "<div class='footerSonuc Renklendirme1'>% " + OranDeger + "</div>" +
                                    "<div class='MilletSayisi Renklendirme1'>Milletvekili :<span id='" + DivAdi + "_M'>" + SeciliBolgeVeri[count].MilletVekiliSayisi + "</span></div>" +
                                    "</div>"
                                    );

                                count++;

                            }
                        }
                        else {
                            DigerMSayi += parseInt(SeciliBolgeVeri[i].MilletVekiliSayisi);
                            DigerOy += parseInt(SeciliBolgeVeri[i].Oy);
                        }
                    }
                }

                OyOran2 = (100 - ilkDortToplam).toFixed(2);
                OyOran2 = (OyOran2 >= 100) ? 100 : OyOran2;
                OyOran2 = (ToplamOyYuzdeIcin == "0") ? "0" : OyOran2;

                if (OyOran2 != "0" && OyOran2 != "0.00") {

                    DivAdi = "Besinci";

                    $("#AltKisimDiv").append(

                                "<div class='footerParti' id='" + DivAdi + "_Sonuc'>" +
                                "<div><img id='" + DivAdi + "_Footer_Logo' src='../images/logo0.png'></div>" +
                                "<div class='footerSonuc Renklendirme1'>% " + OyOran2 + "</div>" +
                                "<div class='MilletSayisi Renklendirme1'>Milletvekili :<span id='" + DivAdi + "_M'>" + DigerMSayi + "</span></div>" +
                                "</div>"

                                );

                }

                CanvasCizme("circular2", SeciliArkaPlan);
            }
        });
    }
    else if (SecimSeviye == "2") { // ilçe
        $.each(JsonVeriIl.Il.Ilce, function (a, b) {

            if (b.Kod == SeciliIlce) {

                $("#LokasyonAdi").text(JsonVeriIl.Il.Ad.toUpperCase() + " / " + b.Ad.toUpperCase());

                $(".MilletSayisi").hide();

                var ToplamOyYuzdeIcin = b.Sandik.GecerliOy;
                var AcilanSandikOran = ((b.Sandik.AcilanSandik * 100) / b.Sandik.ToplamSandik).toFixed(2);

                AcilanSandikOran = (AcilanSandikOran >= 100) ? 100 : AcilanSandikOran;

                DonguOran = AcilanSandikOran;

                $("#CircularOrani1").html("");
                $("#CircularOrani1").prepend("<span class='AcilanSandikLokasyon Renklendirme1' data-provide='circular2' data-fill-color='#1C5BE5' data-value='" + AcilanSandikOran + "' data-radius='25' data-percent='true' data-thickness='10'></span>")

                $("#ililcetoplamsandiksayi").text(parseInt(b.Sandik.ToplamSandik).toLocaleString());
                $("#ililceacilansandiksayi").text(parseInt(b.Sandik.AcilanSandik).toLocaleString());
                $("#ililcetoplamsecmensayi").text(parseInt(b.Sandik.ToplamSecmen).toLocaleString());
                $("#ililcekullanilanoy").text(parseInt(b.Sandik.KullanilanOy).toLocaleString());
                $("#ililceacilansandikorani").text("% " + AcilanSandikOran);
                $("#ililcegecerlioy").text(parseInt(b.Sandik.GecerliOy).toLocaleString());

                var SeciliBolgeVeri = b.Sonuclar.Parti;
                var LogoId;
                var count = 0;
                var DivAdi = "";
                var ilkDortToplam = 0.00;

                var OyOran2 = 0;
                var DigerOy = 0;
                var DigerMSayi = 0;

                SeciliBolgeVeri.sort(function (a, b) {
                    return b.Oy - a.Oy;
                });

                $("#AltKisimDiv").html("");

                for (var i = 0; i < SeciliBolgeVeri.length; i++) {

                    if (count < 4 && SeciliBolgeVeri[i].No != "0") {

                        if (SeciliBolgeVeri[i].Oy != "0" && count < 5) {

                            switch (count) {
                                case 0:
                                    DivAdi = "Birinci";
                                    break;

                                case 1:
                                    DivAdi = "Ikinci";
                                    break;

                                case 2:
                                    DivAdi = "Ucuncu";
                                    break;

                                case 3:
                                    DivAdi = "Dorduncu";
                                    break;

                            }

                            if (SeciliBolgeVeri[i].Oy != "0") {

                                OranDeger = ((SeciliBolgeVeri[i].Oy * 100) / ToplamOyYuzdeIcin).toFixed(2);
                                OranDeger = (OranDeger >= 100) ? 100 : OranDeger;
                                OranDeger = (ToplamOyYuzdeIcin == "0") ? "0.00" : OranDeger;

                                LogoId = (SeciliBolgeVeri[i].Oy == "0") ? "0" : SeciliBolgeVeri[i].No;
                                LogoId = (parseInt(LogoId) > 20) ? 21 : LogoId;
                                ilkDortToplam += parseFloat(OranDeger);

                                $("#AltKisimDiv").append(
                                    "<div class='footerParti' id='" + DivAdi + "_Sonuc'>" +
                                    "<div><img id='" + DivAdi + "_Footer_Logo' src='../images/logo" + LogoId + ".png'></div>" +
                                    "<div class='footerSonuc Renklendirme1'>% " + OranDeger + "</div>" +
                                    "</div>"
                                    );

                                count++;

                            }
                        }
                        else {
                            DigerMSayi += parseInt(SeciliBolgeVeri[i].MilletVekiliSayisi);
                            DigerOy += parseInt(SeciliBolgeVeri[i].Oy);
                        }
                    }
                }

                OyOran2 = (100 - ilkDortToplam).toFixed(2);
                OyOran2 = (OyOran2 >= 100) ? 100 : OyOran2;
                OyOran2 = (ToplamOyYuzdeIcin == "0") ? "0" : OyOran2;

                if (OyOran2 != "0" && OyOran2 != "0.00") {

                    DivAdi = "Besinci";

                    $("#AltKisimDiv").append(

                                "<div class='footerParti' id='" + DivAdi + "_Sonuc'>" +
                                "<div><img id='" + DivAdi + "_Footer_Logo' src='../images/logo0.png'></div>" +
                                "<div class='footerSonuc Renklendirme1'>% " + OyOran2 + "</div>" +
                                "</div>"

                                );

                }

                CanvasCizme("circular2", SeciliArkaPlan);
            }
        });
    }

    if (SeciliIlce == "000") {
        SecimSeviye = "2";
    }

    $(".footer").animate(
    {
        "left": "+=720px"
    }, 1000);

}

function CanvasCizme(Deger, centerFillRenk) {

    if (centerFillRenk == "bos") {
        centerFillRenk = "rgb(64, 64, 65)";
    }

    ; (function (c, d, j, e) {
        function h(b, a) {
            arguments.length && this._init(b, a)
        }
        h.prototype = {
            defaults: {
                percent: !0,
                value: 0,
                maxValue: 100,
                radius: 32,
                thickness: 6,
                backFillColor: "rgb(199, 199, 199)",
                fillColor: "#e15656",
                centerFillColor: centerFillRenk,
                decimals: 0,
                retinaReady: !0
            }, _init: function (b, a) {
                this.element = c(b);
                this.options = c.extend({},
                    this.defaults,
                    a, this.element.data());
                this.canvas = this._build();
                this._draw(this._prepareCanvas(this.canvas))
            }, _build: function () {
                var b = c("<span></span>"), a = j.createElement("canvas");
                this.element.append(b.clone().addClass("digit-container")).append(b.clone().addClass("canvas-container").append(c(a))).addClass("circular-stat");
                if (!a.getContext)
                    if ("undefined" !== typeof d.G_vmlCanvasManager)
                        a = d.G_vmlCanvasManager.initElement(a);
                    else
                        return console.log("Your browser does not support HTML5 Canvas, or excanvas.js is missing on IE"), this.element.hide(), !1;
                return a
            }, _getPixelRatio: function (b) {
                return (d.devicePixelRatio || 1) / (b.webkitBackingStorePixelRatio ||
                    b.mozBackingStorePixelRatio || b.msBackingStorePixelRatio ||
                    b.oBackingStorePixelRatio || b.backingStorePixelRatio || 1)
            }, _prepareCanvas: function (b) {
                var a = 2 * this.options.radius, c = b.getContext("2d"),
                c = this._getPixelRatio(c);
                b.width = b.height = a * c;
                1 < c && (b.style.width = a + "px", b.style.height = a + "px");
                return b
            }, _draw: function (b) {

                var a = b.getContext("2d"),
                    i = this._getPixelRatio(a),
                    f = 2 * (this.options.value / this.options.maxValue) * Math.PI,
                    k = b.width / 2, g = b.height / 2,
                    d = this.options.radius;

                if (Deger == "circular") {
                    var e = (parseInt(this._getVal()) != 100) ? this._getVal().toFixed(2) : this._getVal();
                }
                else {
                    var e = (parseInt(this._getVal()) != 100) ? this._getVal().toFixed(2) : this._getVal();
                }

                a.save(); a.clearRect(0, 0, b.width, b.height);
                a.translate(k, g);
                a.scale(i, i);
                a.rotate(-Math.PI / 2);
                a.fillStyle = this.options.backFillColor;
                a.beginPath(); a.arc(0, 0, d, 0, 2 * Math.PI, !1);
                a.closePath();
                a.fill(); a.fillStyle = this.options.fillColor;
                a.beginPath();
                a.arc(0, 0, d, 0, f, !1);
                a.lineTo(0, 0);
                a.closePath();
                a.fill();
                a.fillStyle = this.options.centerFillColor;
                a.beginPath();
                a.arc(0, 0, d - this.options.thickness, 0, 2 * Math.PI, !1);
                a.closePath();
                a.fill();
                a.restore();

                c(".digit-container", this.element).css({
                    lineHeight: 2 * this.options.radius + "px"
                })[0].innerHTML = this.options.percent ? "<span>%" + e + "</span>" : "<span>" + e + "</span>/" + this.options.maxValue.toFixed(this.options.decimals)

            }, _getVal: function () {
                return this.options.percent ?
                100 * (this.options.value / this.options.maxValue) : this.options.value
            }, option: function (b, a) {
                if (0 === arguments.length) return c.extend({}, this.options);
                if ("string" === typeof b) {
                    if (a === e) return this.options[b];
                    switch (b) {
                        case "value": a = Math.max(0, Math.min(a, this.options.maxValue))
                    }
                    this.options[b] = a;
                    this._draw("radius" === b ? this._prepareCanvas(this.canvas) : this.canvas)
                }
                return this
            }
        };

        c.fn.circularStat = function (b) {
            var a = "string" === typeof b, d = Array.prototype.slice.call(arguments, 1), f = this;
            if (a && "_" === b.charAt(0)) return f;
            a ? this.each(function () {
                var a = c.data(this, "circular"), g = a && c.isFunction(a[b]) ? a[b].apply(a, d) : a;
                if (g !== a && g !== e) return f = g, !1
            }) : this.each(function () {
                c.data(this, "circular") || c.data(this, "circular", new h(this, b))
            });
            return f
        };

        c(function () {
            c("[data-provide=" + Deger + "]").each(function () {
                var b = c(this);
                b.circularStat(b.data());
            });
        });

        $("canvas,span").css("cursor", "none");
    })(jQuery, window, document);
}