var JsonVeri;
var JsonHarita;
var JsonSehirVeri;
var JsonIlceVeri;

var TekrarSuresi = 60000;
var SeciliLocation = "0" // 0-Türkiye , 1-İl , 2-İlçe
var SeciliId = "0"; // il yada ilçe id'si
var SeciliIlceId = "0";

var GumrukCheck = "ok";
var SeciliRow;
var ArananKelime = "";
var LineTip = "lineOran";

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

        LineChart();

        $(".PieChartSecim > div:nth-child(2)").css("opacity", "1");

        if (SeciliLocation != "0") {
            SehirVeri();
            $(".LokasyonDetay").slideDown("slow");
        }
        else {
            var Deger = "";

            if (window.location.href.indexOf("DegisimENG.html") > -1) {
                Deger += "<option selected='selected' disabled style='display:none;'>Select a District</option>";
            }
            else if (window.location.href.indexOf("DegisimAR.html") > -1) {
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

        $(".IlcelerListe > div").removeClass("secili");
        $("[ilceid='" + SeciliIlceId + "']").addClass("secili");
    });

    $('input.prettyCheckable').each(function () {
        $(this).prettyCheckable({
            labelPosition: 'right'
        });
    });

    $('[name="linechart"]').on('change', function () {
        LineTip = this.id;
        LineChart();
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
            var ilkDortToplam = 0.00;

            SeciliBolgeVeri.sort(function (a, b) {
                return b.Oy - a.Oy;
            });

            var x = 0;

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
                    x++;
                }
                else {
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

        }
    });

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

        if (window.location.href.indexOf("DegisimENG.html") > -1) {
            Label1 = "Votes";
            Label2 = "Deputy";
        }
        else if (window.location.href.indexOf("DegisimAR.html") > -1) {
            Label1 = "عدد الأصوات";
            Label2 = "النائب";
        }
        else {
            Label1 = "Oy Sayısı"
            Label2 = "Milletvekili";
        }

        var ilkDortToplam = 0.00;

        IlkBesListe.sort(function (a, b) {
            return parseInt(b.Oy) - parseInt(a.Oy);
        });

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

        // $(".AlinanOy span:last-child").number(true, 0);
    }
}

