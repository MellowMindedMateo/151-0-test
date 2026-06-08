"use client";
import { useState, useEffect, useRef } from "react";

// ── POKEMON DATA ──────────────────────────────────────────────────────────────
const GEN1 = [
  {id:1,name:"Bulbasaur",types:["Grass","Poison"],bst:318},{id:2,name:"Ivysaur",types:["Grass","Poison"],bst:405},{id:3,name:"Venusaur",types:["Grass","Poison"],bst:525},
  {id:4,name:"Charmander",types:["Fire"],bst:309},{id:5,name:"Charmeleon",types:["Fire"],bst:405},{id:6,name:"Charizard",types:["Fire","Flying"],bst:534},
  {id:7,name:"Squirtle",types:["Water"],bst:314},{id:8,name:"Wartortle",types:["Water"],bst:405},{id:9,name:"Blastoise",types:["Water"],bst:530},
  {id:10,name:"Caterpie",types:["Bug"],bst:195},{id:11,name:"Metapod",types:["Bug"],bst:205},{id:12,name:"Butterfree",types:["Bug","Flying"],bst:395},
  {id:13,name:"Weedle",types:["Bug","Poison"],bst:195},{id:14,name:"Kakuna",types:["Bug","Poison"],bst:205},{id:15,name:"Beedrill",types:["Bug","Poison"],bst:395},
  {id:16,name:"Pidgey",types:["Normal","Flying"],bst:251},{id:17,name:"Pidgeotto",types:["Normal","Flying"],bst:349},{id:18,name:"Pidgeot",types:["Normal","Flying"],bst:479},
  {id:19,name:"Rattata",types:["Normal"],bst:253},{id:20,name:"Raticate",types:["Normal"],bst:413},{id:21,name:"Spearow",types:["Normal","Flying"],bst:262},
  {id:22,name:"Fearow",types:["Normal","Flying"],bst:442},{id:23,name:"Ekans",types:["Poison"],bst:288},{id:24,name:"Arbok",types:["Poison"],bst:448},
  {id:25,name:"Pikachu",types:["Electric"],bst:320},{id:26,name:"Raichu",types:["Electric"],bst:485},{id:27,name:"Sandshrew",types:["Ground"],bst:300},
  {id:28,name:"Sandslash",types:["Ground"],bst:450},{id:29,name:"Nidoran♀",types:["Poison"],bst:275},{id:30,name:"Nidorina",types:["Poison"],bst:365},
  {id:31,name:"Nidoqueen",types:["Poison","Ground"],bst:505},{id:32,name:"Nidoran♂",types:["Poison"],bst:273},{id:33,name:"Nidorino",types:["Poison"],bst:365},
  {id:34,name:"Nidoking",types:["Poison","Ground"],bst:505},{id:35,name:"Clefairy",types:["Normal"],bst:323},{id:36,name:"Clefable",types:["Normal"],bst:483},
  {id:37,name:"Vulpix",types:["Fire"],bst:299},{id:38,name:"Ninetales",types:["Fire"],bst:505},{id:39,name:"Jigglypuff",types:["Normal"],bst:270},
  {id:40,name:"Wigglytuff",types:["Normal"],bst:435},{id:41,name:"Zubat",types:["Poison","Flying"],bst:245},{id:42,name:"Golbat",types:["Poison","Flying"],bst:455},
  {id:43,name:"Oddish",types:["Grass","Poison"],bst:320},{id:44,name:"Gloom",types:["Grass","Poison"],bst:395},{id:45,name:"Vileplume",types:["Grass","Poison"],bst:490},
  {id:46,name:"Paras",types:["Bug","Grass"],bst:285},{id:47,name:"Parasect",types:["Bug","Grass"],bst:405},{id:48,name:"Venonat",types:["Bug","Poison"],bst:305},
  {id:49,name:"Venomoth",types:["Bug","Poison"],bst:450},{id:50,name:"Diglett",types:["Ground"],bst:265},{id:51,name:"Dugtrio",types:["Ground"],bst:425},
  {id:52,name:"Meowth",types:["Normal"],bst:290},{id:53,name:"Persian",types:["Normal"],bst:440},{id:54,name:"Psyduck",types:["Water"],bst:320},
  {id:55,name:"Golduck",types:["Water"],bst:500},{id:56,name:"Mankey",types:["Fighting"],bst:305},{id:57,name:"Primeape",types:["Fighting"],bst:455},
  {id:58,name:"Growlithe",types:["Fire"],bst:350},{id:59,name:"Arcanine",types:["Fire"],bst:555},{id:60,name:"Poliwag",types:["Water"],bst:300},
  {id:61,name:"Poliwhirl",types:["Water"],bst:385},{id:62,name:"Poliwrath",types:["Water","Fighting"],bst:510},{id:63,name:"Abra",types:["Psychic"],bst:310},
  {id:64,name:"Kadabra",types:["Psychic"],bst:400},{id:65,name:"Alakazam",types:["Psychic"],bst:500},{id:66,name:"Machop",types:["Fighting"],bst:305},
  {id:67,name:"Machoke",types:["Fighting"],bst:405},{id:68,name:"Machamp",types:["Fighting"],bst:505},{id:69,name:"Bellsprout",types:["Grass","Poison"],bst:300},
  {id:70,name:"Weepinbell",types:["Grass","Poison"],bst:390},{id:71,name:"Victreebel",types:["Grass","Poison"],bst:490},{id:72,name:"Tentacool",types:["Water","Poison"],bst:335},
  {id:73,name:"Tentacruel",types:["Water","Poison"],bst:515},{id:74,name:"Geodude",types:["Rock","Ground"],bst:300},{id:75,name:"Graveler",types:["Rock","Ground"],bst:390},
  {id:76,name:"Golem",types:["Rock","Ground"],bst:495},{id:77,name:"Ponyta",types:["Fire"],bst:410},{id:78,name:"Rapidash",types:["Fire"],bst:500},
  {id:79,name:"Slowpoke",types:["Water","Psychic"],bst:315},{id:80,name:"Slowbro",types:["Water","Psychic"],bst:490},{id:81,name:"Magnemite",types:["Electric","Steel"],bst:325},
  {id:82,name:"Magneton",types:["Electric","Steel"],bst:465},{id:83,name:"Farfetch'd",types:["Normal","Flying"],bst:377},{id:84,name:"Doduo",types:["Normal","Flying"],bst:310},
  {id:85,name:"Dodrio",types:["Normal","Flying"],bst:470},{id:86,name:"Seel",types:["Water"],bst:325},{id:87,name:"Dewgong",types:["Water","Ice"],bst:475},
  {id:88,name:"Grimer",types:["Poison"],bst:325},{id:89,name:"Muk",types:["Poison"],bst:500},{id:90,name:"Shellder",types:["Water"],bst:305},
  {id:91,name:"Cloyster",types:["Water","Ice"],bst:525},{id:92,name:"Gastly",types:["Ghost","Poison"],bst:310},{id:93,name:"Haunter",types:["Ghost","Poison"],bst:405},
  {id:94,name:"Gengar",types:["Ghost","Poison"],bst:500},{id:95,name:"Onix",types:["Rock","Ground"],bst:385},{id:96,name:"Drowzee",types:["Psychic"],bst:328},
  {id:97,name:"Hypno",types:["Psychic"],bst:483},{id:98,name:"Krabby",types:["Water"],bst:325},{id:99,name:"Kingler",types:["Water"],bst:475},
  {id:100,name:"Voltorb",types:["Electric"],bst:330},{id:101,name:"Electrode",types:["Electric"],bst:490},{id:102,name:"Exeggcute",types:["Grass","Psychic"],bst:325},
  {id:103,name:"Exeggutor",types:["Grass","Psychic"],bst:530},{id:104,name:"Cubone",types:["Ground"],bst:320},{id:105,name:"Marowak",types:["Ground"],bst:425},
  {id:106,name:"Hitmonlee",types:["Fighting"],bst:455},{id:107,name:"Hitmonchan",types:["Fighting"],bst:455},{id:108,name:"Lickitung",types:["Normal"],bst:385},
  {id:109,name:"Koffing",types:["Poison"],bst:340},{id:110,name:"Weezing",types:["Poison"],bst:490},{id:111,name:"Rhyhorn",types:["Ground","Rock"],bst:345},
  {id:112,name:"Rhydon",types:["Ground","Rock"],bst:485},{id:113,name:"Chansey",types:["Normal"],bst:450},{id:114,name:"Tangela",types:["Grass"],bst:435},
  {id:115,name:"Kangaskhan",types:["Normal"],bst:490},{id:116,name:"Horsea",types:["Water"],bst:295},{id:117,name:"Seadra",types:["Water"],bst:440},
  {id:118,name:"Goldeen",types:["Water"],bst:320},{id:119,name:"Seaking",types:["Water"],bst:450},{id:120,name:"Staryu",types:["Water"],bst:340},
  {id:121,name:"Starmie",types:["Water","Psychic"],bst:520},{id:122,name:"Mr. Mime",types:["Psychic"],bst:460},{id:123,name:"Scyther",types:["Bug","Flying"],bst:500},
  {id:124,name:"Jynx",types:["Ice","Psychic"],bst:455},{id:125,name:"Electabuzz",types:["Electric"],bst:490},{id:126,name:"Magmar",types:["Fire"],bst:495},
  {id:127,name:"Pinsir",types:["Bug"],bst:500},{id:128,name:"Tauros",types:["Normal"],bst:490},{id:129,name:"Magikarp",types:["Water"],bst:200},
  {id:130,name:"Gyarados",types:["Water","Flying"],bst:540},{id:131,name:"Lapras",types:["Water","Ice"],bst:535},{id:132,name:"Ditto",types:["Normal"],bst:288},
  {id:133,name:"Eevee",types:["Normal"],bst:325},{id:134,name:"Vaporeon",types:["Water"],bst:525},{id:135,name:"Jolteon",types:["Electric"],bst:525},
  {id:136,name:"Flareon",types:["Fire"],bst:525},{id:137,name:"Porygon",types:["Normal"],bst:395},{id:138,name:"Omanyte",types:["Rock","Water"],bst:355},
  {id:139,name:"Omastar",types:["Rock","Water"],bst:495},{id:140,name:"Kabuto",types:["Rock","Water"],bst:355},{id:141,name:"Kabutops",types:["Rock","Water"],bst:495},
  {id:142,name:"Aerodactyl",types:["Rock","Flying"],bst:515},{id:143,name:"Snorlax",types:["Normal"],bst:540},{id:144,name:"Articuno",types:["Ice","Flying"],bst:580},
  {id:145,name:"Zapdos",types:["Electric","Flying"],bst:580},{id:146,name:"Moltres",types:["Fire","Flying"],bst:580},{id:147,name:"Dratini",types:["Dragon"],bst:300},
  {id:148,name:"Dragonair",types:["Dragon"],bst:420},{id:149,name:"Dragonite",types:["Dragon","Flying"],bst:600},{id:150,name:"Mewtwo",types:["Psychic"],bst:680},
  {id:151,name:"Mew",types:["Psychic"],bst:600},
];
const GEN2 = [
  {id:152,name:"Chikorita",types:["Grass"],bst:318},{id:153,name:"Bayleef",types:["Grass"],bst:405},{id:154,name:"Meganium",types:["Grass"],bst:525},
  {id:155,name:"Cyndaquil",types:["Fire"],bst:309},{id:156,name:"Quilava",types:["Fire"],bst:405},{id:157,name:"Typhlosion",types:["Fire"],bst:534},
  {id:158,name:"Totodile",types:["Water"],bst:314},{id:159,name:"Croconaw",types:["Water"],bst:405},{id:160,name:"Feraligatr",types:["Water"],bst:530},
  {id:161,name:"Sentret",types:["Normal"],bst:215},{id:162,name:"Furret",types:["Normal"],bst:415},{id:163,name:"Hoothoot",types:["Normal","Flying"],bst:262},
  {id:164,name:"Noctowl",types:["Normal","Flying"],bst:452},{id:169,name:"Crobat",types:["Poison","Flying"],bst:535},
  {id:170,name:"Chinchou",types:["Water","Electric"],bst:330},{id:171,name:"Lanturn",types:["Water","Electric"],bst:460},
  {id:172,name:"Pichu",types:["Electric"],bst:205},{id:175,name:"Togepi",types:["Normal"],bst:245},{id:176,name:"Togetic",types:["Normal","Flying"],bst:405},
  {id:177,name:"Natu",types:["Psychic","Flying"],bst:320},{id:178,name:"Xatu",types:["Psychic","Flying"],bst:470},
  {id:179,name:"Mareep",types:["Electric"],bst:280},{id:180,name:"Flaaffy",types:["Electric"],bst:365},{id:181,name:"Ampharos",types:["Electric"],bst:510},
  {id:182,name:"Bellossom",types:["Grass"],bst:490},{id:183,name:"Marill",types:["Water"],bst:250},{id:184,name:"Azumarill",types:["Water"],bst:420},
  {id:185,name:"Sudowoodo",types:["Rock"],bst:410},{id:186,name:"Politoed",types:["Water"],bst:500},
  {id:190,name:"Aipom",types:["Normal"],bst:360},{id:192,name:"Sunflora",types:["Grass"],bst:425},{id:193,name:"Yanma",types:["Bug","Flying"],bst:390},
  {id:195,name:"Quagsire",types:["Water","Ground"],bst:430},{id:196,name:"Espeon",types:["Psychic"],bst:525},{id:197,name:"Umbreon",types:["Dark"],bst:525},
  {id:198,name:"Murkrow",types:["Dark","Flying"],bst:405},{id:199,name:"Slowking",types:["Water","Psychic"],bst:490},{id:200,name:"Misdreavus",types:["Ghost"],bst:435},
  {id:203,name:"Girafarig",types:["Normal","Psychic"],bst:455},{id:205,name:"Forretress",types:["Bug","Steel"],bst:465},
  {id:207,name:"Gligar",types:["Ground","Flying"],bst:430},{id:208,name:"Steelix",types:["Steel","Ground"],bst:510},
  {id:210,name:"Granbull",types:["Normal"],bst:450},{id:212,name:"Scizor",types:["Bug","Steel"],bst:500},
  {id:213,name:"Shuckle",types:["Bug","Rock"],bst:505},{id:214,name:"Heracross",types:["Bug","Fighting"],bst:500},
  {id:215,name:"Sneasel",types:["Dark","Ice"],bst:430},{id:217,name:"Ursaring",types:["Normal"],bst:500},
  {id:219,name:"Magcargo",types:["Fire","Rock"],bst:410},{id:221,name:"Piloswine",types:["Ice","Ground"],bst:450},
  {id:224,name:"Octillery",types:["Water"],bst:480},{id:226,name:"Mantine",types:["Water","Flying"],bst:465},
  {id:227,name:"Skarmory",types:["Steel","Flying"],bst:465},{id:229,name:"Houndoom",types:["Dark","Fire"],bst:500},
  {id:230,name:"Kingdra",types:["Water","Dragon"],bst:540},{id:232,name:"Donphan",types:["Ground"],bst:500},
  {id:233,name:"Porygon2",types:["Normal"],bst:515},{id:234,name:"Stantler",types:["Normal"],bst:465},
  {id:237,name:"Hitmontop",types:["Fighting"],bst:455},{id:241,name:"Miltank",types:["Normal"],bst:490},
  {id:242,name:"Blissey",types:["Normal"],bst:540},{id:243,name:"Raikou",types:["Electric"],bst:580},
  {id:244,name:"Entei",types:["Fire"],bst:580},{id:245,name:"Suicune",types:["Water"],bst:580},
  {id:248,name:"Tyranitar",types:["Rock","Dark"],bst:600},{id:249,name:"Lugia",types:["Psychic","Flying"],bst:680},
  {id:250,name:"Ho-Oh",types:["Fire","Flying"],bst:680},{id:251,name:"Celebi",types:["Psychic","Grass"],bst:600},
];
const GEN3 = [
  {id:252,name:"Treecko",types:["Grass"],bst:310},{id:253,name:"Grovyle",types:["Grass"],bst:405},{id:254,name:"Sceptile",types:["Grass"],bst:530},
  {id:255,name:"Torchic",types:["Fire"],bst:310},{id:256,name:"Combusken",types:["Fire","Fighting"],bst:405},{id:257,name:"Blaziken",types:["Fire","Fighting"],bst:530},
  {id:258,name:"Mudkip",types:["Water"],bst:310},{id:259,name:"Marshtomp",types:["Water","Ground"],bst:405},{id:260,name:"Swampert",types:["Water","Ground"],bst:535},
  {id:261,name:"Poochyena",types:["Dark"],bst:220},{id:262,name:"Mightyena",types:["Dark"],bst:420},{id:264,name:"Linoone",types:["Normal"],bst:420},
  {id:267,name:"Beautifly",types:["Bug","Flying"],bst:395},{id:269,name:"Dustox",types:["Bug","Poison"],bst:385},
  {id:272,name:"Ludicolo",types:["Water","Grass"],bst:480},{id:275,name:"Shiftry",types:["Grass","Dark"],bst:480},
  {id:277,name:"Swellow",types:["Normal","Flying"],bst:455},{id:279,name:"Pelipper",types:["Water","Flying"],bst:430},
  {id:282,name:"Gardevoir",types:["Psychic"],bst:518},{id:284,name:"Masquerain",types:["Bug","Flying"],bst:414},
  {id:286,name:"Breloom",types:["Grass","Fighting"],bst:460},{id:289,name:"Slaking",types:["Normal"],bst:670},
  {id:291,name:"Ninjask",types:["Bug","Flying"],bst:456},{id:295,name:"Exploud",types:["Normal"],bst:490},
  {id:297,name:"Hariyama",types:["Fighting"],bst:474},{id:302,name:"Sableye",types:["Dark","Ghost"],bst:380},
  {id:303,name:"Mawile",types:["Steel"],bst:380},{id:306,name:"Aggron",types:["Steel","Rock"],bst:530},
  {id:308,name:"Medicham",types:["Fighting","Psychic"],bst:410},{id:310,name:"Manectric",types:["Electric"],bst:475},
  {id:319,name:"Sharpedo",types:["Water","Dark"],bst:460},{id:321,name:"Wailord",types:["Water"],bst:500},
  {id:323,name:"Camerupt",types:["Fire","Ground"],bst:460},{id:324,name:"Torkoal",types:["Fire"],bst:470},
  {id:326,name:"Grumpig",types:["Psychic"],bst:470},{id:330,name:"Flygon",types:["Ground","Dragon"],bst:520},
  {id:332,name:"Cacturne",types:["Grass","Dark"],bst:475},{id:334,name:"Altaria",types:["Dragon","Flying"],bst:490},
  {id:335,name:"Zangoose",types:["Normal"],bst:458},{id:336,name:"Seviper",types:["Poison"],bst:458},
  {id:340,name:"Whiscash",types:["Water","Ground"],bst:468},{id:342,name:"Crawdaunt",types:["Water","Dark"],bst:468},
  {id:344,name:"Claydol",types:["Ground","Psychic"],bst:500},{id:346,name:"Cradily",types:["Rock","Grass"],bst:495},
  {id:348,name:"Armaldo",types:["Rock","Bug"],bst:495},{id:350,name:"Milotic",types:["Water"],bst:540},
  {id:354,name:"Banette",types:["Ghost"],bst:455},{id:356,name:"Dusclops",types:["Ghost"],bst:455},
  {id:357,name:"Tropius",types:["Grass","Flying"],bst:460},{id:359,name:"Absol",types:["Dark"],bst:465},
  {id:362,name:"Glalie",types:["Ice"],bst:480},{id:365,name:"Walrein",types:["Ice","Water"],bst:530},
  {id:373,name:"Salamence",types:["Dragon","Flying"],bst:600},{id:376,name:"Metagross",types:["Steel","Psychic"],bst:600},
  {id:377,name:"Regirock",types:["Rock"],bst:580},{id:378,name:"Regice",types:["Ice"],bst:580},
  {id:379,name:"Registeel",types:["Steel"],bst:580},{id:380,name:"Latias",types:["Dragon","Psychic"],bst:600},
  {id:381,name:"Latios",types:["Dragon","Psychic"],bst:600},{id:382,name:"Kyogre",types:["Water"],bst:670},
  {id:383,name:"Groudon",types:["Ground"],bst:670},{id:384,name:"Rayquaza",types:["Dragon","Flying"],bst:680},
  {id:385,name:"Jirachi",types:["Steel","Psychic"],bst:600},{id:386,name:"Deoxys",types:["Psychic"],bst:600},
];

