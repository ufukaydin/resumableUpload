var JsonVeri;
var JsonHarita;
var JsonSehirVeri;
var TekrarSuresi = 60000;
var SeciliLocation = "0" // 0-Türkiye , 1-İl , 2-İlçe
var SeciliId = "0"; // il yada ilçe id'si

var filter;
var SeciliIlceId = "0";
var GumrukCheck = "ok";
var SeciliRow;
var ArananKelime = "";
var previouscountyselected = 0;
var past = null;
var start = true;

var HaritaSeciliParti = "0";

$(document).ready(function () {

    setTimeout(function () {
        window.location.href = document.URL;
    }, 600000);

    AjaxCalls();

    $("#SehirHarfler > div").click(function () { 
        $("#SehirHarfler > div").removeClass("secili");
        $(this).addClass("secili");
    });

    $("#Sehirler").change(function () {

        SeciliLocation = $(this).val() == 0 ? "0" : "1";
        SeciliId = $(this).val();

        $(".PieChartSecim > div:nth-child(2)").css("opacity", "1");

        if (SeciliLocation != "0") {
            SehirVeri();
            $(".LokasyonDetay").slideDown("slow");
        }
        else {
            var Deger = "";

            if (window.location.href.indexOf("indexENG.html") > -1) {
                Deger += "<option selected='selected' disabled style='display:none;'>Select a District</option>";
            }
            else if (window.location.href.indexOf("indexAR.html") > -1) {
                Deger += "<option selected='selected' disabled style='display:none;'>اختر قضاء</option>";
            }
            else {
                Deger += "<option selected='selected' disabled style='display:none;'>İlçe Seçiniz</option>";
            }

            $("#OranRadio").prop("checked", true).parent().find("a:first").addClass("checked");
            $("#MSayiRadio").prop("checked", false).parent().find("a:first").removeClass("checked");

            PieChartOyOran();

            $("#Ilceler").html(Deger);
            $("#SehirListe").slideUp("slow");
            $("#LokasyonPartiler").slideUp("slow");
            $(".LokasyonDetay").slideUp("slow");
            $("#L_Adi").text("");
            $("#Ilceler").attr("disabled", "disabled");
        }

    });

    $("#Ilceler").change(function () {

        SeciliLocation = "2";
        SeciliIlceId = $(this).val();

        $("#OranRadio").prop("checked", true).parent().find("a:first").addClass("checked");
        $("#MSayiRadio").prop("checked", false).parent().find("a:first").removeClass("checked");

        $(".PieChartSecim > div:nth-child(2)").css("opacity", "0.1");

        PieChartOyOran();

        $("#Location").text($("#Sehirler option:selected").text());
        $("#MilletSayisi").text(" / " + $("#Ilceler option:selected").text());

        $(".IlcelerListe > div").removeClass("secili");
        $("[ilceid='" + SeciliIlceId + "']").addClass("secili");

    });

    $('input.prettyCheckable').each(function () {
        $(this).prettyCheckable({
            labelPosition: 'right'
        });
    });

    $("#GumrukDahil").on('change', function () {
        if (this.checked) {
            GumrukCheck = "ok";
            GenelVeri();
            HaritaVeri();
        }
        else {
            GumrukCheck = "not";
            GenelVeri();
            HaritaVeri();
        }
    });

    $('[name="piechart"]').on('change', function () {

        if (this.id == "OranRadio") {
            PieChartOyOran();
        }
        else {
            if (SeciliLocation != "2") {
                PieChartMilletSayisi();
            }
            else {
                setTimeout(function () {
                    $("#OranRadio").prop("checked", true).parent().find("a:first").addClass("checked");
                    $("#MSayiRadio").prop("checked", false).parent().find("a:first").removeClass("checked");
                }, 0);
            }
        }

    });

});

function CanvasCizme() {
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
                centerFillColor: "#222",
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

                var e = (parseInt(this._getVal()) != 100) ? this._getVal().toFixed(2) : this._getVal();

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
            c("[data-provide=circular]").each(function () {
                var b = c(this);
                b.circularStat(b.data());
            });
        });

    })(jQuery, window, document);
}

function CanvasCizme2() {
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
                backFillColor: "#E4E6F0",
                fillColor: "#e15656",
                centerFillColor: "#0A0A0A",
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

                var e = (parseInt(this._getVal()) != 100) ? this._getVal().toFixed(2) : this._getVal();

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
            c("[data-provide=circular2]").each(function () {
                var b = c(this);
                b.circularStat(b.data());
            });
        });

    })(jQuery, window, document);
}

