// Průvodce (CZ): kategorie a články.
//
// Text článků je v content/cz/pruvodce/<slug>.md a odpovídá textu v aplikaci (Storyblok).
// Tady je jen „webová vrstva“: titulek pro Google, popis, H1, krátká odpověď a časté otázky.
// Odpovědi v FAQ jsou poskládané z textu článku – nová odborná tvrzení sem nepatří.

const SB = 'https://a.storyblok.com/f/289317949964253';

export const categories = [
  {
    slug: 'potravinova-alergie',
    title: 'Potravinová alergie',
    seoTitle: 'Potravinová alergie u miminek a dětí | Průvodce',
    description: 'Jak potravinová alergie u dětí vzniká, jak se projevuje, čím se liší IgE a non-IgE reakce, pšenice od lepku a co jsou zkřížené alergie.',
    intro: 'Jak alergie na potraviny vzniká, jak ji u miminka poznat a proč se rychlé a opožděné reakce rozpoznávají tak odlišně.',
  },
  {
    slug: 'eliminacni-dieta',
    title: 'Eliminační dieta',
    seoTitle: 'Eliminační dieta krok za krokem | Průvodce',
    description: 'Eliminačně-expoziční dieta při kojení i u dětí: hlavní podezřelí, kompletní vyloučení, testování a trénink alergenů, bezpečné potraviny.',
    intro: 'Eliminačně-expoziční dieta krok za krokem – od hlavních podezřelých přes kompletní vyloučení až po testování a trénink alergenů.',
  },
  {
    slug: 'ekzem',
    title: 'Ekzém',
    seoTitle: 'Ekzém u miminka a batolete | Průvodce',
    description: 'Ekzém u dětí srozumitelně: jak ho poznat, co ho spouští v různém věku, kvasinka a ekzém, svědění a další kožní projevy u miminek.',
    intro: 'Jak ekzém poznat, co ho spouští v různém věku a jak ulevit od svědění – a proč ne každá vyrážka u miminka je ekzém.',
  },
  {
    slug: 'specificka-temata',
    title: 'Specifická témata',
    seoTitle: 'Histamin, léčba ekzému a další témata | Průvodce',
    description: 'Histaminová intolerance u dětí a přehled lékařských cest při léčbě ekzému – co dělají masti, kortikoidy a antihistaminika.',
    intro: 'Témata, která se s ekzémem a alergiemi často prolínají – histaminová intolerance a lékařské možnosti léčby ekzému.',
  },
];

// Stávající články na původních adresách (generuje je scripts/build-articles.mjs) – v průvodci jen jako karty.
export const legacyArticles = [
  { category: 'potravinova-alergie', path: '/signs/', title: 'Projevy potravinové alergie', description: 'Jak poznat potravinovou alergii u miminka: kůže, stolice, bříško, reflux i rychlé reakce.', order: 0 },
  { category: 'eliminacni-dieta', path: '/main-suspects/', title: 'Hlavní podezřelí', description: '1. fáze eliminační diety: které potraviny na 14 dní vyřadit a co sledovat.', order: 0 },
  { category: 'ekzem', path: '/eczema/', title: 'Ekzém u miminka', description: 'Jak ekzém u miminka poznat, proč vzniká a kdy promazávat.', order: 0 },
];

