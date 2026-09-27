/*
 * VocabArcade — Topic Seed (v2)
 * ---------------------------------------------------------------
 * A TOPIC is reusable content: a set of Turkish -> English word pairs that
 * can be played in ANY engine (Breakout, Invaders, ...). This is the heart
 * of the product: one topic, many games.
 *
 * Each topic entry:
 *   id, title, emoji, category, desc
 *   words: [{ tr: "Turkish", en: "English", distractors?: [..up to 3] }]
 *
 * distractors are OPTIONAL. If empty, the host auto-fills 3 wrong answers
 * from other words' English meanings in the same topic at play time, so a
 * topic only ever needs { tr, en } pairs to be fully playable.
 *
 * All of this is editable at runtime; this file is the first-run seed.
 */
(function () {
  "use strict";

  // helper: tr=Turkish, en=English, optional d1..d3 distractors
  function w(tr, en, d1, d2, d3) {
    const o = { tr: tr, en: en };
    const ds = [d1, d2, d3].filter(function (x) { return x !== undefined && x !== null && x !== ""; });
    if (ds.length) o.distractors = ds;
    return o;
  }

  const TOPICS = [
  {
    "id": "core-greetings",
    "title": "Greetings",
    "emoji": "👋",
    "category": "Daily Life",
    "desc": "Say hello, goodbye and be polite.",
    "words": [
      {
        "tr": "merhaba",
        "en": "hello",
        "distractors": [
          "goodbye",
          "thank you",
          "please"
        ]
      },
      {
        "tr": "selam",
        "en": "hi",
        "distractors": [
          "bye",
          "welcome",
          "sorry"
        ]
      },
      {
        "tr": "güle güle",
        "en": "goodbye",
        "distractors": [
          "hello",
          "welcome",
          "thanks"
        ]
      },
      {
        "tr": "teşekkürler",
        "en": "thank you",
        "distractors": [
          "please",
          "sorry",
          "hello"
        ]
      },
      {
        "tr": "lütfen",
        "en": "please",
        "distractors": [
          "thank you",
          "sorry",
          "yes"
        ]
      },
      {
        "tr": "özür dilerim",
        "en": "sorry",
        "distractors": [
          "thanks",
          "welcome",
          "please"
        ]
      },
      {
        "tr": "hoş geldin",
        "en": "welcome",
        "distractors": [
          "goodbye",
          "hello",
          "thanks"
        ]
      },
      {
        "tr": "nasılsın?",
        "en": "how are you?",
        "distractors": [
          "who are you?",
          "where are you?",
          "what is this?"
        ]
      },
      {
        "tr": "iyiyim",
        "en": "I am fine",
        "distractors": [
          "I am hungry",
          "I am tired",
          "I am happy"
        ]
      },
      {
        "tr": "günaydın",
        "en": "good morning",
        "distractors": [
          "good night",
          "good evening",
          "goodbye"
        ]
      }
    ]
  },
  {
    "id": "food-drink",
    "title": "Food & Drink",
    "emoji": "🍎",
    "category": "Daily Life",
    "desc": "Foods, drinks and meals.",
    "words": [
      {
        "tr": "su",
        "en": "water",
        "distractors": [
          "fire",
          "milk",
          "tea"
        ]
      },
      {
        "tr": "ekmek",
        "en": "bread",
        "distractors": [
          "cheese",
          "meat",
          "rice"
        ]
      },
      {
        "tr": "peynir",
        "en": "cheese",
        "distractors": [
          "bread",
          "milk",
          "egg"
        ]
      },
      {
        "tr": "süt",
        "en": "milk",
        "distractors": [
          "water",
          "juice",
          "coffee"
        ]
      },
      {
        "tr": "yumurta",
        "en": "egg",
        "distractors": [
          "milk",
          "cheese",
          "meat"
        ]
      },
      {
        "tr": "et",
        "en": "meat",
        "distractors": [
          "fish",
          "bread",
          "rice"
        ]
      },
      {
        "tr": "balık",
        "en": "fish",
        "distractors": [
          "meat",
          "bird",
          "egg"
        ]
      },
      {
        "tr": "pirinç",
        "en": "rice",
        "distractors": [
          "bread",
          "pasta",
          "beans"
        ]
      },
      {
        "tr": "elma",
        "en": "apple",
        "distractors": [
          "banana",
          "orange",
          "grape"
        ]
      },
      {
        "tr": "muz",
        "en": "banana",
        "distractors": [
          "apple",
          "pear",
          "lemon"
        ]
      },
      {
        "tr": "çay",
        "en": "tea",
        "distractors": [
          "coffee",
          "water",
          "juice"
        ]
      },
      {
        "tr": "kahve",
        "en": "coffee",
        "distractors": [
          "tea",
          "milk",
          "water"
        ]
      }
    ]
  },
  {
    "id": "animals",
    "title": "Animals",
    "emoji": "🐱",
    "category": "Nature",
    "desc": "Pets, farm and wild animals.",
    "words": [
      {
        "tr": "kedi",
        "en": "cat",
        "distractors": [
          "dog",
          "bird",
          "fish"
        ]
      },
      {
        "tr": "köpek",
        "en": "dog",
        "distractors": [
          "cat",
          "cow",
          "horse"
        ]
      },
      {
        "tr": "kuş",
        "en": "bird",
        "distractors": [
          "fish",
          "cat",
          "rat"
        ]
      },
      {
        "tr": "balık",
        "en": "fish",
        "distractors": [
          "bird",
          "dog",
          "snake"
        ]
      },
      {
        "tr": "at",
        "en": "horse",
        "distractors": [
          "cow",
          "sheep",
          "dog"
        ]
      },
      {
        "tr": "inek",
        "en": "cow",
        "distractors": [
          "horse",
          "pig",
          "goat"
        ]
      },
      {
        "tr": "koyun",
        "en": "sheep",
        "distractors": [
          "goat",
          "cow",
          "horse"
        ]
      },
      {
        "tr": "aslan",
        "en": "lion",
        "distractors": [
          "tiger",
          "bear",
          "wolf"
        ]
      },
      {
        "tr": "fil",
        "en": "elephant",
        "distractors": [
          "giraffe",
          "monkey",
          "tiger"
        ]
      },
      {
        "tr": "ayı",
        "en": "bear",
        "distractors": [
          "lion",
          "wolf",
          "fox"
        ]
      }
    ]
  },
  {
    "id": "colors",
    "title": "Colors",
    "emoji": "🎨",
    "category": "Basics",
    "desc": "Name the colors.",
    "words": [
      {
        "tr": "kırmızı",
        "en": "red",
        "distractors": [
          "blue",
          "green",
          "black"
        ]
      },
      {
        "tr": "mavi",
        "en": "blue",
        "distractors": [
          "red",
          "yellow",
          "white"
        ]
      },
      {
        "tr": "yeşil",
        "en": "green",
        "distractors": [
          "red",
          "blue",
          "brown"
        ]
      },
      {
        "tr": "sarı",
        "en": "yellow",
        "distractors": [
          "blue",
          "green",
          "pink"
        ]
      },
      {
        "tr": "siyah",
        "en": "black",
        "distractors": [
          "white",
          "grey",
          "red"
        ]
      },
      {
        "tr": "beyaz",
        "en": "white",
        "distractors": [
          "black",
          "grey",
          "blue"
        ]
      },
      {
        "tr": "pembe",
        "en": "pink",
        "distractors": [
          "red",
          "purple",
          "orange"
        ]
      },
      {
        "tr": "mor",
        "en": "purple",
        "distractors": [
          "pink",
          "blue",
          "brown"
        ]
      },
      {
        "tr": "kahverengi",
        "en": "brown",
        "distractors": [
          "black",
          "green",
          "grey"
        ]
      },
      {
        "tr": "turuncu",
        "en": "orange",
        "distractors": [
          "yellow",
          "red",
          "pink"
        ]
      }
    ]
  },
  {
    "id": "numbers",
    "title": "Numbers 1-20",
    "emoji": "🔢",
    "category": "Basics",
    "desc": "Count in Turkish.",
    "words": [
      {
        "tr": "bir",
        "en": "one",
        "distractors": [
          "two",
          "three",
          "four"
        ]
      },
      {
        "tr": "iki",
        "en": "two",
        "distractors": [
          "one",
          "three",
          "five"
        ]
      },
      {
        "tr": "üç",
        "en": "three",
        "distractors": [
          "one",
          "two",
          "six"
        ]
      },
      {
        "tr": "dört",
        "en": "four",
        "distractors": [
          "one",
          "three",
          "seven"
        ]
      },
      {
        "tr": "beş",
        "en": "five",
        "distractors": [
          "four",
          "six",
          "two"
        ]
      },
      {
        "tr": "altı",
        "en": "six",
        "distractors": [
          "five",
          "seven",
          "nine"
        ]
      },
      {
        "tr": "yedi",
        "en": "seven",
        "distractors": [
          "six",
          "eight",
          "ten"
        ]
      },
      {
        "tr": "sekiz",
        "en": "eight",
        "distractors": [
          "seven",
          "nine",
          "two"
        ]
      },
      {
        "tr": "dokuz",
        "en": "nine",
        "distractors": [
          "eight",
          "ten",
          "six"
        ]
      },
      {
        "tr": "on",
        "en": "ten",
        "distractors": [
          "nine",
          "eleven",
          "five"
        ]
      },
      {
        "tr": "on bir",
        "en": "eleven",
        "distractors": [
          "ten",
          "twelve",
          "nine"
        ]
      },
      {
        "tr": "yirmi",
        "en": "twenty",
        "distractors": [
          "ten",
          "thirty",
          "fifteen"
        ]
      }
    ]
  },
  {
    "id": "family",
    "title": "Family",
    "emoji": "👨‍👩‍👧",
    "category": "Daily Life",
    "desc": "Family members.",
    "words": [
      {
        "tr": "anne",
        "en": "mother",
        "distractors": [
          "father",
          "sister",
          "aunt"
        ]
      },
      {
        "tr": "baba",
        "en": "father",
        "distractors": [
          "mother",
          "brother",
          "uncle"
        ]
      },
      {
        "tr": "kardeş",
        "en": "sibling",
        "distractors": [
          "cousin",
          "friend",
          "parent"
        ]
      },
      {
        "tr": "abla",
        "en": "older sister",
        "distractors": [
          "younger sister",
          "mother",
          "aunt"
        ]
      },
      {
        "tr": "erkek kardeş",
        "en": "brother",
        "distractors": [
          "sister",
          "cousin",
          "uncle"
        ]
      },
      {
        "tr": "büyük anne",
        "en": "grandmother",
        "distractors": [
          "grandfather",
          "mother",
          "aunt"
        ]
      },
      {
        "tr": "büyük baba",
        "en": "grandfather",
        "distractors": [
          "grandmother",
          "father",
          "uncle"
        ]
      },
      {
        "tr": "teyze",
        "en": "aunt",
        "distractors": [
          "uncle",
          "mother",
          "sister"
        ]
      },
      {
        "tr": "amca",
        "en": "uncle",
        "distractors": [
          "aunt",
          "father",
          "brother"
        ]
      },
      {
        "tr": "çocuk",
        "en": "child",
        "distractors": [
          "adult",
          "baby",
          "parent"
        ]
      }
    ]
  },
  {
    "id": "school",
    "title": "School",
    "emoji": "🏫",
    "category": "School",
    "desc": "Classroom words.",
    "words": [
      {
        "tr": "okul",
        "en": "school",
        "distractors": [
          "house",
          "shop",
          "park"
        ]
      },
      {
        "tr": "öğretmen",
        "en": "teacher",
        "distractors": [
          "student",
          "friend",
          "parent"
        ]
      },
      {
        "tr": "öğrenci",
        "en": "student",
        "distractors": [
          "teacher",
          "child",
          "friend"
        ]
      },
      {
        "tr": "kitap",
        "en": "book",
        "distractors": [
          "pen",
          "desk",
          "door"
        ]
      },
      {
        "tr": "kalem",
        "en": "pen",
        "distractors": [
          "pencil",
          "book",
          "bag"
        ]
      },
      {
        "tr": "defter",
        "en": "notebook",
        "distractors": [
          "book",
          "pen",
          "bag"
        ]
      },
      {
        "tr": "silgi",
        "en": "eraser",
        "distractors": [
          "pen",
          "ruler",
          "bag"
        ]
      },
      {
        "tr": "masa",
        "en": "table",
        "distractors": [
          "chair",
          "desk",
          "bed"
        ]
      },
      {
        "tr": "sandalye",
        "en": "chair",
        "distractors": [
          "table",
          "desk",
          "sofa"
        ]
      },
      {
        "tr": "çanta",
        "en": "bag",
        "distractors": [
          "book",
          "desk",
          "box"
        ]
      }
    ]
  },
  {
    "id": "weather",
    "title": "Weather",
    "emoji": "🌤️",
    "category": "Nature",
    "desc": "Talk about the weather.",
    "words": [
      {
        "tr": "güneş",
        "en": "sun",
        "distractors": [
          "moon",
          "star",
          "sky"
        ]
      },
      {
        "tr": "yağmur",
        "en": "rain",
        "distractors": [
          "snow",
          "wind",
          "cloud"
        ]
      },
      {
        "tr": "kar",
        "en": "snow",
        "distractors": [
          "rain",
          "wind",
          "ice"
        ]
      },
      {
        "tr": "rüzgar",
        "en": "wind",
        "distractors": [
          "rain",
          "sun",
          "storm"
        ]
      },
      {
        "tr": "bulut",
        "en": "cloud",
        "distractors": [
          "sun",
          "rain",
          "star"
        ]
      },
      {
        "tr": "gökkuşağı",
        "en": "rainbow",
        "distractors": [
          "cloud",
          "storm",
          "moon"
        ]
      },
      {
        "tr": "sis",
        "en": "fog",
        "distractors": [
          "rain",
          "snow",
          "wind"
        ]
      },
      {
        "tr": "fırtına",
        "en": "storm",
        "distractors": [
          "wind",
          "rain",
          "snow"
        ]
      },
      {
        "tr": "sıcak",
        "en": "hot",
        "distractors": [
          "cold",
          "warm",
          "wet"
        ]
      },
      {
        "tr": "soğuk",
        "en": "cold",
        "distractors": [
          "hot",
          "warm",
          "dry"
        ]
      }
    ]
  },
  {
    "id": "body",
    "title": "Body Parts",
    "emoji": "🧍",
    "category": "Basics",
    "desc": "Parts of the body.",
    "words": [
      {
        "tr": "baş",
        "en": "head",
        "distractors": [
          "hand",
          "foot",
          "face"
        ]
      },
      {
        "tr": "göz",
        "en": "eye",
        "distractors": [
          "ear",
          "nose",
          "mouth"
        ]
      },
      {
        "tr": "kulak",
        "en": "ear",
        "distractors": [
          "eye",
          "nose",
          "hair"
        ]
      },
      {
        "tr": "burun",
        "en": "nose",
        "distractors": [
          "ear",
          "mouth",
          "chin"
        ]
      },
      {
        "tr": "ağız",
        "en": "mouth",
        "distractors": [
          "nose",
          "eye",
          "tooth"
        ]
      },
      {
        "tr": "el",
        "en": "hand",
        "distractors": [
          "foot",
          "arm",
          "leg"
        ]
      },
      {
        "tr": "ayak",
        "en": "foot",
        "distractors": [
          "hand",
          "leg",
          "arm"
        ]
      },
      {
        "tr": "kol",
        "en": "arm",
        "distractors": [
          "leg",
          "hand",
          "foot"
        ]
      },
      {
        "tr": "diş",
        "en": "tooth",
        "distractors": [
          "tongue",
          "hair",
          "nail"
        ]
      },
      {
        "tr": "saç",
        "en": "hair",
        "distractors": [
          "beard",
          "face",
          "head"
        ]
      }
    ]
  },
  {
    "id": "home",
    "title": "Home",
    "emoji": "🏠",
    "category": "Daily Life",
    "desc": "Rooms and furniture.",
    "words": [
      {
        "tr": "ev",
        "en": "house",
        "distractors": [
          "school",
          "shop",
          "park"
        ]
      },
      {
        "tr": "oda",
        "en": "room",
        "distractors": [
          "door",
          "wall",
          "roof"
        ]
      },
      {
        "tr": "kapı",
        "en": "door",
        "distractors": [
          "window",
          "wall",
          "floor"
        ]
      },
      {
        "tr": "pencere",
        "en": "window",
        "distractors": [
          "door",
          "wall",
          "roof"
        ]
      },
      {
        "tr": "mutfak",
        "en": "kitchen",
        "distractors": [
          "bathroom",
          "bedroom",
          "garden"
        ]
      },
      {
        "tr": "yatak",
        "en": "bed",
        "distractors": [
          "chair",
          "sofa",
          "table"
        ]
      },
      {
        "tr": "sandalye",
        "en": "chair",
        "distractors": [
          "bed",
          "sofa",
          "desk"
        ]
      },
      {
        "tr": "kanepe",
        "en": "sofa",
        "distractors": [
          "bed",
          "chair",
          "table"
        ]
      },
      {
        "tr": "bahçe",
        "en": "garden",
        "distractors": [
          "kitchen",
          "roof",
          "garage"
        ]
      },
      {
        "tr": "garaj",
        "en": "garage",
        "distractors": [
          "garden",
          "kitchen",
          "hall"
        ]
      }
    ]
  },
  {
    "id": "clothes",
    "title": "Clothes",
    "emoji": "👕",
    "category": "Daily Life",
    "desc": "What we wear.",
    "words": [
      {
        "tr": "gömlek",
        "en": "shirt",
        "distractors": [
          "trousers",
          "shoe",
          "hat"
        ]
      },
      {
        "tr": "pantolon",
        "en": "trousers",
        "distractors": [
          "shirt",
          "sock",
          "coat"
        ]
      },
      {
        "tr": "ayakkabı",
        "en": "shoe",
        "distractors": [
          "sock",
          "hat",
          "glove"
        ]
      },
      {
        "tr": "çorap",
        "en": "sock",
        "distractors": [
          "shoe",
          "shirt",
          "boot"
        ]
      },
      {
        "tr": "şapka",
        "en": "hat",
        "distractors": [
          "cap",
          "shoe",
          "scarf"
        ]
      },
      {
        "tr": "mont",
        "en": "coat",
        "distractors": [
          "shirt",
          "jacket",
          "sweater"
        ]
      },
      {
        "tr": "eldiven",
        "en": "glove",
        "distractors": [
          "sock",
          "hat",
          "scarf"
        ]
      },
      {
        "tr": "atkı",
        "en": "scarf",
        "distractors": [
          "glove",
          "hat",
          "coat"
        ]
      },
      {
        "tr": "ayakkabı bağı",
        "en": "shoelace",
        "distractors": [
          "belt",
          "button",
          "zip"
        ]
      },
      {
        "tr": "kemer",
        "en": "belt",
        "distractors": [
          "scarf",
          "button",
          "lace"
        ]
      }
    ]
  },
  {
    "id": "transport",
    "title": "Transport",
    "emoji": "🚗",
    "category": "Daily Life",
    "desc": "Ways to travel.",
    "words": [
      {
        "tr": "araba",
        "en": "car",
        "distractors": [
          "bus",
          "train",
          "plane"
        ]
      },
      {
        "tr": "otobüs",
        "en": "bus",
        "distractors": [
          "car",
          "tram",
          "bike"
        ]
      },
      {
        "tr": "tren",
        "en": "train",
        "distractors": [
          "bus",
          "car",
          "ship"
        ]
      },
      {
        "tr": "uçak",
        "en": "plane",
        "distractors": [
          "ship",
          "car",
          "helicopter"
        ]
      },
      {
        "tr": "gemi",
        "en": "ship",
        "distractors": [
          "boat",
          "plane",
          "submarine"
        ]
      },
      {
        "tr": "bisiklet",
        "en": "bicycle",
        "distractors": [
          "motorbike",
          "car",
          "bus"
        ]
      },
      {
        "tr": "motorsiklet",
        "en": "motorbike",
        "distractors": [
          "bicycle",
          "car",
          "bus"
        ]
      },
      {
        "tr": "tramvay",
        "en": "tram",
        "distractors": [
          "bus",
          "train",
          "taxi"
        ]
      },
      {
        "tr": "taksi",
        "en": "taxi",
        "distractors": [
          "bus",
          "tram",
          "car"
        ]
      },
      {
        "tr": "metro",
        "en": "metro",
        "distractors": [
          "bus",
          "tram",
          "train"
        ]
      }
    ]
  },
  {
    "id": "sports",
    "title": "Sports",
    "emoji": "⚽",
    "category": "School",
    "desc": "Sports and games.",
    "words": [
      {
        "tr": "futbol",
        "en": "football",
        "distractors": [
          "basketball",
          "tennis",
          "rugby"
        ]
      },
      {
        "tr": "basketbol",
        "en": "basketball",
        "distractors": [
          "football",
          "volleyball",
          "hockey"
        ]
      },
      {
        "tr": "tenis",
        "en": "tennis",
        "distractors": [
          "golf",
          "baseball",
          "cricket"
        ]
      },
      {
        "tr": "yüzme",
        "en": "swimming",
        "distractors": [
          "running",
          "cycling",
          "skiing"
        ]
      },
      {
        "tr": "koşu",
        "en": "running",
        "distractors": [
          "swimming",
          "walking",
          "jumping"
        ]
      },
      {
        "tr": "bisiklet",
        "en": "cycling",
        "distractors": [
          "running",
          "swimming",
          "boxing"
        ]
      },
      {
        "tr": "boks",
        "en": "boxing",
        "distractors": [
          "judo",
          "wrestling",
          "fencing"
        ]
      },
      {
        "tr": "golf",
        "en": "golf",
        "distractors": [
          "tennis",
          "baseball",
          "cricket"
        ]
      },
      {
        "tr": "voleybol",
        "en": "volleyball",
        "distractors": [
          "basketball",
          "tennis",
          "rugby"
        ]
      },
      {
        "tr": "satranç",
        "en": "chess",
        "distractors": [
          "cards",
          "draughts",
          "dice"
        ]
      }
    ]
  },
  {
    "id": "time",
    "title": "Time & Days",
    "emoji": "🕐",
    "category": "Basics",
    "desc": "Days, months and time words.",
    "words": [
      {
        "tr": "pazartesi",
        "en": "Monday",
        "distractors": [
          "Tuesday",
          "Sunday",
          "Friday"
        ]
      },
      {
        "tr": "salı",
        "en": "Tuesday",
        "distractors": [
          "Monday",
          "Wednesday",
          "Thursday"
        ]
      },
      {
        "tr": "çarşamba",
        "en": "Wednesday",
        "distractors": [
          "Tuesday",
          "Thursday",
          "Monday"
        ]
      },
      {
        "tr": "perşembe",
        "en": "Thursday",
        "distractors": [
          "Wednesday",
          "Friday",
          "Tuesday"
        ]
      },
      {
        "tr": "cuma",
        "en": "Friday",
        "distractors": [
          "Thursday",
          "Saturday",
          "Wednesday"
        ]
      },
      {
        "tr": "cumartesi",
        "en": "Saturday",
        "distractors": [
          "Friday",
          "Sunday",
          "Monday"
        ]
      },
      {
        "tr": "pazar",
        "en": "Sunday",
        "distractors": [
          "Saturday",
          "Monday",
          "Friday"
        ]
      },
      {
        "tr": "sabah",
        "en": "morning",
        "distractors": [
          "afternoon",
          "evening",
          "night"
        ]
      },
      {
        "tr": "öğle",
        "en": "noon",
        "distractors": [
          "morning",
          "night",
          "evening"
        ]
      },
      {
        "tr": "akşam",
        "en": "evening",
        "distractors": [
          "morning",
          "afternoon",
          "night"
        ]
      },
      {
        "tr": "gece",
        "en": "night",
        "distractors": [
          "day",
          "evening",
          "noon"
        ]
      },
      {
        "tr": "yıl",
        "en": "year",
        "distractors": [
          "month",
          "week",
          "day"
        ]
      }
    ]
  },
  {
    "id": "nature",
    "title": "Nature",
    "emoji": "🌳",
    "category": "Nature",
    "desc": "Plants, places and the world.",
    "words": [
      {
        "tr": "ağaç",
        "en": "tree",
        "distractors": [
          "flower",
          "grass",
          "leaf"
        ]
      },
      {
        "tr": "çiçek",
        "en": "flower",
        "distractors": [
          "tree",
          "grass",
          "fruit"
        ]
      },
      {
        "tr": "çimen",
        "en": "grass",
        "distractors": [
          "tree",
          "leaf",
          "stone"
        ]
      },
      {
        "tr": "dağ",
        "en": "mountain",
        "distractors": [
          "hill",
          "valley",
          "river"
        ]
      },
      {
        "tr": "tepe",
        "en": "hill",
        "distractors": [
          "mountain",
          "valley",
          "lake"
        ]
      },
      {
        "tr": "nehir",
        "en": "river",
        "distractors": [
          "lake",
          "sea",
          "ocean"
        ]
      },
      {
        "tr": "göl",
        "en": "lake",
        "distractors": [
          "river",
          "sea",
          "pond"
        ]
      },
      {
        "tr": "deniz",
        "en": "sea",
        "distractors": [
          "lake",
          "river",
          "ocean"
        ]
      },
      {
        "tr": "orman",
        "en": "forest",
        "distractors": [
          "field",
          "desert",
          "island"
        ]
      },
      {
        "tr": "ada",
        "en": "island",
        "distractors": [
          "mountain",
          "desert",
          "continent"
        ]
      }
    ]
  },
  {
    "id": "verbs",
    "title": "Action Verbs",
    "emoji": "🏃",
    "category": "School",
    "desc": "Everyday verbs.",
    "words": [
      {
        "tr": "yemek",
        "en": "to eat",
        "distractors": [
          "to drink",
          "to cook",
          "to sleep"
        ]
      },
      {
        "tr": "içmek",
        "en": "to drink",
        "distractors": [
          "to eat",
          "to cook",
          "to read"
        ]
      },
      {
        "tr": "uyumak",
        "en": "to sleep",
        "distractors": [
          "to wake",
          "to sit",
          "to stand"
        ]
      },
      {
        "tr": "okumak",
        "en": "to read",
        "distractors": [
          "to write",
          "to draw",
          "to sing"
        ]
      },
      {
        "tr": "yazmak",
        "en": "to write",
        "distractors": [
          "to read",
          "to draw",
          "to type"
        ]
      },
      {
        "tr": "gitmek",
        "en": "to go",
        "distractors": [
          "to come",
          "to walk",
          "to run"
        ]
      },
      {
        "tr": "gelmek",
        "en": "to come",
        "distractors": [
          "to go",
          "to leave",
          "to arrive"
        ]
      },
      {
        "tr": "görmek",
        "en": "to see",
        "distractors": [
          "to hear",
          "to look",
          "to watch"
        ]
      },
      {
        "tr": "duymak",
        "en": "to hear",
        "distractors": [
          "to see",
          "to listen",
          "to speak"
        ]
      },
      {
        "tr": "konuşmak",
        "en": "to speak",
        "distractors": [
          "to hear",
          "to listen",
          "to sing"
        ]
      }
    ]
  },
  {
    "id": "travel",
    "title": "Travel & Places",
    "emoji": "✈️",
    "category": "Daily Life",
    "desc": "Getting around town.",
    "words": [
      {
        "tr": "havalimanı",
        "en": "airport",
        "distractors": [
          "station",
          "harbour",
          "hotel"
        ]
      },
      {
        "tr": "istasyon",
        "en": "station",
        "distractors": [
          "airport",
          "stop",
          "hotel"
        ]
      },
      {
        "tr": "otel",
        "en": "hotel",
        "distractors": [
          "house",
          "hostel",
          "camp"
        ]
      },
      {
        "tr": "restoran",
        "en": "restaurant",
        "distractors": [
          "cafe",
          "shop",
          "market"
        ]
      },
      {
        "tr": "kafe",
        "en": "cafe",
        "distractors": [
          "restaurant",
          "bar",
          "shop"
        ]
      },
      {
        "tr": "market",
        "en": "market",
        "distractors": [
          "shop",
          "mall",
          "store"
        ]
      },
      {
        "tr": "mağaza",
        "en": "shop",
        "distractors": [
          "market",
          "store",
          "mall"
        ]
      },
      {
        "tr": "müze",
        "en": "museum",
        "distractors": [
          "cinema",
          "theatre",
          "library"
        ]
      },
      {
        "tr": "sinema",
        "en": "cinema",
        "distractors": [
          "theatre",
          "museum",
          "park"
        ]
      },
      {
        "tr": "park",
        "en": "park",
        "distractors": [
          "garden",
          "zoo",
          "square"
        ]
      }
    ]
  },
  {
    "id": "emotions",
    "title": "Feelings",
    "emoji": "😊",
    "category": "Basics",
    "desc": "How do you feel?",
    "words": [
      {
        "tr": "mutlu",
        "en": "happy",
        "distractors": [
          "sad",
          "angry",
          "tired"
        ]
      },
      {
        "tr": "üzgün",
        "en": "sad",
        "distractors": [
          "happy",
          "bored",
          "calm"
        ]
      },
      {
        "tr": "kızgın",
        "en": "angry",
        "distractors": [
          "happy",
          "calm",
          "scared"
        ]
      },
      {
        "tr": "yorgun",
        "en": "tired",
        "distractors": [
          "awake",
          "sleepy",
          "hungry"
        ]
      },
      {
        "tr": "aç",
        "en": "hungry",
        "distractors": [
          "thirsty",
          "full",
          "tired"
        ]
      },
      {
        "tr": "susamış",
        "en": "thirsty",
        "distractors": [
          "hungry",
          "full",
          "tired"
        ]
      },
      {
        "tr": "korkmuş",
        "en": "scared",
        "distractors": [
          "brave",
          "calm",
          "angry"
        ]
      },
      {
        "tr": "heyecanlı",
        "en": "excited",
        "distractors": [
          "calm",
          "bored",
          "tired"
        ]
      },
      {
        "tr": "sıkılmış",
        "en": "bored",
        "distractors": [
          "happy",
          "excited",
          "calm"
        ]
      },
      {
        "tr": "şaşkın",
        "en": "surprised",
        "distractors": [
          "calm",
          "angry",
          "sad"
        ]
      }
    ]
  },
  {
    "id": "space",
    "title": "Space",
    "emoji": "🚀",
    "category": "Nature",
    "desc": "The sky and beyond.",
    "words": [
      {
        "tr": "yıldız",
        "en": "star",
        "distractors": [
          "moon",
          "sun",
          "planet"
        ]
      },
      {
        "tr": "ay",
        "en": "moon",
        "distractors": [
          "sun",
          "star",
          "comet"
        ]
      },
      {
        "tr": "gezegen",
        "en": "planet",
        "distractors": [
          "star",
          "moon",
          "comet"
        ]
      },
      {
        "tr": "gökada",
        "en": "galaxy",
        "distractors": [
          "star",
          "comet",
          "universe"
        ]
      },
      {
        "tr": "kuyruklu yıldız",
        "en": "comet",
        "distractors": [
          "star",
          "planet",
          "meteor"
        ]
      },
      {
        "tr": "göktaşı",
        "en": "meteor",
        "distractors": [
          "comet",
          "star",
          "moon"
        ]
      },
      {
        "tr": "uzay",
        "en": "space",
        "distractors": [
          "sky",
          "atmosphere",
          "orbit"
        ]
      },
      {
        "tr": "roket",
        "en": "rocket",
        "distractors": [
          "plane",
          "satellite",
          "star"
        ]
      },
      {
        "tr": "uydu",
        "en": "satellite",
        "distractors": [
          "rocket",
          "planet",
          "moon"
        ]
      },
      {
        "tr": "evren",
        "en": "universe",
        "distractors": [
          "galaxy",
          "planet",
          "space"
        ]
      }
    ]
  },
  {
    "id": "jobs",
    "title": "Jobs",
    "emoji": "👷",
    "category": "School",
    "desc": "People and their work.",
    "words": [
      {
        "tr": "öğretmen",
        "en": "teacher",
        "distractors": [
          "student",
          "doctor",
          "driver"
        ]
      },
      {
        "tr": "doktor",
        "en": "doctor",
        "distractors": [
          "nurse",
          "patient",
          "teacher"
        ]
      },
      {
        "tr": "hemşire",
        "en": "nurse",
        "distractors": [
          "doctor",
          "patient",
          "cook"
        ]
      },
      {
        "tr": "polis",
        "en": "police",
        "distractors": [
          "soldier",
          "firefighter",
          "guard"
        ]
      },
      {
        "tr": "itfaiyeci",
        "en": "firefighter",
        "distractors": [
          "police",
          "soldier",
          "cook"
        ]
      },
      {
        "tr": "aşçı",
        "en": "cook",
        "distractors": [
          "waiter",
          "farmer",
          "baker"
        ]
      },
      {
        "tr": "çiftçi",
        "en": "farmer",
        "distractors": [
          "cook",
          "driver",
          "gardener"
        ]
      },
      {
        "tr": "şoför",
        "en": "driver",
        "distractors": [
          "pilot",
          "cook",
          "sailor"
        ]
      },
      {
        "tr": "pilot",
        "en": "pilot",
        "distractors": [
          "driver",
          "sailor",
          "engineer"
        ]
      },
      {
        "tr": "mühendis",
        "en": "engineer",
        "distractors": [
          "pilot",
          "builder",
          "artist"
        ]
      }
    ]
  },
  {
    "id": "src-adventures",
    "title": "Adventures",
    "emoji": "🌿",
    "category": "Nature",
    "desc": "Adventures — imported from topicsource/adventures.txt.",
    "words": [
      {
        "tr": "kesinlikle",
        "en": "absolutely"
      },
      {
        "tr": "teklifi kabul etmek",
        "en": "accept offer"
      },
      {
        "tr": "bağımlı",
        "en": "addict"
      },
      {
        "tr": "macera",
        "en": "adventure"
      },
      {
        "tr": "-den korkmak",
        "en": "afraid of"
      },
      {
        "tr": "katılmak",
        "en": "agree"
      },
      {
        "tr": "hava sporları",
        "en": "air sports"
      },
      {
        "tr": "harika",
        "en": "amazing"
      },
      {
        "tr": "eğlenmiş",
        "en": "amused"
      },
      {
        "tr": "eğlenceli",
        "en": "amusing"
      },
      {
        "tr": "çıplak ayakla yürüme",
        "en": "barefoot walking"
      },
      {
        "tr": "sıkıcı",
        "en": "boring"
      },
      {
        "tr": "inşaat yapmak",
        "en": "build construction"
      },
      {
        "tr": "yüksekten esnek bir iple atlama",
        "en": "bungee jumping"
      },
      {
        "tr": "hiç sevmemek, katlanamamak",
        "en": "can’t stand"
      },
      {
        "tr": "kano sporu",
        "en": "canoeing"
      },
      {
        "tr": "mağara",
        "en": "cave"
      },
      {
        "tr": "mağaracılık",
        "en": "caving"
      },
      {
        "tr": "zorlayıcı",
        "en": "challenging"
      },
      {
        "tr": "tırmanmak",
        "en": "climb"
      },
      {
        "tr": "çılgın",
        "en": "crazy"
      },
      {
        "tr": "bisiklet sürme",
        "en": "cycling"
      },
      {
        "tr": "tehlikeli",
        "en": "dangerous"
      },
      {
        "tr": "tanımlamak",
        "en": "describe"
      },
      {
        "tr": "deneyimi tanımlamak",
        "en": "describe experience"
      },
      {
        "tr": "çöl",
        "en": "desert"
      },
      {
        "tr": "cihaz",
        "en": "device"
      },
      {
        "tr": "katılmamak",
        "en": "disagree"
      },
      {
        "tr": "hayal kırıklığına uğratan",
        "en": "disappointing"
      },
      {
        "tr": "dalış kıyafeti",
        "en": "diving suit"
      },
      {
        "tr": "keyifli",
        "en": "enjoyable"
      },
      {
        "tr": "eğlendirmek",
        "en": "entertain"
      },
      {
        "tr": "eğlenceli",
        "en": "entertaining"
      },
      {
        "tr": "ekipman",
        "en": "equipment"
      },
      {
        "tr": "heyecan",
        "en": "excitement"
      },
      {
        "tr": "heyecan verici",
        "en": "exciting"
      },
      {
        "tr": "deneyim",
        "en": "experience"
      },
      {
        "tr": "keşfetmek",
        "en": "explore"
      },
      {
        "tr": "su altını keşfetmek",
        "en": "explore underwater"
      },
      {
        "tr": "uç/tehlikeli sporlar",
        "en": "extreme sports"
      },
      {
        "tr": "düşmek",
        "en": "fall down"
      },
      {
        "tr": "ünlü",
        "en": "famous"
      },
      {
        "tr": "ünlü yerler",
        "en": "famous places"
      },
      {
        "tr": "büyüleyici",
        "en": "fascinating"
      },
      {
        "tr": "rüzgarı hissetmek",
        "en": "feel the wind"
      },
      {
        "tr": "dalgalarla mücadele etmek",
        "en": "fight with waves"
      },
      {
        "tr": "havada süzülmek",
        "en": "float in the air"
      },
      {
        "tr": "düşkün olmak",
        "en": "fond of"
      },
      {
        "tr": "keşif gezisine çıkmak",
        "en": "get on expedition"
      },
      {
        "tr": "koruyucu gözlükler",
        "en": "googles"
      },
      {
        "tr": "tahmin etmek",
        "en": "guess"
      },
      {
        "tr": "takılmak",
        "en": "hang around"
      },
      {
        "tr": "yamaç paraşütü",
        "en": "hang gliding"
      },
      {
        "tr": "ortak bir şeye sahip olmak",
        "en": "have something in common"
      },
      {
        "tr": "yükseklik",
        "en": "height"
      },
      {
        "tr": "kask",
        "en": "helmet"
      },
      {
        "tr": "yüksek",
        "en": "high"
      },
      {
        "tr": "yüksek yer",
        "en": "high place"
      },
      {
        "tr": "yüksek kule",
        "en": "high tower"
      },
      {
        "tr": "doğa yürüyüşü",
        "en": "hiking"
      },
      {
        "tr": "tarihi alan",
        "en": "historical site"
      },
      {
        "tr": "sıcak hava balonu",
        "en": "hot air balloon"
      },
      {
        "tr": "buz tırmanışı",
        "en": "ice climbing"
      },
      {
        "tr": "etkileyici",
        "en": "impressive"
      },
      {
        "tr": "inanılmaz",
        "en": "incredible"
      },
      {
        "tr": "ilginç",
        "en": "interesting"
      },
      {
        "tr": "içermek",
        "en": "involve"
      },
      {
        "tr": "kano yapma",
        "en": "kayaking"
      },
      {
        "tr": "dizlik",
        "en": "knee pad"
      },
      {
        "tr": "kara sporları",
        "en": "land sports"
      },
      {
        "tr": "daha az",
        "en": "less"
      },
      {
        "tr": "bir değişiklik yapmak",
        "en": "make a change"
      },
      {
        "tr": "anlamına gelmek, kastetmek",
        "en": "mean"
      },
      {
        "tr": "deniz canlılarıyla tanışmak",
        "en": "meet sea creatures"
      },
      {
        "tr": "motor yarışı",
        "en": "motor racing"
      },
      {
        "tr": "doğa",
        "en": "nature"
      },
      {
        "tr": "teklif",
        "en": "offer"
      },
      {
        "tr": "kendi başıma",
        "en": "on my own"
      },
      {
        "tr": "diğer",
        "en": "other"
      },
      {
        "tr": "açık hava aktiviteleri",
        "en": "outdoor activities"
      },
      {
        "tr": "üzerinde",
        "en": "over"
      },
      {
        "tr": "yamaç paraşütü",
        "en": "paragliding"
      },
      {
        "tr": "deniz paraşütü",
        "en": "parasailing"
      },
      {
        "tr": "parkur sporu",
        "en": "parkour"
      },
      {
        "tr": "tercih etmek",
        "en": "prefer"
      },
      {
        "tr": "sınırları zorlamak",
        "en": "push limits"
      },
      {
        "tr": "nadir",
        "en": "rare"
      },
      {
        "tr": "sebep",
        "en": "reason"
      },
      {
        "tr": "şişme bot",
        "en": "robber boat"
      },
      {
        "tr": "kayalık yüzey",
        "en": "rocky surface"
      },
      {
        "tr": "dalgalı su",
        "en": "rough water"
      },
      {
        "tr": "kürek çekmek",
        "en": "row"
      },
      {
        "tr": "yelken sporu",
        "en": "sailing"
      },
      {
        "tr": "kum sörfü",
        "en": "sand kiting"
      },
      {
        "tr": "manzara",
        "en": "scenery"
      },
      {
        "tr": "tüplü dalış",
        "en": "scuba diving"
      },
      {
        "tr": "kaykay",
        "en": "skateboarding"
      },
      {
        "tr": "kayak",
        "en": "skiing"
      },
      {
        "tr": "gökdelen",
        "en": "skyscraper"
      },
      {
        "tr": "şimdiye kadar",
        "en": "so far"
      },
      {
        "tr": "özel solunum ekipmanı",
        "en": "special breathing equipment"
      },
      {
        "tr": "özel parkur",
        "en": "special track"
      },
      {
        "tr": "hız",
        "en": "speed"
      },
      {
        "tr": "vakit geçirmek",
        "en": "spend time"
      },
      {
        "tr": "risk almak",
        "en": "take risk"
      },
      {
        "tr": "en çok",
        "en": "the most"
      },
      {
        "tr": "düşünmek",
        "en": "think"
      },
      {
        "tr": "bağlı",
        "en": "tied"
      },
      {
        "tr": "tepenin zirvesi",
        "en": "top of a hill"
      },
      {
        "tr": "dağın zirvesi",
        "en": "top of a mountain"
      },
      {
        "tr": "seyahat etmek",
        "en": "travel"
      },
      {
        "tr": "doğa yürüyüşü",
        "en": "trekking"
      },
      {
        "tr": "denemek",
        "en": "try"
      },
      {
        "tr": "altında",
        "en": "under"
      },
      {
        "tr": "motorsuz hava aracı",
        "en": "unpowered aircraft"
      },
      {
        "tr": "manzarayı izlemek",
        "en": "watch scenery"
      },
      {
        "tr": "kanatlı elbiseyle uçma",
        "en": "wingsuit skydiving"
      },
      {
        "tr": "kış sporları",
        "en": "winter  sports"
      },
      {
        "tr": "ahşap",
        "en": "wooden"
      },
      {
        "tr": "istemek",
        "en": "would like to"
      },
      {
        "tr": "tercih etmek",
        "en": "would rather"
      },
      {
        "tr": "çelik halatla iniş",
        "en": "ziplining"
      }
    ]
  },
  {
    "id": "src-chores",
    "title": "Chores",
    "emoji": "🏠",
    "category": "Daily Life",
    "desc": "Chores — imported from topicsource/chores.txt.",
    "words": [
      {
        "tr": "yetişkin",
        "en": "adult"
      },
      {
        "tr": "hepsi",
        "en": "all"
      },
      {
        "tr": "rahatsız etmek",
        "en": "annoy"
      },
      {
        "tr": "makale",
        "en": "article"
      },
      {
        "tr": "sormak",
        "en": "ask"
      },
      {
        "tr": "olmak",
        "en": "become"
      },
      {
        "tr": "her ikisi",
        "en": "both"
      },
      {
        "tr": "ile meşgul",
        "en": "busy with"
      },
      {
        "tr": "ev işleri",
        "en": "chores"
      },
      {
        "tr": "sınıf kuralları",
        "en": "classroom rules"
      },
      {
        "tr": "temiz",
        "en": "clean"
      },
      {
        "tr": "temizlemek",
        "en": "clean up"
      },
      {
        "tr": "şikayet etmek",
        "en": "complain"
      },
      {
        "tr": "yemek pişirmek",
        "en": "cook meal"
      },
      {
        "tr": "düzeltmek",
        "en": "correct"
      },
      {
        "tr": "tanımlamak",
        "en": "describe"
      },
      {
        "tr": "zor",
        "en": "difficult"
      },
      {
        "tr": "kirli",
        "en": "dirty"
      },
      {
        "tr": "kirli kıyafetler",
        "en": "dirty clothes"
      },
      {
        "tr": "ev işleri yapmak",
        "en": "do chores"
      },
      {
        "tr": "ayak işleri yapmak",
        "en": "do errands"
      },
      {
        "tr": "ev işleri yapmak",
        "en": "do household chores"
      },
      {
        "tr": "çamaşır yıkamak",
        "en": "do laundry"
      },
      {
        "tr": "alışveriş yapmak",
        "en": "do shopping"
      },
      {
        "tr": "ütü yapmak",
        "en": "do the ironing"
      },
      {
        "tr": "bulaşıkları kurutmak",
        "en": "dry the dishes"
      },
      {
        "tr": "mobilyaları toz almak",
        "en": "dust the furniture"
      },
      {
        "tr": "görev",
        "en": "duty"
      },
      {
        "tr": "birbirleri",
        "en": "each other"
      },
      {
        "tr": "kolay",
        "en": "easy"
      },
      {
        "tr": "yaşlı",
        "en": "elder"
      },
      {
        "tr": "bulaşık makinesini boşaltmak",
        "en": "empty dishwasher"
      },
      {
        "tr": "herkes",
        "en": "everyone"
      },
      {
        "tr": "zorunluluğu ifade etmek",
        "en": "express obligation"
      },
      {
        "tr": "evcil hayvanı beslemek",
        "en": "feed the pet"
      },
      {
        "tr": "hissetmek",
        "en": "feel"
      },
      {
        "tr": "çatal",
        "en": "fork"
      },
      {
        "tr": "endişelenmek",
        "en": "get worried"
      },
      {
        "tr": "vermek",
        "en": "give"
      },
      {
        "tr": "tahmin etmek",
        "en": "guess"
      },
      {
        "tr": "zor",
        "en": "hard"
      },
      {
        "tr": "sorumluluklara sahip olmak",
        "en": "have responsibilities"
      },
      {
        "tr": "güçlü bağlara sahip olmak",
        "en": "have strong ties"
      },
      {
        "tr": "zorunda olmak",
        "en": "have to"
      },
      {
        "tr": "sağlıklı",
        "en": "healthy"
      },
      {
        "tr": "ebeveynlere yardım etmek",
        "en": "help parents"
      },
      {
        "tr": "ev işi",
        "en": "housework"
      },
      {
        "tr": "önemli",
        "en": "important"
      },
      {
        "tr": "sorumlu",
        "en": "in charge of"
      },
      {
        "tr": "kıyafetleri ütülemek",
        "en": "iron clothes"
      },
      {
        "tr": "odayı düzenli tutmak",
        "en": "keep room tidy"
      },
      {
        "tr": "bıçak",
        "en": "knife"
      },
      {
        "tr": "öğrenmek",
        "en": "learn"
      },
      {
        "tr": "ders",
        "en": "lesson"
      },
      {
        "tr": "izin vermek",
        "en": "let"
      },
      {
        "tr": "bulaşık makinesini doldurmak",
        "en": "load dishwasher"
      },
      {
        "tr": "ana fikir",
        "en": "main idea"
      },
      {
        "tr": "hayatı kolaylaştırmak",
        "en": "make life easier"
      },
      {
        "tr": "yatağı toplamak",
        "en": "make the bed"
      },
      {
        "tr": "öğün",
        "en": "meal"
      },
      {
        "tr": "üye",
        "en": "member"
      },
      {
        "tr": "dağınıklık",
        "en": "mess"
      },
      {
        "tr": "önemsemek",
        "en": "mind"
      },
      {
        "tr": "yerleri paspaslamak",
        "en": "mop the floor"
      },
      {
        "tr": "-meli/-malı",
        "en": "must"
      },
      {
        "tr": "gerekli",
        "en": "necessary"
      },
      {
        "tr": "ihtiyaç duymak",
        "en": "need"
      },
      {
        "tr": "kurala uymak",
        "en": "obey rule"
      },
      {
        "tr": "zorunluluk",
        "en": "obligation"
      },
      {
        "tr": "huzurlu",
        "en": "peaceful"
      },
      {
        "tr": "tabak",
        "en": "plate"
      },
      {
        "tr": "harçlık",
        "en": "pocket money"
      },
      {
        "tr": "hazırlamak",
        "en": "prepare"
      },
      {
        "tr": "söz vermek",
        "en": "promise"
      },
      {
        "tr": "masaya tabak koymak",
        "en": "put plates on table"
      },
      {
        "tr": "saygı göstermek",
        "en": "respect"
      },
      {
        "tr": "hakka saygı göstermek",
        "en": "respect right"
      },
      {
        "tr": "saygılı",
        "en": "respectful"
      },
      {
        "tr": "sorumluluk",
        "en": "responsibility"
      },
      {
        "tr": "sorumlu",
        "en": "responsible"
      },
      {
        "tr": "-den sorumlu",
        "en": "responsible for"
      },
      {
        "tr": "hak",
        "en": "right"
      },
      {
        "tr": "kaba",
        "en": "rude"
      },
      {
        "tr": "aynı",
        "en": "same"
      },
      {
        "tr": "söylemek",
        "en": "say"
      },
      {
        "tr": "masayı kurmak",
        "en": "set table"
      },
      {
        "tr": "fikir paylaşmak",
        "en": "share opinion"
      },
      {
        "tr": "sorumlulukları paylaşmak",
        "en": "share responsibilities"
      },
      {
        "tr": "birbirine saygı göstermek",
        "en": "show respect to each other"
      },
      {
        "tr": "bahçeyle ilgilenmek",
        "en": "take care of garden"
      },
      {
        "tr": "çöpü dışarı çıkarmak",
        "en": "take out garbage"
      },
      {
        "tr": "görev",
        "en": "task"
      },
      {
        "tr": "söylemek",
        "en": "tell"
      },
      {
        "tr": "düşünmek",
        "en": "think"
      },
      {
        "tr": "odayı toparlamak",
        "en": "tidy up room"
      },
      {
        "tr": "yapılacaklar listesi",
        "en": "to do list"
      },
      {
        "tr": "halıyı süpürmek",
        "en": "vacuum carpet"
      },
      {
        "tr": "zemini süpürmek",
        "en": "vacuum floor"
      },
      {
        "tr": "köpeği gezdirmek",
        "en": "walk the dog"
      },
      {
        "tr": "yıkamak",
        "en": "wash"
      },
      {
        "tr": "bulaşıkları yıkamak",
        "en": "wash the dishes"
      },
      {
        "tr": "daha çok çalışmak",
        "en": "work harder"
      },
      {
        "tr": "genç",
        "en": "young"
      }
    ]
  },
  {
    "id": "src-friendship",
    "title": "Friendship",
    "emoji": "🏠",
    "category": "Daily Life",
    "desc": "Friendship — imported from topicsource/friendship.txt.",
    "words": [
      {
        "tr": "hakkında",
        "en": "about"
      },
      {
        "tr": "kabul etmek",
        "en": "accept"
      },
      {
        "tr": "ayrıca",
        "en": "also"
      },
      {
        "tr": "rağmen",
        "en": "although"
      },
      {
        "tr": "her zaman acele içinde",
        "en": "always in a hurry"
      },
      {
        "tr": "her zaman yanımda",
        "en": "always there for me"
      },
      {
        "tr": "özür dilemek",
        "en": "apologise"
      },
      {
        "tr": "mümkün olan en kısa sürede, bir an önce",
        "en": "as soon as possible"
      },
      {
        "tr": "sormak",
        "en": "ask"
      },
      {
        "tr": "katılmak",
        "en": "attend"
      },
      {
        "tr": "desteklemek",
        "en": "back up"
      },
      {
        "tr": "olmak",
        "en": "become"
      },
      {
        "tr": "daha iyi",
        "en": "better"
      },
      {
        "tr": "sıkıcı",
        "en": "boring"
      },
      {
        "tr": "her ikisi de",
        "en": "both"
      },
      {
        "tr": "sözünden dönmek",
        "en": "break promise"
      },
      {
        "tr": "dost, kanka",
        "en": "buddy"
      },
      {
        "tr": "meşgul",
        "en": "busy"
      },
      {
        "tr": "aramak",
        "en": "call"
      },
      {
        "tr": "sakin",
        "en": "calm"
      },
      {
        "tr": "önemsemek, ilgilenmek",
        "en": "care"
      },
      {
        "tr": "şefkatli",
        "en": "caring"
      },
      {
        "tr": "seçmek",
        "en": "choose"
      },
      {
        "tr": "yakın arkadaş",
        "en": "close friend"
      },
      {
        "tr": "uğramak",
        "en": "come over"
      },
      {
        "tr": "konser",
        "en": "concert"
      },
      {
        "tr": "güvenmek",
        "en": "count on"
      },
      {
        "tr": "çılgın",
        "en": "crazy"
      },
      {
        "tr": "karar vermek",
        "en": "decide"
      },
      {
        "tr": "tanım",
        "en": "definition"
      },
      {
        "tr": "tanımlamak",
        "en": "describe"
      },
      {
        "tr": "-den farklı",
        "en": "different from"
      },
      {
        "tr": "dürüst olmama",
        "en": "dishonesty"
      },
      {
        "tr": "ister misin",
        "en": "do you want"
      },
      {
        "tr": "birbirini",
        "en": "each other"
      },
      {
        "tr": "bahane",
        "en": "excuse"
      },
      {
        "tr": "deneyimlemek",
        "en": "experience"
      },
      {
        "tr": "adil",
        "en": "fair"
      },
      {
        "tr": "modaya uygun",
        "en": "fashionable"
      },
      {
        "tr": "yalnız hissetmek",
        "en": "feel alone"
      },
      {
        "tr": "arkadaşlık",
        "en": "friendship"
      },
      {
        "tr": "tok, dolu",
        "en": "full"
      },
      {
        "tr": "eğlenceli",
        "en": "fun"
      },
      {
        "tr": "komik",
        "en": "funny"
      },
      {
        "tr": "nesil",
        "en": "generation"
      },
      {
        "tr": "iyi geçinmek",
        "en": "get on well with each other"
      },
      {
        "tr": "tavsiye vermek",
        "en": "give advice"
      },
      {
        "tr": "vermek",
        "en": "give"
      },
      {
        "tr": "tahmin etmek",
        "en": "guess"
      },
      {
        "tr": "misafir",
        "en": "guest"
      },
      {
        "tr": "birçok ortak noktası olmak",
        "en": "have a lot in common"
      },
      {
        "tr": "yapacak bir şeyi olmamak",
        "en": "have nothing to do"
      },
      {
        "tr": "dürüst",
        "en": "honest"
      },
      {
        "tr": "ummak",
        "en": "hope"
      },
      {
        "tr": "ne dersin",
        "en": "how about"
      },
      {
        "tr": "nasıl gidiyor",
        "en": "how is it going"
      },
      {
        "tr": "isterim",
        "en": "I would like to"
      },
      {
        "tr": "çok isterim",
        "en": "I’d love to"
      },
      {
        "tr": "fikir",
        "en": "idea"
      },
      {
        "tr": "önemli",
        "en": "important"
      },
      {
        "tr": "bireysel",
        "en": "individual"
      },
      {
        "tr": "yerine",
        "en": "instead"
      },
      {
        "tr": "ilgilenmek",
        "en": "interested in"
      },
      {
        "tr": "tanıştırmak",
        "en": "introduce"
      },
      {
        "tr": "davet",
        "en": "invitation"
      },
      {
        "tr": "davet etmek",
        "en": "invite"
      },
      {
        "tr": "sözünü tutmak",
        "en": "keep promise"
      },
      {
        "tr": "sır tutmak",
        "en": "keep secret"
      },
      {
        "tr": "rahat",
        "en": "laid back"
      },
      {
        "tr": "öğrenmek",
        "en": "learn"
      },
      {
        "tr": "mektup",
        "en": "letter"
      },
      {
        "tr": "yalan",
        "en": "lie"
      },
      {
        "tr": "gibi",
        "en": "like"
      },
      {
        "tr": "sadık",
        "en": "loyal"
      },
      {
        "tr": "sadakat",
        "en": "loyalty"
      },
      {
        "tr": "maç (eşleştirmek, kibrit)",
        "en": "match"
      },
      {
        "tr": "arkadaş",
        "en": "mate"
      },
      {
        "tr": "anlamına gelmek",
        "en": "mean"
      },
      {
        "tr": "buluşmak",
        "en": "meet"
      },
      {
        "tr": "sinema",
        "en": "movie theatre"
      },
      {
        "tr": "karşılıklı saygı",
        "en": "mutual respect"
      },
      {
        "tr": "karşılıklı",
        "en": "mutual"
      },
      {
        "tr": "gerekmek",
        "en": "need to"
      },
      {
        "tr": "ihtiyaç duymak",
        "en": "need"
      },
      {
        "tr": "komşu",
        "en": "neighbour"
      },
      {
        "tr": "hiç de değil, pek değil",
        "en": "not at all"
      },
      {
        "tr": "meşgul",
        "en": "occupied"
      },
      {
        "tr": "meydana gelmek",
        "en": "occur"
      },
      {
        "tr": "tabii ki",
        "en": "of course"
      },
      {
        "tr": "teklif etmek",
        "en": "offer"
      },
      {
        "tr": "diğerleri",
        "en": "others"
      },
      {
        "tr": "duygu",
        "en": "feeling"
      },
      {
        "tr": "paha biçilmez hazine",
        "en": "priceless treasure"
      },
      {
        "tr": "dışa dönük",
        "en": "outgoing"
      },
      {
        "tr": "sabır",
        "en": "patience"
      },
      {
        "tr": "sabırlı",
        "en": "patient"
      },
      {
        "tr": "kişilik",
        "en": "personality"
      },
      {
        "tr": "tercih etmek",
        "en": "prefer"
      },
      {
        "tr": "atıştırmalık hazırlamak",
        "en": "prepare snack"
      },
      {
        "tr": "paha biçilemez",
        "en": "priceless"
      },
      {
        "tr": "söz vermek",
        "en": "promise"
      },
      {
        "tr": "nadiren",
        "en": "rarely"
      },
      {
        "tr": "sebep",
        "en": "reason"
      },
      {
        "tr": "reddetmek",
        "en": "refuse"
      },
      {
        "tr": "ilişki",
        "en": "relationship"
      },
      {
        "tr": "rahatlamış",
        "en": "relaxed"
      },
      {
        "tr": "güvenilir",
        "en": "reliable"
      },
      {
        "tr": "güvenmek",
        "en": "rely on"
      },
      {
        "tr": "kalmak",
        "en": "remain"
      },
      {
        "tr": "saygı",
        "en": "respect"
      },
      {
        "tr": "saygılı",
        "en": "respectful"
      },
      {
        "tr": "aynı anlam",
        "en": "same meaning"
      },
      {
        "tr": "aynı fikir",
        "en": "same opinion"
      },
      {
        "tr": "aynı",
        "en": "same"
      },
      {
        "tr": "öz disiplinli",
        "en": "self-disciplined"
      },
      {
        "tr": "paylaşmak",
        "en": "share"
      },
      {
        "tr": "ciddi",
        "en": "solemn"
      },
      {
        "tr": "üzgünüm, yapamam",
        "en": "sorry I can’t"
      },
      {
        "tr": "kulağa eğlenceli geliyor",
        "en": "sounds fun"
      },
      {
        "tr": "kulağa iyi/müthiş geliyor",
        "en": "sounds good/awesome"
      },
      {
        "tr": "kulağa harika geliyor",
        "en": "sounds great"
      },
      {
        "tr": "zaman harcamak",
        "en": "spend time"
      },
      {
        "tr": "hala",
        "en": "still"
      },
      {
        "tr": "güçlü bağ",
        "en": "strong bond"
      },
      {
        "tr": "tıka basa dolu",
        "en": "stuffed"
      },
      {
        "tr": "birbirini desteklemek",
        "en": "support each other"
      },
      {
        "tr": "destekleyici",
        "en": "supportive"
      },
      {
        "tr": "tabii ki",
        "en": "sure"
      },
      {
        "tr": "hayatta kalmak",
        "en": "survive"
      },
      {
        "tr": "ciddiye almak",
        "en": "take things serious"
      },
      {
        "tr": "konuşmak",
        "en": "talk"
      },
      {
        "tr": "yalan söylemek",
        "en": "tell lie"
      },
      {
        "tr": "başkalarına sır vermek",
        "en": "tell secret to others"
      },
      {
        "tr": "anlatmak",
        "en": "tell"
      },
      {
        "tr": "mesaj yazmak",
        "en": "text"
      },
      {
        "tr": "harika olurdu",
        "en": "that would be great"
      },
      {
        "tr": "bu yüzden",
        "en": "that’s why"
      },
      {
        "tr": "şey",
        "en": "thing"
      },
      {
        "tr": "susamış",
        "en": "thirsty"
      },
      {
        "tr": "heyecan verici, nefes kesici",
        "en": "thrilling"
      },
      {
        "tr": "gerçek arkadaş",
        "en": "true friend"
      },
      {
        "tr": "güvenmek",
        "en": "trust"
      },
      {
        "tr": "koşulsuz",
        "en": "unconditional"
      },
      {
        "tr": "anlamak",
        "en": "understand"
      },
      {
        "tr": "istemek",
        "en": "want"
      },
      {
        "tr": "ne dersin, peki ya …",
        "en": "what about"
      },
      {
        "tr": "neden olmasın",
        "en": "why not"
      },
      {
        "tr": "ister misin",
        "en": "would you like to"
      },
      {
        "tr": "kendinin, kendin",
        "en": "your own"
      }
    ]
  },
  {
    "id": "src-in-the-kitchen",
    "title": "In The Kitchen",
    "emoji": "🏠",
    "category": "Daily Life",
    "desc": "In The Kitchen — imported from topicsource/in-the-kitchen.txt.",
    "words": [
      {
        "tr": "bir tutam tuz",
        "en": "a pinch of salt"
      },
      {
        "tr": "hakkında",
        "en": "about"
      },
      {
        "tr": "eklemek",
        "en": "add"
      },
      {
        "tr": "bundan sonra",
        "en": "after that"
      },
      {
        "tr": "başka",
        "en": "another"
      },
      {
        "tr": "fırında pişirmek",
        "en": "bake"
      },
      {
        "tr": "kabartma tozu",
        "en": "baking powder"
      },
      {
        "tr": "karbonat",
        "en": "baking soda"
      },
      {
        "tr": "fırın tepsisi",
        "en": "baking tray"
      },
      {
        "tr": "hamur",
        "en": "batter"
      },
      {
        "tr": "fasulye",
        "en": "bean"
      },
      {
        "tr": "sığır eti",
        "en": "beef"
      },
      {
        "tr": "kaynatmak",
        "en": "boil"
      },
      {
        "tr": "haşlanmış",
        "en": "boiled"
      },
      {
        "tr": "her iki taraf",
        "en": "both sides"
      },
      {
        "tr": "kase",
        "en": "bowl"
      },
      {
        "tr": "ekmek kırıntısı",
        "en": "bread crumb"
      },
      {
        "tr": "fırçalamak",
        "en": "brush"
      },
      {
        "tr": "tereyağı",
        "en": "butter"
      },
      {
        "tr": "kek kalıbı",
        "en": "cake tin"
      },
      {
        "tr": "kakule tozu",
        "en": "cardamom powder"
      },
      {
        "tr": "kereviz",
        "en": "celery"
      },
      {
        "tr": "tavuk suyu",
        "en": "chicken stock"
      },
      {
        "tr": "doğramak",
        "en": "chop"
      },
      {
        "tr": "doğranmış",
        "en": "chopped"
      },
      {
        "tr": "tarçın",
        "en": "cinnamon"
      },
      {
        "tr": "birleştirmek",
        "en": "combine"
      },
      {
        "tr": "pişirmek",
        "en": "cook"
      },
      {
        "tr": "mısır nişastası",
        "en": "corn starch"
      },
      {
        "tr": "örtmek",
        "en": "cover"
      },
      {
        "tr": "kimyon",
        "en": "cumin"
      },
      {
        "tr": "kesmek",
        "en": "cut"
      },
      {
        "tr": "ikiye bölmek",
        "en": "cut in halves"
      },
      {
        "tr": "süreci anlatmak, tarif etmek",
        "en": "describe process"
      },
      {
        "tr": "tatlı",
        "en": "dessert"
      },
      {
        "tr": "zor",
        "en": "difficult"
      },
      {
        "tr": "küp küp doğramak",
        "en": "dice"
      },
      {
        "tr": "yemek, tabak",
        "en": "dish"
      },
      {
        "tr": "eritmek",
        "en": "dissolve"
      },
      {
        "tr": "bölmek",
        "en": "divide"
      },
      {
        "tr": "süzmek",
        "en": "drain"
      },
      {
        "tr": "hamur",
        "en": "dough"
      },
      {
        "tr": "kolay",
        "en": "easy"
      },
      {
        "tr": "doldurmak",
        "en": "fill"
      },
      {
        "tr": "sonunda",
        "en": "finally"
      },
      {
        "tr": "ilk",
        "en": "first"
      },
      {
        "tr": "un",
        "en": "flour"
      },
      {
        "tr": "-den",
        "en": "from"
      },
      {
        "tr": "kızartmak",
        "en": "fry"
      },
      {
        "tr": "buzdolabı",
        "en": "fridge"
      },
      {
        "tr": "kızartma tavası",
        "en": "frying pan"
      },
      {
        "tr": "sarımsak",
        "en": "garlic"
      },
      {
        "tr": "kahverengileşmek",
        "en": "get brown"
      },
      {
        "tr": "kalınlaşmak",
        "en": "get thick"
      },
      {
        "tr": "rendelenmiş",
        "en": "grated"
      },
      {
        "tr": "rende",
        "en": "grater"
      },
      {
        "tr": "ızgara yapmak",
        "en": "grill"
      },
      {
        "tr": "yüksek ateş",
        "en": "high heat"
      },
      {
        "tr": "ev yapımı ekmek",
        "en": "homemade bread"
      },
      {
        "tr": "saat",
        "en": "hour"
      },
      {
        "tr": "ne kadar süre",
        "en": "how long"
      },
      {
        "tr": "kaç tane",
        "en": "how many"
      },
      {
        "tr": "ne kadar",
        "en": "how much"
      },
      {
        "tr": "nasıl yapılır",
        "en": "how to make"
      },
      {
        "tr": "gerçekten",
        "en": "indeed"
      },
      {
        "tr": "malzemeler",
        "en": "ingredients"
      },
      {
        "tr": "içine",
        "en": "into"
      },
      {
        "tr": "mutfak gereçleri",
        "en": "kitchen tools"
      },
      {
        "tr": "yoğurmak",
        "en": "knead"
      },
      {
        "tr": "bıçak",
        "en": "knife"
      },
      {
        "tr": "sonra",
        "en": "later"
      },
      {
        "tr": "büyük",
        "en": "large"
      },
      {
        "tr": "limon suyu",
        "en": "lemon juice"
      },
      {
        "tr": "limon kabuğu",
        "en": "lemon peel"
      },
      {
        "tr": "hamur yapmak",
        "en": "make dough"
      },
      {
        "tr": "dinlendirmek",
        "en": "make it rest"
      },
      {
        "tr": "ezilmiş",
        "en": "mashed"
      },
      {
        "tr": "yemek",
        "en": "meal"
      },
      {
        "tr": "orta ateş",
        "en": "medium heat"
      },
      {
        "tr": "mayayı eritmek",
        "en": "melt the yeast"
      },
      {
        "tr": "eritilmiş",
        "en": "melted"
      },
      {
        "tr": "yöntem",
        "en": "method"
      },
      {
        "tr": "dakika",
        "en": "minute"
      },
      {
        "tr": "kıyma",
        "en": "minced beef"
      },
      {
        "tr": "kıyılmış sarımsak",
        "en": "minced garlic"
      },
      {
        "tr": "karışım",
        "en": "mixture"
      },
      {
        "tr": "midye",
        "en": "mussels"
      },
      {
        "tr": "ihtiyaç duymak",
        "en": "need"
      },
      {
        "tr": "sonraki",
        "en": "next"
      },
      {
        "tr": "fındık",
        "en": "nut"
      },
      {
        "tr": "yağlanmış",
        "en": "oiled"
      },
      {
        "tr": "fırın",
        "en": "oven"
      },
      {
        "tr": "deniz ürünlü ve tavuklu pilav (ispanyol yemeği)",
        "en": "paella"
      },
      {
        "tr": "tava",
        "en": "pan"
      },
      {
        "tr": "kırmızı biber",
        "en": "paprika"
      },
      {
        "tr": "maydanoz",
        "en": "parsley"
      },
      {
        "tr": "makarna",
        "en": "pasta"
      },
      {
        "tr": "biber",
        "en": "pepper"
      },
      {
        "tr": "yerleştirmek",
        "en": "place"
      },
      {
        "tr": "tabak",
        "en": "plate"
      },
      {
        "tr": "tencere",
        "en": "pot"
      },
      {
        "tr": "dökmek",
        "en": "pour"
      },
      {
        "tr": "karides",
        "en": "prawn"
      },
      {
        "tr": "tercih etmek",
        "en": "prefer"
      },
      {
        "tr": "önceden ısıtmak",
        "en": "preheat"
      },
      {
        "tr": "önceden ısıtılmış",
        "en": "preheated"
      },
      {
        "tr": "hazırlamak",
        "en": "prepare"
      },
      {
        "tr": "hazırlık",
        "en": "preparation"
      },
      {
        "tr": "koymak",
        "en": "put"
      },
      {
        "tr": "kuru üzüm",
        "en": "raisin"
      },
      {
        "tr": "tarif",
        "en": "recipe"
      },
      {
        "tr": "kırmızı toz biber",
        "en": "red pepper flakes"
      },
      {
        "tr": "buzdolabı",
        "en": "refrigerator"
      },
      {
        "tr": "hatırlamak",
        "en": "remember"
      },
      {
        "tr": "çıkarmak",
        "en": "remove"
      },
      {
        "tr": "durulamak",
        "en": "rinse"
      },
      {
        "tr": "kabarmak",
        "en": "rise"
      },
      {
        "tr": "tavuk kızartmak",
        "en": "roast chicken"
      },
      {
        "tr": "oklava",
        "en": "rolling pin"
      },
      {
        "tr": "tuz",
        "en": "salt"
      },
      {
        "tr": "safran",
        "en": "saffron"
      },
      {
        "tr": "tencere",
        "en": "saucepan"
      },
      {
        "tr": "baharat eklemek",
        "en": "season"
      },
      {
        "tr": "ikinci",
        "en": "second"
      },
      {
        "tr": "mantıyı kapatmak",
        "en": "seal the dumpling"
      },
      {
        "tr": "servis yapmak",
        "en": "serve"
      },
      {
        "tr": "sıcak servis yapmak",
        "en": "serve warm"
      },
      {
        "tr": "bir kenara koymak",
        "en": "set aside"
      },
      {
        "tr": "şekil",
        "en": "shape"
      },
      {
        "tr": "keskin",
        "en": "sharp"
      },
      {
        "tr": "yufka",
        "en": "sheets of phyllo"
      },
      {
        "tr": "dilim",
        "en": "slice"
      },
      {
        "tr": "hafifçe",
        "en": "slightly"
      },
      {
        "tr": "pürüzsüz",
        "en": "smooth"
      },
      {
        "tr": "ıslatmak, suda bekletmek",
        "en": "soak"
      },
      {
        "tr": "baharatlar",
        "en": "spices"
      },
      {
        "tr": "baharatlı",
        "en": "spicy"
      },
      {
        "tr": "kaşık",
        "en": "spoon"
      },
      {
        "tr": "yaymak",
        "en": "spread"
      },
      {
        "tr": "serpmek",
        "en": "sprinkle"
      },
      {
        "tr": "kare",
        "en": "square"
      },
      {
        "tr": "nişasta",
        "en": "starch"
      },
      {
        "tr": "karıştırmak",
        "en": "stir"
      },
      {
        "tr": "süzmek",
        "en": "strain"
      },
      {
        "tr": "germek",
        "en": "stretch"
      },
      {
        "tr": "şerbet",
        "en": "syrup"
      },
      {
        "tr": "lezzetli",
        "en": "tasty"
      },
      {
        "tr": "sıcaklık",
        "en": "temperature"
      },
      {
        "tr": "yumuşak",
        "en": "tender"
      },
      {
        "tr": "sonra",
        "en": "then"
      },
      {
        "tr": "kadar",
        "en": "till"
      },
      {
        "tr": "üst",
        "en": "top"
      },
      {
        "tr": "lavaş ekmeği",
        "en": "tortilla"
      },
      {
        "tr": "tepsi",
        "en": "tray"
      },
      {
        "tr": "kahverengileşmek",
        "en": "turn brown"
      },
      {
        "tr": "-e kadar",
        "en": "until"
      },
      {
        "tr": "kullanmak",
        "en": "use"
      },
      {
        "tr": "sebzeler",
        "en": "vegetables"
      },
      {
        "tr": "çırpmak",
        "en": "whisk"
      },
      {
        "tr": "-iken",
        "en": "while"
      },
      {
        "tr": "ile",
        "en": "with"
      }
    ]
  },
  {
    "id": "src-natural-forces",
    "title": "Natural Forces",
    "emoji": "🌿",
    "category": "Nature",
    "desc": "Natural Forces — imported from topicsource/natural-forces.txt.",
    "words": [
      {
        "tr": "yokluk",
        "en": "absence"
      },
      {
        "tr": "dönüm",
        "en": "acre"
      },
      {
        "tr": "artçı sarsıntı",
        "en": "after shock"
      },
      {
        "tr": "katılmak",
        "en": "agree"
      },
      {
        "tr": "tarım",
        "en": "agriculture"
      },
      {
        "tr": "hava kirliliği",
        "en": "air pollution"
      },
      {
        "tr": "hayvan türleri",
        "en": "animal species"
      },
      {
        "tr": "kül",
        "en": "ash"
      },
      {
        "tr": "yetkililer",
        "en": "authorities"
      },
      {
        "tr": "çığ",
        "en": "avalanche"
      },
      {
        "tr": "esmek",
        "en": "blow"
      },
      {
        "tr": "uçurmak",
        "en": "blow off"
      },
      {
        "tr": "sebep olmak",
        "en": "cause"
      },
      {
        "tr": "iklim",
        "en": "climate"
      },
      {
        "tr": "iklim değişikliği",
        "en": "climate change"
      },
      {
        "tr": "binayı yıkmak",
        "en": "collapse building"
      },
      {
        "tr": "ülke",
        "en": "country"
      },
      {
        "tr": "mahsuller",
        "en": "crops"
      },
      {
        "tr": "zarar vermek",
        "en": "damage"
      },
      {
        "tr": "hasar görmüş",
        "en": "damaged"
      },
      {
        "tr": "tehlikeli",
        "en": "dangerous"
      },
      {
        "tr": "başa çıkmak",
        "en": "deal with"
      },
      {
        "tr": "ölüm",
        "en": "death"
      },
      {
        "tr": "ormansızlaşma",
        "en": "deforestation"
      },
      {
        "tr": "yok etmek",
        "en": "destroy"
      },
      {
        "tr": "ormanı yok etmek",
        "en": "destroy forest"
      },
      {
        "tr": "katılmamak",
        "en": "disagree"
      },
      {
        "tr": "kuraklık",
        "en": "drought"
      },
      {
        "tr": "kuru hava",
        "en": "dry weather"
      },
      {
        "tr": "sırasında",
        "en": "during"
      },
      {
        "tr": "dünya kabuğu",
        "en": "earth’s crust"
      },
      {
        "tr": "deprem",
        "en": "earthquake"
      },
      {
        "tr": "insanları eğitmek",
        "en": "educate people"
      },
      {
        "tr": "yeterli",
        "en": "enough"
      },
      {
        "tr": "çevre",
        "en": "environment"
      },
      {
        "tr": "kaçmak",
        "en": "escape"
      },
      {
        "tr": "evrilmek",
        "en": "evolve into"
      },
      {
        "tr": "aşırı sıcak",
        "en": "extreme heat"
      },
      {
        "tr": "fabrikalar",
        "en": "factories"
      },
      {
        "tr": "düşmek",
        "en": "fall"
      },
      {
        "tr": "ölümcül",
        "en": "fatal"
      },
      {
        "tr": "ilk yardım",
        "en": "first aid"
      },
      {
        "tr": "sel",
        "en": "flood"
      },
      {
        "tr": "sel baskını",
        "en": "flooding"
      },
      {
        "tr": "aşağı akmak",
        "en": "flow down"
      },
      {
        "tr": "gelecek",
        "en": "future"
      },
      {
        "tr": "küresel ısınma",
        "en": "global warming"
      },
      {
        "tr": "hükümet",
        "en": "government"
      },
      {
        "tr": "sera gazları",
        "en": "greenhouse gases"
      },
      {
        "tr": "mahsul yetiştirmek",
        "en": "grow crops"
      },
      {
        "tr": "tahmin etmek",
        "en": "guess"
      },
      {
        "tr": "olmak",
        "en": "happen"
      },
      {
        "tr": "çevreye zarar vermek",
        "en": "harm environment"
      },
      {
        "tr": "tepe",
        "en": "hill"
      },
      {
        "tr": "şehri vurmak",
        "en": "hit the city"
      },
      {
        "tr": "dev alevler",
        "en": "huge flames"
      },
      {
        "tr": "insan",
        "en": "human"
      },
      {
        "tr": "insan",
        "en": "human being"
      },
      {
        "tr": "kasırga",
        "en": "hurricane"
      },
      {
        "tr": "artırmak",
        "en": "increase"
      },
      {
        "tr": "bilgi",
        "en": "information"
      },
      {
        "tr": "yaralanma",
        "en": "injury"
      },
      {
        "tr": "ile ilgilenmek",
        "en": "interested in"
      },
      {
        "tr": "devam etmek",
        "en": "keep on"
      },
      {
        "tr": "öldürmek",
        "en": "kill"
      },
      {
        "tr": "eksiklik",
        "en": "lack"
      },
      {
        "tr": "arazi",
        "en": "land"
      },
      {
        "tr": "toprak kayması",
        "en": "land slide"
      },
      {
        "tr": "yol açmak",
        "en": "lead to"
      },
      {
        "tr": "ayrılmak",
        "en": "leave"
      },
      {
        "tr": "daha az",
        "en": "less"
      },
      {
        "tr": "yıldırım",
        "en": "lightning"
      },
      {
        "tr": "sıvı",
        "en": "liquid"
      },
      {
        "tr": "ürün kaybı",
        "en": "loss of harvest"
      },
      {
        "tr": "ağır şeyleri hareketsiz hale getirmek",
        "en": "make heavy things immobilize"
      },
      {
        "tr": "anlamına gelmek",
        "en": "mean"
      },
      {
        "tr": "erimek",
        "en": "melt"
      },
      {
        "tr": "erimiş kaya",
        "en": "molten rock"
      },
      {
        "tr": "dağ",
        "en": "mountain"
      },
      {
        "tr": "hareket",
        "en": "movement"
      },
      {
        "tr": "çamur",
        "en": "mud"
      },
      {
        "tr": "doğal afetler",
        "en": "natural disasters"
      },
      {
        "tr": "doğal kuvvetler",
        "en": "natural forces"
      },
      {
        "tr": "meydana gelmek",
        "en": "occur"
      },
      {
        "tr": "okyanus",
        "en": "ocean"
      },
      {
        "tr": "geçmiş",
        "en": "past"
      },
      {
        "tr": "gezegen",
        "en": "planet"
      },
      {
        "tr": "bitki",
        "en": "plant"
      },
      {
        "tr": "hazırlamak",
        "en": "prepare"
      },
      {
        "tr": "önlemek",
        "en": "prevent"
      },
      {
        "tr": "üretmek",
        "en": "produce"
      },
      {
        "tr": "temiz enerji üretmek",
        "en": "produce clean energy"
      },
      {
        "tr": "yağmur",
        "en": "rain"
      },
      {
        "tr": "azaltmak",
        "en": "reduce"
      },
      {
        "tr": "kurtarma ekibi",
        "en": "rescue team"
      },
      {
        "tr": "sonuç",
        "en": "result"
      },
      {
        "tr": "nehir",
        "en": "river"
      },
      {
        "tr": "çatı",
        "en": "roof"
      },
      {
        "tr": "oksijenin tükenmesi",
        "en": "run out of oxygen"
      },
      {
        "tr": "güvenli",
        "en": "safe"
      },
      {
        "tr": "kurtarmak",
        "en": "save"
      },
      {
        "tr": "sallamak",
        "en": "shake"
      },
      {
        "tr": "kıtlık",
        "en": "shortage"
      },
      {
        "tr": "kar",
        "en": "snow"
      },
      {
        "tr": "katı",
        "en": "solid"
      },
      {
        "tr": "hız",
        "en": "speed"
      },
      {
        "tr": "yayılmak",
        "en": "spread"
      },
      {
        "tr": "açlık",
        "en": "starvation"
      },
      {
        "tr": "uzak durmak",
        "en": "stay away"
      },
      {
        "tr": "fırtına",
        "en": "storm"
      },
      {
        "tr": "güçlü",
        "en": "strong"
      },
      {
        "tr": "sağlam binalar",
        "en": "strong buildings"
      },
      {
        "tr": "enkaz altında sıkışmak",
        "en": "stuck under debris"
      },
      {
        "tr": "ani",
        "en": "sudden"
      },
      {
        "tr": "-den muzdarip olmak",
        "en": "suffer from"
      },
      {
        "tr": "öneri",
        "en": "suggestion"
      },
      {
        "tr": "yüzey",
        "en": "surface"
      },
      {
        "tr": "yutmak",
        "en": "swallow"
      },
      {
        "tr": "ilgilenmek",
        "en": "take care"
      },
      {
        "tr": "önlem almak",
        "en": "take precaution"
      },
      {
        "tr": "kısa duş almak",
        "en": "take short shower"
      },
      {
        "tr": "sıcaklık",
        "en": "temperature"
      },
      {
        "tr": "korkunç",
        "en": "terrible"
      },
      {
        "tr": "düşünmek",
        "en": "think"
      },
      {
        "tr": "dünyayı tehdit etmek",
        "en": "threaten the earth"
      },
      {
        "tr": "kasırga",
        "en": "tornado"
      },
      {
        "tr": "inanılmaz",
        "en": "unbelievable"
      },
      {
        "tr": "kontrol edilemez",
        "en": "uncontrollable"
      },
      {
        "tr": "bitki örtüsü",
        "en": "vegetation"
      },
      {
        "tr": "volkanik patlama",
        "en": "volcanic eruption"
      },
      {
        "tr": "ısınmak",
        "en": "warm up"
      },
      {
        "tr": "uyarmak",
        "en": "warn"
      },
      {
        "tr": "israf etmek",
        "en": "waste"
      },
      {
        "tr": "su israf etmek",
        "en": "waste water"
      },
      {
        "tr": "su kıtlığı",
        "en": "water shortage"
      },
      {
        "tr": "dalga",
        "en": "wave"
      },
      {
        "tr": "orman yangını",
        "en": "wild fire"
      },
      {
        "tr": "rüzgar",
        "en": "wind"
      },
      {
        "tr": "yok etmek",
        "en": "wipe out"
      }
    ]
  },
  {
    "id": "src-on-the-phone",
    "title": "On The Phone",
    "emoji": "🏠",
    "category": "Daily Life",
    "desc": "On The Phone — imported from topicsource/on-the-phone.txt.",
    "words": [
      {
        "tr": "cevap vermek",
        "en": "answer"
      },
      {
        "tr": "uygulama",
        "en": "application"
      },
      {
        "tr": "randevu",
        "en": "appointment"
      },
      {
        "tr": "ayarlamak",
        "en": "arrange"
      },
      {
        "tr": "sormak",
        "en": "ask"
      },
      {
        "tr": "şu anda",
        "en": "at the moment"
      },
      {
        "tr": "müsait",
        "en": "available"
      },
      {
        "tr": "başlamak",
        "en": "begin"
      },
      {
        "tr": "aramak, çağrı",
        "en": "call"
      },
      {
        "tr": "arayan kişi",
        "en": "caller"
      },
      {
        "tr": "yapabilir miyim",
        "en": "can I"
      },
      {
        "tr": "cep telefonu",
        "en": "cell phone"
      },
      {
        "tr": "değiştirmek",
        "en": "change"
      },
      {
        "tr": "iletişim",
        "en": "communication"
      },
      {
        "tr": "şirket çalışanı",
        "en": "company employee"
      },
      {
        "tr": "konser salonu",
        "en": "concert hall"
      },
      {
        "tr": "bağlantı",
        "en": "connection"
      },
      {
        "tr": "iletişime geçmek",
        "en": "contact"
      },
      {
        "tr": "konuşma",
        "en": "conversation"
      },
      {
        "tr": "yapabilir misiniz",
        "en": "could you …"
      },
      {
        "tr": "teslimat",
        "en": "delivery"
      },
      {
        "tr": "cihaz",
        "en": "device"
      },
      {
        "tr": "numara çevirmek",
        "en": "dial a number"
      },
      {
        "tr": "tuşlamak",
        "en": "dial"
      },
      {
        "tr": "farklı",
        "en": "different"
      },
      {
        "tr": "keşfetmek",
        "en": "discover"
      },
      {
        "tr": "birbirine",
        "en": "each other"
      },
      {
        "tr": "meşgul",
        "en": "engaged"
      },
      {
        "tr": "deneysel",
        "en": "experimental"
      },
      {
        "tr": "dahili numara",
        "en": "extension number"
      },
      {
        "tr": "hızlı",
        "en": "fast"
      },
      {
        "tr": "daha iyi hissetmek",
        "en": "feel better"
      },
      {
        "tr": "iyi",
        "en": "fine"
      },
      {
        "tr": "geri dönmek",
        "en": "get back"
      },
      {
        "tr": "geçmiş olsun",
        "en": "get well soon"
      },
      {
        "tr": "almak",
        "en": "get"
      },
      {
        "tr": "vermek",
        "en": "give"
      },
      {
        "tr": "mezuniyet",
        "en": "graduation"
      },
      {
        "tr": "harika",
        "en": "great"
      },
      {
        "tr": "tahmin etmek",
        "en": "guess"
      },
      {
        "tr": "alışkanlık",
        "en": "habit"
      },
      {
        "tr": "beklemek",
        "en": "hang on"
      },
      {
        "tr": "genel merkez",
        "en": "headquarter"
      },
      {
        "tr": "duymak",
        "en": "hear"
      },
      {
        "tr": "burada",
        "en": "here"
      },
      {
        "tr": "beklemek",
        "en": "hold on"
      },
      {
        "tr": "ne sıklıkla",
        "en": "how often"
      },
      {
        "tr": "sanırım",
        "en": "I guess"
      },
      {
        "tr": "telefonu ona veriyorum/çağırıyorum",
        "en": "I’ll get him"
      },
      {
        "tr": "(telefonu)ben açarım",
        "en": "I’ll take that"
      },
      {
        "tr": "korkarım ki",
        "en": "I’m afraid"
      },
      {
        "tr": "bunu duyduğuma üzüldüm",
        "en": "I’m sorry to hear that"
      },
      {
        "tr": "hasta",
        "en": "ill"
      },
      {
        "tr": "hayal etmek",
        "en": "imagine"
      },
      {
        "tr": "röportajcı",
        "en": "interviewer"
      },
      {
        "tr": "icat edilmiş",
        "en": "invented"
      },
      {
        "tr": "icat",
        "en": "invention"
      },
      {
        "tr": "dergi",
        "en": "journal"
      },
      {
        "tr": "bir dakika",
        "en": "just a minute"
      },
      {
        "tr": "iletişimde kalmak",
        "en": "keep in touch"
      },
      {
        "tr": "öğrenmek",
        "en": "learn"
      },
      {
        "tr": "ayrılmak, bırakmak",
        "en": "leave"
      },
      {
        "tr": "hat",
        "en": "line"
      },
      {
        "tr": "canlı sohbet",
        "en": "live chat"
      },
      {
        "tr": "düzenleme yapmak",
        "en": "make arrangement"
      },
      {
        "tr": "telefon etmek",
        "en": "make phone call"
      },
      {
        "tr": "… ile konuşabilir miyim",
        "en": "may I speak to"
      },
      {
        "tr": "… yapabilir miyim",
        "en": "may I …"
      },
      {
        "tr": "buluşmak",
        "en": "meet"
      },
      {
        "tr": "not, hatırlatma",
        "en": "memo"
      },
      {
        "tr": "ihtiyaç duymak",
        "en": "need"
      },
      {
        "tr": "tabii ki",
        "en": "of course"
      },
      {
        "tr": "bir zamanlar",
        "en": "once upon a time"
      },
      {
        "tr": "yurt dışı telefon görüşmesi",
        "en": "overseas phone call"
      },
      {
        "tr": "kibar",
        "en": "polite"
      },
      {
        "tr": "mümkün",
        "en": "possible"
      },
      {
        "tr": "tercih etmek",
        "en": "prefer"
      },
      {
        "tr": "telefona bağlamak",
        "en": "put through"
      },
      {
        "tr": "bilgiye ulaşmak",
        "en": "reach information"
      },
      {
        "tr": "alıcı",
        "en": "receiver"
      },
      {
        "tr": "hatırlatıcı",
        "en": "reminder"
      },
      {
        "tr": "tekrarlamak",
        "en": "repeat"
      },
      {
        "tr": "değiştirmek",
        "en": "replace"
      },
      {
        "tr": "devrim",
        "en": "revolution"
      },
      {
        "tr": "(telefon) çalmak, birini aramak",
        "en": "ring"
      },
      {
        "tr": "mesaj göndermek",
        "en": "send messages"
      },
      {
        "tr": "bağırmak",
        "en": "shout"
      },
      {
        "tr": "akıllı telefon",
        "en": "smart phone"
      },
      {
        "tr": "yakında",
        "en": "soon"
      },
      {
        "tr": "birlikte çalışmak",
        "en": "study together"
      },
      {
        "tr": "tabii",
        "en": "sure"
      },
      {
        "tr": "kendine iyi bak",
        "en": "take care"
      },
      {
        "tr": "konuşmak",
        "en": "talk"
      },
      {
        "tr": "söylemek",
        "en": "tell"
      },
      {
        "tr": "mesaj yazmak",
        "en": "text a message"
      },
      {
        "tr": "en çok",
        "en": "the most"
      },
      {
        "tr": "denemek",
        "en": "try"
      },
      {
        "tr": "anlamak",
        "en": "understand"
      },
      {
        "tr": "istemek",
        "en": "want"
      },
      {
        "tr": "zaman harcamak",
        "en": "waste time"
      },
      {
        "tr": "yol, yöntem",
        "en": "way"
      },
      {
        "tr": "senin neyin var",
        "en": "what’s wrong with you"
      },
      {
        "tr": "kim",
        "en": "who"
      },
      {
        "tr": "ile",
        "en": "with"
      },
      {
        "tr": "-sız, -siz",
        "en": "without"
      },
      {
        "tr": "ister misin",
        "en": "would you like to"
      },
      {
        "tr": "mektup yazmak",
        "en": "write letter"
      },
      {
        "tr": "bir şey değil",
        "en": "you are welcome"
      }
    ]
  },
  {
    "id": "src-science",
    "title": "Science",
    "emoji": "🔬",
    "category": "School",
    "desc": "Science — imported from topicsource/science.txt.",
    "words": [
      {
        "tr": "kabul etmek",
        "en": "accept"
      },
      {
        "tr": "başarı",
        "en": "achievement"
      },
      {
        "tr": "eklemek",
        "en": "add"
      },
      {
        "tr": "hayran olmak",
        "en": "admire"
      },
      {
        "tr": "mücadeleye hayran olmak",
        "en": "admire struggle"
      },
      {
        "tr": "macera",
        "en": "adventure"
      },
      {
        "tr": "izin vermek",
        "en": "allow"
      },
      {
        "tr": "harika",
        "en": "amazing"
      },
      {
        "tr": "antik",
        "en": "ancient"
      },
      {
        "tr": "özür dilemek",
        "en": "apologize"
      },
      {
        "tr": "takdir etmek",
        "en": "appreciate"
      },
      {
        "tr": "ünlü olmak",
        "en": "become famous"
      },
      {
        "tr": "başlamak",
        "en": "begin"
      },
      {
        "tr": "ödünç almak",
        "en": "borrow"
      },
      {
        "tr": "parlak",
        "en": "brilliant"
      },
      {
        "tr": "getirmek",
        "en": "bring"
      },
      {
        "tr": "meşgul",
        "en": "busy"
      },
      {
        "tr": "hesap makinesi",
        "en": "calculator"
      },
      {
        "tr": "taşımak",
        "en": "carry"
      },
      {
        "tr": "değiştirmek",
        "en": "change"
      },
      {
        "tr": "dünyayı değiştirmek",
        "en": "change the world"
      },
      {
        "tr": "çocukluk",
        "en": "childhood"
      },
      {
        "tr": "iddia etmek",
        "en": "claim"
      },
      {
        "tr": "iletişim",
        "en": "communication"
      },
      {
        "tr": "pusula",
        "en": "compass"
      },
      {
        "tr": "deney yapmak",
        "en": "conduct experiment"
      },
      {
        "tr": "örtmek",
        "en": "cover"
      },
      {
        "tr": "yaratmak",
        "en": "create"
      },
      {
        "tr": "şu anda",
        "en": "currently"
      },
      {
        "tr": "tehlikeli",
        "en": "dangerous"
      },
      {
        "tr": "tanımlamak",
        "en": "describe"
      },
      {
        "tr": "hak etmek",
        "en": "deserve"
      },
      {
        "tr": "tasarlamak",
        "en": "design"
      },
      {
        "tr": "geliştirmek",
        "en": "develop"
      },
      {
        "tr": "tedavi geliştirmek",
        "en": "develop cure"
      },
      {
        "tr": "teşhis etmek",
        "en": "diagnose"
      },
      {
        "tr": "ölmek",
        "en": "die"
      },
      {
        "tr": "zor",
        "en": "difficult"
      },
      {
        "tr": "akşam yemeği yemek",
        "en": "dine"
      },
      {
        "tr": "dezavantaj",
        "en": "disadvantage"
      },
      {
        "tr": "keşfetmek",
        "en": "discover"
      },
      {
        "tr": "kaşif",
        "en": "discoverer"
      },
      {
        "tr": "keşif",
        "en": "discovery"
      },
      {
        "tr": "hastalık",
        "en": "disease"
      },
      {
        "tr": "araştırma yapmak",
        "en": "do research"
      },
      {
        "tr": "belgeseller",
        "en": "documentaries"
      },
      {
        "tr": "dünya",
        "en": "earth"
      },
      {
        "tr": "eğitim",
        "en": "education"
      },
      {
        "tr": "elektrik ampulü",
        "en": "electric bulb"
      },
      {
        "tr": "mühendislik",
        "en": "engineering"
      },
      {
        "tr": "eğlence",
        "en": "entertainment"
      },
      {
        "tr": "incelemek",
        "en": "examine"
      },
      {
        "tr": "deney",
        "en": "experiment"
      },
      {
        "tr": "keşfetmek",
        "en": "explore"
      },
      {
        "tr": "kaşif",
        "en": "explorer"
      },
      {
        "tr": "gerçek",
        "en": "fact"
      },
      {
        "tr": "ünlü",
        "en": "famous"
      },
      {
        "tr": "öğrenmek",
        "en": "find out"
      },
      {
        "tr": "sonsuza kadar",
        "en": "forever"
      },
      {
        "tr": "unutmak",
        "en": "forget"
      },
      {
        "tr": "bilgi edinmek",
        "en": "gain knowledge"
      },
      {
        "tr": "dahi",
        "en": "genius"
      },
      {
        "tr": "iyileşmek",
        "en": "get better"
      },
      {
        "tr": "tedavi olmak",
        "en": "get treated"
      },
      {
        "tr": "kuyumcu",
        "en": "goldsmith"
      },
      {
        "tr": "olmak",
        "en": "happen"
      },
      {
        "tr": "enfeksiyonu iyileştirmek",
        "en": "heal infection"
      },
      {
        "tr": "sağlık masrafları",
        "en": "healthcare cost"
      },
      {
        "tr": "deney tüpünü ısıtmak",
        "en": "heat test tube"
      },
      {
        "tr": "insan",
        "en": "human"
      },
      {
        "tr": "fikir",
        "en": "idea"
      },
      {
        "tr": "geliştirmek",
        "en": "improve"
      },
      {
        "tr": "gelişim",
        "en": "improvement"
      },
      {
        "tr": "inanılmaz",
        "en": "incredible"
      },
      {
        "tr": "bilgi",
        "en": "information"
      },
      {
        "tr": "ısrar etmek",
        "en": "insist on"
      },
      {
        "tr": "yerine",
        "en": "instead of"
      },
      {
        "tr": "ilgili",
        "en": "interested"
      },
      {
        "tr": "icat etmek",
        "en": "invent"
      },
      {
        "tr": "icat",
        "en": "invention"
      },
      {
        "tr": "mucit",
        "en": "inventor"
      },
      {
        "tr": "gazeteci",
        "en": "journalist"
      },
      {
        "tr": "laboratuvar",
        "en": "lab"
      },
      {
        "tr": "ayrılmak",
        "en": "leave"
      },
      {
        "tr": "ödünç vermek",
        "en": "lend"
      },
      {
        "tr": "kaldırmak",
        "en": "lift"
      },
      {
        "tr": "yaşamak",
        "en": "live"
      },
      {
        "tr": "aramak",
        "en": "look for"
      },
      {
        "tr": "yüksek sesle",
        "en": "loud"
      },
      {
        "tr": "hesaplama yapmak",
        "en": "make calculation"
      },
      {
        "tr": "deney yapmak",
        "en": "make experiment"
      },
      {
        "tr": "başyapıt",
        "en": "masterpiece"
      },
      {
        "tr": "madde",
        "en": "matter"
      },
      {
        "tr": "anlamına gelmek",
        "en": "mean"
      },
      {
        "tr": "dönüm noktası",
        "en": "milestone"
      },
      {
        "tr": "taşınabilir",
        "en": "moveable"
      },
      {
        "tr": "gerekmek",
        "en": "need to"
      },
      {
        "tr": "roman",
        "en": "novel"
      },
      {
        "tr": "gözlemlemek",
        "en": "observe"
      },
      {
        "tr": "maddeleri gözlemlemek",
        "en": "observe substances"
      },
      {
        "tr": "makineyi çalıştırmak",
        "en": "operate machine"
      },
      {
        "tr": "güneşin etrafında dönmek",
        "en": "orbit the sun"
      },
      {
        "tr": "diğer",
        "en": "other"
      },
      {
        "tr": "boyamak",
        "en": "paint"
      },
      {
        "tr": "vefat etmek",
        "en": "pass away"
      },
      {
        "tr": "sabır",
        "en": "patience"
      },
      {
        "tr": "fizik",
        "en": "physic"
      },
      {
        "tr": "yerleştirmek",
        "en": "place"
      },
      {
        "tr": "şiir",
        "en": "poem"
      },
      {
        "tr": "şiir sanatı",
        "en": "poetry"
      },
      {
        "tr": "hazırlamak",
        "en": "prepare"
      },
      {
        "tr": "yazdırmak",
        "en": "print"
      },
      {
        "tr": "matbaa",
        "en": "printing press"
      },
      {
        "tr": "işlem",
        "en": "process"
      },
      {
        "tr": "ilk örnek, prototip",
        "en": "prototype"
      },
      {
        "tr": "yayımlamak",
        "en": "publish"
      },
      {
        "tr": "radyo dalgaları",
        "en": "radio waves"
      },
      {
        "tr": "ulaşmak",
        "en": "reach"
      },
      {
        "tr": "farkına varmak",
        "en": "realize"
      },
      {
        "tr": "sebep",
        "en": "reason"
      },
      {
        "tr": "kaydetmek",
        "en": "record"
      },
      {
        "tr": "azaltmak",
        "en": "reduce"
      },
      {
        "tr": "reddetmek",
        "en": "reject"
      },
      {
        "tr": "ile ilgili",
        "en": "related with"
      },
      {
        "tr": "yerine koymak",
        "en": "replace"
      },
      {
        "tr": "araştırmak",
        "en": "research"
      },
      {
        "tr": "sonuç",
        "en": "result"
      },
      {
        "tr": "devrim niteliğinde",
        "en": "revolutionary"
      },
      {
        "tr": "bilim",
        "en": "science"
      },
      {
        "tr": "bilim kurgu",
        "en": "science fiction"
      },
      {
        "tr": "bilimsel",
        "en": "scientific"
      },
      {
        "tr": "bilim insanı",
        "en": "scientist"
      },
      {
        "tr": "aramak",
        "en": "search"
      },
      {
        "tr": "göndermek",
        "en": "send"
      },
      {
        "tr": "hizmetçi",
        "en": "servant"
      },
      {
        "tr": "bilgi paylaşmak",
        "en": "share information"
      },
      {
        "tr": "akıllı telefon",
        "en": "smartphone"
      },
      {
        "tr": "yakında",
        "en": "soon"
      },
      {
        "tr": "uzay",
        "en": "space"
      },
      {
        "tr": "uzay yolculuğu",
        "en": "space travel"
      },
      {
        "tr": "kendi ekseni etrafında dönmek",
        "en": "spin on its axis"
      },
      {
        "tr": "yayılmak",
        "en": "spread"
      },
      {
        "tr": "bilgiyi depolamak",
        "en": "store information"
      },
      {
        "tr": "garip",
        "en": "strange"
      },
      {
        "tr": "DNA’nın yapısı",
        "en": "structure of DNA"
      },
      {
        "tr": "mücadele etmek",
        "en": "struggle"
      },
      {
        "tr": "hukuk eğitimi almak",
        "en": "study law"
      },
      {
        "tr": "hayatta kalmak",
        "en": "survive"
      },
      {
        "tr": "telgraf",
        "en": "telegram"
      },
      {
        "tr": "söylemek",
        "en": "tell"
      },
      {
        "tr": "sayesinde",
        "en": "thanks to"
      },
      {
        "tr": "bu yüzden",
        "en": "that’s why"
      },
      {
        "tr": "şey",
        "en": "thing"
      },
      {
        "tr": "tedavi",
        "en": "treatment"
      },
      {
        "tr": "yazmak",
        "en": "type"
      },
      {
        "tr": "daktilo",
        "en": "typewriter"
      },
      {
        "tr": "dayanılmaz",
        "en": "unbearable"
      },
      {
        "tr": "benzersiz",
        "en": "unique"
      },
      {
        "tr": "evren",
        "en": "universe"
      },
      {
        "tr": "kullanmak",
        "en": "use"
      },
      {
        "tr": "aşı",
        "en": "vaccination"
      },
      {
        "tr": "insanların ufkunu genişletmek",
        "en": "widen people’s horizon"
      },
      {
        "tr": "merak etmek",
        "en": "wonder"
      },
      {
        "tr": "yazar",
        "en": "writer"
      }
    ]
  },
  {
    "id": "src-teen-life",
    "title": "Teen Life",
    "emoji": "🏠",
    "category": "Daily Life",
    "desc": "Teen Life — imported from topicsource/teen-life.txt.",
    "words": [
      {
        "tr": "hakkında",
        "en": "about"
      },
      {
        "tr": "hayran olmak",
        "en": "admire"
      },
      {
        "tr": "yetişkin",
        "en": "adult"
      },
      {
        "tr": "tavsiye vermek",
        "en": "advise"
      },
      {
        "tr": "her zaman",
        "en": "always"
      },
      {
        "tr": "şaşırtıcı",
        "en": "amazing"
      },
      {
        "tr": "gençler arasında",
        "en": "among teenagers"
      },
      {
        "tr": "tartışmak",
        "en": "argue"
      },
      {
        "tr": "sanat kulübü",
        "en": "art club"
      },
      {
        "tr": "müzik grubu",
        "en": "band"
      },
      {
        "tr": "satın almak",
        "en": "buy"
      },
      {
        "tr": "katlanamamak",
        "en": "can’t stand"
      },
      {
        "tr": "günlük kıyafetler, rahat kıyafetler",
        "en": "casual clothes"
      },
      {
        "tr": "sohbet etmek",
        "en": "chat"
      },
      {
        "tr": "ucuz",
        "en": "cheap"
      },
      {
        "tr": "seçmek",
        "en": "choose"
      },
      {
        "tr": "uğramak",
        "en": "come over"
      },
      {
        "tr": "rahat",
        "en": "comfortable"
      },
      {
        "tr": "konser",
        "en": "concert"
      },
      {
        "tr": "sohbet",
        "en": "conversation"
      },
      {
        "tr": "farklı",
        "en": "different"
      },
      {
        "tr": "egzersiz yapmak",
        "en": "do exercise"
      },
      {
        "tr": "belgeseller",
        "en": "documentaries"
      },
      {
        "tr": "davulcu",
        "en": "drummer"
      },
      {
        "tr": "birbirini",
        "en": "each other"
      },
      {
        "tr": "kolayca",
        "en": "easily"
      },
      {
        "tr": "kolay",
        "en": "easy"
      },
      {
        "tr": "eğitici",
        "en": "educational"
      },
      {
        "tr": "öğretici",
        "en": "educative"
      },
      {
        "tr": "keyif almak",
        "en": "enjoy"
      },
      {
        "tr": "keyifli",
        "en": "enjoyable"
      },
      {
        "tr": "ufkunu genişletmek",
        "en": "enlarge horizon"
      },
      {
        "tr": "etkinlik",
        "en": "event"
      },
      {
        "tr": "her yerde",
        "en": "everywhere"
      },
      {
        "tr": "ifade etmek",
        "en": "express"
      },
      {
        "tr": "moda",
        "en": "fashion"
      },
      {
        "tr": "hızlı",
        "en": "fast"
      },
      {
        "tr": "takip etmek",
        "en": "follow"
      },
      {
        "tr": "düşkün",
        "en": "fond of"
      },
      {
        "tr": "örneğin",
        "en": "for example"
      },
      {
        "tr": "bir müzik grubu kurmak",
        "en": "form a band"
      },
      {
        "tr": "boş zaman",
        "en": "free time"
      },
      {
        "tr": "iyi ilişki",
        "en": "good relationship"
      },
      {
        "tr": "spor salonu",
        "en": "gym"
      },
      {
        "tr": "takılmak, gezinmek",
        "en": "hang around"
      },
      {
        "tr": "vakit geçirmek",
        "en": "hang out"
      },
      {
        "tr": "nefret etmek",
        "en": "hate"
      },
      {
        "tr": "sağlıklı",
        "en": "healthy"
      },
      {
        "tr": "doğa yürüyüşü",
        "en": "hiking"
      },
      {
        "tr": "tarihi",
        "en": "historical"
      },
      {
        "tr": "etkileyici",
        "en": "impressive"
      },
      {
        "tr": "bireysel spor",
        "en": "individual sport"
      },
      {
        "tr": "meraklı",
        "en": "keen on"
      },
      {
        "tr": "nazik",
        "en": "kind"
      },
      {
        "tr": "en son",
        "en": "latest"
      },
      {
        "tr": "yüksek sesli",
        "en": "loud"
      },
      {
        "tr": "aşağı yukarı",
        "en": "more or less"
      },
      {
        "tr": "çoğu zaman",
        "en": "most of the time"
      },
      {
        "tr": "çoğunlukla",
        "en": "mostly"
      },
      {
        "tr": "ulusal",
        "en": "national"
      },
      {
        "tr": "olmaz, asla",
        "en": "no way"
      },
      {
        "tr": "vatansever",
        "en": "patriot"
      },
      {
        "tr": "kişisel görüş",
        "en": "personal opinion"
      },
      {
        "tr": "tercih etmek",
        "en": "prefer"
      },
      {
        "tr": "nadiren",
        "en": "rarely"
      },
      {
        "tr": "ulaşmak",
        "en": "reach"
      },
      {
        "tr": "tavsiye etmek",
        "en": "recommend"
      },
      {
        "tr": "rahatlatıcı",
        "en": "relaxing"
      },
      {
        "tr": "dinlenmek",
        "en": "rest"
      },
      {
        "tr": "aynı",
        "en": "same"
      },
      {
        "tr": "bilim kurgu",
        "en": "science fiction"
      },
      {
        "tr": "seyrek",
        "en": "seldom"
      },
      {
        "tr": "göndermek",
        "en": "send"
      },
      {
        "tr": "şık kıyafetler",
        "en": "smart clothes"
      },
      {
        "tr": "züppe",
        "en": "snob"
      },
      {
        "tr": "bazen",
        "en": "sometimes"
      },
      {
        "tr": "zaman geçirmek",
        "en": "spend time"
      },
      {
        "tr": "önermek",
        "en": "suggest"
      },
      {
        "tr": "hakkında konuşmak",
        "en": "talk about"
      },
      {
        "tr": "takım sporu",
        "en": "team sport"
      },
      {
        "tr": "gençler",
        "en": "teenagers"
      },
      {
        "tr": "müthiş",
        "en": "terrific"
      },
      {
        "tr": "mesaj atmak",
        "en": "text"
      },
      {
        "tr": "bu yüzden",
        "en": "that’s why"
      },
      {
        "tr": "şeyler",
        "en": "things"
      },
      {
        "tr": "düşünmek",
        "en": "think"
      },
      {
        "tr": "bilet",
        "en": "ticket"
      },
      {
        "tr": "dürüst olmak gerekirse",
        "en": "to be honest"
      },
      {
        "tr": "sahada antrenman yapmak",
        "en": "train in the field"
      },
      {
        "tr": "moda olan",
        "en": "trendy"
      },
      {
        "tr": "tür",
        "en": "type"
      },
      {
        "tr": "dayanılmaz",
        "en": "unbearable"
      },
      {
        "tr": "genellikle",
        "en": "usually"
      },
      {
        "tr": "giymek",
        "en": "wear"
      },
      {
        "tr": "hava durumu",
        "en": "weather"
      },
      {
        "tr": "hafta sonu",
        "en": "weekend"
      },
      {
        "tr": "ne dersin, peki ya…",
        "en": "what about"
      },
      {
        "tr": "ne tür",
        "en": "what kind of"
      },
      {
        "tr": "ne tür",
        "en": "what type of"
      },
      {
        "tr": "iken",
        "en": "while"
      },
      {
        "tr": "spor yapmak",
        "en": "work out"
      },
      {
        "tr": "gençlik hikayeleri",
        "en": "youth stories"
      }
    ]
  },
  {
    "id": "src-the-internet",
    "title": "The Internet",
    "emoji": "🔬",
    "category": "School",
    "desc": "The Internet — imported from topicsource/the-internet.txt.",
    "words": [
      {
        "tr": "hesap",
        "en": "account"
      },
      {
        "tr": "bağımlı",
        "en": "addict"
      },
      {
        "tr": "yetişkin",
        "en": "adult"
      },
      {
        "tr": "avantaj",
        "en": "advantage"
      },
      {
        "tr": "tavsiye etmek",
        "en": "advise"
      },
      {
        "tr": "etkilemek",
        "en": "affect"
      },
      {
        "tr": "arasında",
        "en": "among"
      },
      {
        "tr": "uygulama",
        "en": "application"
      },
      {
        "tr": "ek dosya",
        "en": "attachment"
      },
      {
        "tr": "yetkililer",
        "en": "authorities"
      },
      {
        "tr": "internet bağımlısı olmak",
        "en": "become internet addict"
      },
      {
        "tr": "ilişkiyi bitirmek",
        "en": "break relationship"
      },
      {
        "tr": "kırık, bozuk",
        "en": "broken"
      },
      {
        "tr": "göz atmak",
        "en": "browse"
      },
      {
        "tr": "tarayıcı",
        "en": "browser"
      },
      {
        "tr": "meşgul",
        "en": "busy"
      },
      {
        "tr": "satın almak",
        "en": "buy"
      },
      {
        "tr": "yanlışlıkla",
        "en": "by mistake"
      },
      {
        "tr": "dikkatli",
        "en": "careful"
      },
      {
        "tr": "sebep olmak",
        "en": "cause"
      },
      {
        "tr": "cep telefonu",
        "en": "cell phone"
      },
      {
        "tr": "değiştirmek",
        "en": "change"
      },
      {
        "tr": "canlı sohbet etmek",
        "en": "chat live"
      },
      {
        "tr": "en ucuz",
        "en": "cheapest"
      },
      {
        "tr": "kabloyu kontrol etmek",
        "en": "check cable"
      },
      {
        "tr": "yorum yapmak",
        "en": "comment"
      },
      {
        "tr": "bir gönderiye yorum yapmak",
        "en": "comment a post"
      },
      {
        "tr": "iletişim kurmak",
        "en": "communicate"
      },
      {
        "tr": "onaylamak",
        "en": "confirm"
      },
      {
        "tr": "bağlanmak",
        "en": "connect"
      },
      {
        "tr": "bağlantı",
        "en": "connection"
      },
      {
        "tr": "iletişime geçmek",
        "en": "contact"
      },
      {
        "tr": "konuşma",
        "en": "conversation"
      },
      {
        "tr": "içerik oluşturmak",
        "en": "create content"
      },
      {
        "tr": "tehlikeli",
        "en": "dangerous"
      },
      {
        "tr": "silmek",
        "en": "delete"
      },
      {
        "tr": "detay",
        "en": "detail"
      },
      {
        "tr": "sosyal becerileri geliştirmek",
        "en": "develop social skills"
      },
      {
        "tr": "dezavantaj",
        "en": "disadvantage"
      },
      {
        "tr": "araştırma yapmak",
        "en": "do research"
      },
      {
        "tr": "indirmek",
        "en": "download"
      },
      {
        "tr": "en kolay",
        "en": "easiest"
      },
      {
        "tr": "yalnız hissetmek",
        "en": "feel isolated"
      },
      {
        "tr": "bilgi almak",
        "en": "get information"
      },
      {
        "tr": "zarar vermek",
        "en": "give harm"
      },
      {
        "tr": "çevrimiçi olmak",
        "en": "go online"
      },
      {
        "tr": "zararlı",
        "en": "harmful"
      },
      {
        "tr": "saat",
        "en": "hour"
      },
      {
        "tr": "görmezden gelmek",
        "en": "ignore"
      },
      {
        "tr": "önemli",
        "en": "important"
      },
      {
        "tr": "anlık mesajlaşma",
        "en": "instant messaging"
      },
      {
        "tr": "…ile iletişimde kalmak",
        "en": "keep in touch with"
      },
      {
        "tr": "yorum bırakmak",
        "en": "leave a comment"
      },
      {
        "tr": "mektup",
        "en": "letter"
      },
      {
        "tr": "giriş yapmak",
        "en": "log in"
      },
      {
        "tr": "çıkış yapmak",
        "en": "log off"
      },
      {
        "tr": "hayatı zorlaştırmak",
        "en": "make life difficult"
      },
      {
        "tr": "yeni arkadaşlar edinmek",
        "en": "make new friends"
      },
      {
        "tr": "araştırma yapmak",
        "en": "make research"
      },
      {
        "tr": "anlamına gelmek, demek istemek",
        "en": "mean"
      },
      {
        "tr": "yabancılarla tanışmak",
        "en": "meet strangers"
      },
      {
        "tr": "üye",
        "en": "member"
      },
      {
        "tr": "diğerleri",
        "en": "others"
      },
      {
        "tr": "şifre",
        "en": "password"
      },
      {
        "tr": "yüzde",
        "en": "percent"
      },
      {
        "tr": "telefon görüşmesi",
        "en": "phone call"
      },
      {
        "tr": "tercih etmek",
        "en": "prefer"
      },
      {
        "tr": "kaydolmak",
        "en": "register"
      },
      {
        "tr": "hatırlamak",
        "en": "remember"
      },
      {
        "tr": "yanıt vermek",
        "en": "reply"
      },
      {
        "tr": "sıfırlamak",
        "en": "reset"
      },
      {
        "tr": "güvenlik",
        "en": "safety"
      },
      {
        "tr": "ekran",
        "en": "screen"
      },
      {
        "tr": "arama motoru",
        "en": "search engine"
      },
      {
        "tr": "gizli kelime",
        "en": "secret word"
      },
      {
        "tr": "göndermek",
        "en": "send"
      },
      {
        "tr": "kişisel bilgileri paylaşmak",
        "en": "share personal information"
      },
      {
        "tr": "kayıt olmak",
        "en": "sign up"
      },
      {
        "tr": "bunu duyduğuma üzüldüm",
        "en": "sorry to hear that"
      },
      {
        "tr": "kulağa hoş geliyor",
        "en": "sounds good"
      },
      {
        "tr": "çok fazla zaman harcamak",
        "en": "spend too much time"
      },
      {
        "tr": "depolamak",
        "en": "store"
      },
      {
        "tr": "internette gezinmek",
        "en": "surf on internet"
      },
      {
        "tr": "önlem almak",
        "en": "take precaution"
      },
      {
        "tr": "ergen",
        "en": "teen"
      },
      {
        "tr": "genç",
        "en": "teenager"
      },
      {
        "tr": "söylemek",
        "en": "tell"
      },
      {
        "tr": "yazmak, metin",
        "en": "text"
      },
      {
        "tr": "kısa mesaj yazmak",
        "en": "text message"
      },
      {
        "tr": "yüklemek",
        "en": "upload"
      },
      {
        "tr": "resim yüklemek",
        "en": "upload pictures"
      },
      {
        "tr": "faydalı",
        "en": "useful"
      },
      {
        "tr": "faydalı amaç",
        "en": "useful purpose"
      },
      {
        "tr": "kullanıcı adı",
        "en": "username"
      },
      {
        "tr": "aracılığıyla",
        "en": "via"
      },
      {
        "tr": "istemek",
        "en": "want"
      },
      {
        "tr": "yol",
        "en": "way"
      },
      {
        "tr": "iletişim yolları",
        "en": "ways of communication"
      }
    ]
  },
  {
    "id": "src-tourism",
    "title": "Tourism",
    "emoji": "🌿",
    "category": "Nature",
    "desc": "Tourism — imported from topicsource/tourism.txt.",
    "words": [
      {
        "tr": "konaklama",
        "en": "accommodation"
      },
      {
        "tr": "her şey dahil",
        "en": "all inclusive"
      },
      {
        "tr": "her şey dahil oteller",
        "en": "all inclusive hotels"
      },
      {
        "tr": "harika",
        "en": "amazing"
      },
      {
        "tr": "amfitiyatro",
        "en": "amphitheatre"
      },
      {
        "tr": "antik",
        "en": "ancient"
      },
      {
        "tr": "antik şehirler",
        "en": "ancient cities"
      },
      {
        "tr": "mimari",
        "en": "architecture"
      },
      {
        "tr": "kül",
        "en": "ash"
      },
      {
        "tr": "cazibe merkezi",
        "en": "attraction"
      },
      {
        "tr": "çekici",
        "en": "attractive"
      },
      {
        "tr": "çekici",
        "en": "attractive"
      },
      {
        "tr": "güzel",
        "en": "beautiful"
      },
      {
        "tr": "oda ve kahvaltı",
        "en": "bed and breakfast"
      },
      {
        "tr": "bulunmuş olmak",
        "en": "been to"
      },
      {
        "tr": "başlamak",
        "en": "begin"
      },
      {
        "tr": "büyük",
        "en": "big"
      },
      {
        "tr": "rezervasyon yapmak",
        "en": "book"
      },
      {
        "tr": "oda ayırtmak",
        "en": "book a room"
      },
      {
        "tr": "her ikisi",
        "en": "both"
      },
      {
        "tr": "inşa etmek",
        "en": "build"
      },
      {
        "tr": "bina",
        "en": "building"
      },
      {
        "tr": "meşgul",
        "en": "busy"
      },
      {
        "tr": "kalabalık cadde",
        "en": "busy street"
      },
      {
        "tr": "hediyelik eşya almak",
        "en": "buy souvenir"
      },
      {
        "tr": "ucuz",
        "en": "cheap"
      },
      {
        "tr": "temiz",
        "en": "clean"
      },
      {
        "tr": "rahat",
        "en": "comfortable"
      },
      {
        "tr": "karşılaştırmak",
        "en": "compare"
      },
      {
        "tr": "konser",
        "en": "concert"
      },
      {
        "tr": "ülke, kırsal bölge",
        "en": "country"
      },
      {
        "tr": "kırsal bölge",
        "en": "countryside"
      },
      {
        "tr": "kaplamak",
        "en": "cover"
      },
      {
        "tr": "kalabalık",
        "en": "crowded"
      },
      {
        "tr": "gemi seyahati",
        "en": "cruise"
      },
      {
        "tr": "varış yeri",
        "en": "destination"
      },
      {
        "tr": "detay",
        "en": "detail"
      },
      {
        "tr": "ölmek",
        "en": "die"
      },
      {
        "tr": "farklı",
        "en": "different"
      },
      {
        "tr": "kirli",
        "en": "dirty"
      },
      {
        "tr": "sıkıcı",
        "en": "dull"
      },
      {
        "tr": "deprem",
        "en": "earthquake"
      },
      {
        "tr": "yolculuktan keyif almak",
        "en": "enjoy trip"
      },
      {
        "tr": "keyifli",
        "en": "enjoyable"
      },
      {
        "tr": "eğlendirmek",
        "en": "entertain"
      },
      {
        "tr": "eğlence",
        "en": "entertainment"
      },
      {
        "tr": "kaçmak",
        "en": "escape"
      },
      {
        "tr": "heyecanlı",
        "en": "excited"
      },
      {
        "tr": "keşif gezisi",
        "en": "expedition"
      },
      {
        "tr": "pahalı",
        "en": "expensive"
      },
      {
        "tr": "ünlü",
        "en": "famous"
      },
      {
        "tr": "ünlü meydan",
        "en": "famous square"
      },
      {
        "tr": "büyüleyici",
        "en": "fascinating"
      },
      {
        "tr": "hissetmek",
        "en": "feel"
      },
      {
        "tr": "çeşme",
        "en": "fountain"
      },
      {
        "tr": "altın kumsallar",
        "en": "golden beaches"
      },
      {
        "tr": "muhteşem",
        "en": "gorgeous"
      },
      {
        "tr": "tahmin etmek",
        "en": "guess"
      },
      {
        "tr": "olmak",
        "en": "happen"
      },
      {
        "tr": "dinlenmek",
        "en": "have a rest"
      },
      {
        "tr": "miras",
        "en": "heritage"
      },
      {
        "tr": "tarihi alan",
        "en": "historic site"
      },
      {
        "tr": "tarihi",
        "en": "historical"
      },
      {
        "tr": "tarih",
        "en": "history"
      },
      {
        "tr": "umut",
        "en": "hope"
      },
      {
        "tr": "misafirperver",
        "en": "hospitable"
      },
      {
        "tr": "ne kadar süre",
        "en": "how long"
      },
      {
        "tr": "kocaman",
        "en": "huge"
      },
      {
        "tr": "hayal etmek",
        "en": "imagine"
      },
      {
        "tr": "benim fikrimce",
        "en": "in my opinion"
      },
      {
        "tr": "inanılmaz",
        "en": "incredible"
      },
      {
        "tr": "ilginç şeyler",
        "en": "interesting things"
      },
      {
        "tr": "davet etmek",
        "en": "invite"
      },
      {
        "tr": "ada",
        "en": "island"
      },
      {
        "tr": "tutmak",
        "en": "keep"
      },
      {
        "tr": "nazik",
        "en": "kind"
      },
      {
        "tr": "öğrenmek",
        "en": "learn"
      },
      {
        "tr": "ayrılmak",
        "en": "leave"
      },
      {
        "tr": "yerel yemek",
        "en": "local dish"
      },
      {
        "tr": "konum",
        "en": "location"
      },
      {
        "tr": "sevimli",
        "en": "lovely"
      },
      {
        "tr": "güneşin altında uzanmak",
        "en": "lying in the sun"
      },
      {
        "tr": "dilek tutmak",
        "en": "make wish"
      },
      {
        "tr": "gizemli",
        "en": "mysterious"
      },
      {
        "tr": "doğal",
        "en": "natural"
      },
      {
        "tr": "gürültülü",
        "en": "noisy"
      },
      {
        "tr": "teklif etmek",
        "en": "offer"
      },
      {
        "tr": "eski bina",
        "en": "old building"
      },
      {
        "tr": "fikir",
        "en": "opinion"
      },
      {
        "tr": "organize etmek",
        "en": "organize"
      },
      {
        "tr": "tablo",
        "en": "painting"
      },
      {
        "tr": "saray",
        "en": "palace"
      },
      {
        "tr": "mükemmel",
        "en": "perfect"
      },
      {
        "tr": "yer",
        "en": "place"
      },
      {
        "tr": "liman şehri",
        "en": "port city"
      },
      {
        "tr": "halka açık",
        "en": "public"
      },
      {
        "tr": "sessiz",
        "en": "quiet"
      },
      {
        "tr": "hazır",
        "en": "ready"
      },
      {
        "tr": "rahatlatıcı",
        "en": "relaxing"
      },
      {
        "tr": "dini kutlama",
        "en": "religious celebration"
      },
      {
        "tr": "tatil köyü",
        "en": "resort"
      },
      {
        "tr": "zengin",
        "en": "rich"
      },
      {
        "tr": "kırsal",
        "en": "rural"
      },
      {
        "tr": "yelken açmak",
        "en": "sail"
      },
      {
        "tr": "okul gezisi",
        "en": "school trip"
      },
      {
        "tr": "gezi turu",
        "en": "sightseeing tour"
      },
      {
        "tr": "toprak",
        "en": "soil"
      },
      {
        "tr": "hediyelik eşya",
        "en": "souvenir"
      },
      {
        "tr": "harcamak",
        "en": "spend"
      },
      {
        "tr": "meydan",
        "en": "square"
      },
      {
        "tr": "kalmak",
        "en": "stay"
      },
      {
        "tr": "güneşlenmek",
        "en": "sunbathe"
      },
      {
        "tr": "tatmak",
        "en": "taste"
      },
      {
        "tr": "yerel yemekleri tatmak",
        "en": "taste local dishes"
      },
      {
        "tr": "geleneği öğretmek",
        "en": "teach tradition"
      },
      {
        "tr": "söylemek",
        "en": "tell"
      },
      {
        "tr": "tapınak",
        "en": "temple"
      },
      {
        "tr": "korkunç",
        "en": "terrible"
      },
      {
        "tr": "tiyatro",
        "en": "theatre"
      },
      {
        "tr": "yorucu",
        "en": "tiring"
      },
      {
        "tr": "bana göre",
        "en": "to me"
      },
      {
        "tr": "birlikte",
        "en": "together"
      },
      {
        "tr": "turistik cazibe merkezi",
        "en": "tourist attraction"
      },
      {
        "tr": "kasaba",
        "en": "town"
      },
      {
        "tr": "gelenek",
        "en": "tradition"
      },
      {
        "tr": "geleneksel",
        "en": "traditional"
      },
      {
        "tr": "geleneksel yemek",
        "en": "traditional dish"
      },
      {
        "tr": "ulaşım",
        "en": "transportation"
      },
      {
        "tr": "seyahat etmek",
        "en": "travel"
      },
      {
        "tr": "gezi",
        "en": "trip"
      },
      {
        "tr": "denemek",
        "en": "try"
      },
      {
        "tr": "inanılmaz",
        "en": "unbelievable"
      },
      {
        "tr": "kentsel",
        "en": "urban"
      },
      {
        "tr": "su boru hattı",
        "en": "water pipeline"
      },
      {
        "tr": "hava durumu",
        "en": "weather"
      },
      {
        "tr": "hangi",
        "en": "which"
      },
      {
        "tr": "vahşi yaşam",
        "en": "wild life"
      },
      {
        "tr": "dünya",
        "en": "world"
      },
      {
        "tr": "tercih etmek",
        "en": "would rather"
      }
    ]
  },
  {
    "id": "src-appearance-and-personality",
    "title": "Appearance And Personality",
    "emoji": "🏠",
    "category": "Daily Life",
    "desc": "Appearance And Personality — imported from topicsource/appearance-and-personality.txt.",
    "words": [
      {
        "tr": "neşeli",
        "en": "cheerful"
      },
      {
        "tr": "zeki",
        "en": "clever"
      },
      {
        "tr": "yaratıcı",
        "en": "creative"
      },
      {
        "tr": "uyumlu",
        "en": "easygoing"
      },
      {
        "tr": "adil",
        "en": "fair"
      },
      {
        "tr": "unutkan",
        "en": "forgetful"
      },
      {
        "tr": "komik",
        "en": "funny"
      },
      {
        "tr": "cömert",
        "en": "generous"
      },
      {
        "tr": "çalışkan",
        "en": "hardworking"
      },
      {
        "tr": "yardımsever",
        "en": "helpful"
      },
      {
        "tr": "dürüst",
        "en": "honest"
      },
      {
        "tr": "iyi kalpli",
        "en": "kind"
      },
      {
        "tr": "dışa dönük",
        "en": "outgoing"
      },
      {
        "tr": "sabırlı",
        "en": "patient"
      },
      {
        "tr": "kibar, nazik",
        "en": "polite"
      },
      {
        "tr": "popüler",
        "en": "popular"
      },
      {
        "tr": "dakik",
        "en": "punctual"
      },
      {
        "tr": "bencil",
        "en": "selfish"
      },
      {
        "tr": "akıllı",
        "en": "smart"
      },
      {
        "tr": "inatçı",
        "en": "stubborn"
      },
      {
        "tr": "konuşkan",
        "en": "talkative"
      },
      {
        "tr": "düşünceli",
        "en": "thoughtful"
      },
      {
        "tr": "hoşgörülü",
        "en": "tolerant"
      },
      {
        "tr": "yaş",
        "en": "age"
      },
      {
        "tr": "çekici, cazibeli",
        "en": "attractive"
      },
      {
        "tr": "sakal",
        "en": "beard"
      },
      {
        "tr": "güzel",
        "en": "beautiful"
      },
      {
        "tr": "sarı, sarışın",
        "en": "blonde"
      },
      {
        "tr": "kıvırcık",
        "en": "curly"
      },
      {
        "tr": "tatlı",
        "en": "cute"
      },
      {
        "tr": "koyu",
        "en": "dark"
      },
      {
        "tr": "gözlük",
        "en": "eye-glasses"
      },
      {
        "tr": "kumral",
        "en": "fair"
      },
      {
        "tr": "şişman",
        "en": "fat"
      },
      {
        "tr": "benek,çil",
        "en": "freckle"
      },
      {
        "tr": "beyaz, gri saç",
        "en": "grey hair"
      },
      {
        "tr": "iyi görünümlü",
        "en": "good looking"
      },
      {
        "tr": "yakışıklı",
        "en": "handsome"
      },
      {
        "tr": "ela",
        "en": "hazel"
      },
      {
        "tr": "baş örtüsü",
        "en": "headscarf"
      },
      {
        "tr": "uzun",
        "en": "long"
      },
      {
        "tr": "orta yaşlı",
        "en": "middle aged"
      },
      {
        "tr": "bıyık",
        "en": "moustache"
      },
      {
        "tr": "kas",
        "en": "muscle"
      },
      {
        "tr": "orta boylu",
        "en": "of medium height"
      },
      {
        "tr": "orta kilolu",
        "en": "of medium weight"
      },
      {
        "tr": "yaşlı",
        "en": "old"
      },
      {
        "tr": "aşırı kilolu",
        "en": "overweight"
      },
      {
        "tr": "balık etli,tombul",
        "en": "plump"
      },
      {
        "tr": "kızıl saç",
        "en": "red hair"
      },
      {
        "tr": "kısa",
        "en": "short"
      },
      {
        "tr": "ince",
        "en": "slim"
      },
      {
        "tr": "küçük",
        "en": "small"
      },
      {
        "tr": "düz",
        "en": "straight"
      },
      {
        "tr": "güçlü",
        "en": "strong"
      },
      {
        "tr": "tatlı",
        "en": "sweet"
      },
      {
        "tr": "uzun",
        "en": "tall"
      },
      {
        "tr": "zayıf",
        "en": "thin"
      },
      {
        "tr": "çirkin",
        "en": "ugly"
      },
      {
        "tr": "dalgalı",
        "en": "wavy"
      },
      {
        "tr": "zayıf (güçsüz)",
        "en": "weak"
      },
      {
        "tr": "yapılı,kaslı",
        "en": "well built"
      },
      {
        "tr": "genç, (yaşça) küçük",
        "en": "young"
      },
      {
        "tr": "geç kalmak",
        "en": "be late"
      },
      {
        "tr": "hediyeler almak",
        "en": "buy gifts"
      },
      {
        "tr": "ünlü",
        "en": "celebrity"
      },
      {
        "tr": "tarif etmek",
        "en": "describe"
      },
      {
        "tr": "umursamamak",
        "en": "don’t care"
      },
      {
        "tr": "aile bireyi",
        "en": "family member"
      },
      {
        "tr": "arkadaş",
        "en": "friend"
      },
      {
        "tr": "… ile iyi anlaşmak",
        "en": "get along with…"
      },
      {
        "tr": "yüksek notlar almak",
        "en": "get high marks"
      },
      {
        "tr": "geçinmek",
        "en": "get on well"
      },
      {
        "tr": "zamanında gitmek",
        "en": "go on time"
      },
      {
        "tr": "arkadaşlarla takılmak",
        "en": "hang out with friends"
      },
      {
        "tr": "sahip olmak",
        "en": "have got / has got"
      },
      {
        "tr": "yardım etmek",
        "en": "help"
      },
      {
        "tr": "görünmek",
        "en": "look like"
      },
      {
        "tr": "şanslı",
        "en": "lucky"
      },
      {
        "tr": "güzel görünmek",
        "en": "look beautiful"
      },
      {
        "tr": "sabırla",
        "en": "patiently"
      },
      {
        "tr": "akraba",
        "en": "relative"
      },
      {
        "tr": "yakışıklı görünmek",
        "en": "look handsome"
      },
      {
        "tr": "raflara uzanmak",
        "en": "reach shelves"
      },
      {
        "tr": "paylaşmak",
        "en": "share"
      },
      {
        "tr": "evde kalmak",
        "en": "stay at home"
      },
      {
        "tr": "destek olmak",
        "en": "support"
      },
      {
        "tr": "yalan söylemek",
        "en": "tell lie"
      },
      {
        "tr": "doğruyu söylemek",
        "en": "tell the truth"
      },
      {
        "tr": "başörtüsü takmak",
        "en": "wear headscarf"
      }
    ]
  },
  {
    "id": "src-biographies",
    "title": "Biographies",
    "emoji": "🏠",
    "category": "Daily Life",
    "desc": "Biographies — imported from topicsource/biographies.txt.",
    "words": [
      {
        "tr": "başarı",
        "en": "achievement"
      },
      {
        "tr": "yalnız",
        "en": "alone"
      },
      {
        "tr": "katılmak",
        "en": "attend"
      },
      {
        "tr": "ödül",
        "en": "award"
      },
      {
        "tr": "doğmak",
        "en": "be born"
      },
      {
        "tr": "olmak",
        "en": "become"
      },
      {
        "tr": "başlamak",
        "en": "begin"
      },
      {
        "tr": "hayat öyküsü, biyografi",
        "en": "biography"
      },
      {
        "tr": "doğum",
        "en": "birth"
      },
      {
        "tr": "parlak zekalı",
        "en": "brilliant"
      },
      {
        "tr": "bronz",
        "en": "bronze"
      },
      {
        "tr": "kariyer",
        "en": "career"
      },
      {
        "tr": "şampiyonluk",
        "en": "championship"
      },
      {
        "tr": "değiştirmek",
        "en": "change"
      },
      {
        "tr": "çocukluk",
        "en": "childhood"
      },
      {
        "tr": "rekabet etmek",
        "en": "compete"
      },
      {
        "tr": "bestelemek",
        "en": "compose"
      },
      {
        "tr": "besteci",
        "en": "composer"
      },
      {
        "tr": "yürütmek",
        "en": "conduct"
      },
      {
        "tr": "meydana getirmek",
        "en": "create"
      },
      {
        "tr": "doğum tarihi",
        "en": "date of birth"
      },
      {
        "tr": "karar vermek",
        "en": "decide"
      },
      {
        "tr": "karar vermek",
        "en": "decide"
      },
      {
        "tr": "tasarlamak",
        "en": "design"
      },
      {
        "tr": "geliştirmek",
        "en": "develop"
      },
      {
        "tr": "ölmek",
        "en": "die"
      },
      {
        "tr": "keşfetmek",
        "en": "discover"
      },
      {
        "tr": "kaşif",
        "en": "discoverer"
      },
      {
        "tr": "eğitim",
        "en": "education"
      },
      {
        "tr": "seçmek",
        "en": "elect"
      },
      {
        "tr": "elektrik ampulü",
        "en": "electric bulb"
      },
      {
        "tr": "kurmak",
        "en": "establish"
      },
      {
        "tr": "aile hayatı",
        "en": "family life"
      },
      {
        "tr": "ünlü",
        "en": "famous"
      },
      {
        "tr": "bulmak",
        "en": "find"
      },
      {
        "tr": "yerine getirmek",
        "en": "fulfill"
      },
      {
        "tr": "elde etmek",
        "en": "gain"
      },
      {
        "tr": "ödül almak",
        "en": "get a prize"
      },
      {
        "tr": "nişanlanmak",
        "en": "get engaged"
      },
      {
        "tr": "evlenmek",
        "en": "get married"
      },
      {
        "tr": "emekli olmak",
        "en": "get retired"
      },
      {
        "tr": "altın madalya",
        "en": "gold medal"
      },
      {
        "tr": "mezun olmak",
        "en": "graduate"
      },
      {
        "tr": "yer çekimi",
        "en": "gravity"
      },
      {
        "tr": "büyümek, yetişmek",
        "en": "grow up"
      },
      {
        "tr": "olmak",
        "en": "happen"
      },
      {
        "tr": "çocuk sahibi olmak",
        "en": "have a child"
      },
      {
        "tr": "tecrübesi olmak",
        "en": "have experience"
      },
      {
        "tr": "icat etmek",
        "en": "invent"
      },
      {
        "tr": "mucit",
        "en": "inventor"
      },
      {
        "tr": "orduya katılmak",
        "en": "join the army"
      },
      {
        "tr": "öğrenmek",
        "en": "learn"
      },
      {
        "tr": "okulu bırakmak",
        "en": "leave school"
      },
      {
        "tr": "mektup",
        "en": "letter"
      },
      {
        "tr": "yaşamak",
        "en": "live"
      },
      {
        "tr": "kaybetmek",
        "en": "lose"
      },
      {
        "tr": "tanışmak",
        "en": "meet"
      },
      {
        "tr": "taşınmak",
        "en": "move"
      },
      {
        "tr": "ileri yaşlar",
        "en": "old ages"
      },
      {
        "tr": "sahip olmak",
        "en": "own"
      },
      {
        "tr": "vefat etmek",
        "en": "pass away"
      },
      {
        "tr": "vatansever",
        "en": "patriot"
      },
      {
        "tr": "yerine getirmek",
        "en": "perform"
      },
      {
        "tr": "kişisel hayat",
        "en": "personal life"
      },
      {
        "tr": "doğum yeri",
        "en": "place of birth"
      },
      {
        "tr": "ilkokul",
        "en": "primary school"
      },
      {
        "tr": "ödül",
        "en": "prize"
      },
      {
        "tr": "meslek",
        "en": "profession"
      },
      {
        "tr": "yetiştirmek, büyütmek",
        "en": "raise"
      },
      {
        "tr": "ulaşmak",
        "en": "reach"
      },
      {
        "tr": "diploma almak",
        "en": "receive diploma"
      },
      {
        "tr": "okul hayatı",
        "en": "school life"
      },
      {
        "tr": "bilim",
        "en": "science"
      },
      {
        "tr": "gümüş",
        "en": "silver"
      },
      {
        "tr": "asker",
        "en": "soldier"
      },
      {
        "tr": "evde kalmak",
        "en": "stay at home"
      },
      {
        "tr": "kalmak",
        "en": "stay"
      },
      {
        "tr": "bir okulda okumak",
        "en": "study"
      },
      {
        "tr": "başarı",
        "en": "success"
      },
      {
        "tr": "yer almak",
        "en": "take place"
      },
      {
        "tr": "öğretmek",
        "en": "teach"
      },
      {
        "tr": "kullanmak",
        "en": "use"
      },
      {
        "tr": "istemek",
        "en": "want"
      },
      {
        "tr": "kazanmak",
        "en": "win"
      }
    ]
  },
  {
    "id": "src-celebrations",
    "title": "Celebrations",
    "emoji": "🏠",
    "category": "Daily Life",
    "desc": "Celebrations — imported from topicsource/celebrations.txt.",
    "words": [
      {
        "tr": "birkaç (sayılabilen)",
        "en": "a few"
      },
      {
        "tr": "biraz, az (sayılamayan)",
        "en": "a little"
      },
      {
        "tr": "çok, birçok",
        "en": "a lot of"
      },
      {
        "tr": "daveti kabul etmek",
        "en": "accept the invitation"
      },
      {
        "tr": "hiç",
        "en": "any"
      },
      {
        "tr": "düzenlemek, ayarlamak",
        "en": "arrange"
      },
      {
        "tr": "daha fazla bilgi istemek",
        "en": "ask for more information"
      },
      {
        "tr": "üflemek",
        "en": "blow"
      },
      {
        "tr": "getirmek",
        "en": "bring"
      },
      {
        "tr": "meşgul",
        "en": "busy"
      },
      {
        "tr": "içecek satın almak",
        "en": "buy beverages"
      },
      {
        "tr": "aramak",
        "en": "call"
      },
      {
        "tr": "mumlar",
        "en": "candles"
      },
      {
        "tr": "kutlamalar",
        "en": "celebrations"
      },
      {
        "tr": "seçmek",
        "en": "choose"
      },
      {
        "tr": "yakın arkadaş",
        "en": "close friend"
      },
      {
        "tr": "yarışma",
        "en": "competition"
      },
      {
        "tr": "odayı süslemek",
        "en": "decorate room"
      },
      {
        "tr": "heyecanlı",
        "en": "excited"
      },
      {
        "tr": "veda partisi",
        "en": "farewell party"
      },
      {
        "tr": "kostüm partisi",
        "en": "fancy dress party"
      },
      {
        "tr": "unutmak",
        "en": "forget"
      },
      {
        "tr": "buzdolabı",
        "en": "fridge"
      },
      {
        "tr": "giyinmek",
        "en": "get dressed"
      },
      {
        "tr": "hediye",
        "en": "gift"
      },
      {
        "tr": "bahçe",
        "en": "garden"
      },
      {
        "tr": "misafir listesi",
        "en": "guest list"
      },
      {
        "tr": "parti yapmak",
        "en": "have a party"
      },
      {
        "tr": "kaç tane (sayılabilen)",
        "en": "how many"
      },
      {
        "tr": "ne kadar (sayılamayan)",
        "en": "how much"
      },
      {
        "tr": "ev sahibi",
        "en": "host"
      },
      {
        "tr": "umarım",
        "en": "I hope"
      },
      {
        "tr": "istemek",
        "en": "I would like to"
      },
      {
        "tr": "çok isterim",
        "en": "I would love to"
      },
      {
        "tr": "orada olacağım",
        "en": "I’ll be there"
      },
      {
        "tr": "korkarım yapamam",
        "en": "I’m afraid I can’t"
      },
      {
        "tr": "misafirleri davet etmek",
        "en": "invite guests"
      },
      {
        "tr": "ilgilenmek, bakmak",
        "en": "look after"
      },
      {
        "tr": "pasta yapmak",
        "en": "make cake"
      },
      {
        "tr": "çok (sayılabilen)",
        "en": "many"
      },
      {
        "tr": "çok (sayılamayan)",
        "en": "much"
      },
      {
        "tr": "taşınmak",
        "en": "move"
      },
      {
        "tr": "ihtiyaç duymak",
        "en": "need"
      },
      {
        "tr": "yeni yıl partisi",
        "en": "new year party"
      },
      {
        "tr": "öneri, teklif",
        "en": "offer"
      },
      {
        "tr": "düzenlemek",
        "en": "organize"
      },
      {
        "tr": "parti şapkası",
        "en": "party hat"
      },
      {
        "tr": "yer, mekan",
        "en": "place"
      },
      {
        "tr": "mümkün",
        "en": "possible"
      },
      {
        "tr": "yemek hazırlamak",
        "en": "prepare food"
      },
      {
        "tr": "hediye",
        "en": "present"
      },
      {
        "tr": "daveti reddetmek",
        "en": "refuse the invitation"
      },
      {
        "tr": "yapalım mı",
        "en": "shall we"
      },
      {
        "tr": "alışveriş listesi",
        "en": "shopping list"
      },
      {
        "tr": "biraz, bazı",
        "en": "some"
      },
      {
        "tr": "kulağa hoş geliyor",
        "en": "sounds nice"
      },
      {
        "tr": "öneri",
        "en": "suggestion"
      },
      {
        "tr": "söylemek, anlatmak",
        "en": "tell"
      },
      {
        "tr": "tema",
        "en": "theme"
      },
      {
        "tr": "var (çoğul)",
        "en": "there are"
      },
      {
        "tr": "yok (çoğul)",
        "en": "there aren’t"
      },
      {
        "tr": "var (tekil)",
        "en": "there is"
      },
      {
        "tr": "yok (tekil)",
        "en": "there isn’t"
      },
      {
        "tr": "parti vermek",
        "en": "throw party"
      },
      {
        "tr": "yapılacaklar listesi",
        "en": "to do list"
      },
      {
        "tr": "istemek",
        "en": "want"
      },
      {
        "tr": "giymek",
        "en": "wear"
      },
      {
        "tr": "peki ya, ne dersin",
        "en": "what about"
      },
      {
        "tr": "istemek",
        "en": "would like to"
      },
      {
        "tr": "ister misin",
        "en": "would you like"
      },
      {
        "tr": "hediye paketlemek",
        "en": "wrap present"
      }
    ]
  },
  {
    "id": "src-dreams",
    "title": "Dreams",
    "emoji": "🏠",
    "category": "Daily Life",
    "desc": "Dreams — imported from topicsource/dreams.txt.",
    "words": [
      {
        "tr": "konaklama",
        "en": "accommodation"
      },
      {
        "tr": "başarıya ulaşmak",
        "en": "achieve success"
      },
      {
        "tr": "evcil hayvan sahiplenmek",
        "en": "adopt a pet"
      },
      {
        "tr": "uzaylı",
        "en": "alien"
      },
      {
        "tr": "ödül",
        "en": "award"
      },
      {
        "tr": "mutlu olmak",
        "en": "be happy"
      },
      {
        "tr": "olmak",
        "en": "become"
      },
      {
        "tr": "ünlü olmak",
        "en": "become famous"
      },
      {
        "tr": "popüler olmak",
        "en": "become popular"
      },
      {
        "tr": "inanmak",
        "en": "believe"
      },
      {
        "tr": "daha iyi yer",
        "en": "better place"
      },
      {
        "tr": "parlak kariyer",
        "en": "brilliant career"
      },
      {
        "tr": "iş, ticaret",
        "en": "business"
      },
      {
        "tr": "ev satın almak",
        "en": "buy a house"
      },
      {
        "tr": "iş hayatı",
        "en": "career"
      },
      {
        "tr": "paket taşımak",
        "en": "carry packages"
      },
      {
        "tr": "beyinlerimizdeki çipler",
        "en": "chips in our brains"
      },
      {
        "tr": "iklim",
        "en": "climate"
      },
      {
        "tr": "iklim değişikliği",
        "en": "climate change"
      },
      {
        "tr": "gerçekleşmek",
        "en": "come true"
      },
      {
        "tr": "iletişim",
        "en": "communication"
      },
      {
        "tr": "kırsal alan",
        "en": "countryside"
      },
      {
        "tr": "geliştirmek",
        "en": "develop"
      },
      {
        "tr": "hastalık",
        "en": "disease"
      },
      {
        "tr": "felaket",
        "en": "disaster"
      },
      {
        "tr": "afetler",
        "en": "disasters"
      },
      {
        "tr": "hayal",
        "en": "dream"
      },
      {
        "tr": "hayalindeki iş",
        "en": "dream job"
      },
      {
        "tr": "çok para kazanmak",
        "en": "earn a lot of money"
      },
      {
        "tr": "eğitim",
        "en": "education"
      },
      {
        "tr": "çevre",
        "en": "environment"
      },
      {
        "tr": "çevreci",
        "en": "environmentalist"
      },
      {
        "tr": "yaşlılar için huzurevi kurmak",
        "en": "establish nursing home for elderly"
      },
      {
        "tr": "mükemmel",
        "en": "excellent"
      },
      {
        "tr": "nesli tükenmiş hayvanlar",
        "en": "extinct animals"
      },
      {
        "tr": "aile hayatı",
        "en": "family life"
      },
      {
        "tr": "ünlü",
        "en": "famous"
      },
      {
        "tr": "haplarla beslenmek",
        "en": "feed on pills"
      },
      {
        "tr": "iş bulmak",
        "en": "find a job"
      },
      {
        "tr": "çare bulmak",
        "en": "find cure"
      },
      {
        "tr": "kansere çare bulmak",
        "en": "find cures for cancer"
      },
      {
        "tr": "başka gezegenlerde  su bulmak",
        "en": "find  water on the other planets"
      },
      {
        "tr": "uçan arabalar",
        "en": "flying cars"
      },
      {
        "tr": "yiyecek hapları",
        "en": "food pills"
      },
      {
        "tr": "yabancı dil",
        "en": "foreign language"
      },
      {
        "tr": "dört yapraklı yonca",
        "en": "four-leaf clover"
      },
      {
        "tr": "evlenmek",
        "en": "get married"
      },
      {
        "tr": "üniversiteye gitmek",
        "en": "go to a university"
      },
      {
        "tr": "üniversiteden mezun olmak",
        "en": "graduate from university"
      },
      {
        "tr": "tahmin etmek",
        "en": "guess"
      },
      {
        "tr": "diploma almak",
        "en": "have a diploma"
      },
      {
        "tr": "uzun bir hayatı olmak",
        "en": "have a long life"
      },
      {
        "tr": "çocuk sahibi olmak",
        "en": "have children"
      },
      {
        "tr": "sağlık",
        "en": "health"
      },
      {
        "tr": "uzayda tatil",
        "en": "holiday in space"
      },
      {
        "tr": "katılıyorum",
        "en": "I agree"
      },
      {
        "tr": "katılmıyorum",
        "en": "I don’t agree"
      },
      {
        "tr": "öyle olduğunu düşünmüyorum",
        "en": "I don’t think so"
      },
      {
        "tr": "umarım",
        "en": "I hope"
      },
      {
        "tr": "umarım öyle olur",
        "en": "I hope so"
      },
      {
        "tr": "eğer",
        "en": "if"
      },
      {
        "tr": "hayal etmek",
        "en": "imagine"
      },
      {
        "tr": "gelecekte",
        "en": "in the future"
      },
      {
        "tr": "artmak / artırmak",
        "en": "increase"
      },
      {
        "tr": "icat",
        "en": "invention"
      },
      {
        "tr": "adalet",
        "en": "justice"
      },
      {
        "tr": "hayat",
        "en": "life"
      },
      {
        "tr": "şehirde yaşamak",
        "en": "live in a city"
      },
      {
        "tr": "köyde yaşamak",
        "en": "live in a village"
      },
      {
        "tr": "büyük uzay gemilerinde yaşamak",
        "en": "live in huge spaceships"
      },
      {
        "tr": "büyük değişiklikler",
        "en": "major changes"
      },
      {
        "tr": "tahminde bulunmak",
        "en": "make a guess"
      },
      {
        "tr": "yeni arkadaşlar edinmek",
        "en": "make new friends"
      },
      {
        "tr": "evlilik",
        "en": "marriage"
      },
      {
        "tr": "iş teklifini kaçırmak",
        "en": "miss the job offer"
      },
      {
        "tr": "büyük bir şehre taşınmak",
        "en": "move to a big city"
      },
      {
        "tr": "gerekli",
        "en": "necessary"
      },
      {
        "tr": "fikir",
        "en": "opinion"
      },
      {
        "tr": "yardım etkinlikleri düzenlemek",
        "en": "organise charity events"
      },
      {
        "tr": "vatanseverlik",
        "en": "patriotism"
      },
      {
        "tr": "barış",
        "en": "peace"
      },
      {
        "tr": "barışçıl",
        "en": "peaceful"
      },
      {
        "tr": "muhtemelen",
        "en": "perhaps"
      },
      {
        "tr": "kirlilik",
        "en": "pollution"
      },
      {
        "tr": "tahmin etmek",
        "en": "predict"
      },
      {
        "tr": "bazı felaketleri önlemek",
        "en": "prevent some disasters"
      },
      {
        "tr": "özel hayat",
        "en": "private life"
      },
      {
        "tr": "muhtemelen",
        "en": "probably"
      },
      {
        "tr": "üretmek",
        "en": "produce"
      },
      {
        "tr": "kilo almak",
        "en": "put on weight"
      },
      {
        "tr": "almak",
        "en": "receive"
      },
      {
        "tr": "mektup almak",
        "en": "receive a letter"
      },
      {
        "tr": "ödül almak",
        "en": "receive a prize"
      },
      {
        "tr": "burs kazanmak",
        "en": "receive a scholarship"
      },
      {
        "tr": "iyi haber almak",
        "en": "receive good news"
      },
      {
        "tr": "ilişkiler",
        "en": "relationships"
      },
      {
        "tr": "barışı temsil etmek",
        "en": "represent peace"
      },
      {
        "tr": "emekli",
        "en": "retired"
      },
      {
        "tr": "robot hizmetçiler",
        "en": "robot maids"
      },
      {
        "tr": "robot öğretmenler",
        "en": "robot teachers"
      },
      {
        "tr": "kendi işimi yürütmek",
        "en": "run my own business"
      },
      {
        "tr": "maaş",
        "en": "salary"
      },
      {
        "tr": "bilim",
        "en": "science"
      },
      {
        "tr": "sürücüsüz arabalar",
        "en": "selfdriving cars"
      },
      {
        "tr": "numara göstermek",
        "en": "show a trick"
      },
      {
        "tr": "akıllı cam",
        "en": "smart glass"
      },
      {
        "tr": "güneş enerjisi",
        "en": "solar energy"
      },
      {
        "tr": "uzay tatili",
        "en": "space holiday"
      },
      {
        "tr": "çalışmak / okumak",
        "en": "study"
      },
      {
        "tr": "başarı",
        "en": "success"
      },
      {
        "tr": "başarılı",
        "en": "successful"
      },
      {
        "tr": "sürdürülebilir enerji",
        "en": "sustainable energy"
      },
      {
        "tr": "üniversite sınavına girmek",
        "en": "take university exam"
      },
      {
        "tr": "yetenekli",
        "en": "talented"
      },
      {
        "tr": "sayesinde",
        "en": "thanks to"
      },
      {
        "tr": "ulaşım",
        "en": "transportation"
      },
      {
        "tr": "yurt dışına seyahat etmek",
        "en": "travel abroad"
      },
      {
        "tr": "dünyayı gezmek",
        "en": "travel around the world"
      },
      {
        "tr": "uzayda yolculuk etmek",
        "en": "travel in space"
      },
      {
        "tr": "zamanda yolculuk etmek",
        "en": "travel in time"
      },
      {
        "tr": "aya seyahat etmek",
        "en": "travel to the moon"
      },
      {
        "tr": "seyahat",
        "en": "travelling"
      },
      {
        "tr": "su altı şehirleri",
        "en": "underwater cities"
      },
      {
        "tr": "faydalı",
        "en": "useful"
      },
      {
        "tr": "savaş",
        "en": "war"
      },
      {
        "tr": "su kıtlığı",
        "en": "water shortage"
      },
      {
        "tr": "giyilebilir teknolojiler",
        "en": "wearable technologies"
      },
      {
        "tr": "ünlü / iyi bilinen",
        "en": "well known"
      },
      {
        "tr": "birçok madalya kazanmak",
        "en": "win a lot of medals"
      },
      {
        "tr": "çok çalışmak",
        "en": "work hard"
      },
      {
        "tr": "çalışma hayatı",
        "en": "working life"
      },
      {
        "tr": "dünya",
        "en": "world"
      },
      {
        "tr": "kitap yazmak",
        "en": "write a book"
      }
    ]
  },
  {
    "id": "src-environment",
    "title": "Environment",
    "emoji": "🌿",
    "category": "Nature",
    "desc": "Environment — imported from topicsource/environment.txt.",
    "words": [
      {
        "tr": "tarım",
        "en": "agriculture"
      },
      {
        "tr": "hava kirliliği",
        "en": "air pollution"
      },
      {
        "tr": "denge",
        "en": "balance"
      },
      {
        "tr": "farkında olmak",
        "en": "be aware"
      },
      {
        "tr": "araba egzozu",
        "en": "car exhaust"
      },
      {
        "tr": "kimyasal",
        "en": "chemical"
      },
      {
        "tr": "iklim değişikliği",
        "en": "climate change"
      },
      {
        "tr": "iklim",
        "en": "climate"
      },
      {
        "tr": "ağaçları kesmek",
        "en": "cut down trees"
      },
      {
        "tr": "bitkilerin ölümü",
        "en": "death of plants"
      },
      {
        "tr": "ormanları tahrip etmek",
        "en": "deforestation"
      },
      {
        "tr": "ormanları yok etmek",
        "en": "destroy forests"
      },
      {
        "tr": "doğanın dengesini bozmak",
        "en": "disturb the balance of nature"
      },
      {
        "tr": "çevre için bir şeyler yapmak",
        "en": "do something for the environment"
      },
      {
        "tr": "çevre dostu",
        "en": "eco-friendly"
      },
      {
        "tr": "nesli tehlikedeki hayvanlar",
        "en": "endangered animals"
      },
      {
        "tr": "enerji tasarruflu araçlar",
        "en": "energy-efficient vehicles"
      },
      {
        "tr": "çevre",
        "en": "environment"
      },
      {
        "tr": "egzoz gazı",
        "en": "exhaust"
      },
      {
        "tr": "fabrika",
        "en": "factory"
      },
      {
        "tr": "fosil yakıtları",
        "en": "fossil fuels"
      },
      {
        "tr": "gelecek",
        "en": "future"
      },
      {
        "tr": "buzullar",
        "en": "glaciers"
      },
      {
        "tr": "cam",
        "en": "glass"
      },
      {
        "tr": "küresel ısınma",
        "en": "global warming"
      },
      {
        "tr": "sera etkisi",
        "en": "greenhouse effect"
      },
      {
        "tr": "çevreye zarar vermek",
        "en": "harm the environment"
      },
      {
        "tr": "zararlı",
        "en": "harmful"
      },
      {
        "tr": "hayvanları avlamak",
        "en": "hunt animals"
      },
      {
        "tr": "artış",
        "en": "increase"
      },
      {
        "tr": "ısıdaki artış",
        "en": "increase in temperature"
      },
      {
        "tr": "endüstri",
        "en": "industry"
      },
      {
        "tr": "sokakları temiz tutmak",
        "en": "keep streets clean"
      },
      {
        "tr": "toprak kirliliği",
        "en": "land pollution"
      },
      {
        "tr": "sokaklara çöp atmak",
        "en": "litter the streets"
      },
      {
        "tr": "doğa",
        "en": "nature"
      },
      {
        "tr": "meydana gelmek",
        "en": "occur"
      },
      {
        "tr": "okyanus",
        "en": "ocean"
      },
      {
        "tr": "aşırı tüketmek",
        "en": "overuse"
      },
      {
        "tr": "kağıt",
        "en": "paper"
      },
      {
        "tr": "haşere ilaçları",
        "en": "pesticides"
      },
      {
        "tr": "plastik poşetler",
        "en": "plastic bags"
      },
      {
        "tr": "çevreyi kirletmek",
        "en": "pollute the environment"
      },
      {
        "tr": "kirlilik",
        "en": "pollution"
      },
      {
        "tr": "önlemek",
        "en": "prevent"
      },
      {
        "tr": "hayvanları korumak",
        "en": "protect animals"
      },
      {
        "tr": "toplu taşıma",
        "en": "public transportation"
      },
      {
        "tr": "şarj edilebilir",
        "en": "rechargeable"
      },
      {
        "tr": "nesneleri geri dönüştürmek",
        "en": "recycle materials"
      },
      {
        "tr": "geri dönüşüm",
        "en": "recycle"
      },
      {
        "tr": "trafik sıkışıklığını azaltmak",
        "en": "reduce traffic jam"
      },
      {
        "tr": "yenilenebilir enerji",
        "en": "renewable energy"
      },
      {
        "tr": "çevreye saygı göstermek",
        "en": "respect environment"
      },
      {
        "tr": "yeniden kullanmak",
        "en": "reuse"
      },
      {
        "tr": "enerji tasarrufu etmek",
        "en": "save energy"
      },
      {
        "tr": "deniz canlıları",
        "en": "sea creatures"
      },
      {
        "tr": "deniz seviyesi",
        "en": "sea level"
      },
      {
        "tr": "toprak",
        "en": "soil"
      },
      {
        "tr": "güneş enerjisi",
        "en": "solar energy"
      },
      {
        "tr": "bir kampanya başlatmak",
        "en": "start a campaign"
      },
      {
        "tr": "kampanyaları desteklemek",
        "en": "support campaigns"
      },
      {
        "tr": "Harekete geçmek",
        "en": "take action"
      },
      {
        "tr": "gerekli önlemleri almak",
        "en": "take necessary precautions"
      },
      {
        "tr": "tehdit etmek",
        "en": "threaten"
      },
      {
        "tr": "ışıkları kapatmak",
        "en": "turn off the lights"
      },
      {
        "tr": "çevre dostu ürünler kullanmak",
        "en": "use eco-friendly products"
      },
      {
        "tr": "elektriği boşa harcamak",
        "en": "waste electricity"
      },
      {
        "tr": "suyu boşa harcamak",
        "en": "waste water"
      },
      {
        "tr": "rüzgar enerjisi",
        "en": "wind energy"
      },
      {
        "tr": "dünya",
        "en": "world"
      }
    ]
  },
  {
    "id": "src-planets",
    "title": "Planets",
    "emoji": "🌿",
    "category": "Nature",
    "desc": "Planets — imported from topicsource/planets.txt.",
    "words": [
      {
        "tr": "yapay, insan yapımı",
        "en": "artificial"
      },
      {
        "tr": "küçük gezegen",
        "en": "asteroid"
      },
      {
        "tr": "astronotlar",
        "en": "astronauts"
      },
      {
        "tr": "atmosfer",
        "en": "atmosphere"
      },
      {
        "tr": "girişimde bulunmak",
        "en": "attempt"
      },
      {
        "tr": "ortalama",
        "en": "average"
      },
      {
        "tr": "kötü",
        "en": "bad"
      },
      {
        "tr": "güzel",
        "en": "beautiful"
      },
      {
        "tr": "büyük",
        "en": "big"
      },
      {
        "tr": "en büyük",
        "en": "biggest"
      },
      {
        "tr": "parlak",
        "en": "bright"
      },
      {
        "tr": "astronotları taşımak",
        "en": "carry astronauts"
      },
      {
        "tr": "yakın",
        "en": "close"
      },
      {
        "tr": "soğuk",
        "en": "cold"
      },
      {
        "tr": "kuyruklu yıldız",
        "en": "comet"
      },
      {
        "tr": "-den oluşmak",
        "en": "compose of"
      },
      {
        "tr": "serin",
        "en": "cool"
      },
      {
        "tr": "tasarlamak",
        "en": "design"
      },
      {
        "tr": "çap",
        "en": "diameter"
      },
      {
        "tr": "keşfetmek",
        "en": "discover"
      },
      {
        "tr": "uzaklık, mesafe",
        "en": "distance"
      },
      {
        "tr": "araştırma yapmak",
        "en": "do research"
      },
      {
        "tr": "toz",
        "en": "dust"
      },
      {
        "tr": "cüce gezegen",
        "en": "dwarf planet"
      },
      {
        "tr": "ekvator uzunluğu",
        "en": "equator length"
      },
      {
        "tr": "kanıt",
        "en": "evidence"
      },
      {
        "tr": "patlamak",
        "en": "explode"
      },
      {
        "tr": "keşfetmek, araştırmak",
        "en": "explore"
      },
      {
        "tr": "uzak",
        "en": "far"
      },
      {
        "tr": "hızlı",
        "en": "fast"
      },
      {
        "tr": "kanıt bulmak",
        "en": "find evidence"
      },
      {
        "tr": "galaksi, gökada",
        "en": "galaxy"
      },
      {
        "tr": "gaz",
        "en": "gas"
      },
      {
        "tr": "sıcak",
        "en": "hot"
      },
      {
        "tr": "icat etmek",
        "en": "invent"
      },
      {
        "tr": "inmek, iniş yapmak",
        "en": "land"
      },
      {
        "tr": "büyük, geniş",
        "en": "large"
      },
      {
        "tr": "mars’ta yaşam",
        "en": "life on mars"
      },
      {
        "tr": "az",
        "en": "little"
      },
      {
        "tr": "uzun",
        "en": "long"
      },
      {
        "tr": "üretmek",
        "en": "manufacture"
      },
      {
        "tr": "kütle",
        "en": "mass"
      },
      {
        "tr": "metal",
        "en": "metal"
      },
      {
        "tr": "göktaşı",
        "en": "meteoroid"
      },
      {
        "tr": "samanyolu",
        "en": "milky way"
      },
      {
        "tr": "görev",
        "en": "mission"
      },
      {
        "tr": "çok",
        "en": "much"
      },
      {
        "tr": "nesne",
        "en": "object"
      },
      {
        "tr": "gözlem yapmak",
        "en": "observe"
      },
      {
        "tr": "yörünge, çevresinde dönmek",
        "en": "orbit"
      },
      {
        "tr": "yörünge enkazları",
        "en": "orbital debris"
      },
      {
        "tr": "yörünge dönüş süresi",
        "en": "orbital period"
      },
      {
        "tr": "oksijen",
        "en": "oxygen"
      },
      {
        "tr": "yol, rota",
        "en": "path"
      },
      {
        "tr": "işaret etmek, elle göstermek",
        "en": "point"
      },
      {
        "tr": "keşif robotu",
        "en": "probe"
      },
      {
        "tr": "görsel sağlamak",
        "en": "provide image"
      },
      {
        "tr": "kızıl gezegen",
        "en": "red planet"
      },
      {
        "tr": "kurtarmak",
        "en": "rescue"
      },
      {
        "tr": "kaynaklar",
        "en": "resources"
      },
      {
        "tr": "güvenle dönmek",
        "en": "return safely"
      },
      {
        "tr": "kaya, taş",
        "en": "rock"
      },
      {
        "tr": "roketler",
        "en": "rockets"
      },
      {
        "tr": "uydu",
        "en": "satellite"
      },
      {
        "tr": "keşif robotu göndermek",
        "en": "send a probe"
      },
      {
        "tr": "bir kaç",
        "en": "several"
      },
      {
        "tr": "kısa",
        "en": "short"
      },
      {
        "tr": "hacim, büyüklük",
        "en": "size"
      },
      {
        "tr": "gökyüzü",
        "en": "sky"
      },
      {
        "tr": "yavaş",
        "en": "slow"
      },
      {
        "tr": "küçük",
        "en": "small"
      },
      {
        "tr": "güneş sistemi",
        "en": "solar system"
      },
      {
        "tr": "uzay oteli",
        "en": "space hotel"
      },
      {
        "tr": "uzay turizmi",
        "en": "space tourism"
      },
      {
        "tr": "uzay turisti",
        "en": "space tourist"
      },
      {
        "tr": "uzay seyahati",
        "en": "space travel"
      },
      {
        "tr": "adım atmak, üstüne basmak",
        "en": "step on"
      },
      {
        "tr": "başarılı olmak",
        "en": "succeed"
      },
      {
        "tr": "yüzey",
        "en": "surface"
      },
      {
        "tr": "etrafını çevrelemek",
        "en": "surround"
      },
      {
        "tr": "kuyruk",
        "en": "tail"
      },
      {
        "tr": "fotoğraf çekmek",
        "en": "take a photo"
      },
      {
        "tr": "uzayda seyahat etmek",
        "en": "travel in space"
      },
      {
        "tr": "evren",
        "en": "universe"
      },
      {
        "tr": "merak etmek",
        "en": "wonder"
      }
    ]
  },
  {
    "id": "src-public-buildings",
    "title": "Public Buildings",
    "emoji": "🔬",
    "category": "School",
    "desc": "Public Buildings — imported from topicsource/public-buildings.txt.",
    "words": [
      {
        "tr": "lunapark",
        "en": "amusement park"
      },
      {
        "tr": "resim galerisi",
        "en": "art gallery"
      },
      {
        "tr": "fırın",
        "en": "bakery"
      },
      {
        "tr": "kitapçı",
        "en": "book store"
      },
      {
        "tr": "kasap",
        "en": "butcher"
      },
      {
        "tr": "eczane",
        "en": "chemist’s"
      },
      {
        "tr": "belediye binası",
        "en": "city hall"
      },
      {
        "tr": "kafeterya",
        "en": "coffee shop"
      },
      {
        "tr": "çok katlı mağaza",
        "en": "departmant store"
      },
      {
        "tr": "sergi",
        "en": "exhibition"
      },
      {
        "tr": "itfaiye",
        "en": "fire station"
      },
      {
        "tr": "oyun mağazası",
        "en": "game store"
      },
      {
        "tr": "hediye mağazası",
        "en": "gift shop"
      },
      {
        "tr": "kaymakamlık",
        "en": "governorship"
      },
      {
        "tr": "bakkal, market",
        "en": "grocery"
      },
      {
        "tr": "sinema",
        "en": "movie theatre"
      },
      {
        "tr": "belediye ofisi",
        "en": "municipal office"
      },
      {
        "tr": "belediye",
        "en": "municpality"
      },
      {
        "tr": "müze",
        "en": "museum"
      },
      {
        "tr": "müzik mağazası",
        "en": "music store"
      },
      {
        "tr": "eczane",
        "en": "pharmacy"
      },
      {
        "tr": "polis memuru",
        "en": "police officer"
      },
      {
        "tr": "karakol",
        "en": "police station"
      },
      {
        "tr": "postane",
        "en": "post office"
      },
      {
        "tr": "alışveriş merkezi",
        "en": "shopping mall"
      },
      {
        "tr": "turist bilgi ofisi",
        "en": "tourist information office"
      },
      {
        "tr": "varmak",
        "en": "arrive"
      },
      {
        "tr": "gitmek",
        "en": "attend"
      },
      {
        "tr": "kitap ödünç almak",
        "en": "borrow book"
      },
      {
        "tr": "inşa etmek",
        "en": "build"
      },
      {
        "tr": "satın almak",
        "en": "buy"
      },
      {
        "tr": "meyve sebze satın almak",
        "en": "buy fruits and vegetables"
      },
      {
        "tr": "sohbet etmek",
        "en": "chat"
      },
      {
        "tr": "yıkmak",
        "en": "destroy"
      },
      {
        "tr": "bulmak",
        "en": "find"
      },
      {
        "tr": "ilaç bulmak",
        "en": "find medicine"
      },
      {
        "tr": "bilgi vermek",
        "en": "give information"
      },
      {
        "tr": "koşuya gitmek",
        "en": "go jogging"
      },
      {
        "tr": "eğlenmek",
        "en": "have fun"
      },
      {
        "tr": "yeni adresi bildirmek",
        "en": "inform new adress"
      },
      {
        "tr": "işten çıkmak",
        "en": "leave work"
      },
      {
        "tr": "yeni arkadaşlıklar edinmek",
        "en": "make friends"
      },
      {
        "tr": "arkadaşlarla buluşmak",
        "en": "meet friends"
      },
      {
        "tr": "suç ihbar etme",
        "en": "report a crime"
      },
      {
        "tr": "soygunu ihbar etme",
        "en": "report burglary"
      },
      {
        "tr": "hız trenine binmek",
        "en": "ride roller coaster"
      },
      {
        "tr": "film izlemek",
        "en": "see a movie"
      },
      {
        "tr": "sanat eseri görmek",
        "en": "see artwork"
      },
      {
        "tr": "ünlü görmek",
        "en": "see celebrity"
      },
      {
        "tr": "yeni sergiyi görmek",
        "en": "see new exhibition"
      },
      {
        "tr": "kargo göndermek",
        "en": "send parcel"
      },
      {
        "tr": "zaman harcamak",
        "en": "spend time"
      },
      {
        "tr": "kalmak",
        "en": "stay"
      },
      {
        "tr": "götürmek",
        "en": "take … to"
      },
      {
        "tr": "köpeği dışarı çıkarmak",
        "en": "walk the dog"
      }
    ]
  },
  {
    "id": "src-sports",
    "title": "Sports",
    "emoji": "🏠",
    "category": "Daily Life",
    "desc": "Sports — imported from topicsource/sports.txt.",
    "words": [
      {
        "tr": "atlet, sporcu",
        "en": "athlete"
      },
      {
        "tr": "başarmak",
        "en": "achieve"
      },
      {
        "tr": "top",
        "en": "ball"
      },
      {
        "tr": "yenmek",
        "en": "beat"
      },
      {
        "tr": "yarışmak, rekabet etmek",
        "en": "compete"
      },
      {
        "tr": "yarışlara katılmak",
        "en": "compete in the races"
      },
      {
        "tr": "kort, saha",
        "en": "court"
      },
      {
        "tr": "bisiklet sürme",
        "en": "cycling"
      },
      {
        "tr": "dalış",
        "en": "diving"
      },
      {
        "tr": "spor yapmak",
        "en": "do a sport"
      },
      {
        "tr": "berabere",
        "en": "draw"
      },
      {
        "tr": "sağlıklı yiyecekler yemek",
        "en": "eat healthy food"
      },
      {
        "tr": "ekipman",
        "en": "equipment"
      },
      {
        "tr": "spor salonunda egzersiz yapmak",
        "en": "exercise in the gym"
      },
      {
        "tr": "egzersiz yapmak",
        "en": "exercise"
      },
      {
        "tr": "uyanmak",
        "en": "get up"
      },
      {
        "tr": "eldiven",
        "en": "gloves"
      },
      {
        "tr": "diyet yapmak",
        "en": "go on a diet"
      },
      {
        "tr": "spor salonuna gitmek",
        "en": "go to the gym"
      },
      {
        "tr": "yüzücü-kayak gözlüğü",
        "en": "goggles"
      },
      {
        "tr": "spor salonu",
        "en": "gym"
      },
      {
        "tr": "kahvaltı yapmak",
        "en": "have breakfast"
      },
      {
        "tr": "enerji içecekleri içmek",
        "en": "have energy drinks"
      },
      {
        "tr": "abur cubur yemek",
        "en": "have junk food"
      },
      {
        "tr": "protein almak",
        "en": "have protein"
      },
      {
        "tr": "topa vurmak",
        "en": "hit a ball"
      },
      {
        "tr": "bacağını incitmek",
        "en": "hurt leg"
      },
      {
        "tr": "buz pateni",
        "en": "ice skating"
      },
      {
        "tr": "bireysel sporlar",
        "en": "individual sports"
      },
      {
        "tr": "iç mekân sporları",
        "en": "indoor sports"
      },
      {
        "tr": "sakatlık",
        "en": "injury"
      },
      {
        "tr": "tempolu koşu",
        "en": "jogging"
      },
      {
        "tr": "bir spor etkinliğine katılmak",
        "en": "join a sports activity"
      },
      {
        "tr": "zinde kalmak",
        "en": "keep fit"
      },
      {
        "tr": "dizlikler",
        "en": "knee pads"
      },
      {
        "tr": "maçı kaybetmek",
        "en": "lose the match"
      },
      {
        "tr": "gol atmak",
        "en": "make a goal"
      },
      {
        "tr": "madalya",
        "en": "medal"
      },
      {
        "tr": "ağ, file",
        "en": "net"
      },
      {
        "tr": "karşı takım",
        "en": "opponent team"
      },
      {
        "tr": "sahip olmak",
        "en": "own"
      },
      {
        "tr": "dış mekân sporları",
        "en": "outdoor sports"
      },
      {
        "tr": "oyuncu",
        "en": "player"
      },
      {
        "tr": "havuz",
        "en": "pool"
      },
      {
        "tr": "çalışmak, antreman yapmak",
        "en": "practice"
      },
      {
        "tr": "ödül",
        "en": "prize"
      },
      {
        "tr": "raket",
        "en": "racket"
      },
      {
        "tr": "bisiklet sürmek",
        "en": "ride bike"
      },
      {
        "tr": "paten",
        "en": "rollerskate"
      },
      {
        "tr": "koşu",
        "en": "running"
      },
      {
        "tr": "güvenlik",
        "en": "safety"
      },
      {
        "tr": "puan kazanmak",
        "en": "score a point"
      },
      {
        "tr": "gol atmak",
        "en": "score goal"
      },
      {
        "tr": "puan almak",
        "en": "score point"
      },
      {
        "tr": "kaykay",
        "en": "skateboard"
      },
      {
        "tr": "kayak yapma",
        "en": "skiing"
      },
      {
        "tr": "kar montu",
        "en": "snow jacket"
      },
      {
        "tr": "kar kayağı",
        "en": "snowboard"
      },
      {
        "tr": "seyirci",
        "en": "spectator"
      },
      {
        "tr": "sporcu",
        "en": "sportsman"
      },
      {
        "tr": "stadyum",
        "en": "stadium"
      },
      {
        "tr": "yatmak",
        "en": "stay in bed"
      },
      {
        "tr": "başarı",
        "en": "success"
      },
      {
        "tr": "yüzücü",
        "en": "swimmer"
      },
      {
        "tr": "yüzme",
        "en": "swimming"
      },
      {
        "tr": "mayo",
        "en": "swimsuit"
      },
      {
        "tr": "takım sporları",
        "en": "team sports"
      },
      {
        "tr": "takım",
        "en": "team"
      },
      {
        "tr": "… da kötü olmak",
        "en": "to be bad at"
      },
      {
        "tr": "…da iyi olmak",
        "en": "to be good at"
      },
      {
        "tr": "spor ayakkabısı",
        "en": "trainers"
      },
      {
        "tr": "antreman",
        "en": "training"
      },
      {
        "tr": "erken kalkmak",
        "en": "wakeup early"
      },
      {
        "tr": "maç izlemek",
        "en": "watch a match"
      },
      {
        "tr": "su sporları",
        "en": "water sports"
      },
      {
        "tr": "ağırlıklar",
        "en": "weights"
      },
      {
        "tr": "altın madalya kazanmak",
        "en": "win gold medal"
      },
      {
        "tr": "kış sporları",
        "en": "winter sports"
      },
      {
        "tr": "asla, hiç",
        "en": "never"
      },
      {
        "tr": "neredeyse hiç",
        "en": "hardly ever"
      },
      {
        "tr": "nadiren",
        "en": "rarely/seldom"
      },
      {
        "tr": "bazen",
        "en": "sometimes"
      },
      {
        "tr": "sık sık",
        "en": "often"
      },
      {
        "tr": "genellikle",
        "en": "usually / generally"
      },
      {
        "tr": "her zaman",
        "en": "always"
      },
      {
        "tr": "bir kere",
        "en": "once"
      },
      {
        "tr": "haftada bir kez",
        "en": "once a week"
      },
      {
        "tr": "iki kere",
        "en": "twice"
      },
      {
        "tr": "yılda iki kez",
        "en": "twice a year"
      },
      {
        "tr": "üç kere",
        "en": "three times"
      }
    ]
  },
  {
    "id": "src-television",
    "title": "Television",
    "emoji": "🏠",
    "category": "Daily Life",
    "desc": "Television — imported from topicsource/television.txt.",
    "words": [
      {
        "tr": "aksiyon filmi",
        "en": "action movie"
      },
      {
        "tr": "macera",
        "en": "adventure"
      },
      {
        "tr": "çizgifilm",
        "en": "cartoon"
      },
      {
        "tr": "komedi",
        "en": "comedy"
      },
      {
        "tr": "reklam",
        "en": "commercials"
      },
      {
        "tr": "yemek programı",
        "en": "cookery programme"
      },
      {
        "tr": "tartışma",
        "en": "discussion"
      },
      {
        "tr": "belgesel",
        "en": "documentary"
      },
      {
        "tr": "dram",
        "en": "drama"
      },
      {
        "tr": "korku filmi",
        "en": "horror movie"
      },
      {
        "tr": "aşk hikayesi",
        "en": "love story"
      },
      {
        "tr": "sabah programı",
        "en": "morning show"
      },
      {
        "tr": "haberler",
        "en": "news"
      },
      {
        "tr": "bilgi yarışması",
        "en": "quiz show"
      },
      {
        "tr": "gerçek insanların yaşamlarını konu alan şov programı",
        "en": "reality show"
      },
      {
        "tr": "bilim kurgu",
        "en": "science fiction"
      },
      {
        "tr": "dizi",
        "en": "series"
      },
      {
        "tr": "durum komedisi",
        "en": "sitcom (situations comedy)"
      },
      {
        "tr": "pembe dizi",
        "en": "soap opera"
      },
      {
        "tr": "sohbet programı",
        "en": "talk show"
      },
      {
        "tr": "hava tahmini",
        "en": "weather forecast"
      },
      {
        "tr": "evlilik programı",
        "en": "wedding programme"
      },
      {
        "tr": "tüm, bütün",
        "en": "all"
      },
      {
        "tr": "şaşırtıcı, hayret verici",
        "en": "amazing"
      },
      {
        "tr": "eğlenceli, zevkli",
        "en": "amusing"
      },
      {
        "tr": "sıkıcı",
        "en": "boring"
      },
      {
        "tr": "çılgın",
        "en": "crazy"
      },
      {
        "tr": "sıkıcı",
        "en": "dull"
      },
      {
        "tr": "boyunca, esnasında",
        "en": "during"
      },
      {
        "tr": "eğitsel",
        "en": "educational"
      },
      {
        "tr": "eğitici",
        "en": "educative"
      },
      {
        "tr": "eğlenceli",
        "en": "enjoyable"
      },
      {
        "tr": "eğlendirici",
        "en": "entertaining"
      },
      {
        "tr": "heyecan verici",
        "en": "exciting"
      },
      {
        "tr": "harika, müthiş",
        "en": "fantastic"
      },
      {
        "tr": "korkutucu",
        "en": "frightening"
      },
      {
        "tr": "eğlenceli",
        "en": "fun"
      },
      {
        "tr": "komik, eğlenceli",
        "en": "funny"
      },
      {
        "tr": "zararlı",
        "en": "harmful"
      },
      {
        "tr": "tarihi",
        "en": "historical"
      },
      {
        "tr": "öğretici",
        "en": "informative"
      },
      {
        "tr": "ilginç, ilgi çekici",
        "en": "interesting"
      },
      {
        "tr": "saçma",
        "en": "nonsense"
      },
      {
        "tr": "saçma, rezalet",
        "en": "ridiculous"
      },
      {
        "tr": "korkutucu",
        "en": "scary"
      },
      {
        "tr": "ahmakça, saçma",
        "en": "silly"
      },
      {
        "tr": "işe yaramaz, faydasız",
        "en": "useless"
      },
      {
        "tr": "hakkında, ilgili",
        "en": "about"
      },
      {
        "tr": "bayılmak",
        "en": "be crazy about"
      },
      {
        "tr": "ilgili olmak",
        "en": "be interested in"
      },
      {
        "tr": "bağımlısı olmak",
        "en": "become an addict"
      },
      {
        "tr": "dayanamamak, katlanamamak",
        "en": "can’t stand"
      },
      {
        "tr": "bekleyememek",
        "en": "can’t wait"
      },
      {
        "tr": "yönetmen",
        "en": "director"
      },
      {
        "tr": "hoşlanmamak",
        "en": "dislike"
      },
      {
        "tr": "sevmek, hoşlanmak",
        "en": "enjoy"
      },
      {
        "tr": "farklı konularda bilgini artırmak",
        "en": "expand knowledge on different topics"
      },
      {
        "tr": "insanların hayatlarını takip etmek",
        "en": "follow lives of people"
      },
      {
        "tr": "genel izleyici",
        "en": "general audiences"
      },
      {
        "tr": "nefret etmek",
        "en": "hate"
      },
      {
        "tr": "akşam yemeği yemek",
        "en": "have dinner"
      },
      {
        "tr": "tüm soruları bilmek",
        "en": "know all the questions"
      },
      {
        "tr": "dünyada neler olup bittiğini bilmek",
        "en": "know what’s going on all over the world"
      },
      {
        "tr": "gülmek",
        "en": "laugh"
      },
      {
        "tr": "yeni şeyler öğrenmek",
        "en": "learn new things"
      },
      {
        "tr": "hoşlanmak",
        "en": "like"
      },
      {
        "tr": "sevmek",
        "en": "love"
      },
      {
        "tr": "yeni bölümleri kaçırmak",
        "en": "miss new episodes"
      },
      {
        "tr": "saatlerce",
        "en": "for hours"
      },
      {
        "tr": "olumsuz örnekler",
        "en": "negative examples"
      },
      {
        "tr": "mutlu vakit geçirmek",
        "en": "pass time happily"
      },
      {
        "tr": "tercih etmek",
        "en": "prefer"
      },
      {
        "tr": "tavsiye etmek",
        "en": "recommend"
      },
      {
        "tr": "uzaktan kumanda",
        "en": "remote control"
      },
      {
        "tr": "öğünleri atlamak",
        "en": "skip meals"
      },
      {
        "tr": "zaman geçirmek",
        "en": "spend time"
      },
      {
        "tr": "geç saatlere kadar uyanık kalmak",
        "en": "stay up late"
      },
      {
        "tr": "uygun",
        "en": "suitable for"
      },
      {
        "tr": "şiddet",
        "en": "violence"
      },
      {
        "tr": "izlemek",
        "en": "watch"
      }
    ]
  },
  {
    "id": "src-wild animals",
    "title": "Wild animals",
    "emoji": "🌿",
    "category": "Nature",
    "desc": "Wild animals — imported from topicsource/wild animals.txt.",
    "words": [
      {
        "tr": "ayı",
        "en": "bear"
      },
      {
        "tr": "bizon",
        "en": "bison"
      },
      {
        "tr": "deve",
        "en": "camel"
      },
      {
        "tr": "çita",
        "en": "cheetah"
      },
      {
        "tr": "şempanze",
        "en": "chimpanzee"
      },
      {
        "tr": "timsah",
        "en": "crocodile"
      },
      {
        "tr": "geyik",
        "en": "deer"
      },
      {
        "tr": "yunus",
        "en": "dolphin"
      },
      {
        "tr": "kartal",
        "en": "eagle"
      },
      {
        "tr": "fil",
        "en": "elephant"
      },
      {
        "tr": "şahin",
        "en": "falcon"
      },
      {
        "tr": "zürafa",
        "en": "giraffe"
      },
      {
        "tr": "goril",
        "en": "gorilla"
      },
      {
        "tr": "şahin",
        "en": "hawk"
      },
      {
        "tr": "at",
        "en": "horse"
      },
      {
        "tr": "kanguru",
        "en": "kangaroo"
      },
      {
        "tr": "koala",
        "en": "koala bear"
      },
      {
        "tr": "aslan",
        "en": "lion"
      },
      {
        "tr": "kertenkele",
        "en": "lizard"
      },
      {
        "tr": "maymun",
        "en": "monkey"
      },
      {
        "tr": "ahtapot",
        "en": "octopus"
      },
      {
        "tr": "deve  kuşu",
        "en": "ostrich"
      },
      {
        "tr": "baykuş",
        "en": "owl"
      },
      {
        "tr": "penguen",
        "en": "penguin"
      },
      {
        "tr": "güvercin",
        "en": "pigeon"
      },
      {
        "tr": "kutup ayısı",
        "en": "polar bear"
      },
      {
        "tr": "gergedan",
        "en": "rhino"
      },
      {
        "tr": "martı",
        "en": "seagull"
      },
      {
        "tr": "fok",
        "en": "seal"
      },
      {
        "tr": "köpek balığı",
        "en": "shark"
      },
      {
        "tr": "yılan",
        "en": "snake"
      },
      {
        "tr": "sincap",
        "en": "squirrel"
      },
      {
        "tr": "kaplan",
        "en": "tiger"
      },
      {
        "tr": "kaplumbağa",
        "en": "turtle"
      },
      {
        "tr": "balina",
        "en": "whale"
      },
      {
        "tr": "zebra",
        "en": "zebra"
      },
      {
        "tr": "çöl",
        "en": "desert"
      },
      {
        "tr": "orman",
        "en": "forest"
      },
      {
        "tr": "çayır",
        "en": "grassland"
      },
      {
        "tr": "orman",
        "en": "jungle"
      },
      {
        "tr": "kara",
        "en": "land"
      },
      {
        "tr": "dağ",
        "en": "mountain"
      },
      {
        "tr": "okyanus",
        "en": "ocean"
      },
      {
        "tr": "deniz mağarası",
        "en": "sea caves"
      },
      {
        "tr": "gökyüzü",
        "en": "sky"
      },
      {
        "tr": "su",
        "en": "water"
      },
      {
        "tr": "pençe",
        "en": "claw"
      },
      {
        "tr": "kulak",
        "en": "ear"
      },
      {
        "tr": "yüzgeç",
        "en": "fin"
      },
      {
        "tr": "ayak",
        "en": "foot"
      },
      {
        "tr": "post, kürk",
        "en": "fur"
      },
      {
        "tr": "tırnak",
        "en": "nail"
      },
      {
        "tr": "boyun",
        "en": "neck"
      },
      {
        "tr": "pati",
        "en": "paw"
      },
      {
        "tr": "deri",
        "en": "skin"
      },
      {
        "tr": "şerit",
        "en": "stripe"
      },
      {
        "tr": "diş",
        "en": "teeth"
      },
      {
        "tr": "fil hortumu",
        "en": "trunk"
      },
      {
        "tr": "kanat",
        "en": "wing"
      },
      {
        "tr": "kuşlar",
        "en": "birds"
      },
      {
        "tr": "etoburlar",
        "en": "carnivores"
      },
      {
        "tr": "soğukkanlı",
        "en": "cold-blooded"
      },
      {
        "tr": "otoburlar",
        "en": "herbivores"
      },
      {
        "tr": "memeliler",
        "en": "mammals"
      },
      {
        "tr": "sürüngenler",
        "en": "reptiles"
      },
      {
        "tr": "omurgalılar",
        "en": "vertebrates"
      },
      {
        "tr": "sıcakkanlı",
        "en": "warm-blooded"
      },
      {
        "tr": "saldırmak",
        "en": "attack"
      },
      {
        "tr": "harika",
        "en": "awesome"
      },
      {
        "tr": "nesli tükenmiş olmak",
        "en": "become extinct"
      },
      {
        "tr": "büyük",
        "en": "big"
      },
      {
        "tr": "kürsel ısınmaya sebep olmak",
        "en": "cause global warming"
      },
      {
        "tr": "tatlı",
        "en": "cute"
      },
      {
        "tr": "tehlikeli",
        "en": "dangerous"
      },
      {
        "tr": "yok etmek, tahrip etmek",
        "en": "destroy"
      },
      {
        "tr": "yiyecek, beslenme",
        "en": "diet"
      },
      {
        "tr": "insanları eğitmek",
        "en": "educate people"
      },
      {
        "tr": "nesli tükenmekte olan hayvanlar",
        "en": "endangered animals"
      },
      {
        "tr": "devasa",
        "en": "enormous"
      },
      {
        "tr": "müthiş",
        "en": "excellent"
      },
      {
        "tr": "nesli tükenmiş hayvanlar",
        "en": "extinct animals"
      },
      {
        "tr": "hızlı",
        "en": "fast"
      },
      {
        "tr": "av bulmak",
        "en": "find prey"
      },
      {
        "tr": "komik, eğlenceli",
        "en": "funny"
      },
      {
        "tr": "zarar vermek",
        "en": "give harm"
      },
      {
        "tr": "küresel ısınma",
        "en": "global warming"
      },
      {
        "tr": "doğal yaşam alanı",
        "en": "habitat"
      },
      {
        "tr": "zarar vermek",
        "en": "harm"
      },
      {
        "tr": "ağır",
        "en": "heavy"
      },
      {
        "tr": "hayvanları avlamak",
        "en": "hunt animals"
      },
      {
        "tr": "avlanmak",
        "en": "hunt"
      },
      {
        "tr": "avcı",
        "en": "hunter"
      },
      {
        "tr": "tehlikede",
        "en": "in danger"
      },
      {
        "tr": "inanılmaz",
        "en": "incredible"
      },
      {
        "tr": "ilginç",
        "en": "interesting"
      },
      {
        "tr": "temiz tutmak",
        "en": "keep clean"
      },
      {
        "tr": "öldürmek",
        "en": "kill"
      },
      {
        "tr": "tür",
        "en": "kind"
      },
      {
        "tr": "geniş, büyük",
        "en": "large"
      },
      {
        "tr": "yaşam süresi",
        "en": "lifespan"
      },
      {
        "tr": "ağaç dikmek",
        "en": "plant tree"
      },
      {
        "tr": "zehirli",
        "en": "poisonous"
      },
      {
        "tr": "çevreyi kirletmek",
        "en": "pollute environment"
      },
      {
        "tr": "nüfus",
        "en": "population"
      },
      {
        "tr": "sevimli",
        "en": "pretty"
      },
      {
        "tr": "önlemek",
        "en": "prevent"
      },
      {
        "tr": "av",
        "en": "prey"
      },
      {
        "tr": "ormanı korumak",
        "en": "protect forest"
      },
      {
        "tr": "vahşi yaşamı korumak",
        "en": "protect wild life"
      },
      {
        "tr": "keskin",
        "en": "sharp"
      },
      {
        "tr": "büyüklük",
        "en": "size"
      },
      {
        "tr": "küresel ısınmayı durdurmak",
        "en": "stop global warming"
      },
      {
        "tr": "aşırı avlanmayı önlemek",
        "en": "stop overhunting"
      },
      {
        "tr": "güçlü",
        "en": "strong"
      },
      {
        "tr": "hayatta kalmak",
        "en": "survive"
      },
      {
        "tr": "önlem almak",
        "en": "take precuation"
      },
      {
        "tr": "olağan dışı",
        "en": "unusual"
      },
      {
        "tr": "kürk giymek",
        "en": "wear fur"
      },
      {
        "tr": "ağırlık",
        "en": "weight"
      },
      {
        "tr": "vahşi",
        "en": "wild"
      }
    ]
  },
  {
    "id": "src-5-classroom-life",
    "title": "Grade 5 · Classroom Life",
    "emoji": "🏫",
    "category": "Grade 5",
    "desc": "Grade 5 · Classroom Life — imported from topicsource/5-classroom-life.txt.",
    "words": [
      {
        "tr": "okul sonrası etkinlikler",
        "en": "after school activities"
      },
      {
        "tr": "öğleden sonra",
        "en": "afternoon"
      },
      {
        "tr": "yaş",
        "en": "age"
      },
      {
        "tr": "resim",
        "en": "art"
      },
      {
        "tr": "sormak",
        "en": "ask"
      },
      {
        "tr": "basketbol turnuvası",
        "en": "basketball tournament"
      },
      {
        "tr": "büyük",
        "en": "big"
      },
      {
        "tr": "tahta kalemi",
        "en": "board marker"
      },
      {
        "tr": "kitaplık",
        "en": "bookshelf"
      },
      {
        "tr": "sınıf hayatı",
        "en": "classroom life"
      },
      {
        "tr": "sınıf eşyaları",
        "en": "classroom objects"
      },
      {
        "tr": "sınıf kuralları",
        "en": "classroom rules"
      },
      {
        "tr": "temizlemek",
        "en": "clean"
      },
      {
        "tr": "temiz",
        "en": "clear"
      },
      {
        "tr": "boya kalemleri",
        "en": "crayons"
      },
      {
        "tr": "günler",
        "en": "days"
      },
      {
        "tr": "sözlük",
        "en": "dictionary"
      },
      {
        "tr": "kirli",
        "en": "dirty"
      },
      {
        "tr": "drama",
        "en": "drama"
      },
      {
        "tr": "seçmeli dersler",
        "en": "elective lessons"
      },
      {
        "tr": "İngilizce",
        "en": "English"
      },
      {
        "tr": "silmek",
        "en": "erase"
      },
      {
        "tr": "her",
        "en": "every"
      },
      {
        "tr": "yabancı dil",
        "en": "foreign language"
      },
      {
        "tr": "bir konuda iyi olmak",
        "en": "good at"
      },
      {
        "tr": "yarım",
        "en": "half"
      },
      {
        "tr": "ödev",
        "en": "homework"
      },
      {
        "tr": "kaç tane",
        "en": "how many"
      },
      {
        "tr": "bilişim teknolojileri",
        "en": "IT (Information Technology)"
      },
      {
        "tr": "öğrenmek",
        "en": "learn"
      },
      {
        "tr": "ödünç vermek",
        "en": "lend"
      },
      {
        "tr": "ders",
        "en": "lesson"
      },
      {
        "tr": "sözlükte aramak",
        "en": "look up"
      },
      {
        "tr": "matematik",
        "en": "maths"
      },
      {
        "tr": "hata",
        "en": "mistake"
      },
      {
        "tr": "pazartesi",
        "en": "Monday"
      },
      {
        "tr": "sabah",
        "en": "morning"
      },
      {
        "tr": "müzik",
        "en": "music"
      },
      {
        "tr": "ihtiyaç duymak",
        "en": "need"
      },
      {
        "tr": "gürültülü",
        "en": "noisy"
      },
      {
        "tr": "sayılar",
        "en": "numbers"
      },
      {
        "tr": "beden eğitimi",
        "en": "P.E (physical education)"
      },
      {
        "tr": "kalemlik",
        "en": "pencil case"
      },
      {
        "tr": "kurşun kalem",
        "en": "pencil"
      },
      {
        "tr": "afiş",
        "en": "poster"
      },
      {
        "tr": "proje",
        "en": "project"
      },
      {
        "tr": "koymak",
        "en": "put"
      },
      {
        "tr": "sessiz",
        "en": "quiet"
      },
      {
        "tr": "Din Kültürü ve Ahlak Bilgisi",
        "en": "Religion and Morals"
      },
      {
        "tr": "hatırlatmak",
        "en": "remind"
      },
      {
        "tr": "silgi",
        "en": "rubber"
      },
      {
        "tr": "çöp kovası",
        "en": "rubbish bin"
      },
      {
        "tr": "sınıfta koşmak",
        "en": "run in the classroom"
      },
      {
        "tr": "cumartesi",
        "en": "Saturday"
      },
      {
        "tr": "okul çantası",
        "en": "school bag"
      },
      {
        "tr": "okul kulüpleri",
        "en": "school clubs"
      },
      {
        "tr": "okul dersi",
        "en": "school subject"
      },
      {
        "tr": "fen bilimleri",
        "en": "science"
      },
      {
        "tr": "sandalye",
        "en": "seat"
      },
      {
        "tr": "paylaşmak",
        "en": "share"
      },
      {
        "tr": "kağıt",
        "en": "sheet"
      },
      {
        "tr": "göstermek",
        "en": "show"
      },
      {
        "tr": "küçük",
        "en": "small"
      },
      {
        "tr": "akıllı tahta",
        "en": "smart board"
      },
      {
        "tr": "sosyal bilgiler",
        "en": "social studies"
      },
      {
        "tr": "başlamak",
        "en": "start"
      },
      {
        "tr": "öğrenciler",
        "en": "students"
      },
      {
        "tr": "pazar",
        "en": "Sunday"
      },
      {
        "tr": "öğretmen",
        "en": "teacher"
      },
      {
        "tr": "çöp atmak",
        "en": "throw rubbish"
      },
      {
        "tr": "atmak",
        "en": "throw"
      },
      {
        "tr": "perşembe",
        "en": "Thursday"
      },
      {
        "tr": "saat",
        "en": "time"
      },
      {
        "tr": "ders programı",
        "en": "timetable"
      },
      {
        "tr": "salı",
        "en": "Tuesday"
      },
      {
        "tr": "Türkçe",
        "en": "Turkish"
      },
      {
        "tr": "kullanmak",
        "en": "use"
      },
      {
        "tr": "uyarmak",
        "en": "warn"
      },
      {
        "tr": "çarşamba",
        "en": "Wednesday"
      },
      {
        "tr": "hafta",
        "en": "week"
      },
      {
        "tr": "hafta içi",
        "en": "weekdays"
      },
      {
        "tr": "hafta sonu",
        "en": "weekend"
      },
      {
        "tr": "saat kaç",
        "en": "what time"
      },
      {
        "tr": "nerede",
        "en": "where"
      },
      {
        "tr": "hangisi",
        "en": "which"
      },
      {
        "tr": "yazmak",
        "en": "write"
      }
    ]
  },
  {
    "id": "src-5-family-life",
    "title": "Grade 5 · Family Life",
    "emoji": "👨👩👧",
    "category": "Grade 5",
    "desc": "Grade 5 · Family Life — imported from topicsource/5-family-life.txt.txt.",
    "words": [
      {
        "tr": "sahilde piknik",
        "en": "a picnic at the beach"
      },
      {
        "tr": "aktivite",
        "en": "activity"
      },
      {
        "tr": "hava",
        "en": "air"
      },
      {
        "tr": "her zaman",
        "en": "always"
      },
      {
        "tr": "her zaman",
        "en": "any time"
      },
      {
        "tr": "sanat müzesi",
        "en": "art museum"
      },
      {
        "tr": "teyze, hala",
        "en": "aunt"
      },
      {
        "tr": "bir konuda kötü olmak",
        "en": "be bad at"
      },
      {
        "tr": "düşkün olmak",
        "en": "be fond of"
      },
      {
        "tr": "bir konuda iyi olmak",
        "en": "be good at"
      },
      {
        "tr": "ilgili olmak",
        "en": "be interested in"
      },
      {
        "tr": "plaj",
        "en": "beach"
      },
      {
        "tr": "doğum günü partisi",
        "en": "birthday party"
      },
      {
        "tr": "getirmek",
        "en": "bring"
      },
      {
        "tr": "erkek kardeş",
        "en": "brother"
      },
      {
        "tr": "diş fırçalamak",
        "en": "brush teeth"
      },
      {
        "tr": "ormanda kamp yapmak",
        "en": "camping in the forest"
      },
      {
        "tr": "kamp yapmak",
        "en": "camping"
      },
      {
        "tr": "araba",
        "en": "car"
      },
      {
        "tr": "çocuklar",
        "en": "children"
      },
      {
        "tr": "sınıf arkadaşı",
        "en": "classmate"
      },
      {
        "tr": "bilgisayar",
        "en": "computer"
      },
      {
        "tr": "çift",
        "en": "couple"
      },
      {
        "tr": "bisiklete binmek",
        "en": "cycling"
      },
      {
        "tr": "dans etmek",
        "en": "dancing"
      },
      {
        "tr": "gün",
        "en": "day"
      },
      {
        "tr": "farklı",
        "en": "different"
      },
      {
        "tr": "yemek",
        "en": "eat"
      },
      {
        "tr": "özellikle",
        "en": "especially"
      },
      {
        "tr": "her gün",
        "en": "every day"
      },
      {
        "tr": "her şey",
        "en": "everything"
      },
      {
        "tr": "fuar",
        "en": "fair"
      },
      {
        "tr": "aile hayatı",
        "en": "family life"
      },
      {
        "tr": "aile üyeleri",
        "en": "family members"
      },
      {
        "tr": "aile",
        "en": "family"
      },
      {
        "tr": "baba",
        "en": "father"
      },
      {
        "tr": "festival",
        "en": "festival"
      },
      {
        "tr": "katlamak",
        "en": "fold"
      },
      {
        "tr": "yiyecek",
        "en": "food"
      },
      {
        "tr": "boş zaman",
        "en": "free time"
      },
      {
        "tr": "cuma",
        "en": "Friday"
      },
      {
        "tr": "arkadaş",
        "en": "friend"
      },
      {
        "tr": "bahçe",
        "en": "garden"
      },
      {
        "tr": "gitmek",
        "en": "go"
      },
      {
        "tr": "büyükbaba",
        "en": "grandfather"
      },
      {
        "tr": "büyükanne",
        "en": "grandmother"
      },
      {
        "tr": "harika",
        "en": "great"
      },
      {
        "tr": "kahvaltı yapmak",
        "en": "have breakfast"
      },
      {
        "tr": "akşam yemeği yemek",
        "en": "have dinner"
      },
      {
        "tr": "öğle yemeği yemek",
        "en": "have lunch"
      },
      {
        "tr": "mangal yapmak",
        "en": "having a barbecue"
      },
      {
        "tr": "hobi",
        "en": "hobby"
      },
      {
        "tr": "kapalı alan",
        "en": "indoor"
      },
      {
        "tr": "meslek",
        "en": "job"
      },
      {
        "tr": "zıplamak",
        "en": "jump"
      },
      {
        "tr": "mutfak",
        "en": "kitchen"
      },
      {
        "tr": "göl",
        "en": "lake"
      },
      {
        "tr": "kütüphane",
        "en": "library"
      },
      {
        "tr": "doğum günü pastası yapmak",
        "en": "making a birthday cake"
      },
      {
        "tr": "benimki",
        "en": "mine"
      },
      {
        "tr": "pazartesi",
        "en": "Monday"
      },
      {
        "tr": "anne",
        "en": "mother"
      },
      {
        "tr": "benim",
        "en": "my"
      },
      {
        "tr": "doğa",
        "en": "nature"
      },
      {
        "tr": "şimdi",
        "en": "now"
      },
      {
        "tr": "okyanus",
        "en": "ocean"
      },
      {
        "tr": "açmak",
        "en": "open"
      },
      {
        "tr": "düzenlemek",
        "en": "organise"
      },
      {
        "tr": "açık alan",
        "en": "outdoor"
      },
      {
        "tr": "tava",
        "en": "pan"
      },
      {
        "tr": "insanlar",
        "en": "people"
      },
      {
        "tr": "piknik",
        "en": "picnic"
      },
      {
        "tr": "yer",
        "en": "place"
      },
      {
        "tr": "futbol oynamak",
        "en": "play football"
      },
      {
        "tr": "masa oyunu oynamak",
        "en": "playing a board game"
      },
      {
        "tr": "gitar çalmak",
        "en": "playing the guitar"
      },
      {
        "tr": "problem",
        "en": "problem"
      },
      {
        "tr": "toplu taşıma",
        "en": "public transport"
      },
      {
        "tr": "okumak",
        "en": "read"
      },
      {
        "tr": "dinlenmek",
        "en": "rest"
      },
      {
        "tr": "rutin",
        "en": "routine"
      },
      {
        "tr": "cumartesi",
        "en": "Saturday"
      },
      {
        "tr": "okul",
        "en": "school"
      },
      {
        "tr": "oturmak",
        "en": "seat"
      },
      {
        "tr": "ikinci",
        "en": "second"
      },
      {
        "tr": "koyun",
        "en": "sheep"
      },
      {
        "tr": "kız kardeş",
        "en": "sister"
      },
      {
        "tr": "sosyal hayat",
        "en": "social life"
      },
      {
        "tr": "pul",
        "en": "stamp"
      },
      {
        "tr": "hikâye",
        "en": "story"
      },
      {
        "tr": "güçlü",
        "en": "strong"
      },
      {
        "tr": "önermek",
        "en": "suggest"
      },
      {
        "tr": "pazar",
        "en": "Sunday"
      },
      {
        "tr": "yüzme",
        "en": "swimming"
      },
      {
        "tr": "evcil hayvana bakmak",
        "en": "taking care of a pet"
      },
      {
        "tr": "fotoğraf çekmek",
        "en": "taking photograph"
      },
      {
        "tr": "konuşmak",
        "en": "talk"
      },
      {
        "tr": "oyuncak ayı",
        "en": "teddy bear"
      },
      {
        "tr": "çadır",
        "en": "tent"
      },
      {
        "tr": "perşembe",
        "en": "Thursday"
      },
      {
        "tr": "toplamak",
        "en": "tidy up"
      },
      {
        "tr": "çadırı toplamak",
        "en": "tidying up the tent"
      },
      {
        "tr": "bugün",
        "en": "today"
      },
      {
        "tr": "birlikte",
        "en": "together"
      },
      {
        "tr": "ağaç",
        "en": "tree"
      },
      {
        "tr": "doğa yürüyüşü",
        "en": "trekking"
      },
      {
        "tr": "gezi",
        "en": "trip"
      },
      {
        "tr": "salı",
        "en": "Tuesday"
      },
      {
        "tr": "amca, dayı",
        "en": "uncle"
      },
      {
        "tr": "genellikle",
        "en": "usually"
      },
      {
        "tr": "müze gezmek",
        "en": "visiting a museum"
      },
      {
        "tr": "yürümek",
        "en": "walk"
      },
      {
        "tr": "yıkamak",
        "en": "wash"
      },
      {
        "tr": "izlemek",
        "en": "watch"
      },
      {
        "tr": "çarşamba",
        "en": "Wednesday"
      },
      {
        "tr": "hafta içi",
        "en": "weekday"
      },
      {
        "tr": "hafta sonu",
        "en": "weekend"
      },
      {
        "tr": "kazanmak",
        "en": "win"
      }
    ]
  },
  {
    "id": "src-5-life-in-the-nature",
    "title": "Grade 5 · Life In The Nature",
    "emoji": "🌿",
    "category": "Grade 5",
    "desc": "Grade 5 · Life In The Nature — imported from topicsource/5-life-in-the-nature.txt.txt.",
    "words": [
      {
        "tr": "yetenek",
        "en": "ability"
      },
      {
        "tr": "hareketli",
        "en": "active"
      },
      {
        "tr": "tavsiye vermek",
        "en": "advise"
      },
      {
        "tr": "hava",
        "en": "air"
      },
      {
        "tr": "inanılmaz",
        "en": "amazing"
      },
      {
        "tr": "saldırmak",
        "en": "attack"
      },
      {
        "tr": "kötü",
        "en": "bad"
      },
      {
        "tr": "havlamak",
        "en": "bark"
      },
      {
        "tr": "ayı",
        "en": "bear"
      },
      {
        "tr": "arı",
        "en": "bee"
      },
      {
        "tr": "büyük",
        "en": "big"
      },
      {
        "tr": "kuş",
        "en": "bird"
      },
      {
        "tr": "vücut parçası",
        "en": "body part"
      },
      {
        "tr": "dikkatli",
        "en": "careful"
      },
      {
        "tr": "çita",
        "en": "cheetah"
      },
      {
        "tr": "tırmanmak",
        "en": "climb"
      },
      {
        "tr": "sahil",
        "en": "coast"
      },
      {
        "tr": "soğuk",
        "en": "cold"
      },
      {
        "tr": "koloni",
        "en": "colony"
      },
      {
        "tr": "renkli",
        "en": "colorful"
      },
      {
        "tr": "iletişim kurmak",
        "en": "communicate"
      },
      {
        "tr": "timsah",
        "en": "crocodile"
      },
      {
        "tr": "sevimli",
        "en": "cute"
      },
      {
        "tr": "tehlike",
        "en": "danger"
      },
      {
        "tr": "tehlikeli",
        "en": "dangerous"
      },
      {
        "tr": "beslenme şekli",
        "en": "diet"
      },
      {
        "tr": "kartal",
        "en": "eagle"
      },
      {
        "tr": "kolay",
        "en": "easy"
      },
      {
        "tr": "fil",
        "en": "elephant"
      },
      {
        "tr": "kocaman",
        "en": "enormous"
      },
      {
        "tr": "çiftlik",
        "en": "farm"
      },
      {
        "tr": "hızlı",
        "en": "fast"
      },
      {
        "tr": "tüy",
        "en": "feather"
      },
      {
        "tr": "orman",
        "en": "forest"
      },
      {
        "tr": "arkadaş canlısı",
        "en": "friendly"
      },
      {
        "tr": "eğlenceli",
        "en": "funny"
      },
      {
        "tr": "tüylü",
        "en": "furry"
      },
      {
        "tr": "zürafa",
        "en": "giraffe"
      },
      {
        "tr": "goril",
        "en": "gorilla"
      },
      {
        "tr": "çimen",
        "en": "grass"
      },
      {
        "tr": "yaşam alanı",
        "en": "habitat"
      },
      {
        "tr": "avlamak",
        "en": "hunt"
      },
      {
        "tr": "böcek",
        "en": "insect"
      },
      {
        "tr": "orman",
        "en": "jungle"
      },
      {
        "tr": "aslan",
        "en": "lion"
      },
      {
        "tr": "memeli",
        "en": "mammal"
      },
      {
        "tr": "maymun",
        "en": "monkey"
      },
      {
        "tr": "dağ",
        "en": "mountain"
      },
      {
        "tr": "okyanus",
        "en": "ocean"
      },
      {
        "tr": "penguen",
        "en": "penguin"
      },
      {
        "tr": "evcil hayvan",
        "en": "pet"
      },
      {
        "tr": "sürüngen",
        "en": "reptile"
      },
      {
        "tr": "nehir",
        "en": "river"
      },
      {
        "tr": "güvenli",
        "en": "safe"
      },
      {
        "tr": "deniz",
        "en": "sea"
      },
      {
        "tr": "köpek balığı",
        "en": "shark"
      },
      {
        "tr": "yılan",
        "en": "snake"
      },
      {
        "tr": "kar",
        "en": "snow"
      },
      {
        "tr": "güçlü",
        "en": "strong"
      },
      {
        "tr": "hayatta kalmak",
        "en": "survive"
      },
      {
        "tr": "kuyruk",
        "en": "tail"
      },
      {
        "tr": "kaplan",
        "en": "tiger"
      },
      {
        "tr": "seyahat etmek",
        "en": "travel"
      },
      {
        "tr": "su",
        "en": "water"
      },
      {
        "tr": "vahşi",
        "en": "wild"
      },
      {
        "tr": "kurt",
        "en": "wolf"
      }
    ]
  },
  {
    "id": "src-5-life-in-the-neighbourhood",
    "title": "Grade 5 · Life In The Neighbourhood",
    "emoji": "🏘️",
    "category": "Grade 5",
    "desc": "Grade 5 · Life In The Neighbourhood — imported from topicsource/5-life-in-the-neighbourhood.txt.txt.",
    "words": [
      {
        "tr": "acenta, ajan",
        "en": "agent"
      },
      {
        "tr": "antik alanlar",
        "en": "ancient sites"
      },
      {
        "tr": "koltuk",
        "en": "armchair"
      },
      {
        "tr": "sanat galerisi",
        "en": "art gallery"
      },
      {
        "tr": "cazibe merkezi",
        "en": "attraction"
      },
      {
        "tr": "balkon",
        "en": "balcony"
      },
      {
        "tr": "küvet",
        "en": "bath"
      },
      {
        "tr": "banyo",
        "en": "bathroom"
      },
      {
        "tr": "güzel",
        "en": "beautiful"
      },
      {
        "tr": "yatak",
        "en": "bed"
      },
      {
        "tr": "yatak odası",
        "en": "bedroom"
      },
      {
        "tr": "büyük",
        "en": "big"
      },
      {
        "tr": "kitaplık",
        "en": "bookcase"
      },
      {
        "tr": "ödünç almak",
        "en": "borrow"
      },
      {
        "tr": "yepyeni",
        "en": "brand-new"
      },
      {
        "tr": "parlak",
        "en": "bright"
      },
      {
        "tr": "araba",
        "en": "car"
      },
      {
        "tr": "kale",
        "en": "castle"
      },
      {
        "tr": "sandalye",
        "en": "chair"
      },
      {
        "tr": "şehir",
        "en": "city"
      },
      {
        "tr": "yakın / kapatmak",
        "en": "close"
      },
      {
        "tr": "sahil",
        "en": "coast"
      },
      {
        "tr": "soğuk",
        "en": "cold"
      },
      {
        "tr": "rahat",
        "en": "comfortable"
      },
      {
        "tr": "koridor",
        "en": "corridor"
      },
      {
        "tr": "kalabalık",
        "en": "crowded"
      },
      {
        "tr": "dolap",
        "en": "cupboard"
      },
      {
        "tr": "tanımlamak",
        "en": "describe"
      },
      {
        "tr": "masa lambası",
        "en": "desk lamp"
      },
      {
        "tr": "farklı",
        "en": "different"
      },
      {
        "tr": "yemek odası",
        "en": "dining room"
      },
      {
        "tr": "bulaşık makinesi",
        "en": "dishwasher"
      },
      {
        "tr": "kolayca",
        "en": "easily"
      },
      {
        "tr": "çevre dostu",
        "en": "eco-friendly"
      },
      {
        "tr": "çevre",
        "en": "environment"
      },
      {
        "tr": "etkinlik",
        "en": "event"
      },
      {
        "tr": "pahalı",
        "en": "expensive"
      },
      {
        "tr": "deneyim",
        "en": "experience"
      },
      {
        "tr": "ünlü",
        "en": "famous"
      },
      {
        "tr": "çatal",
        "en": "fork"
      },
      {
        "tr": "buzdolabı",
        "en": "fridge"
      },
      {
        "tr": "mobilya",
        "en": "furniture"
      },
      {
        "tr": "garaj",
        "en": "garage"
      },
      {
        "tr": "bahçe",
        "en": "garden"
      },
      {
        "tr": "çim",
        "en": "grass"
      },
      {
        "tr": "zemin",
        "en": "ground"
      },
      {
        "tr": "spor salonu",
        "en": "gym"
      },
      {
        "tr": "el yapımı",
        "en": "handmade"
      },
      {
        "tr": "salon",
        "en": "hall"
      },
      {
        "tr": "kiralamak",
        "en": "hire"
      },
      {
        "tr": "tarihi",
        "en": "historical"
      },
      {
        "tr": "sıcak",
        "en": "hot"
      },
      {
        "tr": "ev",
        "en": "house"
      },
      {
        "tr": "bilgi",
        "en": "information"
      },
      {
        "tr": "içeride",
        "en": "inside"
      },
      {
        "tr": "ilginç",
        "en": "interesting"
      },
      {
        "tr": "zıplamak",
        "en": "jump"
      },
      {
        "tr": "mutfak",
        "en": "kitchen"
      },
      {
        "tr": "bıçak",
        "en": "knife"
      },
      {
        "tr": "büyük",
        "en": "large"
      },
      {
        "tr": "kütüphane",
        "en": "library"
      },
      {
        "tr": "yaşamak",
        "en": "live"
      },
      {
        "tr": "yerel",
        "en": "local"
      },
      {
        "tr": "konum",
        "en": "location"
      },
      {
        "tr": "modern",
        "en": "modern"
      },
      {
        "tr": "cami",
        "en": "mosque"
      },
      {
        "tr": "müze",
        "en": "museum"
      },
      {
        "tr": "doğal",
        "en": "natural"
      },
      {
        "tr": "dışarıda",
        "en": "outside"
      },
      {
        "tr": "doğa",
        "en": "nature"
      },
      {
        "tr": "mahalle",
        "en": "neighbourhood"
      },
      {
        "tr": "açık hava sineması",
        "en": "open-air cinema"
      },
      {
        "tr": "fırın",
        "en": "oven"
      },
      {
        "tr": "huzurlu",
        "en": "peaceful"
      },
      {
        "tr": "yastık",
        "en": "pillow"
      },
      {
        "tr": "bitkiler",
        "en": "plants"
      },
      {
        "tr": "tabak",
        "en": "plate"
      },
      {
        "tr": "oyun alanı",
        "en": "playground"
      },
      {
        "tr": "sessiz",
        "en": "quiet"
      },
      {
        "tr": "eğlence",
        "en": "recreation"
      },
      {
        "tr": "çatı",
        "en": "roof"
      },
      {
        "tr": "çöp kutusu",
        "en": "rubbish bin"
      },
      {
        "tr": "ayakkabı mağazası",
        "en": "shoe shop"
      },
      {
        "tr": "dükkân",
        "en": "shop"
      },
      {
        "tr": "oturma odası",
        "en": "sitting room"
      },
      {
        "tr": "gökyüzü",
        "en": "sky"
      },
      {
        "tr": "küçük",
        "en": "small"
      },
      {
        "tr": "kanepe",
        "en": "sofa"
      },
      {
        "tr": "döndürmek",
        "en": "spin"
      },
      {
        "tr": "spor merkezi",
        "en": "sports centre"
      },
      {
        "tr": "meydan",
        "en": "square"
      },
      {
        "tr": "çelik",
        "en": "steel"
      },
      {
        "tr": "taş",
        "en": "stone"
      },
      {
        "tr": "sokak panayırı",
        "en": "street fair"
      },
      {
        "tr": "güçlü",
        "en": "strong"
      },
      {
        "tr": "eşya",
        "en": "stuff"
      },
      {
        "tr": "uzun",
        "en": "tall"
      },
      {
        "tr": "teras",
        "en": "terrace"
      },
      {
        "tr": "kiremit",
        "en": "tile"
      },
      {
        "tr": "çok küçük",
        "en": "tiny"
      },
      {
        "tr": "tuvalet",
        "en": "toilet"
      },
      {
        "tr": "kule",
        "en": "tower"
      },
      {
        "tr": "kasaba",
        "en": "town"
      },
      {
        "tr": "geleneksel",
        "en": "traditional"
      },
      {
        "tr": "alışılmadık",
        "en": "unusual"
      },
      {
        "tr": "ziyaret etmek",
        "en": "visit"
      },
      {
        "tr": "gardırop",
        "en": "wardrobe"
      },
      {
        "tr": "her nerede",
        "en": "wherever"
      },
      {
        "tr": "geniş",
        "en": "wide"
      },
      {
        "tr": "pencere",
        "en": "window"
      },
      {
        "tr": "ahşap",
        "en": "wooden"
      },
      {
        "tr": "tahta kaşık",
        "en": "wooden spoon"
      }
    ]
  },
  {
    "id": "src-5-life-in-the-universe",
    "title": "Grade 5 · Life In The Universe",
    "emoji": "🌌",
    "category": "Grade 5",
    "desc": "Grade 5 · Life In The Universe — imported from topicsource/5-life-in-the-universe.txt.txt.",
    "words": [
      {
        "tr": "harika",
        "en": "amazing"
      },
      {
        "tr": "lunapark",
        "en": "amusement park"
      },
      {
        "tr": "sonbahar",
        "en": "autumn (fall)"
      },
      {
        "tr": "plaj",
        "en": "beach"
      },
      {
        "tr": "güzel",
        "en": "beautiful"
      },
      {
        "tr": "rezervasyon yapmak",
        "en": "book"
      },
      {
        "tr": "köprü",
        "en": "bridge"
      },
      {
        "tr": "inşa etmek",
        "en": "build"
      },
      {
        "tr": "sakin",
        "en": "calm"
      },
      {
        "tr": "kanyon",
        "en": "canyon"
      },
      {
        "tr": "iklim",
        "en": "climate"
      },
      {
        "tr": "madeni para",
        "en": "coin"
      },
      {
        "tr": "kıta",
        "en": "continent"
      },
      {
        "tr": "derin",
        "en": "deep"
      },
      {
        "tr": "çöl",
        "en": "desert"
      },
      {
        "tr": "varış noktası",
        "en": "destination"
      },
      {
        "tr": "hayal kurmak",
        "en": "dream"
      },
      {
        "tr": "heyecanlı",
        "en": "excited"
      },
      {
        "tr": "keşfetmek",
        "en": "explore"
      },
      {
        "tr": "ünlü",
        "en": "famous"
      },
      {
        "tr": "tatil",
        "en": "holiday"
      },
      {
        "tr": "ada",
        "en": "island"
      },
      {
        "tr": "yolculuk",
        "en": "journey"
      },
      {
        "tr": "göl",
        "en": "lake"
      },
      {
        "tr": "büyülü",
        "en": "magical"
      },
      {
        "tr": "dağ",
        "en": "mountain"
      },
      {
        "tr": "milli park",
        "en": "national park"
      },
      {
        "tr": "fırsat",
        "en": "opportunity"
      },
      {
        "tr": "huzurlu",
        "en": "peaceful"
      },
      {
        "tr": "korumak",
        "en": "protect"
      },
      {
        "tr": "rahatlamak",
        "en": "relax"
      },
      {
        "tr": "uzay",
        "en": "space"
      },
      {
        "tr": "ilkbahar",
        "en": "spring"
      },
      {
        "tr": "yaz",
        "en": "summer"
      },
      {
        "tr": "sıcaklık",
        "en": "temperature"
      },
      {
        "tr": "tur",
        "en": "tour"
      },
      {
        "tr": "seyahat etmek",
        "en": "travel"
      },
      {
        "tr": "gezi",
        "en": "trip"
      },
      {
        "tr": "unutulmaz",
        "en": "unforgettable"
      },
      {
        "tr": "vadi",
        "en": "valley"
      },
      {
        "tr": "araç",
        "en": "vehicle"
      },
      {
        "tr": "manzara",
        "en": "view"
      },
      {
        "tr": "kış",
        "en": "winter"
      },
      {
        "tr": "hayvanat bahçesi",
        "en": "zoo"
      }
    ]
  },
  {
    "id": "src-5-life-in-the-world",
    "title": "Grade 5 · Life In The World",
    "emoji": "🌍",
    "category": "Grade 5",
    "desc": "Grade 5 · Life In The World — imported from topicsource/5-life-in-the-world.txt.txt.",
    "words": [
      {
        "tr": "biraz",
        "en": "a bit of"
      },
      {
        "tr": "bir şişe",
        "en": "a bottle"
      },
      {
        "tr": "bir kase",
        "en": "a bowl of"
      },
      {
        "tr": "birkaç",
        "en": "a couple of"
      },
      {
        "tr": "bir bardak",
        "en": "a glass"
      },
      {
        "tr": "hassas konu",
        "en": "a hot potato"
      },
      {
        "tr": "bir paket",
        "en": "a packet"
      },
      {
        "tr": "kesinlikle",
        "en": "absolutely"
      },
      {
        "tr": "eklemek",
        "en": "add"
      },
      {
        "tr": "sonra",
        "en": "after"
      },
      {
        "tr": "elma",
        "en": "apple"
      },
      {
        "tr": "olarak",
        "en": "as"
      },
      {
        "tr": "sonbahar",
        "en": "autumn"
      },
      {
        "tr": "mevcut",
        "en": "available"
      },
      {
        "tr": "pişmiş",
        "en": "baked"
      },
      {
        "tr": "kabartma tozu",
        "en": "baking powder"
      },
      {
        "tr": "kızmak",
        "en": "be mad at"
      },
      {
        "tr": "fasulye",
        "en": "beans"
      },
      {
        "tr": "sığır eti",
        "en": "beef"
      },
      {
        "tr": "bisküvi",
        "en": "biscuits"
      },
      {
        "tr": "haşlamak",
        "en": "boil"
      },
      {
        "tr": "rezervasyon yapmak",
        "en": "book"
      },
      {
        "tr": "her ikisi",
        "en": "both"
      },
      {
        "tr": "ekmek",
        "en": "bread"
      },
      {
        "tr": "kahvaltı",
        "en": "breakfast"
      },
      {
        "tr": "getirmek",
        "en": "bring"
      },
      {
        "tr": "tereyağı",
        "en": "butter"
      },
      {
        "tr": "dikkatlice",
        "en": "carefully"
      },
      {
        "tr": "kontrol etmek",
        "en": "check"
      },
      {
        "tr": "peynir",
        "en": "cheese"
      },
      {
        "tr": "tavuk",
        "en": "chicken"
      },
      {
        "tr": "çikolata",
        "en": "chocolate"
      },
      {
        "tr": "tarçın",
        "en": "cinnamon"
      },
      {
        "tr": "temizlemek",
        "en": "clean"
      },
      {
        "tr": "eşlik",
        "en": "company"
      },
      {
        "tr": "bilgisayar  oyunu",
        "en": "computer  game"
      },
      {
        "tr": "pişirmek",
        "en": "cook"
      },
      {
        "tr": "mısır",
        "en": "corn"
      },
      {
        "tr": "saymak",
        "en": "count"
      },
      {
        "tr": "salatalık",
        "en": "cucumber"
      },
      {
        "tr": "kültür",
        "en": "culture"
      },
      {
        "tr": "kesmek",
        "en": "cut"
      },
      {
        "tr": "lezzetli",
        "en": "delicious"
      },
      {
        "tr": "tatlı",
        "en": "dessert"
      },
      {
        "tr": "akşam yemeği",
        "en": "dinner"
      },
      {
        "tr": "hamur",
        "en": "dough"
      },
      {
        "tr": "içecek",
        "en": "drink"
      },
      {
        "tr": "yemek yemek",
        "en": "eat"
      },
      {
        "tr": "keyif almak",
        "en": "enjoy"
      },
      {
        "tr": "mükemmel",
        "en": "excellent"
      }
    ]
  },
  {
    "id": "src-5-personal-life",
    "title": "Grade 5 · Personal Life",
    "emoji": "🙋",
    "category": "Grade 5",
    "desc": "Grade 5 · Personal Life — imported from topicsource/5-personal-life.txt.txt.",
    "words": [
      {
        "tr": "aksesuarlar",
        "en": "accessories"
      },
      {
        "tr": "aktiviteler",
        "en": "activities"
      },
      {
        "tr": "okuldan sonra",
        "en": "after school"
      },
      {
        "tr": "her zaman",
        "en": "always"
      },
      {
        "tr": "kol",
        "en": "arm"
      },
      {
        "tr": "sonbahar",
        "en": "autumn"
      },
      {
        "tr": "sırt çantası",
        "en": "backpack"
      },
      {
        "tr": "kemer",
        "en": "belt"
      },
      {
        "tr": "siyah",
        "en": "black"
      },
      {
        "tr": "bluz",
        "en": "blouse"
      },
      {
        "tr": "mavi",
        "en": "blue"
      },
      {
        "tr": "vücut bölümleri",
        "en": "body parts"
      },
      {
        "tr": "vücut",
        "en": "body"
      },
      {
        "tr": "bot",
        "en": "boots"
      },
      {
        "tr": "parlak",
        "en": "bright"
      },
      {
        "tr": "temiz",
        "en": "clean"
      },
      {
        "tr": "kıyafetler",
        "en": "clothes"
      },
      {
        "tr": "mont",
        "en": "coat"
      },
      {
        "tr": "soğuk hava",
        "en": "cold weather"
      },
      {
        "tr": "rahat",
        "en": "comfortable"
      },
      {
        "tr": "kostüm",
        "en": "costume"
      },
      {
        "tr": "kıvırcık",
        "en": "curly"
      },
      {
        "tr": "günlük rutinler",
        "en": "daily routines / activities"
      },
      {
        "tr": "resim çizmek",
        "en": "draw pictures"
      },
      {
        "tr": "elbise",
        "en": "dress"
      },
      {
        "tr": "erken",
        "en": "early"
      },
      {
        "tr": "dışarıda yemek",
        "en": "eat out"
      },
      {
        "tr": "göz rengi",
        "en": "eye colour"
      },
      {
        "tr": "gözler",
        "en": "eyes"
      },
      {
        "tr": "aile üyeleri",
        "en": "family members"
      },
      {
        "tr": "moda ipuçları",
        "en": "fashion tips"
      },
      {
        "tr": "moda",
        "en": "fashion"
      },
      {
        "tr": "ayaklar",
        "en": "feet"
      },
      {
        "tr": "kadın",
        "en": "female"
      },
      {
        "tr": "ayak",
        "en": "foot"
      },
      {
        "tr": "giyinmek",
        "en": "get dressed"
      },
      {
        "tr": "yataktan kalkmak",
        "en": "get up"
      },
      {
        "tr": "gözlük",
        "en": "glasses"
      },
      {
        "tr": "eldiven",
        "en": "gloves"
      },
      {
        "tr": "yürüyüşe çıkmak",
        "en": "go for a walk"
      },
      {
        "tr": "doğa yürüyüşüne çıkmak",
        "en": "go hiking"
      },
      {
        "tr": "koşuya çıkmak",
        "en": "go jogging"
      },
      {
        "tr": "parka gitmek",
        "en": "go to the park"
      },
      {
        "tr": "yeşil",
        "en": "green"
      },
      {
        "tr": "saç",
        "en": "hair"
      },
      {
        "tr": "el",
        "en": "hand"
      },
      {
        "tr": "el çantası",
        "en": "handbag"
      },
      {
        "tr": "şapka",
        "en": "hat"
      },
      {
        "tr": "baş",
        "en": "head"
      },
      {
        "tr": "başörtüsü",
        "en": "headscarf"
      },
      {
        "tr": "sağlık sorunları",
        "en": "health problems"
      },
      {
        "tr": "boy",
        "en": "height"
      },
      {
        "tr": "sıcak hava",
        "en": "hot weather"
      },
      {
        "tr": "nesne",
        "en": "item"
      },
      {
        "tr": "ceket",
        "en": "jacket"
      },
      {
        "tr": "kot pantolon",
        "en": "jeans"
      },
      {
        "tr": "kazak",
        "en": "jumper"
      },
      {
        "tr": "geç",
        "en": "late"
      },
      {
        "tr": "bacak",
        "en": "leg"
      },
      {
        "tr": "açık renk",
        "en": "light"
      },
      {
        "tr": "uzun",
        "en": "long"
      },
      {
        "tr": "öğle yemeği",
        "en": "lunch"
      },
      {
        "tr": "erkek",
        "en": "male"
      },
      {
        "tr": "adam",
        "en": "man"
      },
      {
        "tr": "orta boylu",
        "en": "medium height"
      },
      {
        "tr": "orta kilolu",
        "en": "medium weight"
      },
      {
        "tr": "arkadaşlarla buluşmak",
        "en": "meet friends"
      },
      {
        "tr": "gerekli",
        "en": "necessary"
      },
      {
        "tr": "boyun",
        "en": "neck"
      },
      {
        "tr": "kolye",
        "en": "necklace"
      },
      {
        "tr": "asla",
        "en": "never"
      },
      {
        "tr": "yeni",
        "en": "new"
      },
      {
        "tr": "burun",
        "en": "nose"
      },
      {
        "tr": "sadece",
        "en": "only"
      },
      {
        "tr": "fiziksel özellikler",
        "en": "physical features"
      },
      {
        "tr": "satranç oynamak",
        "en": "play chess"
      },
      {
        "tr": "bilgisayar oyunu oynamak",
        "en": "play video  games"
      },
      {
        "tr": "korumak",
        "en": "protect"
      },
      {
        "tr": "mor",
        "en": "purple"
      },
      {
        "tr": "giymek",
        "en": "put on"
      },
      {
        "tr": "yağmurluk",
        "en": "raincoat"
      },
      {
        "tr": "dergi okumak",
        "en": "read a magazine"
      },
      {
        "tr": "kitap okumak",
        "en": "read books"
      },
      {
        "tr": "atkı",
        "en": "scarf"
      },
      {
        "tr": "gömlek",
        "en": "shirt"
      },
      {
        "tr": "ayakkabılar",
        "en": "shoes"
      },
      {
        "tr": "alışveriş",
        "en": "shopping"
      },
      {
        "tr": "kısa",
        "en": "short"
      },
      {
        "tr": "etek",
        "en": "skirt"
      },
      {
        "tr": "zayıf",
        "en": "slim"
      },
      {
        "tr": "çoraplar",
        "en": "socks"
      },
      {
        "tr": "bazen",
        "en": "sometimes"
      },
      {
        "tr": "ilkbahar",
        "en": "spring"
      },
      {
        "tr": "düz",
        "en": "straight"
      },
      {
        "tr": "yaz",
        "en": "summer"
      },
      {
        "tr": "güneş gözlüğü",
        "en": "sunglasses"
      },
      {
        "tr": "uzun boylu",
        "en": "tall"
      },
      {
        "tr": "modaya uygun",
        "en": "trendy"
      },
      {
        "tr": "pantolon",
        "en": "trousers"
      },
      {
        "tr": "denemek",
        "en": "try on"
      },
      {
        "tr": "tişört",
        "en": "t-shirt"
      },
      {
        "tr": "şemsiye",
        "en": "umbrella"
      },
      {
        "tr": "genellikle",
        "en": "usually"
      },
      {
        "tr": "gardırop",
        "en": "wardrobe"
      },
      {
        "tr": "ılık",
        "en": "warm"
      },
      {
        "tr": "kol saati",
        "en": "watch"
      },
      {
        "tr": "televizyon izlemek",
        "en": "watch TV"
      },
      {
        "tr": "dalgalı",
        "en": "wavy"
      },
      {
        "tr": "giymek",
        "en": "wear"
      },
      {
        "tr": "kilo",
        "en": "weight"
      },
      {
        "tr": "beyaz",
        "en": "white"
      }
    ]
  },
  {
    "id": "src-5-school-life",
    "title": "Grade 5 · School Life",
    "emoji": "🏫",
    "category": "Grade 5",
    "desc": "Grade 5 · School Life — imported from topicsource/5-school-life.txt.",
    "words": [
      {
        "tr": "eylemler",
        "en": "actions"
      },
      {
        "tr": "idari birim",
        "en": "administration department"
      },
      {
        "tr": "idare",
        "en": "administration"
      },
      {
        "tr": "resim kulübü",
        "en": "art club"
      },
      {
        "tr": "yardımcı, asistan",
        "en": "assistant"
      },
      {
        "tr": "Azerbaycan",
        "en": "Azerbaijan"
      },
      {
        "tr": "yakın arkadaş",
        "en": "best friend"
      },
      {
        "tr": "Kanada",
        "en": "Canada"
      },
      {
        "tr": "kantin",
        "en": "canteen"
      },
      {
        "tr": "kutlamalar",
        "en": "celebrations"
      },
      {
        "tr": "satranç kulübü",
        "en": "chess club"
      },
      {
        "tr": "sakız çiğnemek",
        "en": "chew gum"
      },
      {
        "tr": "Çin",
        "en": "China"
      },
      {
        "tr": "sınıf",
        "en": "classroom"
      },
      {
        "tr": "antrenör, koç",
        "en": "coach"
      },
      {
        "tr": "boyamak",
        "en": "color"
      },
      {
        "tr": "konferans salonu",
        "en": "conference hall"
      },
      {
        "tr": "aşçı",
        "en": "cook"
      },
      {
        "tr": "ülke",
        "en": "country"
      },
      {
        "tr": "bölüm",
        "en": "department"
      },
      {
        "tr": "doktor",
        "en": "doctor"
      },
      {
        "tr": "drama kulübü",
        "en": "drama club"
      },
      {
        "tr": "resim çizmek",
        "en": "draw a picture"
      },
      {
        "tr": "hoşlanmak",
        "en": "enjoy"
      },
      {
        "tr": "çevre kulübü",
        "en": "environment club"
      },
      {
        "tr": "açıklamak",
        "en": "explain"
      },
      {
        "tr": "favori",
        "en": "favorite"
      },
      {
        "tr": "bulmak",
        "en": "find"
      },
      {
        "tr": "bayrak",
        "en": "flag"
      },
      {
        "tr": "katlamak",
        "en": "fold"
      },
      {
        "tr": "halk oyunları kulübü",
        "en": "folk dance club"
      },
      {
        "tr": "Fransa",
        "en": "France"
      },
      {
        "tr": "boş zaman",
        "en": "free time"
      },
      {
        "tr": "kapı",
        "en": "gate"
      },
      {
        "tr": "Almanya",
        "en": "Germany"
      },
      {
        "tr": "okul müdürü",
        "en": "headmaster"
      },
      {
        "tr": "hobiler",
        "en": "hobbies"
      },
      {
        "tr": "tanıtmak",
        "en": "introduce"
      },
      {
        "tr": "İtalya",
        "en": "Italy"
      },
      {
        "tr": "Japonya",
        "en": "Japan"
      },
      {
        "tr": "katılmak",
        "en": "join"
      },
      {
        "tr": "Kırgızistan",
        "en": "Kyrgyzstan"
      },
      {
        "tr": "laboratuvar kuralları",
        "en": "lab rules"
      },
      {
        "tr": "laboratuvar",
        "en": "lab"
      },
      {
        "tr": "kütüphane",
        "en": "library"
      },
      {
        "tr": "sevmek",
        "en": "like"
      },
      {
        "tr": "aramak",
        "en": "look for"
      },
      {
        "tr": "çok sevmek",
        "en": "love"
      },
      {
        "tr": "matematik kulübü",
        "en": "maths club"
      },
      {
        "tr": "Meksika",
        "en": "Mexico"
      },
      {
        "tr": "müzik kulübü",
        "en": "music club"
      },
      {
        "tr": "isim",
        "en": "name"
      },
      {
        "tr": "milli bayramlar",
        "en": "national days"
      },
      {
        "tr": "uymak",
        "en": "obey"
      },
      {
        "tr": "insanlar",
        "en": "people"
      },
      {
        "tr": "yer",
        "en": "place"
      },
      {
        "tr": "gitar çalmak",
        "en": "play the guitar"
      },
      {
        "tr": "korumak",
        "en": "protect"
      },
      {
        "tr": "kamu",
        "en": "public"
      },
      {
        "tr": "kitap okumak",
        "en": "read a book"
      },
      {
        "tr": "dini bayramlar",
        "en": "religious days"
      },
      {
        "tr": "yasalara saygı duymak",
        "en": "respect laws"
      },
      {
        "tr": "kural",
        "en": "rule"
      },
      {
        "tr": "koşmak",
        "en": "run"
      },
      {
        "tr": "Rusya",
        "en": "Russia"
      },
      {
        "tr": "güvenli",
        "en": "safe"
      },
      {
        "tr": "okul kulübü",
        "en": "school club"
      },
      {
        "tr": "okul gezileri",
        "en": "school trips"
      },
      {
        "tr": "fen / bilim kulübü",
        "en": "science club"
      },
      {
        "tr": "sekreter",
        "en": "secretary"
      },
      {
        "tr": "bağırmak",
        "en": "shout"
      },
      {
        "tr": "şarkı söylemek",
        "en": "sing a song"
      },
      {
        "tr": "problem çözmek",
        "en": "solve a problem"
      },
      {
        "tr": "İspanya",
        "en": "Spain"
      },
      {
        "tr": "öğrenci kartı",
        "en": "student card"
      },
      {
        "tr": "öğrenci",
        "en": "student"
      },
      {
        "tr": "ders",
        "en": "subject"
      },
      {
        "tr": "yaz kampları",
        "en": "summer camps"
      },
      {
        "tr": "konuşmak",
        "en": "talk"
      },
      {
        "tr": "öğretmen",
        "en": "teacher"
      },
      {
        "tr": "teknoloji kulübü",
        "en": "technology club"
      },
      {
        "tr": "Birleşik Krallık",
        "en": "UK (United Kingdom)"
      },
      {
        "tr": "istemek",
        "en": "want"
      },
      {
        "tr": "kim",
        "en": "who"
      }
    ]
  },
  {
    "id": "src-6-classroom-life",
    "title": "Grade 6 · Classroom Life",
    "emoji": "🏫",
    "category": "Grade 6",
    "desc": "Grade 6 · Classroom Life — imported from topicsource/6-classroom-life.txt.",
    "words": [
      {
        "tr": "diş fırçalamak",
        "en": "brush teeth"
      },
      {
        "tr": "okula gitmek",
        "en": "go to school"
      },
      {
        "tr": "kahvaltı yapmak",
        "en": "have breakfast"
      },
      {
        "tr": "okuldan sonra dinlenmek",
        "en": "rest after school"
      },
      {
        "tr": "uyanmak",
        "en": "wake up"
      },
      {
        "tr": "okula yürümek",
        "en": "walk to school"
      },
      {
        "tr": "günlük yazmak",
        "en": "write a diary"
      },
      {
        "tr": "soruları cevaplamak",
        "en": "answer questions"
      },
      {
        "tr": "cevapları kontrol etmek",
        "en": "check answers"
      },
      {
        "tr": "tartışmak",
        "en": "discuss"
      },
      {
        "tr": "projeye odaklanmak",
        "en": "focus on project"
      },
      {
        "tr": "geri bildirim vermek",
        "en": "give feedback"
      },
      {
        "tr": "öğrenme etkinlikleri",
        "en": "learning activities"
      },
      {
        "tr": "ikili çalışma",
        "en": "pairwork"
      },
      {
        "tr": "İngilizce pratik yapmak",
        "en": "practice English"
      },
      {
        "tr": "sunum hazırlamak",
        "en": "prepare the presentation"
      },
      {
        "tr": "yüksek sesle okumak",
        "en": "read aloud"
      },
      {
        "tr": "sessiz okumak",
        "en": "read silently"
      },
      {
        "tr": "dönüşümlü okumak",
        "en": "read in turns"
      },
      {
        "tr": "sıra sıra okumak",
        "en": "read one after another"
      },
      {
        "tr": "tekrar etmek",
        "en": "repeat"
      },
      {
        "tr": "gözden geçirmek",
        "en": "review"
      },
      {
        "tr": "dersleri tekrar etmek",
        "en": "revise lessons"
      },
      {
        "tr": "canlandırma",
        "en": "role-play"
      },
      {
        "tr": "araştırmak",
        "en": "search"
      },
      {
        "tr": "problemler çözmek",
        "en": "solve problems"
      },
      {
        "tr": "sıkı çalışmak",
        "en": "study hard"
      },
      {
        "tr": "notlar almak",
        "en": "take notes"
      },
      {
        "tr": "kelime çalışması",
        "en": "vocabulary work"
      },
      {
        "tr": "yalnız çalışmak",
        "en": "work alone"
      },
      {
        "tr": "grupla çalışmak",
        "en": "work in groups"
      },
      {
        "tr": "iki kişi birlikte çalışmak",
        "en": "work in pairs"
      },
      {
        "tr": "birlikte çalışmak",
        "en": "working together"
      },
      {
        "tr": "atölye çalışması",
        "en": "workshop"
      },
      {
        "tr": "yeni kelimeleri yazmak",
        "en": "write down new words"
      },
      {
        "tr": "kısa bir yazı yazmak",
        "en": "writing a brief"
      },
      {
        "tr": "sonra",
        "en": "after"
      },
      {
        "tr": "önce",
        "en": "before"
      },
      {
        "tr": "dikkatli",
        "en": "careful"
      },
      {
        "tr": "sınıf arkadaşı",
        "en": "classmate"
      },
      {
        "tr": "devam etmek",
        "en": "continue"
      },
      {
        "tr": "saymak",
        "en": "count"
      },
      {
        "tr": "yaratıcı",
        "en": "creative"
      },
      {
        "tr": "birbiri",
        "en": "each other"
      },
      {
        "tr": "kolayca",
        "en": "easily"
      },
      {
        "tr": "etkili",
        "en": "effective"
      },
      {
        "tr": "eğlenceli, keyifli",
        "en": "enjoyable"
      },
      {
        "tr": "ilk olarak",
        "en": "firstly"
      },
      {
        "tr": "alışkanlık",
        "en": "habit"
      },
      {
        "tr": "yardımsever",
        "en": "helpful"
      },
      {
        "tr": "fosforlu kalem",
        "en": "highlighter"
      },
      {
        "tr": "yönerge",
        "en": "instruction"
      },
      {
        "tr": "öğrenme yöntemleri",
        "en": "learning methods"
      },
      {
        "tr": "seviye",
        "en": "level"
      },
      {
        "tr": "kütüphane",
        "en": "library"
      },
      {
        "tr": "işaretlemek",
        "en": "mark"
      },
      {
        "tr": "yöntem",
        "en": "method"
      },
      {
        "tr": "puan",
        "en": "point"
      },
      {
        "tr": "geri dönüştürmek",
        "en": "recycle"
      },
      {
        "tr": "düzenli",
        "en": "regular"
      },
      {
        "tr": "hatırlamak",
        "en": "remember"
      },
      {
        "tr": "araştırma",
        "en": "research"
      },
      {
        "tr": "paylaşmak",
        "en": "share"
      },
      {
        "tr": "sınıflandırmak, ayırmak",
        "en": "sort"
      },
      {
        "tr": "tuhaf",
        "en": "strange"
      },
      {
        "tr": "görev",
        "en": "task"
      },
      {
        "tr": "birlikte",
        "en": "together"
      },
      {
        "tr": "gönüllü",
        "en": "volunteer"
      }
    ]
  },
  {
    "id": "src-6-family-life",
    "title": "Grade 6 · Family Life",
    "emoji": "👨👩👧",
    "category": "Grade 6",
    "desc": "Grade 6 · Family Life — imported from topicsource/6-family-life.txt.txt.",
    "words": [
      {
        "tr": "mimar",
        "en": "architect"
      },
      {
        "tr": "sanatçı",
        "en": "artist"
      },
      {
        "tr": "asistan",
        "en": "assistant"
      },
      {
        "tr": "yazar",
        "en": "author"
      },
      {
        "tr": "ciltçi",
        "en": "bookbinder"
      },
      {
        "tr": "patron",
        "en": "boss"
      },
      {
        "tr": "iş adamı",
        "en": "businessman"
      },
      {
        "tr": "komutan",
        "en": "commander"
      },
      {
        "tr": "aşçı",
        "en": "cook"
      },
      {
        "tr": "dişçi",
        "en": "dentist"
      },
      {
        "tr": "tasarımcı",
        "en": "designer"
      },
      {
        "tr": "dedektif",
        "en": "detective"
      },
      {
        "tr": "yönetmen",
        "en": "director"
      },
      {
        "tr": "doktor",
        "en": "doctor"
      },
      {
        "tr": "işçi",
        "en": "employee"
      },
      {
        "tr": "mühendis",
        "en": "engineer"
      },
      {
        "tr": "gazeteci",
        "en": "journalist"
      },
      {
        "tr": "avukat",
        "en": "lawyer"
      },
      {
        "tr": "yönetici",
        "en": "manager"
      },
      {
        "tr": "memur",
        "en": "officer"
      },
      {
        "tr": "boyacı",
        "en": "painter"
      },
      {
        "tr": "pilot",
        "en": "pilot"
      },
      {
        "tr": "profesör",
        "en": "professor"
      },
      {
        "tr": "muhabir",
        "en": "reporter"
      },
      {
        "tr": "asker",
        "en": "soldier"
      },
      {
        "tr": "öğretmen",
        "en": "teacher"
      },
      {
        "tr": "yabani yaşam fotoğrafçısı",
        "en": "wildlife photographer"
      },
      {
        "tr": "varmak",
        "en": "arrive"
      },
      {
        "tr": "katılmak",
        "en": "attend"
      },
      {
        "tr": "bir şeyde iyi olmak",
        "en": "be good at"
      },
      {
        "tr": "olmak",
        "en": "become"
      },
      {
        "tr": "sabırsızlanmak",
        "en": "can’t wait"
      },
      {
        "tr": "önemsemek",
        "en": "care"
      },
      {
        "tr": "taşımak",
        "en": "carry"
      },
      {
        "tr": "seçmek",
        "en": "choose"
      },
      {
        "tr": "kontrol etmek",
        "en": "control"
      },
      {
        "tr": "dekore etmek",
        "en": "decorate"
      },
      {
        "tr": "tasarlamak",
        "en": "design"
      },
      {
        "tr": "para kazanmak",
        "en": "earn money"
      },
      {
        "tr": "çiftçilik yapmak",
        "en": "farm"
      },
      {
        "tr": "bulmak",
        "en": "find"
      },
      {
        "tr": "uçmak",
        "en": "fly"
      },
      {
        "tr": "proje vermek",
        "en": "give a project"
      },
      {
        "tr": "toplantısı olmak",
        "en": "have a meeting"
      },
      {
        "tr": "yardım etmek",
        "en": "help"
      },
      {
        "tr": "dahil etmek",
        "en": "include"
      },
      {
        "tr": "tutmak",
        "en": "keep"
      },
      {
        "tr": "ayrılmak",
        "en": "leave"
      },
      {
        "tr": "eşleştirmek",
        "en": "match"
      },
      {
        "tr": "taşınmak",
        "en": "move"
      },
      {
        "tr": "boyamak",
        "en": "paint"
      },
      {
        "tr": "hazırlamak",
        "en": "prepare"
      },
      {
        "tr": "sunmak",
        "en": "present"
      },
      {
        "tr": "okumak",
        "en": "read"
      },
      {
        "tr": "tamir etmek",
        "en": "repair"
      },
      {
        "tr": "dinlenmek",
        "en": "rest"
      },
      {
        "tr": "yenileştirmek",
        "en": "restore"
      },
      {
        "tr": "geri dönmek",
        "en": "return"
      },
      {
        "tr": "araştırmak",
        "en": "search"
      },
      {
        "tr": "problem çözmek",
        "en": "solve problems"
      },
      {
        "tr": "(kulağa) gelmek",
        "en": "sound"
      },
      {
        "tr": "başlamak",
        "en": "start"
      },
      {
        "tr": "not almak",
        "en": "take notes"
      },
      {
        "tr": "(uçağın) havalanmak",
        "en": "take off"
      },
      {
        "tr": "fotoğraf çekmek",
        "en": "take photos"
      },
      {
        "tr": "seyahat etmek",
        "en": "travel"
      },
      {
        "tr": "kullanmak",
        "en": "use"
      },
      {
        "tr": "ziyaret etmek",
        "en": "visit"
      },
      {
        "tr": "beklemek",
        "en": "wait"
      },
      {
        "tr": "film izlemek",
        "en": "watch  films"
      },
      {
        "tr": "giymek",
        "en": "wear"
      },
      {
        "tr": "çalışmak",
        "en": "work"
      },
      {
        "tr": "belgeleri kontrol etmek",
        "en": "check documents"
      },
      {
        "tr": "hastaların dişlerini kontrol etmek",
        "en": "check patients’ teeth"
      },
      {
        "tr": "yemek pişirmek",
        "en": "cook meals"
      },
      {
        "tr": "sanat eserleri ve dekorasyon tasarlamak",
        "en": "design artworks and decorations"
      },
      {
        "tr": "sistemleri tasarlamak",
        "en": "design systems"
      },
      {
        "tr": "doğayı keşfetmek",
        "en": "explore and discover nature"
      },
      {
        "tr": "bina / duvar boyamak",
        "en": "paint buildings / walls"
      },
      {
        "tr": "yemek ve tatlı hazırlamak",
        "en": "prepares meals and desserts"
      },
      {
        "tr": "haber sunmak",
        "en": "reports the news"
      },
      {
        "tr": "her şeyi işletmek",
        "en": "run everything"
      },
      {
        "tr": "ürün satmak",
        "en": "sell products"
      },
      {
        "tr": "insanların dişleri ile ilgilenmek",
        "en": "takes care of people’s teeth"
      },
      {
        "tr": "öğrencilere öğretmek",
        "en": "teach students"
      },
      {
        "tr": "makinelerle çalışmak",
        "en": "work with machines"
      },
      {
        "tr": "kitaplar yazmak",
        "en": "write books"
      },
      {
        "tr": "butik otel",
        "en": "boutique hotel"
      },
      {
        "tr": "klinik",
        "en": "clinic"
      },
      {
        "tr": "şirket",
        "en": "company"
      },
      {
        "tr": "fabrika",
        "en": "factory"
      },
      {
        "tr": "film seti",
        "en": "film set"
      },
      {
        "tr": "devlet dairesi",
        "en": "government office"
      },
      {
        "tr": "mutfak",
        "en": "kitchen"
      },
      {
        "tr": "haber ajansı",
        "en": "news agency"
      },
      {
        "tr": "haber şirketi",
        "en": "news company"
      },
      {
        "tr": "ofis, büro",
        "en": "office"
      },
      {
        "tr": "restoran",
        "en": "restaurant"
      },
      {
        "tr": "okul",
        "en": "school"
      },
      {
        "tr": "üniversite",
        "en": "university"
      }
    ]
  },
  {
    "id": "src-6-life-in-the-nature",
    "title": "Grade 6 · Life In The Nature",
    "emoji": "🌿",
    "category": "Grade 6",
    "desc": "Grade 6 · Life In The Nature — imported from topicsource/6-life-in-the-nature.txt.txt.",
    "words": [
      {
        "tr": "hava kirliliği",
        "en": "air pollution"
      },
      {
        "tr": "su kirliliği",
        "en": "water pollution"
      },
      {
        "tr": "gürültü kirliliği",
        "en": "noise pollution"
      },
      {
        "tr": "elektromanyetik kirlilik",
        "en": "electromagnetic pollution"
      },
      {
        "tr": "toprak kirliliği",
        "en": "land / soil pollution"
      },
      {
        "tr": "iklim değişikliği",
        "en": "climate change"
      },
      {
        "tr": "ışık kirliliği",
        "en": "light pollution"
      },
      {
        "tr": "doğal kaynaklar",
        "en": "natural resources"
      },
      {
        "tr": "çevre kampanyası",
        "en": "environmental campaign"
      },
      {
        "tr": "küresel ısınma",
        "en": "global warming"
      },
      {
        "tr": "kuraklık",
        "en": "drought"
      },
      {
        "tr": "orman tahribi",
        "en": "deforestation"
      },
      {
        "tr": "nükleer atıklar",
        "en": "nuclear wastes"
      },
      {
        "tr": "buzulların erimesi",
        "en": "melting glaciers"
      },
      {
        "tr": "çevreye atılmış çöp",
        "en": "litter"
      },
      {
        "tr": "sera gazları",
        "en": "greenhouse gases"
      },
      {
        "tr": "zehirli kimyasallar",
        "en": "poisonous chemicals"
      },
      {
        "tr": "kuş gözlemciliği",
        "en": "bird watching"
      },
      {
        "tr": "kamp gezisi",
        "en": "camping trip"
      },
      {
        "tr": "kano sporu",
        "en": "canoeing"
      },
      {
        "tr": "bisiklete binme",
        "en": "cycling"
      },
      {
        "tr": "doğa yürüyüşü",
        "en": "hiking"
      },
      {
        "tr": "balık tutma",
        "en": "catching fish"
      },
      {
        "tr": "mağara keşfetme",
        "en": "exploring caves"
      },
      {
        "tr": "kardan adam yapma",
        "en": "making a snowman"
      },
      {
        "tr": "doğa yürüyüşü",
        "en": "nature walk"
      },
      {
        "tr": "kar kayağı yapma",
        "en": "skiing"
      },
      {
        "tr": "dağa tırmanma",
        "en": "climbing a mountain"
      },
      {
        "tr": "tekne turu",
        "en": "boat tour"
      },
      {
        "tr": "tekne gezisine katılma",
        "en": "joining a boat tour"
      },
      {
        "tr": "deveye binme",
        "en": "riding a camel"
      },
      {
        "tr": "kumdan kale yapma",
        "en": "making a sandcastle"
      },
      {
        "tr": "ata binme",
        "en": "riding a horse"
      },
      {
        "tr": "rafting",
        "en": "rafting"
      },
      {
        "tr": "yelken sporu",
        "en": "sailing"
      },
      {
        "tr": "buz pateni yapma",
        "en": "ice skating"
      },
      {
        "tr": "tüplü dalış",
        "en": "scuba diving"
      },
      {
        "tr": "snowboard yapma",
        "en": "snowboarding"
      },
      {
        "tr": "açık hava etkinliği",
        "en": "outdoor activity"
      },
      {
        "tr": "küresel ısınma",
        "en": "global warming"
      },
      {
        "tr": "iklim değişikliği",
        "en": "climate change"
      },
      {
        "tr": "kuraklık",
        "en": "drought"
      },
      {
        "tr": "ormansızlaşma",
        "en": "deforestation"
      },
      {
        "tr": "buzulların erimesi",
        "en": "melting glaciers"
      },
      {
        "tr": "aşırı nüfus artışı",
        "en": "overpopulation"
      },
      {
        "tr": "fosil yakıtlar",
        "en": "fossil fuels"
      },
      {
        "tr": "çevresel zarar",
        "en": "environmental damage"
      },
      {
        "tr": "enerji israfı",
        "en": "waste of energy"
      },
      {
        "tr": "su israfı",
        "en": "waste of water"
      },
      {
        "tr": "macera",
        "en": "adventure"
      },
      {
        "tr": "yapay",
        "en": "artificial"
      },
      {
        "tr": "katılmak",
        "en": "attend"
      },
      {
        "tr": "hava kirliliği",
        "en": "air pollution"
      },
      {
        "tr": "olmak",
        "en": "become"
      },
      {
        "tr": "inşa etmek",
        "en": "build"
      },
      {
        "tr": "temizlemek",
        "en": "clean"
      },
      {
        "tr": "iklim",
        "en": "climate"
      },
      {
        "tr": "tırmanmak",
        "en": "climb"
      },
      {
        "tr": "kamp",
        "en": "camp"
      },
      {
        "tr": "yarışma",
        "en": "competition"
      },
      {
        "tr": "inşaat",
        "en": "construction"
      },
      {
        "tr": "bisiklet sürme",
        "en": "cycling"
      },
      {
        "tr": "tehlike",
        "en": "danger"
      },
      {
        "tr": "tahrip etmek",
        "en": "destroy"
      },
      {
        "tr": "çizmek",
        "en": "draw"
      },
      {
        "tr": "atık boşaltmak",
        "en": "dump waste"
      },
      {
        "tr": "çevre dostu",
        "en": "eco-friendly"
      },
      {
        "tr": "fabrika",
        "en": "factory"
      },
      {
        "tr": "balık tutmak",
        "en": "fish"
      },
      {
        "tr": "orman",
        "en": "forest"
      },
      {
        "tr": "doğa yürüyüşü",
        "en": "hiking"
      },
      {
        "tr": "insan",
        "en": "human"
      },
      {
        "tr": "tatil",
        "en": "holiday"
      },
      {
        "tr": "artırmak",
        "en": "increase"
      },
      {
        "tr": "öğrenmek",
        "en": "learn"
      },
      {
        "tr": "ışıklar",
        "en": "lights"
      },
      {
        "tr": "en az",
        "en": "least"
      },
      {
        "tr": "az miktarda",
        "en": "little"
      },
      {
        "tr": "bırakmak",
        "en": "leave"
      },
      {
        "tr": "göl",
        "en": "lake"
      },
      {
        "tr": "toplamak",
        "en": "pick up"
      },
      {
        "tr": "dikmek",
        "en": "plant"
      },
      {
        "tr": "kirlilik",
        "en": "pollution"
      },
      {
        "tr": "korumak",
        "en": "protect"
      },
      {
        "tr": "toplu taşıma",
        "en": "public transport"
      },
      {
        "tr": "önlemek",
        "en": "prevent"
      },
      {
        "tr": "plastik",
        "en": "plastic"
      },
      {
        "tr": "rafting",
        "en": "rafting"
      },
      {
        "tr": "demiryolu",
        "en": "railway"
      },
      {
        "tr": "geri dönüştürmek",
        "en": "recycle"
      },
      {
        "tr": "geri dönüşüm kutusu",
        "en": "recycling bin"
      },
      {
        "tr": "azaltmak",
        "en": "reduce"
      },
      {
        "tr": "çıkarmak",
        "en": "remove"
      },
      {
        "tr": "tekrar kullanılabilir",
        "en": "reusable"
      },
      {
        "tr": "binmek",
        "en": "ride (a horse/bike)"
      },
      {
        "tr": "çöp",
        "en": "rubbish"
      },
      {
        "tr": "yelken",
        "en": "sailing"
      },
      {
        "tr": "tasarruf etmek, korumak",
        "en": "save"
      },
      {
        "tr": "kayak yapmak",
        "en": "ski"
      },
      {
        "tr": "snowboard",
        "en": "snowboarding"
      },
      {
        "tr": "çözüm",
        "en": "solution"
      },
      {
        "tr": "çözmek",
        "en": "solve"
      },
      {
        "tr": "yüzmek",
        "en": "swim"
      },
      {
        "tr": "almak",
        "en": "take"
      },
      {
        "tr": "trafik sıkışıklığı",
        "en": "traffic jam"
      },
      {
        "tr": "tramvay",
        "en": "tram"
      },
      {
        "tr": "denemek",
        "en": "try"
      },
      {
        "tr": "birlikte",
        "en": "together"
      },
      {
        "tr": "ışığı söndürmek",
        "en": "turn off the light"
      },
      {
        "tr": "ağaç dikme kampanyası",
        "en": "tree planting campaign"
      },
      {
        "tr": "metro",
        "en": "underground"
      },
      {
        "tr": "atık",
        "en": "waste"
      },
      {
        "tr": "su kirliliği",
        "en": "water pollution"
      },
      {
        "tr": "kış",
        "en": "winter"
      }
    ]
  },
  {
    "id": "src-6-life-in-the-neighbourhood",
    "title": "Grade 6 · Life In The Neighbourhood",
    "emoji": "🏘️",
    "category": "Grade 6",
    "desc": "Grade 6 · Life In The Neighbourhood — imported from topicsource/6-life-in-the-neighbourhood.txt.txt.",
    "words": [
      {
        "tr": "araba yolculuğu",
        "en": "drive"
      },
      {
        "tr": "kamyon",
        "en": "lorry"
      },
      {
        "tr": "ulaşım  araçları",
        "en": "means of transport"
      },
      {
        "tr": "motosiklet",
        "en": "motorcycle"
      },
      {
        "tr": "toplu taşıma",
        "en": "public transport"
      },
      {
        "tr": "demiryolu",
        "en": "railway"
      },
      {
        "tr": "gemi",
        "en": "ship"
      },
      {
        "tr": "tramvay",
        "en": "tram"
      },
      {
        "tr": "metro",
        "en": "tube / underground"
      },
      {
        "tr": "panelvan, kapalı kamyonet",
        "en": "van"
      },
      {
        "tr": "araç,  taşıt",
        "en": "vehicle"
      },
      {
        "tr": "tekerlek",
        "en": "wheel"
      },
      {
        "tr": "dinleyici, izleyici kitlesi",
        "en": "audience"
      },
      {
        "tr": "kutlamak",
        "en": "celebrate"
      },
      {
        "tr": "festival",
        "en": "festival"
      },
      {
        "tr": "caz müziği",
        "en": "jazz"
      },
      {
        "tr": "müzisyen",
        "en": "musician"
      },
      {
        "tr": "sergilemek, sahnelemek",
        "en": "perform"
      },
      {
        "tr": "pop müziği",
        "en": "pop"
      },
      {
        "tr": "rap müziği",
        "en": "rap"
      },
      {
        "tr": "rock müziği",
        "en": "rock"
      },
      {
        "tr": "düğün",
        "en": "wedding"
      },
      {
        "tr": "boyunca",
        "en": "along"
      },
      {
        "tr": "karşıdan karşıya geçmek",
        "en": "cross"
      },
      {
        "tr": "yön",
        "en": "direction"
      },
      {
        "tr": "üst geçit",
        "en": "overpass"
      },
      {
        "tr": "park etme",
        "en": "parking"
      },
      {
        "tr": "geçmiş, geçmek",
        "en": "past"
      },
      {
        "tr": "peron, platform",
        "en": "platform"
      },
      {
        "tr": "dümdüz, düz",
        "en": "straight"
      },
      {
        "tr": "alt geçit",
        "en": "underpass"
      },
      {
        "tr": "yakalamak",
        "en": "catch"
      },
      {
        "tr": "birini dahil etmek",
        "en": "count someone in"
      },
      {
        "tr": "beklemek (kısa süre)",
        "en": "hang on"
      },
      {
        "tr": "bağlantı kurmak, bağ",
        "en": "link"
      },
      {
        "tr": "düzenlemek",
        "en": "organise"
      },
      {
        "tr": "pratik yapmak",
        "en": "practice"
      },
      {
        "tr": "para toplamak",
        "en": "raise (money)"
      },
      {
        "tr": "binmek (bisiklet vb.), kısa sürüş",
        "en": "ride"
      },
      {
        "tr": "acele etmek",
        "en": "rush"
      },
      {
        "tr": "paten kaymak",
        "en": "skate"
      },
      {
        "tr": "yaratıcı",
        "en": "creative"
      },
      {
        "tr": "kalabalık",
        "en": "crowded"
      },
      {
        "tr": "misafir",
        "en": "guest"
      },
      {
        "tr": "yerel",
        "en": "local"
      },
      {
        "tr": "memnun",
        "en": "pleased"
      },
      {
        "tr": "yorgun",
        "en": "tired"
      },
      {
        "tr": "en iyi / daha iyi",
        "en": "best / better"
      },
      {
        "tr": "mahalle, çevre",
        "en": "neighbourhood"
      },
      {
        "tr": "yavaşça",
        "en": "slowly"
      },
      {
        "tr": "gaz / benzin",
        "en": "gas / petrol"
      },
      {
        "tr": "işaret, tabela",
        "en": "sign"
      },
      {
        "tr": "sosyal",
        "en": "social"
      },
      {
        "tr": "trafik sıkışıklığı",
        "en": "traffic jam"
      }
    ]
  },
  {
    "id": "src-6-life-in-the-universe",
    "title": "Grade 6 · Life In The Universe",
    "emoji": "🌌",
    "category": "Grade 6",
    "desc": "Grade 6 · Life In The Universe — imported from topicsource/6-life-in-the-universe.txt.txt.",
    "words": [
      {
        "tr": "atmosfer",
        "en": "atmosphere"
      },
      {
        "tr": "Dünya",
        "en": "Earth"
      },
      {
        "tr": "yeşil gezegen",
        "en": "green planet"
      },
      {
        "tr": "Jüpiter",
        "en": "Jupiter"
      },
      {
        "tr": "Mars",
        "en": "Mars"
      },
      {
        "tr": "ay, uydu",
        "en": "moon"
      },
      {
        "tr": "doğal uydu",
        "en": "natural satellite"
      },
      {
        "tr": "Neptün",
        "en": "Neptune"
      },
      {
        "tr": "yörünge",
        "en": "orbit"
      },
      {
        "tr": "gezegenler",
        "en": "planets"
      },
      {
        "tr": "Satürn",
        "en": "Saturn"
      },
      {
        "tr": "uzay",
        "en": "space"
      },
      {
        "tr": "Güneş",
        "en": "Sun"
      },
      {
        "tr": "Uranüs",
        "en": "Uranus"
      },
      {
        "tr": "Venüs",
        "en": "Venus"
      },
      {
        "tr": "hava kirliliği",
        "en": "air pollution"
      },
      {
        "tr": "çevre dostu şehirler",
        "en": "eco-cities"
      },
      {
        "tr": "tedavi bulmak",
        "en": "find a cure"
      },
      {
        "tr": "uçan arabalar",
        "en": "flying cars"
      },
      {
        "tr": "deniz seviyesinin yükselmesi",
        "en": "rising sea levels"
      },
      {
        "tr": "çatı tarımı",
        "en": "rooftop farm"
      },
      {
        "tr": "akıllı ev",
        "en": "smart house"
      },
      {
        "tr": "uzay yük gemileri",
        "en": "space cargo ships"
      },
      {
        "tr": "su altı şehirler",
        "en": "underwater cities"
      },
      {
        "tr": "su kirliliği",
        "en": "water pollution"
      },
      {
        "tr": "kar fırtınası",
        "en": "blizzard"
      },
      {
        "tr": "kuraklık",
        "en": "drought"
      },
      {
        "tr": "sel",
        "en": "flood"
      },
      {
        "tr": "şiddetli rüzgarlar",
        "en": "heavy winds"
      },
      {
        "tr": "kasırga",
        "en": "hurricane"
      },
      {
        "tr": "yıldırım",
        "en": "lightning"
      },
      {
        "tr": "fırtına",
        "en": "storm"
      },
      {
        "tr": "gök gürültülü fırtına",
        "en": "thunderstorm"
      },
      {
        "tr": "hortum",
        "en": "tornado"
      },
      {
        "tr": "su kıtlığı",
        "en": "water shortage"
      },
      {
        "tr": "ağaçlar dikmek",
        "en": "plant trees"
      },
      {
        "tr": "su kaynaklarını korumak",
        "en": "protect water sources"
      },
      {
        "tr": "geri dönüştürmek",
        "en": "recycle"
      },
      {
        "tr": "azaltmak",
        "en": "reduce"
      },
      {
        "tr": "enerji tasarrufu yapmak",
        "en": "save  energy"
      },
      {
        "tr": "ayıklamak",
        "en": "sort something out"
      },
      {
        "tr": "daha kısa duş almak",
        "en": "take a shorter shower"
      },
      {
        "tr": "ışıkları kapatmak",
        "en": "turn off the lights"
      },
      {
        "tr": "muslukları kapatmak",
        "en": "turn off the taps"
      },
      {
        "tr": "toplu taşıma kullanmak",
        "en": "use public transportation"
      },
      {
        "tr": "geri dönüştürülmüş ürünler kullanmak",
        "en": "use recycled products"
      },
      {
        "tr": "yenilenebilir enerji kaynakları kullanmak",
        "en": "use renewable energy sources"
      },
      {
        "tr": "suyu israf etmek",
        "en": "waste water"
      },
      {
        "tr": "canlı",
        "en": "alive"
      },
      {
        "tr": "aydınlık",
        "en": "bright"
      },
      {
        "tr": "yakın",
        "en": "close"
      },
      {
        "tr": "soğuk",
        "en": "cold"
      },
      {
        "tr": "yaygın",
        "en": "common"
      },
      {
        "tr": "tehlikeli",
        "en": "dangerous"
      },
      {
        "tr": "çevre dostu",
        "en": "eco-friendly"
      },
      {
        "tr": "yeterli",
        "en": "enough"
      },
      {
        "tr": "heyecan verici",
        "en": "exciting"
      },
      {
        "tr": "uzak, çok uzak",
        "en": "far away"
      },
      {
        "tr": "dondurucu",
        "en": "freezing"
      },
      {
        "tr": "daha mutlu",
        "en": "happier"
      },
      {
        "tr": "sıcak",
        "en": "hot"
      },
      {
        "tr": "ilgi çekici",
        "en": "interesting"
      },
      {
        "tr": "huzurlu",
        "en": "peaceful"
      },
      {
        "tr": "mümkün",
        "en": "possible"
      },
      {
        "tr": "daha güvenli",
        "en": "safer"
      },
      {
        "tr": "kalın",
        "en": "thick"
      },
      {
        "tr": "sıra dışı",
        "en": "unusual"
      },
      {
        "tr": "görülebilir",
        "en": "visible"
      },
      {
        "tr": "eminim",
        "en": "I am sure"
      },
      {
        "tr": "inanıyorum",
        "en": "I believe"
      },
      {
        "tr": "umarım",
        "en": "I hope"
      },
      {
        "tr": "bence",
        "en": "I think"
      },
      {
        "tr": "buz devi",
        "en": "ice giant"
      },
      {
        "tr": "benim fikrime göre",
        "en": "In my opinion"
      },
      {
        "tr": "-den oluşmak",
        "en": "be composed of"
      },
      {
        "tr": "oluşturmak, yaratmak",
        "en": "create"
      },
      {
        "tr": "gelişme",
        "en": "development"
      },
      {
        "tr": "afet",
        "en": "disaster"
      },
      {
        "tr": "hastalık",
        "en": "disease"
      },
      {
        "tr": "mesafe",
        "en": "distance"
      },
      {
        "tr": "damla",
        "en": "drop"
      },
      {
        "tr": "var olmak",
        "en": "exist"
      },
      {
        "tr": "deneyim",
        "en": "experience"
      },
      {
        "tr": "uzman",
        "en": "expert"
      },
      {
        "tr": "fabrika",
        "en": "factory"
      },
      {
        "tr": "ünlü kişi",
        "en": "famous person"
      },
      {
        "tr": "aydınlatmak",
        "en": "give light"
      },
      {
        "tr": "cam",
        "en": "glass"
      },
      {
        "tr": "amaç, hedef",
        "en": "goal"
      },
      {
        "tr": "zarar vermek",
        "en": "harm"
      },
      {
        "tr": "tatil türü",
        "en": "holiday type"
      },
      {
        "tr": "icat etmek",
        "en": "invent"
      },
      {
        "tr": "göl",
        "en": "lake"
      },
      {
        "tr": "kumdan kale",
        "en": "sandcastle"
      },
      {
        "tr": "doğa",
        "en": "nature"
      },
      {
        "tr": "yeni teknoloji",
        "en": "new technology"
      },
      {
        "tr": "yörünge, yörüngede dönmek",
        "en": "orbit"
      },
      {
        "tr": "kağıt",
        "en": "paper"
      },
      {
        "tr": "plastik poşetler",
        "en": "plastic bags"
      },
      {
        "tr": "pet şişeler",
        "en": "plastic bottles"
      },
      {
        "tr": "nüfus",
        "en": "population"
      },
      {
        "tr": "tahmin etmek",
        "en": "predict"
      },
      {
        "tr": "demiryolu",
        "en": "railway"
      },
      {
        "tr": "nehir",
        "en": "river"
      },
      {
        "tr": "tükenmek",
        "en": "run out of"
      },
      {
        "tr": "bilim insanları",
        "en": "scientists"
      },
      {
        "tr": "deniz kenarı",
        "en": "seaside"
      },
      {
        "tr": "gökyüzü",
        "en": "sky"
      },
      {
        "tr": "güneş panelleri",
        "en": "solar panels"
      },
      {
        "tr": "yakında",
        "en": "soon"
      },
      {
        "tr": "kaynak",
        "en": "source"
      },
      {
        "tr": "hayatta kalmak",
        "en": "survive"
      },
      {
        "tr": "sıcaklık",
        "en": "temperature"
      },
      {
        "tr": "seyahat etmek",
        "en": "travel"
      },
      {
        "tr": "evren",
        "en": "universe"
      },
      {
        "tr": "dünya",
        "en": "world"
      }
    ]
  },
  {
    "id": "src-6-life-in-the-world",
    "title": "Grade 6 · Life In The World",
    "emoji": "🌍",
    "category": "Grade 6",
    "desc": "Grade 6 · Life In The World — imported from topicsource/6-life-in-the-world.txt.txt.",
    "words": [
      {
        "tr": "Avusturya",
        "en": "Austria"
      },
      {
        "tr": "Avusturyalı",
        "en": "Austrian"
      },
      {
        "tr": "Belçikalı",
        "en": "Belgian"
      },
      {
        "tr": "Belçika",
        "en": "Belgium"
      },
      {
        "tr": "Danimarkalı",
        "en": "Danish"
      },
      {
        "tr": "Danimarka",
        "en": "Denmark"
      },
      {
        "tr": "Hollandalı",
        "en": "Dutch"
      },
      {
        "tr": "İngiltere",
        "en": "England"
      },
      {
        "tr": "İngiliz / İngilizce",
        "en": "English"
      },
      {
        "tr": "Fransa",
        "en": "France"
      },
      {
        "tr": "Fransız / Fransızca",
        "en": "French"
      },
      {
        "tr": "Alman / Almanca",
        "en": "German"
      },
      {
        "tr": "Almanya",
        "en": "Germany"
      },
      {
        "tr": "Yunanistan",
        "en": "Greece"
      },
      {
        "tr": "Yunan / Yunanca",
        "en": "Greek"
      },
      {
        "tr": "Hindistan",
        "en": "India"
      },
      {
        "tr": "Hintli",
        "en": "Indian"
      },
      {
        "tr": "İtalyan / İtalyanca",
        "en": "Italian"
      },
      {
        "tr": "İtalya",
        "en": "Italy"
      },
      {
        "tr": "Polonya",
        "en": "Poland"
      },
      {
        "tr": "Polonyalı",
        "en": "Polish"
      },
      {
        "tr": "İspanya",
        "en": "Spain"
      },
      {
        "tr": "İspanyol / İspanyolca",
        "en": "Spanish"
      },
      {
        "tr": "İsveç",
        "en": "Sweden"
      },
      {
        "tr": "İsveçli / İsveççe",
        "en": "Swedish"
      },
      {
        "tr": "Hollanda",
        "en": "The Netherlands"
      },
      {
        "tr": "Türk / Türkçe",
        "en": "Turkish"
      },
      {
        "tr": "Kıbrıs Türkü",
        "en": "Turkish Cypriot"
      },
      {
        "tr": "Kuzey Kıbrıs Türk Cumhuriyeti",
        "en": "Turkish Republic of Northern Cyprus"
      },
      {
        "tr": "meze, iştah açıcı",
        "en": "appetiser"
      },
      {
        "tr": "acı (tat)",
        "en": "bitter"
      },
      {
        "tr": "gevrek, çıtır çıtır",
        "en": "crispy"
      },
      {
        "tr": "kıtır kıtır, çıtır",
        "en": "crunchy"
      },
      {
        "tr": "mutfak, yemek kültürü",
        "en": "cuisine"
      },
      {
        "tr": "tatlı",
        "en": "dessert"
      },
      {
        "tr": "yemek",
        "en": "dish"
      },
      {
        "tr": "kurutmak, kurumak",
        "en": "dry"
      },
      {
        "tr": "mantı, hamur köftesi",
        "en": "dumpling"
      },
      {
        "tr": "lezzetli, aromalı",
        "en": "flavourful"
      },
      {
        "tr": "yemek tezgahı, büfe",
        "en": "food stall"
      },
      {
        "tr": "ısıtmak",
        "en": "heat"
      },
      {
        "tr": "ev yapımı",
        "en": "homemade"
      },
      {
        "tr": "malzeme",
        "en": "ingredient"
      },
      {
        "tr": "ana yemek",
        "en": "main course"
      },
      {
        "tr": "seyyar pazar",
        "en": "pop-up market"
      },
      {
        "tr": "ekşi",
        "en": "sour"
      },
      {
        "tr": "baharatlı",
        "en": "spicy"
      },
      {
        "tr": "sokak lezzeti / yemeği",
        "en": "street food"
      },
      {
        "tr": "herhangi bir yer, hiçbir yer",
        "en": "anywhere"
      },
      {
        "tr": "başkent",
        "en": "capital"
      },
      {
        "tr": "yarışma",
        "en": "competition"
      },
      {
        "tr": "ülke",
        "en": "country"
      },
      {
        "tr": "her yer, her yere",
        "en": "everywhere"
      },
      {
        "tr": "deneyim, tecrübe",
        "en": "experience"
      },
      {
        "tr": "bayrak",
        "en": "flag"
      },
      {
        "tr": "yabancı",
        "en": "foreign"
      },
      {
        "tr": "harika, muhteşem",
        "en": "gorgeous"
      },
      {
        "tr": "hükümet",
        "en": "government"
      },
      {
        "tr": "miras (kültürel miras)",
        "en": "heritage"
      },
      {
        "tr": "yüksek kaliteli",
        "en": "high-quality"
      },
      {
        "tr": "tarihi",
        "en": "historic"
      },
      {
        "tr": "inanılmaz",
        "en": "incredible"
      },
      {
        "tr": "millet, ulus",
        "en": "nation"
      },
      {
        "tr": "ulusal, milli",
        "en": "national"
      },
      {
        "tr": "hiçbir yer, hiçbir yere",
        "en": "nowhere"
      },
      {
        "tr": "resmi",
        "en": "official"
      },
      {
        "tr": "bir yer, bir yere",
        "en": "somewhere"
      },
      {
        "tr": "gelenek",
        "en": "tradition"
      },
      {
        "tr": "geleneksel",
        "en": "traditional"
      },
      {
        "tr": "değer, değerinde",
        "en": "worth"
      }
    ]
  },
  {
    "id": "src-6-personal-life",
    "title": "Grade 6 · Personal Life",
    "emoji": "🙋",
    "category": "Grade 6",
    "desc": "Grade 6 · Personal Life — imported from topicsource/6-personal-life.txt.txt.",
    "words": [
      {
        "tr": "çok zeki, harika",
        "en": "brilliant"
      },
      {
        "tr": "ilgili, düşünceli",
        "en": "caring"
      },
      {
        "tr": "zeki",
        "en": "clever"
      },
      {
        "tr": "enerjik",
        "en": "energetic"
      },
      {
        "tr": "odaklanmış",
        "en": "focused"
      },
      {
        "tr": "arkadaş canlısı",
        "en": "friendly"
      },
      {
        "tr": "komik",
        "en": "funny"
      },
      {
        "tr": "harika",
        "en": "great"
      },
      {
        "tr": "yardımsever",
        "en": "helpful"
      },
      {
        "tr": "bağımsız",
        "en": "independent"
      },
      {
        "tr": "nazik, iyi kalpli",
        "en": "kind"
      },
      {
        "tr": "planlı, düzenli",
        "en": "organised"
      },
      {
        "tr": "sabırlı",
        "en": "patient"
      },
      {
        "tr": "kibar",
        "en": "polite"
      },
      {
        "tr": "sosyal",
        "en": "social"
      },
      {
        "tr": "düzenli",
        "en": "tidy"
      },
      {
        "tr": "tembel",
        "en": "lazy"
      },
      {
        "tr": "kaba",
        "en": "rude"
      },
      {
        "tr": "ciddi",
        "en": "serious"
      },
      {
        "tr": "zayıf",
        "en": "weak"
      },
      {
        "tr": "çekici",
        "en": "attractive"
      },
      {
        "tr": "güzel",
        "en": "beautiful"
      },
      {
        "tr": "sevimli",
        "en": "cute"
      },
      {
        "tr": "yakışıklı",
        "en": "handsome"
      },
      {
        "tr": "hoş, güzel",
        "en": "pretty"
      },
      {
        "tr": "yaşlı",
        "en": "old"
      },
      {
        "tr": "genç",
        "en": "young"
      },
      {
        "tr": "ayak bileği",
        "en": "ankle"
      },
      {
        "tr": "sırt",
        "en": "back"
      },
      {
        "tr": "göz",
        "en": "eye"
      },
      {
        "tr": "saç",
        "en": "hair"
      },
      {
        "tr": "kalp",
        "en": "heart"
      },
      {
        "tr": "diz",
        "en": "knee"
      },
      {
        "tr": "bacak",
        "en": "leg"
      },
      {
        "tr": "boyun",
        "en": "neck"
      },
      {
        "tr": "deri, ten",
        "en": "skin"
      },
      {
        "tr": "çizme",
        "en": "boot"
      },
      {
        "tr": "kaban",
        "en": "coat"
      },
      {
        "tr": "ceket",
        "en": "jacket"
      },
      {
        "tr": "kot pantolon",
        "en": "jeans"
      },
      {
        "tr": "pantolon",
        "en": "pants"
      },
      {
        "tr": "cep",
        "en": "pocket"
      },
      {
        "tr": "gömlek",
        "en": "shirt"
      },
      {
        "tr": "ayakkabı",
        "en": "shoes"
      },
      {
        "tr": "etek",
        "en": "skirt"
      },
      {
        "tr": "tayt",
        "en": "tights"
      },
      {
        "tr": "spor ayakkabı",
        "en": "trainers"
      },
      {
        "tr": "tombul",
        "en": "fat"
      },
      {
        "tr": "kısa boylu",
        "en": "short"
      },
      {
        "tr": "zayıf, ince",
        "en": "slim"
      },
      {
        "tr": "güçlü",
        "en": "strong"
      },
      {
        "tr": "uzun boylu",
        "en": "tall"
      },
      {
        "tr": "zayıf",
        "en": "thin"
      },
      {
        "tr": "güçsüz",
        "en": "weak"
      },
      {
        "tr": "kıvırcık",
        "en": "curly"
      },
      {
        "tr": "düz",
        "en": "straight"
      },
      {
        "tr": "dalgalı",
        "en": "wavy"
      },
      {
        "tr": "uzun",
        "en": "long"
      },
      {
        "tr": "kısa",
        "en": "short"
      },
      {
        "tr": "sarı",
        "en": "blonde"
      },
      {
        "tr": "açık renkli",
        "en": "fair"
      },
      {
        "tr": "sırt çantası",
        "en": "backpack"
      },
      {
        "tr": "bileklik",
        "en": "bracelet"
      },
      {
        "tr": "zincir",
        "en": "chain"
      },
      {
        "tr": "şapka",
        "en": "hat"
      },
      {
        "tr": "mücevher, takı",
        "en": "jewellery"
      },
      {
        "tr": "kolye",
        "en": "necklace"
      },
      {
        "tr": "cüzdan",
        "en": "purse"
      },
      {
        "tr": "cüzdan",
        "en": "wallet"
      }
    ]
  },
  {
    "id": "src-6-school-life",
    "title": "Grade 6 · School Life",
    "emoji": "🏫",
    "category": "Grade 6",
    "desc": "Grade 6 · School Life — imported from topicsource/6-school-life.txt.",
    "words": [
      {
        "tr": "lider olmak",
        "en": "being the leader"
      },
      {
        "tr": "bayrağı taşımak",
        "en": "carrying the flag"
      },
      {
        "tr": "milli bir günü kutlamak",
        "en": "celebrating a national day"
      },
      {
        "tr": "ödev yapmak",
        "en": "doing homework"
      },
      {
        "tr": "kurallara uymak",
        "en": "follow the rules"
      },
      {
        "tr": "program yönetmek",
        "en": "guiding the program"
      },
      {
        "tr": "yardım etmek",
        "en": "help"
      },
      {
        "tr": "okulu temiz tutmak",
        "en": "keep the school clean"
      },
      {
        "tr": "öğretmeni dinlemek",
        "en": "listening to the teacher"
      },
      {
        "tr": "pano hazırlamak",
        "en": "prepare the bulletin board"
      },
      {
        "tr": "şiir okumak",
        "en": "read a poem"
      },
      {
        "tr": "özlü sözler araştırmak",
        "en": "research quotes"
      },
      {
        "tr": "birlikte şarkı söylemek",
        "en": "singing together"
      },
      {
        "tr": "birbirini desteklemek",
        "en": "support each other"
      },
      {
        "tr": "masayı düzenlemek",
        "en": "tidy the table"
      },
      {
        "tr": "sırayı temizlemek",
        "en": "clean up the desk"
      },
      {
        "tr": "kutlama",
        "en": "a celebration"
      },
      {
        "tr": "bayram",
        "en": "a festival"
      },
      {
        "tr": "matematik sınavı",
        "en": "a math exam"
      },
      {
        "tr": "müzik konseri",
        "en": "a music concert"
      },
      {
        "tr": "okul töreni",
        "en": "a school ceremony"
      },
      {
        "tr": "konuşma",
        "en": "a speech"
      },
      {
        "tr": "spor kulübü",
        "en": "a sports club"
      },
      {
        "tr": "yetenek gösterisi",
        "en": "a talent show"
      },
      {
        "tr": "resim kulübü",
        "en": "an art club"
      },
      {
        "tr": "toplantı",
        "en": "an assembly"
      },
      {
        "tr": "deneyler yapmak",
        "en": "doing experiments"
      },
      {
        "tr": "sınav haftası",
        "en": "examination week"
      },
      {
        "tr": "görüşme",
        "en": "interview"
      },
      {
        "tr": "geçit töreni",
        "en": "parade"
      },
      {
        "tr": "spor yapmak",
        "en": "playing sports"
      },
      {
        "tr": "kitap okumak",
        "en": "reading a book"
      },
      {
        "tr": "koşu yarışı",
        "en": "running race"
      },
      {
        "tr": "fen,  bilim kulübü",
        "en": "science club"
      },
      {
        "tr": "özel yetenek sınavı",
        "en": "special talent exam"
      },
      {
        "tr": "koro",
        "en": "the choir"
      },
      {
        "tr": "geçit töreni",
        "en": "the parade"
      },
      {
        "tr": "sınıf",
        "en": "a classroom"
      },
      {
        "tr": "konferans salonu",
        "en": "a conference hall"
      },
      {
        "tr": "laboratuvar",
        "en": "a lab"
      },
      {
        "tr": "kütüphane",
        "en": "a library"
      },
      {
        "tr": "yemekhane",
        "en": "a lunch hall"
      },
      {
        "tr": "oyun alanı",
        "en": "a playground"
      },
      {
        "tr": "spor sahası",
        "en": "a sports field"
      },
      {
        "tr": "öğretmen odası",
        "en": "a teacher’s room"
      },
      {
        "tr": "okul bahçesi",
        "en": "a school garden"
      },
      {
        "tr": "müdür",
        "en": "a headmaster"
      },
      {
        "tr": "ebeveyn",
        "en": "a parent"
      },
      {
        "tr": "fen bilgisi öğretmeni",
        "en": "a science teacher"
      },
      {
        "tr": "sekreter",
        "en": "a secretary"
      },
      {
        "tr": "beden eğitimi öğretmeni",
        "en": "a sports teacher"
      },
      {
        "tr": "harika",
        "en": "amazing"
      },
      {
        "tr": "havalı",
        "en": "cool"
      },
      {
        "tr": "enerjik",
        "en": "energetic"
      },
      {
        "tr": "mükemmel",
        "en": "excellent"
      },
      {
        "tr": "heyecan verici",
        "en": "exciting"
      },
      {
        "tr": "yardımsever",
        "en": "helpful"
      },
      {
        "tr": "gergin",
        "en": "nervous"
      },
      {
        "tr": "planlı, organize",
        "en": "organized"
      },
      {
        "tr": "popüler",
        "en": "popular"
      },
      {
        "tr": "başarılı",
        "en": "successful"
      },
      {
        "tr": "unutulmaz",
        "en": "unforgettable"
      },
      {
        "tr": "mükemmel",
        "en": "wonderful"
      },
      {
        "tr": "endişelenme",
        "en": "don’t worry"
      },
      {
        "tr": "mükemmel gidiyor",
        "en": "it goes perfectly"
      },
      {
        "tr": "bunu duymak güzel",
        "en": "it’s nice to hear that"
      },
      {
        "tr": "haydi acele edelim",
        "en": "let’s hurry"
      },
      {
        "tr": "seni asla hayal kırıklığına uğratmam",
        "en": "never let you down"
      },
      {
        "tr": "hiçbir şey imkansız değildir",
        "en": "nothing is impossible"
      },
      {
        "tr": "seninle gurur duyuyorum",
        "en": "so proud of you"
      },
      {
        "tr": "teşekkür ederim",
        "en": "thank you"
      },
      {
        "tr": "bu mükemmel bir fikir",
        "en": "that’s a great idea"
      },
      {
        "tr": "bu harika",
        "en": "that’s amazing"
      },
      {
        "tr": "bir şey değil",
        "en": "you are welcome"
      }
    ]
  }
];




  window.VOCAB_TOPICS = TOPICS;
})();
