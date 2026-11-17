// Product catalogue. Prices are in euro cents and include VAT.
// To add a product, copy an entry, give it a unique id/slug and adjust the fields.

export type Locale = "en" | "el";
export type L10n = Record<Locale, string>;

export type Kind =
  | "armchair" | "chair" | "sofa" | "stool" | "bench" | "dining-table" | "coffee-table"
  | "side-table" | "shelf" | "sideboard" | "bed" | "lamp" | "mirror";

export type Category = "living" | "dining" | "bedroom" | "decor";
export type Backdrop = "olive" | "clay" | "sea" | "stone";

export type Variant = {
  id: string;
  name: L10n;
  /** Colours used by the product illustration. */
  wood: string;
  fabric: string;
  /** Added to the base price, in cents. */
  priceDelta?: number;
};

export type Product = {
  id: string;
  slug: string;
  kind: Kind;
  category: Category;
  name: L10n;
  tagline: L10n;
  description: L10n;
  materials: L10n;
  care: L10n;
  price: number;
  compareAt?: number;
  /** Width × depth × height in cm. */
  dims: { w: number; d: number; h: number };
  weightKg: number;
  /** Units ready to ship. 0 = made to order. */
  stock: number;
  /** Lead time in weeks for made-to-order pieces. */
  leadWeeks: number;
  backdrop: Backdrop;
  variants: Variant[];
  featured?: boolean;
  isNew?: boolean;
};

// Finishes reused across the collection
const W = { oak: "#b98b5e", walnut: "#6b4a33", ash: "#d8c29f", black: "#2f2a25", olivewood: "#a08458" };
const F = { linen: "#e6dac3", olive: "#6f7d52", clay: "#b8653f", sea: "#56707f", boucle: "#f0e8da", sand: "#cdb48e", rush: "#c9ad78" };

const v = (id: string, en: string, el: string, wood: string, fabric: string, priceDelta = 0): Variant =>
  ({ id, name: { en, el }, wood, fabric, priceDelta });