export const articles = [
  // ── Potravinová alergie ─────────────────────────────────────────────
  {
    slug: 'jak-vznika-potravinova-alergie',
    published: '2026-01-06',
    category: 'potravinova-alergie',
    title: 'Jak vzniká potravinová alergie',
    seoTitle: 'Jak vzniká potravinová alergie u miminek a dětí',
    h1: 'Jak vzniká potravinová alergie u dětí?',
    description: 'Proč imunita dítěte začne brát běžnou potravinu jako hrozbu: genetika, prostředí, střevní mikrobiom i kůže narušená ekzémem. Srozumitelně pro rodiče.',
    cover: `${SB}/3930x5390/51e62c9baa/cells.jpg`,
    coverAlt: 'Imunitní buňky pod mikroskopem',
    summary: 'Potravinová alergie vzniká, když imunitní systém dítěte přestane brát běžnou potravinu jako bezpečnou – odborně jde o prolomení imunologické tolerance. Podílí se na tom genetika, moderní prostředí, stav střevního mikrobiomu, léky i stres a u dětí s ekzémem také kontakt s potravinou přes poškozenou kůži.',
    faq: [
      { q: 'Může za alergii dítěte rodič?', a: 'Ne. Alergie je souhra mnoha faktorů, které často nejde plně ovlivnit, a může vzniknout i tehdy, když rodiče dělají všechno „správně“.' },
      { q: 'Je potravinová alergie dědičná?', a: 'Genetika hraje roli – pokud má někdo v rodině ekzém, astma nebo alergie, má dítě větší riziko. Kromě ní se podílí i prostředí, střevní mikrobiom, léky a stres.' },
      { q: 'Proč mají děti s ekzémem vyšší riziko potravinové alergie?', a: 'Přes narušenou kožní bariéru se dítě může k potravině senzibilizovat dřív, než ji vůbec ochutná. Když alergen pronikne do těla kůží dřív než ústy, je riziko alergie vyšší (tzv. hypotéza dvojí expozice).' },
      { q: 'Jak snížit riziko potravinové alergie?', a: 'Doporučuje se včasné zavádění potravin do jídelníčku, aby se tolerance vytvořila ve střevech, a pečlivé ošetřování ekzému. Pomáhá také zdravá strava, co nejméně toxické prostředí, dostatek spánku a duševní pohoda.' },
      { q: 'Může potravinová alergie vymizet?', a: 'S potravinovými alergiemi dnes umíme pracovat a v mnoha případech lze postupně podpořit jejich vyhasnutí – například řízeným <a href="/pruvodce/eliminacni-dieta/trenink-alergenu/">tréninkem alergenů</a>.' },
    ],
  },
  {
    slug: 'ige-a-non-ige',
    published: '2026-01-06',
    category: 'potravinova-alergie',
    title: 'IgE × non-IgE alergie',
    seoTitle: 'IgE a non-IgE alergie: rychlá a opožděná reakce',
    h1: 'Rozdíl mezi IgE a non-IgE potravinovou alergií',
    description: 'Jak se liší rychlá IgE a opožděná non-IgE potravinová alergie u dětí: kdy se projeví, jaké má příznaky, proč testy bývají negativní a co mění kojení.',
    cover: `${SB}/4000x3000/c0cd7c1e3d/difference.jpg`,
    coverAlt: 'Letecký pohled na hranici mezi pískem a zeleným porostem',
    summary: 'IgE alergie se projeví rychle – během minut až 1–2 hodin po jídle (kopřivka, otoky, zvracení) a bývá vidět v testech. Non-IgE alergie přichází za 8 hodin až několik dní, projevuje se hlavně ekzémem a trávicími obtížemi a běžné testy bývají negativní. Přes kojení může i IgE alergie vypadat jako opožděná.',
    faq: [
      { q: 'Proč testy na alergii vyšly negativní, i když dítěti potravina vadí?', a: 'U non-IgE alergie se netvoří IgE protilátky, takže krevní ani kožní testy často nic neukážou. Klíčová je <a href="/main-suspects/">eliminační dieta</a> a následná řízená expozice.' },
      { q: 'Za jak dlouho se projeví alergie na potravinu?', a: 'IgE reakce během několika minut až 1–2 hodin po požití, non-IgE reakce za 8 hodin až několik dní po konzumaci.' },
      { q: 'Jak se alergie projevuje u kojeného miminka?', a: 'Alergen se přes mateřské mléko dostává k miminku v malém množství a opožděně, takže reakce přichází s odstupem a může připomínat non-IgE alergii, i když jde o IgE. Podle samotných příznaků proto typ alergie spolehlivě určit nejde.' },
      { q: 'Může mít dítě IgE i non-IgE alergii zároveň?', a: 'Ano. Na stejnou potravinu může reagovat kombinací rychlé i opožděné reakce a projevy se mohou v čase měnit.' },
    ],
  },
  {
    slug: 'psenice-vs-lepek',
    published: '2026-01-06',
    category: 'potravinova-alergie',
    title: 'Pšenice vs. lepek',
    seoTitle: 'Pšenice vs. lepek: alergie, celiakie, nesnášenlivost',
    h1: 'Pšenice vs. lepek: na co dítě reaguje?',
    description: 'Alergie na pšenici, celiakie a nesnášenlivost lepku nejsou totéž. Jak se liší projevy u dětí, jak se řeší a proč alergie na pšenici často vymizí.',
    cover: `${SB}/3872x2576/15a47fe79f/whey.jpg`,
    coverAlt: 'Bochníky chleba a klasy pšenice',
    summary: 'Pšenice je celá obilovina, lepek jen jedna skupina jejích bílkovin (gliadiny a gluteniny). Dítě proto může mít alergii na pšenici a lepek tolerovat – nebo naopak. Alergie na pšenici u dětí často vymizí, celiakie je autoimunitní onemocnění, které vyžaduje celoživotní bezlepkovou dietu.',
    faq: [
      { q: 'Je alergie na pšenici totéž co celiakie?', a: 'Ne. Alergie na pšenici je reakce imunity na kteroukoli pšeničnou bílkovinu a u dětí často vymizí. Celiakie je autoimunitní nemoc vyvolaná gliadinem (částí lepku), poškozuje střevní sliznici a vyžaduje přísnou celoživotní bezlepkovou dietu.' },
      { q: 'Může dítě s alergií na pšenici jíst žito nebo ječmen?', a: 'Dítě s alergií na pšenici často toleruje bezlepkové obiloviny (rýže, kukuřice, jáhly), může ale reagovat i na ječmen nebo žito kvůli podobnosti bílkovin.' },
      { q: 'Jak se projevuje alergie na pšenici u miminka?', a: 'Například začervenáním kolem úst, ekzémem, kopřivkou, bolestmi bříška, průjmem nebo hlenem ve stolici, zvracením a nočním neklidem. Nejzávažnější reakcí je anafylaxe.' },
      { q: 'Kdy zavádět pšenici do jídelníčku miminka?', a: 'Zavádění pšenice v období 4.–6. měsíce podporuje toleranci.' },
    ],
  },
  {
    slug: 'zkrizene-alergie',
    published: '2026-01-06',
    category: 'potravinova-alergie',
    title: 'Zkřížené alergie',
    seoTitle: 'Zkřížená alergie u dětí: proč reagují i na jiné potraviny',
    h1: 'Zkřížené alergie u dětí',
    description: 'Co je zkřížená alergie, proč dítě reaguje na syrové jablko a pečené snese, které alergeny jsou stabilní a proč nevyřazovat potraviny jen podle testu.',
    cover: `${SB}/4004x2669/be8a445887/cross.jpg`,
    coverAlt: 'Ruka zdvižená nad kvetoucím polem',
    summary: 'Zkřížená alergie vzniká, když mají dvě potraviny podobné bílkoviny a imunitní systém si je splete. U ovoce a zeleniny často pomůže tepelná úprava, u ořechů, arašídů, semen nebo korýšů ne. Pozitivní test ale ještě neznamená skutečnou alergii.',
    faq: [
      { q: 'Proč dítěti vadí syrové jablko, ale pečené ne?', a: 'Bílkoviny ovoce a zeleniny jsou křehké a teplo je rozloží. Typicky jde o pylově-potravinový syndrom – syrové jablko svědí v puse, kompot nevadí.' },
      { q: 'Mám vyřadit všechny potraviny, které vyšly v testu?', a: 'Ne. Pozitivní test říká jen to, že imunita potravinu „poznává“. Skutečná alergie je ta, která se projeví příznaky – a preventivní vyřazování celých skupin dítě zbytečně připraví o živiny i pestrost.' },
      { q: 'Které zkřížené alergie jsou nejčastější?', a: 'Například tropomyosin propojuje krevety, humra, kraba a další korýše a parvalbumin spojuje většinu mořských i sladkovodních ryb.' },
    ],
  },

  // ── Eliminační dieta ────────────────────────────────────────────────
  {
    slug: 'kompletni-vylouceni',
    published: '2025-12-26',
    category: 'eliminacni-dieta',
    title: 'Kompletní vyloučení',
    seoTitle: 'Kompletní vyloučení: 2. fáze eliminační diety',
    h1: '2. fáze eliminační diety: kompletní vyloučení',
    description: 'Co dělat, když se miminko po první fázi eliminační diety nezlepší: jak dlouho držet kompletní vyloučení, co jíst a proč hned přejít na testování.',
    cover: `${SB}/6000x4000/82f0af7ecf/completediet.jpg`,
    coverAlt: 'Košíky s čerstvou zeleninou – brokolice, cukety a fazolky',
    summary: 'Kompletní vyloučení přichází, když se stav dítěte po první fázi diety nezlepšil. Je nejpřísnější, ale krátké – drží se 4–5 dní, maximálně 7 dní. Základem je zelenina, dále povolené ovoce, maso a obiloviny. Hned potom následuje testování alergenů.',
    faq: [
      { q: 'Jak dlouho trvá 2. fáze eliminační diety?', a: '4–5 dní, maximálně 7 dní, nikdy déle. Dlouhodobé vyřazování velkého množství potravin není cílem a může být kontraproduktivní.' },
      { q: 'Co jíst při kompletním vyloučení?', a: 'Hlavně zeleninu (listovou a zelenou, brokolici, cuketu, dýni, brambory), ovoce jako jablka, hrušky nebo meruňky, maso jako králičí, vepřové, jehněčí nebo kachnu a obiloviny jako rýži, pohanku, jáhly nebo kukuřici. Více najdete v článku <a href="/pruvodce/eliminacni-dieta/bezpecne-potraviny/">Bezpečné potraviny</a>.' },
      { q: 'Co když se stav ani po kompletním vyloučení nezlepší?', a: 'Po pár dnech se i tak začíná s <a href="/pruvodce/eliminacni-dieta/testovani-alergenu/">testováním alergenů</a>. Ke zlepšení může dojít až se zařazením správných potravin – v přísném vyřazování se nepokračuje.' },
      { q: 'Můžu při eliminační dietě jíst uzeniny?', a: 'V této fázi ne – uzeniny často obsahují přidané látky, které mohou zhoršovat ekzém. Lepší je domácí pečené maso.' },
    ],
  },
  {
    slug: 'testovani-alergenu',
    published: '2025-12-27',
    category: 'eliminacni-dieta',
    title: 'Testování alergenů',
    seoTitle: 'Testování alergenů: jak vracet potraviny do jídelníčku',
    h1: 'Testování alergenů po eliminační dietě',
    description: 'Jak po eliminační dietě vracet alergeny zpět: kdy začít, jak dlouho jeden alergen testovat, testování přes mateřské mléko a co dělat při reakci.',
    cover: `${SB}/3888x2592/5824dd3bce/test.jpg`,
    coverAlt: 'Ochutnávání plátku citronu',
    summary: 'Testování alergenů zjišťuje hlavně to, co dítěti už vadit nemusí. Alergeny se zkoušejí jeden po druhém, obvykle 3 dny se stoupající dávkou. Pokud kojíte, testuje se nejdřív přes mateřské mléko. Testování má smysl opakovat každé 2–3 měsíce.',
    faq: [
      { q: 'Jak dlouho testovat jeden alergen?', a: 'Většinou stačí 3 dny: první den menší dávka, druhý den větší, třetí den plná porce. U miminek a citlivých dětí se začíná velmi malým množstvím – někdy stačí jen ochutnání.' },
      { q: 'Za jak dlouho se projeví reakce přes mateřské mléko?', a: 'Často se zpožděním 12–24 hodin, někdy i déle. Proto je potřeba dát testu dost času a neuspěchat závěry.' },
      { q: 'Co dělat, když alergen neprojde?', a: 'Testování hned ukončete, počkejte na návrat k původnímu stavu (obvykle 1–3 dny) a teprve pak pokračujte dalším alergenem.' },
      { q: 'Kdy testování zopakovat?', a: 'Každé 2–3 měsíce. Alergen, který dřív neprošel, často začne procházet – alespoň v určité podobě, například tepelně upravený.' },
    ],
  },
  {
    slug: 'trenink-alergenu',
    published: '2025-12-27',
    category: 'eliminacni-dieta',
    title: 'Trénink alergenů',
    seoTitle: 'Trénink alergenů: jak u dítěte budovat toleranci',
    h1: 'Trénink alergenů: cesta k toleranci',
    description: 'Jak podávat alergen v malých pravidelných dávkách, aby si tělo dítěte budovalo toleranci. Kdy s tréninkem začít, jak často a kdy není vhodný.',
    cover: `${SB}/6016x4016/7d7f18b690/train.jpg`,
    coverAlt: 'Usměvavý kluk ukazuje svaly',
    summary: 'Při tréninku se alergen nevyřazuje úplně, ale podává se v malých, pravidelných dávkách, které nezhoršují stav. Začíná se až po testování, minimálně jednou za 14 dní, a dávka se zvyšuje pomalu. U silných a rychlých reakcí trénink vhodný není a patří pod vedení alergologa.',
    faq: [
      { q: 'Jak často podávat alergen při tréninku?', a: 'Minimálně jednou za 14 dní a maximálně tolik, kolik dítě zvládne bez reakce.' },
      { q: 'Kdy trénink alergenů není vhodný?', a: 'Při silných a rychlých reakcích, jako jsou dechové obtíže nebo anafylaxe. Tyto situace vyžadují vedení alergologem.' },
      { q: 'Proč alergen úplně nevyřadit?', a: 'Dlouhodobé vyřazení bez návratu nevede k uzdravení, může zvyšovat přecitlivělost a zbytečně omezuje jídelníček. Řízený kontakt s alergenem učí imunitní systém toleranci.' },
    ],
  },
  {
    slug: 'nepotravinove-vlivy',
    published: '2026-04-09',
    category: 'eliminacni-dieta',
    title: 'Nepotravinové vlivy',
    seoTitle: 'Co zhoršuje ekzém kromě jídla: zuby, nemoc, počasí',
    h1: 'Nepotravinové vlivy na ekzém a alergie',
    description: 'Růst zoubků, nemoc, očkování, počasí, pocení i únava umí zhoršit ekzém u miminka. Jak je odlišit od reakce na potravinu při eliminační dietě.',
    cover: `${SB}/6000x3375/8aa1d51e29/storm.jpg`,
    coverAlt: 'Bouřková oblaka s bleskem',
    summary: 'Ekzém u dětí nezhoršuje jen jídlo. Častými spouštěči jsou růst zoubků, nemoc, očkování, počasí, pocení, prostředí i únava. Typická potravinová reakce odezní 2–3 dny po vysazení alergenu – pokud zhoršení přetrvává nebo kolísá, příčina bude spíš mimo stravu.',
    faq: [
      { q: 'Může růst zoubků zhoršit ekzém?', a: 'Ano, patří mezi nejčastější příčiny náhlého zhoršení. Kůže, hlavně na tvářích, bývá suchá, zarudlá a teplá a ekzém může reagovat i několik dní až týdnů před prořezáním zubu.' },
      { q: 'Jak poznat, jestli ekzém zhoršilo jídlo, nebo něco jiného?', a: 'Po vyřazení alergenu se kůže u potravinové reakce během 2–3 dnů vrací do původního stavu. Když zhoršení přetrvává déle nebo kolísá, jde pravděpodobně o nepotravinový vliv.' },
      { q: 'Proč je ekzém horší večer?', a: 'Stav kůže během dne přirozeně kolísá – ráno bývá klidnější, večer, před spaním a při únavě výraznější. Kůži je proto dobré hodnotit ideálně ve stejný čas.' },
      { q: 'Má se při zhoršení přerušit testování potravin?', a: 'Většinou ne. Reakce může být výraznější, ale dlouhé přerušení celý proces zbytečně zpomalí.' },
    ],
  },
  {
    slug: 'bezpecne-potraviny',
    published: '2025-12-26',
    category: 'eliminacni-dieta',
    title: 'Bezpečné potraviny',
    seoTitle: 'Bezpečné potraviny při eliminační dietě: co jíst',
    h1: 'Bezpečné potraviny: co jíst při eliminační dietě',
    description: 'Přehled potravin s nízkým alergenním potenciálem pro eliminační dietu při kojení i u dětí: zelenina, ovoce, maso, obiloviny a nápoje.',
    cover: `${SB}/5184x3456/6b8091d59a/bezpecne.jpg`,
    coverAlt: 'Prázdné talíře a misky připravené k jídlu',
    summary: 'Při eliminační dietě je pořád z čeho vařit. Nízký alergenní potenciál má většina zeleniny (hlavně tepelně upravené), ovoce jako jablka a hrušky, maso jako vepřové, králičí nebo jehněčí a obiloviny jako rýže, pohanka nebo jáhly. Cílem je pestrost, ne pár „jistot“.',
    faq: [
      { q: 'Co jíst při eliminační dietě?', a: 'Základem je zelenina, k ní ovoce, maso a obiloviny s nízkým alergenním potenciálem. Většina potravin se lépe snáší tepelně upravená než syrová.' },
      { q: 'Které maso se při alergii obvykle dobře snáší?', a: 'Vepřové, králičí, jehněčí a skopové, zvěřina, husa a kachna. Uzeniny mezi bezpečné potraviny nepatří.' },
      { q: 'Co pít při eliminační dietě?', a: 'Vodu, slabé bylinné čaje (fenykl, kmín, lipový, bezový), rooibos nebo slabý zelený či černý čaj.' },
      { q: 'Jak dlouho zůstat na omezeném jídelníčku?', a: 'Co nejkratší dobu. Dlouhé setrvávání na velmi omezeném jídelníčku může vést k nutričním deficitům, rozhození mikrobiomu i návratu obtíží – cílem je návrat k pestré stravě.' },
    ],
  },

  // ── Ekzém ───────────────────────────────────────────────────────────
  {
    slug: 'spoustece-ekzemu',
    published: '2026-01-06',
    category: 'ekzem',
    title: 'Spouštěče ekzému',
    seoTitle: 'Spouštěče atopického ekzému u dětí podle věku',
    h1: 'Spouštěče atopického ekzému v průběhu dětství',
    description: 'Co spouští atopický ekzém u miminka, batolete a předškoláka a jak souvisí s atopickým pochodem. Proč se spouštěče s věkem mění a jak je ovlivnit.',
    cover: `${SB}/6048x4024/1a3cfe4cd3/sneeze.jpg`,
    coverAlt: 'Holčička v zimním kabátku si utírá nos',
    summary: 'Spouštěče atopického ekzému se mění s věkem. U miminek do roka hraje hlavní roli strava a nezralá imunita, u batolat kombinace stravy a prostředí, u předškoláků prostředí a dýchací cesty a u starších dětí stres. Atopický pochod je častý vývoj, ne osud.',
    faq: [
      { q: 'Co je atopický pochod?', a: 'Typický sled atopických onemocnění: v kojeneckém věku často potravinové alergie, v batolecím a předškolním věku alergická rýma a u některých dětí následně astma. Nejde o nevyhnutelný scénář.' },
      { q: 'Co nejčastěji spouští ekzém u miminka?', a: 'Potravinové alergeny (přes mateřské mléko nebo v příkrmech), nezralý střevní mikrobiom, nemoci, očkování, prořezávání zoubků a chemie v domácnosti.' },
      { q: 'Dá se atopický pochod zastavit?', a: 'Jeho průběh lze výrazně ovlivnit. Pomáhá eliminačně-expoziční dieta, postupné zavádění alergenů zpět, snížení chemické zátěže v domácnosti a podpora střev a imunity.' },
    ],
  },
  {
    slug: 'kvasinka-a-ekzem',
    published: '2026-01-06',
    category: 'ekzem',
    title: 'Kvasinka vs. ekzém',
    seoTitle: 'Kvasinka a ekzém u dětí: je Candida viník?',
    h1: 'Kvasinka vs. ekzém: kdo je viník?',
    description: 'Způsobuje kvasinka (Candida) ekzém u dětí? Proč jde spíš o narušenou rovnováhu mikrobiomu, proč nepomáhají extrémní diety a co skutečně dává smysl.',
    cover: `${SB}/9216x6912/89c0954f36/candida.jpg`,
    coverAlt: 'Ilustrace mikroorganismů pod mikroskopem',
    summary: 'Kvasinka sama o sobě ekzém nevytváří. Je běžnou součástí mikrobiomu a problém nastává, až když je rovnováha kůže a střev narušená – zanícená kůže je pro ni ideální prostředí. Místo extrémních diet pomáhá vyřadit jednoduché cukry, zachovat komplexní sacharidy a podpořit mikrobiom.',
    faq: [
      { q: 'Způsobuje kvasinka ekzém?', a: 'Ne. Kvasinka (nejčastěji Candida) se může v zanícené kůži snáz udržet a zhoršovat hojení, ale ekzém sama nevytváří. Je signálem nerovnováhy, ne příčinou.' },
      { q: 'Pomůže proti kvasince dieta bez sacharidů?', a: 'Extrémní „anti-kvasinkové“ diety mohou víc uškodit než pomoct – u kojících žen třeba vyčerpáním nebo snížením kojení, u dětí ochuzením mikrobiomu. Základem je vyřadit jednoduché cukry, ne všechny sacharidy.' },
      { q: 'Jak vypadá ekzém s kvasinkou?', a: 'Často se zhoršuje v kožních záhybech, zarudnutí nereaguje na běžnou péči a obtíže se opakovaně vracejí.' },
    ],
  },
  {
    slug: 'svedeni-u-ekzemu',
    published: '2026-01-06',
    category: 'ekzem',
    title: 'Svědění u ekzému',
    seoTitle: 'Svědění u ekzému: co pomáhá miminku přes den i v noci',
    h1: 'Svědění u ekzému: co pomáhá přes den a co v noci',
    description: 'Jak ulevit miminku nebo batoleti od svědění ekzému: vlhké zábaly, zinkové masti, péče o rozškrábanou kůži a tipy na klidnější noc.',
    cover: `${SB}/1920x2880/ab0d41b9f6/itchy.jpg`,
    coverAlt: 'Ručička miminka na jemné kůži',
    summary: 'Svědění není zlobení, ale přirozená reakce těla na zánět. Přes den pomáhá přesměrovat pozornost, zinkové masti a vlhké zábaly, v noci společné spaní, kojení, zakryté ručičky a chladnější místnost. Když svědění neustupuje, je potřeba hledat příčinu.',
    faq: [
      { q: 'Proč ekzém svědí víc v noci?', a: 'V noci klesá hladina kortizolu a svědění se často výrazně zhoršuje.' },
      { q: 'Co pomáhá na svědění ekzému u miminka?', a: 'Zinkové masti v tenké vrstvě, vlhké zábaly z vlažného řepíkového nebo heřmánkového čaje na 5–10 minut, odvedení pozornosti a v noci zakryté ručičky (bavlněné ponožky nebo speciální oděvy).' },
      { q: 'Mám dítěti zakazovat škrábání?', a: 'Ne. Zákaz zvyšuje stres a často vede k ještě silnější reakci. Lepší je škrábání přesměrovat – hrou, mazlením nebo jemným přidržením ručiček.' },
      { q: 'Jak ošetřit rozškrábaný ekzém?', a: 'Místo jemně očistěte a vydezinfikujte, k podpoře hojení lze použít dračí krev. Důležité je zabránit zanesení infekce.' },
    ],
  },
  {
    slug: 'kozni-projevy-u-miminek',
    published: '2026-01-06',
    category: 'ekzem',
    title: 'Kožní projevy u miminek',
    seoTitle: 'Vyrážka u miminka: ekzém, opruzeniny, nebo seborea?',
    h1: 'Různé kožní projevy u miminek: ne všechno je ekzém',
    description: 'Opruzeniny, impetigo, mléčná krusta (seborea) i kontaktní reakce: jak je u miminka odlišit od atopického ekzému a kdy hledat hlubší příčinu.',
    cover: `${SB}/3368x6000/2129807224/dermatic.jpg`,
    coverAlt: 'Abstraktní růžovobílá struktura připomínající kůži',
    summary: 'Ne každý červený flek je atopický ekzém. U miminek se často objevují opruzeniny, seboroická dermatitida (mléčná krusta), kontaktní reakce nebo bakteriální impetigo. Pokud se projevy opakují, nereagují na běžnou péči nebo je provází průjmy či neklid, je dobré hledat hlubší příčinu.',
    faq: [
      { q: 'Jak poznat mléčnou krustu od ekzému?', a: 'Seborea (mléčná krusta) se projevuje mastnými, žlutavými šupinami hlavně ve vlasech, v obočí a za ušima a obvykle výrazně nesvědí. U části dětí se ale může časem překlopit do atopického ekzému.' },
      { q: 'Co je impetigo a kdy s ním k lékaři?', a: 'Povrchová bakteriální infekce kůže s mokvajícími ložisky a žlutými až medovými strupy, která se rychle šíří. S podezřením zajděte k pediatrovi nebo kožnímu lékaři – udělá stěr a určí léčbu.' },
      { q: 'Proč se opruzeniny pořád vracejí?', a: 'Opakované nebo špatně se hojící opruzeniny mohou signalizovat přetížené střevo, reakci na složky stravy (alergii) nebo reakci na antibiotika.' },
      { q: 'Mám při vyrážce hned začít eliminační dietu?', a: 'Ne. Prvním krokem je jednoduchá přirozená strava a zklidnění prostředí (chemie, kosmetika, prací prostředky). Eliminačně-expoziční dieta má smysl, když se projevy opakují, přetrvávají nebo se přidávají další obtíže.' },
    ],
  },

  // ── Specifická témata ───────────────────────────────────────────────
  {
    slug: 'histaminova-intolerance',
    published: '2026-01-06',
    category: 'specificka-temata',
    title: 'Histaminová intolerance',
    seoTitle: 'Histaminová intolerance u dětí: projevy a potraviny',
    h1: 'Histaminová intolerance: jak se projevuje a jak ji řešit',
    description: 'Co je histaminová intolerance, jak souvisí s ekzémem a alergií u dětí, jaké má projevy a které potraviny mají hodně nebo málo histaminu.',
    cover: `${SB}/3840x5760/eb58a6e32b/histamin.jpg`,
    coverAlt: 'Sklenice s fermentovanou zeleninou a kysanými potravinami',
    summary: 'Histaminová intolerance (HIT) není alergie, ale nerovnováha mezi přísunem a odbouráváním histaminu. U dětí s ekzémem a potravinovou alergií je častější. Projevuje se na kůži, v trávení, spánku i dýchání. Pomáhá jednoduchá protizánětlivá strava, omezení největších zdrojů histaminu a podpora střev.',
    faq: [
      { q: 'Je histaminová intolerance alergie?', a: 'Ne. Jde o stav, kdy tělo nedokáže dostatečně odbourávat histamin z potravy a ze zánětlivých reakcí. Alergická reakce ale sama hladinu histaminu zvyšuje, takže dítě může reagovat na potraviny s vyšším obsahem histaminu i bez skutečné histaminové intolerance.' },
      { q: 'Které potraviny mají hodně histaminu?', a: 'Například fermentované potraviny (kefír, jogurt, kysané zelí), uzeniny, ne úplně čerstvé ryby, rajčata, špenát, citrusy, jahody, čokoláda, kakao a dlouho tažené vývary.' },
      { q: 'Za jak dlouho se histamin projeví?', a: 'Akutně za 30–60 minut po jídle, opožděně za 6–24 hodin a jako celková zátěž až za 48 hodin.' },
      { q: 'Jak dlouho trvá zlepšení?', a: 'První změny bývají za 1–2 týdny, stabilizace za 4–6 týdnů, výrazné zlepšení za 3–6 měsíců a obnova tolerance za 6–12 měsíců. U dětí to jde rychleji než u dospělých.' },
    ],
  },
  {
    slug: 'lekari-a-ekzem',
    published: '2026-02-28',
    category: 'specificka-temata',
    title: 'Lékaři a ekzém',
    seoTitle: 'Léčba ekzému u dětí: masti, kortikoidy a co dál',
    h1: 'Lékaři a ekzém: jaké léčebné cesty se používají',
    description: 'Jak lékaři léčí ekzém u miminek a dětí: promazávání, kortikoidní masti, imunomodulační krémy, antihistaminika a antibiotika. Co dělají a kde mají limity.',
    cover: `${SB}/3500x2333/d2ca88ac0b/doctor.jpg`,
    coverAlt: 'Lékařka drží fonendoskop ve tvaru srdce',
    summary: 'Lékařská léčba ekzému cílí na zklidnění akutního stavu: promazávání, kortikoidní masti, imunomodulační krémy, antihistaminika a při infekci antibiotika. Pomáhají ulevit, ale příčinu ekzému samy obvykle neřeší – proto dává smysl hledat i to, proč tělo reaguje.',
    faq: [
      { q: 'Co dělají kortikoidní masti na ekzém?', a: 'Rychle potlačí zánět, zarudnutí i svědění. Příčinu ekzému ale neřeší a po vysazení se ekzém často vrací. Při dlouhodobém nebo častém používání hrozí ztenčení kůže, vyšší náchylnost k infekcím a postupné „zvykání“ kůže.' },
      { q: 'Kdy ekzém promazávat?', a: 'Až když zánět ustoupí a kůže je suchá, šupinatá nebo praskající. Červený, zapálený nebo mokvající ekzém je potřeba nejdřív zklidnit a vysušit.' },
      { q: 'Pomáhají antihistaminika na svědění?', a: 'Mohou krátkodobě ulevit, hlavně když svědění narušuje spánek. Neřeší ale zánět ani příčinu ekzému.' },
    ],
  },
];

export function categoryPath(slug) {
  return `/pruvodce/${slug}/`;
}

export function articlePath(article) {
  return `/pruvodce/${article.category}/${article.slug}/`;
}

// Pořadí v kategorii: stávající článek (order 0) první, pak nové v pořadí výše.
export function categoryItems(categorySlug) {
  const legacy = legacyArticles.filter((a) => a.category === categorySlug).map((a) => ({ ...a, href: a.path }));
  const fresh = articles.filter((a) => a.category === categorySlug).map((a) => ({ ...a, href: articlePath(a) }));
  return [...legacy, ...fresh];
}
