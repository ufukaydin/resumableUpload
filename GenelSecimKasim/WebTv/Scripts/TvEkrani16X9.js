var JsonVeriHarita;
var HaritaSeciliParti = getCookie("HaritaYogunluk") == "" ? "0" : getCookie("HaritaYogunluk");
var GumrukCheck = "ok";
var SeciliLocation = "0";
var JsonVeri;
var HeaderVeriJson;
var SagTarafJson;
var OrtaTarafJson;
var AltTarafJson;
var SagSeciliId = "-1";
var AltSeciliId = "-1";
var OrtaSeciliId = "-1";
var IlceHaritaSeciliId = getCookie("SehirHaritaSecim") == "" ? "0" : getCookie("SehirHaritaSecim");
//var IlceHaritaGoster = false;

var SeciliParti = getCookie("SeciliParti") == "" ? "0" : getCookie("SeciliParti");
var AltSeciliIlceId = (getCookie("AltKisimIlceleriGoster") == "false" || getCookie("AltKisimIlceleriGoster") == "") ? "0" : "-1";
var LineTip = "lineOran";
var bittimi = false;
var EskiSecimVerisi = null;
var EskiSecimVerisiIlce = null;
var SehirListeDefault = ["1", "2", "3", "4", "68", "5", "601", "602", "7", "75", "8", "9", "10", "74", "72", "69", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "81", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "76", "32", "341", "342", "343", "351", "352", "46", "78", "70", "36", "37", "38", "71", "39", "40", "79", "41", "42", "43", "44", "45", "47", "33", "48", "49", "50", "51", "52", "80", "53", "54", "55", "56", "57", "58", "63", "73", "59", "60", "61", "62", "64", "65", "77", "66", "67"];

var SehirListeSag = getCookie("CookieOrtaKisimId") == "" ? [] : getCookie("CookieOrtaKisimId").split(',');
var SehirListeOrta = getCookie("CookieGrafikKisimId") == "" ? [] : getCookie("CookieGrafikKisimId").split(',');
var SehirListeAlt = getCookie("CookieAltKisimId") == "" ? [] : getCookie("CookieAltKisimId").split(',');
var TekrarSuresiSagTaraf = getCookie("OrtaKisimDonguSuresi") == "" ? 0 : getCookie("OrtaKisimDonguSuresi") * 1000;
var TekrarSuresiAltTaraf = getCookie("AltKisimDonguSuresi") == "" ? 0 : getCookie("AltKisimDonguSuresi") * 1000;
var GrafikKisimDonguSuresi = getCookie("GrafikKisimDonguSuresi") == "" ? 0 : getCookie("GrafikKisimDonguSuresi") * 1000;

var DataYenilemeSuresi = 30000;
var SecimBaglanti = SecimHub.createHubProxy('secimHub');
var SagtarafInterval, AlttarafInterval, IlceInterval, OrtatarafInterval;

function invokelar() {

    $.getJSON("Scripts/EskiSecim_v9_Yanlizca2015.json", function (data) {

        EskiSecimVerisi = data;
    });

    SecimBaglanti.invoke("GenelUstVeri").done(function (data) {
        HeaderVeriJson = JSON.parse(data);
        HeaderVeri(HeaderVeriJson);

    });

    SecimBaglanti.invoke("GenelVeri", GumrukCheck).done(function (data) {
        JsonVeri = JSON.parse(data);
        SagTarafFunc();
        AltTarafFunc();
        OrtaTarafFunc();
        TurkiyeHaritaVeri();
        SehirHaritaVeri();
    });

    setInterval(function () {
        TurkiyeHaritaVeri();
        SehirHaritaVeri();
        SecimBaglanti.invoke("GenelUstVeri").done(function (data) {
            HeaderVeriJson = JSON.parse(data);
            HeaderVeri(HeaderVeriJson);

        });
        SecimBaglanti.invoke("GenelVeri", GumrukCheck).done(function (data) {
            JsonVeri = JSON.parse(data);
        });

    }, DataYenilemeSuresi);

}

function OrtaTarafFunc() {

    clearInterval(OrtatarafInterval);

    if (SehirListeOrta.length < 1) {
        SehirListeOrta = SehirListeDefault;
    }

    if (OrtaSeciliId == "-1") {
        OrtaSeciliId = SehirListeOrta[0];
    }

    if (GrafikKisimDonguSuresi != 0) {

        var index = SehirListeOrta.indexOf(OrtaSeciliId);
        LineChart();
        OrtaSeciliId = SehirListeOrta[index];
        index++;
        OrtatarafInterval = setInterval(function () {
            if (index >= SehirListeOrta.length) {
                index = 0;
            }
            LineChart();
            OrtaSeciliId = SehirListeOrta[index];


            index++;
            if (index >= SehirListeOrta.length) {
                index = 0;
            }
        }, GrafikKisimDonguSuresi);

    }
    else {
        LineChart();
    }

}

function SagTarafFunc() {
    clearInterval(SagtarafInterval);
    if (SehirListeSag.length < 1) {
        SehirListeSag = SehirListeDefault;
    }

    if (SagSeciliId == "-1") {
        SagSeciliId = SehirListeSag[0];

    }

    if (TekrarSuresiSagTaraf != 0) {
        var index = SehirListeSag.indexOf(SagSeciliId);
        SagTaraf(SehirListeSag[index]);

        SagSeciliId = SehirListeSag[index];

        index++;
        SagtarafInterval = setInterval(function () {
            if (index >= SehirListeSag.length) {
                index = 0;
            }
            SagTaraf(SehirListeSag[index]);

            SagSeciliId = SehirListeSag[index];


            index++;
            if (index >= SehirListeSag.length) {
                index = 0;
            }
        }, TekrarSuresiSagTaraf);

    }
    else {
        SagTaraf(SagSeciliId);

    }

}

