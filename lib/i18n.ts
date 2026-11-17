import type { Locale } from "./products.ts";
export type { Locale };

export const locales: Locale[] = ["el", "en"];
export const defaultLocale: Locale = "el";
export const isLocale = (x: string | undefined): x is Locale => x === "en" || x === "el";

const en = {
  meta: {
    title: "Yiasemi · Handmade Greek furniture",
    description: "Solid-wood furniture made in Greece: sofas, armchairs, dining tables and kafeneio chairs, delivered to your door across Greece and Cyprus.",
  },
  nav: { home: "Home", shop: "Shop", about: "Our story", journal: "Delivery", contact: "Contact", menu: "Menu", close: "Close", skip: "Skip to content", search: "Search" },
  a11y: { dark: "Dark mode", light: "Light mode", cart: "Cart", wishlist: "Wishlist", switchLang: "Διαβάστε στα Ελληνικά", items: "items" },
  hero: {
    greeting: ["Good morning", "Good afternoon", "Good evening"],
    title: "Furniture for", titleSoft: "slow Greek days.",
    lead: "Solid wood, natural linen and hand-woven seats, made by small workshops in Greece and built to be handed down.",
    shop: "Shop the collection", story: "Our story",
    chips: ["Made in Greece", "Free delivery over €400", "30-day returns"],
  },
  strip: ["Solid oak & walnut", "Hand-woven rush", "Natural linen", "Oil finishes", "Made to last"],
  home: {
    catsEyebrow: "The rooms", catsTitle: "Shop by room.",
    featEyebrow: "Favourites", featTitle: "Pieces people come back for.", viewAll: "View all",
    whyEyebrow: "Why Yiasemi", whyTitle: "Made slowly, on purpose.",
    why: [
      { t: "Solid wood, honest joints", d: "Oak, walnut and ash, joined with dovetails and tenons rather than staples." },
      { t: "Made by Greek workshops", d: "Every piece is made by small family workshops in Attica and Thessaly." },
      { t: "Delivered and assembled", d: "Free delivery over €400. Choose white-glove and we carry it in and build it." },
    ],
    stepsEyebrow: "How it works", stepsTitle: "From the workshop\nto your home.",
    steps: [
      { t: "Choose", d: "Pick the piece and finish. In-stock items ship within 3 working days." },
      { t: "Made for you", d: "Made-to-order pieces are built in 3–6 weeks. We e-mail you at each stage." },
      { t: "Delivered", d: "Our team calls to book a delivery slot that suits you." },
      { t: "Lived with", d: "30 days to change your mind, 5-year guarantee on every frame." },
    ],
    quote: "A chair should be light enough to carry to the table, and strong enough for the grandchildren.",
    quoteBy: "Yiasemi workshop",
    newsletterTitle: "Letters from the workshop.",
    newsletterLead: "New pieces and the occasional story, four times a year. No spam.",
    faqEyebrow: "Good to know", faqTitle: "Questions people ask.",
    faqs: [
      { q: "How long does delivery take?", a: "Pieces in stock arrive in 3–7 working days. Made-to-order pieces take 3–6 weeks to make; each product page shows the exact time." },
      { q: "Do you deliver to the islands and Cyprus?", a: "Yes, everywhere in Greece and Cyprus. Islands may take a few extra days." },
      { q: "Can I return a piece?", a: "Yes, within 30 days of delivery, for any reason. We collect it from your home." },
      { q: "Is assembly included?", a: "Choose white-glove delivery at checkout and we carry the piece in, assemble it and take the packaging away." },
      { q: "How can I pay?", a: "By card, Apple Pay or Google Pay, through Stripe's secure checkout. We never see your card details." },
      { q: "Can I see a fabric before ordering?", a: "Write to us and we will post you free fabric and wood samples." },
    ],
    ctaTitle: "Not sure which piece fits?", ctaLead: "Send us a photo of your room and the measurements. We reply within a working day.",
    ctaPrimary: "Write to us", ctaSecondary: "Delivery & returns",
    newsletterCta: "Subscribe", newsletterPlaceholder: "Your e-mail", newsletterThanks: "Thank you. We will write soon.",
  },
  shop: {
    eyebrow: "The collection", title: "Shop", all: "All", searchPlaceholder: "Search furniture…", sort: "Sort",
    sorts: { featured: "Featured", "price-asc": "Price: low to high", "price-desc": "Price: high to low", new: "Newest" },
    inStockOnly: "Ready to ship", results: (n: number) => `${n} ${n === 1 ? "piece" : "pieces"}`,
    none: "Nothing matches that search.", clear: "Clear filters",
  },
  product: {
    from: "From", finish: "Finish", qty: "Quantity", add: "Add to cart", added: "Added", buyNow: "Buy now",
    inStock: (n: number) => (n <= 3 ? `Only ${n} left, ships in 3 days` : "In stock, ships in 3 days"),
    madeToOrder: (w: number) => `Made to order, ships in ${w} weeks`,
    details: "Details", dimensions: "Dimensions", materials: "Materials", care: "Care", delivery: "Delivery & returns",
    deliveryText: "Free standard delivery over €400 in Greece and Cyprus. White-glove delivery with assembly available at checkout. 30-day returns.",
    width: "Width", depth: "Depth", height: "Height", weight: "Weight", view: "View", drawing: "Dimensions",
    related: "You may also like", sale: "Sale", new: "New", save: "Save to wishlist", saved: "Saved", vat: "VAT included",
    guarantee: "5-year frame guarantee", secure: "Secure payment by Stripe",
    freeDelivery: (x: string) => `Free delivery over ${x}`, returns: (d: number) => `${d}-day returns`,
  },
  cart: {
    title: "Your cart", empty: "Your cart is empty.", emptyLead: "Have a look around, there is a chair waiting.", continue: "Continue shopping",
    subtotal: "Subtotal", shipping: "Delivery", free: "Free", vat: "Includes VAT", total: "Estimated total", checkout: "Checkout",
    remove: "Remove", freeLeft: (x: string) => `Add ${x} more for free delivery.`, freeOk: "You have free standard delivery.",
    note: "Delivery options and promo codes are chosen on the next step.", viewCart: "View cart",
    lead: (w: number) => `Some pieces are made to order. Your order ships in about ${w} weeks.`,
    canceled: "Checkout was cancelled. Your cart is still here.", processing: "Redirecting to secure payment…",
    errors: {
      not_configured: "Online payment is not switched on yet. Please contact us to order.",
      out_of_stock: "One of the items does not have enough stock. Please lower the quantity.",
      generic: "Something went wrong. Please try again.",
    } as Record<string, string>,
  },
  wishlist: { title: "Wishlist", empty: "Nothing saved yet.", lead: "Tap the heart on any piece to keep it here." },
  success: {
    title: "Thank you!", lead: "Your order is confirmed. A receipt is on its way to your inbox.", order: "Order",
    next: "We will call you within two working days to book delivery.", back: "Back to the shop",
    pending: "We are confirming your payment. You will receive an e-mail as soon as it clears.",
    summary: "Order summary", paidWith: "Total paid",
  },
  footer: {
    note: "Handmade Greek furniture. Solid wood, natural materials, made to be handed down.",
    shop: "Shop", help: "Help", contact: "Contact", privacy: "Privacy", terms: "Terms", rights: "All rights reserved.",
    payments: "Secure payments by Stripe", testMode: "Test mode: pay with card 4242 4242 4242 4242, any future date and CVC.",
  },
  pages: {
    aboutTitle: "Our story",
    shippingTitle: "Delivery & returns",
    contactTitle: "Contact",
    privacyTitle: "Privacy policy",
    termsTitle: "Terms of sale",
    notFound: "This page wandered off.", notFoundLead: "The link may be old, or the piece is no longer made.",
  },
  toast: { added: "Added to cart", saved: "Saved to wishlist", removed: "Removed from wishlist" },
};