// ── LEGENDARIES (BST >= 580, get a power bonus in battle) ─────────────────────
const LEGENDARY_IDS = new Set([
  144,145,146,150,151,           // Gen 1: birds, Mewtwo, Mew
  243,244,245,249,250,251,       // Gen 2: beasts, Lugia, Ho-Oh, Celebi
  377,378,379,380,381,382,383,384,385,386, // Gen 3: Regis, Latis, Kyogre, Groudon, Rayquaza, Jirachi, Deoxys
]);

// ── STARTERS (fully evolved, excluded from random pool) ───────────────────────
const STARTERS = {
  "1":[{id:3,name:"Venusaur",types:["Grass","Poison"],bst:525},{id:6,name:"Charizard",types:["Fire","Flying"],bst:534},{id:9,name:"Blastoise",types:["Water"],bst:530}],
  "2":[{id:154,name:"Meganium",types:["Grass"],bst:525},{id:157,name:"Typhlosion",types:["Fire"],bst:534},{id:160,name:"Feraligatr",types:["Water"],bst:530}],
  "3":[{id:254,name:"Sceptile",types:["Grass"],bst:530},{id:257,name:"Blaziken",types:["Fire","Fighting"],bst:530},{id:260,name:"Swampert",types:["Water","Ground"],bst:535}],
};
const STARTER_LINE_IDS = new Set([1,2,3,4,5,6,7,8,9,152,153,154,155,156,157,158,159,160,252,253,254,255,256,257,258,259,260]);

