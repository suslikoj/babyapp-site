// Guide (EN): categories and articles – English twin of content/pruvodce.mjs.
//
// Article text lives in content/en/guide/<slug>.md and matches the English text in the app (Storyblok, language=en).
// This file holds only the web layer: SEO title, description, H1, short answer and FAQ.
// `cs` = slug of the Czech twin (used for hreflang and the language switch).

const SB = 'https://a.storyblok.com/f/289317949964253';

export const categories = [
  {
    slug: 'food-allergy',
    cs: 'potravinova-alergie',
    title: 'Food allergy',
    seoTitle: 'Food Allergy in Babies and Children | Guide',
    description: 'How food allergy in babies develops and shows up, how IgE and non-IgE reactions differ, wheat vs. gluten and what cross-reactive allergies are.',
    intro: 'How food allergy develops, how to recognize it in a baby, and why fast and delayed reactions are spotted so differently.',
  },
  {
    slug: 'elimination-diet',
    cs: 'eliminacni-dieta',
    title: 'Elimination diet',
    seoTitle: 'Elimination Diet Step by Step | Guide',
    description: 'The elimination–challenge diet for breastfeeding moms and children: main suspects, complete elimination, allergen testing and training, low-risk foods.',
    intro: 'The elimination–challenge diet step by step – from the main suspects and complete elimination to allergen testing and training.',
  },
  {
    slug: 'eczema',
    cs: 'ekzem',
    title: 'Eczema',
    seoTitle: 'Eczema in Babies and Toddlers | Guide',
    description: 'Baby eczema explained: how to recognize it, what triggers it at different ages, yeast and eczema, itching and other skin rashes in babies.',
    intro: 'How to recognize eczema, what triggers it at different ages and how to ease the itch – and why not every baby rash is eczema.',
  },
  {
    slug: 'special-topics',
    cs: 'specificka-temata',
    title: 'Special topics',
    seoTitle: 'Histamine, Eczema Treatment and More | Guide',
    description: 'Histamine intolerance in children and an overview of medical eczema treatment – what creams, steroids and antihistamines do.',
    intro: 'Topics that often overlap with eczema and allergies – histamine intolerance and the medical options for treating eczema.',
  },
];

// Existing EN articles at their original URLs (built by scripts/build-articles.mjs) – shown as cards only.
export const legacyArticles = [
  { category: 'food-allergy', path: '/en/signs/', title: 'Signs of food allergy', description: 'How to recognize a food allergy in a baby: skin, stool, tummy, reflux and fast reactions.', order: 0 },
  { category: 'elimination-diet', path: '/en/main-suspects/', title: 'Main suspects', description: 'Phase 1 of the elimination diet: which foods to remove for 14 days and what to track.', order: 0 },
  { category: 'eczema', path: '/en/eczema/', title: 'Baby eczema', description: 'How to recognize baby eczema, why it develops and when to moisturize.', order: 0 },
];