function AjaxCalls() {

    if (SeciliLocation == "0") { // Tüm Türkiye
        GenelVeri();
    }
    else if (SeciliLocation == "1") { // İl Seçili
        GenelVeri();
        SehirVeri();
    }
    else if (SeciliLocation == "2") { // ilçe seçili
        GenelVeri();
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
        async: true,
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

            LineChart();
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

    //$.each(PieChartJson, function (a, b) {

    //    if (x < 4 && parseInt(b.Oy) != 0 && b.No != "0") {

    //        dataProvider.push({
    //            "country": PartiRenkler[b.No][0],
    //            "value": ((parseInt(b.Oy) * 100) / GecerliOy).toFixed(2),
    //            "color": PartiRenkler[b.No][1]
    //        });
    //        DigerOy += parseFloat(((parseInt(b.Oy) * 100) / GecerliOy).toFixed(2));
    //        x++;

    //    }



    //});
    //dataProvider.push({
    //    "country": DigerKelimesi,
    //    "value": (100 - DigerOy).toFixed(2),
    //    "color": "#4c4c3f"
    //});

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
                            $('#PartiListe_' + MVSayili).append("<div class='" + ((SayiSi > Count_MS) ? "secili" : "") + "' satirTip='" + ((Count_MS % 2 == 0) ? "cift" : "tek") + "' count='" + Count_MS + "'>" + a + "</div>");
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

    if (window.location.href.indexOf("DegisimENG.html") > -1) {
        Deger += "<option selected='selected' disabled style='display:none;'>Select a District</option>";
    }
    else if (window.location.href.indexOf("DegisimAR.html") > -1) {
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

function LineChart() {

    var lineGecerliOy;
    var chart;
    var chartData = [];
    var Partiler = [];

    var BirinciId, IkinciId, UcuncuId, DorduncuId;

    var Birinci_2002 = 1, Ikinci_2002 = 1, Ucuncu_2002 = 1, Dorduncu_2002 = 1;
    var Birinci_2007 = 1, Ikinci_2007 = 1, Ucuncu_2007 = 1, Dorduncu_2007 = 1;
    var Birinci_2011 = 1, Ikinci_2011 = 1, Ucuncu_2011 = 1, Dorduncu_2011 = 1;
    var Birinci_2015 = 1, Ikinci_2015 = 1, Ucuncu_2015 = 1, Dorduncu_2015 = 1;

    if (SeciliLocation == "0") {
        lineGecerliOy = JsonVeri.AA.TurkiyeGeneli.Sandik.GecerliOy;

        $.each(JsonVeri.AA.TurkiyeGeneli.Sonuclar.Parti, function (a, b) {
            Partiler.push({ No: b.No, Adi: b.Adi, Oy: b.Oy, MilletVekiliSayisi: b.MilletVekiliSayisi });
        });
    }
    else {
        $.each(JsonVeri.AA.IlSonuclari.Il, function (a, b) {
            if (b.Kod == SeciliId) {

                lineGecerliOy = b.Sandik.GecerliOy;

                $.each(b.Sonuclar.Parti, function (a, b) {
                    Partiler.push({ No: b.No, Adi: b.Adi, Oy: b.Oy, MilletVekiliSayisi: b.MilletVekiliSayisi });
                });
            }
        });
    }

    Partiler.sort(function (a, b) {
        return b.Oy - a.Oy;
    });

    BirinciId = Partiler[0].Oy != 0 ? Partiler[0].No : 0;
    IkinciId = Partiler[1].Oy != 0 ? Partiler[1].No : 0;
    UcuncuId = Partiler[2].Oy != 0 ? Partiler[2].No : 0;
    DorduncuId = Partiler[3].Oy != 0 ? Partiler[3].No : 0;

    if (LineTip == "lineSayi") {
        Birinci_2015 = Partiler[0].Oy;
        Ikinci_2015 = Partiler[1].Oy;
        Ucuncu_2015 = Partiler[2].Oy;
        Dorduncu_2015 = Partiler[3].Oy;
    }
    else if (LineTip == "lineOran") {
        Birinci_2015 = ((Partiler[0].Oy * 100) / lineGecerliOy).toFixed(2);
        Ikinci_2015 = ((Partiler[1].Oy * 100) / lineGecerliOy).toFixed(2);
        Ucuncu_2015 = ((Partiler[2].Oy * 100) / lineGecerliOy).toFixed(2);
        Dorduncu_2015 = ((Partiler[3].Oy * 100) / lineGecerliOy).toFixed(2);
    }
    else if (LineTip == "lineMilletvekili") {
        Birinci_2015 = Partiler[0].MilletVekiliSayisi;
        Ikinci_2015 = Partiler[1].MilletVekiliSayisi;
        Ucuncu_2015 = Partiler[2].MilletVekiliSayisi;
        Dorduncu_2015 = Partiler[3].MilletVekiliSayisi;
    }

    $.getJSON("js/EskiSecim_v8.json", function (data) {

        $.each(data.aaaa.Secim, function (a, b) {
            if (b.IlBolgeID == SeciliId) {
                if (LineTip == "lineSayi") {
                    Birinci_2002 = b[BirinciId];
                    Ikinci_2002 = b[IkinciId];
                    Ucuncu_2002 = b[UcuncuId];
                    Dorduncu_2002 = b[DorduncuId];
                }
                else if (LineTip == "lineOran") {
                    Birinci_2002 = b[BirinciId + "_O"] != undefined ? parseFloat(b[BirinciId + "_O"].replace(',', '.')).toFixed(2) : 0;
                    Ikinci_2002 = b[IkinciId + "_O"] != undefined ? parseFloat(b[IkinciId + "_O"].replace(',', '.')).toFixed(2) : 0;
                    Ucuncu_2002 = b[UcuncuId + "_O"] != undefined ? parseFloat(b[UcuncuId + "_O"].replace(',', '.')).toFixed(2) : 0;
                    Dorduncu_2002 = b[DorduncuId + "_O"] != undefined ? parseFloat(b[DorduncuId + "_O"].replace(',', '.')).toFixed(2) : 0;
                }
                else if (LineTip == "lineMilletvekili") {
                    Birinci_2002 = b[BirinciId + "_M"];
                    Ikinci_2002 = b[IkinciId + "_M"];
                    Ucuncu_2002 = b[UcuncuId + "_M"];
                    Dorduncu_2002 = b[DorduncuId + "_M"];
                }
            }
        });

        $.each(data.bbbb.Secim, function (a, b) {
            if (b.IlBolgeID == SeciliId) {
                if (LineTip == "lineSayi") {
                    Birinci_2007 = b[BirinciId];
                    Ikinci_2007 = b[IkinciId];
                    Ucuncu_2007 = b[UcuncuId];
                    Dorduncu_2007 = b[DorduncuId];
                }
                else if (LineTip == "lineOran") {
                    Birinci_2007 = b[BirinciId + "_O"] != undefined ? parseFloat(b[BirinciId + "_O"].replace(',', '.')).toFixed(2) : 0;
                    Ikinci_2007 = b[IkinciId + "_O"] != undefined ? parseFloat(b[IkinciId + "_O"].replace(',', '.')).toFixed(2) : 0;
                    Ucuncu_2007 = b[UcuncuId + "_O"] != undefined ? parseFloat(b[UcuncuId + "_O"].replace(',', '.')).toFixed(2) : 0;
                    Dorduncu_2007 = b[DorduncuId + "_O"] != undefined ? parseFloat(b[DorduncuId + "_O"].replace(',', '.')).toFixed(2) : 0;
                }
                else if (LineTip == "lineMilletvekili") {
                    Birinci_2007 = b[BirinciId + "_M"];
                    Ikinci_2007 = b[IkinciId + "_M"];
                    Ucuncu_2007 = b[UcuncuId + "_M"];
                    Dorduncu_2007 = b[DorduncuId + "_M"];
                }
            }
        });

        $.each(data.cccc.Secim, function (a, b) {
            if (b.IlBolgeID == SeciliId) {
                if (LineTip == "lineSayi") {
                    Birinci_2011 = b[BirinciId];
                    Ikinci_2011 = b[IkinciId];
                    Ucuncu_2011 = b[UcuncuId];
                    Dorduncu_2011 = b[DorduncuId];
                }
                else if (LineTip == "lineOran") {
                    Birinci_2011 = b[BirinciId + "_O"] != undefined ? parseFloat(b[BirinciId + "_O"].replace(',', '.')).toFixed(2) : 0;
                    Ikinci_2011 = b[IkinciId + "_O"] != undefined ? parseFloat(b[IkinciId + "_O"].replace(',', '.')).toFixed(2) : 0;
                    Ucuncu_2011 = b[UcuncuId + "_O"] != undefined ? parseFloat(b[UcuncuId + "_O"].replace(',', '.')).toFixed(2) : 0;
                    Dorduncu_2011 = b[DorduncuId + "_O"] != undefined ? parseFloat(b[DorduncuId + "_O"].replace(',', '.')).toFixed(2) : 0;
                }
                else if (LineTip == "lineMilletvekili") {
                    Birinci_2011 = b[BirinciId + "_M"];
                    Ikinci_2011 = b[IkinciId + "_M"];
                    Ucuncu_2011 = b[UcuncuId + "_M"];
                    Dorduncu_2011 = b[DorduncuId + "_M"];
                }
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
        valueAxis1.gridCount = 15;
        valueAxis1.autoGridCount = false;
        chart.addValueAxis(valueAxis1);

        // 1.Parti
        var line1 = new AmCharts.AmGraph();
        line1.valueAxis = valueAxis1;
        line1.title = PartiRenkler[BirinciId][0];
        line1.lineColor = PartiRenkler[BirinciId][1];
        line1.valueField = "BIR";
        line1.bullet = "round";
        line1.hideBulletsCount = 30;
        line1.bulletBorderThickness = 1;
        chart.addGraph(line1);

        // 2.Parti
        var line2 = new AmCharts.AmGraph();
        line2.valueAxis = valueAxis1;
        line2.title = PartiRenkler[IkinciId][0];
        line2.lineColor = PartiRenkler[IkinciId][1];
        line2.valueField = "IKI";
        line2.bullet = "round";
        line2.hideBulletsCount = 30;
        line2.bulletBorderThickness = 1;
        chart.addGraph(line2);

        // 3.Parti
        var line3 = new AmCharts.AmGraph();
        line3.valueAxis = valueAxis1;
        line3.title = PartiRenkler[UcuncuId][0];
        line3.lineColor = PartiRenkler[UcuncuId][1];
        line3.valueField = "UC";
        line3.bullet = "round";
        line3.hideBulletsCount = 30;
        line3.bulletBorderThickness = 1;
        chart.addGraph(line3);

        // 4.Parti
        var line4 = new AmCharts.AmGraph();
        line4.valueAxis = valueAxis1;
        line4.title = PartiRenkler[DorduncuId][0];
        line4.lineColor = PartiRenkler[DorduncuId][1];
        line4.valueField = "DORT";
        line4.bullet = "round";
        line4.hideBulletsCount = 30;
        line4.bulletBorderThickness = 1;
        chart.addGraph(line4);

        // CURSOR
        var chartCursor = new AmCharts.ChartCursor();
        chartCursor.cursorAlpha = 0.1;
        chartCursor.fullWidth = true;
        chartCursor.selectWithoutZooming = true;

        chart.addChartCursor(chartCursor);
        //chartCursor.enabled = false;

        // LEGEND
        var legend = new AmCharts.AmLegend();
        legend.marginLeft = 20;
        legend.valueWidth = 70;
        chart.addLegend(new Date());

        // WRITE
        chart.write("lineChart");

    });
}