export const products: Product[] = [
  {
    id: "p-plaka-armchair", slug: "plaka-armchair", kind: "armchair", category: "living",
    name: { en: "Plaka Armchair", el: "Πολυθρόνα Πλάκα" },
    tagline: { en: "A deep, low seat for long afternoons.", el: "Βαθύ, χαμηλό κάθισμα για μεγάλα απογεύματα." },
    description: {
      en: "Named after the old neighbourhood below the Acropolis, the Plaka armchair pairs a solid oak frame with generous feather-wrapped cushions. Its rounded back holds you without stiffness, and the low arms leave room for a book or a cup of coffee.",
      el: "Με το όνομα της παλιάς γειτονιάς κάτω από την Ακρόπολη, η πολυθρόνα Πλάκα συνδυάζει σκελετό από μασίφ δρυ με αφράτα μαξιλάρια τυλιγμένα σε πούπουλο. Η στρογγυλεμένη πλάτη σε κρατά χωρίς ακαμψία και τα χαμηλά μπράτσα αφήνουν χώρο για ένα βιβλίο ή έναν καφέ.",
    },
    materials: { en: "Solid oak frame, feather-wrapped foam, removable linen cover.", el: "Σκελετός από μασίφ δρυ, αφρός τυλιγμένος σε πούπουλο, αφαιρούμενο λινό κάλυμμα." },
    care: { en: "Cover is dry-clean only. Wipe the wood with a dry cloth.", el: "Το κάλυμμα καθαρίζεται μόνο στεγνά. Σκουπίστε το ξύλο με στεγνό πανί." },
    price: 89000, dims: { w: 82, d: 86, h: 74 }, weightKg: 24, stock: 6, leadWeeks: 0, backdrop: "olive",
    variants: [v("linen-oak", "Natural linen / Oak", "Φυσικό λινό / Δρυς", W.oak, F.linen), v("olive-oak", "Olive linen / Oak", "Λαδί λινό / Δρυς", W.oak, F.olive), v("clay-walnut", "Clay linen / Walnut", "Κεραμιδί λινό / Καρυδιά", W.walnut, F.clay, 6000)],
    featured: true,
  },
  {
    id: "p-lycabettus-sofa", slug: "lycabettus-sofa", kind: "sofa", category: "living",
    name: { en: "Lycabettus Sofa", el: "Καναπές Λυκαβηττός" },
    tagline: { en: "Three seats, one long horizon.", el: "Τρεις θέσεις, ένας μακρύς ορίζοντας." },
    description: {
      en: "A three-seater with a low, calm silhouette and a seat deep enough to tuck your feet under you. The cushions are reversible, so they wear evenly for years.",
      el: "Τριθέσιος καναπές με χαμηλή, ήρεμη γραμμή και κάθισμα αρκετά βαθύ για να μαζέψεις τα πόδια σου. Τα μαξιλάρια γυρίζουν και από τις δύο πλευρές, ώστε να φθείρονται ομοιόμορφα για χρόνια.",
    },
    materials: { en: "Kiln-dried beech frame, pocket springs, linen-cotton blend cover.", el: "Σκελετός από ξηραμένη οξιά, ανεξάρτητα ελατήρια, κάλυμμα από μείγμα λινού και βαμβακιού." },
    care: { en: "Vacuum weekly; turn cushions monthly. Covers are dry-clean only.", el: "Σκούπισμα κάθε εβδομάδα, γύρισμα μαξιλαριών κάθε μήνα. Τα καλύμματα καθαρίζονται μόνο στεγνά." },
    price: 249000, compareAt: 279000, dims: { w: 228, d: 98, h: 78 }, weightKg: 68, stock: 0, leadWeeks: 5, backdrop: "sea",
    variants: [v("boucle", "Cream bouclé", "Κρεμ μπουκλέ", W.oak, F.boucle), v("sea", "Sea linen", "Λινό θάλασσα", W.oak, F.sea), v("olive", "Olive linen", "Λαδί λινό", W.walnut, F.olive)],
    featured: true,
  },
  {
    id: "p-milos-coffee-table", slug: "milos-coffee-table", kind: "coffee-table", category: "living",
    name: { en: "Milos Coffee Table", el: "Τραπεζάκι σαλονιού Μήλος" },
    tagline: { en: "A soft oval, worn smooth like sea stone.", el: "Ένα απαλό οβάλ, λείο σαν βότσαλο." },
    description: {
      en: "An oval top with rounded edges sits on a solid pedestal. No corners to bump into, plenty of space for books, a tray and a jug of flowers.",
      el: "Οβάλ επιφάνεια με στρογγυλεμένες άκρες πάνω σε συμπαγή βάση. Καμία γωνία για να χτυπήσεις, άφθονος χώρος για βιβλία, ένα δίσκο και ένα βάζο με λουλούδια.",
    },
    materials: { en: "Solid oak or walnut, natural oil finish.", el: "Μασίφ δρυς ή καρυδιά, φινίρισμα με φυσικό λάδι." },
    care: { en: "Wipe with a damp cloth. Re-oil once a year.", el: "Σκουπίστε με νωπό πανί. Λαδώστε ξανά μία φορά τον χρόνο." },
    price: 64000, dims: { w: 120, d: 70, h: 38 }, weightKg: 22, stock: 9, leadWeeks: 0, backdrop: "stone",
    variants: [v("oak", "Oak", "Δρυς", W.oak, F.linen), v("walnut", "Walnut", "Καρυδιά", W.walnut, F.linen, 9000), v("black", "Black ash", "Μαύρη μελία", W.black, F.linen)],
    isNew: true, featured: true,
  },
  {
    id: "p-aegean-side-table", slug: "aegean-side-table", kind: "side-table", category: "living",
    name: { en: "Aegean Side Table", el: "Βοηθητικό τραπέζι Αιγαίο" },
    tagline: { en: "Small enough to move, steady enough to stay.", el: "Αρκετά μικρό για να το μετακινείς, αρκετά σταθερό για να μένει." },
    description: {
      en: "A round top on a turned stem and weighted base. Next to the armchair, by the bed or on the balcony under cover.",
      el: "Στρογγυλή επιφάνεια πάνω σε τορνευτό πόδι με βαριά βάση. Δίπλα στην πολυθρόνα, στο κομοδίνο ή στο σκεπαστό μπαλκόνι.",
    },
    materials: { en: "Solid ash, water-based lacquer.", el: "Μασίφ μελία, βερνίκι νερού." },
    care: { en: "Wipe with a damp cloth.", el: "Σκουπίστε με νωπό πανί." },
    price: 21000, dims: { w: 45, d: 45, h: 52 }, weightKg: 6, stock: 14, leadWeeks: 0, backdrop: "clay",
    variants: [v("ash", "Natural ash", "Φυσική μελία", W.ash, F.linen), v("olive", "Olive", "Λαδί", "#6f7d52", F.linen), v("clay", "Clay", "Κεραμιδί", "#b8653f", F.linen)],
  },
  {
    id: "p-naxos-bookshelf", slug: "naxos-bookshelf", kind: "shelf", category: "living",
    name: { en: "Naxos Bookshelf", el: "Βιβλιοθήκη Νάξος" },
    tagline: { en: "Five open shelves for a life in books.", el: "Πέντε ανοιχτά ράφια για μια ζωή με βιβλία." },
    description: {
      en: "A tall, open bookshelf with dovetailed joints and shelves thick enough not to bow under a full row of hardbacks. Comes with a wall fixing kit.",
      el: "Ψηλή ανοιχτή βιβλιοθήκη με χελιδονοουρές στις ενώσεις και ράφια αρκετά χοντρά ώστε να μην λυγίζουν κάτω από μια σειρά βιβλία. Συνοδεύεται από σετ στερέωσης στον τοίχο.",
    },
    materials: { en: "Solid oak, natural oil finish.", el: "Μασίφ δρυς, φινίρισμα με φυσικό λάδι." },
    care: { en: "Dust regularly. Re-oil once a year.", el: "Ξεσκονίζετε τακτικά. Λαδώστε ξανά μία φορά τον χρόνο." },
    price: 118000, dims: { w: 90, d: 32, h: 196 }, weightKg: 41, stock: 0, leadWeeks: 4, backdrop: "olive",
    variants: [v("oak", "Oak", "Δρυς", W.oak, F.clay), v("walnut", "Walnut", "Καρυδιά", W.walnut, F.sand, 14000)],
  },
  {
    id: "p-kyklades-dining-table", slug: "kyklades-dining-table", kind: "dining-table", category: "dining",
    name: { en: "Kyklades Dining Table", el: "Τραπεζαρία Κυκλάδες" },
    tagline: { en: "Seats six, and eight when the cousins come.", el: "Χωράει έξι, και οκτώ όταν έρθουν τα ξαδέρφια." },
    description: {
      en: "A long table made for slow lunches. The solid top is joined from wide boards and finished with oil so that every glass ring can be sanded away.",
      el: "Ένα μακρύ τραπέζι φτιαγμένο για αργά μεσημεριανά. Η μασίφ επιφάνεια είναι ενωμένη από φαρδιές σανίδες και περασμένη με λάδι, ώστε κάθε σημάδι από ποτήρι να φεύγει με ένα τρίψιμο.",
    },
    materials: { en: "Solid oak or walnut, natural oil finish, steel-reinforced apron.", el: "Μασίφ δρυς ή καρυδιά, φινίρισμα με λάδι, ενισχυμένη ποδιά με ατσάλι." },
    care: { en: "Use coasters for hot dishes. Re-oil twice a year.", el: "Χρησιμοποιείτε σουβέρ για τα ζεστά σκεύη. Λαδώστε ξανά δύο φορές τον χρόνο." },
    price: 198000, dims: { w: 200, d: 95, h: 75 }, weightKg: 62, stock: 2, leadWeeks: 0, backdrop: "clay",
    variants: [v("oak-200", "Oak · 200 cm", "Δρυς · 200 εκ.", W.oak, F.linen), v("oak-240", "Oak · 240 cm", "Δρυς · 240 εκ.", W.oak, F.linen, 32000), v("walnut-200", "Walnut · 200 cm", "Καρυδιά · 200 εκ.", W.walnut, F.linen, 42000)],
    featured: true,
  },
  {
    id: "p-sifnos-chair", slug: "sifnos-dining-chair", kind: "chair", category: "dining",
    name: { en: "Sifnos Dining Chair", el: "Καρέκλα Σίφνος" },
    tagline: { en: "The kafeneio chair, made for home.", el: "Η καρέκλα του καφενείου, για το σπίτι." },
    description: {
      en: "Our take on the classic Greek café chair: a light wooden frame with a hand-woven seat. Light enough to carry to the table with one hand, strong enough for generations.",
      el: "Η δική μας εκδοχή της κλασικής καρέκλας του καφενείου: ελαφρύς ξύλινος σκελετός με χειροποίητο ψάθινο κάθισμα. Αρκετά ελαφριά για να τη μεταφέρεις με το ένα χέρι, αρκετά γερή για γενιές.",
    },
    materials: { en: "Solid beech frame, hand-woven paper-rush seat.", el: "Σκελετός από μασίφ οξιά, χειροποίητο κάθισμα από ψάθα." },
    care: { en: "Keep away from standing water. Dust the seat with a soft brush.", el: "Μακριά από νερό. Ξεσκονίζετε το κάθισμα με μαλακή βούρτσα." },
    price: 19500, dims: { w: 44, d: 48, h: 86 }, weightKg: 4, stock: 32, leadWeeks: 0, backdrop: "sea",
    variants: [v("natural", "Natural", "Φυσικό", W.ash, F.rush), v("olive", "Olive green", "Λαδί", "#55633e", F.rush), v("sea", "Sea blue", "Μπλε θάλασσας", "#4b6574", F.rush), v("black", "Black", "Μαύρο", W.black, F.rush)],
    featured: true,
  },
  {
    id: "p-anafiotika-bench", slug: "anafiotika-bench", kind: "bench", category: "dining",
    name: { en: "Anafiotika Bench", el: "Πάγκος Αναφιώτικα" },
    tagline: { en: "Room for three at the long side of the table.", el: "Χώρος για τρεις στη μακριά πλευρά του τραπεζιού." },
    description: {
      en: "A simple bench to match the Kyklades table. Equally at home in the hallway, at the foot of the bed or as a shelf for plants.",
      el: "Ένας απλός πάγκος που ταιριάζει με την τραπεζαρία Κυκλάδες. Το ίδιο όμορφος στο χολ, στο πόδι του κρεβατιού ή ως ράφι για φυτά.",
    },
    materials: { en: "Solid oak, natural oil finish.", el: "Μασίφ δρυς, φινίρισμα με φυσικό λάδι." },
    care: { en: "Wipe with a damp cloth. Re-oil once a year.", el: "Σκουπίστε με νωπό πανί. Λαδώστε ξανά μία φορά τον χρόνο." },
    price: 42000, dims: { w: 160, d: 36, h: 45 }, weightKg: 14, stock: 7, leadWeeks: 0, backdrop: "stone",
    variants: [v("oak", "Oak", "Δρυς", W.oak, F.linen), v("walnut", "Walnut", "Καρυδιά", W.walnut, F.linen, 7000)],
  },
  {
    id: "p-ikaria-sideboard", slug: "ikaria-sideboard", kind: "sideboard", category: "dining",
    name: { en: "Ikaria Sideboard", el: "Μπουφές Ικαρία" },
    tagline: { en: "Three arched doors, one place for the good plates.", el: "Τρεις καμαρωτές πόρτες, μια θέση για τα καλά πιάτα." },
    description: {
      en: "A low sideboard with arched door panels that recall island windows. Inside, adjustable shelves and a soft-close mechanism on every door.",
      el: "Χαμηλός μπουφές με καμαρωτά φύλλα που θυμίζουν νησιώτικα παράθυρα. Μέσα, ρυθμιζόμενα ράφια και μηχανισμός αθόρυβου κλεισίματος σε κάθε πόρτα.",
    },
    materials: { en: "Oak veneer on FSC plywood, solid oak legs, lacquered door panels.", el: "Καπλαμάς δρυός σε κόντρα πλακέ FSC, πόδια από μασίφ δρυ, βαμμένα φύλλα." },
    care: { en: "Wipe with a damp cloth; avoid harsh cleaners.", el: "Σκουπίστε με νωπό πανί, αποφύγετε τα δυνατά καθαριστικά." },
    price: 156000, dims: { w: 180, d: 45, h: 78 }, weightKg: 58, stock: 0, leadWeeks: 6, backdrop: "olive",
    variants: [v("oak-clay", "Oak / Clay doors", "Δρυς / Κεραμιδί πόρτες", W.oak, F.clay), v("oak-sea", "Oak / Sea doors", "Δρυς / Μπλε πόρτες", W.oak, F.sea), v("walnut-linen", "Walnut / Linen doors", "Καρυδιά / Λινές πόρτες", W.walnut, F.linen, 18000)],
    isNew: true,
  },
  {
    id: "p-mnisikleous-stool", slug: "mnisikleous-stool", kind: "stool", category: "dining",
    name: { en: "Mnisikleous Stool", el: "Σκαμπό Μνησικλέους" },
    tagline: { en: "A bar stool with a footrest worn in by use.", el: "Σκαμπό μπαρ με υποπόδιο που ομορφαίνει με τη χρήση." },
    description: {
      en: "Named after the stepped street in Plaka. Splayed legs keep it steady on uneven floors, and the dished seat is carved for comfort.",
      el: "Με το όνομα του σκαλωτού δρόμου της Πλάκας. Τα ανοιχτά πόδια το κρατούν σταθερό σε ανώμαλα πατώματα και το σκαλιστό κάθισμα είναι άνετο.",
    },
    materials: { en: "Solid ash, water-based lacquer.", el: "Μασίφ μελία, βερνίκι νερού." },
    care: { en: "Wipe with a damp cloth.", el: "Σκουπίστε με νωπό πανί." },
    price: 16500, dims: { w: 40, d: 40, h: 75 }, weightKg: 5, stock: 18, leadWeeks: 0, backdrop: "clay",
    variants: [v("ash", "Natural ash", "Φυσική μελία", W.ash, F.linen), v("black", "Black", "Μαύρο", W.black, F.linen)],
  },
  {
    id: "p-paros-bed", slug: "paros-bed", kind: "bed", category: "bedroom",
    name: { en: "Paros Bed", el: "Κρεβάτι Πάρος" },
    tagline: { en: "An arched, padded headboard for slow mornings.", el: "Καμαρωτό, ταπετσαρισμένο κεφαλάρι για αργά πρωινά." },
    description: {
      en: "A double bed with a softly padded arched headboard and a solid wood base. Slats are included; the mattress is not.",
      el: "Διπλό κρεβάτι με απαλά ταπετσαρισμένο καμαρωτό κεφαλάρι και βάση από μασίφ ξύλο. Περιλαμβάνει τάβλες, χωρίς στρώμα.",
    },
    materials: { en: "Solid oak base, beech slats, linen-upholstered headboard.", el: "Βάση από μασίφ δρυ, τάβλες οξιάς, κεφαλάρι ντυμένο με λινό." },
    care: { en: "Vacuum the headboard; spot-clean with a damp cloth.", el: "Σκούπισμα του κεφαλαριού, τοπικός καθαρισμός με νωπό πανί." },
    price: 168000, dims: { w: 170, d: 212, h: 120 }, weightKg: 72, stock: 0, leadWeeks: 5, backdrop: "sea",
    variants: [v("160-linen", "160 × 200 · Linen", "160 × 200 · Λινό", W.oak, F.linen), v("160-clay", "160 × 200 · Clay", "160 × 200 · Κεραμιδί", W.oak, F.clay), v("180-linen", "180 × 200 · Linen", "180 × 200 · Λινό", W.oak, F.linen, 20000)],
    featured: true,
  },
  {
    id: "p-tinos-lamp", slug: "tinos-floor-lamp", kind: "lamp", category: "decor",
    name: { en: "Tinos Floor Lamp", el: "Φωτιστικό δαπέδου Τήνος" },
    tagline: { en: "Warm light through a pleated linen shade.", el: "Ζεστό φως μέσα από πλισέ λινό καπέλο." },
    description: {
      en: "A slender oak stem with a pleated linen shade that turns any bulb into the glow of a summer evening. Foot switch on the cable.",
      el: "Λεπτό πόδι από δρυ με πλισέ λινό καπέλο που κάνει κάθε λάμπα να μοιάζει με καλοκαιρινό σούρουπο. Ποδοδιακόπτης στο καλώδιο.",
    },
    materials: { en: "Solid oak, steel base, linen shade. E27 bulb, max 60 W (not included).", el: "Μασίφ δρυς, ατσάλινη βάση, λινό καπέλο. Λάμπα E27, έως 60 W (δεν περιλαμβάνεται)." },
    care: { en: "Dust the shade with a soft brush.", el: "Ξεσκονίστε το καπέλο με μαλακή βούρτσα." },
    price: 29000, dims: { w: 42, d: 42, h: 158 }, weightKg: 7, stock: 11, leadWeeks: 0, backdrop: "olive",
    variants: [v("linen", "Linen shade", "Λινό καπέλο", W.oak, F.linen), v("clay", "Clay shade", "Κεραμιδί καπέλο", W.oak, F.clay)],
    isNew: true,
  },
  {
    id: "p-andros-mirror", slug: "andros-mirror", kind: "mirror", category: "decor",
    name: { en: "Andros Arch Mirror", el: "Καθρέφτης Άνδρος" },
    tagline: { en: "A full-length arch that brings in more light.", el: "Ολόσωμη καμάρα που φέρνει περισσότερο φως." },
    description: {
      en: "A full-length mirror in an arched solid-wood frame. Lean it against the wall or fix it with the included brackets.",
      el: "Ολόσωμος καθρέφτης σε καμαρωτό κάδρο από μασίφ ξύλο. Ακουμπήστε τον στον τοίχο ή στερεώστε τον με τα στηρίγματα που περιλαμβάνονται.",
    },
    materials: { en: "Solid oak frame, 5 mm safety-backed mirror glass.", el: "Κάδρο από μασίφ δρυ, καθρέφτης 5 χιλ. με φιλμ ασφαλείας." },
    care: { en: "Clean the glass with a vinegar-water solution.", el: "Καθαρίστε το τζάμι με διάλυμα νερού και ξιδιού." },
    price: 34000, dims: { w: 60, d: 3, h: 170 }, weightKg: 16, stock: 5, leadWeeks: 0, backdrop: "clay",
    variants: [v("oak", "Oak", "Δρυς", W.oak, F.linen), v("walnut", "Walnut", "Καρυδιά", W.walnut, F.linen, 4000), v("black", "Black", "Μαύρο", W.black, F.linen)],
  },
  {
    id: "p-hydra-lounge", slug: "hydra-lounge-chair", kind: "armchair", category: "living",
    name: { en: "Hydra Lounge Chair", el: "Πολυθρόνα Ύδρα" },
    tagline: { en: "Sea-blue linen on a walnut frame.", el: "Λινό στο χρώμα της θάλασσας σε σκελετό καρυδιάς." },
    description: {
      en: "A slightly lower, wider sibling of the Plaka armchair, for reading corners and bedroom windows.",
      el: "Λίγο πιο χαμηλή και φαρδιά αδελφή της πολυθρόνας Πλάκα, για γωνιές διαβάσματος και παράθυρα κρεβατοκάμαρας.",
    },
    materials: { en: "Solid walnut frame, foam and fibre seat, linen cover.", el: "Σκελετός από μασίφ καρυδιά, κάθισμα από αφρό και ίνες, λινό κάλυμμα." },
    care: { en: "Cover is dry-clean only.", el: "Το κάλυμμα καθαρίζεται μόνο στεγνά." },
    price: 96000, compareAt: 112000, dims: { w: 88, d: 90, h: 70 }, weightKg: 26, stock: 3, leadWeeks: 0, backdrop: "stone",
    variants: [v("sea-walnut", "Sea linen / Walnut", "Μπλε λινό / Καρυδιά", W.walnut, F.sea), v("sand-walnut", "Sand linen / Walnut", "Λινό άμμου / Καρυδιά", W.walnut, F.sand)],
  },
];

