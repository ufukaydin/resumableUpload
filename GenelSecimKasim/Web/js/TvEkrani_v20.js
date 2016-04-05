﻿function AjaxCalls() { GenelVeri(), HaritaVeri(), setTimeout(function () { AjaxCalls() }, TekrarSuresi) } function GenelVeri() { $.ajax({ dataType: "json", url: "Handlers/GenelVeri.ashx", data: { GumrukDahil: GumrukCheck }, async: !0, cache: !0, success: function (e) { JsonVeriGenel = e, SehirVeri(), GenelDatalar(), FooterDatalar(), LineChart() } }) } function SehirVeri() { $.ajax({ dataType: "json", url: "Handlers/IlceVeri.ashx", data: { IlKodu: SeciliIl }, async: !0, cache: !0, success: function (e) { JsonVeriIl = e, IlcelerCombo() } }) } function IlcelerCombo() { var e = ""; e += "<option value='000'>" + JsonVeriIl.Il.Ad.toUpperCase() + "</option>", $.each(JsonVeriIl.Il.Ilce.sort(function (e, i) { return e.Ad.replace("Ç", "C").replace("İ", "I").replace("Ö", "O").replace("Ü", "U").replace("Ş", "S") < i.Ad.replace("Ç", "C").replace("İ", "I").replace("Ö", "O").replace("Ü", "U").replace("Ş", "S") ? -1 : i.Ad.replace("Ç", "C").replace("İ", "I").replace("Ö", "O").replace("Ü", "U").replace("Ş", "S") < e.Ad.replace("Ç", "C").replace("İ", "I").replace("Ö", "O").replace("Ü", "U").replace("Ş", "S") ? 1 : 0 }), function (i, t) { e += "<option value='" + t.Kod + "'>" + t.Ad + "</option>" }), $("#Ilceler").html(""), $("#Ilceler").prepend(e), "2" == SecimSeviye && $("#Ilceler").val(SeciliIlce) } function GenelDatalar() { $(".DortParti,#UstBar > .kolon").animate({ height: "toggle" }, 700), $(".kolon > div > span:eq(1)").text(""); var e = 100 * JsonVeriGenel.AA.TurkiyeGeneli.Sandik.AcilanSandik / JsonVeriGenel.AA.TurkiyeGeneli.Sandik.ToplamSandik, i = e; e = parseInt(e) >= 100 ? 100 : e.toFixed(2), $("#toplamsandiksayi").text(parseInt(JsonVeriGenel.AA.TurkiyeGeneli.Sandik.ToplamSandik).toLocaleString()), $("#acilansandiksayi").text(parseInt(JsonVeriGenel.AA.TurkiyeGeneli.Sandik.AcilanSandik).toLocaleString()); var t = 100 * JsonVeriGenel.AA.TurkiyeGeneli.Sandik.KullanilanOy / JsonVeriGenel.AA.TurkiyeGeneli.Sandik.AcilanSandikSecmenSayisi; t = t >= 100 ? "% " + t : "% " + t.toFixed(2), $("#acilansandikorani").text("% " + e), i = i >= 100 ? 100 : i, $("#ProgresOranGenel").css("width", i + "%"); var a, r, l = JsonVeriGenel.AA.TurkiyeGeneli.Sonuclar.Parti; l.sort(function (e, i) { return i.Oy - e.Oy }), $("#Birinci_Turkiye").text(parseInt(l[0].Oy).toLocaleString()), $("#Birinci_Millet").text(l[0].MilletVekiliSayisi), r = "0" == l[0].Oy ? "0" : l[0].No, $("#Birinci_Logo").attr("src", "../images/logo" + r + ".png"), a = (100 * l[0].Oy / JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy).toFixed(2), a = a >= 100 ? 100 : a, a = "0" == JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy ? "0" : a, $("#Birinci_Chart").html("<span id='cs-1' data-provide='circular' data-fill-color='" + PartiRenkler[l[0].No][1] + "' data-value='" + a + "' data-radius='30' data-percent='true' data-thickness='10'></span>"), $("#Ikinci_Turkiye").text(parseInt(l[1].Oy).toLocaleString()), $("#Ikinci_Millet").text(l[1].MilletVekiliSayisi), r = "0" == l[1].Oy ? "0" : l[1].No, $("#Ikinci_Logo").attr("src", "../images/logo" + r + ".png"), a = (100 * l[1].Oy / JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy).toFixed(2), a = a >= 100 ? 100 : a, a = "0" == JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy ? "0" : a, $("#Ikinci_Chart").html("<span id='cs-1' data-provide='circular' data-fill-color='" + PartiRenkler[l[1].No][1] + "' data-value='" + a + "' data-radius='30' data-percent='true' data-thickness='10'></span>"), $("#Ucuncu_Turkiye").text(parseInt(l[2].Oy).toLocaleString()), $("#Ucuncu_Millet").text(l[2].MilletVekiliSayisi), r = "0" == l[2].Oy ? "0" : l[2].No, $("#Ucuncu_Logo").attr("src", "../images/logo" + r + ".png"), a = (100 * l[2].Oy / JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy).toFixed(2), a = a >= 100 ? 100 : a, a = "0" == JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy ? "0" : a, $("#Ucuncu_Chart").html("<span id='cs-1' data-provide='circular' data-fill-color='" + PartiRenkler[l[2].No][1] + "' data-value='" + a + "' data-radius='30' data-percent='true' data-thickness='10'></span>"), $("#Dorduncu_Turkiye").text(parseInt(l[3].Oy).toLocaleString()), $("#Dorduncu_Millet").text(l[3].MilletVekiliSayisi), r = "0" == l[3].Oy ? "0" : l[3].No, $("#Dorduncu_Logo").attr("src", "../images/logo" + r + ".png"), a = (100 * l[3].Oy / JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy).toFixed(2), a = a >= 100 ? 100 : a, a = "0" == JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy ? "0" : a, $("#Dorduncu_Chart").html("<span id='cs-1' data-provide='circular' data-fill-color='" + PartiRenkler[l[3].No][1] + "' data-value='" + a + "' data-radius='30' data-percent='true' data-thickness='10'></span>"), CanvasCizme("circular", "#F5F6F7"), $(".DortParti,#UstBar > .kolon").animate({ height: "toggle" }, 700) } function HaritaVeri() { $.ajax({ dataType: "json", url: "Handlers/HaritaVeri.ashx", data: { GumrukDahil: GumrukCheck }, async: !0, cache: !0, success: function (e) { JsonVeriHarita = e, "0" == HaritaSeciliParti ? TurkiyeHarita() : TurkiyeHaritaPartiyeGore(HaritaSeciliParti) } }) } function TurkiyeHaritaPartiyeGore(e) { $("#map").empty(); var i, t = new Array; r = Raphael("map"), r.setViewBox(0, 110, 1020, 600), r.setSize("410", "235"); var a, l = 0, o = 0; $.each(JsonVeriGenel.AA.IlSonuclari.Il, function (i, t) { for (var a = t.Sandik.GecerliOy, r = 0; r < t.Sonuclar.Parti.length; r++) if (t.Sonuclar.Parti[r].No == e) { var l = parseInt(t.Sonuclar.Parti[r].Oy) / a; o = l > o ? l : o; break } }), $.each(JsonVeriGenel.AA.IlSonuclari.Il, function (n, c) { var s = c.Sonuclar.Parti, d = c.Sandik.GecerliOy; s.sort(function (e, i) { return parseInt(i.Oy) - parseInt(e.Oy) }); for (var u = 1, p = 0; p < s.length; p++) if (s[p].No == e) { u = parseInt(s[p].Oy) / d / o; break } paths[c.Kod]; if (i = r.path(paths[c.Kod].path), t[i.id] = c.Kod, void 0 != paths[c.Kod].county) { paths[c.Kod].IDLERI = l; var h = (c.Kod, paths[c.Kod].county); a = PartiRenkler[e][1]; try { "0" == h.substring(0, 1) ? h.substring(1, 2) == c.Kod && (i.node.id = "Sehir" + h, i.attr({ "stroke-width": "1.1", fill: a, stroke: "#ffffff", title: paths[c.Kod].name.toString().toUpperCase(), "fill-opacity": u }), $("#Sehir" + h).attr({ test: a }), $("#Sehir" + h).parent().removeAttr("title")) : h == c.Kod && (i.node.id = "Sehir" + h, i.attr({ "stroke-width": "1.1", fill: a, stroke: "#ffffff", title: paths[c.Kod].name.toString().toUpperCase(), "fill-opacity": u }), $("#Sehir" + h).attr({ test: a }), $("#Sehir" + h).parent().removeAttr("title")) } catch (k) { } } l++ }) } function TurkiyeHarita() { $("#map").empty(); var e, i = new Array; LegendsParti = [], r = Raphael("map"), r.setViewBox(0, 110, 1020, 600), r.setSize("410", "235"), $.each(JsonVeriHarita, function (t, a) { paths[a.IlKod]; if (e = r.path(paths[a.IlKod].path), i[e.id] = a.IlKod, void 0 != paths[a.IlKod].county) { var l, o = (a.IlKod, paths[a.IlKod].county); if (l = PartiRenkler[a.PartiKod][1], 0 != a.PartiKod) { var n = { ad: PartiRenkler[a.PartiKod][0], renk: PartiRenkler[a.PartiKod][1], kod: a.PartiKod }; if (a.PartiKod > 20) { var c = "BĞMSZ"; n.ad = c } JSON.stringify(LegendsParti).indexOf(n.ad) < 0 && LegendsParti.push(n) } try { "0" == o.substring(0, 1) ? o.substring(1, 2) == a.IlKod && (e.node.id = "Sehir" + o, e.attr({ "stroke-width": "1.1", fill: l, stroke: "#ffffff", title: paths[a.IlKod].name.toString().toUpperCase() }), $("#Sehir" + o).attr({ test: l }), $("#Sehir" + o).parent().attr({ "data-tooltip": paths[a.IlKod].name.toString().toUpperCase(), "class": "simptip-position-bottom" }).removeAttr("title")) : o == a.IlKod && (e.node.id = "Sehir" + o, e.attr({ "stroke-width": "1.1", fill: l, stroke: "#ffffff", title: paths[a.IlKod].name.toString().toUpperCase() }), $("#Sehir" + o).attr({ test: l }), $("#Sehir" + o).parent().attr({ "data-tooltip": paths[a.IlKod].name.toString().toUpperCase(), "class": "simptip-position-bottom" }).removeAttr("title")) } catch (s) { } } }), $("#haritaLegends").html(""), $.each(LegendsParti, function (e, i) { $("#haritaLegends").append("<div><div style='background:" + i.renk + "' ></div><div>" + i.ad + "</div></div>") }) } function key(e) { if (37 == e.keyCode) switch (selectedTarih) { case 0: chartCursor.showCursorAt(2015), selectedTarih = 2015; break; case 2015: chartCursor.showCursorAt(2011), selectedTarih = 2011; break; case 2011: chartCursor.showCursorAt(2007), selectedTarih = 2007; break; case 2007: chartCursor.showCursorAt(2002), selectedTarih = 2002 } else if (39 == e.keyCode) switch (selectedTarih) { case 0: chartCursor.showCursorAt(2002), selectedTarih = 2002; break; case 2002: chartCursor.showCursorAt(2007), selectedTarih = 2007; break; case 2007: chartCursor.showCursorAt(2011), selectedTarih = 2011; break; case 2011: chartCursor.showCursorAt(2015), selectedTarih = 2015 } else if (13 == e.keyCode) { if (klavyeDegeri.indexOf("72") >= 0) $("#CoktanSecmeli").hide(), $("#Harita").show(), $("#Menu").hide(), $("#Grafik").css("visibility", "hidden"), HaritaSeciliParti = "0", TurkiyeHarita(); else if (klavyeDegeri.indexOf("77") >= 0) $("#CoktanSecmeli").hide(), $("#Harita").hide(), $("#Menu").show(), $("#Grafik").css("visibility", "hidden"); else if (klavyeDegeri.indexOf("71") >= 0) $("#CoktanSecmeli").hide(), $("#Harita").hide(), $("#Menu").hide(), $("#Grafik").css("visibility", "visible"); else if (klavyeDegeri.indexOf("75") >= 0) $("#CoktanSecmeli").show(), $("#Harita").hide(), $("#Menu").hide(), $("#Grafik").css("visibility", "hidden"); else if (klavyeDegeri.indexOf("70") >= 0) { var i = parseInt(String.fromCharCode(klavyeDegeri.split(";")[1])) - 1; -1 == i ? (HaritaSeciliParti = "0", TurkiyeHarita()) : i < LegendsParti.length && (HaritaSeciliParti = LegendsParti[i].kod, TurkiyeHaritaPartiyeGore(LegendsParti[i].kod)) } else if (klavyeDegeri.indexOf("80") >= 0) { if ("none" != $("#Grafik").css("display")) { var t = ""; t = klavyeDegeri.split(";"); for (var a = "", r = 1; r < t.length; r++) { var l = t[r]; l = "96" == l ? "48" : "97" == l ? "49" : "98" == l ? "50" : "99" == l ? "51" : "100" == l ? "52" : "101" == l ? "53" : "102" == l ? "54" : "103" == l ? "55" : "104" == l ? "56" : "105" == l ? "57" : l, a += String.fromCharCode(l) } var o = parseInt(a); o >= 0 && 81 >= o && 6 != o && 34 != o && 35 != o || 601 == o || 602 == o || 341 == o || 342 == o || 343 == o || 351 == o || 352 == o ? (console.log("Grafik Seçim : " + o), GrafikSeciliIl = o, $("#SehirlerGrafik > option").removeAttr("selected"), $("#SehirlerGrafik > option[value='" + GrafikSeciliIl + "'").attr("selected", "selected"), LineChart()) : console.log("Grafik Hatalı id : " + o) } } else if (klavyeDegeri.indexOf("84") >= 0) clearInterval(ChartRoundTime), ChartRoundTime = setInterval(function () { RoundLineChart() }, 2e4), console.log("Grafik Tekrar Etsin"); else if (klavyeDegeri.indexOf("89") >= 0) clearInterval(ChartRoundTime), console.log("Grafik Tekrar Dursun"); else if (klavyeDegeri.indexOf("65") >= 0) { var t = ""; t = klavyeDegeri.split(";"); for (var a = "", r = 1; r < t.length; r++) { var l = t[r]; l = "96" == l ? "48" : "97" == l ? "49" : "98" == l ? "50" : "99" == l ? "51" : "100" == l ? "52" : "101" == l ? "53" : "102" == l ? "54" : "103" == l ? "55" : "104" == l ? "56" : "105" == l ? "57" : l, a += String.fromCharCode(l) } var o = parseInt(a); o >= 1 && 81 >= o && 6 != o && 34 != o && 35 != o || 601 == o || 602 == o || 341 == o || 342 == o || 343 == o || 351 == o || 352 == o ? (console.log("Footer Seçim : " + o), SeciliIl = o, SecimSeviye = "1", $("#Sehirler > option").removeAttr("selected"), $("#Sehirler > option[value='" + SeciliIl + "'").attr("selected", "selected"), SehirVeri(), FooterDatalar()) : console.log("Footer Hatalı id : " + o) } else klavyeDegeri.indexOf("68") >= 0 ? 1 != $("#IlIlceRound").prop("checked") && ($("#IlIlceRound").click(), console.log("Footer Tekrar Etsin")) : klavyeDegeri.indexOf("83") >= 0 && 1 == $("#IlIlceRound").prop("checked") && (clearInterval(FooterRoundTime), $("#IlIlceRound").click(), console.log("Footer Tekrar Dursun")); klavyeDegeri = "" } else klavyeDegeri += e.keyCode.toString() + ";" } function LineChart() { var e, i, t, a, r, l, o, n, c, s, d, u, p, h, k, S, v, m, f, y, I, g, x = [], C = []; "0" == GrafikSeciliIl ? (e = JsonVeriGenel.AA.TurkiyeGeneli.Sandik.GecerliOy, $.each(JsonVeriGenel.AA.TurkiyeGeneli.Sonuclar.Parti, function (e, i) { C.push({ No: i.No, Adi: i.Adi, Oy: i.Oy, MilletVekiliSayisi: i.MilletVekiliSayisi }) }), $("#GrafikTitle").text(""), $("#GrafikTitle").text("TÜRKİYE")) : $.each(JsonVeriGenel.AA.IlSonuclari.Il, function (i, t) { parseInt(t.Kod) == GrafikSeciliIl && (e = t.Sandik.GecerliOy, $.each(t.Sonuclar.Parti, function (e, i) { C.push({ No: i.No, Adi: i.Adi, Oy: i.Oy, MilletVekiliSayisi: i.MilletVekiliSayisi }) }), $("#GrafikTitle").text(""), $("#GrafikTitle").text(t.Ad.toUpperCase())) }), C.sort(function (e, i) { return i.Oy - e.Oy }), f = (100 * C[0].Oy / e).toFixed(2), y = (100 * C[1].Oy / e).toFixed(2), I = (100 * C[2].Oy / e).toFixed(2), g = (100 * C[3].Oy / e).toFixed(2), t = C[0].No, a = C[1].No, r = C[2].No, l = C[3].No, $.getJSON("js/EskiSecim_v8.json", function (e) { $.each(e.aaaa.Secim, function (e, i) { i.IlBolgeID == GrafikSeciliIl && (o = parseFloat(i[t + "_O"].replace(",", ".")).toFixed(2), n = parseFloat(i[a + "_O"].replace(",", ".")).toFixed(2), c = parseFloat(i[r + "_O"].replace(",", ".")).toFixed(2), s = parseFloat(i[l + "_O"].replace(",", ".")).toFixed(2)) }), $.each(e.bbbb.Secim, function (e, i) { i.IlBolgeID == GrafikSeciliIl && (d = parseFloat(i[t + "_O"].replace(",", ".")).toFixed(2), u = parseFloat(i[a + "_O"].replace(",", ".")).toFixed(2), p = parseFloat(i[r + "_O"].replace(",", ".")).toFixed(2), h = parseFloat(i[l + "_O"].replace(",", ".")).toFixed(2)) }), $.each(e.cccc.Secim, function (e, i) { i.IlBolgeID == GrafikSeciliIl && (k = parseFloat(i[t + "_O"].replace(",", ".")).toFixed(2), S = parseFloat(i[a + "_O"].replace(",", ".")).toFixed(2), v = parseFloat(i[r + "_O"].replace(",", ".")).toFixed(2), m = parseFloat(i[l + "_O"].replace(",", ".")).toFixed(2)) }), x.push({ date: 2002, BIR: o, IKI: n, UC: c, DORT: s }), x.push({ date: 2007, BIR: d, IKI: u, UC: p, DORT: h }), x.push({ date: 2011, BIR: k, IKI: S, UC: v, DORT: m }), x.push({ date: 2015, BIR: f, IKI: y, UC: I, DORT: g }), i = new AmCharts.AmSerialChart, i.dataProvider = x, i.categoryField = "date"; var C = i.categoryAxis; C.axisColor = "#DADADA"; var A = new AmCharts.ValueAxis; A.axisColor = "white", A.axisThickness = 3, A.gridAlpha = .1, A.gridCount = 8, A.autoGridCount = !1, i.addValueAxis(A); var G = new AmCharts.AmGraph; G.valueAxis = A, G.title = PartiRenkler[t][0], G.lineColor = PartiRenkler[t][1], G.valueField = "BIR", G.bullet = "round", G.hideBulletsCount = 30, G.bulletBorderThickness = 1, i.addGraph(G); var O = new AmCharts.AmGraph; O.valueAxis = A, O.title = PartiRenkler[a][0], O.lineColor = PartiRenkler[a][1], O.valueField = "IKI", O.bullet = "round", O.hideBulletsCount = 30, O.bulletBorderThickness = 1, i.addGraph(O); var _ = new AmCharts.AmGraph; _.valueAxis = A, _.title = PartiRenkler[r][0], _.lineColor = PartiRenkler[r][1], _.valueField = "UC", _.bullet = "round", _.hideBulletsCount = 30, _.bulletBorderThickness = 1, i.addGraph(_); var F = new AmCharts.AmGraph; F.valueAxis = A, F.title = PartiRenkler[l][0], F.lineColor = PartiRenkler[l][1], F.valueField = "DORT", F.bullet = "round", F.hideBulletsCount = 30, F.bulletBorderThickness = 1, i.addGraph(F), chartCursor.cursorAlpha = .1, chartCursor.fullWidth = !0, chartCursor.selectWithoutZooming = !0, i.addChartCursor(chartCursor); var T = new AmCharts.AmLegend; T.marginLeft = 20, i.addLegend(T), i.write("lineChartDiv") }) } function RoundSehirIlce() { var e = ""; 1 == $("#IlIlceRound").prop("checked") && ("1" == SecimSeviye ? (e = $("#Sehirler > option:selected").val(), "67" == e ? (SeciliIl = "1", $("#Sehirler > option").removeAttr("selected"), $("#Sehirler > option[value='" + SeciliIl + "'").attr("selected", "selected"), SehirVeri(), FooterDatalar()) : (SeciliIl = $("#Sehirler > option[value='" + e + "']").next().val(), $("#Sehirler > option").removeAttr("selected"), $("#Sehirler > option[value='" + SeciliIl + "'").attr("selected", "selected"), SehirVeri(), FooterDatalar())) : "2" == SecimSeviye && (e = $("#Ilceler > option:selected").val(), $("#Ilceler option:last-child").val() == $("#Ilceler > option:selected").val() ? (SeciliIlce = $("#Ilceler option:first").val(), $("#Ilceler > option").removeAttr("selected"), $("#Ilceler > option[value='" + SeciliIlce + "'").attr("selected", "selected"), FooterDatalar()) : (SeciliIlce = $("#Ilceler > option[value='" + e + "']").next().val(), $("#Ilceler > option").removeAttr("selected"), $("#Ilceler > option[value='" + SeciliIlce + "'").attr("selected", "selected"), FooterDatalar()))) } function RoundLineChart() { a = $("#SehirlerGrafik > option:selected").val(), "67" == a ? (GrafikSeciliIl = "1", $("#SehirlerGrafik > option").removeAttr("selected"), $("#SehirlerGrafik > option[value='" + GrafikSeciliIl + "'").attr("selected", "selected"), LineChart()) : (GrafikSeciliIl = $("#SehirlerGrafik > option[value='" + a + "']").next().val(), $("#SehirlerGrafik > option").removeAttr("selected"), $("#SehirlerGrafik > option[value='" + GrafikSeciliIl + "'").attr("selected", "selected"), LineChart()) } function RoundCoktanSehir() { a = $("#SecilmisIller > option:selected").val(), $("#SecilmisIller > option:last").val() == a ? (SeciliIl = $("#SecilmisIller > option:first").val(), $("#SecilmisIller > option").removeAttr("selected"), $("#SecilmisIller > option[value='" + SeciliIl + "'").attr("selected", "selected"), FooterDatalar()) : (SeciliIl = $("#SecilmisIller > option[value='" + a + "']").next().val(), $("#SecilmisIller > option").removeAttr("selected"), $("#SecilmisIller > option[value='" + SeciliIl + "'").attr("selected", "selected"), FooterDatalar()) } function FooterDatalar() { $("#CircularOrani2").html(""), $("#CircularOrani2").prepend("<span class='AcilanSandikLokasyon Renklendirme1' data-provide='circular3' data-fill-color='#1C5BE5' data-value='" + DonguOran + "' data-radius='25' data-percent='true' data-thickness='10'></span>"), CanvasCizme("circular3", SeciliArkaPlan), $("#LokasyonAdi2").text($("#LokasyonAdi").text()), $("#ililcetoplamsandiksayi2").text($("#ililcetoplamsandiksayi").text()), $("#ililcetoplamsecmensayi2").text($("#ililcetoplamsecmensayi").text()), $("#ililceacilansandiksayi2").text($("#ililceacilansandiksayi").text()), $("#ililcekullanilanoy2").text($("#ililcekullanilanoy").text()), $("#ililceacilansandikorani2").text($("#ililceacilansandikorani").text()), $("#ililcegecerlioy2").text($("#ililcegecerlioy").text()), $("#Birinci_Sonuc2 > .footerSonuc").text($("#Birinci_Sonuc > .footerSonuc").text()), $("#Ikinci_Sonuc2 > .footerSonuc").text($("#Ikinci_Sonuc > .footerSonuc").text()), $("#Ucuncu_Sonuc2 > .footerSonuc").text($("#Ucuncu_Sonuc > .footerSonuc").text()), $("#Dorduncu_Sonuc2 > .footerSonuc").text($("#Dorduncu_Sonuc > .footerSonuc").text()), $("#Besinci_Sonuc2 > .footerSonuc").text($("#Besinci_Sonuc > .footerSonuc").text()), $("#Birinci_M2").text($("#Birinci_M").text()), $("#Ikinci_M2").text($("#Ikinci_M").text()), $("#Ucuncu_M2").text($("#Ucuncu_M").text()), $("#Dorduncu_M2").text($("#Dorduncu_M").text()), $("#Besinci_M2").text($("#Besinci_M").text()), $("#Birinci_Footer_Logo2").attr("src", $("#Birinci_Footer_Logo").attr("src")), $("#Ikinci_Footer_Logo2").attr("src", $("#Ikinci_Footer_Logo").attr("src")), $("#Ucuncu_Footer_Logo2").attr("src", $("#Ucuncu_Footer_Logo").attr("src")), $("#Dorduncu_Footer_Logo2").attr("src", $("#Dorduncu_Footer_Logo").attr("src")), $("#Besinci_Footer_Logo2").attr("src", $("#Besinci_Footer_Logo").attr("src")), $(".footer").animate({ left: "-=720px" }, 0), "000" == SeciliIlce && (SecimSeviye = "1"); var e; "1" == SecimSeviye ? $.each(JsonVeriGenel.AA.IlSonuclari.Il, function (i, t) { if (t.Kod == SeciliIl) { $("#LokasyonAdi").text(t.Ad.toUpperCase()), $(".MilletSayisi").show(); var a = t.Sandik.GecerliOy, r = (100 * t.Sandik.AcilanSandik / t.Sandik.ToplamSandik).toFixed(2); r = r >= 100 ? 100 : r, DonguOran = r, $("#CircularOrani1").html(""), $("#CircularOrani1").prepend("<span class='AcilanSandikLokasyon Renklendirme1' data-provide='circular2' data-fill-color='#1C5BE5' data-value='" + r + "' data-radius='25' data-percent='true' data-thickness='10'></span>"), $("#ililcetoplamsandiksayi").text(parseInt(t.Sandik.ToplamSandik).toLocaleString()), $("#ililceacilansandiksayi").text(parseInt(t.Sandik.AcilanSandik).toLocaleString()), $("#ililcetoplamsecmensayi").text(parseInt(t.Sandik.ToplamSecmen).toLocaleString()), $("#ililcekullanilanoy").text(parseInt(t.Sandik.KullanilanOy).toLocaleString()), $("#ililceacilansandikorani").text("% " + r), $("#ililcegecerlioy").text(parseInt(t.Sandik.GecerliOy).toLocaleString()); var l, o = t.Sonuclar.Parti, n = 0, c = "", s = 0, d = 0, u = 0, p = 0; o.sort(function (e, i) { return i.Oy - e.Oy }), $("#AltKisimDiv").html(""); for (var h = 0; h < o.length; h++) if (4 > n && "0" != o[h].No) if ("0" != o[h].Oy && 5 > n) { switch (n) { case 0: c = "Birinci"; break; case 1: c = "Ikinci"; break; case 2: c = "Ucuncu"; break; case 3: c = "Dorduncu"; break; case 4: c = "Besinci" } "0" != o[h].Oy && (e = (100 * o[h].Oy / a).toFixed(2), e = e >= 100 ? 100 : e, e = "0" == a ? "0.00" : e, l = "0" == o[h].Oy ? "0" : o[h].No, l = parseInt(l) > 20 ? 21 : l, s += parseFloat(e), $("#AltKisimDiv").append("<div class='footerParti' id='" + c + "_Sonuc'><div><img id='" + c + "_Footer_Logo' src='../images/logo" + l + ".png'></div><div class='footerSonuc Renklendirme1'>% " + e + "</div><div class='MilletSayisi Renklendirme1'>Milletvekili :<span id='" + c + "_M'>" + o[n].MilletVekiliSayisi + "</span></div></div>"), n++) } else p += parseInt(o[h].MilletVekiliSayisi), u += parseInt(o[h].Oy); d = (100 - s).toFixed(2), d = d >= 100 ? 100 : d, d = "0" == a ? "0" : d, "0" != d && "0.00" != d && (c = "Besinci", $("#AltKisimDiv").append("<div class='footerParti' id='" + c + "_Sonuc'><div><img id='" + c + "_Footer_Logo' src='../images/logo0.png'></div><div class='footerSonuc Renklendirme1'>% " + d + "</div><div class='MilletSayisi Renklendirme1'>Milletvekili :<span id='" + c + "_M'>" + p + "</span></div></div>")), CanvasCizme("circular2", SeciliArkaPlan) } }) : "2" == SecimSeviye && $.each(JsonVeriIl.Il.Ilce, function (i, t) { if (t.Kod == SeciliIlce) { $("#LokasyonAdi").text(JsonVeriIl.Il.Ad.toUpperCase() + " / " + t.Ad.toUpperCase()), $(".MilletSayisi").hide(); var a = t.Sandik.GecerliOy, r = (100 * t.Sandik.AcilanSandik / t.Sandik.ToplamSandik).toFixed(2); r = r >= 100 ? 100 : r, DonguOran = r, $("#CircularOrani1").html(""), $("#CircularOrani1").prepend("<span class='AcilanSandikLokasyon Renklendirme1' data-provide='circular2' data-fill-color='#1C5BE5' data-value='" + r + "' data-radius='25' data-percent='true' data-thickness='10'></span>"), $("#AcilanSandikLokasyon").attr("data-value", r), $("#ililcetoplamsandiksayi").text(parseInt(t.Sandik.ToplamSandik).toLocaleString()), $("#ililceacilansandiksayi").text(parseInt(t.Sandik.AcilanSandik).toLocaleString()), $("#ililcetoplamsecmensayi").text(parseInt(t.Sandik.ToplamSecmen).toLocaleString()), $("#ililcekullanilanoy").text(parseInt(t.Sandik.KullanilanOy).toLocaleString()), $("#ililceacilansandikorani").text("% " + r), $("#ililcegecerlioy").text(parseInt(t.Sandik.GecerliOy).toLocaleString()); var l, o = t.Sonuclar.Parti, n = 0, c = "", s = 0, d = 0, u = 0, p = 0; o.sort(function (e, i) { return i.Oy - e.Oy }), $("#AltKisimDiv").html(""); for (var h = 0; h < o.length; h++) if (4 > n && "0" != o[h].No) if ("0" != o[h].Oy && 5 > n) { switch (n) { case 0: c = "Birinci"; break; case 1: c = "Ikinci"; break; case 2: c = "Ucuncu"; break; case 3: c = "Dorduncu"; break; case 4: c = "Besinci" } "0" != o[h].Oy && (e = (100 * o[h].Oy / a).toFixed(2), e = e >= 100 ? 100 : e, e = "0" == a ? "0.00" : e, l = "0" == o[h].Oy ? "0" : o[h].No, l = parseInt(l) > 20 ? 21 : l, s += parseFloat(e), $("#AltKisimDiv").append("<div class='footerParti' id='" + c + "_Sonuc'><div><img id='" + c + "_Footer_Logo' src='../images/logo" + l + ".png'></div><div class='footerSonuc Renklendirme1'>% " + e + "</div></div>"), n++) } else p += parseInt(o[h].MilletVekiliSayisi), u += parseInt(o[h].Oy); d = (100 - s).toFixed(2), d = d >= 100 ? 100 : d, d = "0" == a ? "0" : d, "0" != d && "0.00" != d && (c = "Besinci", $("#AltKisimDiv").append("<div class='footerParti' id='" + c + "_Sonuc'><div><img id='" + c + "_Footer_Logo' src='../images/logo0.png'></div><div class='footerSonuc Renklendirme1'>% " + d + "</div></div>")), CanvasCizme("circular2", SeciliArkaPlan) } }), "000" == SeciliIlce && (SecimSeviye = "2"), $(".footer").animate({ left: "+=720px" }, 1e3) } function CanvasCizme(e, i) { "bos" == i && (i = "rgb(64, 64, 65)"), function (t, a, r, l) { function o(e, i) { arguments.length && this._init(e, i) } o.prototype = { defaults: { percent: !0, value: 0, maxValue: 100, radius: 32, thickness: 6, backFillColor: "rgb(199, 199, 199)", fillColor: "#e15656", centerFillColor: i, decimals: 0, retinaReady: !0 }, _init: function (e, i) { this.element = t(e), this.options = t.extend({}, this.defaults, i, this.element.data()), this.canvas = this._build(), this._draw(this._prepareCanvas(this.canvas)) }, _build: function () { var e = t("<span></span>"), i = r.createElement("canvas"); if (this.element.append(e.clone().addClass("digit-container")).append(e.clone().addClass("canvas-container").append(t(i))).addClass("circular-stat"), !i.getContext) { if ("undefined" == typeof a.G_vmlCanvasManager) return console.log("Your browser does not support HTML5 Canvas, or excanvas.js is missing on IE"), this.element.hide(), !1; i = a.G_vmlCanvasManager.initElement(i) } return i }, _getPixelRatio: function (e) { return (a.devicePixelRatio || 1) / (e.webkitBackingStorePixelRatio || e.mozBackingStorePixelRatio || e.msBackingStorePixelRatio || e.oBackingStorePixelRatio || e.backingStorePixelRatio || 1) }, _prepareCanvas: function (e) { var i = 2 * this.options.radius, t = e.getContext("2d"), t = this._getPixelRatio(t); return e.width = e.height = i * t, t > 1 && (e.style.width = i + "px", e.style.height = i + "px"), e }, _draw: function (i) { var a = i.getContext("2d"), r = this._getPixelRatio(a), l = 2 * (this.options.value / this.options.maxValue) * Math.PI, o = i.width / 2, n = i.height / 2, c = this.options.radius; if ("circular" == e) var s = 100 != parseInt(this._getVal()) ? this._getVal().toFixed(2) : this._getVal(); else var s = 100 != parseInt(this._getVal()) ? this._getVal().toFixed(2) : this._getVal(); a.save(), a.clearRect(0, 0, i.width, i.height), a.translate(o, n), a.scale(r, r), a.rotate(-Math.PI / 2), a.fillStyle = this.options.backFillColor, a.beginPath(), a.arc(0, 0, c, 0, 2 * Math.PI, !1), a.closePath(), a.fill(), a.fillStyle = this.options.fillColor, a.beginPath(), a.arc(0, 0, c, 0, l, !1), a.lineTo(0, 0), a.closePath(), a.fill(), a.fillStyle = this.options.centerFillColor, a.beginPath(), a.arc(0, 0, c - this.options.thickness, 0, 2 * Math.PI, !1), a.closePath(), a.fill(), a.restore(), t(".digit-container", this.element).css({ lineHeight: 2 * this.options.radius + "px" })[0].innerHTML = this.options.percent ? "<span>%" + s + "</span>" : "<span>" + s + "</span>/" + this.options.maxValue.toFixed(this.options.decimals) }, _getVal: function () { return this.options.percent ? 100 * (this.options.value / this.options.maxValue) : this.options.value }, option: function (e, i) { if (0 === arguments.length) return t.extend({}, this.options); if ("string" == typeof e) { if (i === l) return this.options[e]; switch (e) { case "value": i = Math.max(0, Math.min(i, this.options.maxValue)) } this.options[e] = i, this._draw("radius" === e ? this._prepareCanvas(this.canvas) : this.canvas) } return this } }, t.fn.circularStat = function (e) { var i = "string" == typeof e, a = Array.prototype.slice.call(arguments, 1), r = this; return i && "_" === e.charAt(0) ? r : (this.each(i ? function () { var i = t.data(this, "circular"), o = i && t.isFunction(i[e]) ? i[e].apply(i, a) : i; return o !== i && o !== l ? (r = o, !1) : void 0 } : function () { t.data(this, "circular") || t.data(this, "circular", new o(this, e)) }), r) }, t(function () { t("[data-provide=" + e + "]").each(function () { var e = t(this); e.circularStat(e.data()) }) }), $("canvas,span").css("cursor", "none") }(jQuery, window, document) } var FooterRoundTime, ChartRoundTime, SeciliIl = "1", SeciliIlce = "0", SecimSeviye = "1", GrafikSeciliIl = "0", GumrukCheck = "ok", JsonVeriGenel, JsonVeriIl, JsonVeriHarita, HaritaSeciliParti = "0", TekrarSuresi = 6e4, DonguSuresi = 2e4, DonguOran, SeciliArkaPlan; $(document).ready(function () { document.addEventListener("contextmenu", function (e) { e.preventDefault() }, !1), $.browser.chrome = /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()), $.browser.chrome || (alert("Sayfamız Chrome tarayıcısında sorunsuz çalışmaktadır. Lütfen Chrome kullanın."), $(".TumSayfa").css("margin-top", "-1000px"), window.location.href = "https://www.google.com.tr/chrome/browser"), $.ajax({ url: "Handlers/Renklendirme.ashx", async: !1, data: { RenkOkuma: "1" }, success: function (e) { var i = e.split("|"); SeciliArkaPlan = i[0], $(".footer,.Title,.footer2").css("background", i[0]), $(".Renklendirme1").css("color", i[1]), $(".Renklendirme2").css("color", i[2]), $(".Renklendirme3").css("color", i[3]), $(".Renklendirme4").css("color", i[4]), AjaxCalls() } }), $("#Sehirler").change(function () { SecimSeviye = "1", SeciliIl = $(this).val(), SehirVeri(), FooterDatalar(), 1 == $("#IlIlceRound").prop("checked") && (clearInterval(FooterRoundTime), FooterRoundTime = setInterval(function () { RoundSehirIlce() }, DonguSuresi)) }), $("#Ilceler").change(function () { SecimSeviye = "2", SeciliIlce = $(this).val(), FooterDatalar(), 1 == $("#IlIlceRound").prop("checked") && (clearInterval(FooterRoundTime), FooterRoundTime = setInterval(function () { RoundSehirIlce() }, DonguSuresi)) }), $("#IlIlceRound").click(function () { 1 == $("#IlIlceRound").prop("checked") ? ($("[name='DonguSuresi']").removeAttr("disabled"), clearInterval(FooterRoundTime), FooterRoundTime = setInterval(function () { RoundSehirIlce() }, DonguSuresi)) : ($("[name='DonguSuresi']").attr("disabled", "disabled"), clearInterval(FooterRoundTime)) }), $("#CoktanSecimBTN").click(function () { clearInterval(FooterRoundTime); var e, i = "0"; $("#SecilmisIller").html(""), $("#CoktanSecSehirler > div > input[type='checkbox']").each(function () { var t = $(this).attr("id").replace("Sehir_", ""); $(this).is(":checked") && ("0" == i ? (e = t, $("#SecilmisIller").append("<option selected='selected' value='" + t + "'></option>")) : $("#SecilmisIller").append("<option value='" + t + "'></option>"), i = "1") }), SecimSeviye = "1", SeciliIl = e, FooterDatalar(), "1" == i && (clearInterval(FooterRoundTime), FooterRoundTime = setInterval(function () { RoundCoktanSehir() }, 2e4)) }), $("#CoktanSecimSifirla").click(function () { $("#CoktanSecSehirler > div > input[type='checkbox']").prop("checked", !1), clearInterval(FooterRoundTime) }), $(document).keydown(function (e) { key(e) }), $("[name='DonguSuresi']").click(function () { DonguSuresi = $(this).val(), clearInterval(FooterRoundTime), FooterRoundTime = setInterval(function () { RoundSehirIlce() }, DonguSuresi) }) }); var LegendsParti = [], klavyeDegeri = "", selectedTarih = 0, chartCursor = new AmCharts.ChartCursor, delay = function () { var e = 0; return function (i, t) { clearTimeout(e), e = setTimeout(i, t) } }();