function AltTarafFunc() {
    clearInterval(AlttarafInterval);

    if (SehirListeAlt.length < 1) {
        SehirListeAlt = SehirListeDefault;
    }
    if (AltSeciliId == "-1") {
        AltSeciliId = SehirListeAlt[0];
    }

    if (TekrarSuresiAltTaraf != 0) {
        if (AltSeciliIlceId == "0") {
            var index1 = 0;
            AltSeciliId = SehirListeAlt[index1];
            AltTaraf(AltSeciliId);
            index1++;
            AlttarafInterval = setInterval(function () {
                if (index1 >= SehirListeAlt.length) {
                    index1 = 0;
                }
                AltTaraf(SehirListeAlt[index1]);
                AltSeciliId = SehirListeAlt[index1];
                index1++;

            }, TekrarSuresiAltTaraf);
        }
        else {
            var index1 = 0;
            AltSeciliId = SehirListeAlt[index1];
            AltTaraf(AltSeciliId, true);
            index1++;
            AlttarafInterval = setInterval(function () {
                if (bittimi) {
                    if (index1 >= SehirListeAlt.length) {
                        index1 = 0;
                    }
                    AltSeciliId = SehirListeAlt[index1];

                    bittimi = false;
                    AltTaraf(AltSeciliId, true);
                    index1++;

                }
            }, 1000);

        }


    }
    else {
        AltTaraf(AltSeciliId);
    }


}

function TekrarEtIlce() {

}

function SagTaraf(_SagSeciliId) {
    if (_SagSeciliId == "0") {
        LokasyonDetaySag(JsonVeri.AA.TurkiyeGeneli);
        SagTarafJson = JsonVeri.AA.TurkiyeGeneli;
    }
    else {

        $.each(JsonVeri.AA.IlSonuclari.Il, function (a, b) {
            if (b.Kod == _SagSeciliId) {
                LokasyonDetaySag(b);
                SagTarafJson = b;
            }
        });
    }
}

function AltTaraf(_AltSeciliId, ilcelerTekrarEdilsinmi) {
    clearInterval(IlceInterval);
    if (_AltSeciliId == "0") {
        LokasyonDetayAlt(JsonVeri.AA.TurkiyeGeneli);
        AltTarafJson = JsonVeri.AA.TurkiyeGeneli;
    }
    else {
        if (AltSeciliIlceId == "0") {
            $.each(JsonVeri.AA.IlSonuclari.Il, function (a, b) {
                if (b.Kod == _AltSeciliId) {

                    LokasyonDetayAlt(b);
                    AltTarafJson = b;
                }
            });
        }
        else {
            SecimBaglanti.invoke("IlceVeri", _AltSeciliId).done(function (data) {

                if (ilcelerTekrarEdilsinmi) {
                    EskiSecimVerisiIlce = JSON.parse(JSON.parse(data).Haziran);
                    var index = 0;
                    AltSeciliIlceId = JSON.parse(JSON.parse(data).Kasim).Il.Ilce[index].Kod;
                    LokasyonDetayAlt(JSON.parse(JSON.parse(data).Kasim));
                    index++;
                    IlceInterval = setInterval(function () {

                        index = JSON.parse(JSON.parse(data).Kasim).Il.Ilce.map(function (d) { return d['Kod']; }).indexOf(AltSeciliIlceId);
                        LokasyonDetayAlt(JSON.parse(JSON.parse(data).Kasim));
                        index++;
                        if (index >= JSON.parse(JSON.parse(data).Kasim).Il.Ilce.length) {

                            AltSeciliIlceId = "-1";
                            bittimi = true;
                            clearInterval(IlceInterval);
                        }
                        else {
                            AltSeciliIlceId = JSON.parse(JSON.parse(data).Kasim).Il.Ilce[index].Kod;
                        }

                    }, TekrarSuresiAltTaraf);

                }
                else {
                    if (AltSeciliIlceId == "-1") {
                        AltSeciliIlceId = JSON.parse(JSON.parse(data).Kasim).Il.Ilce[0].Kod;
                        LokasyonDetayAlt(JSON.parse(JSON.parse(data).Kasim));
                    }
                    else {
                        LokasyonDetayAlt(JSON.parse(JSON.parse(data).Kasim));

                    }

                }
                AltTarafJson = JSON.parse(JSON.parse(data).Kasim);



            });
        }


    }
}

