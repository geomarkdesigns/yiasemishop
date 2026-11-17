// Long-form copy for the information pages. Each section: [heading, paragraphs...]
// NOTE: privacy & terms are a starting template. Fill in the company details marked [ ] and have them checked by a lawyer/accountant.
import type { Locale } from "./products.ts";
import { site } from "./site.ts";

type Page = { lead: string; sections: [string, ...string[]][] };
const eur = (c: number) => `€${c / 100}`;

export const pages: Record<"about" | "delivery" | "privacy" | "terms", Record<Locale, Page>> = {
  about: {
    en: {
      lead: "Yiasemi means jasmine, the flower that climbs the courtyard walls of Greek homes and scents the evenings. Our furniture is made in the same spirit: simple, generous and meant to be lived with.",
      sections: [
        ["Made in Greece", "Every piece is made by small family workshops in Attica and Thessaly, many of them run by the second or third generation of carpenters and upholsterers.", "We work with solid oak, walnut and ash, natural linen and hand-woven paper rush. No chipboard frames, no staples where a joint should be."],
        ["Built to be handed down", "We design for decades, not seasons. Covers come off to be cleaned or replaced, oil finishes can be refreshed at home, and every frame carries a five-year guarantee.", "If something breaks, write to us. We keep spare parts and will repair before we replace."],
        ["Slow by design", "Many pieces are made to order. It takes a little longer, but it means nothing sits in a warehouse and every finish is made for you."],
      ],
    },
    el: {
      lead: "Γιασεμί: το λουλούδι που σκαρφαλώνει στους τοίχους των αυλών και μοσχοβολά τα βράδια. Τα έπιπλά μας φτιάχνονται με το ίδιο πνεύμα: απλά, γενναιόδωρα, φτιαγμένα για να ζεις μαζί τους.",
      sections: [
        ["Φτιαγμένα στην Ελλάδα", "Κάθε κομμάτι φτιάχνεται σε μικρά οικογενειακά εργαστήρια στην Αττική και τη Θεσσαλία, πολλά από τα οποία τα δουλεύει η δεύτερη ή τρίτη γενιά μαστόρων.", "Δουλεύουμε με μασίφ δρυ, καρυδιά και μελία, φυσικό λινό και χειροποίητη ψάθα. Χωρίς σκελετούς από νοβοπάν, χωρίς συρραπτικά εκεί που χρειάζεται σωστή ένωση."],
        ["Για να περνούν από γενιά σε γενιά", "Σχεδιάζουμε για δεκαετίες, όχι για εποχές. Τα καλύμματα βγαίνουν για καθάρισμα ή αλλαγή, τα φινιρίσματα με λάδι ανανεώνονται στο σπίτι και κάθε σκελετός έχει εγγύηση πέντε ετών.", "Αν κάτι χαλάσει, γράψτε μας. Κρατάμε ανταλλακτικά και επισκευάζουμε πριν αντικαταστήσουμε."],
        ["Αργά, με σκοπό", "Πολλά κομμάτια φτιάχνονται κατά παραγγελία. Παίρνει λίγο περισσότερο χρόνο, αλλά έτσι τίποτα δεν περιμένει σε αποθήκη και κάθε φινίρισμα φτιάχνεται για εσάς."],
      ],
    },
  },
  delivery: {
    en: {
      lead: `We deliver across mainland Greece, the islands and Cyprus. Standard delivery is free on orders over ${eur(site.freeShippingFrom)}.`,
      sections: [
        ["Delivery options", `Standard delivery: ${eur(site.standardShipping)}, free over ${eur(site.freeShippingFrom)}. Delivered to your door (ground floor or lift).`, `White-glove delivery: ${eur(site.whiteGloveShipping)}. Two people carry the piece to the room of your choice, assemble it and take the packaging away.`, "You choose the option at checkout."],
        ["Timing", "Pieces in stock leave our workshop within 3 working days and usually arrive within 3–7 working days. Islands and Cyprus may take a few days longer.", "Made-to-order pieces take 3–6 weeks to make; the exact time is shown on each product. We e-mail you when production starts and when your order is ready."],
        ["Booking the delivery", "Our delivery partner calls you to agree a day and time window. Please check that the piece fits through doors and stairways using the dimensions on the product page."],
        ["Returns", `You have ${site.returnDays} days from delivery to return any piece in its original condition, for any reason. This is in addition to your 14-day legal right of withdrawal.`, "Write to us to arrange a collection. Return collection costs the same as standard delivery and is deducted from the refund; it is free if the piece arrived damaged.", "Refunds are made to the original payment method within 14 days of collection."],
        ["Damage and guarantee", "Please check your piece on delivery and send us photos of any damage within 48 hours. We will repair or replace it at no cost.", "Every frame has a five-year guarantee against defects in materials and workmanship."],
      ],
    },
    el: {
      lead: `Παραδίδουμε σε όλη την ηπειρωτική Ελλάδα, τα νησιά και την Κύπρο. Η τυπική παράδοση είναι δωρεάν για παραγγελίες άνω των ${eur(site.freeShippingFrom)}.`,
      sections: [
        ["Τρόποι παράδοσης", `Τυπική παράδοση: ${eur(site.standardShipping)}, δωρεάν άνω των ${eur(site.freeShippingFrom)}. Παράδοση στην πόρτα σας (ισόγειο ή με ανελκυστήρα).`, `Παράδοση white-glove: ${eur(site.whiteGloveShipping)}. Δύο άτομα μεταφέρουν το έπιπλο στο δωμάτιο που θέλετε, το συναρμολογούν και παίρνουν τις συσκευασίες.`, "Επιλέγετε τον τρόπο κατά την πληρωμή."],
        ["Χρόνοι", "Τα διαθέσιμα κομμάτια φεύγουν από το εργαστήριο σε 3 εργάσιμες και συνήθως φτάνουν σε 3–7 εργάσιμες. Τα νησιά και η Κύπρος μπορεί να χρειαστούν λίγες μέρες ακόμη.", "Τα κατά παραγγελία κομμάτια χρειάζονται 3–6 εβδομάδες· ο ακριβής χρόνος φαίνεται σε κάθε προϊόν. Σας ενημερώνουμε με e-mail όταν ξεκινά η κατασκευή και όταν η παραγγελία είναι έτοιμη."],
        ["Ραντεβού παράδοσης", "Ο συνεργάτης μας σας καλεί για να κλείσετε μέρα και ώρα. Ελέγξτε ότι το έπιπλο χωράει από πόρτες και σκάλες με βάση τις διαστάσεις στη σελίδα του προϊόντος."],
        ["Επιστροφές", `Έχετε ${site.returnDays} μέρες από την παράδοση για να επιστρέψετε οποιοδήποτε κομμάτι στην αρχική του κατάσταση, για οποιονδήποτε λόγο. Αυτό ισχύει επιπλέον του νόμιμου δικαιώματος υπαναχώρησης 14 ημερών.`, "Γράψτε μας για να κανονίσουμε την παραλαβή. Το κόστος παραλαβής είναι ίδιο με την τυπική παράδοση και αφαιρείται από την επιστροφή χρημάτων· είναι δωρεάν αν το έπιπλο έφτασε κατεστραμμένο.", "Η επιστροφή χρημάτων γίνεται στον ίδιο τρόπο πληρωμής μέσα σε 14 μέρες από την παραλαβή."],
        ["Ζημιές και εγγύηση", "Ελέγξτε το έπιπλο κατά την παράδοση και στείλτε μας φωτογραφίες από τυχόν ζημιά μέσα σε 48 ώρες. Θα το επισκευάσουμε ή θα το αντικαταστήσουμε χωρίς χρέωση.", "Κάθε σκελετός έχει εγγύηση πέντε ετών για ελαττώματα υλικών και κατασκευής."],
      ],
    },
  },
  privacy: {
    en: {
      lead: "We collect only what we need to deliver your order and answer your messages.",
      sections: [
        ["Who we are", "[Company name], [address], VAT no. [ΑΦΜ], is the controller of your personal data. Contact: " + site.email + "."],
        ["What we collect", "When you order: your name, e-mail, phone, delivery and billing address and the items you bought. Card details are entered on Stripe's secure page and never reach our servers.", "When you write to us: your name, e-mail and message."],
        ["Why", "To process and deliver your order, to provide after-sales service and to meet our tax obligations (legal basis: contract and legal obligation)."],
        ["Who we share it with", "Stripe (payments), our delivery partners (name, phone, address) and our hosting provider. We never sell your data."],
        ["Storage on your device", "Your cart, wishlist, language and theme preference are stored in your own browser (local storage and a language cookie). We do not use advertising or tracking cookies."],
        ["Your rights", "You can ask to access, correct or delete your data at any time by e-mailing us. You can also complain to the Hellenic Data Protection Authority (dpa.gr)."],
      ],
    },
    el: {
      lead: "Συλλέγουμε μόνο ό,τι χρειαζόμαστε για να παραδώσουμε την παραγγελία σας και να απαντήσουμε στα μηνύματά σας.",
      sections: [
        ["Ποιοι είμαστε", "[Επωνυμία], [διεύθυνση], ΑΦΜ [ ], είναι ο υπεύθυνος επεξεργασίας των προσωπικών σας δεδομένων. Επικοινωνία: " + site.email + "."],
        ["Τι συλλέγουμε", "Όταν παραγγέλνετε: όνομα, e-mail, τηλέφωνο, διεύθυνση παράδοσης και χρέωσης και τα προϊόντα που αγοράσατε. Τα στοιχεία της κάρτας καταχωρούνται στην ασφαλή σελίδα της Stripe και δεν φτάνουν ποτέ στους διακομιστές μας.", "Όταν μας γράφετε: όνομα, e-mail και μήνυμα."],
        ["Γιατί", "Για την εκτέλεση και παράδοση της παραγγελίας, την εξυπηρέτηση μετά την πώληση και τις φορολογικές μας υποχρεώσεις (νομική βάση: σύμβαση και νομική υποχρέωση)."],
        ["Με ποιους τα μοιραζόμαστε", "Stripe (πληρωμές), συνεργάτες μεταφοράς (όνομα, τηλέφωνο, διεύθυνση) και τον πάροχο φιλοξενίας. Δεν πουλάμε ποτέ τα δεδομένα σας."],
        ["Αποθήκευση στη συσκευή σας", "Το καλάθι, τα αγαπημένα, η γλώσσα και το θέμα αποθηκεύονται στον δικό σας browser (local storage και ένα cookie γλώσσας). Δεν χρησιμοποιούμε cookies διαφήμισης ή παρακολούθησης."],
        ["Τα δικαιώματά σας", "Μπορείτε να ζητήσετε πρόσβαση, διόρθωση ή διαγραφή των δεδομένων σας οποιαδήποτε στιγμή με e-mail. Μπορείτε επίσης να υποβάλετε καταγγελία στην Αρχή Προστασίας Δεδομένων (dpa.gr)."],
      ],
    },
  },
  terms: {
    en: {
      lead: "These terms apply to every order placed on this website.",
      sections: [
        ["Seller", "[Company name], [address], VAT no. [ΑΦΜ], G.E.MI. no. [ ]. E-mail " + site.email + ", phone " + site.phone + "."],
        ["Prices", "Prices are in euro and include VAT at 24%. Delivery is shown separately at checkout. We reserve the right to correct obvious pricing errors before dispatch; if this happens we will contact you and you may cancel at no cost."],
        ["Orders and payment", "Your order is confirmed when payment succeeds and you receive our confirmation e-mail. Payments are processed securely by Stripe. We accept the cards and wallets shown at checkout."],
        ["Delivery", "Delivery times and costs are described on the Delivery & returns page. Risk passes to you on delivery."],
        ["Right of withdrawal", `You may withdraw from the purchase within 14 days of delivery without giving a reason (Law 2251/1994 and Directive 2011/83/EU). We extend this to ${site.returnDays} days. Made-to-order pieces in a standard finish from our catalogue are covered too.`],
        ["Guarantee", "All products carry the legal guarantee of conformity, plus our five-year guarantee on frames."],
        ["Disputes", "These terms are governed by Greek law. You may also use the EU Online Dispute Resolution platform (ec.europa.eu/odr)."],
      ],
    },
    el: {
      lead: "Οι παρόντες όροι ισχύουν για κάθε παραγγελία μέσω του ιστότοπου.",
      sections: [
        ["Πωλητής", "[Επωνυμία], [διεύθυνση], ΑΦΜ [ ], αρ. Γ.Ε.ΜΗ. [ ]. E-mail " + site.email + ", τηλέφωνο " + site.phone + "."],
        ["Τιμές", "Οι τιμές είναι σε ευρώ και περιλαμβάνουν ΦΠΑ 24%. Το κόστος παράδοσης εμφανίζεται χωριστά στην πληρωμή. Διατηρούμε το δικαίωμα διόρθωσης προφανών λαθών τιμής πριν την αποστολή· σε αυτή την περίπτωση θα επικοινωνήσουμε μαζί σας και μπορείτε να ακυρώσετε χωρίς κόστος."],
        ["Παραγγελία και πληρωμή", "Η παραγγελία επιβεβαιώνεται όταν ολοκληρωθεί η πληρωμή και λάβετε το e-mail επιβεβαίωσης. Οι πληρωμές γίνονται με ασφάλεια μέσω Stripe. Δεχόμαστε τις κάρτες και τα πορτοφόλια που εμφανίζονται στην πληρωμή."],
        ["Παράδοση", "Οι χρόνοι και τα κόστη περιγράφονται στη σελίδα Παράδοση & επιστροφές. Ο κίνδυνος μεταβιβάζεται σε εσάς με την παράδοση."],
        ["Δικαίωμα υπαναχώρησης", `Μπορείτε να υπαναχωρήσετε από την αγορά μέσα σε 14 μέρες από την παράδοση χωρίς αιτιολογία (Ν. 2251/1994 και Οδηγία 2011/83/ΕΕ). Εμείς το επεκτείνουμε στις ${site.returnDays} μέρες. Καλύπτονται και τα κατά παραγγελία κομμάτια σε τυπικό φινίρισμα του καταλόγου μας.`],
        ["Εγγύηση", "Όλα τα προϊόντα έχουν τη νόμιμη εγγύηση συμμόρφωσης, καθώς και την εγγύηση πέντε ετών για τους σκελετούς."],
        ["Διαφορές", "Οι όροι διέπονται από το ελληνικό δίκαιο. Μπορείτε επίσης να χρησιμοποιήσετε την πλατφόρμα Ηλεκτρονικής Επίλυσης Διαφορών της ΕΕ (ec.europa.eu/odr)."],
      ],
    },
  },
};
