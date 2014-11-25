Bloonix.other.mapChart = function(o) {
    var data = {},
        colors = {},
        region = {};

    var fillColor = {
        UNKNOWN: "#eb6841",
        CRITICAL: "#cc333f",
        WARNING: "#edc951",
        INFO: "#339ab8",
        OK: "#5fbf5f",
        defaultFill: "#c9c9c9"
    };

    $.each(o.data, function(k, v) {
        var country = k.toLowerCase(),
            color = "OK";

        if (v.UNKNOWN > 0) {
            color = "UNKNOWN";
        } else if (v.CRITICAL > 0) {
            color = "CRITICAL";
        } else if (v.WARNING > 0) {
            color = "WARNING";
        } else if (v.INFO > 0) {
            color = "INFO";
        }

        colors[country] = fillColor[color];

        data[country] = {
            UNKNOWN: v.UNKNOWN,
            CRITICAL: v.CRITICAL,
            WARNING: v.WARNING,
            INFO: v.INFO,
            OK: v.OK
        };
    });

    $(".jqvmap-label").remove();
    $("#"+ o.chart.container).html("").off().vectorMap({
        map: "world_en",
        backgroundColor: "#ffffff",
        borderColor: "#ffffff",
        borderOpacity: 1,
        borderWidth: 1,
        color: "#c9c9c9",
        colors: colors,
        enableZoom: true,
        hoverColor: '#68a4a3',
        hoverOpacity: null,
        normalizeFunction: 'linear',
        //scaleColors: ['#b6d6ff', '#005ace'],
        selectedColor: null,
        selectedRegion: null,
        showTooltip: true,
        onRegionClick: function(element, code, region) {
            $("#"+ o.chart.container).html("").off();
            $(".jqvmap-label").remove();
            Bloonix.route.to("monitoring/hosts", { query: "c:"+ code.toUpperCase() });
        },
        onLabelShow: function(element, label, code) {
            label.css({ "z-index": "10005", position: "fixed" });
            var mapData;

            if (data[code]) {
                mapData = data[code];
            } else {
                mapData = { OK: 0, INFO: 0, WARNING: 0, CRITICAL: 0, UNKNOWN: 0 };
            }

            var div = '<div class="map-tooltip"><span class="f32"><span class="flag '
                + code +'"></span></span> '+ Bloonix.other.mapRegions[code]
                +'<br/><b>Unknown: </b>'+ mapData.UNKNOWN
                +'<br/><b>Critical: </b>'+ mapData.CRITICAL
                +'<br/><b>Warning: </b>'+ mapData.WARNING
                +'<br/><b>Info: </b>'+ mapData.INFO
                +'<br/><b>Ok: </b>'+ mapData.OK
                +'</div>';

            label.html(div);
        }
    });
};