function LokasyonDetayAlt(b) {

    var EskiData;
    $("#AltIl").text("");
    $("#AltIlce").text("");
    if (b != undefined) {
        var LokasyonAdi = "Türkiye Geneli";
        if (AltSeciliId != "0") {
            if (AltSeciliIlceId == "0") {
                var EsklIlDataIndex = EskiSecimVerisi.dddd.Secim.map(function (d) { return d['IlBolgeID']; }).indexOf(b.Kod);
                EskiData = EskiSecimVerisi.dddd.Secim[EsklIlDataIndex];
                LokasyonAdi = b.Ad;
            }
            else {
                LokasyonAdi = b.Il.Ad;
                $.each(b.Il.Ilce, function (x, y) {
                    if (y.Kod == AltSeciliIlceId) {
                        b = y;
                        $("#AltIlce").text(y.Ad);
                        var EsklIlDataIndex = EskiSecimVerisiIlce.Il.Ilce.map(function (d) { return d['Kod']; }).indexOf(y.Kod);
                        EskiData = EskiSecimVerisiIlce.Il.Ilce[EsklIlDataIndex];
                        var veriYeni;
                        var OySayisi = EskiData.Sandik.GecerliOy;
                        var arr = "{";
                        for (var i = 0; i < EskiData.Sonuclar.Parti.length; i++) {
                            var Oran = (EskiData.Sonuclar.Parti[i].Oy * 100 / OySayisi).toFixed(2);
                            arr += "\"" + EskiData.Sonuclar.Parti[i].No + "_O\" :\"" + Oran + "\",";
                            arr += "\"" + EskiData.Sonuclar.Parti[i].No + "_M\" :\"" + "-" + "\",";
                        }
                        arr = "[" + arr.substring(0, arr.length - 1) + "}]";
                        EskiData = JSON.parse(arr)[0];
                        return false;
                    }

                });


            }
        }

        $("#AltIl").text(LokasyonAdi.TurkceUpperCase());

        var AcilanSandikOran = ((b.Sandik.AcilanSandik * 100) / b.Sandik.ToplamSandik).toFixed(2);
        AcilanSandikOran = (AcilanSandikOran >= 100) ? 100 : AcilanSandikOran;
        $("#AltOran").text(AcilanSandikOran);
        var IlkBesListe = b.Sonuclar.Parti;
        var GecerliOyToplam = b.Sandik.GecerliOy;


        if (IlkBesListe.length != undefined) { // Sadece tek parti gelince
            IlkBesListe.sort(function (a, b) {
                return parseInt(b.Oy) - parseInt(a.Oy);
            });
        }

        //secili parti icin ilk beş partiyi al
        var ilkDortParti = [];
        for (var i = 0; i < (IlkBesListe.length > 4 ? 5 : IlkBesListe.length) ; i++) {

            ilkDortParti.push(IlkBesListe[i].No);
        }


        //secili parti ilk beş partide var mı yokmu
        if (ilkDortParti.indexOf(SeciliParti) == -1 && SeciliParti != "0") {
            for (var i = 0; i < 4; i++) {

                $("#" + i + "_AltMSayi").text(IlkBesListe[i].MilletVekiliSayisi == undefined ? "-" : IlkBesListe[i].MilletVekiliSayisi);
                LogoNo = (IlkBesListe[i].Oy == "0") ? "0" : IlkBesListe[i].No;
                $("#" + i + "_AltLogo").attr("src", "../images/logo" + LogoNo + ".png");
                OranDeger = ((IlkBesListe[i].Oy * 100) / GecerliOyToplam).toFixed(2);
                OranDeger = (OranDeger >= 100) ? 100 : OranDeger;
                OranDeger = (GecerliOyToplam == "0") ? "0.00" : OranDeger;
                $("#" + i + "_AltOran").text(OranDeger);
                $("#" + i + "_AltGOran").text(EskiData[IlkBesListe[i].No + "_O"]);
                $("#" + i + "_AltGMSayi").text(EskiData[IlkBesListe[i].No + "_M"]);

            }

            var index = IlkBesListe.map(function (d) { return d['No']; }).indexOf(SeciliParti);

            if (index == -1) {
                i = 4;
                $("#" + i + "_AltMSayi").text(IlkBesListe[i].MilletVekiliSayisi == undefined ? "-" : IlkBesListe[i].MilletVekiliSayisi);
                LogoNo = (IlkBesListe[i].Oy == "0") ? "0" : IlkBesListe[i].No;
                $("#" + i + "_AltLogo").attr("src", "../images/logo" + LogoNo + ".png");
                OranDeger = ((IlkBesListe[i].Oy * 100) / GecerliOyToplam).toFixed(2);
                OranDeger = (OranDeger >= 100) ? 100 : OranDeger;
                OranDeger = (GecerliOyToplam == "0") ? "0.00" : OranDeger;
                $("#" + i + "_AltOran").text(OranDeger);
                $("#" + i + "_AltGOran").text(EskiData[IlkBesListe[i].No + "_O"]);
                $("#" + i + "_AltGMSayi").text(EskiData[IlkBesListe[i].No + "_M"]);
            }
            else {
                $("#" + 4 + "_AltMSayi").text(IlkBesListe[index].MilletVekiliSayisi == undefined ? "-" : IlkBesListe[index].MilletVekiliSayisi);
                LogoNo = (IlkBesListe[index].Oy == "0") ? "0" : IlkBesListe[index].No;
                $("#" + 4 + "_AltLogo").attr("src", "../images/logo" + LogoNo + ".png");
                OranDeger = ((IlkBesListe[index].Oy * 100) / GecerliOyToplam).toFixed(2);
                OranDeger = (OranDeger >= 100) ? 100 : OranDeger;
                OranDeger = (GecerliOyToplam == "0") ? "0.00" : OranDeger;
                $("#" + 4 + "_AltOran").text(OranDeger);
                $("#" + 4 + "_AltGOran").text(EskiData[IlkBesListe[index].No + "_O"]);
                $("#" + 4 + "_AltGMSayi").text(EskiData[IlkBesListe[index].No + "_M"]);

            }



        }
        else {
            for (var i = 0; i < 5; i++) {

                $("#" + i + "_AltMSayi").text(IlkBesListe[i].MilletVekiliSayisi == undefined ? "-" : IlkBesListe[i].MilletVekiliSayisi);
                LogoNo = (IlkBesListe[i].Oy == "0") ? "0" : IlkBesListe[i].No;
                $("#" + i + "_AltLogo").attr("src", "../images/logo" + LogoNo + ".png");
                OranDeger = ((IlkBesListe[i].Oy * 100) / GecerliOyToplam).toFixed(2);
                OranDeger = (OranDeger >= 100) ? 100 : OranDeger;
                OranDeger = (GecerliOyToplam == "0") ? "0.00" : OranDeger;
                $("#" + i + "_AltOran").text(OranDeger);
                $("#" + i + "_AltGOran").text(EskiData[IlkBesListe[i].No + "_O"]);
                $("#" + i + "_AltGMSayi").text(EskiData[IlkBesListe[i].No + "_M"]);

            }
        }




    }

}