// ── GYM DATA ──────────────────────────────────────────────────────────────────
const ALL_GYMS = {
  kanto:[
    {name:"Brock",city:"Pewter City",types:["Rock","Ground"],diff:1,emoji:"🪨"},
    {name:"Misty",city:"Cerulean City",types:["Water"],diff:2,emoji:"💧"},
    {name:"Lt. Surge",city:"Vermilion City",types:["Electric"],diff:3,emoji:"⚡"},
    {name:"Erika",city:"Celadon City",types:["Grass","Poison"],diff:4,emoji:"🌿"},
    {name:"Koga",city:"Fuchsia City",types:["Poison"],diff:5,emoji:"☠️"},
    {name:"Sabrina",city:"Saffron City",types:["Psychic"],diff:6,emoji:"🔮"},
    {name:"Blaine",city:"Cinnabar Island",types:["Fire"],diff:7,emoji:"🌋"},
    {name:"Giovanni",city:"Viridian City",types:["Ground","Rock"],diff:8,emoji:"🌍"},
    {name:"Lorelei",city:"Elite Four",types:["Ice","Water"],diff:9,emoji:"❄️"},
    {name:"Bruno",city:"Elite Four",types:["Fighting","Rock"],diff:9,emoji:"👊"},
    {name:"Agatha",city:"Elite Four",types:["Ghost","Poison"],diff:9,emoji:"👻"},
    {name:"Lance",city:"Elite Four",types:["Dragon","Flying"],diff:10,emoji:"🐉"},
    {name:"Blue",city:"Champion",types:["Normal","Fire","Water","Psychic"],diff:10,emoji:"🏆"},
  ],
  johto:[
    {name:"Falkner",city:"Violet City",types:["Flying","Normal"],diff:1,emoji:"🦅"},
    {name:"Bugsy",city:"Azalea Town",types:["Bug"],diff:2,emoji:"🐛"},
    {name:"Whitney",city:"Goldenrod City",types:["Normal"],diff:3,emoji:"🎀"},
    {name:"Morty",city:"Ecruteak City",types:["Ghost"],diff:4,emoji:"👻"},
    {name:"Chuck",city:"Cianwood City",types:["Fighting"],diff:5,emoji:"🥊"},
    {name:"Jasmine",city:"Olivine City",types:["Steel"],diff:6,emoji:"⚙️"},
    {name:"Pryce",city:"Mahogany Town",types:["Ice"],diff:7,emoji:"🧊"},
    {name:"Clair",city:"Blackthorn City",types:["Dragon"],diff:8,emoji:"🐲"},
    {name:"Will",city:"Elite Four",types:["Psychic"],diff:9,emoji:"🔮"},
    {name:"Koga",city:"Elite Four",types:["Poison"],diff:9,emoji:"☠️"},
    {name:"Bruno",city:"Elite Four",types:["Fighting"],diff:9,emoji:"👊"},
    {name:"Karen",city:"Elite Four",types:["Dark"],diff:9,emoji:"🌑"},
    {name:"Lance",city:"Champion",types:["Dragon","Flying"],diff:10,emoji:"🏆"},
  ],
  hoenn:[
    {name:"Roxanne",city:"Rustboro City",types:["Rock"],diff:1,emoji:"🪨"},
    {name:"Brawly",city:"Dewford Town",types:["Fighting"],diff:2,emoji:"🥊"},
    {name:"Wattson",city:"Mauville City",types:["Electric"],diff:3,emoji:"⚡"},
    {name:"Flannery",city:"Lavaridge Town",types:["Fire"],diff:4,emoji:"🔥"},
    {name:"Norman",city:"Petalburg City",types:["Normal"],diff:5,emoji:"🎯"},
    {name:"Winona",city:"Fortree City",types:["Flying"],diff:6,emoji:"🦅"},
    {name:"Tate & Liza",city:"Mossdeep City",types:["Psychic"],diff:7,emoji:"🔮"},
    {name:"Juan",city:"Sootopolis",types:["Water"],diff:8,emoji:"💧"},
    {name:"Sidney",city:"Elite Four",types:["Dark"],diff:9,emoji:"🌑"},
    {name:"Phoebe",city:"Elite Four",types:["Ghost"],diff:9,emoji:"👻"},
    {name:"Glacia",city:"Elite Four",types:["Ice"],diff:10,emoji:"❄️"},
    {name:"Drake",city:"Elite Four",types:["Dragon"],diff:10,emoji:"🐉"},
    {name:"Steven",city:"Champion",types:["Steel","Rock"],diff:10,emoji:"🏆"},
  ],
};

