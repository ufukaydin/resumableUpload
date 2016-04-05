
var PartiRenkler = {
    0: ["-", "#D9D9D9"],
    1: ["DYP", "#D70000"],
    2: ["Anadolu P.", "#00B9FC"], // Anadolu Partisi
    3: ["HAK-PAR", "#FF0000"],
    4: ["Komünist P.", "#FFD900"], // Komünist P.
    5: ["Millet P.", "#372F91"], // Millet Partisi
    6: ["HAP", "#DC2128"],
    7: ["Merkez P.", "#079CA7"], // Merkez Parti
    8: ["TURK P.", "#25225A"], // TURK Parti
    9: ["HKP", "#FCDA1F"],
    10: ["LDP", "#0336FA"],
    11: ["MHP", "#E50019"],
    12: ["HDP", "#7F00FF"],
    13: ["Saadet", "#F50002"],
    14: ["CHP", "#FF030A"],
    15: ["AK Parti", "#FF9900"],
    16: ["DSP", "#00D9FF"],
    17: ["YURT-P", "#44B649"],
    18: ["DP", "#FF0000"],
    19: ["Vatan P.", "#E30513"], // Vatan Partisi
    20: ["BTP", "#EE1D24"],

    //1-Adana
    54: ["ZİHNİ ALDIRMAZ", "#787777"],
    51: ["ERCAN ALTINTOP", "#787777"],
    58: ["ÇAĞLAYAN KAYA", "#787777"],
    55: ["MUHİTTİN DEMİR", "#787777"],
    53: ["SALİH DEMİR", "#787777"],
    56: ["GÜLCAN AY", "#787777"],
    57: ["YASİN TÜRKOĞLU", "#787777"],
    52: ["REFİK GÜL", "#787777"],
    59: ["MUSTAFA SÜHA AŞLAMACI", "#787777"],
    //4-Ağrı
    60: ["CEMAL KAYA", "#787777"],
    //7-Antalya
    75: ["HASAN SUBAŞI", "#787777"],
    76: ["RAUF TEMEL", "#787777"],
    //10-Balıkesir
    77: ["ÖMER ALBAYRAK", "#787777"],
    78: ["İSMAİL YAŞAR", "#787777"],
    //12-Bingöl
    79: ["MEHMET REŞİT ÖZMEN", "#787777"],
    80: ["SAİT ŞAHİN", "#787777"],
    //13-Bitlis
    81: ["CENGİZ KARAKAYA", "#787777"],
    //16-Bursa
    85: ["YUSUF YILMAZ", "#787777"],
    84: ["ŞÜKRÜ TINAS", "#787777"],
    87: ["UMUT IŞIK", "#787777"],
    82: ["AYDIN İLHAN", "#787777"],
    86: ["SİYASETTİN ÖZAYDIN", "#787777"],
    83: ["MEHMET ÜMİT YAŞAR YALÇIN", "#787777"],
    //20-Denizli
    88: ["MUSTAFA ÖZDEMİR ESMEK", "#787777"],
    //21-Diyarbakır
    89: ["ABDULLAH ARZAKÇI", "#787777"],
    90: ["ZEKERİYA YAPICIOĞLU", "#787777"],
    //25-Erzurum
    91: ["ABDUSSELAM EFE", "#787777"],
    92: ["DURSUN GÜNEŞ", "#787777"],
    //26-Eskişehir
    94: ["MEHMET IŞIN", "#787777"],
    93: ["MUHARREM ŞENEL", "#787777"],
    95: ["TİMUR ŞAHAN", "#787777"],
    //30-Hakkari
    96: ["FEHMİ ÖZTUNÇ", "#787777"],
    //31-Hatay
    100: ["BERKAY DURAN", "#787777"],
    97: ["ZARİF KOCA", "#787777"],
    98: ["NİHAT TAŞKIN", "#787777"],
    99: ["REFİK ERYILMAZ", "#787777"],
    //33-Mersin
    101: ["MÜRÜVVET BOZNA", "#787777"],
    //38-Kayseri
    164: ["MUHAMMET EMİN KARAPAÇA", "#787777"],
    166: ["EMİNE SEZGİN", "#787777"],
    165: ["FAHRETTİN AKCAKOCA", "#787777"],
    //39-Kırklareli
    167: ["BİLAL BOYLU", "#787777"],
    //41-Kocaeli
    168: ["AHMET KARAN", "#787777"],
    170: ["İBRAHİM LAYIK", "#787777"],
    169: ["KADİR YILDIRIMER", "#787777"],
    172: ["MEHMET DOĞAN", "#787777"],
    171: ["YUSUF BAŞ", "#787777"],
    173: ["KADİR BÖLEN", "#787777"],
    //42-Konya
    174: ["YAVUZ TUNCAY DERELİ", "#787777"],
    //43-Kütahya
    175: ["MEHMET RIZA GÜLEREN", "#787777"],
    //44-Malatya
    178: ["MÜNİR DOĞAN ÖLMEZTOPRAK", "#787777"],
    177: ["ALİ ÖZŞEKER", "#787777"],
    176: ["ALİ YALÇIN", "#787777"],
    //45-Manisa
    179: ["TEVFİK DİKER", "#787777"],
    180: ["HAKAN OLTAN", "#787777"],
    //46-Kahramanmaraş
    181: ["AHMET KAYIRAN", "#787777"],
    //47-Mardin
    184: ["SELAMETTİN TELLİOĞLU", "#787777"],
    183: ["ŞAKİR NUHOĞLU", "#787777"],
    182: ["MAHMUT KILINÇ", "#787777"],
    //52-Ordu
    185: ["TEKİN TURAL", "#787777"],
    //54-Sakarya
    188: ["ÖZCAN DERİNBAY", "#787777"],
    186: ["COŞKUN SAMUR", "#787777"],
    189: ["YAVUZ SOYDAN", "#787777"],
    187: ["MUSTAFA KAŞKAŞ", "#787777"],
    //55-Samsun
    192: ["SAİM SEZGİN", "#787777"],
    190: ["SERDAR ŞENOCAK", "#787777"],
    191: ["FEYTULLAH GÜNDEM", "#787777"],
    //56-Siirt
    194: ["MEMET FADIL AKGÜNDÜZ", "#787777"],
    193: ["SELAHATTİN ARSLANBUĞUL", "#787777"],
    //58-Sivas
    195: ["AHMET YILDIZ", "#787777"],
    //59-Tekirdağ
    196: ["ERDEM KARAMAN", "#787777"],
    //61-Trabzon
    197: ["MEHMET KILIÇ", "#787777"],
    //63-Şanlıurfa
    203: ["FATİH MEHMET BUCAK", "#787777"],
    204: ["MEHMET NEDİM ÖBEK", "#787777"],
    198: ["İBRAHİM ESKİN", "#787777"],
    199: ["MEHMET YAVUZ", "#787777"],
    201: ["İSA YALDIZ", "#787777"],
    200: ["İBRAHİM HALİL GÖĞÜŞ", "#787777"],
    202: ["MUSTAFA GÖKTAŞ", "#787777"],
    //64-Uşak
    205: ["AYHAN YILDIRIM", "#787777"],
    //65-Van
    207: ["İDRİS AHİ", "#787777"],
    206: ["MEHMET MEHDİ OĞUZ", "#787777"],
    //71-Kırıkkale
    208: ["AYŞEGÜL BİŞKİN", "#787777"],
    //72-Batman
    209: ["FERİT TUNÇ", "#787777"],
    211: ["AYDIN GÖK", "#787777"],
    210: ["HALİME İNAN", "#787777"],
    //73-
    212: ["ŞAHZADE DEMİR", "#787777"],
    //75-
    213: ["SAFFET KAYA", "#787777"],
    //81-Düzce
    214: ["AYŞE PİŞKİN", "#787777"],
    215: ["BİROL ŞAHİN", "#787777"],
    //34(1) İstanbul 1. Bölge
    121: ["MİHRİYE NEVRA ÖLÇER", "#787777"],
    102: ["SAADET YILMAZ", "#787777"],
    115: ["KURTULUŞ ALADOGAN", "#787777"],
    131: ["İLBAY ÇEP", "#787777"],
    126: ["LEVENT SEKBAN", "#787777"],
    122: ["METİN KAYA", "#787777"],
    116: ["ALİ FUAT YILMAZER", "#787777"],
    143: ["GÜNSEL AVCI", "#787777"],
    117: ["METE GÜNDOĞAN", "#787777"],
    123: ["SEÇKİN İLKER", "#787777"],
    132: ["YALÇIN KARADAŞ", "#787777"],
    107: ["YILMAZ KARABUL", "#787777"],
    118: ["RECEP DİNLER", "#787777"],
    108: ["MEHMET SAİT DURMUŞ", "#787777"],
    109: ["ERSAN GÖKGÖZ", "#787777"],
    //34(2) İstanbul 2. Bölge
    144: ["NİHAT AKMAN", "#787777"],
    124: ["HALİL İBRAHİM YAYLAGÜL", "#787777"],
    137: ["ALİ İHSAN AKSAMAZ", "#787777"],
    112: ["ZAKİR BATUHAN AYDAGÜL", "#787777"],
    130: ["OSMAN LEVENT SOYARSLAN", "#787777"],
    104: ["YETKİN İLKER JANDAR", "#787777"],
    105: ["METİN ŞENTÜRK", "#787777"],
    125: ["REFİK ÖZMEN", "#787777"],
    113: ["YAKUB SAYGILI", "#787777"],
    106: ["SERDAR ASLAN", "#787777"],
    142: ["DOĞUKAN HUZUR", "#787777"],
    138: ["MESUT ÜLKER", "#787777"],
    147: ["HASAN GÜZEL", "#787777"],
    114: ["SERDAL BİRİCİK", "#787777"],
    148: ["FATMA RAGİBE KANIKURU LOĞOĞLU", "#787777"],
    149: ["MEHMET AKİF ÜNER", "#787777"],
    150: ["HASAN TAHSİN ÇELEBİCAN", "#787777"],
    140: ["İSMET ŞAHİN", "#787777"],
    //34(3) İstanbul 3. Bölge
    146: ["OSMAN PAMUKOĞLU", "#787777"],
    128: ["DERYA KÜÇÜKOĞLU", "#787777"],
    129: ["HARUN KÜÇÜKOĞLU", "#787777"],
    111: ["ÖMER COŞKUN", "#787777"],
    120: ["FERZENDE GÜNANA", "#787777"],
    136: ["ZEYNEP EBRU PUHALOĞLU", "#787777"],
    141: ["VOLKAN IŞIK", "#787777"],
    119: ["KENAN KAPLAN", "#787777"],
    127: ["İPEK BOZKURT", "#787777"],
    135: ["İLHAN SARP", "#787777"],
    110: ["BÜLENT TİMUR DEMİRGİL", "#787777"],
    145: ["YAŞAR YOLCULAR", "#787777"],
    103: ["HAKAN ŞÜKÜR", "#787777"],
    139: ["DİLAVER ARSLAN", "#787777"],
    133: ["BERKAN ÇELİK", "#787777"],
    134: ["KADER ATASOY", "#787777"],
    //35(1) İzmir 1. Bölge
    157: ["AYDEMİR KAPLAN", "#787777"],
    162: ["KENAN HALAT", "#787777"],
    156: ["ÖZGE SEÇKİNER", "#787777"],
    163: ["MÜHİTTİN AĞIRMAN", "#787777"],
    158: ["CEVAT YOL", "#787777"],
    159: ["ALİ ADIGÜZEL", "#787777"],
    153: ["İLHAN İŞBİLEN", "#787777"],
    160: ["ALİ İHSAN ERDENİLGEN", "#787777"],
    //35(2) İzmir 2. Bölge
    161: ["SEFA BİLİR", "#787777"],
    151: ["KEMAL AKÇA", "#787777"],
    154: ["MUHARREM SUBAŞİ", "#787777"],
    152: ["NERİMAN FİDAN", "#787777"],
    155: ["MEHMET ŞENER ÖZTERZİ", "#787777"],
    //6(01) Ankara 1. Bölge
    71: ["NAZMİ ARDIÇ", "#787777"],
    64: ["FARUK ARSLANDOK", "#787777"],
    65: ["AHMET YALAVAÇ", "#787777"],
    72: ["TUFAN SEVİM", "#787777"],
    74: ["MELEK ALTINTAŞ", "#787777"],
    66: ["ÇAĞLAR ÇAĞANLAR", "#787777"],
    67: ["ERCAN YENAL", "#787777"],
    68: ["MEHMET OKTAY KALLİOĞLU", "#787777"],
    //6(02) Ankara 2. Bölge
    73: ["TANER PEHLİVAN", "#787777"],
    63: ["YURT ATAYÜN", "#787777"],
    61: ["GÖKMEN GÜRKAN", "#787777"],
    69: ["MEHMET SEDAT FIRAT", "#787777"],
    70: ["ABDULKADİR YILMAZ", "#787777"],
    62: ["FARUK NESİMİ GÖZÜBÜYÜK", "#787777"]
}

//console.log("Parti Adı : " + Partiler[0][0]);
//console.log("Renk Kodu : " + Partiler[0][1]);