function LokasyonDetay(b) {

    if (b != undefined) {

        /* Üst Detay Bar */
        if (SeciliLocation == "2") {
            $("#L_Adi").text($("#Sehirler option:selected").text() + "/" + b.Ad.toUpperCase());
        }
        else {
            $("#L_Adi").text($("#Sehirler option:selected").text());
        }
        $("#L_ToplamS").text(parseInt(b.Sandik.ToplamSandik)).number(true, 0);
        $("#L_AcilanS").text(parseInt(b.Sandik.AcilanSandik)).number(true, 0);
        $("#L_KullanilanOy").text(parseInt(b.Sandik.KullanilanOy)).number(true, 0);
        $("#L_GecerliOy").text(parseInt(b.Sandik.GecerliOy)).number(true, 0);

        /* İlk Beş Parti */
        $("#LokasyonPartiler").slideDown("fast");

        var AcilanSandikOran = ((b.Sandik.AcilanSandik * 100) / b.Sandik.ToplamSandik).toFixed(2);
        AcilanSandikOran = (AcilanSandikOran >= 100) ? 100 : AcilanSandikOran;
        $("#LokasyonAcilanSandik").html("");
        $("#LokasyonAcilanSandik").prepend("<span data-provide='circular2' data-fill-color='rgb(41, 89, 213)' data-value='" + AcilanSandikOran + "' data-radius='47' data-percent='true' data-thickness='21'></span>")

        var IlkBesListe = b.Sonuclar.Parti;
        var GecerliOyToplam = b.Sandik.GecerliOy;
        var count = 0;

        var DigerOy = 0;
        var DigerMSayi = 0;
        var LogoNo = "0";
        var x = 0;
        var OyOran2 = 0;

        var Label1 = "";
        var Label2 = "";

        if (window.location.href.indexOf("indexENG.html") > -1) {
            Label1 = "Votes";
            Label2 = "Deputy";
        }
        else if (window.location.href.indexOf("indexAR.html") > -1) {
            Label1 = "عدد الأصوات";
            Label2 = "النائب";
        }
        else {
            Label1 = "Oy Sayısı"
            Label2 = "Milletvekili";
        }

        var ilkDortToplam = 0.00;

        if (IlkBesListe.length != undefined) { // Sadece tek parti gelince
            IlkBesListe.sort(function (a, b) {
                return parseInt(b.Oy) - parseInt(a.Oy);
            });
        }

        $("#IlkBesDiv").html("");

        for (var i = 0; i < IlkBesListe.length; i++) {

            if (x < 4 && IlkBesListe[i].No != "0") {

                var OyOran = ((IlkBesListe[i].Oy * 100) / GecerliOyToplam).toFixed(2);
                OyOran = (OyOran >= 100) ? 100 : OyOran;
                OyOran = (GecerliOyToplam == "0") ? "0" : OyOran;

                var LogoId = IlkBesListe[i].No;

                if (parseInt(IlkBesListe[i].No) > 20) {
                    LogoId = 21;
                }

                if (IlkBesListe[i].Oy != "0") {

                    ilkDortToplam += parseFloat(OyOran);

                    $("#IlkBesDiv").append(
                        "<div class='LokasyonParti'>" +
                                "<div>" +
                                    "<img src='../images/logo" + LogoId + ".png'>" +
                                "</div>" +
                                "<div class='OranSonuc'>% " + OyOran + "</div>" +

                                "<div class='AlinanOy'>" +
                                    "<span class='LabelKismi'>" + Label1 + "</span>:<span>" + parseInt(IlkBesListe[i].Oy).toLocaleString() + "</span>" +
                                "</div>" +

                                "<div class='VekilSayisi'>" +
                                    "<span class='LabelKismi'>" + Label2 + "</span>:<span>" + IlkBesListe[i].MilletVekiliSayisi + "</span>" +
                                "</div> " +
                            "</div> "
                        );
                    x++;
                }
            }
            else {
                DigerMSayi += parseInt(IlkBesListe[i].MilletVekiliSayisi);
                DigerOy += parseInt(IlkBesListe[i].Oy);
            }
        }

        OyOran2 = (100 - ilkDortToplam).toFixed(2);
        OyOran2 = (OyOran2 >= 100) ? 100 : OyOran2;
        OyOran2 = (GecerliOyToplam == "0") ? "0" : OyOran2;

        if (OyOran2 != "0" && OyOran2 != "0.00") {

            if (isNaN(DigerMSayi)) {
                DigerMSayi = "-";
            }

            $("#IlkBesDiv").append(

                        "<div class='LokasyonParti'>" +
                                "<div>" +
                                    "<img src='../images/logo0.png'>" +
                                "</div>" +
                                "<div class='OranSonuc'>% " + OyOran2 + "</div>" +

                                "<div class='AlinanOy'>" +
                                    "<span class='LabelKismi'>" + Label1 + "</span>:<span>" + parseInt(DigerOy).toLocaleString() + "</span>" +
                                "</div>" +

                                "<div class='VekilSayisi'>" +
                                    "<span class='LabelKismi'>" + Label2 + "</span>:<span>" + DigerMSayi + "</span>" +
                                "</div> " +
                            "</div> "

                        );
        }

        if (SeciliLocation == "1") {
            $(".VekilSayisi").show();
        }
        else {
            $(".VekilSayisi").hide();
        }

        CanvasCizme2();
        //$(".AlinanOy span:last-child").number(true, 0);
    }

}

function AjaxCalls() {

    if (SeciliLocation == "0") { // Tüm Türkiye
        GenelVeri();
        HaritaVeri();
    }
    else if (SeciliLocation == "1") { // İl Seçili
        GenelVeri();
        HaritaVeri();
        SehirVeri();
    }
    else if (SeciliLocation == "2") { // ilçe seçili
        GenelVeri();
        HaritaVeri();
        SehirVeri();
    }

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
        async: false,
        cache: true,
        success: function (data) {
            JsonVeri = data;

            HeaderVeri();

            if (document.getElementById("OranRadio").checked) {
                PieChartOyOran();
            }
            else {
                PieChartMilletSayisi();
            }

        }
    });
}

function HaritaVeri() {
    $.ajax({
        dataType: "json",
        url: "Handlers/HaritaVeri.ashx",
        async: true,
        cache: true,
        data: {
            GumrukDahil: GumrukCheck
        },
        success: function (data) {
            JsonHarita = data;

            if (HaritaSeciliParti == "0") {
                TurkiyeHarita();
            }
            else {
                TurkiyeHaritaPartiyeGore(HaritaSeciliParti);
            }
        }
    });
}

function SehirVeri() {
    $.ajax({
        dataType: "json",
        url: "Handlers/IlceVeri.ashx",
        data: {
            IlKodu: SeciliId
        },
        async: true,
        cache: true,
        success: function (data) {
            JsonSehirVeri = data;

            MilletVekiliListe();
            IlcelerListe();
            IlcelerCombo();
            if (document.getElementById("OranRadio").checked) {
                PieChartOyOran();
            }
            else {
                PieChartMilletSayisi();
            }
        }
    });
}