// ── ENGINE ────────────────────────────────────────────────────────────────────
const TYPE_CHART: Record<string,{strong:string[],weak:string[]}> = {
  Fire:{strong:["Grass","Bug","Ice","Steel"],weak:["Water","Rock","Ground"]},
  Water:{strong:["Fire","Rock","Ground"],weak:["Electric","Grass"]},
  Grass:{strong:["Water","Rock","Ground"],weak:["Fire","Ice","Poison","Flying","Bug"]},
  Electric:{strong:["Water","Flying"],weak:["Ground"]},
  Psychic:{strong:["Fighting","Poison"],weak:["Bug","Ghost","Dark"]},
  Ice:{strong:["Grass","Ground","Flying","Dragon"],weak:["Fire","Fighting","Rock","Steel"]},
  Dragon:{strong:["Dragon"],weak:["Ice","Dragon","Fairy"]},
  Fighting:{strong:["Normal","Rock","Steel","Ice","Dark"],weak:["Flying","Psychic","Fairy"]},
  Rock:{strong:["Flying","Bug","Fire","Ice"],weak:["Water","Grass","Fighting","Ground","Steel"]},
  Ground:{strong:["Fire","Electric","Poison","Rock","Steel"],weak:["Water","Grass","Ice"]},
  Flying:{strong:["Fighting","Bug","Grass"],weak:["Electric","Ice","Rock"]},
  Ghost:{strong:["Ghost","Psychic"],weak:["Ghost","Dark"]},
  Poison:{strong:["Grass","Fairy"],weak:["Ground","Psychic"]},
  Bug:{strong:["Grass","Psychic","Dark"],weak:["Fire","Flying","Rock"]},
  Normal:{strong:[],weak:["Fighting"]},
  Steel:{strong:["Ice","Rock","Fairy"],weak:["Fire","Fighting","Ground"]},
  Dark:{strong:["Ghost","Psychic"],weak:["Fighting","Bug","Fairy"]},
};
const TYPE_COLORS: Record<string,string> = {
  Fire:"#FF6B35",Water:"#38BDF8",Grass:"#4ADE80",Electric:"#FACC15",
  Psychic:"#F472B6",Ice:"#67E8F9",Dragon:"#818CF8",Fighting:"#FB923C",
  Rock:"#A78BFA",Ground:"#FCD34D",Flying:"#C4B5FD",Ghost:"#8B5CF6",
  Poison:"#A855F7",Bug:"#84CC16",Normal:"#94A3B8",Steel:"#64748B",Dark:"#6B7280",
};
const C={bg:"#080810",panel:"#0d0d1e",border:"rgba(255,215,0,0.12)",gold:"#ffd700",green:"#00e676",red:"#ff1744",text:"#e0e0e0",dim:"#445",px:"'Press Start 2P',monospace"};

function seededRng(seed: number){let s=seed;return()=>{s=(s*1664525+1013904223)&0xffffffff;return(s>>>0)/0xffffffff;};}
function dailySeed(){const d=new Date();return d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();}
function weekSeed(){const d=new Date();const jan=new Date(d.getFullYear(),0,1);return d.getFullYear()*100+Math.ceil(((d.getTime()-jan.getTime())/86400000+jan.getDay()+1)/7);}
function monthSeed(){const d=new Date();return d.getFullYear()*100+(d.getMonth()+1);}

// ── TYPE EFFECTIVENESS (attacker types vs defender types) ─────────────────────
// Returns a multiplier: >1 means team hits hard, <1 means team hits weak
function typeEffectiveness(attackerTypes: string[], defenderTypes: string[]): number {
  let multiplier = 1;
  for (const atkType of attackerTypes) {
    const chart = TYPE_CHART[atkType];
    if (!chart) continue;
    // Use best matchup per attacker type vs all defender types
    let bestMult = 1;
    for (const defType of defenderTypes) {
      if (chart.strong.includes(defType)) bestMult = Math.max(bestMult, 2);
      else if (chart.weak.includes(defType)) bestMult = Math.min(bestMult, 0.5);
    }
    multiplier *= bestMult;
  }
  return multiplier;
}

// ── TEAM TYPE SCORE vs GYM ────────────────────────────────────────────────────
// Returns bonus (positive = good matchup) in BST-equivalent units
function teamTypeAdvantage(
  team: {types:string[], id:number}[],
  gymTypes: string[]
): number {
  let total = 0;
  for (const mon of team) {
    // Offensive: how well this mon hits the gym
    const offMult = typeEffectiveness(mon.types, gymTypes);
    // Defensive: how hard the gym hits this mon (we want this LOW)
    const defMult = typeEffectiveness(gymTypes, mon.types);
    // Score: offensive power minus defensive vulnerability
    // Scale so a single 2x super-effective = +30 BST equivalent
    const offScore = (offMult - 1) * 30;
    const defScore = (defMult - 1) * 20; // penalty for vulnerability
    total += offScore - defScore;
  }
  return total;
}

// ── LEGENDARY BONUS ───────────────────────────────────────────────────────────
function legendaryBonus(team: {id:number}[]): number {
  const count = team.filter(p => LEGENDARY_IDS.has(p.id)).length;
  // Each legendary gives +40 effective BST, diminishing slightly
  // 1 legendary = +40, 2 = +75, 3 = +105, etc.
  return count > 0 ? count * 60 - (count - 1) * 5 : 0;
}

type Pokemon = {id:number; name:string; types:string[]; bst:number};
type Gym = {name:string; city:string; types:string[]; diff:number; emoji:string};

function battle(team: Pokemon[], gym: Gym, rng: (()=>number)|null){
  // Average BST of team
  const avgBst = team.reduce((s,p)=>s+p.bst,0)/team.length;

  // Type advantage in BST-equivalent points (can be negative!)
  const typeAdv = teamTypeAdvantage(team, gym.types);

  // Legendary bonus
  const legBonus = legendaryBonus(team);

  // Gym difficulty: diff 1 = 320 effective BST, diff 10 = 560 effective BST
  const gymStrength = 310 + gym.diff * 25;

  // Team effective power combines stats + type matchup + legendaries
  const teamPower = avgBst + typeAdv + legBonus;

  // Win probability: centered at 50% when powers match
  // Denominator 160 means a 160-point advantage = ~100% win
  const raw = 0.5 + (teamPower - gymStrength) / 100;
  const w = Math.min(0.98, Math.max(0.02, raw));

  return {win:(rng?rng():Math.random())<w, pct:Math.round(w*100)};
}