Bloonix.other.mapCodes = {
    "AF": "AFG", "af": "AFG", "AFG": "af",
    "AL": "ALB", "al": "ALB", "ALB": "al",
    "DZ": "DZA", "dz": "DZA", "DZA": "dz",
    "AS": "ASM", "as": "ASM", "ASM": "as",
    "AD": "AND", "ad": "AND", "AND": "ad",
    "AO": "AGO", "ao": "AGO", "AGO": "ao",
    "AI": "AIA", "ai": "AIA", "AIA": "ai",
    "AQ": "ATA", "aq": "ATA", "ATA": "aq",
    "AG": "ATG", "ag": "ATG", "ATG": "ag",
    "AR": "ARG", "ar": "ARG", "ARG": "ar",
    "AM": "ARM", "am": "ARM", "ARM": "am",
    "AW": "ABW", "aw": "ABW", "ABW": "aw",
    "AU": "AUS", "au": "AUS", "AUS": "au",
    "AT": "AUT", "at": "AUT", "AUT": "at",
    "AZ": "AZE", "az": "AZE", "AZE": "az",
    "BS": "BHS", "bs": "BHS", "BHS": "bs",
    "BH": "BHR", "bh": "BHR", "BHR": "bh",
    "BD": "BGD", "bd": "BGD", "BGD": "bd",
    "BB": "BRB", "bb": "BRB", "BRB": "bb",
    "BY": "BLR", "by": "BLR", "BLR": "by",
    "BE": "BEL", "be": "BEL", "BEL": "be",
    "BZ": "BLZ", "bz": "BLZ", "BLZ": "bz",
    "BJ": "BEN", "bj": "BEN", "BEN": "bj",
    "BM": "BMU", "bm": "BMU", "BMU": "bm",
    "BT": "BTN", "bt": "BTN", "BTN": "bt",
    "BO": "BOL", "bo": "BOL", "BOL": "bo",
    "BA": "BIH", "ba": "BIH", "BIH": "ba",
    "BW": "BWA", "bw": "BWA", "BWA": "bw",
    "BR": "BRA", "br": "BRA", "BRA": "br",
    "IO": "IOT", "io": "IOT", "IOT": "io",
    "VG": "VGB", "vg": "VGB", "VGB": "vg",
    "BN": "BRN", "bn": "BRN", "BRN": "bn",
    "BG": "BGR", "bg": "BGR", "BGR": "bg",
    "BF": "BFA", "bf": "BFA", "BFA": "bf",
    "MM": "MMR", "mm": "MMR", "MMR": "mm",
    "BI": "BDI", "bi": "BDI", "BDI": "bi",
    "KH": "KHM", "kh": "KHM", "KHM": "kh",
    "CM": "CMR", "cm": "CMR", "CMR": "cm",
    "CA": "CAN", "ca": "CAN", "CAN": "ca",
    "CV": "CPV", "cv": "CPV", "CPV": "cv",
    "KY": "CYM", "ky": "CYM", "CYM": "ky",
    "CF": "CAF", "cf": "CAF", "CAF": "cf",
    "TD": "TCD", "td": "TCD", "TCD": "td",
    "CL": "CHL", "cl": "CHL", "CHL": "cl",
    "CN": "CHN", "cn": "CHN", "CHN": "cn",
    "CX": "CXR", "cx": "CXR", "CXR": "cx",
    "CC": "CCK", "cc": "CCK", "CCK": "cc",
    "CO": "COL", "co": "COL", "COL": "co",
    "KM": "COM", "km": "COM", "COM": "km",
    "CK": "COK", "ck": "COK", "COK": "ck",
    "CR": "CRC", "cr": "CRC", "CRC": "cr",
    "HR": "HRV", "hr": "HRV", "HRV": "hr",
    "CU": "CUB", "cu": "CUB", "CUB": "cu",
    "CY": "CYP", "cy": "CYP", "CYP": "cy",
    "CZ": "CZE", "cz": "CZE", "CZE": "cz",
    "CD": "COD", "cd": "COD", "COD": "cd",
    "DK": "DNK", "dk": "DNK", "DNK": "dk",
    "DJ": "DJI", "dj": "DJI", "DJI": "dj",
    "DM": "DMA", "dm": "DMA", "DMA": "dm",
    "DO": "DOM", "do": "DOM", "DOM": "do",
    "EC": "ECU", "ec": "ECU", "ECU": "ec",
    "EG": "EGY", "eg": "EGY", "EGY": "eg",
    "SV": "SLV", "sv": "SLV", "SLV": "sv",
    "GQ": "GNQ", "gq": "GNQ", "GNQ": "gq",
    "ER": "ERI", "er": "ERI", "ERI": "er",
    "EE": "EST", "ee": "EST", "EST": "ee",
    "ET": "ETH", "et": "ETH", "ETH": "et",
    "FK": "FLK", "fk": "FLK", "FLK": "fk",
    "FO": "FRO", "fo": "FRO", "FRO": "fo",
    "FJ": "FJI", "fj": "FJI", "FJI": "fj",
    "FI": "FIN", "fi": "FIN", "FIN": "fi",
    "FR": "FRA", "fr": "FRA", "FRA": "fr",
    "PF": "PYF", "pf": "PYF", "PYF": "pf",
    "GA": "GAB", "ga": "GAB", "GAB": "ga",
    "GM": "GMB", "gm": "GMB", "GMB": "gm",
    "GE": "GEO", "ge": "GEO", "GEO": "ge",
    "DE": "DEU", "de": "DEU", "DEU": "de",
    "GH": "GHA", "gh": "GHA", "GHA": "gh",
    "GI": "GIB", "gi": "GIB", "GIB": "gi",
    "GR": "GRC", "gr": "GRC", "GRC": "gr",
    "GL": "GRL", "gl": "GRL", "GRL": "gl",
    "GD": "GRD", "gd": "GRD", "GRD": "gd",
    "GU": "GUM", "gu": "GUM", "GUM": "gu",
    "GT": "GTM", "gt": "GTM", "GTM": "gt",
    "GN": "GIN", "gn": "GIN", "GIN": "gn",
    "GW": "GNB", "gw": "GNB", "GNB": "gw",
    "GY": "GUY", "gy": "GUY", "GUY": "gy",
    "HT": "HTI", "ht": "HTI", "HTI": "ht",
    "VA": "VAT", "va": "VAT", "VAT": "va",
    "HN": "HND", "hn": "HND", "HND": "hn",
    "HK": "HKG", "hk": "HKG", "HKG": "hk",
    "HU": "HUN", "hu": "HUN", "HUN": "hu",
    "IS": "IS ", "is": "IS ", "IS ": "is",
    "IN": "IND", "in": "IND", "IND": "in",
    "ID": "IDN", "id": "IDN", "IDN": "id",
    "IR": "IRN", "ir": "IRN", "IRN": "ir",
    "IQ": "IRQ", "iq": "IRQ", "IRQ": "iq",
    "IE": "IRL", "ie": "IRL", "IRL": "ie",
    "IM": "IMN", "im": "IMN", "IMN": "im",
    "IL": "ISR", "il": "ISR", "ISR": "il",
    "IT": "ITA", "it": "ITA", "ITA": "it",
    "CI": "CIV", "ci": "CIV", "CIV": "ci",
    "JM": "JAM", "jm": "JAM", "JAM": "jm",
    "JP": "JPN", "jp": "JPN", "JPN": "jp",
    "JE": "JEY", "je": "JEY", "JEY": "je",
    "JO": "JOR", "jo": "JOR", "JOR": "jo",
    "KZ": "KAZ", "kz": "KAZ", "KAZ": "kz",
    "KE": "KEN", "ke": "KEN", "KEN": "ke",
    "KI": "KIR", "ki": "KIR", "KIR": "ki",
    "KW": "KWT", "kw": "KWT", "KWT": "kw",
    "KG": "KGZ", "kg": "KGZ", "KGZ": "kg",
    "LA": "LAO", "la": "LAO", "LAO": "la",
    "LV": "LVA", "lv": "LVA", "LVA": "lv",
    "LB": "LBN", "lb": "LBN", "LBN": "lb",
    "LS": "LSO", "ls": "LSO", "LSO": "ls",
    "LR": "LBR", "lr": "LBR", "LBR": "lr",
    "LY": "LBY", "ly": "LBY", "LBY": "ly",
    "LI": "LIE", "li": "LIE", "LIE": "li",
    "LT": "LTU", "lt": "LTU", "LTU": "lt",
    "LU": "LUX", "lu": "LUX", "LUX": "lu",
    "MO": "MAC", "mo": "MAC", "MAC": "mo",
    "MK": "MKD", "mk": "MKD", "MKD": "mk",
    "MG": "MDG", "mg": "MDG", "MDG": "mg",
    "MW": "MWI", "mw": "MWI", "MWI": "mw",
    "MY": "MYS", "my": "MYS", "MYS": "my",
    "MV": "MDV", "mv": "MDV", "MDV": "mv",
    "ML": "MLI", "ml": "MLI", "MLI": "ml",
    "MT": "MLT", "mt": "MLT", "MLT": "mt",
    "MH": "MHL", "mh": "MHL", "MHL": "mh",
    "MR": "MRT", "mr": "MRT", "MRT": "mr",
    "MU": "MUS", "mu": "MUS", "MUS": "mu",
    "YT": "MYT", "yt": "MYT", "MYT": "yt",
    "MX": "MEX", "mx": "MEX", "MEX": "mx",
    "FM": "FSM", "fm": "FSM", "FSM": "fm",
    "MD": "MDA", "md": "MDA", "MDA": "md",
    "MC": "MCO", "mc": "MCO", "MCO": "mc",
    "MN": "MNG", "mn": "MNG", "MNG": "mn",
    "ME": "MNE", "me": "MNE", "MNE": "me",
    "MS": "MSR", "ms": "MSR", "MSR": "ms",
    "MA": "MAR", "ma": "MAR", "MAR": "ma",
    "MZ": "MOZ", "mz": "MOZ", "MOZ": "mz",
    "NA": "NAM", "na": "NAM", "NAM": "na",
    "NR": "NRU", "nr": "NRU", "NRU": "nr",
    "NP": "NPL", "np": "NPL", "NPL": "np",
    "NL": "NLD", "nl": "NLD", "NLD": "nl",
    "AN": "ANT", "an": "ANT", "ANT": "an",
    "NC": "NCL", "nc": "NCL", "NCL": "nc",
    "NZ": "NZL", "nz": "NZL", "NZL": "nz",
    "NI": "NIC", "ni": "NIC", "NIC": "ni",
    "NE": "NER", "ne": "NER", "NER": "ne",
    "NG": "NGA", "ng": "NGA", "NGA": "ng",
    "NU": "NIU", "nu": "NIU", "NIU": "nu",
    "KP": "PRK", "kp": "PRK", "PRK": "kp",
    "MP": "MNP", "mp": "MNP", "MNP": "mp",
    "NO": "NOR", "no": "NOR", "NOR": "no",
    "OM": "OMN", "om": "OMN", "OMN": "om",
    "PK": "PAK", "pk": "PAK", "PAK": "pk",
    "PW": "PLW", "pw": "PLW", "PLW": "pw",
    "PA": "PAN", "pa": "PAN", "PAN": "pa",
    "PG": "PNG", "pg": "PNG", "PNG": "pg",
    "PY": "PRY", "py": "PRY", "PRY": "py",
    "PE": "PER", "pe": "PER", "PER": "pe",
    "PH": "PHL", "ph": "PHL", "PHL": "ph",
    "PN": "PCN", "pn": "PCN", "PCN": "pn",
    "PL": "POL", "pl": "POL", "POL": "pl",
    "PT": "PRT", "pt": "PRT", "PRT": "pt",
    "PR": "PRI", "pr": "PRI", "PRI": "pr",
    "QA": "QAT", "qa": "QAT", "QAT": "qa",
    "CG": "COG", "cg": "COG", "COG": "cg",
    "RO": "ROU", "ro": "ROU", "ROU": "ro",
    "RU": "RUS", "ru": "RUS", "RUS": "ru",
    "RW": "RWA", "rw": "RWA", "RWA": "rw",
    "BL": "BLM", "bl": "BLM", "BLM": "bl",
    "SH": "SHN", "sh": "SHN", "SHN": "sh",
    "KN": "KNA", "kn": "KNA", "KNA": "kn",
    "LC": "LCA", "lc": "LCA", "LCA": "lc",
    "MF": "MAF", "mf": "MAF", "MAF": "mf",
    "PM": "SPM", "pm": "SPM", "SPM": "pm",
    "VC": "VCT", "vc": "VCT", "VCT": "vc",
    "WS": "WSM", "ws": "WSM", "WSM": "ws",
    "SM": "SMR", "sm": "SMR", "SMR": "sm",
    "ST": "STP", "st": "STP", "STP": "st",
    "SA": "SAU", "sa": "SAU", "SAU": "sa",
    "SN": "SEN", "sn": "SEN", "SEN": "sn",
    "RS": "SRB", "rs": "SRB", "SRB": "rs",
    "SC": "SYC", "sc": "SYC", "SYC": "sc",
    "SL": "SLE", "sl": "SLE", "SLE": "sl",
    "SG": "SGP", "sg": "SGP", "SGP": "sg",
    "SK": "SVK", "sk": "SVK", "SVK": "sk",
    "SI": "SVN", "si": "SVN", "SVN": "si",
    "SB": "SLB", "sb": "SLB", "SLB": "sb",
    "SO": "SOM", "so": "SOM", "SOM": "so",
    "ZA": "ZAF", "za": "ZAF", "ZAF": "za",
    "KR": "KOR", "kr": "KOR", "KOR": "kr",
    "ES": "ESP", "es": "ESP", "ESP": "es",
    "LK": "LKA", "lk": "LKA", "LKA": "lk",
    "SD": "SDN", "sd": "SDN", "SDN": "sd",
    "SR": "SUR", "sr": "SUR", "SUR": "sr",
    "SJ": "SJM", "sj": "SJM", "SJM": "sj",
    "SZ": "SWZ", "sz": "SWZ", "SWZ": "sz",
    "SE": "SWE", "se": "SWE", "SWE": "se",
    "CH": "CHE", "ch": "CHE", "CHE": "ch",
    "SY": "SYR", "sy": "SYR", "SYR": "sy",
    "TW": "TWN", "tw": "TWN", "TWN": "tw",
    "TJ": "TJK", "tj": "TJK", "TJK": "tj",
    "TZ": "TZA", "tz": "TZA", "TZA": "tz",
    "TH": "THA", "th": "THA", "THA": "th",
    "TL": "TLS", "tl": "TLS", "TLS": "tl",
    "TG": "TGO", "tg": "TGO", "TGO": "tg",
    "TK": "TKL", "tk": "TKL", "TKL": "tk",
    "TO": "TON", "to": "TON", "TON": "to",
    "TT": "TTO", "tt": "TTO", "TTO": "tt",
    "TN": "TUN", "tn": "TUN", "TUN": "tn",
    "TR": "TUR", "tr": "TUR", "TUR": "tr",
    "TM": "TKM", "tm": "TKM", "TKM": "tm",
    "TC": "TCA", "tc": "TCA", "TCA": "tc",
    "TV": "TUV", "tv": "TUV", "TUV": "tv",
    "UG": "UGA", "ug": "UGA", "UGA": "ug",
    "UA": "UKR", "ua": "UKR", "UKR": "ua",
    "AE": "ARE", "ae": "ARE", "ARE": "ae",
    "GB": "GBR", "gb": "GBR", "GBR": "gb",
    "US": "USA", "us": "USA", "USA": "us",
    "UY": "URY", "uy": "URY", "URY": "uy",
    "VI": "VIR", "vi": "VIR", "VIR": "vi",
    "UZ": "UZB", "uz": "UZB", "UZB": "uz",
    "VU": "VUT", "vu": "VUT", "VUT": "vu",
    "VE": "VEN", "ve": "VEN", "VEN": "ve",
    "VN": "VNM", "vn": "VNM", "VNM": "vn",
    "WF": "WLF", "wf": "WLF", "WLF": "wf",
    "EH": "ESH", "eh": "ESH", "ESH": "eh",
    "YE": "YEM", "ye": "YEM", "YEM": "ye",
    "ZM": "ZMB", "zm": "ZMB", "ZMB": "zm",
    "ZW": "ZWE", "zw": "ZWE", "ZWE": "zw"
};