function HeaderVeri() {

    $.ajax({
        dataType: "json",
        url: "Handlers/GenelUstVeri.ashx",

        async: true,
        cache: true,
        success: function (data) {

            var OranDeger;
            var b = data.TurkiyeGeneli;
            var ToplamOyYuzdeIcin = b.Sandik.GecerliOy;
            var AcilanSandikOran = ((b.Sandik.AcilanSandik * 100) / b.Sandik.ToplamSandik).toFixed(2);

            AcilanSandikOran = (AcilanSandikOran >= 100) ? 100 : AcilanSandikOran;

            var KatilimOrani = ((b.Sandik.KullanilanOy * 100) / b.Sandik.AcilanSandikSecmenSayisi).toFixed(2);
            KatilimOrani = (KatilimOrani >= 100) ? 100 : KatilimOrani;
            if (isNaN(KatilimOrani)) {
                KatilimOrani = 0;
            }
            $("#CircularOrani1").html("");
            $("#CircularOrani1").prepend("<span class='AcilanSandikLokasyon' data-provide='circular' data-fill-color='rgb(41, 89, 213)' data-value='" + AcilanSandikOran + "' data-radius='45' data-percent='true' data-thickness='17'></span>")

            CanvasCizme();

            $("#ililcetoplamsandiksayi").text(parseInt(b.Sandik.ToplamSandik)).number(true, 0);
            $("#ililceacilansandiksayi").text(parseInt(b.Sandik.AcilanSandik)).number(true, 0);
            $("#ililcetoplamsecmensayi").text(parseInt(b.Sandik.ToplamSecmen)).number(true, 0);
            $("#ililcekullanilanoy").text(parseInt(b.Sandik.KullanilanOy)).number(true, 0);
            $("#ililceacilansandikorani").text("% " + KatilimOrani);
            $("#ililcegecerlioy").text(parseInt(b.Sandik.GecerliOy)).number(true, 0);

            var SeciliBolgeVeri = b.Sonuclar.Parti;
            var DigerOy = 0;
            var DigerMSayi = 0;
            var LogoNo = "0";
            var x = 0;
            var ilkDortToplam = 0.00;
            var TekSefer = 0;
            var TurkiyeKelime = "";

            if (window.location.href.indexOf("indexENG.html") > -1) {
                TurkiyeKelime = "Turkey";
            }
            else if (window.location.href.indexOf("indexAR.html") > -1) {
                TurkiyeKelime = "ديك رومي";
            }
            else {
                TurkiyeKelime = "Türkiye";
            }

            $("#LegendsUl").html("");
            $("#LegendsUl").append("<li class='active' particode='0'>" +
                                        "<a href='javascript:void(0)'>" + TurkiyeKelime + "</a>" +
                                    "</li>");

            SeciliBolgeVeri.sort(function (a, b) {
                return b.Oy - a.Oy;
            });

            for (var i = 0; i < SeciliBolgeVeri.length; i++) {
                if (x < 4 && SeciliBolgeVeri[i].No != "0") {

                    $("#" + i + "_Sonuc > .MilletSayisi > span").text(SeciliBolgeVeri[i].MilletVekiliSayisi);
                    LogoNo = (SeciliBolgeVeri[i].Oy == "0") ? "0" : SeciliBolgeVeri[i].No;
                    $("#" + i + "_Footer_Logo").attr("src", "../images/logo" + LogoNo + ".png");
                    OranDeger = ((SeciliBolgeVeri[i].Oy * 100) / ToplamOyYuzdeIcin).toFixed(2);
                    OranDeger = (OranDeger >= 100) ? 100 : OranDeger;
                    OranDeger = (ToplamOyYuzdeIcin == "0") ? "0.00" : OranDeger;
                    $("#" + i + "_Sonuc > .footerSonuc").text("% " + OranDeger);
                    ilkDortToplam += parseFloat(OranDeger);

                    if (SeciliBolgeVeri[i].Oy != "0" && SeciliBolgeVeri[i].No != "0") {
                        $("#LegendsUl").append("<li particode='" + SeciliBolgeVeri[i].No + "'>" +
                                        "<a href='javascript:void(0)'><div class='Renk' style='background:" + PartiRenkler[SeciliBolgeVeri[i].No][1] + "' ></div><div class='Adi'>" + PartiRenkler[SeciliBolgeVeri[i].No][0] + "</div></a>" +
                                    "</li>");
                    }
                    x++;
                }
                else {

                    if (TekSefer == 0) {
                        if (SeciliBolgeVeri[i].Oy != "0" && SeciliBolgeVeri[i].No != "0") {
                            $("#LegendsUl").append("<li particode='" + SeciliBolgeVeri[i].No + "'>" +
                                            "<a href='javascript:void(0)'><div class='Renk' style='background:" + PartiRenkler[SeciliBolgeVeri[i].No][1] + "' ></div><div class='Adi'>" + PartiRenkler[SeciliBolgeVeri[i].No][0] + "</div></a>" +
                                        "</li>");
                            TekSefer++;
                        } 
                    }

                    DigerMSayi += parseInt(SeciliBolgeVeri[i].MilletVekiliSayisi);
                    DigerOy += parseInt(SeciliBolgeVeri[i].Oy);
                }
            }

            if (isNaN(DigerMSayi)) {
                $("#Besinci_Sonuc > .MilletSayisi > span").text("-");
            }
            else {
                $("#Besinci_Sonuc > .MilletSayisi > span").text(DigerMSayi);
            }

            LogoNo = "0";
            $("#Besinci_Footer_Logo").attr("src", "../images/logo" + LogoNo + ".png");
            OranDeger = (100 - ilkDortToplam).toFixed(2);
            OranDeger = (OranDeger >= 100) ? 100 : OranDeger;
            OranDeger = (ToplamOyYuzdeIcin == "0") ? "0.00" : OranDeger;
            $("#Besinci_Sonuc > .footerSonuc").text("% " + OranDeger);

            $("#LegendsUl").append("<li class='son'></li>");
            $("#LegendsUl").prepend("<li class='ilk'></li>");

            $("#LegendsUl > li").removeClass("active");
            $("#LegendsUl > li[particode='" + HaritaSeciliParti + "']").addClass("active");

            $("#LegendsUl > li").click(function () {

                $("#LegendsUl > li").removeClass("active");
                $(this).addClass("active");

                HaritaSeciliParti = $(this).attr("particode");

                if ($(this).attr("particode") == "0") {
                    TurkiyeHarita();
                }
                else {
                    TurkiyeHaritaPartiyeGore($(this).attr("particode"));
                }

            });
        }
    });

}