function getNow(){return Date.now();}
function getDateStr(ts: number){return new Date(ts).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"});}
function isThisWeek(ts: number){const d=new Date(ts);const now=new Date();const startOfWeek=new Date(now);startOfWeek.setDate(now.getDate()-now.getDay());startOfWeek.setHours(0,0,0,0);return d>=startOfWeek;}
function isThisMonth(ts: number){const d=new Date(ts);const now=new Date();return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear();}
function isToday(ts: number){const d=new Date(ts);const now=new Date();return d.toDateString()===now.toDateString();}

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function Sprite({id, size=56}:{id:number,size?:number}){
  const[err,setErr]=useState(false);
  if(err)return<div style={{width:size,height:size,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.4,opacity:0.3}}>?</div>;
  return<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt="" width={size} height={size} onError={()=>setErr(true)} style={{display:"block",objectFit:"contain"}}/>;
}
function Pill({type}:{type:string}){return<span style={{background:TYPE_COLORS[type]||"#555",color:"#000",fontSize:"7px",fontWeight:700,padding:"2px 5px",borderRadius:20,textTransform:"uppercase",fontFamily:C.px,whiteSpace:"nowrap"}}>{type}</span>;}
function Toggle({label,active,color="#ffd700",onClick}:{label:string,active:boolean,color?:string,onClick:()=>void}){return<button onClick={onClick} style={{background:active?`${color}18`:"transparent",border:`1px solid ${active?color:"rgba(255,255,255,0.1)"}`,borderRadius:6,padding:"7px 11px",cursor:"pointer",fontFamily:C.px,fontSize:"7px",color:active?color:"#445",transition:"all 0.12s",whiteSpace:"nowrap"}}>{label}</button>;}
function Label({children}:{children:React.ReactNode}){return<div style={{fontSize:"7px",color:C.dim,marginBottom:8,letterSpacing:1}}>{children}</div>;}

function LegendaryBadge(){
  return<span style={{background:"linear-gradient(90deg,#ffd700,#ff9800)",color:"#000",fontSize:"6px",fontWeight:700,padding:"2px 5px",borderRadius:20,textTransform:"uppercase",fontFamily:C.px,whiteSpace:"nowrap"}}>★ LEGENDARY</span>;
}

function PickCard({p,idx,visible,onPick,isStarter=false}:{p:Pokemon,idx:number,visible:boolean,onPick:(p:Pokemon)=>void,isStarter?:boolean}){
  const[hov,setHov]=useState(false);
  const isLegendary = LEGENDARY_IDS.has(p.id);
  return(
    <button onClick={()=>onPick(p)} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{width:"100%",display:"flex",alignItems:"center",gap:12,background:hov?"rgba(255,215,0,0.07)":C.panel,border:`1px solid ${hov?"rgba(255,215,0,0.5)":isLegendary?"rgba(255,165,0,0.5)":isStarter?"rgba(255,215,0,0.25)":C.border}`,borderRadius:10,padding:"10px 12px",cursor:"pointer",fontFamily:C.px,textAlign:"left",opacity:visible?1:0,transform:visible?"translateY(0)":"translateY(10px)",transition:`opacity 0.16s ${idx*0.06}s ease,transform 0.16s ${idx*0.06}s ease,background 0.1s,border-color 0.1s`,boxShadow:hov?"0 0 10px rgba(255,215,0,0.12)":isLegendary?"0 0 8px rgba(255,165,0,0.2)":"none"}}>
      <div style={{flexShrink:0,width:60,height:60,display:"flex",alignItems:"center",justifyContent:"center"}}><Sprite id={p.id} size={56}/></div>
      <div style={{flex:1,minWidth:0}}>
        {isStarter&&<div style={{fontSize:"6px",color:C.gold,marginBottom:3,opacity:0.7}}>★ STARTER</div>}
        {isLegendary&&!isStarter&&<div style={{fontSize:"6px",color:"#ff9800",marginBottom:3}}>⚡ LEGENDARY +PWR</div>}
        <div style={{fontSize:"10px",color:isLegendary?"#ff9800":C.gold,marginBottom:5}}>{p.name}</div>
        <div style={{display:"flex",gap:3,flexWrap:"wrap",marginBottom:4}}>{p.types.map(t=><Pill key={t} type={t}/>)}</div>
        <div style={{fontSize:"7px",color:C.dim}}>BST {p.bst}</div>
      </div>
      <div style={{color:hov?"#ffd700":"rgba(255,255,255,0.1)",fontSize:18,flexShrink:0}}>›</div>
    </button>
  );
}

