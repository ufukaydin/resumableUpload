var SeciliLocation = "0"
var SeciliId = "0";
var JsonVeri;
var TekrarSuresi = 60000;
var ArananKelime = "";
var SeciliRow;

$(document).ready(function () {

    setTimeout(function () {
        window.location.href = document.URL;
    }, 600000);

    AjaxCalls();

    DunyaHarita();

    $("#SehirHarfler > div").click(function () {
        $("#SehirHarfler > div").removeClass("secili");
        $(this).addClass("secili");
    });

    $("#Sehirler").change(function () {
        SeciliLocation = $(this).val() == 0 ? "0" : "1";
        SeciliId = $(this).val();
        $("#Location").text($("option:selected", this).text().toUpperCase());
        $(".LokasyonDetay").slideDown("slow");
        PieChartOyOran();
    });

});

function LokasyonDetay(b) {

    if (b != undefined) {

        $("#L_Adi").text($("#Sehirler > option:selected").text());
        $("#L_ToplamS").text(parseInt(b.ToplamSandik)).number(true, 0);
        $("#L_AcilanS").text(parseInt(b.AcilanSandik)).number(true, 0);
        $("#L_KullanilanOy").text(parseInt(b.KullanilanOy)).number(true, 0);
        $("#L_GecerliOy").text(parseInt(b.GecerliOy)).number(true, 0);

        /* İlk Beş Parti */
        $("#LokasyonPartiler").slideDown("fast");

        var AcilanSandikOran = ((b.AcilanSandik * 100) / b.ToplamSandik).toFixed(2);
        AcilanSandikOran = (AcilanSandikOran >= 100) ? 100 : AcilanSandikOran;
        AcilanSandikOran = (b.ToplamSandik == 0) ? "0" : AcilanSandikOran;
        $("#LokasyonAcilanSandik").html("");
        $("#LokasyonAcilanSandik").prepend("<span data-provide='circular2' data-fill-color='rgb(41, 89, 213)' data-value='" + AcilanSandikOran + "' data-radius='47' data-percent='true' data-thickness='21'></span>")

        var IlkBesListe = b.Partiler;
        var GecerliOyToplam = b.GecerliOy;
        var count = 0;

        var DigerOy = 0;
        var LogoNo = "0";
        var x = 0;
        var OyOran2 = 0;

        var Label1 = "";
        var Label2 = "";

        if (window.location.href.indexOf("YurtDisiENG.html") > -1) {
            Label1 = "Votes";
            Label2 = "Deputy";
        }
        else if (window.location.href.indexOf("YurtDisiAR.html") > -1) {
            Label1 = "عدد الأصوات";
            Label2 = "النائب";
        }
        else {
            Label1 = "Oy Sayısı"
            Label2 = "Milletvekili";
        }

        IlkBesListe.sort(function (a, b) {
            return parseInt(b.oy) - parseInt(a.oy);
        });

        $("#IlkBesDiv").html("");

        for (var i = 0; i < IlkBesListe.length; i++) {

            if (x < 4 && IlkBesListe[i].No != "0") {

                var OyOran = ((IlkBesListe[i].oy * 100) / GecerliOyToplam).toFixed(2);
                OyOran = (OyOran >= 100) ? 100 : OyOran;
                OyOran = (GecerliOyToplam == "0") ? "0" : OyOran;

                var LogoId = IlkBesListe[i].No;

                if (parseInt(IlkBesListe[i].No) > 20) {
                    LogoId = 21;
                }

                if (IlkBesListe[i].oy != "0") {

                    $("#IlkBesDiv").append(
                        "<div class='LokasyonParti'>" +
                                "<div>" +
                                    "<img src='../images/logo" + LogoId + ".png'>" +
                                "</div>" +
                                "<div class='OranSonuc'>% " + OyOran + "</div>" +

                                "<div class='AlinanOy'>" +
                                    "<span class='LabelKismi'>" + Label1 + "</span>:<span>" + parseInt(IlkBesListe[i].oy).toLocaleString() + "</span>" +
                                "</div>" +

                            "</div> "
                        );
                    x++;

                }

            }
            else {
                DigerOy += parseInt(IlkBesListe[i].oy);
            }
        }

        OyOran2 = ((parseInt(DigerOy) * 100) / GecerliOyToplam).toFixed(2);
        OyOran2 = (OyOran2 >= 100) ? 100 : OyOran2;
        OyOran2 = (GecerliOyToplam == "0") ? "0" : OyOran2;

        if (OyOran2 != "0" && OyOran2 != "0.00") {

            $("#IlkBesDiv").append(
                        "<div class='LokasyonParti'>" +
                                "<div>" +
                                    "<img src='../images/logo0.png'>" +
                                "</div>" +
                                "<div class='OranSonuc'>% " + OyOran2 + "</div>" +

                                "<div class='AlinanOy'>" +
                                    "<span class='LabelKismi'>" + Label1 + "</span>:<span>" + parseInt(DigerOy).toLocaleString() + "</span>" +
                                "</div>" +

                            "</div> "
                        );
        }

        CanvasCizme2();
        //$(".AlinanOy span:last-child").number(true, 0);
    }
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

function FiltrelemeYap(d) {
    if (d == "-") {
        $("[type='search']").val("");
        $("[type='search']").trigger("keydown");
        return;
    }
    $("[type='search']").val("");
    $("[type='search']").val(d);
    $("[type='search']").trigger("keydown");
}

function AjaxCalls() {

    if (SeciliLocation == "0") { // Tüm Türkiye
        GenelVeri();
        DunyaHarita1();

    }
    else if (SeciliLocation == "1") { // İl Seçili
        GenelVeri();
        DunyaHarita1();
    }


    setTimeout(function () {
        AjaxCalls();
    }, TekrarSuresi);

}

function DunyaHarita() {

    var LegendsParti = [];
    var sample_data = "{";

    $.ajax({
        type: "GET",
        url: 'Handlers/YurtDisiHarita.ashx',
        success: function (dataCheck) {

            var harita = JSON.parse(dataCheck);

            $.each(harita, function (a, b) {
                renk = PartiRenkler[b.Kod][1];
                sample_data += '"' + b["Id"] + '" : "' + renk + '",';

                var pushData = {
                    ad: PartiRenkler[b.Kod][0], renk: PartiRenkler[b.Kod][1]
                };

                if (b.Kod != "0") {
                    if (JSON.stringify(LegendsParti).indexOf(pushData.ad) < 0) {
                        LegendsParti.push(pushData);
                    }
                }

            });

            LegendsParti.sort(function (a, b) {
                var x = a["ad"]; var y = b["ad"];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });

            $("#wmap div.MapLogo2").remove();
            $("#wmap").prepend("<div class='MapLogo2'></div>");

            $("#dunyalegends").html("");

            $.each(LegendsParti, function (a, b) {
                $("#dunyalegends").append("<div><div style='background:" + b.renk + "' ></div><div>" + b.ad + "</div></div>");
            });

            sample_data = sample_data.substring(0, sample_data.length - 1);
            sample_data += "}";
            sample_data = JSON.parse(sample_data);

            $('#wmap').vectorMap({
                map: 'world_en',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                hoverOpacity: 0.6,
                selectedColor: '#666666',
                enableZoom: false,
                values: sample_data,
                onRegionClick: function (event, code, aa) {

                    if (code.indexOf("*") <= -1) {
                        $("#Sehirler").val(code);
                        SeciliLocation = "1";
                        SeciliId = code;
                        PieChartOyOran();
                        $("#Location").text($("#Sehirler > option:selected").text());
                    }

                },
                scaleColors: ['#C8EEFF', '#006491'],
                normalizeFunction: 'polynomial'
            });

        }
    });

}

function DunyaHarita1() {

    var LegendsParti = [];
    var sample_data = "{";

    $.ajax({
        type: "GET",
        url: 'Handlers/YurtDisiHarita.ashx',
        success: function (dataCheck) {

            var harita = JSON.parse(dataCheck);

            $.each(harita, function (a, b) {
                renk = PartiRenkler[b.Kod][1];
                sample_data += '"' + b["Id"] + '" : "' + renk + '",';
                var pushData = {
                    ad: PartiRenkler[b.Kod][0], renk: PartiRenkler[b.Kod][1]
                };

                if (JSON.stringify(LegendsParti).indexOf(pushData.ad) < 0) {
                    LegendsParti.push(pushData);
                }
            });

            LegendsParti.sort(function (a, b) {
                var x = a["ad"]; var y = b["ad"];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });

            $("#dunyalegends").html("");

            $.each(LegendsParti, function (a, b) {
                $("#dunyalegends").append("<div><div style='background:" + b.renk + "' ></div><div>" + b.ad + "</div></div>");
            });

            sample_data = sample_data.substring(0, sample_data.length - 1);
            sample_data += "}";
            sample_data = JSON.parse(sample_data);

            $('#wmap').vectorMap("set", "values", sample_data);

        }
    });

}

function GenelVeri() {
    $.ajax({
        dataType: "json",
        url: "Handlers/YurtDisi.ashx",

        async: true,
        cache: true,
        success: function (data) {
            JsonVeri = data;
            PieChartOyOran();
            HeaderVeri();
        }
    });
}

function PieChartOyOran() {

    var PieChartJson;
    var GecerliOy = 0;
    if (SeciliLocation == "0") { // Tüm Türkiye
        PieChartJson = JsonVeri[0].GumrukGeneli.Partiler;
        GecerliOy = JsonVeri[0].GumrukGeneli.GecerliOy;
    }
    else if (SeciliLocation == "1") { // İl Seçili
        $.each(JsonVeri[0].Ulkeler, function (a, b) {
            if (b.Id == SeciliId) {
                PieChartJson = b.Partiler;
                $(".LokasyonDetay").slideDown("slow");
                LokasyonDetay(b);
                GecerliOy = b.GecerliOy;
            }
        });
    }

    var dataProvider = [];
    PieChartJson.sort(function (a, b) {
        return parseInt(b.oy) - parseInt(a.oy);

    });

    var x = 0;
    var DigerOy = 0;

    $.each(PieChartJson, function (a, b) {

        if (b.No != "0") {
            if (parseInt(b.oy) != 0) {
                dataProvider.push({
                    "country": PartiRenkler[b.No][0],
                    "value": b.oy,
                    "color": PartiRenkler[b.No][1]
                });
            }

        }
        else {
            dataProvider.push({
                "country": "Diğer",
                "value": b.oy,
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


    if (window.location.href.indexOf("YurtDisiENG.html") > -1) {
        var DigerKelimesi = "Others";
    }
    else if (window.location.href.indexOf("YurtDisiAR.html") > -1) {
        var DigerKelimesi = "غيرها";
    }
    else {
        var DigerKelimesi = "Diğer";
    }

    //dataProvider.push({
    //    "country": DigerKelimesi,
    //    "value": (100 - DigerOy).toFixed(2),
    //    "color": "#4c4c3f"
    //});

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