export const articles = [
  // ── Food allergy ────────────────────────────────────────────────────
  {
    slug: 'how-food-allergy-develops',
    cs: 'jak-vznika-potravinova-alergie',
    published: '2026-01-06',
    category: 'food-allergy',
    title: 'How food allergy develops',
    seoTitle: 'How Does Food Allergy Develop in Babies and Children?',
    h1: 'How does food allergy develop in children?',
    description: 'Why a child’s immune system starts treating ordinary food as a threat: genetics, environment, the gut microbiome and skin damaged by eczema.',
    cover: `${SB}/3930x5390/51e62c9baa/cells.jpg`,
    coverAlt: 'Immune cells under a microscope',
    summary: 'A food allergy develops when a child’s immune system stops treating an ordinary food as safe – in medical terms, immune tolerance breaks down. Genetics, the modern environment, the gut microbiome, medication and stress all play a part, and in children with eczema so does contact with food through damaged skin.',
    faq: [
      { q: 'Is my child’s allergy the parents’ fault?', a: 'No. An allergy is the result of many factors that often can’t be fully controlled, and it can develop even when parents do everything “right”.' },
      { q: 'Is food allergy hereditary?', a: 'Genetics plays a role – if someone in the family has eczema, asthma or allergies, the child’s risk is higher. The environment, gut microbiome, medication and stress also contribute.' },
      { q: 'Why are babies with eczema more likely to develop food allergy?', a: 'Through a damaged skin barrier, a child can become sensitized to a food before ever eating it. When an allergen enters the body through the skin before the mouth, the risk of allergy is higher (the dual-allergen exposure hypothesis).' },
      { q: 'How can the risk of food allergy be reduced?', a: 'Early introduction of foods, so tolerance can form in the gut, and careful eczema care are recommended. A healthy diet, a low-toxin environment, enough sleep and wellbeing help too.' },
      { q: 'Can a food allergy go away?', a: 'Food allergies can be worked with today, and in many cases they can gradually fade – for example with structured <a href="/en/guide/elimination-diet/allergen-training/">allergen training</a>.' },
    ],
  },
  {
    slug: 'ige-vs-non-ige',
    cs: 'ige-a-non-ige',
    published: '2026-01-06',
    category: 'food-allergy',
    title: 'IgE vs. non-IgE allergy',
    seoTitle: 'IgE vs. Non-IgE Food Allergy: Fast and Delayed Reactions',
    h1: 'The difference between IgE and non-IgE food allergy',
    description: 'How fast IgE and delayed non-IgE food allergy differ in children: when they appear, typical symptoms, why tests are often negative and how breastfeeding changes things.',
    cover: `${SB}/4000x3000/c0cd7c1e3d/difference.jpg`,
    coverAlt: 'Aerial view of the border between sand and green vegetation',
    summary: 'IgE allergy shows up fast – within minutes to 1–2 hours of eating (hives, swelling, vomiting) and usually appears in tests. Non-IgE allergy comes 8 hours to several days later, mainly as eczema and digestive problems, and standard tests are often negative. Through breast milk, even an IgE allergy can look delayed.',
    faq: [
      { q: 'Why are allergy tests negative even though a food bothers my child?', a: 'In non-IgE allergy no IgE antibodies are produced, so blood and skin tests often show nothing. The key is an <a href="/en/main-suspects/">elimination diet</a> followed by a controlled challenge.' },
      { q: 'How long does it take for a food allergy reaction to appear?', a: 'IgE reactions appear within minutes to 1–2 hours of eating, non-IgE reactions 8 hours to several days later.' },
      { q: 'How does food allergy show up in a breastfed baby?', a: 'Allergens reach the baby through breast milk in small amounts and with a delay, so reactions come later and can look like non-IgE allergy even when they are IgE. Symptoms alone can’t reliably tell the type apart.' },
      { q: 'Can a child have both IgE and non-IgE allergy?', a: 'Yes. A child can react to the same food with both fast and delayed reactions, and the symptoms can change over time.' },
    ],
  },
  {
    slug: 'wheat-vs-gluten',
    cs: 'psenice-vs-lepek',
    published: '2026-01-06',
    category: 'food-allergy',
    title: 'Wheat vs. gluten',
    seoTitle: 'Wheat vs. Gluten: Allergy, Celiac Disease, Sensitivity',
    h1: 'Wheat vs. gluten: what is your child reacting to?',
    description: 'Wheat allergy, celiac disease and gluten sensitivity are not the same. How symptoms differ in children, how each is managed and why wheat allergy often fades.',
    cover: `${SB}/3872x2576/15a47fe79f/whey.jpg`,
    coverAlt: 'Loaves of bread and ears of wheat',
    summary: 'Wheat is the whole grain, gluten is just one group of its proteins (gliadins and glutenins). A child can therefore be allergic to wheat and tolerate gluten – or the other way round. Wheat allergy in children often fades, while celiac disease is a lifelong autoimmune condition that needs a strict gluten-free diet.',
    faq: [
      { q: 'Is wheat allergy the same as celiac disease?', a: 'No. Wheat allergy is an immune reaction to any wheat protein and often fades in children. Celiac disease is an autoimmune condition triggered by gliadin (part of gluten); it damages the gut lining and requires a strict lifelong gluten-free diet.' },
      { q: 'Can a child with wheat allergy eat rye or barley?', a: 'A child with wheat allergy often tolerates gluten-free grains (rice, corn, millet), but may also react to barley or rye because their proteins are similar.' },
      { q: 'What are the signs of wheat allergy in a baby?', a: 'For example redness around the mouth, eczema, hives, tummy pain, diarrhea or mucus in the stool, vomiting and restless nights. The most serious reaction is anaphylaxis.' },
      { q: 'When should wheat be introduced to a baby?', a: 'Introducing wheat between 4 and 6 months supports tolerance.' },
    ],
  },
  {
    slug: 'cross-reactive-allergies',
    cs: 'zkrizene-alergie',
    published: '2026-01-06',
    category: 'food-allergy',
    title: 'Cross-reactive allergies',
    seoTitle: 'Cross-Reactive Food Allergy in Children Explained',
    h1: 'Cross-reactive allergies in children',
    description: 'What a cross-reactive allergy is, why a child reacts to raw apple but tolerates baked apple, which allergens are stable and why not to cut foods based on tests alone.',
    cover: `${SB}/4004x2669/be8a445887/cross.jpg`,
    coverAlt: 'A raised hand above a blooming field',
    summary: 'A cross-reactive allergy happens when two foods have similar proteins and the immune system mixes them up. With fruit and vegetables, cooking often helps; with nuts, peanuts, seeds or shellfish it doesn’t. A positive test, however, doesn’t mean a real allergy.',
    faq: [
      { q: 'Why does raw apple bother my child but baked apple doesn’t?', a: 'Fruit and vegetable proteins are fragile and heat breaks them down. This is typical of pollen–food syndrome – raw apple makes the mouth itch, stewed apple is fine.' },
      { q: 'Should I remove every food that came up positive in a test?', a: 'No. A positive test only means the immune system “recognizes” the food. A real allergy is one that causes symptoms – removing whole food groups as a precaution needlessly costs your child nutrients and variety.' },
      { q: 'Which cross-reactive allergies are most common?', a: 'For example, tropomyosin links shrimp, lobster, crab and other shellfish, and parvalbumin links most sea and freshwater fish.' },
    ],
  },

  // ── Elimination diet ────────────────────────────────────────────────
  {
    slug: 'complete-elimination',
    cs: 'kompletni-vylouceni',
    published: '2025-12-26',
    category: 'elimination-diet',
    title: 'Complete elimination',
    seoTitle: 'Complete Elimination: Phase 2 of the Elimination Diet',
    h1: 'Phase 2 of the elimination diet: complete elimination',
    description: 'What to do when your baby doesn’t improve after phase 1 of the elimination diet: how long complete elimination lasts, what to eat and why to move straight to testing.',
    cover: `${SB}/6000x4000/82f0af7ecf/completediet.jpg`,
    coverAlt: 'Baskets of fresh vegetables – broccoli, zucchini and green beans',
    summary: 'Complete elimination follows when a child’s condition hasn’t improved after the first phase. It is the strictest phase but short – 4–5 days, 7 at most. Vegetables are the foundation, along with allowed fruit, meat and grains. Allergen testing follows straight after.',
    faq: [
      { q: 'How long does phase 2 of the elimination diet last?', a: '4–5 days, 7 days at most, never longer. Removing lots of foods long-term is not the goal and can be counterproductive.' },
      { q: 'What can you eat during complete elimination?', a: 'Mainly vegetables (leafy and green, broccoli, zucchini, pumpkin, potatoes), fruit such as apples, pears or apricots, meat such as rabbit, pork, lamb or duck, and grains such as rice, buckwheat, millet or corn. See <a href="/en/guide/elimination-diet/safe-foods/">Low-risk foods</a> for more.' },
      { q: 'What if there is no improvement even after complete elimination?', a: 'After a few days you start <a href="/en/guide/elimination-diet/allergen-testing/">allergen testing</a> anyway. Improvement may only come once the right foods are back – strict elimination does not continue.' },
      { q: 'Can I eat processed meats on an elimination diet?', a: 'Not in this phase – they often contain additives that can make eczema worse. Home-roasted meat is a better choice.' },
    ],
  },
  {
    slug: 'allergen-testing',
    cs: 'testovani-alergenu',
    published: '2025-12-27',
    category: 'elimination-diet',
    title: 'Allergen testing',
    seoTitle: 'Allergen Testing: How to Reintroduce Foods After Elimination',
    h1: 'Allergen testing after an elimination diet',
    description: 'How to bring allergens back after an elimination diet: when to start, how long to test each allergen, testing through breast milk and what to do if there is a reaction.',
    cover: `${SB}/3888x2592/5824dd3bce/test.jpg`,
    coverAlt: 'Someone tasting a slice of lemon',
    summary: 'Allergen testing mainly finds out what no longer bothers your child. Allergens are tried one at a time, usually over 3 days with an increasing dose. If you breastfeed, you test through breast milk first. Testing is worth repeating every 2–3 months.',
    faq: [
      { q: 'How long should one allergen be tested?', a: 'Usually 3 days: a smaller dose on day 1, a larger one on day 2 and a full portion on day 3. With babies and sensitive children you start with a very small amount – sometimes just a taste.' },
      { q: 'How long does a reaction through breast milk take to appear?', a: 'Often 12–24 hours, sometimes longer. That’s why testing needs enough time and conclusions shouldn’t be rushed.' },
      { q: 'What if an allergen doesn’t pass?', a: 'Stop testing straight away, wait until the condition returns to where it was (usually 1–3 days) and only then continue with the next allergen.' },
      { q: 'When should testing be repeated?', a: 'Every 2–3 months. An allergen that didn’t pass before often starts to pass – at least in some form, for example cooked.' },
    ],
  },
  {
    slug: 'allergen-training',
    cs: 'trenink-alergenu',
    published: '2025-12-27',
    category: 'elimination-diet',
    title: 'Allergen training',
    seoTitle: 'Allergen Training: How to Build Tolerance in Children',
    h1: 'Allergen training: the path to tolerance',
    description: 'How to give an allergen in small, regular doses so your child’s body builds tolerance. When to start training, how often and when it isn’t suitable.',
    cover: `${SB}/6016x4016/7d7f18b690/train.jpg`,
    coverAlt: 'A smiling boy flexing his muscles',
    summary: 'In training, an allergen isn’t removed completely but given in small, regular doses that don’t make things worse. It starts only after testing, at least once every 14 days, and the dose is increased slowly. With strong, fast reactions training isn’t suitable and belongs under an allergist’s care.',
    faq: [
      { q: 'How often should the allergen be given during training?', a: 'At least once every 14 days and at most as much as your child manages without a reaction.' },
      { q: 'When is allergen training not suitable?', a: 'With strong, fast reactions such as breathing difficulties or anaphylaxis. These situations need an allergist’s guidance.' },
      { q: 'Why not just avoid the allergen completely?', a: 'Long-term avoidance with no reintroduction doesn’t lead to recovery, can increase sensitivity and needlessly limits the diet. Controlled contact with the allergen teaches the immune system tolerance.' },
    ],
  },
  {
    slug: 'non-food-triggers',
    cs: 'nepotravinove-vlivy',
    published: '2026-04-09',
    category: 'elimination-diet',
    title: 'Non-food triggers',
    seoTitle: 'What Makes Eczema Worse Besides Food: Teething, Illness',
    h1: 'Non-food influences on eczema and allergies',
    description: 'Teething, illness, vaccination, weather, sweating and tiredness can all worsen a baby’s eczema. How to tell them apart from a food reaction during an elimination diet.',
    cover: `${SB}/6000x3375/8aa1d51e29/storm.jpg`,
    coverAlt: 'Storm clouds with lightning',
    summary: 'It isn’t only food that makes eczema worse in children. Teething, illness, vaccination, weather, sweating, the environment and tiredness are common triggers. A typical food reaction settles 2–3 days after the allergen is removed – if a flare lasts longer or fluctuates, the cause is more likely outside the diet.',
    faq: [
      { q: 'Can teething make eczema worse?', a: 'Yes, it is one of the most common causes of a sudden flare. The skin, especially on the cheeks, tends to be dry, red and warm, and eczema can react days or even weeks before a tooth comes through.' },
      { q: 'How can I tell whether food or something else made the eczema worse?', a: 'With a food reaction, the skin returns to its previous state within 2–3 days of removing the allergen. If the flare lasts longer or fluctuates, a non-food influence is more likely.' },
      { q: 'Why is eczema worse in the evening?', a: 'Skin naturally fluctuates during the day – calmer in the morning, more pronounced in the evening, before sleep and when tired. It’s best to check the skin at the same time each day.' },
      { q: 'Should food testing stop during a flare?', a: 'Usually not. The reaction may look stronger, but a long break slows the whole process down unnecessarily.' },
    ],
  },
  {
    slug: 'safe-foods',
    cs: 'bezpecne-potraviny',
    published: '2025-12-26',
    category: 'elimination-diet',
    title: 'Low-risk foods',
    seoTitle: 'Low-Risk Foods on an Elimination Diet: What to Eat',
    h1: 'Low-risk foods: what to eat on an elimination diet',
    description: 'Foods with low allergenic potential for an elimination diet while breastfeeding or for children: vegetables, fruit, meat, grains and drinks.',
    cover: `${SB}/5184x3456/6b8091d59a/bezpecne.jpg`,
    coverAlt: 'Empty plates and bowls ready for a meal',
    summary: 'There is still plenty to cook on an elimination diet. Most vegetables (especially cooked), fruit such as apples and pears, meat such as pork, rabbit or lamb, and grains such as rice, buckwheat or millet have a low allergenic potential. The goal is variety, not a handful of “safe bets”.',
    faq: [
      { q: 'What can I eat on an elimination diet?', a: 'Vegetables are the foundation, plus fruit, meat and grains with a low allergenic potential. Most foods are better tolerated cooked than raw.' },
      { q: 'Which meat is usually well tolerated with allergies?', a: 'Pork, rabbit, lamb and mutton, game, goose and duck. Processed meats are not low-risk foods.' },
      { q: 'What can I drink on an elimination diet?', a: 'Water, weak herbal teas (fennel, caraway, linden, elderflower), rooibos or weak green or black tea.' },
      { q: 'How long should I stay on a restricted diet?', a: 'As short a time as possible. Staying on a very limited diet for long can lead to nutritional gaps, an upset microbiome and returning symptoms – the goal is a varied diet again.' },
    ],
  },

  // ── Eczema ──────────────────────────────────────────────────────────
  {
    slug: 'eczema-triggers',
    cs: 'spoustece-ekzemu',
    published: '2026-01-06',
    category: 'eczema',
    title: 'Eczema triggers',
    seoTitle: 'Atopic Eczema Triggers in Children by Age',
    h1: 'Triggers of atopic eczema during childhood',
    description: 'What triggers atopic eczema in babies, toddlers and preschoolers and how it relates to the atopic march. Why triggers change with age and how to influence them.',
    cover: `${SB}/6048x4024/1a3cfe4cd3/sneeze.jpg`,
    coverAlt: 'A little girl in a winter coat wiping her nose',
    summary: 'Atopic eczema triggers change with age. In babies under one, diet and an immature immune system play the main role; in toddlers, a mix of diet and environment; in preschoolers, the environment and airways; and in older children, stress. The atopic march is a common pattern, not destiny.',
    faq: [
      { q: 'What is the atopic march?', a: 'A typical sequence of atopic conditions: food allergies often in infancy, allergic rhinitis in the toddler and preschool years and, in some children, asthma later. It is not an inevitable scenario.' },
      { q: 'What most often triggers eczema in babies?', a: 'Food allergens (through breast milk or in solids), an immature gut microbiome, illness, vaccination, teething and household chemicals.' },
      { q: 'Can the atopic march be stopped?', a: 'Its course can be strongly influenced. An elimination–challenge diet, gradual reintroduction of allergens, fewer chemicals at home and support for the gut and immune system all help.' },
    ],
  },
  {
    slug: 'yeast-and-eczema',
    cs: 'kvasinka-a-ekzem',
    published: '2026-01-06',
    category: 'eczema',
    title: 'Yeast vs. eczema',
    seoTitle: 'Yeast and Eczema in Children: Is Candida to Blame?',
    h1: 'Yeast vs. eczema: who is to blame?',
    description: 'Does yeast (Candida) cause eczema in children? Why it’s more about an unbalanced microbiome, why extreme diets don’t help and what really makes sense.',
    cover: `${SB}/9216x6912/89c0954f36/candida.jpg`,
    coverAlt: 'Illustration of microorganisms under a microscope',
    summary: 'Yeast alone doesn’t cause eczema. It is a normal part of the microbiome, and problems only start when the balance of skin and gut is disturbed – inflamed skin is an ideal environment for it. Instead of extreme diets, cut out simple sugars, keep complex carbohydrates and support the microbiome.',
    faq: [
      { q: 'Does yeast cause eczema?', a: 'No. Yeast (most often Candida) can settle more easily in inflamed skin and slow healing, but it doesn’t create eczema itself. It is a sign of imbalance, not the cause.' },
      { q: 'Does a no-carb diet help against yeast?', a: 'Extreme “anti-yeast” diets can do more harm than good – in breastfeeding moms through exhaustion or reduced milk supply, in children by depleting the microbiome. The basis is cutting out simple sugars, not all carbohydrates.' },
      { q: 'What does eczema with yeast look like?', a: 'It often gets worse in skin folds, the redness doesn’t respond to usual care and the problems keep coming back.' },
    ],
  },
  {
    slug: 'eczema-itching',
    cs: 'svedeni-u-ekzemu',
    published: '2026-01-06',
    category: 'eczema',
    title: 'Eczema itching',
    seoTitle: 'Eczema Itching in Babies: What Helps Day and Night',
    h1: 'Itching in eczema: what helps during the day and at night',
    description: 'How to relieve eczema itching in a baby or toddler: wet wraps, zinc ointments, caring for scratched skin and tips for calmer nights.',
    cover: `${SB}/1920x2880/ab0d41b9f6/itchy.jpg`,
    coverAlt: 'A baby’s hand on soft skin',
    summary: 'Itching isn’t naughtiness but the body’s natural response to inflammation. During the day, distraction, zinc ointments and wet wraps help; at night, co-sleeping, breastfeeding, covered hands and a cooler room. When the itching doesn’t ease, it’s time to look for the cause.',
    faq: [
      { q: 'Why is eczema itchier at night?', a: 'Cortisol levels drop at night and itching often gets much worse.' },
      { q: 'What helps eczema itching in a baby?', a: 'A thin layer of zinc ointment, wet wraps with lukewarm agrimony or chamomile tea for 5–10 minutes, distraction and, at night, covered hands (cotton mittens or special eczema clothing).' },
      { q: 'Should I stop my child from scratching?', a: 'No. Forbidding it raises stress and often makes the reaction stronger. It’s better to redirect – with play, cuddles or gently holding the hands.' },
      { q: 'How do I care for scratched eczema?', a: 'Gently clean and disinfect the area; dragon’s blood can be used to support healing. The key is preventing infection.' },
    ],
  },
  {
    slug: 'baby-skin-rashes',
    cs: 'kozni-projevy-u-miminek',
    published: '2026-01-06',
    category: 'eczema',
    title: 'Baby skin rashes',
    seoTitle: 'Baby Rash: Eczema, Diaper Rash or Cradle Cap?',
    h1: 'Different skin rashes in babies: not everything is eczema',
    description: 'Diaper rash, impetigo, cradle cap (seborrhoea) and contact reactions: how to tell them apart from atopic eczema in a baby and when to look for a deeper cause.',
    cover: `${SB}/3368x6000/2129807224/dermatic.jpg`,
    coverAlt: 'Abstract pink and white texture resembling skin',
    summary: 'Not every red patch is atopic eczema. Babies often get diaper rash, seborrheic dermatitis (cradle cap), contact reactions or bacterial impetigo. If the rash keeps coming back, doesn’t respond to usual care or comes with diarrhea or restlessness, it’s worth looking for a deeper cause.',
    faq: [
      { q: 'How can I tell cradle cap from eczema?', a: 'Seborrhea (cradle cap) shows as greasy, yellowish scales mainly on the scalp, eyebrows and behind the ears and usually doesn’t itch much. In some children, however, it can later turn into atopic eczema.' },
      { q: 'What is impetigo and when should I see a doctor?', a: 'A superficial bacterial skin infection with weeping patches and yellow to honey-colored crusts that spreads quickly. If you suspect it, see your pediatrician or a dermatologist – they will take a swab and decide on treatment.' },
      { q: 'Why does diaper rash keep coming back?', a: 'Recurring or slow-healing diaper rash can point to an overloaded gut, a reaction to something in the diet (allergy) or a reaction to antibiotics.' },
      { q: 'Should I start an elimination diet as soon as a rash appears?', a: 'No. The first step is simple, natural food and a calmer environment (household chemicals, cosmetics, detergents). An elimination–challenge diet makes sense when the rash keeps coming back, persists or other problems appear.' },
    ],
  },

  // ── Special topics ──────────────────────────────────────────────────
  {
    slug: 'histamine-intolerance',
    cs: 'histaminova-intolerance',
    published: '2026-01-06',
    category: 'special-topics',
    title: 'Histamine intolerance',
    seoTitle: 'Histamine Intolerance in Children: Symptoms and Foods',
    h1: 'Histamine intolerance: symptoms and how to manage it',
    description: 'What histamine intolerance is, how it relates to eczema and allergy in children, its symptoms and which foods are high or low in histamine.',
    cover: `${SB}/3840x5760/eb58a6e32b/histamin.jpg`,
    coverAlt: 'Jars of fermented vegetables and pickled foods',
    summary: 'Histamine intolerance (HIT) isn’t an allergy but an imbalance between histamine intake and breakdown. It is more common in children with eczema and food allergy. It shows on the skin, in digestion, sleep and breathing, and a simple anti-inflammatory diet, limiting the biggest histamine sources and supporting the gut all help.',
    faq: [
      { q: 'Is histamine intolerance an allergy?', a: 'No. It’s a state in which the body can’t break down enough histamine from food and inflammatory reactions. An allergic reaction itself raises histamine levels, though, so a child may react to higher-histamine foods without true histamine intolerance.' },
      { q: 'Which foods are high in histamine?', a: 'For example fermented foods (kefir, yogurt, sauerkraut), processed meats, fish that isn’t very fresh, tomatoes, spinach, citrus, strawberries, chocolate, cocoa and long-simmered broths.' },
      { q: 'How quickly does histamine cause symptoms?', a: 'Acutely within 30–60 minutes of eating, delayed within 6–24 hours, and as an overall load up to 48 hours later.' },
      { q: 'How long does improvement take?', a: 'First changes usually come within 1–2 weeks, stabilization within 4–6 weeks, clear improvement within 3–6 months and restored tolerance within 6–12 months. Children improve faster than adults.' },
    ],
  },
  {
    slug: 'doctors-and-eczema',
    cs: 'lekari-a-ekzem',
    published: '2026-02-28',
    category: 'special-topics',
    title: 'Doctors and eczema',
    seoTitle: 'Eczema Treatment for Children: Creams, Steroids and More',
    h1: 'Doctors and eczema: which treatments are used',
    description: 'How doctors treat eczema in babies and children: moisturising, steroid creams, immunomodulating creams, antihistamines and antibiotics. What they do and where their limits are.',
    cover: `${SB}/3500x2333/d2ca88ac0b/doctor.jpg`,
    coverAlt: 'A doctor holding a heart-shaped stethoscope',
    summary: 'Medical eczema treatment aims to calm the acute flare: moisturising, steroid creams, immunomodulating creams, antihistamines and, with infection, antibiotics. They bring relief but usually don’t address the cause of eczema on their own – which is why it makes sense to look at why the body reacts as well.',
    faq: [
      { q: 'What do steroid creams do for eczema?', a: 'They quickly suppress inflammation, redness and itching. They don’t address the cause, though, and eczema often returns once they are stopped. Long-term or frequent use risks thinner skin, more infections and the skin gradually “getting used” to them.' },
      { q: 'When should eczema be moisturized?', a: 'Once the inflammation has settled and the skin is dry, flaky or cracked. Red, inflamed or weeping eczema needs to be calmed and dried first.' },
      { q: 'Do antihistamines help eczema itching?', a: 'They can bring short-term relief, especially when itching disrupts sleep. They don’t treat the inflammation or the cause of eczema.' },
    ],
  },
];

export function categoryPath(slug) {
  return `/en/guide/${slug}/`;
}

export function articlePath(article) {
  return `/en/guide/${article.category}/${article.slug}/`;
}

export function categoryItems(categorySlug) {
  const legacy = legacyArticles.filter((a) => a.category === categorySlug).map((a) => ({ ...a, href: a.path }));
  const fresh = articles.filter((a) => a.category === categorySlug).map((a) => ({ ...a, href: articlePath(a) }));
  return [...legacy, ...fresh];
}