function LokasyonDetaySag(b) {

    if (b != undefined) {
        var LokasyonAdi = "Türkiye Geneli";
        if (SagSeciliId != "0") {

            LokasyonAdi = b.Ad;
        }


        $("#OrtaLokasyonAdi").text(LokasyonAdi.TurkceUpperCase());
        var AcilanSandikOran = ((b.Sandik.AcilanSandik * 100) / b.Sandik.ToplamSandik).toFixed(2);
        AcilanSandikOran = (AcilanSandikOran >= 100) ? 100 : AcilanSandikOran;
        $("#OrtaAcilanSandik").text(AcilanSandikOran);
        var IlkBesListe = b.Sonuclar.Parti;
        var GecerliOyToplam = b.Sandik.GecerliOy;
        var EskiData = null;

        if (IlkBesListe.length != undefined) { // Sadece tek parti gelince
            IlkBesListe.sort(function (a, b) {
                return parseInt(b.Oy) - parseInt(a.Oy);
            });
        }


        //secili parti icin ilk beş partiyi al
        var ilkDortParti = [];
        for (var i = 0; i < 5; i++) {
            ilkDortParti.push(IlkBesListe[i].No);
        }



        var EsklIlDataIndex = EskiSecimVerisi.dddd.Secim.map(function (d) { return d['IlBolgeID']; }).indexOf(b.Kod);
        EskiData = EskiSecimVerisi.dddd.Secim[EsklIlDataIndex];


        //secili parti ilk beş partide var mı yokmu
        if (ilkDortParti.indexOf(SeciliParti) == -1 && SeciliParti != "0") {
            for (var i = 0; i < 4; i++) {

                $("#" + i + "_SagMSayi").text(IlkBesListe[i].MilletVekiliSayisi);
                LogoNo = (IlkBesListe[i].Oy == "0") ? "0" : IlkBesListe[i].No;
                $("#" + i + "_SagLogo").attr("src", "../images/logo" + LogoNo + ".png");
                OranDeger = ((IlkBesListe[i].Oy * 100) / GecerliOyToplam).toFixed(2);
                OranDeger = (OranDeger >= 100) ? 100 : OranDeger;
                OranDeger = (GecerliOyToplam == "0") ? "0.00" : OranDeger;
                $("#" + i + "_SagYuzde").text(OranDeger);
                $("#" + i + "_SagGYuzde").text(EskiData[IlkBesListe[i].No + "_O"]);
                $("#" + i + "_SagGMSayi").text(EskiData[IlkBesListe[i].No + "_M"]);
            }
            var index = IlkBesListe.map(function (d) { return d['No']; }).indexOf(SeciliParti);

            if (index == -1) {
                i = 4;
                $("#" + i + "_SagMSayi").text(IlkBesListe[i].MilletVekiliSayisi);
                LogoNo = (IlkBesListe[i].Oy == "0") ? "0" : IlkBesListe[i].No;
                $("#" + i + "_SagLogo").attr("src", "../images/logo" + LogoNo + ".png");
                OranDeger = ((IlkBesListe[i].Oy * 100) / GecerliOyToplam).toFixed(2);
                OranDeger = (OranDeger >= 100) ? 100 : OranDeger;
                OranDeger = (GecerliOyToplam == "0") ? "0.00" : OranDeger;
                $("#" + i + "_SagYuzde").text(OranDeger);
                $("#" + i + "_SagGYuzde").text(EskiData[IlkBesListe[index].No + "_O"]);
                $("#" + i + "_SagGMSayi").text(EskiData[IlkBesListe[index].No + "_M"]);

            }
            else {
                $("#" + 4 + "_SagMSayi").text(IlkBesListe[index].MilletVekiliSayisi);
                LogoNo = (IlkBesListe[index].Oy == "0") ? "0" : IlkBesListe[index].No;
                $("#" + 4 + "_SagLogo").attr("src", "../images/logo" + LogoNo + ".png");
                OranDeger = ((IlkBesListe[index].Oy * 100) / GecerliOyToplam).toFixed(2);
                OranDeger = (OranDeger >= 100) ? 100 : OranDeger;
                OranDeger = (GecerliOyToplam == "0") ? "0.00" : OranDeger;
                $("#" + 4 + "_SagYuzde").text(OranDeger);

                $("#" + 4 + "_SagGYuzde").text(EskiData[IlkBesListe[index].No + "_O"]);
                $("#" + 4 + "_SagGMSayi").text(EskiData[IlkBesListe[index].No + "_M"]);
            }

        }
        else {
            for (var i = 0; i < 5; i++) {


                $("#" + i + "_SagMSayi").text(IlkBesListe[i].MilletVekiliSayisi);
                LogoNo = (IlkBesListe[i].Oy == "0") ? "0" : IlkBesListe[i].No;
                $("#" + i + "_SagLogo").attr("src", "../images/logo" + LogoNo + ".png");
                OranDeger = ((IlkBesListe[i].Oy * 100) / GecerliOyToplam).toFixed(2);
                OranDeger = (OranDeger >= 100) ? 100 : OranDeger;
                OranDeger = (GecerliOyToplam == "0") ? "0.00" : OranDeger;
                $("#" + i + "_SagYuzde").text(OranDeger);
                $("#" + i + "_SagGYuzde").text(EskiData[IlkBesListe[i].No + "_O"]);
                $("#" + i + "_SagGMSayi").text(EskiData[IlkBesListe[i].No + "_M"]);
            }


        }



    }

}

SecimBaglanti.on("seciliparti", function (data) {

    SeciliParti = data;
    setCookie("SeciliParti", data);
    HeaderVeri(HeaderVeriJson);
    LokasyonDetayAlt(AltTarafJson);
    LokasyonDetaySag(SagTarafJson);
    LineChart();

});

SecimBaglanti.on("ortakisimidler", function (data) {

    SehirListeSag = data != "" ? data.split(',') : SehirListeDefault;
    setCookie("CookieOrtaKisimId", data);
    SagSeciliId = "-1";
    SagTarafFunc();
});

SecimBaglanti.on("grafikkisimidler", function (data) {

    SehirListeOrta = data != "" ? data.split(',') : SehirListeDefault;
    setCookie("CookieGrafikKisimId", data);
    OrtaSeciliId = "-1";
    OrtaTarafFunc();
});

SecimBaglanti.on("altisimidler", function (data) {

    SehirListeAlt = data != "" ? data.split(',') : SehirListeDefault;
    setCookie("CookieAltKisimId", data);
    AltSeciliId = "-1";
    AltTarafFunc();
});

SecimBaglanti.on("ortakisimdongusuresi", function (data) {

    TekrarSuresiSagTaraf = data * 1000;
    setCookie("OrtaKisimDonguSuresi", data);
    SagTarafFunc();
});

SecimBaglanti.on("altisimdongusuresi", function (data) {

    TekrarSuresiAltTaraf = data * 1000;
    setCookie("AltKisimDonguSuresi", data);
    AltTarafFunc();
});

SecimBaglanti.on("grafikkisimdongusuresi", function (data) {

    GrafikKisimDonguSuresi = data * 1000;
    setCookie("GrafikKisimDonguSuresi", data);
    OrtaTarafFunc();
});

SecimBaglanti.on("altkisimilcelerigoster", function (data) {

    if (data == "true") {
        AltSeciliIlceId = "-1";
        setCookie("AltKisimIlceleriGoster", data);
    }
    else {
        AltSeciliIlceId = "0";
        setCookie("AltKisimIlceleriGoster", data);
    }
    AltTarafFunc();
});

SecimBaglanti.on("ortakisimsecim", function (data) {

    if (data == "turkiyeharitasi") {
        $("#TurkiyeHaritaAlan").show();
        $("#GrafikAlan").hide();
        $("#SehirlerHarita").hide();
        $("#BosAlan").hide();

        TurkiyeHaritaVeri();
    }
    else if (data == "sehirlerharitasi") {
        $("#TurkiyeHaritaAlan").hide();
        $("#GrafikAlan").hide();
        $("#SehirlerHarita").show();
        $("#BosAlan").hide();

        IlceHaritaSeciliId == "0" ? "1" : getCookie("SehirHaritaSecim");
        SehirHaritaVeri();
    }
    else if (data == "grafik") {
        $("#TurkiyeHaritaAlan").hide();
        $("#GrafikAlan").show();
        $("#SehirlerHarita").hide();
        $("#BosAlan").hide();
        LineChart();
    }
    else if (data == "bos") {
        $("#TurkiyeHaritaAlan").hide();
        $("#GrafikAlan").hide();
        $("#SehirlerHarita").hide();
        $("#BosAlan").show();
    }
    else {
        $("#TurkiyeHaritaAlan").hide();
        $("#GrafikAlan").hide();
        $("#SehirlerHarita").hide();
        $("#BosAlan").show();
    }

    setCookie("OrtaKisimSecim", data);

});