// ── LEADERBOARD COMPONENT ─────────────────────────────────────────────────────
function Leaderboard({onClose}:{onClose:()=>void}){
  const[tab,setTab]=useState("alltime");
  const[entries,setEntries]=useState<any[]>([]);
  const[loading,setLoading]=useState(true);

  useEffect(()=>{
    async function load(){
      try{
        const res=await fetch("/api/leaderboard",{cache:"no-store"});
        const data=await res.json();
        setEntries(Array.isArray(data.entries)?data.entries:[]);
      }catch(e){setEntries([]);}
      setLoading(false);
    }
    load();
  },[]);

  function filterEntries(t: string){
    switch(t){
      case"daily":   return entries.filter(e=>isToday(e.ts));
      case"weekly":  return entries.filter(e=>isThisWeek(e.ts));
      case"monthly": return entries.filter(e=>isThisMonth(e.ts));
      default:       return entries;
    }
  }

  const filtered=filterEntries(tab).sort((a,b)=>b.wins-a.wins||a.losses-b.losses).slice(0,20);
  const tabs:[string,string][]=[["alltime","ALL TIME"],["monthly","MONTHLY"],["weekly","WEEKLY"],["daily","TODAY"]];
  const medals=["🥇","🥈","🥉"];

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",zIndex:500,display:"flex",flexDirection:"column",alignItems:"center",padding:"0 14px 40px",overflowY:"auto"}}>
      <div style={{width:"100%",maxWidth:500}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"20px 0 14px"}}>
          <div style={{fontSize:"clamp(12px,3vw,18px)",color:C.gold,fontFamily:C.px}}>🏆 LEADERBOARD</div>
          <button onClick={onClose} style={{background:"transparent",border:`1px solid #333`,color:"#666",borderRadius:6,padding:"6px 12px",fontSize:"8px",fontFamily:C.px,cursor:"pointer"}}>✕ CLOSE</button>
        </div>
        <div style={{display:"flex",gap:0,borderBottom:`1px solid rgba(255,255,255,0.06)`,marginBottom:14}}>
          {tabs.map(([t,l])=>(
            <button key={t} onClick={()=>setTab(t)} style={{flex:1,padding:"9px 4px",fontFamily:C.px,fontSize:"6px",background:"transparent",border:"none",cursor:"pointer",color:tab===t?C.gold:"#445",borderBottom:tab===t?`2px solid ${C.gold}`:"2px solid transparent",transition:"all 0.15s"}}>{l}</button>
          ))}
        </div>
        {loading&&<div style={{textAlign:"center",padding:30,fontSize:"8px",color:C.dim}}>LOADING...</div>}
        {!loading&&filtered.length===0&&(
          <div style={{textAlign:"center",padding:30,fontSize:"8px",color:C.dim,lineHeight:2.5}}>
            NO RUNS YET<br/>
            <span style={{fontSize:"7px",color:"#334"}}>BE THE FIRST TO SUBMIT!</span>
          </div>
        )}
        {!loading&&filtered.map((e,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 12px",background:i===0?"rgba(255,215,0,0.06)":C.panel,border:`1px solid ${i===0?"rgba(255,215,0,0.2)":C.border}`,borderRadius:10,marginBottom:6}}>
            <div style={{fontSize:i<3?18:12,width:24,textAlign:"center",color:i<3?C.gold:"#334",fontFamily:C.px}}>{i<3?medals[i]:`${i+1}`}</div>
            <div style={{flex:1,minWidth:0}}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                <div style={{fontSize:"9px",color:e.wins===e.total?C.gold:C.text,fontWeight:700}}>{e.name}</div>
                {e.wins===e.total&&<div style={{fontSize:"6px",color:C.gold}}>★ UNDEFEATED</div>}
              </div>
              <div style={{fontSize:"7px",color:C.dim,marginBottom:3}}>{e.genLabel} · {e.regionLabel} · {getDateStr(e.ts)}</div>
              <div style={{fontSize:"7px",color:"#334",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{e.team}</div>
            </div>
            <div style={{textAlign:"right",flexShrink:0}}>
              <div style={{fontSize:"14px",color:e.wins===e.total?C.gold:e.losses===0?C.green:C.text,fontFamily:C.px}}>{e.wins}-{e.losses}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SUBMIT SCORE ──────────────────────────────────────────────────────────────
async function submitScore(entry: object){
  try{
    const res=await fetch("/api/leaderboard",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(entry)});
    return res.ok;
  }catch(e){return false;}
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App(){
  const[selGens,setSelGens]=useState(new Set(["1"]));
  const[selRegions,setSelRegions]=useState(new Set(["kanto"]));
  const[screen,setScreen]=useState("home");
  const[daily,setDaily]=useState(false);
  const[pool,setPool]=useState<Pokemon[]>([]);
  const[poolIdx,setPoolIdx]=useState(0);
  const[choices,setChoices]=useState<Pokemon[]>([]);
  const[visible,setVisible]=useState(false);
  const[isFirst,setIsFirst]=useState(true);
  const[team,setTeam]=useState<Pokemon[]>([]);
  const[respins,setRespins]=useState(2);
  const[battleLog,setBattleLog]=useState<any[]>([]);
  const[gymIdx,setGymIdx]=useState(0);
  const[record,setRecord]=useState({w:0,l:0});
  const[won,setWon]=useState<boolean|null>(null);
  const[resultTab,setResultTab]=useState("share");
  const[copied,setCopied]=useState(false);
  const[showBoard,setShowBoard]=useState(false);
  const[playerName,setPlayerName]=useState("");
  const[nameInput,setNameInput]=useState("");
  const[submitted,setSubmitted]=useState(false);
  const[submitting,setSubmitting]=useState(false);

  const dKey=()=>`151-daily-g${[...selGens].sort().join("")}-r${[...selRegions].sort().join("")}-${dailySeed()}`;
  const[dailyDone,setDailyDone]=useState(false);
  useEffect(()=>{setDailyDone(!!localStorage.getItem(dKey()));},[selGens,selRegions]);

  const poolRef=useRef<Pokemon[]>([]);const idxRef=useRef(0);
  useEffect(()=>{poolRef.current=pool;},[pool]);
  useEffect(()=>{idxRef.current=poolIdx;},[poolIdx]);

  function toggleGen(k: string){setSelGens(prev=>{const n=new Set(prev);if(n.has(k)&&n.size>1)n.delete(k);else n.add(k);return n;});}
  function toggleRegion(k: string){setSelRegions(prev=>{const n=new Set(prev);if(n.has(k)&&n.size>1)n.delete(k);else n.add(k);return n;});}

  function buildPool(d=false){
    const base=[...selGens].sort().flatMap(g=>{const p=g==="1"?GEN1:g==="2"?GEN2:GEN3;return p.filter(p=>!STARTER_LINE_IDS.has(p.id));});
    if(d){const rng=seededRng(dailySeed()+[...selGens].join("").length*7);return[...base].sort(()=>rng()-0.5);}
    return[...base].sort(()=>Math.random()-0.5);
  }

  function buildStarterChoices(){
    const all=[...selGens].flatMap(g=>STARTERS[g as keyof typeof STARTERS]);
    return[...all].sort(()=>Math.random()-0.5).slice(0,3);
  }

  function buildGyms(){
    const raw=[...selRegions].flatMap(r=>ALL_GYMS[r as keyof typeof ALL_GYMS]);
    return raw.map((g,i)=>({...g,diff:1+Math.floor((i/(raw.length-1||1))*9)}));
  }

  function deal(p?: Pokemon[], i?: number){
    const arr=p!==undefined?p:poolRef.current;
    const start=i!==undefined?i:idxRef.current;
    const c=[arr[start%arr.length],arr[(start+1)%arr.length],arr[(start+2)%arr.length]];
    setChoices(c);setPoolIdx(start+3);setVisible(false);
    requestAnimationFrame(()=>requestAnimationFrame(()=>setVisible(true)));
  }

  function startGame(d=false){
    const p=buildPool(d);
    const sc=buildStarterChoices();
    setDaily(d);setPool(p);setPoolIdx(0);setTeam([]);setRespins(2);
    setBattleLog([]);setGymIdx(0);setRecord({w:0,l:0});setWon(null);
    setResultTab("share");setSubmitted(false);setNameInput(playerName);
    poolRef.current=p;idxRef.current=0;
    setIsFirst(true);setScreen("draft");setChoices([]);setVisible(false);
    setTimeout(()=>{setChoices(sc);requestAnimationFrame(()=>requestAnimationFrame(()=>setVisible(true)));},80);
  }

  function pick(p: Pokemon){
    const t=[...team,p];setTeam(t);setChoices([]);setVisible(false);setIsFirst(false);
    if(t.length>=6){setScreen("ready");return;}
    setTimeout(()=>deal(),120);
  }

  function respin(){
    if(respins<=0||isFirst)return;
    setRespins(r=>r-1);setChoices([]);setVisible(false);
    setTimeout(()=>deal(),100);
  }

  async function runBattle(){
    setScreen("battle");
    const gyms=buildGyms();
    const rng=daily?seededRng(dailySeed()+team.reduce((s,p)=>s+p.id,0)):null;
    const log:any[]=[];let w=0,l=0;
    for(let i=0;i<gyms.length;i++){
      setGymIdx(i);
      await new Promise(r=>setTimeout(r,650));
      const res=battle(team,gyms[i],rng);
      log.push({gym:gyms[i],...res});setBattleLog([...log]);
      if(res.win)w++;else l++;
    }
    setRecord({w,l});setWon(l===0);
    if(daily){localStorage.setItem(dKey(),"1");setDailyDone(true);}
    setScreen("result");
  }

  async function handleSubmit(){
    if(!nameInput.trim())return;
    setSubmitting(true);
    const gyms=buildGyms();
    const entry={
      name:nameInput.trim().slice(0,20),
      wins:record.w,
      losses:record.l,
      total:gyms.length,
      team:team.map(p=>p.name).join(", "),
      genLabel:[...selGens].sort().map(g=>["I","II","III"][+g-1]).join("+"),
      regionLabel:[...selRegions].map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join("+"),
      ts:getNow(),
      daily,
    };
    const ok=await submitScore(entry);
    if(ok){setPlayerName(nameInput.trim());setSubmitted(true);}
    setSubmitting(false);
  }

  const gyms=buildGyms();
  const genLabel=[...selGens].sort().map(g=>["I","II","III"][+g-1]).join("+");
  const regionLabel=[...selRegions].map(r=>r.charAt(0).toUpperCase()+r.slice(1)).join("+");
  const poolSize=[...selGens].flatMap(g=>g==="1"?GEN1:g==="2"?GEN2:GEN3).length;

  const shareText=`${daily?"📅 Daily · ":""}Gen ${genLabel} · ${regionLabel}\n${record.w}-${record.l} ${won?"🏆 CHAMPION!":"💀 Eliminated"}\n${team.map(p=>p.name).join(" · ")}\n151-0.com`;
  function copyShare(){navigator.clipboard.writeText(shareText).then(()=>{setCopied(true);setTimeout(()=>setCopied(false),2000);});}

  const css=`
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    *{box-sizing:border-box;margin:0;padding:0;}
    body{background:${C.bg};}
    @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
    .blink{animation:blink 1s step-end infinite;}
    input{font-family:'Press Start 2P',monospace!important;}
    ::-webkit-scrollbar{width:3px;}::-webkit-scrollbar-thumb{background:#ffd70033;border-radius:2px;}
  `;

  const Card=({children,style={}}:{children:React.ReactNode,style?:React.CSSProperties})=><div style={{width:"100%",background:C.panel,border:`1px solid ${C.border}`,borderRadius:12,padding:"14px",marginTop:14,...style}}>{children}</div>;
  const PBtn=({children,onClick,style={}}:{children:React.ReactNode,onClick:()=>void,style?:React.CSSProperties})=><button onClick={onClick} style={{background:"linear-gradient(135deg,#ffd700,#ff9800)",color:"#000",border:"none",borderRadius:8,padding:"13px 20px",fontSize:"9px",fontFamily:C.px,fontWeight:700,cursor:"pointer",letterSpacing:1,transition:"all 0.12s",boxShadow:"0 3px 14px rgba(255,215,0,0.3)",...style}}>{children}</button>;

  return(
    <div style={{minHeight:"100vh",background:C.bg,fontFamily:C.px,color:C.text,display:"flex",flexDirection:"column",alignItems:"center",padding:"0 14px 60px"}}>
      <style>{css}</style>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:99,background:"repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.055) 2px,rgba(0,0,0,0.055) 4px)"}}/>
      {showBoard&&<Leaderboard onClose={()=>setShowBoard(false)}/>}

      <div style={{width:"100%",maxWidth:500,display:"flex",flexDirection:"column",alignItems:"center",position:"relative",zIndex:1}}>

        {/* LOGO + LEADERBOARD BUTTON */}
        <div style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginTop:24}}>
          <div style={{flex:1}}/>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:"clamp(26px,7vw,46px)",color:C.gold,textShadow:`0 0 18px ${C.gold}88,0 3px 0 #6a5000`,letterSpacing:4}}>151-0</div>
            <div style={{fontSize:"7px",color:C.dim,marginTop:4,letterSpacing:1}}>BUILD · DRAFT · BECOME A POKÉMON LEGEND</div>
          </div>
          <div style={{flex:1,display:"flex",justifyContent:"flex-end"}}>
            <button onClick={()=>setShowBoard(true)} style={{background:"transparent",border:`1px solid rgba(255,215,0,0.25)`,color:C.gold,borderRadius:8,padding:"7px 10px",fontSize:"7px",fontFamily:C.px,cursor:"pointer"}}>🏆</button>
          </div>
        </div>

        {/* ── HOME ── */}
        {screen==="home"&&(
          <>
            <Card style={{marginTop:18}}>
              <Label>POKÉMON GENERATION</Label>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:18}}>
                <Toggle label="🔴 Gen I"   active={selGens.has("1")} color="#e94560" onClick={()=>toggleGen("1")}/>
                <Toggle label="🟡 Gen II"  active={selGens.has("2")} color="#ffd700" onClick={()=>toggleGen("2")}/>
                <Toggle label="🟢 Gen III" active={selGens.has("3")} color="#4ade80" onClick={()=>toggleGen("3")}/>
              </div>
              <div style={{fontSize:"7px",color:C.dim,marginBottom:18}}>POOL: {poolSize} POKÉMON · {selGens.size} GEN{selGens.size>1?"S":""}</div>
              <Label>GYM LEADERS</Label>
              <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:18}}>
                <Toggle label="🔴 Kanto" active={selRegions.has("kanto")} color="#e94560" onClick={()=>toggleRegion("kanto")}/>
                <Toggle label="🟡 Johto" active={selRegions.has("johto")} color="#ffd700" onClick={()=>toggleRegion("johto")}/>
                <Toggle label="🟢 Hoenn" active={selRegions.has("hoenn")} color="#4ade80" onClick={()=>toggleRegion("hoenn")}/>
              </div>
              <div style={{fontSize:"7px",color:C.dim,marginBottom:20}}>{gyms.length} BATTLES · {regionLabel}</div>
              <div style={{display:"flex",gap:8}}>
                <PBtn onClick={()=>startGame(false)} style={{flex:1}}>▶ PLAY</PBtn>
                <button onClick={()=>!dailyDone&&startGame(true)} style={{flex:1,background:"transparent",fontFamily:C.px,fontSize:"8px",border:`1px solid ${dailyDone?"#222":"rgba(255,215,0,0.3)"}`,color:dailyDone?"#333":C.gold,borderRadius:8,padding:"13px",cursor:dailyDone?"not-allowed":"pointer",transition:"all 0.12s"}}>
                  📅 {dailyDone?"DONE":"DAILY"}
                </button>
              </div>
            </Card>
            <div style={{fontSize:"7px",color:"#223",marginTop:12,textAlign:"center",lineHeight:2.4}}>
              FIRST PICK IS ALWAYS A STARTER · PICK 1 OF 3<br/>DAILY SEEDS · SHARED LEADERBOARD
            </div>
          </>
        )}

        {/* ── DRAFT ── */}
        {screen==="draft"&&(
          <>
            <div style={{width:"100%",marginTop:16,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{fontSize:"7px",color:C.gold}}>PICK {team.length+1} OF 6</div>
              <div style={{fontSize:"7px",color:C.dim}}>Gen {genLabel} · {regionLabel}</div>
              <button onClick={respin} disabled={respins<=0||isFirst} style={{background:"transparent",border:`1px solid ${respins>0&&!isFirst?"#4ade8066":"#1a1a1a"}`,color:respins>0&&!isFirst?"#4ade80":"#2a2a2a",borderRadius:6,padding:"5px 8px",fontSize:"7px",fontFamily:C.px,cursor:respins>0&&!isFirst?"pointer":"not-allowed"}}>🎲 ×{respins}</button>
            </div>
            {isFirst&&<div style={{width:"100%",marginTop:10,padding:"8px 12px",background:"rgba(255,215,0,0.05)",border:"1px solid rgba(255,215,0,0.2)",borderRadius:8,fontSize:"7px",color:C.gold,textAlign:"center"}}>★ CHOOSE YOUR STARTER</div>}
            <div style={{width:"100%",display:"flex",flexDirection:"column",gap:8,marginTop:10}}>
              {choices.map((p,i)=><PickCard key={`${p.id}-${i}`} p={p} idx={i} visible={visible} onPick={pick} isStarter={isFirst}/>)}
              {choices.length===0&&<div style={{textAlign:"center",padding:"30px 0",fontSize:"8px",color:C.dim}}>DEALING<span className="blink">...</span></div>}
            </div>
            {team.length>0&&(
              <div style={{width:"100%",display:"flex",gap:5,marginTop:14,flexWrap:"wrap"}}>
                {team.map((p,i)=><div key={i} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:3,flex:"1 0 calc(16.6% - 5px)",minWidth:50}}><Sprite id={p.id} size={42}/><div style={{fontSize:"5px",color:LEGENDARY_IDS.has(p.id)?"#ff9800":"#445",textAlign:"center",maxWidth:48,overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{p.name}</div></div>)}
                {Array.from({length:6-team.length}).map((_,i)=><div key={`e${i}`} style={{flex:"1 0 calc(16.6% - 5px)",minWidth:50,height:50,borderRadius:8,border:"1px dashed rgba(255,255,255,0.05)",display:"flex",alignItems:"center",justifyContent:"center",opacity:0.15,fontSize:16}}>○</div>)}
              </div>
            )}
          </>
        )}

        {/* ── READY ── */}
        {screen==="ready"&&(
          <>
            <div style={{width:"100%",display:"flex",gap:6,marginTop:18,flexWrap:"wrap"}}>
              {team.map((p,i)=><div key={i} style={{flex:"1 0 calc(33% - 6px)",display:"flex",flexDirection:"column",alignItems:"center",gap:4,background:C.panel,border:`1px solid ${LEGENDARY_IDS.has(p.id)?"rgba(255,165,0,0.4)":C.border}`,borderRadius:10,padding:"10px 6px",boxShadow:LEGENDARY_IDS.has(p.id)?"0 0 8px rgba(255,165,0,0.15)":"none"}}><Sprite id={p.id} size={56}/><div style={{fontSize:"7px",color:LEGENDARY_IDS.has(p.id)?"#ff9800":C.gold,textAlign:"center"}}>{p.name}</div>{LEGENDARY_IDS.has(p.id)&&<div style={{fontSize:"5px",color:"#ff9800",opacity:0.8}}>⚡ LEGENDARY</div>}<div style={{display:"flex",gap:2,flexWrap:"wrap",justifyContent:"center"}}>{p.types.map(t=><Pill key={t} type={t}/>)}</div></div>)}
            </div>
            <div style={{marginTop:12,fontSize:"7px",color:C.dim,textAlign:"center"}}>Gen {genLabel} · {regionLabel} · {gyms.length} BATTLES</div>
            {team.some(p=>LEGENDARY_IDS.has(p.id))&&(
              <div style={{marginTop:8,fontSize:"7px",color:"#ff9800",textAlign:"center",padding:"6px 12px",background:"rgba(255,165,0,0.06)",border:"1px solid rgba(255,165,0,0.2)",borderRadius:8}}>
                ⚡ {team.filter(p=>LEGENDARY_IDS.has(p.id)).length} LEGENDARY POKÉMON · MAJOR POWER BOOST
              </div>
            )}
            <PBtn onClick={runBattle} style={{marginTop:12,width:"100%"}}>▶ START GYM RUN</PBtn>
          </>
        )}

        {/* ── BATTLE ── */}
        {screen==="battle"&&(
          <Card style={{marginTop:20}}>
            <div style={{fontSize:"8px",color:C.gold,marginBottom:12}}><span className="blink">▶</span> GYM RUN · {regionLabel}</div>
            {battleLog.map((b,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                <span style={{fontSize:16,width:22,textAlign:"center"}}>{b.gym.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:"8px",marginBottom:3}}>{b.gym.name}</div>
                  <div style={{height:3,background:"rgba(255,255,255,0.06)",borderRadius:2,overflow:"hidden"}}>
                    <div style={{width:`${b.pct}%`,height:"100%",borderRadius:2,background:b.win?C.green:C.red,transition:"width 0.5s"}}/>
                  </div>
                </div>
                <div style={{fontSize:"8px",color:b.win?C.green:C.red,fontWeight:700,width:32,textAlign:"right"}}>{b.win?"WIN":"LOSS"}</div>
              </div>
            ))}
            {battleLog.length<gyms.length&&<div style={{textAlign:"center",marginTop:12,fontSize:"7px",color:C.dim}}>{gyms[gymIdx]?.emoji} {gyms[gymIdx]?.name}<span className="blink">...</span></div>}
          </Card>
        )}

        {/* ── RESULT ── */}
        {screen==="result"&&(
          <>
            <div style={{textAlign:"center",marginTop:20}}>
              <div style={{fontSize:"clamp(44px,11vw,68px)",color:won?C.gold:C.red,lineHeight:1,textShadow:`0 0 28px ${won?C.gold:C.red}66`}}>{record.w}-{record.l}</div>
              <div style={{fontSize:"9px",color:won?C.gold:C.red,marginTop:8}}>{won?"🏆 CHAMPION!":"💀 ELIMINATED"}</div>
              <div style={{fontSize:"7px",color:C.dim,marginTop:4}}>Gen {genLabel} · {regionLabel}{daily?" · Daily":""}</div>
            </div>

            <div style={{display:"flex",width:"100%",marginTop:14,borderBottom:"1px solid rgba(255,255,255,0.06)"}}>
              {(([["share","SHARE"],["submit","LEADERBOARD"],["log","BATTLE LOG"]] as [string,string][])).map(([t,l])=>(
                <button key={t} onClick={()=>setResultTab(t)} style={{flex:1,padding:"9px 4px",fontFamily:C.px,fontSize:"6px",background:"transparent",border:"none",cursor:"pointer",color:resultTab===t?C.gold:"#445",borderBottom:resultTab===t?`2px solid ${C.gold}`:"2px solid transparent",transition:"all 0.15s"}}>{l}</button>
              ))}
            </div>

            {resultTab==="share"&&(
              <Card>
                <div style={{background:"#050510",border:`1px solid ${won?C.gold:C.red}33`,borderRadius:10,padding:"14px 12px",marginBottom:12}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:"7px",color:C.dim,marginBottom:10}}>
                    <span style={{color:C.gold}}>151-0</span>
                    <span>{new Date().toLocaleDateString("en-US",{month:"short",day:"numeric"})}</span>
                  </div>
                  <div style={{display:"flex",gap:3,marginBottom:12,flexWrap:"wrap"}}>
                    {battleLog.map((b,i)=><div key={i} style={{width:22,height:22,borderRadius:4,background:b.win?C.green:C.red,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,boxShadow:`0 0 4px ${b.win?C.green:C.red}44`}}>{b.gym.emoji}</div>)}
                    {Array.from({length:gyms.length-battleLog.length}).map((_,i)=><div key={`e${i}`} style={{width:22,height:22,borderRadius:4,background:"rgba(255,255,255,0.03)"}}/>)}
                  </div>
                  <div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:8}}>
                    {team.map(p=><div key={p.id} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:2}}><Sprite id={p.id} size={34}/><div style={{fontSize:"5px",color:"#334",maxWidth:36,textAlign:"center",overflow:"hidden",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>{p.name}</div></div>)}
                  </div>
                  <div style={{textAlign:"center",fontSize:"6px",color:"#1a1a1a"}}>151-0.com</div>
                </div>
                <button onClick={copyShare} style={{width:"100%",background:copied?C.green:"linear-gradient(135deg,#ffd700,#ff9800)",color:"#000",border:"none",borderRadius:8,padding:"12px",fontSize:"9px",fontFamily:C.px,fontWeight:700,cursor:"pointer",transition:"background 0.25s"}}>
                  {copied?"✓ COPIED!":"📋 COPY & SHARE"}
                </button>
              </Card>
            )}

            {resultTab==="submit"&&(
              <Card>
                {submitted?(
                  <div style={{textAlign:"center",padding:"10px 0"}}>
                    <div style={{fontSize:32,marginBottom:10}}>✅</div>
                    <div style={{fontSize:"9px",color:C.green,marginBottom:8}}>SCORE SUBMITTED!</div>
                    <div style={{fontSize:"7px",color:C.dim,marginBottom:16,lineHeight:2}}>
                      {playerName} · {record.w}-{record.l}<br/>Gen {genLabel} · {regionLabel}
                    </div>
                    <button onClick={()=>setShowBoard(true)} style={{background:"transparent",border:`1px solid ${C.gold}`,color:C.gold,borderRadius:8,padding:"10px 16px",fontSize:"8px",fontFamily:C.px,cursor:"pointer"}}>
                      🏆 VIEW LEADERBOARD
                    </button>
                  </div>
                ):(
                  <>
                    <div style={{fontSize:"8px",color:C.gold,marginBottom:4}}>SUBMIT YOUR SCORE</div>
                    <div style={{fontSize:"7px",color:C.dim,marginBottom:14,lineHeight:2}}>{record.w}-{record.l} · Gen {genLabel} · {regionLabel}</div>
                    <input
                      value={nameInput}
                      onChange={e=>setNameInput(e.target.value)}
                      maxLength={20}
                      placeholder="ENTER YOUR NAME"
                      style={{width:"100%",background:"rgba(0,0,0,0.4)",border:`1px solid rgba(255,215,0,0.3)`,borderRadius:8,padding:"12px",fontSize:"8px",color:C.gold,outline:"none",marginBottom:10,letterSpacing:1}}
                    />
                    <PBtn onClick={handleSubmit} style={{width:"100%",opacity:submitting||!nameInput.trim()?0.5:1}}>
                      {submitting?"SUBMITTING...":"▶ SUBMIT TO LEADERBOARD"}
                    </PBtn>
                    <div style={{marginTop:10,textAlign:"center"}}>
                      <button onClick={()=>setShowBoard(true)} style={{background:"transparent",border:"none",color:"#445",fontSize:"7px",fontFamily:C.px,cursor:"pointer"}}>
                        VIEW CURRENT LEADERBOARD →
                      </button>
                    </div>
                  </>
                )}
              </Card>
            )}

            {resultTab==="log"&&(
              <Card>
                {battleLog.map((b,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"7px 0",borderBottom:"1px solid rgba(255,255,255,0.04)"}}>
                    <span style={{fontSize:16,width:22}}>{b.gym.emoji}</span>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"8px",marginBottom:2}}>{b.gym.name}</div>
                      <div style={{fontSize:"6px",color:C.dim,marginBottom:4}}>{b.gym.city}</div>
                      <div style={{height:3,background:"rgba(255,255,255,0.06)",borderRadius:2,overflow:"hidden"}}>
                        <div style={{width:`${b.pct}%`,height:"100%",borderRadius:2,background:b.win?C.green:C.red}}/>
                      </div>
                    </div>
                    <div style={{textAlign:"right"}}>
                      <div style={{fontSize:"8px",color:b.win?C.green:C.red,fontWeight:700}}>{b.win?"W":"L"}</div>
                      <div style={{fontSize:"6px",color:C.dim,marginTop:2}}>{b.pct}%</div>
                    </div>
                  </div>
                ))}
                <div style={{display:"flex",gap:5,marginTop:14,flexWrap:"wrap"}}>
                  {team.map((p,i)=><div key={i} style={{flex:"1 0 calc(33% - 5px)",display:"flex",flexDirection:"column",alignItems:"center",gap:4,background:"rgba(0,0,0,0.3)",border:`1px solid ${LEGENDARY_IDS.has(p.id)?"rgba(255,165,0,0.3)":C.border}`,borderRadius:10,padding:"8px 6px"}}><Sprite id={p.id} size={46}/><div style={{fontSize:"6px",color:LEGENDARY_IDS.has(p.id)?"#ff9800":C.gold,textAlign:"center"}}>{p.name}</div></div>)}
                </div>
              </Card>
            )}

            <div style={{display:"flex",gap:8,marginTop:12,width:"100%"}}>
              <PBtn onClick={()=>startGame(false)} style={{flex:1}}>▶ PLAY AGAIN</PBtn>
              <button onClick={()=>setScreen("home")} style={{flex:1,background:"transparent",color:"#445",border:"1px solid #1a1a1a",borderRadius:8,padding:"13px",fontSize:"8px",fontFamily:C.px,cursor:"pointer"}}>HOME</button>
            </div>
          </>
        )}
      </div>
      <div style={{textAlign:"center",padding:"10px 0 16px"}}>
        <a href="https://ko-fi.com/paperweb" target="_blank" rel="noopener noreferrer" style={{fontSize:"7px",color:"#445",fontFamily:C.px,textDecoration:"none"}}>
          ☕ tip jar
        </a>
      </div>
    </div>
  );
}