function TurkiyeHarita() {

    var LegendsParti = [];

    $("#map").hide();
    $("#map").empty();

    var sehirid = "";
    var obj;
    var arr = new Array();
    r = Raphael('map');
    r.setViewBox(0, 110, 1020, 600);
    r.setSize('750', '450');
    var x = 0;
    var renk;

    $.each(JsonHarita, function (a, b) {

        if ((b.IlKod > 0 && b.IlKod < 82) || b.IlKod == 601 || b.IlKod == 602 || b.IlKod == 341 || b.IlKod == 342 || b.IlKod == 343 || b.IlKod == 351 || b.IlKod == 352) {

            var county = paths[b.IlKod];

            obj = r.path(paths[b.IlKod].path);

            arr[obj.id] = b.IlKod;

            if (paths[b.IlKod].county != undefined) {
                paths[b.IlKod].IDLERI = x;
                var sehirid = b.IlKod;
                var nosu = paths[b.IlKod].county;

                renk = PartiRenkler[b.PartiKod][1];

                if (b.PartiKod != 0) {

                    var pushData = {
                        ad: PartiRenkler[b.PartiKod][0], renk: PartiRenkler[b.PartiKod][1]
                    };
                    if (b.PartiKod > 20) {

                        var Label1 = "";

                        if (window.location.href.indexOf("indexENG.html") > -1) {
                            Label1 = "INDEPENDENT";
                        }
                        else if (window.location.href.indexOf("indexAR.html") > -1) {
                            Label1 = "INDEPENDENT";
                        }
                        else {
                            Label1 = "BAĞIMSIZ";
                        }

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
                            // $("#Sehir" + nosu).parent().attr({ "data-tooltip": paths[b.IlKod].name.toString().toUpperCase(), "class": "simptip-position-bottom" }).removeAttr("title");
                            $("#Sehir" + nosu).parent().removeAttr("title");
                        }
                    }
                    else {
                        if (nosu == b.IlKod) {
                            obj.node.id = 'Sehir' + nosu;
                            obj.attr({ "stroke-width": "1.1", fill: renk, stroke: "#ffffff", title: paths[b.IlKod].name.toString().toUpperCase() });
                            $("#Sehir" + nosu).attr({ test: renk });
                            //  $("#Sehir" + nosu).parent().attr({ "data-tooltip": paths[b.IlKod].name.toString().toUpperCase(), "class": "simptip-position-bottom" }).removeAttr("title");
                            $("#Sehir" + nosu).parent().removeAttr("title");
                        }
                    }
                }
                catch (e) {

                }
            }

            function hoverin(e) {

                if (window.location.href.indexOf("indexENG.html") > -1) {
                    var Label1 = "Deputy";
                }
                else if (window.location.href.indexOf("indexAR.html") > -1) {
                    var Label1 = "النائب";
                }
                else {
                    var Label1 = "Milletvekili";
                }

                if (paths[arr[this.id]].value == 'notSelected') {
                    this.animate({
                        fill: '#A2A7AC',
                        stroke: '#ffffff'
                    }, 0);
                }
                 
                var IcerikHtml = "";
                var IcerikHtml2 = "";
                var MilletSayisiSon = "";
                var AltTaraf = "";

                $.each(JsonVeri.AA.IlSonuclari.Il, function (k, l) {

                    if (l.Kod == b.IlKod) {

                        MilletSayisiSon = l.Sandik.MilletvekiliSayisi;

                        if (l.Sonuclar.Parti.length > 0) {
                              
                            var partiliste = l.Sonuclar.Parti;

                            partiliste.sort(function (a, b) {
                                return b.MilletVekiliSayisi - a.MilletVekiliSayisi;
                            });

                            $.each(partiliste, function (y, z) {
                                 
                                if (z.MilletVekiliSayisi != "0") {

                                    IcerikHtml2 +=

                                        "<div class='TooltipTek'>" +

                                            "<div class='Baslik'>" + PartiRenkler[z.No][0] + "</div>" +
                                            "<div class='Bilgi'>" + z.MilletVekiliSayisi + "</div>" +

                                    "</div>";
                                }
                            });
                        }
                        else {
                            if (l.Sonuclar.Parti.MilletVekiliSayisi != "0") {


                                IcerikHtml2 +=

                                    "<div class='TooltipTek'>" +

                                        "<div class='Baslik'>" + PartiRenkler[l.Sonuclar.Parti.No][0] + "</div>" +
                                        "<div class='Bilgi'>" + l.Sonuclar.Parti.MilletVekiliSayisi + "</div>" +

                                "</div>";
                            }
                        }
                    }

                });

                $("#tooltipBaslik").html(

                      "<div>" + this.attrs.title.toUpperCase() + "</div>" +

                      "<div style='float:left;'>" + Label1 + " : " + MilletSayisiSon + "</div>"

                    );

                $("#tooltip").css("border-color", PartiRenkler[b.PartiKod][1]);

       

                IcerikHtml += IcerikHtml2;
 

                $("#tooltipIcerik").html(IcerikHtml);
                $("#tooltip").css("left", e.clientX).css("top", e.clientY + 10);
                $("#tooltip").show();
            }

            function hoverout(e) {
                if (paths[arr[this.id]].value == 'notSelected')
                    this.animate({
                        fill: $("#" + this.node.id).attr("test"),
                        stroke: "#ffffff"
                    }, 0);
                $("#tooltip").hide();
            }

            obj.click(function () {

                $(".PieChartSecim > div:nth-child(2)").css("opacity", "1");

                if (arr[this.id] != SeciliId) { // Aynı şehire tıkaladıysa çağırmıyoruz
                    SeciliLocation = "1";
                    SeciliId = arr[this.id];

                    SehirVeri();
                    $(".LokasyonDetay").slideDown("slow");

                }

                if (paths[arr[this.id]].value == 'notSelected') {
                    this.animate({
                        fill: '#999'
                    }, 0);
                    paths[previouscountyselected].value = "notSelected";
                    paths[arr[this.id]].value = "isSelected";

                    previouscountyselected = arr[this.id];
                    if (!start && past != this) {
                        past.animate({ fill: $("#" + past.node.id).attr("test") }, 0);

                    }
                    past = this;
                    start = false;

                }
                else if (paths[arr[this.id]].value == 'isSelected') {
                    this.animate({
                        fill: '#999'
                    }, 0);
                }
            });

            obj.mouseout(hoverout);

            obj.mouseover(hoverin);

            x++;
        }
    });

    LegendsParti.sort(function (a, b) {
        var x = a["ad"];
        var y = b["ad"];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    $("#map div.MapLogo").remove();
    $("#map").prepend("<div class='MapLogo'></div>");

    setTimeout(function () {
        $("#map").slideDown(1000);
    }, 300);

    $(document).scroll(function () {
        $(".HaritaTooltip").hide();
    });

}

function TurkiyeHaritaPartiyeGore(PartiKod) {
     
    var LegendsParti = [];

    $("#map").hide();
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

    $.each(JsonVeri.AA.IlSonuclari.Il, function (a, b) {

        if ((b.Kod > 0 && b.Kod < 82) || b.Kod == 601 || b.Kod == 602 || b.Kod == 341 || b.Kod == 342 || b.Kod == 343 || b.Kod == 351 || b.Kod == 352) {

            var GecerliOy = b.Sandik.GecerliOy;

            for (var i = 0; i < b.Sonuclar.Parti.length; i++) {
                if (b.Sonuclar.Parti[i].No == PartiKod) {
                    var Oran = parseInt(b.Sonuclar.Parti[i].Oy) / GecerliOy;
                    EnyuksekOran = EnyuksekOran < Oran ? Oran : EnyuksekOran;
                    break;
                }
            }

        }
    });

    $.each(JsonVeri.AA.IlSonuclari.Il, function (a, b) {
         

        if ((b.Kod > 0 && b.Kod < 82) || b.Kod == 601 || b.Kod == 602 || b.Kod == 341 || b.Kod == 342 || b.Kod == 343 || b.Kod == 351 || b.Kod == 352) {
             

                var OyOranı = (0).toFixed(2);
                var MSayisi = 0;
                var OySayisi = 0;
                var Sonuclar = b.Sonuclar.Parti;
                var GecerliOy = b.Sandik.GecerliOy == 0 ? 1 : b.Sandik.GecerliOy;
                if (Sonuclar.length>0) { 
                Sonuclar.sort(function (x, y) {
                    return parseInt(y.Oy) - parseInt(x.Oy);
                });
                }
                var fillOpacity = 0;

                for (var i = 0; i < Sonuclar.length; i++) {
                    if (Sonuclar[i].No == PartiKod) {
                        fillOpacity = (parseInt(Sonuclar[i].Oy) / GecerliOy) / EnyuksekOran;
                        OyOranı = (parseInt(Sonuclar[i].Oy) * 100 / GecerliOy).toFixed(2);
                        MSayisi = Sonuclar[i].MilletVekiliSayisi;
                        OySayisi = Sonuclar[i].Oy;
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

                    if (PartiKod != 0) {

                        var pushData = {
                            ad: PartiRenkler[PartiKod][0], renk: PartiRenkler[PartiKod][1]
                        };
                        if (b.PartiKod > 20) {

                            var Label1 = "";

                            if (window.location.href.indexOf("indexENG.html") > -1) {
                                Label1 = "INDEPENDENT";
                            }
                            else if (window.location.href.indexOf("indexAR.html") > -1) {
                                Label1 = "INDEPENDENT";
                            }
                            else {
                                Label1 = "BAĞIMSIZ";
                            }

                            pushData.ad = Label1;
                        }
                        if (JSON.stringify(LegendsParti).indexOf(pushData.ad) < 0) {

                            LegendsParti.push(pushData);
                        }
                    }

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

                function hoverin(e) {

                    if (window.location.href.indexOf("indexENG.html") > -1) {
                        var Label1 = "Deputy";
                    }
                    else if (window.location.href.indexOf("indexAR.html") > -1) {
                        var Label1 = "النائب";
                    }
                    else {
                        var Label1 = "Milletvekili";
                    }

                    if (paths[arr[this.id]].value == 'notSelected')

                        this.animate({
                            fill: '#A2A7AC',
                            stroke: '#ffffff'
                        }, 0);

                    $("#tooltipBaslik").html(

                          "<div>" + this.attrs.title.toUpperCase() + "</div>"


                        );

                    $("#tooltip").css("border-color", PartiRenkler[PartiKod][1]);

                    var Soncular = JsonVeri.AA.IlSonuclari.Il[paths[b.Kod].IDLERI].Sonuclar.Parti;
                    var IcerikHtml = "";


                    IcerikHtml +=

                        "<div class='TooltipCift'>" +

                            "<div class='Baslik'>" + Label1 + "</div>" +
                            "<div class='Bilgi'>" + MSayisi + "</div>" +

                    "</div>";

                    IcerikHtml +=

                               "<div class='TooltipTek'>" +

                                       "<div class='Baslik'>" + "Oy Oranı" + "</div>" +
                                       "<div class='Bilgi'>" + OyOranı + "%</div>" +

                           "</div>";

                    IcerikHtml +=

                        "<div class='TooltipCift'>" +

                            "<div class='Baslik'>" + "Oy Sayısı" + "</div>" +
                            "<div class='Bilgi'>" + OySayisi + "</div>" +

                    "</div>";

                    $("#tooltipIcerik").html(IcerikHtml);
                    $("#tooltip").css("left", e.clientX).css("top", e.clientY + 10);
                    $("#tooltip").show();
                }

                function hoverout(e) {
                    if (paths[arr[this.id]].value == 'notSelected')
                        this.animate({
                            fill: $("#" + this.node.id).attr("test"),
                            stroke: "#ffffff"
                        }, 0);
                    $("#tooltip").hide();
                }

                obj.click(function () {

                    $(".PieChartSecim > div:nth-child(2)").css("opacity", "1");

                    if (arr[this.id] != SeciliId) { // Aynı şehire tıkaladıysa çağırmıyoruz
                        SeciliLocation = "1";
                        SeciliId = arr[this.id];

                        SehirVeri();
                        $(".LokasyonDetay").slideDown("slow");

                    }

                    if (paths[arr[this.id]].value == 'notSelected') {
                        this.animate({
                            fill: '#999'
                        }, 0);
                        paths[previouscountyselected].value = "notSelected";
                        paths[arr[this.id]].value = "isSelected";

                        previouscountyselected = arr[this.id];
                        if (!start && past != this) {
                            past.animate({ fill: $("#" + past.node.id).attr("test") }, 0);

                        }
                        past = this;
                        start = false;

                    }
                    else if (paths[arr[this.id]].value == 'isSelected') {
                        this.animate({
                            fill: '#999'
                        }, 0);
                    }
                });

                obj.mouseout(hoverout);

                obj.mouseover(hoverin);

                x++;

           
        }
    });

    LegendsParti.sort(function (a, b) {
        var x = a["ad"];
        var y = b["ad"];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    $("#map div.MapLogo").remove();
    $("#map").prepend("<div class='MapLogo'></div>");

    setTimeout(function () {
        $("#map").slideDown(1000);

    }, 300);

    $(document).scroll(function () {
        $(".HaritaTooltip").hide();
    });

}

function PieChartOyOran() {

    document.getElementById("OranRadio").checked = true;
    document.getElementById("MSayiRadio").checked = false;
    var GecerliOy = 0;
    var PieChartJson;

    if (SeciliLocation == "0") { // Tüm Türkiye
        PieChartJson = JsonVeri.AA.TurkiyeGeneli.Sonuclar.Parti;
        GecerliOy = JsonVeri.AA.TurkiyeGeneli.Sandik.GecerliOy;

    }
    else if (SeciliLocation == "1") { // İl Seçili
        $.each(JsonVeri.AA.IlSonuclari.Il, function (a, b) {
            if (b.Kod == SeciliId) {
                PieChartJson = b.Sonuclar.Parti;
                GecerliOy = b.Sandik.GecerliOy;
                LokasyonDetay(b);
            }
        });
    }
    else if (SeciliLocation == "2") { // İlçe seçili
        $.each(JsonSehirVeri.Il.Ilce, function (a, b) {
            if (b.Kod == SeciliIlceId) {
                PieChartJson = b.Sonuclar.Parti;
                GecerliOy = b.Sandik.GecerliOy;
                LokasyonDetay(b);
            }
        });
    }

    var dataProvider = [];

    if (PieChartJson.length >0) {
        PieChartJson.sort(function (a, b) {
            return parseInt(b.Oy) - parseInt(a.Oy);
        });

        if (window.location.href.indexOf("DegisimENG.html") > -1) {
            var DigerKelimesi = "Others";
        }
        else if (window.location.href.indexOf("DegisimAR.html") > -1) {
            var DigerKelimesi = "غيرها";
        }
        else {
            var DigerKelimesi = "Diğer";
        }

        var x = 0;
        var DigerOy = 0;

        $.each(PieChartJson, function (a, b) {

            if (b.No != "0") {
                if (parseInt(b.Oy) != 0) {
                    dataProvider.push({
                        "country": PartiRenkler[b.No][0],
                        "value": b.Oy,
                        "color": PartiRenkler[b.No][1]
                    });
                }

            }
            else {
                dataProvider.push({
                    "country": "Diğer",
                    "value": b.Oy,
                    "color": "#4c4c3f"
                });
            }
        });

        if (dataProvider.length == 0) {
            dataProvider.push({
                "country": "Diğer",
                "value": 100,
                "color": "#4c4c3f"
            });
        }
    }
    else { // tek partiiii geliyor // diğer
        if (window.location.href.indexOf("DegisimENG.html") > -1) {
            var DigerKelimesi = "Others";
        }
        else if (window.location.href.indexOf("DegisimAR.html") > -1) {
            var DigerKelimesi = "غيرها";
        }
        else {
            var DigerKelimesi = "Diğer";
        }

        var x = 0;
        var DigerOy = 0;


        if (PieChartJson.No != "0") {
            if (parseInt(PieChartJson.Oy) != 0) {
                dataProvider.push({
                    "country": PartiRenkler[PieChartJson.No][0],
                    "value": PieChartJson.Oy,
                    "color": PartiRenkler[PieChartJson.No][1]
                });
            }
        }
        else {
            dataProvider.push({
                "country": "Diğer",
                "value": PieChartJson.Oy,
                "color": "#4c4c3f"
            });
        }

        if (dataProvider.length == 0) {
            dataProvider.push({
                "country": "Diğer",
                "value": 100,
                "color": "#4c4c3f"
            });
        }
    }

    var chart = AmCharts.makeChart("piechartoyoran", {
        "type": "pie",
        "outlineAlpha": 0.8,
        "depth3D": 11,
        "startEffect": true,
        "angle": 30,
        "startDuration": 0.7,
        "startEffect": "bounce",
        //"sequencedAnimation": true,
        "outlineThickness": 2,
        "legend": {
            "markerType": "circle",
            "position": "bottom",
            "marginLeft": 80,
            //"width": 550,
            "valueWidth": 70,
            "autoMargins": false,
            "switchable": false,
            "valueText": "[[percents]]%"

        },
        "groupPercent": 3,
        "groupedTitle": "Diğer",
        "groupedColor": "#4c4c3f",
        "labelsEnabled": true,
        "labelText": "[[title]]",
        "dataProvider": dataProvider,
        "valueField": "value",
        "titleField": "country",
        "colorField": "color",
        "balloonText": "[[title]]<br><span style='font-size:14px'> ([[percents]]%) </br>[[value]]</span>"
    });
}

function PieChartMilletSayisi() {

    document.getElementById("OranRadio").checked = false;
    document.getElementById("MSayiRadio").checked = true;

    var PieChartJson;

    if (SeciliLocation == "0") { // Tüm Türkiye
        PieChartJson = JsonVeri.AA.TurkiyeGeneli.Sonuclar.Parti;
    }
    else if (SeciliLocation == "1") { // İl Seçili
        $.each(JsonVeri.AA.IlSonuclari.Il, function (a, b) {
            if (b.Kod == SeciliId) {
                PieChartJson = b.Sonuclar.Parti;
                LokasyonDetay(b);
            }
        });
    }

    var dataProvider = [];

    if (window.location.href.indexOf("indexENG.html") > -1) {
        var DigerKelimesi = "Others";
    }
    else if (window.location.href.indexOf("indexAR.html") > -1) {
        var DigerKelimesi = "غيرها";
    }
    else {
        var DigerKelimesi = "Diğer";
    }

    if (PieChartJson.length >0) {
        $.each(PieChartJson, function (a, b) {

            if (b.MilletVekiliSayisi != "-") {

                if (parseInt(b.MilletVekiliSayisi) != 0) {

                    if (b.No == "0") {
                        dataProvider.push({
                            "country": DigerKelimesi,
                            "value": parseInt(b.MilletVekiliSayisi),
                            "color": "#4c4c3f"
                        });
                    }
                    else {
                        dataProvider.push({
                            "country": PartiRenkler[b.No][0],
                            "value": parseInt(b.MilletVekiliSayisi),
                            "color": PartiRenkler[b.No][1]
                        });
                    }
                }
            }
        });
    }
    else {
        if (PieChartJson.MilletVekiliSayisi != "-") {

            if (parseInt(PieChartJson.MilletVekiliSayisi) != 0) {

                if (PieChartJson.No == "0") {
                    dataProvider.push({
                        "country": DigerKelimesi,
                        "value": parseInt(PieChartJson.MilletVekiliSayisi),
                        "color": "#4c4c3f"
                    });
                }
                else {
                    dataProvider.push({
                        "country": PartiRenkler[PieChartJson.No][0],
                        "value": parseInt(PieChartJson.MilletVekiliSayisi),
                        "color": PartiRenkler[PieChartJson.No][1]
                    });
                }
            }
        }
    }

    var chart = AmCharts.makeChart("piechartoyoran", {
        "type": "pie",
        "outlineAlpha": 0.8,
        "depth3D": 11,
        "startEffect": true,
        "angle": 30,
        "startDuration": 0.7,
        "startEffect": "bounce",
        //"sequencedAnimation": true,
        "outlineThickness": 2,
        "legend": {
            "markerType": "circle",
            "position": "bottom",
            "marginLeft": 80,
            //"width": 550,
            "valueWidth": 70,
            "autoMargins": false,
            "switchable": false

        },
        "labelsEnabled": true,
        "groupPercent": 1,
        "groupedTitle": DigerKelimesi,
        "groupedColor": "#4c4c3f",
        "labelText": "[[title]]",
        "dataProvider": dataProvider,
        "valueField": "value",
        "titleField": "country",
        "colorField": "color",
        "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>"
    });
}

function MilletVekiliListe() {

    $(".ListeNumara,.Partiler,.PartiListe").html("");

    for (var i = 1; i <= JsonSehirVeri.Il.MilletVekiliSayisi; i++) {
        $(".ListeNumara").append("<div count='" + i + "'>" + i + " )</div>");
    }

    $.each(JsonVeri.AA.IlSonuclari.Il, function (a, b) {
        if (b.Kod == SeciliId) {

            var SehirId = b.Kod;
            var SehirPartileri = b.Sonuclar.Parti;

            if (SehirPartileri.length > 0) {

                SehirPartileri.sort(function (a, b) {
                    return parseInt(b.MilletVekiliSayisi) - parseInt(a.MilletVekiliSayisi);
                });

                var MVSayili = 0;
                var PartiList = [];

                $.each(SehirPartileri, function (x, y) {
                    if (parseInt(y.MilletVekiliSayisi) > 0) {
                        if (MilletVekili[0]["Liste_" + SehirId][y.No] != undefined && MilletVekili[0]["Liste_" + SehirId][y.No].length > 0) {

                            Count_MS = 0;
                            PartiList.push(y.No);

                            var SayiSi = parseInt(y.MilletVekiliSayisi);
                            var LogoNo = (y.No > 20) ? 21 : y.No;
                            var PartiAdi = PartiRenkler[y.No][0];

                            var Label1 = "";

                            if (window.location.href.indexOf("indexENG.html") > -1) { // ingilizce
                                Label1 = "INDEPENDENT";
                            }
                            else if (window.location.href.indexOf("indexAR.html") > -1) { // arapça
                                Label1 = "INDEPENDENT";
                            }
                            else {
                                Label1 = "BAĞIMSIZ";
                            }

                            PartiAdi = (y.No > 20) ? Label1 : PartiAdi;

                            $(".Partiler").append("<span><img id='Logo_" + MVSayili + "' src='../images/logo" + LogoNo + ".png' />" +
                                "<div id='Parti" + MVSayili + "'>" + PartiAdi + "</div></span>");

                            $(".PartiListe").append("<div id='PartiListe_" + MVSayili + "'></div>");

                            MilletVekili[0]["Liste_" + SehirId][y.No].forEach(function (a) {
                                $('#PartiListe_' + MVSayili).append("<div class='" + ((SayiSi > Count_MS) ? "secili" : "") +
                                    "' satirTip='" + ((Count_MS % 2 == 0) ? "cift" : "tek") + "' count='" + Count_MS + "'>" + a + "</div>");
                                Count_MS++;
                            });
                            MVSayili++;

                        }
                    }
                });

                SehirPartileri.sort(function (a, b) {
                    return parseInt(b.Oy) - parseInt(a.Oy);
                });

                $.each(SehirPartileri, function (x, y) {
                    if (PartiList.indexOf(y.No) < 0 && MVSayili < 4) {
                        if (MilletVekili[0]["Liste_" + SehirId][y.No] != undefined && MilletVekili[0]["Liste_" + SehirId][y.No].length > 0) {

                            Count_MS = 0;
                            PartiList.push(y.No);

                            var SayiSi = parseInt(y.MilletVekiliSayisi);
                            var LogoNo = (y.No > 20) ? 0 : y.No;
                            var PartiAdi = PartiRenkler[y.No][0];

                            var Label1 = "";

                            if (window.location.href.indexOf("indexENG.html") > -1) { // ingilizce
                                Label1 = "INDEPENDENT";
                            }
                            else if (window.location.href.indexOf("indexAR.html") > -1) { // arapça
                                Label1 = "INDEPENDENT";
                            }
                            else {
                                Label1 = "BAĞIMSIZ";
                            }

                            PartiAdi = (y.No > 20) ? Label1 : PartiAdi;

                            $(".Partiler").append("<span><img id='Logo_" + MVSayili + "' src='../images/logo" + LogoNo + ".png' />" +
                                "<div id='Parti" + MVSayili + "'>" + PartiAdi + "</div></span>");

                            $(".PartiListe").append("<div id='PartiListe_" + MVSayili + "'></div>");

                            MilletVekili[0]["Liste_" + SehirId][y.No].forEach(function (a) {
                                $('#PartiListe_' + MVSayili).append("<div class='" + ((SayiSi > Count_MS) ? "secili" : "") + "' satirTip='" + ((Count_MS % 2 == 0) ? "cift" : "tek") + "' count='" + Count_MS + "'>" + a + "</div>");
                                Count_MS++;
                            });

                            MVSayili++;

                        }
                    }
                });

            }
            else { // Tek parti gelince (BİTLİSTE SADECE DİĞER GELİYORDU)

                var Count_MS = 0;
                var SayiSi = parseInt(SehirPartileri.MilletVekiliSayisi);
                var LogoNo = (SehirPartileri.No > 20) ? 21 : SehirPartileri.No;
                var PartiAdi = PartiRenkler[SehirPartileri.No][0];

                var Label1 = "";

                if (window.location.href.indexOf("indexENG.html") > -1) { // ingilizce
                    Label1 = "INDEPENDENT";
                }
                else if (window.location.href.indexOf("indexAR.html") > -1) { // arapça
                    Label1 = "INDEPENDENT";
                }
                else {
                    Label1 = "BAĞIMSIZ";
                }

                PartiAdi = (SehirPartileri.No > 20) ? Label1 : PartiAdi;

                $(".Partiler").append("<span><img id='Logo_" + MVSayili + "' src='../images/logo" + LogoNo + ".png' />" +
                    "<div id='Parti" + MVSayili + "'>" + PartiAdi + "</div></span>");

                $(".PartiListe").append("<div id='PartiListe_" + MVSayili + "'></div>");

                MilletVekili[0]["Liste_" + SehirId][SehirPartileri.No].forEach(function (a) {
                    $('#PartiListe_' + MVSayili).append("<div class='" + ((SayiSi > Count_MS) ? "secili" : "") +
                        "' satirTip='" + ((Count_MS % 2 == 0) ? "cift" : "tek") + "' count='" + Count_MS + "'>" + a + "</div>");
                    Count_MS++;
                });
                MVSayili++;
            }
        }
    });

    if (SeciliLocation == "1") {
        $("#MilletSayisi").text("(" + JsonSehirVeri.Il.MilletVekiliSayisi + ")");
    }

    $("#Sehirler").val(SeciliId);
    $("#Ilceler").removeAttr("disabled");

    $(".SehirlerGrid").hide();
    $("#SehirListe").hide();
    $("#SehirListe").slideDown(500);

}

function IlcelerListe() {

    $(".IlcelerListe").html("");

    var count = 0;

    $.each(JsonSehirVeri.Il.Ilce.sort(function (a, b) {
        if (a.Ad.replace('Ç', 'C').replace('İ', 'I').replace('Ö', 'O').replace('Ü', 'U').replace('Ş', 'S') < b.Ad.replace('Ç', 'C').replace('İ', 'I').replace('Ö', 'O').replace('Ü', 'U').replace('Ş', 'S')) return -1;
        if (b.Ad.replace('Ç', 'C').replace('İ', 'I').replace('Ö', 'O').replace('Ü', 'U').replace('Ş', 'S') < a.Ad.replace('Ç', 'C').replace('İ', 'I').replace('Ö', 'O').replace('Ü', 'U').replace('Ş', 'S')) return 1;
        return 0;
    }), function (a, b) {


        var Oran = ((b.Sandik.AcilanSandik * 100) / b.Sandik.ToplamSandik);
        Oran = (Oran >= 100) ? '% ' + Oran : '% ' + Oran.toFixed(2);

        if (count % 2 == 0) {
            $(".IlcelerListe").append("<div class='IlceRow tek' ilceid='" + b.Kod + "'>" +
            "<div class='IlceAdi'>" + b.Ad + "</div>" +
            "<div class='Ilce_ToplamSandik'>" + b.Sandik.ToplamSandik + "</div>" +
            "<div class='Ilce_AcilanSandik'>" + b.Sandik.AcilanSandik + "</div>" +
            "<div class='Ilce_Oran'>" + Oran + "</div>" +
            "</div>");
        }
        else {
            $(".IlcelerListe").append("<div class='IlceRow cift' ilceid='" + b.Kod + "'>" +
            "<div class='IlceAdi'>" + b.Ad + "</div>" +
            "<div class='Ilce_ToplamSandik'>" + b.Sandik.ToplamSandik + "</div>" +
            "<div class='Ilce_AcilanSandik'>" + b.Sandik.AcilanSandik + "</div>" +
            "<div class='Ilce_Oran'>" + Oran + "</div>" +
            "</div>");
        }

        count++;
    });

    $(".IlcelerListe > div").click(function () {

        $(".IlcelerListe > div").removeClass("secili");

        $(this).addClass("secili");

        SeciliIlceId = $(this).attr("ilceid");

        $("#OranRadio").prop("checked", true).parent().find("a:first").addClass("checked");
        $("#MSayiRadio").prop("checked", false).parent().find("a:first").removeClass("checked");

        $(".PieChartSecim > div:nth-child(2)").css("opacity", "0.1");

        PieChartOyOran();

        $.each(JsonSehirVeri.Il.Ilce, function (a, b) {
            if (b.Kod == SeciliIlceId) {
                SeciliLocation = "2";
                LokasyonDetay(b);
            }
        });

        $("#Ilceler").val(SeciliIlceId);
        $("#MilletSayisi").text(" / " + $("#Ilceler option:selected").text());

    });

    if (SeciliLocation == "2") {
        $("#Ilceler").val(SeciliIlceId);
        $(".IlceRow[ilceid='" + SeciliIlceId + "']").addClass("secili");
    }
}

function IlcelerCombo() {

    var Deger = "";

    if (window.location.href.indexOf("indexENG.html") > -1) {
        Deger += "<option selected='selected' disabled style='display:none;'>Select a District</option>";
    }
    else if (window.location.href.indexOf("indexAR.html") > -1) {
        Deger += "<option selected='selected' disabled style='display:none;'>اختر قضاء</option>";
    }
    else {
        Deger += "<option selected='selected' disabled style='display:none;'>İlçe Seçiniz</option>";
    }

    $.each(JsonSehirVeri.Il.Ilce.sort(function (a, b) {
        if (a.Ad.replace('Ç', 'C').replace('İ', 'I').replace('Ö', 'O').replace('Ü', 'U').replace('Ş', 'S') < b.Ad.replace('Ç', 'C').replace('İ', 'I').replace('Ö', 'O').replace('Ü', 'U').replace('Ş', 'S')) return -1;
        if (b.Ad.replace('Ç', 'C').replace('İ', 'I').replace('Ö', 'O').replace('Ü', 'U').replace('Ş', 'S') < a.Ad.replace('Ç', 'C').replace('İ', 'I').replace('Ö', 'O').replace('Ü', 'U').replace('Ş', 'S')) return 1;
        return 0;
    }), function (a, b) {
        Deger += "<option value='" + b.Kod + "'>" + b.Ad + "</option>";
    });

    $("#Ilceler").html("");
    $("#Ilceler").prepend(Deger);

    if (SeciliLocation == "2") {
        $("#Ilceler").val(SeciliIlceId);
    }

}