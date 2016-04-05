﻿function CanvasCizme() { !function (i, e, t, a) { function l(i, e) { arguments.length && this._init(i, e) } l.prototype = { defaults: { percent: !0, value: 0, maxValue: 100, radius: 32, thickness: 6, backFillColor: "rgb(199, 199, 199)", fillColor: "#e15656", centerFillColor: "#222", decimals: 0, retinaReady: !0 }, _init: function (e, t) { this.element = i(e), this.options = i.extend({}, this.defaults, t, this.element.data()), this.canvas = this._build(), this._draw(this._prepareCanvas(this.canvas)) }, _build: function () { var a = i("<span></span>"), l = t.createElement("canvas"); if (this.element.append(a.clone().addClass("digit-container")).append(a.clone().addClass("canvas-container").append(i(l))).addClass("circular-stat"), !l.getContext) { if ("undefined" == typeof e.G_vmlCanvasManager) return console.log("Your browser does not support HTML5 Canvas, or excanvas.js is missing on IE"), this.element.hide(), !1; l = e.G_vmlCanvasManager.initElement(l) } return l }, _getPixelRatio: function (i) { return (e.devicePixelRatio || 1) / (i.webkitBackingStorePixelRatio || i.mozBackingStorePixelRatio || i.msBackingStorePixelRatio || i.oBackingStorePixelRatio || i.backingStorePixelRatio || 1) }, _prepareCanvas: function (i) { var e = 2 * this.options.radius, t = i.getContext("2d"), t = this._getPixelRatio(t); return i.width = i.height = e * t, t > 1 && (i.style.width = e + "px", i.style.height = e + "px"), i }, _draw: function (e) { var t = e.getContext("2d"), a = this._getPixelRatio(t), l = 2 * (this.options.value / this.options.maxValue) * Math.PI, n = e.width / 2, o = e.height / 2, r = this.options.radius, s = 100 != parseInt(this._getVal()) ? this._getVal().toFixed(2) : this._getVal(); t.save(), t.clearRect(0, 0, e.width, e.height), t.translate(n, o), t.scale(a, a), t.rotate(-Math.PI / 2), t.fillStyle = this.options.backFillColor, t.beginPath(), t.arc(0, 0, r, 0, 2 * Math.PI, !1), t.closePath(), t.fill(), t.fillStyle = this.options.fillColor, t.beginPath(), t.arc(0, 0, r, 0, l, !1), t.lineTo(0, 0), t.closePath(), t.fill(), t.fillStyle = this.options.centerFillColor, t.beginPath(), t.arc(0, 0, r - this.options.thickness, 0, 2 * Math.PI, !1), t.closePath(), t.fill(), t.restore(), i(".digit-container", this.element).css({ lineHeight: 2 * this.options.radius + "px" })[0].innerHTML = this.options.percent ? "<span>%" + s + "</span>" : "<span>" + s + "</span>/" + this.options.maxValue.toFixed(this.options.decimals) }, _getVal: function () { return this.options.percent ? 100 * (this.options.value / this.options.maxValue) : this.options.value }, option: function (e, t) { if (0 === arguments.length) return i.extend({}, this.options); if ("string" == typeof e) { if (t === a) return this.options[e]; switch (e) { case "value": t = Math.max(0, Math.min(t, this.options.maxValue)) } this.options[e] = t, this._draw("radius" === e ? this._prepareCanvas(this.canvas) : this.canvas) } return this } }, i.fn.circularStat = function (e) { var t = "string" == typeof e, n = Array.prototype.slice.call(arguments, 1), o = this; return t && "_" === e.charAt(0) ? o : (this.each(t ? function () { var t = i.data(this, "circular"), l = t && i.isFunction(t[e]) ? t[e].apply(t, n) : t; return l !== t && l !== a ? (o = l, !1) : void 0 } : function () { i.data(this, "circular") || i.data(this, "circular", new l(this, e)) }), o) }, i(function () { i("[data-provide=circular]").each(function () { var e = i(this); e.circularStat(e.data()) }) }) }(jQuery, window, document) } function CanvasCizme2() { !function (i, e, t, a) { function l(i, e) { arguments.length && this._init(i, e) } l.prototype = { defaults: { percent: !0, value: 0, maxValue: 100, radius: 32, thickness: 6, backFillColor: "#E4E6F0", fillColor: "#e15656", centerFillColor: "#0A0A0A", decimals: 0, retinaReady: !0 }, _init: function (e, t) { this.element = i(e), this.options = i.extend({}, this.defaults, t, this.element.data()), this.canvas = this._build(), this._draw(this._prepareCanvas(this.canvas)) }, _build: function () { var a = i("<span></span>"), l = t.createElement("canvas"); if (this.element.append(a.clone().addClass("digit-container")).append(a.clone().addClass("canvas-container").append(i(l))).addClass("circular-stat"), !l.getContext) { if ("undefined" == typeof e.G_vmlCanvasManager) return console.log("Your browser does not support HTML5 Canvas, or excanvas.js is missing on IE"), this.element.hide(), !1; l = e.G_vmlCanvasManager.initElement(l) } return l }, _getPixelRatio: function (i) { return (e.devicePixelRatio || 1) / (i.webkitBackingStorePixelRatio || i.mozBackingStorePixelRatio || i.msBackingStorePixelRatio || i.oBackingStorePixelRatio || i.backingStorePixelRatio || 1) }, _prepareCanvas: function (i) { var e = 2 * this.options.radius, t = i.getContext("2d"), t = this._getPixelRatio(t); return i.width = i.height = e * t, t > 1 && (i.style.width = e + "px", i.style.height = e + "px"), i }, _draw: function (e) { var t = e.getContext("2d"), a = this._getPixelRatio(t), l = 2 * (this.options.value / this.options.maxValue) * Math.PI, n = e.width / 2, o = e.height / 2, r = this.options.radius, s = 100 != parseInt(this._getVal()) ? this._getVal().toFixed(2) : this._getVal(); t.save(), t.clearRect(0, 0, e.width, e.height), t.translate(n, o), t.scale(a, a), t.rotate(-Math.PI / 2), t.fillStyle = this.options.backFillColor, t.beginPath(), t.arc(0, 0, r, 0, 2 * Math.PI, !1), t.closePath(), t.fill(), t.fillStyle = this.options.fillColor, t.beginPath(), t.arc(0, 0, r, 0, l, !1), t.lineTo(0, 0), t.closePath(), t.fill(), t.fillStyle = this.options.centerFillColor, t.beginPath(), t.arc(0, 0, r - this.options.thickness, 0, 2 * Math.PI, !1), t.closePath(), t.fill(), t.restore(), i(".digit-container", this.element).css({ lineHeight: 2 * this.options.radius + "px" })[0].innerHTML = this.options.percent ? "<span>%" + s + "</span>" : "<span>" + s + "</span>/" + this.options.maxValue.toFixed(this.options.decimals) }, _getVal: function () { return this.options.percent ? 100 * (this.options.value / this.options.maxValue) : this.options.value }, option: function (e, t) { if (0 === arguments.length) return i.extend({}, this.options); if ("string" == typeof e) { if (t === a) return this.options[e]; switch (e) { case "value": t = Math.max(0, Math.min(t, this.options.maxValue)) } this.options[e] = t, this._draw("radius" === e ? this._prepareCanvas(this.canvas) : this.canvas) } return this } }, i.fn.circularStat = function (e) { var t = "string" == typeof e, n = Array.prototype.slice.call(arguments, 1), o = this; return t && "_" === e.charAt(0) ? o : (this.each(t ? function () { var t = i.data(this, "circular"), l = t && i.isFunction(t[e]) ? t[e].apply(t, n) : t; return l !== t && l !== a ? (o = l, !1) : void 0 } : function () { i.data(this, "circular") || i.data(this, "circular", new l(this, e)) }), o) }, i(function () { i("[data-provide=circular2]").each(function () { var e = i(this); e.circularStat(e.data()) }) }) }(jQuery, window, document) } function LokasyonDetay(i) { if (void 0 != i) { $("#L_Adi").text("2" == SeciliLocation ? $("#Sehirler option:selected").text() + "/" + i.Ad.toUpperCase() : $("#Sehirler option:selected").text()), $("#L_ToplamS").text(parseInt(i.Sandik.ToplamSandik)).number(!0, 0), $("#L_AcilanS").text(parseInt(i.Sandik.AcilanSandik)).number(!0, 0), $("#L_KullanilanOy").text(parseInt(i.Sandik.KullanilanOy)).number(!0, 0), $("#L_GecerliOy").text(parseInt(i.Sandik.GecerliOy)).number(!0, 0), $("#LokasyonPartiler").slideDown("fast"); var e = (100 * i.Sandik.AcilanSandik / i.Sandik.ToplamSandik).toFixed(2); e = e >= 100 ? 100 : e, $("#LokasyonAcilanSandik").html(""), $("#LokasyonAcilanSandik").prepend("<span data-provide='circular2' data-fill-color='rgb(41, 89, 213)' data-value='" + e + "' data-radius='47' data-percent='true' data-thickness='21'></span>"); var t = i.Sonuclar.Parti, a = i.Sandik.GecerliOy, l = 0, n = 0, o = 0, r = 0, s = "", c = ""; window.location.href.indexOf("indexENG.html") > -1 ? (s = "Votes", c = "Deputy") : window.location.href.indexOf("indexAR.html") > -1 ? (s = "عدد الأصوات", c = "النائب") : (s = "Oy Sayısı", c = "Milletvekili"); var d = 0; void 0 != t.length && t.sort(function (i, e) { return parseInt(e.Oy) - parseInt(i.Oy) }), $("#IlkBesDiv").html(""); for (var p = 0; p < t.length; p++) if (4 > o && "0" != t[p].No) { var h = (100 * t[p].Oy / a).toFixed(2); h = h >= 100 ? 100 : h, h = "0" == a ? "0" : h; var u = t[p].No; parseInt(t[p].No) > 20 && (u = 21), "0" != t[p].Oy && (d += parseFloat(h), $("#IlkBesDiv").append("<div class='LokasyonParti'><div><img src='../images/logo" + u + ".png'></div><div class='OranSonuc'>% " + h + "</div><div class='AlinanOy'><span class='LabelKismi'>" + s + "</span>:<span>" + parseInt(t[p].Oy).toLocaleString() + "</span></div><div class='VekilSayisi'><span class='LabelKismi'>" + c + "</span>:<span>" + t[p].MilletVekiliSayisi + "</span></div> </div> "), o++) } else n += parseInt(t[p].MilletVekiliSayisi), l += parseInt(t[p].Oy); r = (100 - d).toFixed(2), r = r >= 100 ? 100 : r, r = "0" == a ? "0" : r, "0" != r && "0.00" != r && (isNaN(n) && (n = "-"), $("#IlkBesDiv").append("<div class='LokasyonParti'><div><img src='../images/logo0.png'></div><div class='OranSonuc'>% " + r + "</div><div class='AlinanOy'><span class='LabelKismi'>" + s + "</span>:<span>" + parseInt(l).toLocaleString() + "</span></div><div class='VekilSayisi'><span class='LabelKismi'>" + c + "</span>:<span>" + n + "</span></div> </div> ")), "1" == SeciliLocation ? $(".VekilSayisi").show() : $(".VekilSayisi").hide(), CanvasCizme2() } } function AjaxCalls() { "0" == SeciliLocation ? (GenelVeri(), HaritaVeri()) : "1" == SeciliLocation ? (GenelVeri(), HaritaVeri(), SehirVeri()) : "2" == SeciliLocation && (GenelVeri(), HaritaVeri(), SehirVeri()), setTimeout(function () { AjaxCalls() }, TekrarSuresi) } function GenelVeri() { $.ajax({ dataType: "json", url: "Handlers/GenelVeri.ashx", data: { GumrukDahil: GumrukCheck }, async: !1, cache: !0, success: function (i) { JsonVeri = i, HeaderVeri(), document.getElementById("OranRadio").checked ? PieChartOyOran() : PieChartMilletSayisi() } }) } function HaritaVeri() { $.ajax({ dataType: "json", url: "Handlers/HaritaVeri.ashx", async: !0, cache: !0, data: { GumrukDahil: GumrukCheck }, success: function (i) { JsonHarita = i, "0" == HaritaSeciliParti ? TurkiyeHarita() : TurkiyeHaritaPartiyeGore(HaritaSeciliParti) } }) } function SehirVeri() { $.ajax({ dataType: "json", url: "Handlers/IlceVeri.ashx", data: { IlKodu: SeciliId }, async: !0, cache: !0, success: function (i) { JsonSehirVeri = i, MilletVekiliListe(), IlcelerListe(), IlcelerCombo(), document.getElementById("OranRadio").checked ? PieChartOyOran() : PieChartMilletSayisi() } }) } function HeaderVeri() { $.ajax({ dataType: "json", url: "Handlers/GenelUstVeri.ashx", async: !0, cache: !0, success: function (i) { var e, t = i.TurkiyeGeneli, a = t.Sandik.GecerliOy, l = (100 * t.Sandik.AcilanSandik / t.Sandik.ToplamSandik).toFixed(2); l = l >= 100 ? 100 : l; var n = (100 * t.Sandik.KullanilanOy / t.Sandik.AcilanSandikSecmenSayisi).toFixed(2); n = n >= 100 ? 100 : n, isNaN(n) && (n = 0), $("#CircularOrani1").html(""), $("#CircularOrani1").prepend("<span class='AcilanSandikLokasyon' data-provide='circular' data-fill-color='rgb(41, 89, 213)' data-value='" + l + "' data-radius='45' data-percent='true' data-thickness='17'></span>"), CanvasCizme(), $("#ililcetoplamsandiksayi").text(parseInt(t.Sandik.ToplamSandik)).number(!0, 0), $("#ililceacilansandiksayi").text(parseInt(t.Sandik.AcilanSandik)).number(!0, 0), $("#ililcetoplamsecmensayi").text(parseInt(t.Sandik.ToplamSecmen)).number(!0, 0), $("#ililcekullanilanoy").text(parseInt(t.Sandik.KullanilanOy)).number(!0, 0), $("#ililceacilansandikorani").text("% " + n), $("#ililcegecerlioy").text(parseInt(t.Sandik.GecerliOy)).number(!0, 0); var o = t.Sonuclar.Parti, r = 0, s = 0, c = "0", d = 0, p = 0, h = 0, u = ""; u = window.location.href.indexOf("indexENG.html") > -1 ? "Turkey" : window.location.href.indexOf("indexAR.html") > -1 ? "ديك رومي" : "Türkiye", $("#LegendsUl").html(""), $("#LegendsUl").append("<li class='active' particode='0'><a href='javascript:void(0)'>" + u + "</a></li>"), o.sort(function (i, e) { return e.Oy - i.Oy }); for (var f = 0; f < o.length; f++) 4 > d && "0" != o[f].No ? ($("#" + f + "_Sonuc > .MilletSayisi > span").text(o[f].MilletVekiliSayisi), c = "0" == o[f].Oy ? "0" : o[f].No, $("#" + f + "_Footer_Logo").attr("src", "../images/logo" + c + ".png"), e = (100 * o[f].Oy / a).toFixed(2), e = e >= 100 ? 100 : e, e = "0" == a ? "0.00" : e, $("#" + f + "_Sonuc > .footerSonuc").text("% " + e), p += parseFloat(e), "0" != o[f].Oy && "0" != o[f].No && $("#LegendsUl").append("<li particode='" + o[f].No + "'><a href='javascript:void(0)'><div class='Renk' style='background:" + PartiRenkler[o[f].No][1] + "' ></div><div class='Adi'>" + PartiRenkler[o[f].No][0] + "</div></a></li>"), d++) : (0 == h && "0" != o[f].Oy && "0" != o[f].No && ($("#LegendsUl").append("<li particode='" + o[f].No + "'><a href='javascript:void(0)'><div class='Renk' style='background:" + PartiRenkler[o[f].No][1] + "' ></div><div class='Adi'>" + PartiRenkler[o[f].No][0] + "</div></a></li>"), h++), s += parseInt(o[f].MilletVekiliSayisi), r += parseInt(o[f].Oy)); $("#Besinci_Sonuc > .MilletSayisi > span").text(isNaN(s) ? "-" : s), c = "0", $("#Besinci_Footer_Logo").attr("src", "../images/logo" + c + ".png"), e = (100 - p).toFixed(2), e = e >= 100 ? 100 : e, e = "0" == a ? "0.00" : e, $("#Besinci_Sonuc > .footerSonuc").text("% " + e), $("#LegendsUl").append("<li class='son'></li>"), $("#LegendsUl").prepend("<li class='ilk'></li>"), $("#LegendsUl > li").removeClass("active"), $("#LegendsUl > li[particode='" + HaritaSeciliParti + "']").addClass("active"), $("#LegendsUl > li").click(function () { $("#LegendsUl > li").removeClass("active"), $(this).addClass("active"), HaritaSeciliParti = $(this).attr("particode"), "0" == $(this).attr("particode") ? TurkiyeHarita() : TurkiyeHaritaPartiyeGore($(this).attr("particode")) }) } }) } function TurkiyeHarita() { var i = []; $("#map").hide(), $("#map").empty(); var e, t = new Array; r = Raphael("map"), r.setViewBox(0, 110, 1020, 600), r.setSize("750", "450"); var a, l = 0; $.each(JsonHarita, function (n, o) { function s(i) { if (window.location.href.indexOf("indexENG.html") > -1) var e = "Deputy"; else if (window.location.href.indexOf("indexAR.html") > -1) var e = "النائب"; else var e = "Milletvekili"; "notSelected" == paths[t[this.id]].value && this.animate({ fill: "#A2A7AC", stroke: "#ffffff" }, 0); var a = "", l = "", n = ""; $.each(JsonVeri.AA.IlSonuclari.Il, function (i, e) { if (e.Kod == o.IlKod) if (n = e.Sandik.MilletvekiliSayisi, e.Sonuclar.Parti.length > 0) { var t = e.Sonuclar.Parti; t.sort(function (i, e) { return e.MilletVekiliSayisi - i.MilletVekiliSayisi }), $.each(t, function (i, e) { "0" != e.MilletVekiliSayisi && "-" != e.MilletVekiliSayisi && (l += "<div class='TooltipTek'><div class='Baslik'>" + PartiRenkler[e.No][0] + "</div><div class='Bilgi'>" + e.MilletVekiliSayisi + "</div></div>") }) } else "0" != e.Sonuclar.Parti.MilletVekiliSayisi && "-" != z.MilletVekiliSayisi && (l += "<div class='TooltipTek'><div class='Baslik'>" + PartiRenkler[e.Sonuclar.Parti.No][0] + "</div><div class='Bilgi'>" + e.Sonuclar.Parti.MilletVekiliSayisi + "</div></div>") }), $("#tooltipBaslik").html("<div>" + this.attrs.title.toUpperCase() + "</div><div style='float:left;'>" + e + " : " + n + "</div>"), $("#tooltip").css("border-color", PartiRenkler[o.PartiKod][1]), a += l, $("#tooltipIcerik").html(a), $("#tooltip").css("left", i.clientX).css("top", i.clientY + 10), $("#tooltip").show() } function c() { "notSelected" == paths[t[this.id]].value && this.animate({ fill: $("#" + this.node.id).attr("test"), stroke: "#ffffff" }, 0), $("#tooltip").hide() } if (o.IlKod > 0 && o.IlKod < 82 || 601 == o.IlKod || 602 == o.IlKod || 341 == o.IlKod || 342 == o.IlKod || 343 == o.IlKod || 351 == o.IlKod || 352 == o.IlKod) { { paths[o.IlKod] } if (e = r.path(paths[o.IlKod].path), t[e.id] = o.IlKod, void 0 != paths[o.IlKod].county) { paths[o.IlKod].IDLERI = l; var d = (o.IlKod, paths[o.IlKod].county); if (a = PartiRenkler[o.PartiKod][1], 0 != o.PartiKod) { var p = { ad: PartiRenkler[o.PartiKod][0], renk: PartiRenkler[o.PartiKod][1] }; if (o.PartiKod > 20) { var h = ""; h = window.location.href.indexOf("indexENG.html") > -1 ? "INDEPENDENT" : window.location.href.indexOf("indexAR.html") > -1 ? "INDEPENDENT" : "BAĞIMSIZ", p.ad = h } JSON.stringify(i).indexOf(p.ad) < 0 && i.push(p) } try { "0" == d.substring(0, 1) ? d.substring(1, 2) == o.IlKod && (e.node.id = "Sehir" + d, e.attr({ "stroke-width": "1.1", fill: a, stroke: "#ffffff", title: paths[o.IlKod].name.toString().toUpperCase() }), $("#Sehir" + d).attr({ test: a }), $("#Sehir" + d).parent().removeAttr("title")) : d == o.IlKod && (e.node.id = "Sehir" + d, e.attr({ "stroke-width": "1.1", fill: a, stroke: "#ffffff", title: paths[o.IlKod].name.toString().toUpperCase() }), $("#Sehir" + d).attr({ test: a }), $("#Sehir" + d).parent().removeAttr("title")) } catch (u) { } } e.click(function () { $(".PieChartSecim > div:nth-child(2)").css("opacity", "1"), t[this.id] != SeciliId && (SeciliLocation = "1", SeciliId = t[this.id], SehirVeri(), $(".LokasyonDetay").slideDown("slow")), "notSelected" == paths[t[this.id]].value ? (this.animate({ fill: "#999" }, 0), paths[previouscountyselected].value = "notSelected", paths[t[this.id]].value = "isSelected", previouscountyselected = t[this.id], start || past == this || past.animate({ fill: $("#" + past.node.id).attr("test") }, 0), past = this, start = !1) : "isSelected" == paths[t[this.id]].value && this.animate({ fill: "#999" }, 0) }), e.mouseout(c), e.mouseover(s), l++ } }), i.sort(function (i, e) { var t = i.ad, a = e.ad; return a > t ? -1 : t > a ? 1 : 0 }), $("#map div.MapLogo").remove(), $("#map").prepend("<div class='MapLogo'></div>"), setTimeout(function () { $("#map").slideDown(1e3) }, 300), $(document).scroll(function () { $(".HaritaTooltip").hide() }) } function TurkiyeHaritaPartiyeGore(i) { var e = []; $("#map").hide(), $("#map").empty(); var t, a = new Array; r = Raphael("map"), r.setViewBox(0, 110, 1020, 600), r.setSize("750", "450"); var l, n = 0, o = 0; $.each(JsonVeri.AA.IlSonuclari.Il, function (e, t) { if (t.Kod > 0 && t.Kod < 82 || 601 == t.Kod || 602 == t.Kod || 341 == t.Kod || 342 == t.Kod || 343 == t.Kod || 351 == t.Kod || 352 == t.Kod) for (var a = t.Sandik.GecerliOy, l = 0; l < t.Sonuclar.Parti.length; l++) if (t.Sonuclar.Parti[l].No == i) { var n = parseInt(t.Sonuclar.Parti[l].Oy) / a; o = n > o ? n : o; break } }), $.each(JsonVeri.AA.IlSonuclari.Il, function (s, c) { function d(e) { if (window.location.href.indexOf("indexENG.html") > -1) var t = "Deputy"; else if (window.location.href.indexOf("indexAR.html") > -1) var t = "النائب"; else var t = "Milletvekili"; "notSelected" == paths[a[this.id]].value && this.animate({ fill: "#A2A7AC", stroke: "#ffffff" }, 0), $("#tooltipBaslik").html("<div>" + this.attrs.title.toUpperCase() + "</div>"), $("#tooltip").css("border-color", PartiRenkler[i][1]); var l = (JsonVeri.AA.IlSonuclari.Il[paths[c.Kod].IDLERI].Sonuclar.Parti, ""); l += "<div class='TooltipCift'><div class='Baslik'>" + t + "</div><div class='Bilgi'>" + u + "</div></div>", l += "<div class='TooltipTek'><div class='Baslik'>Oy Oranı</div><div class='Bilgi'>" + h + "%</div></div>", l += "<div class='TooltipCift'><div class='Baslik'>Oy Sayısı</div><div class='Bilgi'>" + f + "</div></div>", $("#tooltipIcerik").html(l), $("#tooltip").css("left", e.clientX).css("top", e.clientY + 10), $("#tooltip").show() } function p() { "notSelected" == paths[a[this.id]].value && this.animate({ fill: $("#" + this.node.id).attr("test"), stroke: "#ffffff" }, 0), $("#tooltip").hide() } if (c.Kod > 0 && c.Kod < 82 || 601 == c.Kod || 602 == c.Kod || 341 == c.Kod || 342 == c.Kod || 343 == c.Kod || 351 == c.Kod || 352 == c.Kod) { var h = 0..toFixed(2), u = 0, f = 0, v = c.Sonuclar.Parti, S = 0 == c.Sandik.GecerliOy ? 1 : c.Sandik.GecerliOy; v.length > 0 && v.sort(function (i, e) { return parseInt(e.Oy) - parseInt(i.Oy) }); for (var k = 0, y = 0; y < v.length; y++) if (v[y].No == i) { k = parseInt(v[y].Oy) / S / o, h = (100 * parseInt(v[y].Oy) / S).toFixed(2), u = v[y].MilletVekiliSayisi, f = v[y].Oy; break } { paths[c.Kod] } if (t = r.path(paths[c.Kod].path), a[t.id] = c.Kod, void 0 != paths[c.Kod].county) { paths[c.Kod].IDLERI = n; var m = (c.Kod, paths[c.Kod].county); if (l = PartiRenkler[i][1], 0 != i) { var I = { ad: PartiRenkler[i][0], renk: PartiRenkler[i][1] }; if (c.PartiKod > 20) { var g = ""; g = window.location.href.indexOf("indexENG.html") > -1 ? "INDEPENDENT" : window.location.href.indexOf("indexAR.html") > -1 ? "INDEPENDENT" : "BAĞIMSIZ", I.ad = g } JSON.stringify(e).indexOf(I.ad) < 0 && e.push(I) } try { "0" == m.substring(0, 1) ? m.substring(1, 2) == c.Kod && (t.node.id = "Sehir" + m, t.attr({ "stroke-width": "1.1", fill: l, stroke: "#ffffff", title: paths[c.Kod].name.toString().toUpperCase(), "fill-opacity": k }), $("#Sehir" + m).attr({ test: l }), $("#Sehir" + m).parent().removeAttr("title")) : m == c.Kod && (t.node.id = "Sehir" + m, t.attr({ "stroke-width": "1.1", fill: l, stroke: "#ffffff", title: paths[c.Kod].name.toString().toUpperCase(), "fill-opacity": k }), $("#Sehir" + m).attr({ test: l }), $("#Sehir" + m).parent().removeAttr("title")) } catch (x) { } } t.click(function () { $(".PieChartSecim > div:nth-child(2)").css("opacity", "1"), a[this.id] != SeciliId && (SeciliLocation = "1", SeciliId = a[this.id], SehirVeri(), $(".LokasyonDetay").slideDown("slow")), "notSelected" == paths[a[this.id]].value ? (this.animate({ fill: "#999" }, 0), paths[previouscountyselected].value = "notSelected", paths[a[this.id]].value = "isSelected", previouscountyselected = a[this.id], start || past == this || past.animate({ fill: $("#" + past.node.id).attr("test") }, 0), past = this, start = !1) : "isSelected" == paths[a[this.id]].value && this.animate({ fill: "#999" }, 0) }), t.mouseout(p), t.mouseover(d), n++ } }), e.sort(function (i, e) { var t = i.ad, a = e.ad; return a > t ? -1 : t > a ? 1 : 0 }), $("#map div.MapLogo").remove(), $("#map").prepend("<div class='MapLogo'></div>"), setTimeout(function () { $("#map").slideDown(1e3) }, 300), $(document).scroll(function () { $(".HaritaTooltip").hide() }) } function PieChartOyOran() { document.getElementById("OranRadio").checked = !0, document.getElementById("MSayiRadio").checked = !1; var i, e = 0; "0" == SeciliLocation ? (i = JsonVeri.AA.TurkiyeGeneli.Sonuclar.Parti, e = JsonVeri.AA.TurkiyeGeneli.Sandik.GecerliOy) : "1" == SeciliLocation ? $.each(JsonVeri.AA.IlSonuclari.Il, function (t, a) { a.Kod == SeciliId && (i = a.Sonuclar.Parti, e = a.Sandik.GecerliOy, LokasyonDetay(a)) }) : "2" == SeciliLocation && $.each(JsonSehirVeri.Il.Ilce, function (t, a) { a.Kod == SeciliIlceId && (i = a.Sonuclar.Parti, e = a.Sandik.GecerliOy, LokasyonDetay(a)) }); var t = []; if (i.length > 0) { if (i.sort(function (i, e) { return parseInt(e.Oy) - parseInt(i.Oy) }), window.location.href.indexOf("DegisimENG.html") > -1); else if (window.location.href.indexOf("DegisimAR.html") > -1); else; var a = 0; $.each(i, function (i, l) { if ("0" != l.No) { if (0 != parseInt(l.Oy)) { var n = parseInt(l.Oy) / parseInt(e); .03 > n ? a += parseInt(l.Oy) : t.push({ country: PartiRenkler[l.No][0], value: l.Oy, color: PartiRenkler[l.No][1] }) } } else a += parseInt(l.Oy) }), a > 0 && t.push({ country: "Diğer", value: a, color: "#4c4c3f" }), 0 == t.length && t.push({ country: "Diğer", value: 100, color: "#4c4c3f" }) } else { if (window.location.href.indexOf("DegisimENG.html") > -1); else if (window.location.href.indexOf("DegisimAR.html") > -1); else; var a = 0; if ("0" != i.No) { if (0 != parseInt(i.Oy)) { var l = i.Oy / e; !isNaN(l) && .3 > l ? a += i.Oy : t.push({ country: PartiRenkler[i.No][0], value: i.Oy, color: PartiRenkler[i.No][1] }) } } else a += i.Oy; a > 0 && t.push({ country: "Diğer", value: a, color: "#4c4c3f" }), 0 == t.length && t.push({ country: "Diğer", value: 100, color: "#4c4c3f" }) } AmCharts.makeChart("piechartoyoran", { type: "pie", outlineAlpha: .8, depth3D: 11, startEffect: !0, angle: 30, startDuration: .7, startEffect: "bounce", outlineThickness: 2, legend: { markerType: "circle", position: "bottom", marginLeft: 80, valueWidth: 70, autoMargins: !1, switchable: !1, valueText: "[[percents]]%" }, groupPercent: 3, groupedTitle: "Diğer", groupedColor: "#4c4c3f", labelsEnabled: !0, labelText: "[[title]]", dataProvider: t, valueField: "value", titleField: "country", colorField: "color", balloonText: "[[title]]<br><span style='font-size:14px'> ([[percents]]%) </br>[[value]]</span>" }) } function PieChartMilletSayisi() { document.getElementById("OranRadio").checked = !1, document.getElementById("MSayiRadio").checked = !0; var i; "0" == SeciliLocation ? i = JsonVeri.AA.TurkiyeGeneli.Sonuclar.Parti : "1" == SeciliLocation && $.each(JsonVeri.AA.IlSonuclari.Il, function (e, t) { t.Kod == SeciliId && (i = t.Sonuclar.Parti, LokasyonDetay(t)) }); var e = []; if (window.location.href.indexOf("indexENG.html") > -1) var t = "Others"; else if (window.location.href.indexOf("indexAR.html") > -1) var t = "غيرها"; else var t = "Diğer"; i.length > 0 ? $.each(i, function (i, a) { "-" != a.MilletVekiliSayisi && 0 != parseInt(a.MilletVekiliSayisi) && e.push("0" == a.No ? { country: t, value: parseInt(a.MilletVekiliSayisi), color: "#4c4c3f" } : { country: PartiRenkler[a.No][0], value: parseInt(a.MilletVekiliSayisi), color: PartiRenkler[a.No][1] }) }) : "-" != i.MilletVekiliSayisi && 0 != parseInt(i.MilletVekiliSayisi) && e.push("0" == i.No ? { country: t, value: parseInt(i.MilletVekiliSayisi), color: "#4c4c3f" } : { country: PartiRenkler[i.No][0], value: parseInt(i.MilletVekiliSayisi), color: PartiRenkler[i.No][1] }); AmCharts.makeChart("piechartoyoran", { type: "pie", outlineAlpha: .8, depth3D: 11, startEffect: !0, angle: 30, startDuration: .7, startEffect: "bounce", outlineThickness: 2, legend: { markerType: "circle", position: "bottom", marginLeft: 80, valueWidth: 70, autoMargins: !1, switchable: !1 }, labelsEnabled: !0, groupPercent: 1, groupedTitle: t, groupedColor: "#4c4c3f", labelText: "[[title]]", dataProvider: e, valueField: "value", titleField: "country", colorField: "color", balloonText: "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>" }) } function MilletVekiliListe() { $(".ListeNumara,.Partiler,.PartiListe").html(""); for (var i = 1; i <= JsonSehirVeri.Il.MilletVekiliSayisi; i++) $(".ListeNumara").append("<div count='" + i + "'>" + i + " )</div>"); $.each(JsonVeri.AA.IlSonuclari.Il, function (i, e) { if (e.Kod == SeciliId) { var t = e.Kod, a = e.Sonuclar.Parti; if (a.length > 0) { var l = 0; a.sort(function (i, e) { return parseInt(e.MilletVekiliSayisi) - parseInt(i.MilletVekiliSayisi) }); var n = 0, o = []; $.each(a, function (i, e) { if (parseInt(e.MilletVekiliSayisi) > 0 && void 0 != MilletVekili[0]["Liste_" + t][e.No] && MilletVekili[0]["Liste_" + t][e.No].length > 0 && 3 >= l) { r = 0, o.push(e.No); var a = parseInt(e.MilletVekiliSayisi), s = e.No > 20 ? 21 : e.No, c = PartiRenkler[e.No][0], d = ""; d = window.location.href.indexOf("indexENG.html") > -1 ? "INDEPENDENT" : window.location.href.indexOf("indexAR.html") > -1 ? "INDEPENDENT" : "BAĞIMSIZ", c = e.No > 20 ? d : c, $(".Partiler").append("<span><img id='Logo_" + n + "' src='../images/logo" + s + ".png' /><div id='Parti" + n + "'>" + c + "</div></span>"), $(".PartiListe").append("<div id='PartiListe_" + n + "'></div>"), MilletVekili[0]["Liste_" + t][e.No].forEach(function (i) { $("#PartiListe_" + n).append("<div class='" + (a > r ? "secili" : "") + "' satirTip='" + (r % 2 == 0 ? "cift" : "tek") + "' count='" + r + "'>" + i + "</div>"), r++ }), n++, l++ } }), a.sort(function (i, e) { return parseInt(e.Oy) - parseInt(i.Oy) }), $.each(a, function (i, e) { if (o.indexOf(e.No) < 0 && 4 > n && void 0 != MilletVekili[0]["Liste_" + t][e.No] && MilletVekili[0]["Liste_" + t][e.No].length > 0 && 3 >= l) { r = 0, o.push(e.No); var a = parseInt(e.MilletVekiliSayisi), s = e.No > 20 ? 21 : e.No, c = PartiRenkler[e.No][0], d = ""; d = window.location.href.indexOf("indexENG.html") > -1 ? "INDEPENDENT" : window.location.href.indexOf("indexAR.html") > -1 ? "INDEPENDENT" : "BAĞIMSIZ", c = e.No > 20 ? d : c, $(".Partiler").append("<span><img id='Logo_" + n + "' src='../images/logo" + s + ".png' /><div id='Parti" + n + "'>" + c + "</div></span>"), $(".PartiListe").append("<div id='PartiListe_" + n + "'></div>"), MilletVekili[0]["Liste_" + t][e.No].forEach(function (i) { $("#PartiListe_" + n).append("<div class='" + (a > r ? "secili" : "") + "' satirTip='" + (r % 2 == 0 ? "cift" : "tek") + "' count='" + r + "'>" + i + "</div>"), r++ }), n++, l++ } }) } else { var r = 0, s = parseInt(a.MilletVekiliSayisi), c = a.No > 20 ? 21 : a.No, d = PartiRenkler[a.No][0], p = ""; p = window.location.href.indexOf("indexENG.html") > -1 ? "INDEPENDENT" : window.location.href.indexOf("indexAR.html") > -1 ? "INDEPENDENT" : "BAĞIMSIZ", d = a.No > 20 ? p : d, $(".Partiler").append("<span><img id='Logo_" + n + "' src='../images/logo" + c + ".png' /><div id='Parti" + n + "'>" + d + "</div></span>"), $(".PartiListe").append("<div id='PartiListe_" + n + "'></div>"), MilletVekili[0]["Liste_" + t][a.No].forEach(function (i) { $("#PartiListe_" + n).append("<div class='" + (s > r ? "secili" : "") + "' satirTip='" + (r % 2 == 0 ? "cift" : "tek") + "' count='" + r + "'>" + i + "</div>"), r++ }), n++ } } }), "1" == SeciliLocation && $("#MilletSayisi").text("(" + JsonSehirVeri.Il.MilletVekiliSayisi + ")"), $("#Sehirler").val(SeciliId), $("#Ilceler").removeAttr("disabled"), $(".SehirlerGrid").hide(), $("#SehirListe").hide(), $("#SehirListe").slideDown(500) } function IlcelerListe() { $(".IlcelerListe").html(""); var i = 0; $.each(JsonSehirVeri.Il.Ilce.sort(function (i, e) { return i.Ad.replace("Ç", "C").replace("İ", "I").replace("Ö", "O").replace("Ü", "U").replace("Ş", "S") < e.Ad.replace("Ç", "C").replace("İ", "I").replace("Ö", "O").replace("Ü", "U").replace("Ş", "S") ? -1 : e.Ad.replace("Ç", "C").replace("İ", "I").replace("Ö", "O").replace("Ü", "U").replace("Ş", "S") < i.Ad.replace("Ç", "C").replace("İ", "I").replace("Ö", "O").replace("Ü", "U").replace("Ş", "S") ? 1 : 0 }), function (e, t) { var a = 100 * t.Sandik.AcilanSandik / t.Sandik.ToplamSandik; a = a >= 100 ? "% " + a : "% " + a.toFixed(2), $(".IlcelerListe").append(i % 2 == 0 ? "<div class='IlceRow tek' ilceid='" + t.Kod + "'><div class='IlceAdi'>" + t.Ad + "</div><div class='Ilce_ToplamSandik'>" + t.Sandik.ToplamSandik + "</div><div class='Ilce_AcilanSandik'>" + t.Sandik.AcilanSandik + "</div><div class='Ilce_Oran'>" + a + "</div></div>" : "<div class='IlceRow cift' ilceid='" + t.Kod + "'><div class='IlceAdi'>" + t.Ad + "</div><div class='Ilce_ToplamSandik'>" + t.Sandik.ToplamSandik + "</div><div class='Ilce_AcilanSandik'>" + t.Sandik.AcilanSandik + "</div><div class='Ilce_Oran'>" + a + "</div></div>"), i++ }), $(".IlcelerListe > div").click(function () { $(".IlcelerListe > div").removeClass("secili"), $(this).addClass("secili"), SeciliIlceId = $(this).attr("ilceid"), $("#OranRadio").prop("checked", !0).parent().find("a:first").addClass("checked"), $("#MSayiRadio").prop("checked", !1).parent().find("a:first").removeClass("checked"), $(".PieChartSecim > div:nth-child(2)").css("opacity", "0.1"), PieChartOyOran(), $.each(JsonSehirVeri.Il.Ilce, function (i, e) { e.Kod == SeciliIlceId && (SeciliLocation = "2", LokasyonDetay(e)) }), $("#Ilceler").val(SeciliIlceId), $("#MilletSayisi").text(" / " + $("#Ilceler option:selected").text()) }), "2" == SeciliLocation && ($("#Ilceler").val(SeciliIlceId), $(".IlceRow[ilceid='" + SeciliIlceId + "']").addClass("secili")) } function IlcelerCombo() { var i = ""; i += window.location.href.indexOf("indexENG.html") > -1 ? "<option selected='selected' disabled style='display:none;'>Select a District</option>" : window.location.href.indexOf("indexAR.html") > -1 ? "<option selected='selected' disabled style='display:none;'>اختر قضاء</option>" : "<option selected='selected' disabled style='display:none;'>İlçe Seçiniz</option>", $.each(JsonSehirVeri.Il.Ilce.sort(function (i, e) { return i.Ad.replace("Ç", "C").replace("İ", "I").replace("Ö", "O").replace("Ü", "U").replace("Ş", "S") < e.Ad.replace("Ç", "C").replace("İ", "I").replace("Ö", "O").replace("Ü", "U").replace("Ş", "S") ? -1 : e.Ad.replace("Ç", "C").replace("İ", "I").replace("Ö", "O").replace("Ü", "U").replace("Ş", "S") < i.Ad.replace("Ç", "C").replace("İ", "I").replace("Ö", "O").replace("Ü", "U").replace("Ş", "S") ? 1 : 0 }), function (e, t) { i += "<option value='" + t.Kod + "'>" + t.Ad + "</option>" }), $("#Ilceler").html(""), $("#Ilceler").prepend(i), "2" == SeciliLocation && $("#Ilceler").val(SeciliIlceId) } var JsonVeri, JsonHarita, JsonSehirVeri, TekrarSuresi = 6e4, SeciliLocation = "0", SeciliId = "0", filter, SeciliIlceId = "0", GumrukCheck = "ok", SeciliRow, ArananKelime = "", previouscountyselected = 0, past = null, start = !0, HaritaSeciliParti = "0"; $(document).ready(function () { setTimeout(function () { window.location.href = document.URL }, 6e5), AjaxCalls(), $("#SehirHarfler > div").click(function () { $("#SehirHarfler > div").removeClass("secili"), $(this).addClass("secili") }), $("#Sehirler").change(function () { if (SeciliLocation = 0 == $(this).val() ? "0" : "1", SeciliId = $(this).val(), $(".PieChartSecim > div:nth-child(2)").css("opacity", "1"), "0" != SeciliLocation) SehirVeri(), $(".LokasyonDetay").slideDown("slow"); else { var i = ""; i += window.location.href.indexOf("indexENG.html") > -1 ? "<option selected='selected' disabled style='display:none;'>Select a District</option>" : window.location.href.indexOf("indexAR.html") > -1 ? "<option selected='selected' disabled style='display:none;'>اختر قضاء</option>" : "<option selected='selected' disabled style='display:none;'>İlçe Seçiniz</option>", $("#OranRadio").prop("checked", !0).parent().find("a:first").addClass("checked"), $("#MSayiRadio").prop("checked", !1).parent().find("a:first").removeClass("checked"), PieChartOyOran(), $("#Ilceler").html(i), $("#SehirListe").slideUp("slow"), $("#LokasyonPartiler").slideUp("slow"), $(".LokasyonDetay").slideUp("slow"), $("#L_Adi").text(""), $("#Ilceler").attr("disabled", "disabled") } }), $("#Ilceler").change(function () { SeciliLocation = "2", SeciliIlceId = $(this).val(), $("#OranRadio").prop("checked", !0).parent().find("a:first").addClass("checked"), $("#MSayiRadio").prop("checked", !1).parent().find("a:first").removeClass("checked"), $(".PieChartSecim > div:nth-child(2)").css("opacity", "0.1"), PieChartOyOran(), $("#Location").text($("#Sehirler option:selected").text()), $("#MilletSayisi").text(" / " + $("#Ilceler option:selected").text()), $(".IlcelerListe > div").removeClass("secili"), $("[ilceid='" + SeciliIlceId + "']").addClass("secili") }), $("input.prettyCheckable").each(function () { $(this).prettyCheckable({ labelPosition: "right" }) }), $("#GumrukDahil").on("change", function () { this.checked ? (GumrukCheck = "ok", GenelVeri(), HaritaVeri()) : (GumrukCheck = "not", GenelVeri(), HaritaVeri()) }), $('[name="piechart"]').on("change", function () { "OranRadio" == this.id ? PieChartOyOran() : "2" != SeciliLocation ? PieChartMilletSayisi() : setTimeout(function () { $("#OranRadio").prop("checked", !0).parent().find("a:first").addClass("checked"), $("#MSayiRadio").prop("checked", !1).parent().find("a:first").removeClass("checked") }, 0) }) });
