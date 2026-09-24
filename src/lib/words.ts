import allowedRaw from "../data/allowed.txt?raw";

const ALLOWED_WORDS: Set<string> = new Set(
  allowedRaw.trim().split("\n").map((w) => w.trim().toUpperCase()),
);

const SOLUTIONS = [
  "CRANE", "SLATE", "TRACE", "CRATE", "STARE",
  "SNARE", "ARISE", "STALE", "RAISE", "LEARN",
  "HEART", "EARTH", "STEAM", "CREAM", "DREAM",
  "PLANE", "PLANT", "BLAZE", "BRAVE", "GRACE",
  "GRAPE", "SHAPE", "SHARE", "SPARE", "GLARE",
  "FLAME", "FRAME", "BRAKE", "QUAKE", "SHADE",
  "SKATE", "SCALE", "SCARE", "SNAKE", "SPACE",
  "STAGE", "STAKE", "SWEAR", "TRADE", "WASTE",
  "WATCH", "WATER", "BEACH", "BENCH", "BIRTH",
  "BLACK", "BLANK", "BLAST", "BLEED", "BLEND",
  "BLIND", "BLOCK", "BLOOM", "BLOWN", "BOARD",
  "BOOST", "BOUND", "BRAIN", "BRAND", "BREAD",
  "BREAK", "BREED", "BRICK", "BRIDE", "BRIEF",
  "BRING", "BROAD", "BROOK", "BROWN", "BRUSH",
  "BUILD", "BUNCH", "BURST", "CANDY", "CARRY",
  "CATCH", "CAUSE", "CHAIN", "CHAIR", "CHARM",
  "CHASE", "CHEAP", "CHECK", "CHESS", "CHIEF",
  "CHILD", "CHINA", "CHOSE", "CLAIM", "CLASS",
  "CLEAN", "CLEAR", "CLIMB", "CLING", "CLOCK",
  "CLOSE", "CLOUD", "COACH", "COAST", "COUNT",
  "COURT", "COVER", "CRASH", "CROSS", "CROWD",
  "CROWN", "CRUEL", "CRUSH", "CURVE", "CYCLE",
  "DANCE", "DEATH", "DELAY", "DEPTH", "DIRTY",
  "DOUBT", "DOUGH", "DRAFT", "DRAIN", "DRAMA",
  "DRAWN", "DRESS", "DRIED", "DRIFT", "DRILL",
  "DRINK", "DRIVE", "DROWN", "DYING", "EAGLE",
  "EARLY", "EIGHT", "ELECT", "ELITE", "EMPTY",
  "ENEMY", "ENJOY", "ENTER", "EQUAL", "ERROR",
  "EVENT", "EVERY", "EXACT", "EXTRA", "FAITH",
  "FALSE", "FANCY", "FAULT", "FEAST", "FENCE",
  "FEWER", "FIBER", "FIELD", "FIFTY", "FIGHT",
  "FINAL", "FIRST", "FIXED", "FLASH", "FLESH",
  "FLOAT", "FLOOD", "FLOOR", "FLOUR", "FLUID",
  "FLUSH", "FOCUS", "FORCE", "FORGE", "FORTH",
  "FOUND", "FRESH", "FRONT", "FROST", "FRUIT",
  "FUNNY", "GHOST", "GIANT", "GIVEN", "GLASS",
  "GLEAM", "GLOBE", "GLORY", "GLOVE", "GOING",
  "GRAIN", "GRAND", "GRANT", "GRASS", "GRAVE",
  "GREAT", "GREEN", "GRIND", "GROSS", "GROUP",
  "GROWN", "GUARD", "GUESS", "GUEST", "GUIDE",
  "HABIT", "HAPPY", "HAVEN", "HEAVY", "HONEY",
  "HONOR", "HORSE", "HOTEL", "HOUSE", "HUMAN",
  "HUMOR", "HURRY", "IDEAL", "IMAGE", "IMPLY",
  "INDEX", "INNER", "INPUT", "IRONY", "IVORY",
  "JEWEL", "JOINT", "JUDGE", "JUICE", "KNOCK",
  "KNOWN", "LABEL", "LARGE", "LASER", "LATER",
  "LAUGH", "LAYER", "LEGAL", "LEVEL", "LIGHT",
  "LIMIT", "LINEN", "LIVER", "LOGIC", "LOOSE",
  "LOVER", "LOWER", "LUCKY", "LUNCH", "LYING",
  "MAGIC", "MAJOR", "MAKER", "MANOR", "MARCH",
  "MATCH", "MAYOR", "MEDIA", "MERCY", "METAL",
  "METER", "MIGHT", "MINOR", "MINUS", "MIXED",
  "MODEL", "MONEY", "MONTH", "MORAL", "MOTOR",
  "MOUNT", "MOUSE", "MOUTH", "MOVIE", "MUSIC",
  "NAKED", "NERVE", "NEVER", "NIGHT", "NOBLE",
  "NOISE", "NORTH", "NOTED", "NOVEL", "NURSE",
  "OCCUR", "OCEAN", "OFFER", "ORDER", "OTHER",
  "OUTER", "OWNER", "PAINT", "PANEL", "PANIC",
  "PARTY", "PATCH", "PAUSE", "PEACE", "PEARL",
  "PENNY", "PHASE", "PHONE", "PHOTO", "PIANO",
  "PIECE", "PILOT", "PITCH", "PIXEL", "PIZZA",
  "PLAIN", "PLATE", "PLEAD", "PLUCK", "PLUMB",
  "POINT", "POUND", "POWER", "PRESS", "PRICE",
  "PRIDE", "PRIME", "PRINT", "PRIOR",
  "PRIZE", "PROOF", "PROUD", "PROVE", "PULSE",
  "PUNCH", "PUPIL", "QUEEN", "QUERY", "QUEUE",
  "QUICK", "QUIET", "QUITE", "QUOTA", "QUOTE",
  "RADAR", "RADIO", "RANCH", "RANGE", "RAPID",
  "RATIO", "REACH", "REACT", "READY", "REALM",
  "REBEL", "REFER", "REIGN", "RELAX", "REPLY",
  "RIDGE", "RIGHT", "RIGID", "RISKY", "RIVAL",
  "RIVER", "ROBIN", "ROBOT", "ROCKY", "ROMAN",
  "ROUGH", "ROUND", "ROUTE", "ROYAL", "RURAL",
  "SADLY", "SAINT", "SALAD", "SAUCE", "SCOPE",
  "SCORE", "SENSE", "SERVE", "SEVEN", "SHALL",
  "SHELF", "SHELL", "SHIFT", "SHINE", "SHIRT",
  "SHOCK", "SHOOT", "SHORT", "SHOUT", "SIGHT",
  "SILLY", "SINCE", "SIXTH", "SIXTY", "SKILL",
  "SLEEP", "SLICE", "SLIDE", "SLOPE", "SMART",
  "SMELL", "SMILE", "SMOKE", "SOLAR", "SOLID",
  "SOLVE", "SORRY", "SOUTH", "SPARK", "SPEAK",
  "SPEED", "SPEND", "SPICE", "SPLIT", "SPOKE",
  "SPORT", "SPRAY", "SQUAD", "STAFF", "STAND",
  "START", "STATE", "STEAL", "STEEP", "STEEL",
  "STERN", "STICK", "STILL", "STOCK", "STONE",
  "STOOD", "STORE", "STORM", "STORY", "STRAP",
  "STRIP", "STUCK", "STUDY", "STUFF", "STYLE",
  "SUGAR", "SUITE", "SUNNY", "SUPER", "SURGE",
  "SWAMP", "SWEEP", "SWEET", "SWIFT", "SWING",
  "SWORD", "SWORE", "SWORN", "TASTE", "TEACH",
  "TEMPO", "TENSE", "THANK", "THEME", "THICK",
  "THING", "THINK", "THIRD", "THOSE", "THREE",
  "THREW", "THROW", "THUMB", "TIGHT", "TIMER",
  "TIRED", "TITLE", "TODAY", "TOKEN", "TOTAL",
  "TOUCH", "TOUGH", "TOWER", "TOXIC", "TRACK",
  "TRAIL", "TRAIN", "TRAIT", "TREAT", "TREND",
  "TRIAL", "TRIBE", "TRICK", "TRIED", "TROOP",
  "TRUCK", "TRULY", "TRUMP", "TRUNK", "TRUST",
  "TRUTH", "TUMOR", "TWICE", "TWIST", "ULTRA",
  "UNCLE", "UNDER", "UNION", "UNITE", "UNITY",
  "UNTIL", "UPPER", "UPSET", "URBAN", "USAGE",
  "USUAL", "VALID", "VALUE", "VIDEO", "VIGOR",
  "VIRAL", "VIRUS", "VISIT", "VITAL", "VIVID",
  "VOCAL", "VOICE", "VOTER", "WAGON", "WASTE",
  "WEIGH", "WEIRD", "WHEAT", "WHEEL", "WHERE",
  "WHICH", "WHILE", "WHITE", "WHOLE", "WHOSE",
  "WOMAN", "WORLD", "WORRY", "WORSE", "WORST",
  "WORTH", "WOULD", "WOUND", "WRIST", "WRITE",
  "WRONG", "WROTE", "YIELD", "YOUNG", "YOUTH",
];

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

function getDayNumber(): number {
  const launch = new Date(2026, 0, 1);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.floor((today.getTime() - launch.getTime()) / (1000 * 60 * 60 * 24));
}

export function getDailyWord(): string {
  const day = getDayNumber();
  const index = Math.floor(seededRandom(day + 1) * SOLUTIONS.length);
  return SOLUTIONS[index];
}

export type BluffColor = "green" | "yellow" | "red";

export function getDailyBluffColor(): BluffColor {
  const day = getDayNumber();
  const colors: BluffColor[] = ["green", "yellow", "red"];
  const index = Math.floor(seededRandom(day + 9999) * 3);
  return colors[index];
}

export function isValidWord(word: string): boolean {
  return ALLOWED_WORDS.has(word.toUpperCase());
}