export type Dict = typeof en;

const el: Dict = {
  meta: {
    title: "Γιασεμί · Χειροποίητα ελληνικά έπιπλα",
    description: "Έπιπλα από μασίφ ξύλο, φτιαγμένα στην Ελλάδα: καναπέδες, πολυθρόνες, τραπεζαρίες και καρέκλες καφενείου, με παράδοση σε όλη την Ελλάδα και την Κύπρο.",
  },
  nav: { home: "Αρχική", shop: "Κατάστημα", about: "Η ιστορία μας", journal: "Παράδοση", contact: "Επικοινωνία", menu: "Μενού", close: "Κλείσιμο", skip: "Μετάβαση στο περιεχόμενο", search: "Αναζήτηση" },
  a11y: { dark: "Σκοτεινό θέμα", light: "Φωτεινό θέμα", cart: "Καλάθι", wishlist: "Αγαπημένα", switchLang: "Read in English", items: "τεμάχια" },
  hero: {
    greeting: ["Καλημέρα", "Καλό απόγευμα", "Καλησπέρα"],
    title: "Έπιπλα για", titleSoft: "αργές ελληνικές μέρες.",
    lead: "Μασίφ ξύλο, φυσικό λινό και χειροποίητη ψάθα, από μικρά εργαστήρια στην Ελλάδα, φτιαγμένα για να περνούν από γενιά σε γενιά.",
    shop: "Δείτε τη συλλογή", story: "Η ιστορία μας",
    chips: ["Φτιαγμένο στην Ελλάδα", "Δωρεάν παράδοση άνω των 400 €", "Επιστροφές σε 30 μέρες"],
  },
  strip: ["Μασίφ δρυς & καρυδιά", "Χειροποίητη ψάθα", "Φυσικό λινό", "Φινίρισμα με λάδι", "Φτιαγμένα να κρατούν"],
  home: {
    catsEyebrow: "Οι χώροι", catsTitle: "Αγορές ανά χώρο.",
    featEyebrow: "Αγαπημένα", featTitle: "Κομμάτια που αγαπήθηκαν.", viewAll: "Όλα τα έπιπλα",
    whyEyebrow: "Γιατί Γιασεμί", whyTitle: "Φτιαγμένα αργά, με σκοπό.",
    why: [
      { t: "Μασίφ ξύλο, τίμιες ενώσεις", d: "Δρυς, καρυδιά και μελία, ενωμένα με χελιδονοουρές και εγκοπές, όχι με συρραπτικά." },
      { t: "Από ελληνικά εργαστήρια", d: "Κάθε κομμάτι φτιάχνεται σε μικρά οικογενειακά εργαστήρια στην Αττική και τη Θεσσαλία." },
      { t: "Παράδοση και συναρμολόγηση", d: "Δωρεάν παράδοση άνω των 400 €. Με την υπηρεσία white-glove το ανεβάζουμε και το στήνουμε." },
    ],
    stepsEyebrow: "Πώς λειτουργεί", stepsTitle: "Από το εργαστήριο\nστο σπίτι σας.",
    steps: [
      { t: "Επιλέγετε", d: "Διαλέξτε το κομμάτι και το φινίρισμα. Τα διαθέσιμα αποστέλλονται σε 3 εργάσιμες." },
      { t: "Φτιάχνεται για εσάς", d: "Τα κατά παραγγελία φτιάχνονται σε 3–6 εβδομάδες. Σας ενημερώνουμε σε κάθε στάδιο." },
      { t: "Παραδίδεται", d: "Η ομάδα μας σας καλεί για να κλείσετε την ώρα που σας βολεύει." },
      { t: "Ζει μαζί σας", d: "30 μέρες για να αλλάξετε γνώμη, 5 χρόνια εγγύηση σε κάθε σκελετό." },
    ],
    quote: "Μια καρέκλα πρέπει να είναι αρκετά ελαφριά για να τη φέρεις στο τραπέζι, και αρκετά γερή για τα εγγόνια.",
    quoteBy: "Εργαστήριο Γιασεμί",
    newsletterTitle: "Γράμματα από το εργαστήριο.",
    newsletterLead: "Νέα κομμάτια και καμιά ιστορία, τέσσερις φορές τον χρόνο. Χωρίς spam.",
    faqEyebrow: "Καλό να ξέρετε", faqTitle: "Συχνές ερωτήσεις.",
    faqs: [
      { q: "Πόσο κάνει η παράδοση;", a: "Τα διαθέσιμα κομμάτια φτάνουν σε 3–7 εργάσιμες. Τα κατά παραγγελία χρειάζονται 3–6 εβδομάδες· κάθε σελίδα προϊόντος δείχνει τον ακριβή χρόνο." },
      { q: "Παραδίδετε στα νησιά και στην Κύπρο;", a: "Ναι, σε όλη την Ελλάδα και την Κύπρο. Στα νησιά μπορεί να χρειαστούν λίγες μέρες ακόμη." },
      { q: "Μπορώ να επιστρέψω ένα έπιπλο;", a: "Ναι, μέσα σε 30 μέρες από την παράδοση, για οποιονδήποτε λόγο. Το παραλαμβάνουμε από το σπίτι σας." },
      { q: "Περιλαμβάνεται η συναρμολόγηση;", a: "Επιλέξτε παράδοση white-glove στην πληρωμή: το ανεβάζουμε, το στήνουμε και παίρνουμε τις συσκευασίες." },
      { q: "Πώς μπορώ να πληρώσω;", a: "Με κάρτα, Apple Pay ή Google Pay, μέσω της ασφαλούς πληρωμής της Stripe. Δεν βλέπουμε ποτέ τα στοιχεία της κάρτας σας." },
      { q: "Μπορώ να δω ένα ύφασμα πριν παραγγείλω;", a: "Γράψτε μας και θα σας στείλουμε δωρεάν δείγματα υφάσματος και ξύλου." },
    ],
    ctaTitle: "Δεν ξέρετε τι ταιριάζει;", ctaLead: "Στείλτε μας μια φωτογραφία του χώρου και τις διαστάσεις. Απαντάμε μέσα σε μία εργάσιμη.",
    ctaPrimary: "Γράψτε μας", ctaSecondary: "Παράδοση & επιστροφές",
    newsletterCta: "Εγγραφή", newsletterPlaceholder: "Το e-mail σας", newsletterThanks: "Ευχαριστούμε. Θα σας γράψουμε σύντομα.",
  },
  shop: {
    eyebrow: "Η συλλογή", title: "Κατάστημα", all: "Όλα", searchPlaceholder: "Αναζήτηση…", sort: "Ταξινόμηση",
    sorts: { featured: "Προτεινόμενα", "price-asc": "Τιμή: χαμηλή προς υψηλή", "price-desc": "Τιμή: υψηλή προς χαμηλή", new: "Νεότερα" },
    inStockOnly: "Άμεσα διαθέσιμα", results: (n: number) => `${n} ${n === 1 ? "κομμάτι" : "κομμάτια"}`,
    none: "Τίποτα δεν ταιριάζει με την αναζήτηση.", clear: "Καθαρισμός φίλτρων",
  },
  product: {
    from: "Από", finish: "Φινίρισμα", qty: "Ποσότητα", add: "Προσθήκη στο καλάθι", added: "Προστέθηκε", buyNow: "Αγορά τώρα",
    inStock: (n: number) => (n <= 3 ? `Μόνο ${n} διαθέσιμα, αποστολή σε 3 μέρες` : "Διαθέσιμο, αποστολή σε 3 μέρες"),
    madeToOrder: (w: number) => `Κατά παραγγελία, αποστολή σε ${w} εβδομάδες`,
    details: "Λεπτομέρειες", dimensions: "Διαστάσεις", materials: "Υλικά", care: "Φροντίδα", delivery: "Παράδοση & επιστροφές",
    deliveryText: "Δωρεάν τυπική παράδοση άνω των 400 € σε Ελλάδα και Κύπρο. Παράδοση white-glove με συναρμολόγηση διαθέσιμη στην πληρωμή. Επιστροφές σε 30 μέρες.",
    width: "Πλάτος", depth: "Βάθος", height: "Ύψος", weight: "Βάρος", view: "Προβολή", drawing: "Διαστάσεις",
    related: "Μπορεί επίσης να σας αρέσει", sale: "Προσφορά", new: "Νέο", save: "Αποθήκευση στα αγαπημένα", saved: "Αποθηκεύτηκε", vat: "Με ΦΠΑ",
    guarantee: "Εγγύηση σκελετού 5 ετών", secure: "Ασφαλής πληρωμή μέσω Stripe",
    freeDelivery: (x: string) => `Δωρεάν παράδοση άνω των ${x}`, returns: (d: number) => `Επιστροφές σε ${d} μέρες`,
  },
  cart: {
    title: "Το καλάθι σας", empty: "Το καλάθι σας είναι άδειο.", emptyLead: "Ρίξτε μια ματιά, κάποια καρέκλα σας περιμένει.", continue: "Συνέχεια αγορών",
    subtotal: "Υποσύνολο", shipping: "Παράδοση", free: "Δωρεάν", vat: "Περιλαμβάνει ΦΠΑ", total: "Εκτιμώμενο σύνολο", checkout: "Ολοκλήρωση αγοράς",
    remove: "Αφαίρεση", freeLeft: (x: string) => `Προσθέστε ακόμη ${x} για δωρεάν παράδοση.`, freeOk: "Έχετε δωρεάν τυπική παράδοση.",
    note: "Τον τρόπο παράδοσης και τους κωδικούς έκπτωσης τους επιλέγετε στο επόμενο βήμα.", viewCart: "Προβολή καλαθιού",
    lead: (w: number) => `Κάποια κομμάτια φτιάχνονται κατά παραγγελία. Η παραγγελία σας αποστέλλεται σε περίπου ${w} εβδομάδες.`,
    canceled: "Η πληρωμή ακυρώθηκε. Το καλάθι σας είναι ακόμη εδώ.", processing: "Μετάβαση στην ασφαλή πληρωμή…",
    errors: {
      not_configured: "Η ηλεκτρονική πληρωμή δεν έχει ενεργοποιηθεί ακόμη. Επικοινωνήστε μαζί μας για να παραγγείλετε.",
      out_of_stock: "Ένα από τα προϊόντα δεν έχει αρκετό απόθεμα. Μειώστε την ποσότητα.",
      generic: "Κάτι πήγε στραβά. Δοκιμάστε ξανά.",
    },
  },
  wishlist: { title: "Αγαπημένα", empty: "Δεν έχετε αποθηκεύσει τίποτα ακόμη.", lead: "Πατήστε την καρδιά σε οποιοδήποτε κομμάτι για να το κρατήσετε εδώ." },
  success: {
    title: "Ευχαριστούμε!", lead: "Η παραγγελία σας επιβεβαιώθηκε. Η απόδειξη έρχεται στο e-mail σας.", order: "Παραγγελία",
    next: "Θα σας καλέσουμε μέσα σε δύο εργάσιμες για να κανονίσουμε την παράδοση.", back: "Πίσω στο κατάστημα",
    pending: "Επιβεβαιώνουμε την πληρωμή σας. Θα λάβετε e-mail μόλις ολοκληρωθεί.",
    summary: "Σύνοψη παραγγελίας", paidWith: "Σύνολο πληρωμής",
  },
  footer: {
    note: "Χειροποίητα ελληνικά έπιπλα. Μασίφ ξύλο, φυσικά υλικά, φτιαγμένα να περνούν από γενιά σε γενιά.",
    shop: "Κατάστημα", help: "Βοήθεια", contact: "Επικοινωνία", privacy: "Απόρρητο", terms: "Όροι", rights: "Με την επιφύλαξη παντός δικαιώματος.",
    payments: "Ασφαλείς πληρωμές μέσω Stripe", testMode: "Δοκιμαστική λειτουργία: πληρώστε με κάρτα 4242 4242 4242 4242, οποιαδήποτε μελλοντική ημερομηνία και CVC.",
  },
  pages: {
    aboutTitle: "Η ιστορία μας",
    shippingTitle: "Παράδοση & επιστροφές",
    contactTitle: "Επικοινωνία",
    privacyTitle: "Πολιτική απορρήτου",
    termsTitle: "Όροι πώλησης",
    notFound: "Αυτή η σελίδα χάθηκε.", notFoundLead: "Ο σύνδεσμος μπορεί να είναι παλιός ή το κομμάτι να μην φτιάχνεται πια.",
  },
  toast: { added: "Προστέθηκε στο καλάθι", saved: "Αποθηκεύτηκε στα αγαπημένα", removed: "Αφαιρέθηκε από τα αγαπημένα" },
};

export const dictionaries: Record<Locale, Dict> = { en, el };
export const getDict = (l: Locale) => dictionaries[l];

export function formatPrice(cents: number, l: Locale) {
  return new Intl.NumberFormat(l === "el" ? "el-GR" : "en-IE", { style: "currency", currency: "EUR", minimumFractionDigits: cents % 100 ? 2 : 0, maximumFractionDigits: 2 }).format(cents / 100);
}