export const categories: { id: Category; name: L10n; blurb: L10n }[] = [
  { id: "living", name: { en: "Living room", el: "Σαλόνι" }, blurb: { en: "Sofas, armchairs and tables to gather around.", el: "Καναπέδες, πολυθρόνες και τραπέζια για να μαζεύεστε." } },
  { id: "dining", name: { en: "Dining", el: "Τραπεζαρία" }, blurb: { en: "Long tables, kafeneio chairs, places for plates.", el: "Μακριά τραπέζια, καρέκλες καφενείου, θέσεις για πιάτα." } },
  { id: "bedroom", name: { en: "Bedroom", el: "Υπνοδωμάτιο" }, blurb: { en: "Quiet pieces for slow mornings.", el: "Ήσυχα κομμάτια για αργά πρωινά." } },
  { id: "decor", name: { en: "Light & mirrors", el: "Φως & καθρέφτες" }, blurb: { en: "Lamps and mirrors that bring in light.", el: "Φωτιστικά και καθρέφτες που φέρνουν φως." } },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductById = (id: string) => products.find((p) => p.id === id);
export const getVariant = (p: Product, variantId?: string) => p.variants.find((x) => x.id === variantId) ?? p.variants[0];
export const unitPrice = (p: Product, variant: Variant) => p.price + (variant.priceDelta ?? 0);
export const fromPrice = (p: Product) => Math.min(...p.variants.map((x) => unitPrice(p, x)));
