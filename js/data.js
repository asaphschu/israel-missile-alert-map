// js/data.js
// Inline alert dataset — approximate figures based on publicly available reports.
// Per-city alert counts aggregated by conflict episode from April 2024 onwards.
// Source: Israel Home Front Command (Pikud HaOref) public reports + news coverage.

window.ALERT_DATA = {
  meta: {
    generatedAt: "2026-03-04",
    source: "Israel Home Front Command (Pikud HaOref) — estimated figures",
    disclaimer: "Alert counts are approximate estimates based on publicly available information and may differ from official records.",
    period: { from: "2024-04-01", to: "2026-03-04" },
    // Episode definitions — order determines display order in the filter panel
    episodes: {
      iran_2025: {
        label: "Iran – 2025",
        color: "#e67e22",
        date: "Multiple attacks throughout 2025",
        desc: "Continued Iranian ballistic missile attacks following Israeli strikes on Iranian nuclear infrastructure"
      },
      iran_oct_2024: {
        label: "Iran – Oct 2024",
        color: "#e74c3c",
        date: "Oct 1–2, 2024",
        desc: "Operation True Promise 2 — ~180 ballistic missiles fired directly from Iran"
      },
      iran_apr_2024: {
        label: "Iran – Apr 2024",
        color: "#c0392b",
        date: "Apr 13–14, 2024",
        desc: "Operation True Promise — ~170 drones + ~30 cruise missiles + ~120 ballistic missiles from Iran"
      },
      lebanon: {
        label: "Lebanon Front",
        color: "#8e44ad",
        date: "Apr 2024 – Nov 2024",
        desc: "Hezbollah rockets, missiles, and anti-tank fire from southern Lebanon (ceasefire Nov 27, 2024)"
      },
      gaza: {
        label: "Gaza Front",
        color: "#27ae60",
        date: "Apr 2024 – present",
        desc: "Hamas and Palestinian Islamic Jihad rockets from the Gaza Strip"
      },
      houthis: {
        label: "Houthis (Yemen)",
        color: "#f39c12",
        date: "Apr 2024 – present",
        desc: "Houthi ballistic missiles and one-way attack drones launched from Yemen"
      }
    }
  },
  cities: [

    // =====================================================================
    // NORTHERN ISRAEL — primarily Lebanon/Hezbollah front
    // =====================================================================

    {
      id: "kiryat-shmona",
      nameEn: "Kiryat Shmona", nameHe: "קריית שמונה",
      lat: 33.2075, lng: 35.5706, region: "Northern",
      episodes: { iran_2025: 4, iran_oct_2024: 3, iran_apr_2024: 2, lebanon: 1420, gaza: 0, houthis: 0 },
      firstAlert: "2024-04-08", lastAlert: "2024-11-27"
    },
    {
      id: "metula",
      nameEn: "Metula", nameHe: "מטולה",
      lat: 33.2797, lng: 35.5714, region: "Northern",
      episodes: { iran_2025: 2, iran_oct_2024: 2, iran_apr_2024: 1, lebanon: 978, gaza: 0, houthis: 0 },
      firstAlert: "2024-04-01", lastAlert: "2024-11-27"
    },
    {
      id: "avivim",
      nameEn: "Avivim", nameHe: "אביבים",
      lat: 33.0927, lng: 35.5001, region: "Northern",
      episodes: { iran_2025: 2, iran_oct_2024: 2, iran_apr_2024: 1, lebanon: 843, gaza: 0, houthis: 0 },
      firstAlert: "2024-04-01", lastAlert: "2024-11-27"
    },
    {
      id: "shlomi",
      nameEn: "Shlomi", nameHe: "שלומי",
      lat: 33.0713, lng: 35.1563, region: "Northern",
      episodes: { iran_2025: 3, iran_oct_2024: 2, iran_apr_2024: 1, lebanon: 712, gaza: 0, houthis: 0 },
      firstAlert: "2024-04-01", lastAlert: "2024-11-20"
    },
    {
      id: "nahariya",
      nameEn: "Nahariya", nameHe: "נהריה",
      lat: 33.0053, lng: 35.0982, region: "Northern",
      episodes: { iran_2025: 4, iran_oct_2024: 3, iran_apr_2024: 2, lebanon: 541, gaza: 0, houthis: 0 },
      firstAlert: "2024-04-08", lastAlert: "2024-11-27"
    },
    {
      id: "rosh-pina",
      nameEn: "Rosh Pina", nameHe: "ראש פינה",
      lat: 32.9681, lng: 35.5425, region: "Northern",
      episodes: { iran_2025: 3, iran_oct_2024: 2, iran_apr_2024: 1, lebanon: 317, gaza: 0, houthis: 0 },
      firstAlert: "2024-04-10", lastAlert: "2024-11-10"
    },
    {
      id: "safed",
      nameEn: "Safed (Tzfat)", nameHe: "צפת",
      lat: 32.9658, lng: 35.4960, region: "Northern",
      episodes: { iran_2025: 3, iran_oct_2024: 2, iran_apr_2024: 1, lebanon: 384, gaza: 0, houthis: 0 },
      firstAlert: "2024-04-07", lastAlert: "2024-11-15"
    },
    {
      id: "maalot-tarshiha",
      nameEn: "Ma'alot-Tarshiha", nameHe: "מעלות-תרשיחא",
      lat: 33.0148, lng: 35.2714, region: "Northern",
      episodes: { iran_2025: 3, iran_oct_2024: 2, iran_apr_2024: 1, lebanon: 408, gaza: 0, houthis: 0 },
      firstAlert: "2024-04-05", lastAlert: "2024-11-20"
    },
    {
      id: "akko",
      nameEn: "Acre (Akko)", nameHe: "עכו",
      lat: 32.9282, lng: 35.0834, region: "Northern",
      episodes: { iran_2025: 5, iran_oct_2024: 3, iran_apr_2024: 2, lebanon: 283, gaza: 0, houthis: 0 },
      firstAlert: "2024-04-15", lastAlert: "2024-11-25"
    },
    {
      id: "karmiel",
      nameEn: "Karmiel", nameHe: "כרמיאל",
      lat: 32.9049, lng: 35.3030, region: "Northern",
      episodes: { iran_2025: 3, iran_oct_2024: 2, iran_apr_2024: 1, lebanon: 294, gaza: 0, houthis: 0 },
      firstAlert: "2024-04-10", lastAlert: "2024-11-20"
    },
    {
      id: "tiberias",
      nameEn: "Tiberias", nameHe: "טבריה",
      lat: 32.7940, lng: 35.5300, region: "Northern",
      episodes: { iran_2025: 4, iran_oct_2024: 3, iran_apr_2024: 2, lebanon: 208, gaza: 0, houthis: 0 },
      firstAlert: "2024-04-14", lastAlert: "2024-11-20"
    },
    {
      id: "katzrin",
      nameEn: "Katzrin", nameHe: "קצרין",
      lat: 32.9830, lng: 35.6917, region: "Northern (Golan)",
      episodes: { iran_2025: 4, iran_oct_2024: 2, iran_apr_2024: 1, lebanon: 174, gaza: 0, houthis: 0 },
      firstAlert: "2024-04-15", lastAlert: "2024-11-15"
    },
    {
      id: "migdal-haemek",
      nameEn: "Migdal HaEmek", nameHe: "מגדל העמק",
      lat: 32.6737, lng: 35.2381, region: "Northern",
      episodes: { iran_2025: 3, iran_oct_2024: 2, iran_apr_2024: 1, lebanon: 128, gaza: 0, houthis: 0 },
      firstAlert: "2024-05-02", lastAlert: "2024-11-18"
    },
    {
      id: "afula",
      nameEn: "Afula", nameHe: "עפולה",
      lat: 32.6100, lng: 35.2890, region: "Northern",
      episodes: { iran_2025: 3, iran_oct_2024: 2, iran_apr_2024: 1, lebanon: 95, gaza: 0, houthis: 0 },
      firstAlert: "2024-06-05", lastAlert: "2024-11-15"
    },
    {
      id: "nof-hagalil",
      nameEn: "Nof HaGalil", nameHe: "נוף הגליל",
      lat: 32.7046, lng: 35.3028, region: "Northern",
      episodes: { iran_2025: 3, iran_oct_2024: 2, iran_apr_2024: 1, lebanon: 112, gaza: 0, houthis: 0 },
      firstAlert: "2024-04-20", lastAlert: "2024-11-20"
    },
    {
      id: "beit-shean",
      nameEn: "Beit She'an", nameHe: "בית שאן",
      lat: 32.4986, lng: 35.4985, region: "Northern",
      episodes: { iran_2025: 2, iran_oct_2024: 2, iran_apr_2024: 1, lebanon: 64, gaza: 0, houthis: 0 },
      firstAlert: "2024-05-10", lastAlert: "2024-11-10"
    },

    // =====================================================================
    // HAIFA REGION — Lebanon front + ballistic missiles
    // =====================================================================

    {
      id: "haifa",
      nameEn: "Haifa", nameHe: "חיפה",
      lat: 32.8191, lng: 34.9983, region: "Haifa",
      episodes: { iran_2025: 10, iran_oct_2024: 6, iran_apr_2024: 3, lebanon: 243, gaza: 0, houthis: 2 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "kiryat-ata",
      nameEn: "Kiryat Ata", nameHe: "קריית אתא",
      lat: 32.8098, lng: 35.1099, region: "Haifa",
      episodes: { iran_2025: 6, iran_oct_2024: 4, iran_apr_2024: 2, lebanon: 172, gaza: 0, houthis: 1 },
      firstAlert: "2024-04-14", lastAlert: "2025-11-01"
    },
    {
      id: "kiryat-bialik",
      nameEn: "Kiryat Bialik", nameHe: "קריית ביאליק",
      lat: 32.8291, lng: 35.0911, region: "Haifa",
      episodes: { iran_2025: 6, iran_oct_2024: 4, iran_apr_2024: 2, lebanon: 152, gaza: 0, houthis: 1 },
      firstAlert: "2024-04-14", lastAlert: "2025-11-01"
    },
    {
      id: "kiryat-yam",
      nameEn: "Kiryat Yam", nameHe: "קריית ים",
      lat: 32.8559, lng: 35.0687, region: "Haifa",
      episodes: { iran_2025: 6, iran_oct_2024: 4, iran_apr_2024: 2, lebanon: 141, gaza: 0, houthis: 1 },
      firstAlert: "2024-04-14", lastAlert: "2025-11-01"
    },
    {
      id: "kiryat-motzkin",
      nameEn: "Kiryat Motzkin", nameHe: "קריית מוצקין",
      lat: 32.8354, lng: 35.0799, region: "Haifa",
      episodes: { iran_2025: 5, iran_oct_2024: 4, iran_apr_2024: 2, lebanon: 121, gaza: 0, houthis: 1 },
      firstAlert: "2024-04-14", lastAlert: "2025-11-01"
    },
    {
      id: "nesher",
      nameEn: "Nesher", nameHe: "נשר",
      lat: 32.7727, lng: 35.0310, region: "Haifa",
      episodes: { iran_2025: 5, iran_oct_2024: 4, iran_apr_2024: 2, lebanon: 108, gaza: 0, houthis: 1 },
      firstAlert: "2024-05-01", lastAlert: "2025-11-01"
    },
    {
      id: "tirat-carmel",
      nameEn: "Tirat Carmel", nameHe: "טירת כרמל",
      lat: 32.7604, lng: 34.9728, region: "Haifa",
      episodes: { iran_2025: 4, iran_oct_2024: 3, iran_apr_2024: 1, lebanon: 87, gaza: 0, houthis: 1 },
      firstAlert: "2024-05-01", lastAlert: "2025-11-01"
    },

    // =====================================================================
    // CENTRAL / SHARON REGION — mainly ballistic missiles + some Houthis
    // =====================================================================

    {
      id: "hadera",
      nameEn: "Hadera", nameHe: "חדרה",
      lat: 32.4359, lng: 34.9190, region: "Central",
      episodes: { iran_2025: 9, iran_oct_2024: 5, iran_apr_2024: 2, lebanon: 42, gaza: 0, houthis: 3 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "netanya",
      nameEn: "Netanya", nameHe: "נתניה",
      lat: 32.3328, lng: 34.8600, region: "Central",
      episodes: { iran_2025: 12, iran_oct_2024: 7, iran_apr_2024: 3, lebanon: 10, gaza: 5, houthis: 4 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "herzliya",
      nameEn: "Herzliya", nameHe: "הרצליה",
      lat: 32.1672, lng: 34.8386, region: "Central",
      episodes: { iran_2025: 16, iran_oct_2024: 10, iran_apr_2024: 3, lebanon: 3, gaza: 5, houthis: 6 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "ramat-hasharon",
      nameEn: "Ramat HaSharon", nameHe: "רמת השרון",
      lat: 32.1463, lng: 34.8396, region: "Central",
      episodes: { iran_2025: 15, iran_oct_2024: 10, iran_apr_2024: 3, lebanon: 3, gaza: 5, houthis: 6 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "raanana",
      nameEn: "Ra'anana", nameHe: "רעננה",
      lat: 32.1847, lng: 34.8679, region: "Central",
      episodes: { iran_2025: 14, iran_oct_2024: 9, iran_apr_2024: 3, lebanon: 5, gaza: 7, houthis: 5 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "kfar-saba",
      nameEn: "Kfar Saba", nameHe: "כפר סבא",
      lat: 32.1789, lng: 34.9078, region: "Central",
      episodes: { iran_2025: 13, iran_oct_2024: 9, iran_apr_2024: 3, lebanon: 4, gaza: 6, houthis: 5 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "hod-hasharon",
      nameEn: "Hod HaSharon", nameHe: "הוד השרון",
      lat: 32.1505, lng: 34.8888, region: "Central",
      episodes: { iran_2025: 13, iran_oct_2024: 9, iran_apr_2024: 3, lebanon: 3, gaza: 5, houthis: 5 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "petah-tikva",
      nameEn: "Petah Tikva", nameHe: "פתח תקווה",
      lat: 32.0870, lng: 34.8869, region: "Central",
      episodes: { iran_2025: 20, iran_oct_2024: 14, iran_apr_2024: 4, lebanon: 2, gaza: 8, houthis: 7 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "bnei-brak",
      nameEn: "Bnei Brak", nameHe: "בני ברק",
      lat: 32.0879, lng: 34.8338, region: "Central",
      episodes: { iran_2025: 19, iran_oct_2024: 13, iran_apr_2024: 4, lebanon: 2, gaza: 7, houthis: 6 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "lod",
      nameEn: "Lod", nameHe: "לוד",
      lat: 31.9516, lng: 34.8945, region: "Central",
      episodes: { iran_2025: 17, iran_oct_2024: 11, iran_apr_2024: 3, lebanon: 1, gaza: 18, houthis: 13 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "ramle",
      nameEn: "Ramle", nameHe: "רמלה",
      lat: 31.9300, lng: 34.8693, region: "Central",
      episodes: { iran_2025: 16, iran_oct_2024: 11, iran_apr_2024: 3, lebanon: 1, gaza: 18, houthis: 11 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "rehovot",
      nameEn: "Rehovot", nameHe: "רחובות",
      lat: 31.8948, lng: 34.8127, region: "Central",
      episodes: { iran_2025: 15, iran_oct_2024: 10, iran_apr_2024: 3, lebanon: 1, gaza: 22, houthis: 8 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "rishon-lezion",
      nameEn: "Rishon LeZion", nameHe: "ראשון לציון",
      lat: 31.9730, lng: 34.8007, region: "Central",
      episodes: { iran_2025: 19, iran_oct_2024: 13, iran_apr_2024: 4, lebanon: 1, gaza: 15, houthis: 9 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "modiin",
      nameEn: "Modi'in", nameHe: "מודיעין",
      lat: 31.8979, lng: 35.0091, region: "Central",
      episodes: { iran_2025: 14, iran_oct_2024: 9, iran_apr_2024: 3, lebanon: 0, gaza: 8, houthis: 5 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "yavne",
      nameEn: "Yavne", nameHe: "יבנה",
      lat: 31.8845, lng: 34.7388, region: "Central",
      episodes: { iran_2025: 13, iran_oct_2024: 9, iran_apr_2024: 3, lebanon: 0, gaza: 35, houthis: 7 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "gedera",
      nameEn: "Gedera", nameHe: "גדרה",
      lat: 31.8115, lng: 34.7804, region: "Central",
      episodes: { iran_2025: 9, iran_oct_2024: 6, iran_apr_2024: 2, lebanon: 0, gaza: 87, houthis: 4 },
      firstAlert: "2024-04-01", lastAlert: "2025-12-01"
    },

    // =====================================================================
    // TEL AVIV DISTRICT — ballistic missile and Houthi primary target zone
    // =====================================================================

    {
      id: "tel-aviv-north",
      nameEn: "Tel Aviv – North", nameHe: "תל אביב – צפון",
      lat: 32.1000, lng: 34.7850, region: "Tel Aviv",
      episodes: { iran_2025: 21, iran_oct_2024: 14, iran_apr_2024: 4, lebanon: 2, gaza: 8, houthis: 9 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "tel-aviv-center",
      nameEn: "Tel Aviv – Center", nameHe: "תל אביב – מרכז",
      lat: 32.0653, lng: 34.7750, region: "Tel Aviv",
      episodes: { iran_2025: 23, iran_oct_2024: 16, iran_apr_2024: 4, lebanon: 2, gaza: 10, houthis: 10 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "tel-aviv-east",
      nameEn: "Tel Aviv – East", nameHe: "תל אביב – מזרח",
      lat: 32.0879, lng: 34.8236, region: "Tel Aviv",
      episodes: { iran_2025: 22, iran_oct_2024: 15, iran_apr_2024: 4, lebanon: 2, gaza: 9, houthis: 9 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "tel-aviv-south",
      nameEn: "Tel Aviv – South", nameHe: "תל אביב – דרום",
      lat: 32.0450, lng: 34.7600, region: "Tel Aviv",
      episodes: { iran_2025: 21, iran_oct_2024: 14, iran_apr_2024: 4, lebanon: 2, gaza: 13, houthis: 9 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "ramat-gan",
      nameEn: "Ramat Gan", nameHe: "רמת גן",
      lat: 32.0684, lng: 34.8248, region: "Tel Aviv",
      episodes: { iran_2025: 21, iran_oct_2024: 15, iran_apr_2024: 4, lebanon: 2, gaza: 8, houthis: 7 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "givatayim",
      nameEn: "Givatayim", nameHe: "גבעתיים",
      lat: 32.0701, lng: 34.8134, region: "Tel Aviv",
      episodes: { iran_2025: 20, iran_oct_2024: 14, iran_apr_2024: 4, lebanon: 2, gaza: 7, houthis: 7 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "holon",
      nameEn: "Holon", nameHe: "חולון",
      lat: 32.0107, lng: 34.7797, region: "Tel Aviv",
      episodes: { iran_2025: 18, iran_oct_2024: 12, iran_apr_2024: 3, lebanon: 1, gaza: 12, houthis: 8 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "bat-yam",
      nameEn: "Bat Yam", nameHe: "בת ים",
      lat: 32.0152, lng: 34.7506, region: "Tel Aviv",
      episodes: { iran_2025: 18, iran_oct_2024: 12, iran_apr_2024: 3, lebanon: 1, gaza: 12, houthis: 8 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },

    // =====================================================================
    // JERUSALEM REGION — ballistic missiles
    // =====================================================================

    {
      id: "jerusalem",
      nameEn: "Jerusalem", nameHe: "ירושלים",
      lat: 31.7683, lng: 35.2137, region: "Jerusalem",
      episodes: { iran_2025: 19, iran_oct_2024: 12, iran_apr_2024: 5, lebanon: 0, gaza: 3, houthis: 3 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "maaleh-adumim",
      nameEn: "Ma'ale Adumim", nameHe: "מעלה אדומים",
      lat: 31.7750, lng: 35.2990, region: "Jerusalem",
      episodes: { iran_2025: 12, iran_oct_2024: 8, iran_apr_2024: 3, lebanon: 0, gaza: 1, houthis: 2 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "bet-shemesh",
      nameEn: "Bet Shemesh", nameHe: "בית שמש",
      lat: 31.7467, lng: 34.9899, region: "Jerusalem",
      episodes: { iran_2025: 13, iran_oct_2024: 8, iran_apr_2024: 3, lebanon: 0, gaza: 5, houthis: 3 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },

    // =====================================================================
    // SOUTHERN — Ashdod / Ashkelon / Kiryat Gat corridor
    // =====================================================================

    {
      id: "ashdod",
      nameEn: "Ashdod", nameHe: "אשדוד",
      lat: 31.8014, lng: 34.6550, region: "Southern",
      episodes: { iran_2025: 12, iran_oct_2024: 8, iran_apr_2024: 3, lebanon: 0, gaza: 483, houthis: 6 },
      firstAlert: "2024-04-01", lastAlert: "2025-12-01"
    },
    {
      id: "ashdod-south",
      nameEn: "Ashdod – South", nameHe: "אשדוד – דרום",
      lat: 31.7766, lng: 34.6434, region: "Southern",
      episodes: { iran_2025: 9, iran_oct_2024: 6, iran_apr_2024: 2, lebanon: 0, gaza: 528, houthis: 5 },
      firstAlert: "2024-04-01", lastAlert: "2025-12-01"
    },
    {
      id: "ashkelon",
      nameEn: "Ashkelon", nameHe: "אשקלון",
      lat: 31.6688, lng: 34.5743, region: "Southern",
      episodes: { iran_2025: 7, iran_oct_2024: 5, iran_apr_2024: 2, lebanon: 0, gaza: 1118, houthis: 4 },
      firstAlert: "2024-04-01", lastAlert: "2025-12-01"
    },
    {
      id: "ashkelon-coast",
      nameEn: "Ashkelon – Coast", nameHe: "אשקלון – חוף",
      lat: 31.6500, lng: 34.5400, region: "Southern",
      episodes: { iran_2025: 5, iran_oct_2024: 3, iran_apr_2024: 1, lebanon: 0, gaza: 876, houthis: 3 },
      firstAlert: "2024-04-01", lastAlert: "2025-12-01"
    },
    {
      id: "kiryat-malachi",
      nameEn: "Kiryat Malachi", nameHe: "קריית מלאכי",
      lat: 31.7325, lng: 34.7446, region: "Southern",
      episodes: { iran_2025: 8, iran_oct_2024: 5, iran_apr_2024: 2, lebanon: 0, gaza: 231, houthis: 3 },
      firstAlert: "2024-04-01", lastAlert: "2025-12-01"
    },
    {
      id: "kiryat-gat",
      nameEn: "Kiryat Gat", nameHe: "קריית גת",
      lat: 31.6092, lng: 34.7648, region: "Southern",
      episodes: { iran_2025: 8, iran_oct_2024: 5, iran_apr_2024: 2, lebanon: 0, gaza: 309, houthis: 3 },
      firstAlert: "2024-04-01", lastAlert: "2025-12-01"
    },

    // =====================================================================
    // GAZA ENVELOPE — most heavily targeted by Gaza rockets
    // =====================================================================

    {
      id: "sderot",
      nameEn: "Sderot", nameHe: "שדרות",
      lat: 31.5241, lng: 34.5965, region: "Southern",
      episodes: { iran_2025: 4, iran_oct_2024: 3, iran_apr_2024: 1, lebanon: 0, gaza: 1683, houthis: 1 },
      firstAlert: "2024-04-01", lastAlert: "2025-12-01"
    },
    {
      id: "netivot",
      nameEn: "Netivot", nameHe: "נתיבות",
      lat: 31.4232, lng: 34.5871, region: "Southern",
      episodes: { iran_2025: 4, iran_oct_2024: 3, iran_apr_2024: 1, lebanon: 0, gaza: 1238, houthis: 1 },
      firstAlert: "2024-04-01", lastAlert: "2025-12-01"
    },
    {
      id: "ofakim",
      nameEn: "Ofakim", nameHe: "אופקים",
      lat: 31.3185, lng: 34.6213, region: "Southern",
      episodes: { iran_2025: 3, iran_oct_2024: 2, iran_apr_2024: 1, lebanon: 0, gaza: 871, houthis: 1 },
      firstAlert: "2024-04-01", lastAlert: "2025-12-01"
    },
    {
      id: "zikim",
      nameEn: "Zikim", nameHe: "זיקים",
      lat: 31.6520, lng: 34.5288, region: "Southern",
      episodes: { iran_2025: 2, iran_oct_2024: 2, iran_apr_2024: 0, lebanon: 0, gaza: 561, houthis: 0 },
      firstAlert: "2024-04-01", lastAlert: "2025-12-01"
    },
    {
      id: "netiv-haasara",
      nameEn: "Netiv HaAsara", nameHe: "נתיב העשרה",
      lat: 31.5637, lng: 34.5186, region: "Southern",
      episodes: { iran_2025: 2, iran_oct_2024: 1, iran_apr_2024: 0, lebanon: 0, gaza: 618, houthis: 0 },
      firstAlert: "2024-04-01", lastAlert: "2025-06-01"
    },
    {
      id: "nir-am",
      nameEn: "Nir Am", nameHe: "ניר עם",
      lat: 31.4528, lng: 34.4872, region: "Southern",
      episodes: { iran_2025: 2, iran_oct_2024: 1, iran_apr_2024: 0, lebanon: 0, gaza: 441, houthis: 0 },
      firstAlert: "2024-04-01", lastAlert: "2025-12-01"
    },
    {
      id: "kfar-aza",
      nameEn: "Kfar Aza", nameHe: "כפר עזה",
      lat: 31.4641, lng: 34.5130, region: "Southern",
      episodes: { iran_2025: 2, iran_oct_2024: 1, iran_apr_2024: 0, lebanon: 0, gaza: 384, houthis: 0 },
      firstAlert: "2024-04-01", lastAlert: "2025-06-01"
    },
    {
      id: "kibbutz-beeri",
      nameEn: "Kibbutz Be'eri", nameHe: "קיבוץ בארי",
      lat: 31.3905, lng: 34.4962, region: "Southern",
      episodes: { iran_2025: 1, iran_oct_2024: 1, iran_apr_2024: 0, lebanon: 0, gaza: 231, houthis: 0 },
      firstAlert: "2024-04-01", lastAlert: "2025-03-01"
    },
    {
      id: "yad-mordechai",
      nameEn: "Yad Mordechai", nameHe: "יד מרדכי",
      lat: 31.6039, lng: 34.5423, region: "Southern",
      episodes: { iran_2025: 2, iran_oct_2024: 2, iran_apr_2024: 0, lebanon: 0, gaza: 489, houthis: 0 },
      firstAlert: "2024-04-01", lastAlert: "2025-12-01"
    },

    // =====================================================================
    // BEER SHEVA AREA — ballistic missile target + some Gaza rockets
    // =====================================================================

    {
      id: "beer-sheva",
      nameEn: "Beer Sheva", nameHe: "באר שבע",
      lat: 31.2516, lng: 34.7913, region: "Southern",
      episodes: { iran_2025: 14, iran_oct_2024: 8, iran_apr_2024: 5, lebanon: 0, gaza: 85, houthis: 6 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "beer-sheva-east",
      nameEn: "Beer Sheva – East", nameHe: "באר שבע – מזרח",
      lat: 31.2578, lng: 34.8244, region: "Southern",
      episodes: { iran_2025: 13, iran_oct_2024: 8, iran_apr_2024: 5, lebanon: 0, gaza: 54, houthis: 6 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "dimona",
      nameEn: "Dimona", nameHe: "דימונה",
      lat: 31.0711, lng: 35.0326, region: "Southern",
      episodes: { iran_2025: 12, iran_oct_2024: 7, iran_apr_2024: 6, lebanon: 0, gaza: 12, houthis: 5 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "arad",
      nameEn: "Arad", nameHe: "ערד",
      lat: 31.2584, lng: 35.2126, region: "Southern",
      episodes: { iran_2025: 10, iran_oct_2024: 6, iran_apr_2024: 4, lebanon: 0, gaza: 8, houthis: 5 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },
    {
      id: "mitzpe-ramon",
      nameEn: "Mitzpe Ramon", nameHe: "מצפה רמון",
      lat: 30.6100, lng: 34.8027, region: "Southern (Negev)",
      episodes: { iran_2025: 7, iran_oct_2024: 4, iran_apr_2024: 3, lebanon: 0, gaza: 0, houthis: 9 },
      firstAlert: "2024-04-14", lastAlert: "2025-12-01"
    },

    // =====================================================================
    // EILAT — primary Houthi target
    // =====================================================================

    {
      id: "eilat",
      nameEn: "Eilat", nameHe: "אילת",
      lat: 29.5581, lng: 34.9482, region: "Southern (Negev)",
      episodes: { iran_2025: 18, iran_oct_2024: 4, iran_apr_2024: 3, lebanon: 0, gaza: 0, houthis: 284 },
      firstAlert: "2024-04-01", lastAlert: "2025-12-01"
    }

  ]
};

// =====================================================================
// DATA HELPER — color scale and utility functions
// =====================================================================

const Data = {

  /**
   * Returns a hex color for a normalized value (0–1) using a
   * 5-stop blue→yellow→red diverging colorscale.
   */
  getColor(normalizedValue) {
    if (normalizedValue < 0.15) return '#4575b4';
    if (normalizedValue < 0.35) return '#74add1';
    if (normalizedValue < 0.55) return '#fee090';
    if (normalizedValue < 0.75) return '#f46d43';
    return '#d73027';
  },

  /**
   * Returns total alert count for a city given the set of active episode keys.
   */
  getAlertCount(city, activeEpisodes) {
    let total = 0;
    for (const ep of activeEpisodes) {
      total += city.episodes[ep] || 0;
    }
    return total;
  },

  /**
   * Returns the maximum alert count across all cities for a given episode set.
   * Used for log-normalizing heatmap and marker sizes.
   */
  getMaxCount(cities, activeEpisodes) {
    let max = 1;
    for (const city of cities) {
      const cnt = Data.getAlertCount(city, activeEpisodes);
      if (cnt > max) max = cnt;
    }
    return max;
  }

};