SecimBaglanti.on("siteyon", function (data) {

    if (data == "Yon1") {
        $("#LogoYeri").css("float", "left");
        $("#UstDortluDiv").css("float", "right");
        $("#OrtaLokasyon").css("float", "left");
        $("#OrtaAlan").css("float", "right");


    } else if (data == "Yon2") {
        $("#LogoYeri").css("float", "left");
        $("#UstDortluDiv").css("float", "right");
        $("#OrtaLokasyon").css("float", "right");
        $("#OrtaAlan").css("float", "left");
    }
    else if (data == "Yon3") {
        $("#LogoYeri").css("float", "right");
        $("#UstDortluDiv").css("float", "left");
        $("#OrtaLokasyon").css("float", "left");
        $("#OrtaAlan").css("float", "right");
    }
    else if (data == "Yon4") {
        $("#LogoYeri").css("float", "right");
        $("#UstDortluDiv").css("float", "left");
        $("#OrtaLokasyon").css("float", "right");
        $("#OrtaAlan").css("float", "left");
    }
    setCookie("SiteYon", data);

});

SecimBaglanti.on("haritasehir", function (data) {
    IlceHaritaSeciliId = data;
    setCookie("SehirHaritaSecim", data);
    SehirHaritaVeri();
});

SecimBaglanti.on("haritayogunluk", function (data) {
    HaritaSeciliParti = data;
    setCookie("HaritaYogunluk", data);
    TurkiyeHaritaVeri();
});

SecimBaglanti.on("renkDegistir", function (islem, renk) {

    switch (islem) {

        case "Renk0Input":
            $("#BodyDiv").css("background-color", renk);
            setCookie("Renk0Input", renk);
            break;
        case "Renk1Input":
            $(".PartiUst").css("background-color", renk);
            setCookie("Renk1Input", renk);
            break;
        case "Renk2Input":
            $("#OrtaLokasyon").css("background-color", renk);
            setCookie("Renk2Input", renk);
            break;
        case "Renk3Input":
            $(".PartiUst").css("color", renk);
            setCookie("Renk3Input", renk);
            break;
        case "Renk4Input":
            $(".PartiAlt").css("background-color", renk);
            setCookie("Renk4Input", renk);
            break;
        case "Renk5Input":
            $("#LocationAlt").css("background-color", renk);
            setCookie("Renk5Input", renk);
            break;
        case "Renk6Input":
            $("#OrtaLokasyon").css("color", renk);
            setCookie("Renk6Input", renk);
            break;
        case "Renk7Input":
            $("#LocationAlt").css("color", renk);
            setCookie("Renk7Input", renk);
            break;
        case "Renk8Input":
            $(".PartiAlt").css("color", renk);
            setCookie("Renk8Input", renk);
            break;
        case "Renk9Input":
            $(".Yukari").css("color", renk);
            setCookie("Renk9Input", renk);
            break;
        case "Renk10Input":
            $(".Asagi").css("color", renk);
            setCookie("Renk10Input", renk);
            break;
        case "Renk11Input":
            $(".Degismedi").css("color", renk);
            setCookie("Renk11Input", renk);
            break;
        default:
            break;

    }

});

$(document).ready(function () {

    //ORTA KISIM
    var OrtaALanYerles = getCookie("OrtaKisimSecim");

    if (OrtaALanYerles == "turkiyeharitasi") {
        $("#TurkiyeHaritaAlan").show();
        $("#GrafikAlan").hide();
        $("#SehirlerHarita").hide();
        $("#BosAlan").hide();
    }
    else if (OrtaALanYerles == "sehirlerharitasi") {
        $("#TurkiyeHaritaAlan").hide();
        $("#GrafikAlan").hide();
        $("#SehirlerHarita").show();
        $("#BosAlan").hide();
        //IlceHaritaGoster = true;
    }
    else if (OrtaALanYerles == "grafik") {
        $("#TurkiyeHaritaAlan").hide();
        $("#GrafikAlan").show();
        $("#SehirlerHarita").hide();
        $("#BosAlan").hide();
    }
    else if (OrtaALanYerles == "bos") {
        $("#TurkiyeHaritaAlan").hide();
        $("#GrafikAlan").hide();
        $("#SehirlerHarita").hide();
        $("#BosAlan").show();
    }
    else {
        $("#TurkiyeHaritaAlan").hide();
        $("#GrafikAlan").hide();
        $("#SehirlerHarita").hide();
        $("#BosAlan").show();
    }

    //YÖNLER
    var Yon = getCookie("SiteYon");
    if (Yon == "Yon1") {
        $("#LogoYeri").css("float", "left");
        $("#UstDortluDiv").css("float", "right");
        $("#OrtaLokasyon").css("float", "left");
        $("#OrtaAlan").css("float", "right");


    } else if (Yon == "Yon2") {
        $("#LogoYeri").css("float", "left");
        $("#UstDortluDiv").css("float", "right");
        $("#OrtaLokasyon").css("float", "right");
        $("#OrtaAlan").css("float", "left");
    }
    else if (Yon == "Yon3") {
        $("#LogoYeri").css("float", "right");
        $("#UstDortluDiv").css("float", "left");
        $("#OrtaLokasyon").css("float", "left");
        $("#OrtaAlan").css("float", "right");
    }
    else if (Yon == "Yon4") {
        $("#LogoYeri").css("float", "right");
        $("#UstDortluDiv").css("float", "left");
        $("#OrtaLokasyon").css("float", "right");
        $("#OrtaAlan").css("float", "left");
    }
    else {
        $("#LogoYeri").css("float", "left");
        $("#UstDortluDiv").css("float", "right");
        $("#OrtaLokasyon").css("float", "left");
        $("#OrtaAlan").css("float", "right");
    }


    if (getCookie("Renk0Input") != "") {
        $("#BodyDiv").css("background-color", getCookie("Renk0Input"));
    }
    if (getCookie("Renk1Input") != "") {
        $(".PartiUst").css("background-color", getCookie("Renk1Input"));
    }
    if (getCookie("Renk2Input") != "") {
        $("#OrtaLokasyon").css("background-color", getCookie("Renk2Input"));
    }
    if (getCookie("Renk3Input") != "") {
        $(".PartiUst").css("color", getCookie("Renk3Input"));
    }
    if (getCookie("Renk4Input") != "") {
        $(".PartiAlt").css("background-color", getCookie("Renk4Input"));
    }
    if (getCookie("Renk5Input") != "") {
        $("#LocationAlt").css("background-color", getCookie("Renk5Input"));
    }
    if (getCookie("Renk6Input") != "") {
        $("#OrtaLokasyon").css("color", getCookie("Renk6Input"));
    }
    if (getCookie("Renk7Input") != "") {
        $("#LocationAlt").css("color", getCookie("Renk7Input"));
    }
    if (getCookie("Renk8Input") != "") {
        $(".PartiAlt").css("color", getCookie("Renk8Input"));
    }
    if (getCookie("Renk9Input") != "") {
        $(".Yukari").css("color", getCookie("Renk9Input"));
    }
    if (getCookie("Renk10Input") != "") {
        $(".Asagi").css("color", getCookie("Renk10Input"));
    }
    if (getCookie("Renk11Input") != "") {
        $(".Degismedi").css("color", getCookie("Renk11Input"));
    }


});

