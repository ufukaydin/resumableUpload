﻿function LokasyonDetay(i) { if (void 0 != i) { $("#L_Adi").text($("#Sehirler > option:selected").text()), $("#L_ToplamS").text(parseInt(i.ToplamSandik)).number(!0, 0), $("#L_AcilanS").text(parseInt(i.AcilanSandik)).number(!0, 0), $("#L_KullanilanOy").text(parseInt(i.KullanilanOy)).number(!0, 0), $("#L_GecerliOy").text(parseInt(i.GecerliOy)).number(!0, 0), $("#LokasyonPartiler").slideDown("fast"); var t = (100 * i.AcilanSandik / i.ToplamSandik).toFixed(2); t = t >= 100 ? 100 : t, t = 0 == i.ToplamSandik ? "0" : t, $("#LokasyonAcilanSandik").html(""), $("#LokasyonAcilanSandik").prepend("<span data-provide='circular2' data-fill-color='rgb(41, 89, 213)' data-value='" + t + "' data-radius='47' data-percent='true' data-thickness='21'></span>"); var e = i.Partiler, a = i.GecerliOy, n = 0, o = 0, s = 0, r = "", l = ""; window.location.href.indexOf("YurtDisiENG.html") > -1 ? (r = "Votes", l = "Deputy") : window.location.href.indexOf("YurtDisiAR.html") > -1 ? (r = "عدد الأصوات", l = "النائب") : (r = "Oy Sayısı", l = "Milletvekili"), e.sort(function (i, t) { return parseInt(t.oy) - parseInt(i.oy) }), $("#IlkBesDiv").html(""); for (var c = 0; c < e.length; c++) if (4 > o && "0" != e[c].No) { var d = (100 * e[c].oy / a).toFixed(2); d = d >= 100 ? 100 : d, d = "0" == a ? "0" : d; var u = e[c].No; parseInt(e[c].No) > 20 && (u = 21), "0" != e[c].oy && ($("#IlkBesDiv").append("<div class='LokasyonParti'><div><img src='../images/logo" + u + ".png'></div><div class='OranSonuc'>% " + d + "</div><div class='AlinanOy'><span class='LabelKismi'>" + r + "</span>:<span>" + parseInt(e[c].oy).toLocaleString() + "</span></div></div> "), o++) } else n += parseInt(e[c].oy); s = (100 * parseInt(n) / a).toFixed(2), s = s >= 100 ? 100 : s, s = "0" == a ? "0" : s, "0" != s && "0.00" != s && $("#IlkBesDiv").append("<div class='LokasyonParti'><div><img src='../images/logo0.png'></div><div class='OranSonuc'>% " + s + "</div><div class='AlinanOy'><span class='LabelKismi'>" + r + "</span>:<span>" + parseInt(n).toLocaleString() + "</span></div></div> "), CanvasCizme2() } } function CanvasCizme2() { !function (i, t, e, a) { function n(i, t) { arguments.length && this._init(i, t) } n.prototype = { defaults: { percent: !0, value: 0, maxValue: 100, radius: 32, thickness: 6, backFillColor: "#E4E6F0", fillColor: "#e15656", centerFillColor: "#0A0A0A", decimals: 0, retinaReady: !0 }, _init: function (t, e) { this.element = i(t), this.options = i.extend({}, this.defaults, e, this.element.data()), this.canvas = this._build(), this._draw(this._prepareCanvas(this.canvas)) }, _build: function () { var a = i("<span></span>"), n = e.createElement("canvas"); if (this.element.append(a.clone().addClass("digit-container")).append(a.clone().addClass("canvas-container").append(i(n))).addClass("circular-stat"), !n.getContext) { if ("undefined" == typeof t.G_vmlCanvasManager) return console.log("Your browser does not support HTML5 Canvas, or excanvas.js is missing on IE"), this.element.hide(), !1; n = t.G_vmlCanvasManager.initElement(n) } return n }, _getPixelRatio: function (i) { return (t.devicePixelRatio || 1) / (i.webkitBackingStorePixelRatio || i.mozBackingStorePixelRatio || i.msBackingStorePixelRatio || i.oBackingStorePixelRatio || i.backingStorePixelRatio || 1) }, _prepareCanvas: function (i) { var t = 2 * this.options.radius, e = i.getContext("2d"), e = this._getPixelRatio(e); return i.width = i.height = t * e, e > 1 && (i.style.width = t + "px", i.style.height = t + "px"), i }, _draw: function (t) { var e = t.getContext("2d"), a = this._getPixelRatio(e), n = 2 * (this.options.value / this.options.maxValue) * Math.PI, o = t.width / 2, s = t.height / 2, r = this.options.radius, l = 100 != parseInt(this._getVal()) ? this._getVal().toFixed(2) : this._getVal(); e.save(), e.clearRect(0, 0, t.width, t.height), e.translate(o, s), e.scale(a, a), e.rotate(-Math.PI / 2), e.fillStyle = this.options.backFillColor, e.beginPath(), e.arc(0, 0, r, 0, 2 * Math.PI, !1), e.closePath(), e.fill(), e.fillStyle = this.options.fillColor, e.beginPath(), e.arc(0, 0, r, 0, n, !1), e.lineTo(0, 0), e.closePath(), e.fill(), e.fillStyle = this.options.centerFillColor, e.beginPath(), e.arc(0, 0, r - this.options.thickness, 0, 2 * Math.PI, !1), e.closePath(), e.fill(), e.restore(), i(".digit-container", this.element).css({ lineHeight: 2 * this.options.radius + "px" })[0].innerHTML = this.options.percent ? "<span>%" + l + "</span>" : "<span>" + l + "</span>/" + this.options.maxValue.toFixed(this.options.decimals) }, _getVal: function () { return this.options.percent ? 100 * (this.options.value / this.options.maxValue) : this.options.value }, option: function (t, e) { if (0 === arguments.length) return i.extend({}, this.options); if ("string" == typeof t) { if (e === a) return this.options[t]; switch (t) { case "value": e = Math.max(0, Math.min(e, this.options.maxValue)) } this.options[t] = e, this._draw("radius" === t ? this._prepareCanvas(this.canvas) : this.canvas) } return this } }, i.fn.circularStat = function (t) { var e = "string" == typeof t, o = Array.prototype.slice.call(arguments, 1), s = this; return e && "_" === t.charAt(0) ? s : (this.each(e ? function () { var e = i.data(this, "circular"), n = e && i.isFunction(e[t]) ? e[t].apply(e, o) : e; return n !== e && n !== a ? (s = n, !1) : void 0 } : function () { i.data(this, "circular") || i.data(this, "circular", new n(this, t)) }), s) }, i(function () { i("[data-provide=circular2]").each(function () { var t = i(this); t.circularStat(t.data()) }) }) }(jQuery, window, document) } function CanvasCizme() { !function (i, t, e, a) { function n(i, t) { arguments.length && this._init(i, t) } n.prototype = { defaults: { percent: !0, value: 0, maxValue: 100, radius: 32, thickness: 6, backFillColor: "rgb(199, 199, 199)", fillColor: "#e15656", centerFillColor: "#222", decimals: 0, retinaReady: !0 }, _init: function (t, e) { this.element = i(t), this.options = i.extend({}, this.defaults, e, this.element.data()), this.canvas = this._build(), this._draw(this._prepareCanvas(this.canvas)) }, _build: function () { var a = i("<span></span>"), n = e.createElement("canvas"); if (this.element.append(a.clone().addClass("digit-container")).append(a.clone().addClass("canvas-container").append(i(n))).addClass("circular-stat"), !n.getContext) { if ("undefined" == typeof t.G_vmlCanvasManager) return console.log("Your browser does not support HTML5 Canvas, or excanvas.js is missing on IE"), this.element.hide(), !1; n = t.G_vmlCanvasManager.initElement(n) } return n }, _getPixelRatio: function (i) { return (t.devicePixelRatio || 1) / (i.webkitBackingStorePixelRatio || i.mozBackingStorePixelRatio || i.msBackingStorePixelRatio || i.oBackingStorePixelRatio || i.backingStorePixelRatio || 1) }, _prepareCanvas: function (i) { var t = 2 * this.options.radius, e = i.getContext("2d"), e = this._getPixelRatio(e); return i.width = i.height = t * e, e > 1 && (i.style.width = t + "px", i.style.height = t + "px"), i }, _draw: function (t) { var e = t.getContext("2d"), a = this._getPixelRatio(e), n = 2 * (this.options.value / this.options.maxValue) * Math.PI, o = t.width / 2, s = t.height / 2, r = this.options.radius, l = 100 != parseInt(this._getVal()) ? this._getVal().toFixed(2) : this._getVal(); e.save(), e.clearRect(0, 0, t.width, t.height), e.translate(o, s), e.scale(a, a), e.rotate(-Math.PI / 2), e.fillStyle = this.options.backFillColor, e.beginPath(), e.arc(0, 0, r, 0, 2 * Math.PI, !1), e.closePath(), e.fill(), e.fillStyle = this.options.fillColor, e.beginPath(), e.arc(0, 0, r, 0, n, !1), e.lineTo(0, 0), e.closePath(), e.fill(), e.fillStyle = this.options.centerFillColor, e.beginPath(), e.arc(0, 0, r - this.options.thickness, 0, 2 * Math.PI, !1), e.closePath(), e.fill(), e.restore(), i(".digit-container", this.element).css({ lineHeight: 2 * this.options.radius + "px" })[0].innerHTML = this.options.percent ? "<span>%" + l + "</span>" : "<span>" + l + "</span>/" + this.options.maxValue.toFixed(this.options.decimals) }, _getVal: function () { return this.options.percent ? 100 * (this.options.value / this.options.maxValue) : this.options.value }, option: function (t, e) { if (0 === arguments.length) return i.extend({}, this.options); if ("string" == typeof t) { if (e === a) return this.options[t]; switch (t) { case "value": e = Math.max(0, Math.min(e, this.options.maxValue)) } this.options[t] = e, this._draw("radius" === t ? this._prepareCanvas(this.canvas) : this.canvas) } return this } }, i.fn.circularStat = function (t) { var e = "string" == typeof t, o = Array.prototype.slice.call(arguments, 1), s = this; return e && "_" === t.charAt(0) ? s : (this.each(e ? function () { var e = i.data(this, "circular"), n = e && i.isFunction(e[t]) ? e[t].apply(e, o) : e; return n !== e && n !== a ? (s = n, !1) : void 0 } : function () { i.data(this, "circular") || i.data(this, "circular", new n(this, t)) }), s) }, i(function () { i("[data-provide=circular]").each(function () { var t = i(this); t.circularStat(t.data()) }) }) }(jQuery, window, document) } function HeaderVeri() { $.ajax({ dataType: "json", url: "Handlers/GenelUstVeri.ashx", async: !0, cache: !0, success: function (i) { var t, e = i.TurkiyeGeneli, a = e.Sandik.GecerliOy, n = (100 * e.Sandik.AcilanSandik / e.Sandik.ToplamSandik).toFixed(2); n = n >= 100 ? 100 : n; var o = (100 * e.Sandik.KullanilanOy / e.Sandik.AcilanSandikSecmenSayisi).toFixed(2); o = o >= 100 ? 100 : o, isNaN(o) && (o = 0), $("#CircularOrani1").html(""), $("#CircularOrani1").prepend("<span class='AcilanSandikLokasyon' data-provide='circular' data-fill-color='rgb(41, 89, 213)' data-value='" + n + "' data-radius='45' data-percent='true' data-thickness='17'></span>"), CanvasCizme(), $("#ililcetoplamsandiksayi").text(parseInt(e.Sandik.ToplamSandik)).number(!0, 0), $("#ililceacilansandiksayi").text(parseInt(e.Sandik.AcilanSandik)).number(!0, 0), $("#ililcetoplamsecmensayi").text(parseInt(e.Sandik.ToplamSecmen)).number(!0, 0), $("#ililcekullanilanoy").text(parseInt(e.Sandik.KullanilanOy)).number(!0, 0), $("#ililceacilansandikorani").text("% " + o), $("#ililcegecerlioy").text(parseInt(e.Sandik.GecerliOy)).number(!0, 0); var s = e.Sonuclar.Parti, r = 0, l = 0, c = "0", d = 0; s.sort(function (i, t) { return t.Oy - i.Oy }); for (var u = 0, p = 0; p < s.length; p++) 4 > u && "0" != s[p].No ? ($("#" + p + "_Sonuc > .MilletSayisi > span").text(s[p].MilletVekiliSayisi), c = "0" == s[p].Oy ? "0" : s[p].No, $("#" + p + "_Footer_Logo").attr("src", "../images/logo" + c + ".png"), t = (100 * s[p].Oy / a).toFixed(2), t = t >= 100 ? 100 : t, t = "0" == a ? "0.00" : t, $("#" + p + "_Sonuc > .footerSonuc").text("% " + t), d += parseFloat(t), u++) : (l += parseInt(s[p].MilletVekiliSayisi), r += parseInt(s[p].Oy)); $("#Besinci_Sonuc > .MilletSayisi > span").text(isNaN(l) ? "-" : l), c = "0", $("#Besinci_Footer_Logo").attr("src", "../images/logo" + c + ".png"), t = (100 - d).toFixed(2), t = t >= 100 ? 100 : t, t = "0" == a ? "0.00" : t, $("#Besinci_Sonuc > .footerSonuc").text("% " + t) } }) } function FiltrelemeYap(i) { return "-" == i ? ($("[type='search']").val(""), void $("[type='search']").trigger("keydown")) : ($("[type='search']").val(""), $("[type='search']").val(i), void $("[type='search']").trigger("keydown")) } function AjaxCalls() { "0" == SeciliLocation ? (GenelVeri(), DunyaHarita1()) : "1" == SeciliLocation && (GenelVeri(), DunyaHarita1()), setTimeout(function () { AjaxCalls() }, TekrarSuresi) } function DunyaHarita() { var i = [], t = "{"; $.ajax({ type: "GET", url: "Handlers/YurtDisiHarita.ashx", success: function (e) { var a = JSON.parse(e); $.each(a, function (e, a) { renk = PartiRenkler[a.Kod][1], t += '"' + a.Id + '" : "' + renk + '",'; var n = { ad: PartiRenkler[a.Kod][0], renk: PartiRenkler[a.Kod][1] }; "0" != a.Kod && JSON.stringify(i).indexOf(n.ad) < 0 && i.push(n) }), i.sort(function (i, t) { var e = i.ad, a = t.ad; return a > e ? -1 : e > a ? 1 : 0 }), $("#wmap div.MapLogo2").remove(), $("#wmap").prepend("<div class='MapLogo2'></div>"), $("#dunyalegends").html(""), $.each(i, function (i, t) { $("#dunyalegends").append("<div><div style='background:" + t.renk + "' ></div><div>" + t.ad + "</div></div>") }), t = t.substring(0, t.length - 1), t += "}", t = JSON.parse(t), $("#wmap").vectorMap({ map: "world_en", backgroundColor: "transparent", color: "#FFFFFF", hoverOpacity: .6, selectedColor: "#666666", enableZoom: !1, values: t, onRegionClick: function (i, t) { t.indexOf("*") <= -1 && ($("#Sehirler").val(t), SeciliLocation = "1", SeciliId = t, PieChartOyOran(), $("#Location").text($("#Sehirler > option:selected").text())) }, scaleColors: ["#C8EEFF", "#006491"], normalizeFunction: "polynomial" }) } }) } function DunyaHarita1() { var i = [], t = "{"; $.ajax({ type: "GET", url: "Handlers/YurtDisiHarita.ashx", success: function (e) { var a = JSON.parse(e); $.each(a, function (e, a) { renk = PartiRenkler[a.Kod][1], t += '"' + a.Id + '" : "' + renk + '",'; var n = { ad: PartiRenkler[a.Kod][0], renk: PartiRenkler[a.Kod][1] }; JSON.stringify(i).indexOf(n.ad) < 0 && i.push(n) }), i.sort(function (i, t) { var e = i.ad, a = t.ad; return a > e ? -1 : e > a ? 1 : 0 }), $("#dunyalegends").html(""), $.each(i, function (i, t) { $("#dunyalegends").append("<div><div style='background:" + t.renk + "' ></div><div>" + t.ad + "</div></div>") }), t = t.substring(0, t.length - 1), t += "}", t = JSON.parse(t), $("#wmap").vectorMap("set", "values", t) } }) } function GenelVeri() { $.ajax({ dataType: "json", url: "Handlers/YurtDisi.ashx", async: !0, cache: !0, success: function (i) { JsonVeri = i, PieChartOyOran(), HeaderVeri() } }) } function PieChartOyOran() { var i, t = 0; "0" == SeciliLocation ? (i = JsonVeri[0].GumrukGeneli.Partiler, t = JsonVeri[0].GumrukGeneli.GecerliOy) : "1" == SeciliLocation && $.each(JsonVeri[0].Ulkeler, function (e, a) { a.Id == SeciliId && (i = a.Partiler, $(".LokasyonDetay").slideDown("slow"), LokasyonDetay(a), t = a.GecerliOy) }); var e = []; if (i.length > 0) { i.sort(function (i, t) { return parseInt(t.oy) - parseInt(i.oy) }); var a = 0; if ($.each(i, function (i, n) { if ("0" != n.No) { if (0 != parseInt(n.oy)) { var o = parseInt(n.oy) / parseInt(t); .03 > o ? a += parseInt(n.oy) : e.push({ country: PartiRenkler[n.No][0], value: n.oy, color: PartiRenkler[n.No][1] }) } } else a += parseInt(n.oy) }), a > 0 && e.push({ country: "Diğer", value: a, color: "#4c4c3f" }), 0 == e.length && e.push({ country: "Diğer", value: 100, color: "#4c4c3f" }), window.location.href.indexOf("YurtDisiENG.html") > -1); else if (window.location.href.indexOf("YurtDisiAR.html") > -1); else; } AmCharts.makeChart("piechartoyoran", { type: "pie", outlineAlpha: .8, depth3D: 11, startEffect: !0, angle: 30, startDuration: .7, startEffect: "bounce", outlineThickness: 2, legend: { markerType: "circle", position: "bottom", marginLeft: 80, valueWidth: 70, autoMargins: !1, switchable: !1, valueText: "[[percents]]%" }, groupPercent: 3, groupedTitle: "Diğer", groupedColor: "#4c4c3f", labelsEnabled: !0, labelText: "[[title]]", dataProvider: e, valueField: "value", titleField: "country", colorField: "color", balloonText: "[[title]]<br><span style='font-size:14px'> ([[percents]]%) </br>[[value]]</span>" }) } var SeciliLocation = "0", SeciliId = "0", JsonVeri, TekrarSuresi = 6e4, ArananKelime = "", SeciliRow; $(document).ready(function () { setTimeout(function () { window.location.href = document.URL }, 6e5), AjaxCalls(), DunyaHarita(), $("#SehirHarfler > div").click(function () { $("#SehirHarfler > div").removeClass("secili"), $(this).addClass("secili") }), $("#Sehirler").change(function () { SeciliLocation = 0 == $(this).val() ? "0" : "1", SeciliId = $(this).val(), $("#Location").text($("option:selected", this).text().toUpperCase()), $(".LokasyonDetay").slideDown("slow"), PieChartOyOran() }) });