Bloonix.other.mapRegions = {
    "ae": "United Arab Emirates",
    "af": "Afghanistan",
    "ag": "Antigua and Barbuda",
    "al": "Albania",
    "am": "Armenia",
    "ao": "Angola",
    "ar": "Argentina",
    "at": "Austria",
    "au": "Australia",
    "az": "Azerbaijan",
    "ba": "Bosnia and Herzegovina",
    "bb": "Barbados",
    "bd": "Bangladesh",
    "be": "Belgium",
    "bf": "Burkina Faso",
    "bg": "Bulgaria",
    "bi": "Burundi",
    "bj": "Benin",
    "bn": "Brunei Darussalam",
    "bo": "Bolivia",
    "br": "Brazil",
    "bs": "Bahamas",
    "bt": "Bhutan",
    "bw": "Botswana",
    "by": "Belarus",
    "bz": "Belize",
    "ca": "Canada",
    "cd": "Congo",
    "cf": "Central African Republic",
    "cg": "Congo",
    "ch": "Switzerland",
    "ci": "Cote d'Ivoire",
    "cl": "Chile",
    "cm": "Cameroon",
    "cn": "China",
    "co": "Colombia",
    "cr": "Costa Rica",
    "cu": "Cuba",
    "cv": "Cape Verde",
    "cy": "Cyprus",
    "cz": "Czech Republic",
    "de": "Germany",
    "dj": "Djibouti",
    "dk": "Denmark",
    "dm": "Dominica",
    "do": "Dominican Republic",
    "dz": "Algeria",
    "ec": "Ecuador",
    "ee": "Estonia",
    "eg": "Egypt",
    "er": "Eritrea",
    "es": "Spain",
    "et": "Ethiopia",
    "fi": "Finland",
    "fj": "Fiji",
    "fk": "Falkland Islands",
    "fr": "France",
    "ga": "Gabon",
    "gb": "United Kingdom",
    "gd": "Grenada",
    "ge": "Georgia",
    "gf": "French Guiana",
    "gh": "Ghana",
    "gl": "Greenland",
    "gm": "Gambia",
    "gn": "Guinea",
    "gq": "Equatorial Guinea",
    "gr": "Greece",
    "gt": "Guatemala",
    "gw": "Guinea-Bissau",
    "gy": "Guyana",
    "hn": "Honduras",
    "hr": "Croatia",
    "ht": "Haiti",
    "hu": "Hungary",
    "id": "Indonesia",
    "ie": "Ireland",
    "il": "Israel",
    "in": "India",
    "iq": "Iraq",
    "ir": "Iran",
    "is": "Iceland",
    "it": "Italy",
    "jm": "Jamaica",
    "jo": "Jordan",
    "jp": "Japan",
    "ke": "Kenya",
    "kg": "Kyrgyz Republic",
    "kh": "Cambodia",
    "km": "Comoros",
    "kn": "Saint Kitts and Nevis",
    "kp": "North Korea",
    "kr": "South Korea",
    "kw": "Kuwait",
    "kz": "Kazakhstan",
    "la": "Lao People's Democratic Republic",
    "lb": "Lebanon",
    "lc": "Saint Lucia",
    "lk": "Sri Lanka",
    "lr": "Liberia",
    "ls": "Lesotho",
    "lt": "Lithuania",
    "lv": "Latvia",
    "ly": "Libya",
    "ma": "Morocco",
    "md": "Moldova",
    "mg": "Madagascar",
    "mk": "Macedonia",
    "ml": "Mali",
    "mm": "Myanmar",
    "mn": "Mongolia",
    "mr": "Mauritania",
    "mt": "Malta",
    "mu": "Mauritius",
    "mv": "Maldives",
    "mw": "Malawi",
    "mx": "Mexico",
    "my": "Malaysia",
    "mz": "Mozambique",
    "na": "Namibia",
    "nc": "New Caledonia",
    "ne": "Niger",
    "ng": "Nigeria",
    "ni": "Nicaragua",
    "nl": "Netherlands",
    "no": "Norway",
    "np": "Nepal",
    "nz": "New Zealand",
    "om": "Oman",
    "pa": "Panama",
    "pe": "Peru",
    "pf": "French Polynesia",
    "pg": "Papua New Guinea",
    "ph": "Philippines",
    "pk": "Pakistan",
    "pl": "Poland",
    "pt": "Portugal",
    "py": "Paraguay",
    "qa": "Qatar",
    "re": "Reunion",
    "ro": "Romania",
    "rs": "Serbia",
    "ru": "Russian Federationß",
    "rw": "Rwanda",
    "sa": "Saudi Arabia",
    "sb": "Solomon Islands",
    "sc": "Seychelles",
    "sd": "Sudan",
    "se": "Sweden",
    "si": "Slovenia",
    "sk": "Slovakia",
    "sl": "Sierra Leone",
    "sn": "Senegal",
    "so": "Somalia",
    "sr": "Suriname",
    "st": "Sao Tome and Principe",
    "sv": "El Salvador",
    "sy": "Syrian Arab Republic",
    "sz": "Swaziland",
    "td": "Chad",
    "tg": "Togo",
    "th": "Thailand",
    "tj": "Tajikistan",
    "tl": "Timor-Leste",
    "tm": "Turkmenistan",
    "tn": "Tunisia",
    "tr": "Turkey",
    "tt": "Trinidad and Tobago",
    "tw": "Taiwan",
    "tz": "Tanzania",
    "ua": "Ukraine",
    "ug": "Uganda",
    "us": "United States of America",
    "uy": "Uruguay",
    "uz": "Uzbekistan",
    "ve": "Venezuela",
    "vn": "Vietnam",
    "vu": "Vanuatu",
    "ye": "Yemen",
    "za": "South Africa",
    "zm": "Zambia",
    "zw": "Zimbabwe"
};