function TurkiyeHaritaVeri() {
    SecimBaglanti.invoke("HaritaVeri", GumrukCheck).done(function (data) {

        JsonVeriHarita = JSON.parse(data);

        if (HaritaSeciliParti == "0") {
            TurkiyeHarita();
        }
        else {
            TurkiyeHaritaPartiyeGore(HaritaSeciliParti);
        }
    });
}

function SehirHaritaVeri() {
    SecimBaglanti.invoke("HaritaVeri", GumrukCheck).done(function (data) {

        JsonVeriHarita = JSON.parse(data);

        IlceHarita();

    });
}

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

var LegendsParti = [];

function TurkiyeHarita() {


    var LegendsParti = [];
    var previouscountyselected = 0;
    var past = null;
    var start = true;
    $("#map").empty();

    var sehirid = "";
    var obj;
    var arr = new Array();
    LegendsParti = [];
    r = Raphael('map');
    r.setViewBox(35, 140, 850, 550);
    r.setSize('1000', '600');

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

                var pushData = {
                    ad: PartiRenkler[b.PartiKod][0], renk: PartiRenkler[b.PartiKod][1]
                };
                if (b.PartiKod > 20) {
                     
                    var Label1 = "BAĞIMSIZ";

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
                        obj.attr({ "stroke-width": "1.1", fill: renk, stroke: "#ffffff", title: paths[b.IlKod].name.toString().TurkceUpperCase() });
                        $("#Sehir" + nosu).attr({ test: renk });
                        $("#Sehir" + nosu).parent().attr({ "data-tooltip": paths[b.IlKod].name.toString().TurkceUpperCase(), "class": "simptip-position-bottom" }).removeAttr("title");
                    }
                }
                else {
                    if (nosu == b.IlKod) {
                        obj.node.id = 'Sehir' + nosu;
                        obj.attr({ "stroke-width": "1.1", fill: renk, stroke: "#ffffff", title: paths[b.IlKod].name.toString().TurkceUpperCase() });
                        $("#Sehir" + nosu).attr({ test: renk });
                        $("#Sehir" + nosu).parent().attr({ "data-tooltip": paths[b.IlKod].name.toString().TurkceUpperCase(), "class": "simptip-position-bottom" }).removeAttr("title");
                    }
                }
            }
            catch (e) {

            }
        }
    });
    LegendsParti.sort(function (a, b) {
        var x = a["ad"];
        var y = b["ad"];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });

    $.each(LegendsParti, function (a, b) {


    });

}

function TurkiyeHaritaPartiyeGore(PartiKod) {

    var previouscountyselected = 0;
    var past = null;
    var start = true;

    $("#map").empty();

    var sehirid = "";
    var obj;
    var arr = new Array();
    LegendsParti = [];
    r = Raphael('map');
    r.setViewBox(35, 140, 850, 550);
    r.setSize('700', '1450');


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



        var OyOranı = (0).toFixed(2);
        var MSayisi = 0;
        var OySayisi = 0;
        var Sonuclar = b.Sonuclar.Parti;
        var GecerliOy = b.Sandik.GecerliOy == 0 ? 1 : b.Sandik.GecerliOy;
        if (Sonuclar.length > 0) {
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
            var sehirid = b.Kod;
            var nosu = paths[b.Kod].county;

            var renk;

            renk = PartiRenkler[PartiKod][1];


            try {
                if (nosu.substring(0, 1) == "0") {
                    if (nosu.substring(1, 2) == b.Kod) {
                        obj.node.id = 'Sehir' + nosu;
                        obj.attr({ "stroke-width": "1.1", fill: renk, stroke: "#ffffff", title: paths[b.Kod].name.toString().TurkceUpperCase(), "fill-opacity": fillOpacity });
                        $("#Sehir" + nosu).attr({ test: renk });
                        // $("#Sehir" + nosu).parent().attr({ "data-tooltip": paths[b.IlKod].name.toString().TurkceUpperCase(), "class": "simptip-position-bottom" }).removeAttr("title");
                        $("#Sehir" + nosu).parent().removeAttr("title");
                    }
                }
                else {
                    if (nosu == b.Kod) {
                        obj.node.id = 'Sehir' + nosu;
                        obj.attr({ "stroke-width": "1.1", fill: renk, stroke: "#ffffff", title: paths[b.Kod].name.toString().TurkceUpperCase(), "fill-opacity": fillOpacity });
                        $("#Sehir" + nosu).attr({ test: renk });
                        //  $("#Sehir" + nosu).parent().attr({ "data-tooltip": paths[b.IlKod].name.toString().TurkceUpperCase(), "class": "simptip-position-bottom" }).removeAttr("title");
                        $("#Sehir" + nosu).parent().removeAttr("title");
                    }
                }
            }
            catch (e) {

            }
        }
    });



}

function IlceHarita() {

    var IlKodu = IlceHaritaSeciliId;
    var previouscountyselected = 0;
    var past = null;
    var start = true;
    $("#HaritaPng").empty();
    var obj;

    r = Raphael('HaritaPng');
    r.setViewBox(35, 140, 850, 550);
    r.setSize('1250', '700');

    var SeciliIlOndekiPartiIndex = JsonVeriHarita.map(function (d) {
        return d['IlKod'].toString();
    }).indexOf(IlKodu);

    $.each(paths, function (a, b) {
        var county = b;
        obj = r.path(b.path);
        if (a == IlKodu) {
            var PartiRenkKodu = PartiRenkler[JsonVeriHarita[SeciliIlOndekiPartiIndex].PartiKod][1];
            obj.attr({ "stroke-width": "1.1", fill: PartiRenkKodu, stroke: "#ffffff" });
        }
        else {
            obj.attr({ "stroke-width": "3", fill: "#b4bbca", stroke: "#ffffff" });
        }
    });

    $("#mapIlce").empty();
    $('#HaritaPng').show();
    var sehirid = "";

    var arr = new Array();
    LegendsParti = [];
    r = Raphael('mapIlce');
    var IlcePath;

    $.ajax({
        url: "IlceMaps/" + IlKodu + ".txt",
        async: false,
        success: function (data) {
            IlcePath = JSON.parse(data);
        }
    });
    var x = parseFloat(IlcePath[0].viewBox.split(' ')[0]);
    var y = parseFloat(IlcePath[0].viewBox.split(' ')[1]);
    var w = parseFloat(IlcePath[0].viewBox.split(' ')[2]);
    var h = parseFloat(IlcePath[0].viewBox.split(' ')[3]);
    console.log(IlcePath[0].viewBox);
    r.setViewBox(x, y, w, h);
    r.setSize('440', '380');

    SecimBaglanti.invoke("IlceVeri", IlKodu).done(function (data) {

        $.each(JSON.parse(JSON.parse(data).Kasim).Il.Ilce, function (a, b) {

            try {
                var county = IlcePath[b.Kod];
                obj = r.path(IlcePath[b.Kod].path);

                arr[obj.id] = b.Kod;

                if (IlcePath[b.Kod].country != undefined) {

                    var sehirid = b.Kod;
                    var nosu = IlcePath[b.Kod].country;
                    var IlkBesListe = b.Sonuclar.Parti;

                    if (IlkBesListe.length != undefined) {
                        IlkBesListe.sort(function (a, b) {
                            return parseInt(b.Oy) - parseInt(a.Oy);
                        });
                    }

                    var renk;

                    renk = PartiRenkler[IlkBesListe[0].No][1];

                    try {
                        if (nosu.substring(0, 1) == "0") {
                            if (nosu.substring(1, 2) == b.Kod) {
                                obj.node.id = 'Sehir' + nosu;
                                obj.attr({ "stroke-width": "1.1", fill: renk, stroke: "#ffffff", title: IlcePath[b.Kod].name.toString().TurkceUpperCase() });
                                $("#Sehir" + nosu).attr({ test: renk });
                                $("#Sehir" + nosu).parent().attr({ "data-tooltip": IlcePath[b.Kod].name.toString().TurkceUpperCase(), "class": "simptip-position-bottom" }).removeAttr("title");
                            }
                        }
                        else {
                            if (nosu == b.Kod) {
                                obj.node.id = 'Sehir' + nosu;
                                obj.attr({ "stroke-width": "1.1", fill: renk, stroke: "#ffffff", title: IlcePath[b.Kod].name.toString().TurkceUpperCase() });
                                $("#Sehir" + nosu).attr({ test: renk });
                                $("#Sehir" + nosu).parent().attr({ "data-tooltip": IlcePath[b.Kod].name.toString().TurkceUpperCase(), "class": "simptip-position-bottom" }).removeAttr("title");
                            }
                        }
                    }
                    catch (e) {

                    }
                }
            } catch (e) {

            }

        });
    });

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

    if (OrtaSeciliId == "0") {
        lineGecerliOy = JsonVeri.AA.TurkiyeGeneli.Sandik.GecerliOy;
        $("#HaritaIl").html("TÜRKİYE GENELİ");
        $.each(JsonVeri.AA.TurkiyeGeneli.Sonuclar.Parti, function (a, b) {
            Partiler.push({ No: b.No, Adi: b.Adi, Oy: b.Oy, MilletVekiliSayisi: b.MilletVekiliSayisi });
        });
    }
    else {
        $.each(JsonVeri.AA.IlSonuclari.Il, function (a, b) {
            if (b.Kod == OrtaSeciliId) {
                $("#HaritaIl").html(b.Ad.TurkceUpperCase());
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

    //secili parti icin ilk beş partiyi al
    var ilkDortParti = [];
    for (var i = 0; i < (Partiler.length > 3 ? 4 : Partiler.length) ; i++) {
        ilkDortParti.push(Partiler[i].No);
    }

    var index = 0;

    BirinciId = Partiler[0].Oy != 0 ? Partiler[0].No : 0;
    IkinciId = Partiler[1].Oy != 0 ? Partiler[1].No : 0;
    UcuncuId = Partiler[2].Oy != 0 ? Partiler[2].No : 0;

    if (ilkDortParti.indexOf(SeciliParti) == -1 && SeciliParti != "0") {
        DorduncuId = SeciliParti;
        index = Partiler.map(function (d) { return d['No']; }).indexOf(SeciliParti);
    }
    else {
        DorduncuId = Partiler[3].Oy != 0 ? Partiler[3].No : 0;
        index = 3;
    }
    var title = "";

    if (LineTip == "lineSayi") {
        Birinci_2015 = Partiler[0].Oy;
        Ikinci_2015 = Partiler[1].Oy;
        Ucuncu_2015 = Partiler[2].Oy;
        Dorduncu_2015 = Partiler[index].Oy;
        title = "Oy Sayıları";
    }
    else if (LineTip == "lineOran") {
        Birinci_2015 = ((Partiler[0].Oy * 100) / lineGecerliOy).toFixed(2);
        Ikinci_2015 = ((Partiler[1].Oy * 100) / lineGecerliOy).toFixed(2);
        Ucuncu_2015 = ((Partiler[2].Oy * 100) / lineGecerliOy).toFixed(2);
        Dorduncu_2015 = ((Partiler[index].Oy * 100) / lineGecerliOy).toFixed(2);
        title = "Oy Oranları";
    }
    else if (LineTip == "lineMilletvekili") {
        Birinci_2015 = Partiler[0].MilletVekiliSayisi;
        Ikinci_2015 = Partiler[1].MilletVekiliSayisi;
        Ucuncu_2015 = Partiler[2].MilletVekiliSayisi;
        Dorduncu_2015 = Partiler[index].MilletVekiliSayisi;
        title = "Milletvekili Sayıları";
    }

    $.each(EskiSecimVerisi.dddd.Secim, function (a, b) {

        if (b.IlBolgeID == OrtaSeciliId) {

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
        Parti: PartiRenkler[BirinciId][0],
        Haziran: Birinci_2011,
        Kasim: Birinci_2015,
        color: PartiRenkler[BirinciId][1],
        bullet: "../images/logo" + BirinciId + ".png"
    });

    chartData.push({
        Parti: PartiRenkler[IkinciId][0],
        Haziran: Ikinci_2011,
        Kasim: Ikinci_2015,
        color: PartiRenkler[IkinciId][1],
        bullet: "../images/logo" + IkinciId + ".png"
    });

    chartData.push({
        Parti: PartiRenkler[UcuncuId][0],
        Haziran: Ucuncu_2011,
        Kasim: Ucuncu_2015,
        color: PartiRenkler[UcuncuId][1],
        bullet: "../images/logo" + UcuncuId + ".png"
    });

    chartData.push({
        Parti: PartiRenkler[DorduncuId][0],
        Haziran: Dorduncu_2011,
        Kasim: Dorduncu_2015,
        color: PartiRenkler[DorduncuId][1],
        bullet: "../images/logo" + DorduncuId + ".png"
    });

    AmCharts.makeChart("lineChart", {
        "type": "serial",
        "dataProvider": chartData,
        "valueAxes": [{
            "unit": "",
            "position": "left",
            "title": title,
            "fontSize": 20,
            "autoGridCount": false,
            "maximum": 100
        }],
        "startDuration": 1,
        "graphs": [{
            "balloonText": "Kasım ayı  [[category]] oy sayısı: <b>[[value]]</b>",
            "fillAlphas": 0.9,
            "lineAlpha": 0.2,
            "title": "Kasim",
            "labelText": "%[[value]]",
            "fontSize": 30,
            "labelOffset": 10,
            "type": "column",
            "valueField": "Kasim",
            "fillColorsField": "color",
            "animationPlayed": true



        }, {
            "balloonText": "Haziran ayı [[category]] oy sayısı: <b>[[value]]</b>",
            "fillAlphas": 0.4,
            "lineAlpha": 0.2,

            "title": "Haziran",

            "labelOffset": 10,

            "fontSize": 20,
            "type": "column",
            "labelText": "%[[value]]",
            "valueField": "Haziran",
            "fillColorsField": "color",
            "animationPlayed": true


        }],
        "depth3D": 10,
        "angle": 20,
        "categoryField": "Parti",
        "categoryAxis": {
            "gridPosition": "start",
            "fontSize": 30


        }

    });


}

function HeaderVeri(data) {

    var OranDeger;
    var b = data.TurkiyeGeneli;
    var ToplamOyYuzdeIcin = b.Sandik.GecerliOy;
    var SeciliBolgeVeri = b.Sonuclar.Parti;
    var LogoNo = "0";
    var EskiData = null;
    SeciliBolgeVeri.sort(function (a, b) {
        return b.Oy - a.Oy;
    });

    //secili parti icin ilk dört partiyi al
    var ilkDortParti = [];
    for (var i = 0; i < 4; i++) {
        ilkDortParti.push(SeciliBolgeVeri[i].No);
    }



    EskiData = EskiSecimVerisi.dddd.Secim[0];


    //secili parti ilk dört partide var mı yokmu
    if (ilkDortParti.indexOf(SeciliParti) == -1 && SeciliParti != "0") {
        for (var i = 0; i < 3; i++) {

            $("#" + i + "_MSayi").text(SeciliBolgeVeri[i].MilletVekiliSayisi);
            LogoNo = (SeciliBolgeVeri[i].Oy == "0") ? "0" : SeciliBolgeVeri[i].No;
            $("#" + i + "_Logo").attr("src", "../images/logo" + LogoNo + ".png");
            OranDeger = ((SeciliBolgeVeri[i].Oy * 100) / ToplamOyYuzdeIcin).toFixed(2);
            OranDeger = (OranDeger >= 100) ? 100 : OranDeger;
            OranDeger = (ToplamOyYuzdeIcin == "0") ? "0.00" : OranDeger;
            $("#" + i + "_Oran").text(OranDeger);

            $("#" + i + "_GOran").text(EskiData[SeciliBolgeVeri[i].No + "_O"]);
            $("#" + i + "_GSayi").text(EskiData[SeciliBolgeVeri[i].No + "_M"]);

        }
        var index = SeciliBolgeVeri.map(function (d) { return d['No']; }).indexOf(SeciliParti);

        $("#" + 3 + "_MSayi").text(SeciliBolgeVeri[index].MilletVekiliSayisi);
        LogoNo = (SeciliBolgeVeri[index].Oy == "0") ? "0" : SeciliBolgeVeri[index].No;
        $("#" + 3 + "_Logo").attr("src", "../images/logo" + LogoNo + ".png");
        OranDeger = ((SeciliBolgeVeri[index].Oy * 100) / ToplamOyYuzdeIcin).toFixed(2);
        OranDeger = (OranDeger >= 100) ? 100 : OranDeger;
        OranDeger = (ToplamOyYuzdeIcin == "0") ? "0.00" : OranDeger;
        $("#" + 3 + "_Oran").text(OranDeger);

        $("#" + 3 + "_GOran").text(EskiData[SeciliBolgeVeri[index].No + "_O"]);
        $("#" + 3 + "_GSayi").text(EskiData[SeciliBolgeVeri[index].No + "_M"]);
    }
    else {
        for (var i = 0; i < 4; i++) {

            $("#" + i + "_MSayi").text(SeciliBolgeVeri[i].MilletVekiliSayisi);
            LogoNo = (SeciliBolgeVeri[i].Oy == "0") ? "0" : SeciliBolgeVeri[i].No;
            $("#" + i + "_Logo").attr("src", "../images/logo" + LogoNo + ".png");
            OranDeger = ((SeciliBolgeVeri[i].Oy * 100) / ToplamOyYuzdeIcin).toFixed(2);
            OranDeger = (OranDeger >= 100) ? 100 : OranDeger;
            OranDeger = (ToplamOyYuzdeIcin == "0") ? "0.00" : OranDeger;
            $("#" + i + "_Oran").text(OranDeger);
            $("#" + i + "_GOran").text(EskiData[SeciliBolgeVeri[i].No + "_O"]);
            $("#" + i + "_GSayi").text(EskiData[SeciliBolgeVeri[i].No + "_M"]);

        }
    }







}

String.prototype.TurkceUpperCase = function () {
    var x = this.replace(new RegExp('i', 'g'), 'İ');
    return x.toUpperCase();
}