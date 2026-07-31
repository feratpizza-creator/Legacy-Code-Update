// Additional Finnish curriculum units u28-u29 for every CEFR level.
// Content is deterministic local curriculum data; APIs are not used to generate it.

type Word = {
  word: string;
  translation: string;
  pos: string;
  example: string;
  exampleTranslation: string;
};

type Unit = {
  id: string;
  title: string;
  description: string;
  words: Word[];
  phrases: { phrase: string; translation: string }[];
  dialogue: { speaker: string; text: string; translation: string }[];
  reading: { title: string; text: string; translation: string };
};

const w = (word: string, translation: string, pos: string, example: string, exampleTranslation: string): Word => ({ word, translation, pos, example, exampleTranslation });
const u = (id: string, title: string, description: string, words: Word[], phrases: Unit["phrases"], dialogue: Unit["dialogue"], reading: Unit["reading"]): Unit => ({ id, title, description, words, phrases, dialogue, reading });

export const ADDITIONAL_FI_PART3_UNITS: Record<string, Unit[]> = {
  A0: [
    u("u28", "Arjen esineet", "Nimeä tavallisia esineitä ja kerro, missä ne ovat.", [
      w("pöytä", "table", "noun", "Kirja on pöydällä.", "The book is on the table."),
      w("tuoli", "chair", "noun", "Tuoli on ikkunan vieressä.", "The chair is next to the window."),
      w("lasi", "glass", "noun", "Lasi on keittiössä.", "The glass is in the kitchen."),
      w("lautanen", "plate", "noun", "Lautanen on puhdas.", "The plate is clean."),
      w("puhelin", "phone", "noun", "Puhelin on laukussa.", "The phone is in the bag."),
      w("avain", "key", "noun", "Avain on taskussa.", "The key is in the pocket."),
      w("laukku", "bag", "noun", "Laukku on raskas.", "The bag is heavy."),
      w("paperi", "paper", "noun", "Paperi on pöydällä.", "The paper is on the table."),
    ], [
      { phrase: "Missä avain on?", translation: "Where is the key?" },
      { phrase: "Se on pöydällä.", translation: "It is on the table." },
      { phrase: "Anna minulle lasi.", translation: "Give me a glass." },
      { phrase: "Laukku on tässä.", translation: "The bag is here." },
    ], [
      { speaker: "A", text: "Missä puhelin on?", translation: "Where is the phone?" },
      { speaker: "B", text: "Se on laukussa.", translation: "It is in the bag." },
      { speaker: "A", text: "Entä avain?", translation: "And the key?" },
      { speaker: "B", text: "Avain on pöydällä.", translation: "The key is on the table." },
    ], { title: "Kotona", text: "Pöydällä on kirja ja paperi. Tuoli on ikkunan vieressä. Puhelin ja avain ovat laukussa.", translation: "There is a book and paper on the table. The chair is next to the window. The phone and key are in the bag." }),
    u("u29", "Yksinkertaiset teot", "Kerro, mitä teet tavallisena päivänä.", [
      w("avata", "open", "verb", "Avaan oven.", "I open the door."),
      w("sulkea", "close", "verb", "Suljen ikkunan.", "I close the window."),
      w("ottaa", "take", "verb", "Otan kirjan.", "I take the book."),
      w("antaa", "give", "verb", "Annan lahjan.", "I give a present."),
      w("istua", "sit", "verb", "Istun tuolilla.", "I sit on the chair."),
      w("seistä", "stand", "verb", "Seison oven luona.", "I stand by the door."),
      w("odottaa", "wait", "verb", "Odotan bussia.", "I wait for the bus."),
      w("auttaa", "help", "verb", "Autan ystävää.", "I help a friend."),
    ], [
      { phrase: "Avaa ovi, ole hyvä.", translation: "Open the door, please." },
      { phrase: "Odota hetki.", translation: "Wait a moment." },
      { phrase: "Voitko auttaa?", translation: "Can you help?" },
      { phrase: "Otan tämän.", translation: "I will take this." },
    ], [
      { speaker: "A", text: "Voitko avata ikkunan?", translation: "Can you open the window?" },
      { speaker: "B", text: "Kyllä, avaan sen nyt.", translation: "Yes, I will open it now." },
      { speaker: "A", text: "Kiitos avusta.", translation: "Thank you for the help." },
      { speaker: "B", text: "Ole hyvä.", translation: "You are welcome." },
    ], { title: "Pieni apu", text: "Aamulla avaan ikkunan ja otan kirjan. Päivällä odotan bussia. Kun ystävä tarvitsee apua, autan häntä.", translation: "In the morning I open the window and take the book. During the day I wait for the bus. When a friend needs help, I help them." }),
  ],
  A1: [
    u("u28", "Ostokset ja palvelut", "Harjoittele kaupassa asiointia ja hintojen kysymistä.", [
      w("hinta", "price", "noun", "Mikä tämän hinta on?", "What is the price of this?"),
      w("alennus", "discount", "noun", "Tässä tuotteessa on alennus.", "This product has a discount."),
      w("kuitti", "receipt", "noun", "Voinko saada kuitin?", "Can I have a receipt?"),
      w("kassa", "checkout", "noun", "Kassa on tuolla.", "The checkout is over there."),
      w("tuote", "product", "noun", "Tämä tuote on hyvä.", "This product is good."),
      w("maksaa", "cost/pay", "verb", "Haluan maksaa kortilla.", "I want to pay by card."),
      w("vaihtaa", "exchange", "verb", "Voinko vaihtaa paidan?", "Can I exchange the shirt?"),
      w("tarjous", "offer", "noun", "Tarjous päättyy huomenna.", "The offer ends tomorrow."),
    ], [
      { phrase: "Paljonko tämä maksaa?", translation: "How much does this cost?" },
      { phrase: "Maksan kortilla.", translation: "I will pay by card." },
      { phrase: "Voinko saada kuitin?", translation: "Can I have a receipt?" },
      { phrase: "Onko tämä tarjouksessa?", translation: "Is this on offer?" },
    ], [
      { speaker: "A", text: "Paljonko tämä takki maksaa?", translation: "How much does this coat cost?" },
      { speaker: "B", text: "Se maksaa neljäkymmentä euroa.", translation: "It costs forty euros." },
      { speaker: "A", text: "Onko siinä alennusta?", translation: "Does it have a discount?" },
      { speaker: "B", text: "Kyllä, tänään on tarjous.", translation: "Yes, there is an offer today." },
    ], { title: "Kaupassa", text: "Kaupassa katson tuotteen hintaa ja kysyn alennuksesta. Maksaessani saan kuitin. Jos tuote ei sovi, voin vaihtaa sen.", translation: "In the shop I look at the product price and ask about a discount. When I pay, I get a receipt. If the product does not fit, I can exchange it." }),
    u("u29", "Ohjeet ja kulkeminen", "Kysy ja anna helppoja reittiohjeita.", [
      w("suoraan", "straight", "adverb", "Mene suoraan.", "Go straight."),
      w("kääntyä", "turn", "verb", "Käänny vasemmalle.", "Turn left."),
      w("vasen", "left", "adjective", "Kauppa on vasemmalla.", "The shop is on the left."),
      w("oikea", "right", "adjective", "Pankki on oikealla.", "The bank is on the right."),
      w("risteys", "intersection", "noun", "Risteys on lähellä.", "The intersection is nearby."),
      w("silta", "bridge", "noun", "Kävele sillan yli.", "Walk across the bridge."),
      w("lähellä", "near", "adverb", "Asema on lähellä.", "The station is near."),
      w("kauempana", "farther away", "adverb", "Sairaala on kauempana.", "The hospital is farther away."),
    ], [
      { phrase: "Miten pääsen asemalle?", translation: "How do I get to the station?" },
      { phrase: "Mene suoraan.", translation: "Go straight." },
      { phrase: "Käänny oikealle.", translation: "Turn right." },
      { phrase: "Se on sillan takana.", translation: "It is behind the bridge." },
    ], [
      { speaker: "A", text: "Anteeksi, missä asema on?", translation: "Excuse me, where is the station?" },
      { speaker: "B", text: "Mene suoraan tähän risteykseen.", translation: "Go straight to this intersection." },
      { speaker: "A", text: "Käännynkö vasemmalle?", translation: "Do I turn left?" },
      { speaker: "B", text: "Kyllä, asema on sillan takana.", translation: "Yes, the station is behind the bridge." },
    ], { title: "Reitti asemalle", text: "Asema on lähellä keskustaa. Mene suoraan ja käänny oikealle risteyksessä. Kävele sillan yli; asema on sen takana.", translation: "The station is near the city centre. Go straight and turn right at the intersection. Walk across the bridge; the station is behind it." }),
  ],
  A2: [
    u("u28", "Suunnitelmat ja kokemukset", "Kerro suunnitelmista ja aiemmista kokemuksista.", [
      w("suunnitelma", "plan", "noun", "Suunnitelma muuttui nopeasti.", "The plan changed quickly."),
      w("kokemus", "experience", "noun", "Matka oli hyvä kokemus.", "The trip was a good experience."),
      w("päättää", "decide", "verb", "Päätin jäädä kotiin.", "I decided to stay home."),
      w("onnistua", "succeed", "verb", "Koe onnistui hyvin.", "The test went well."),
      w("unohtaa", "forget", "verb", "Älä unohda lippua.", "Do not forget the ticket."),
      w("muistaa", "remember", "verb", "Muistan tämän päivän.", "I remember this day."),
      w("tavoite", "goal", "noun", "Tavoitteeni on puhua suomea.", "My goal is to speak Finnish."),
      w("valmistautua", "prepare", "verb", "Valmistaudun matkaan.", "I prepare for the trip."),
    ], [
      { phrase: "Aion valmistautua hyvin.", translation: "I will prepare well." },
      { phrase: "Päätin kokeilla uudelleen.", translation: "I decided to try again." },
      { phrase: "Se oli hyvä kokemus.", translation: "It was a good experience." },
      { phrase: "En halua unohtaa sitä.", translation: "I do not want to forget it." },
    ], [
      { speaker: "A", text: "Mikä on suunnitelmasi viikonlopuksi?", translation: "What is your plan for the weekend?" },
      { speaker: "B", text: "Aion valmistautua kokeeseen.", translation: "I will prepare for an exam." },
      { speaker: "A", text: "Onko sinulla tavoite?", translation: "Do you have a goal?" },
      { speaker: "B", text: "Kyllä, haluan onnistua ja muistaa kaiken.", translation: "Yes, I want to succeed and remember everything." },
    ], { title: "Uusi tavoite", text: "Päätin asettaa uuden tavoitteen. Valmistaudun joka päivä ja kirjoitan suunnitelman. Aiemmat kokemukset auttavat minua onnistumaan.", translation: "I decided to set a new goal. I prepare every day and write a plan. Earlier experiences help me succeed." }),
    u("u29", "Terveelliset tavat", "Keskustele levosta, liikunnasta ja hyvinvoinnista.", [
      w("liikunta", "exercise", "noun", "Liikunta tekee hyvää.", "Exercise is good for you."),
      w("lepo", "rest", "noun", "Tarvitsen enemmän lepoa.", "I need more rest."),
      w("uni", "sleep", "noun", "Hyvä uni auttaa.", "Good sleep helps."),
      w("ravinto", "nutrition", "noun", "Terveellinen ravinto on tärkeää.", "Healthy nutrition is important."),
      w("tottumus", "habit", "noun", "Aamukävely on hyvä tottumus.", "A morning walk is a good habit."),
      w("vähentää", "reduce", "verb", "Yritän vähentää sokeria.", "I try to reduce sugar."),
      w("vahvistaa", "strengthen", "verb", "Liikunta vahvistaa kehoa.", "Exercise strengthens the body."),
      w("tasapaino", "balance", "noun", "Työn ja levon tasapaino on tärkeä.", "Balance between work and rest is important."),
    ], [
      { phrase: "Pidä huolta itsestäsi.", translation: "Take care of yourself." },
      { phrase: "Tarvitsen hyvän yöunen.", translation: "I need a good night's sleep." },
      { phrase: "Yritän liikkua joka päivä.", translation: "I try to exercise every day." },
      { phrase: "Työ ja lepo tarvitsevat tasapainoa.", translation: "Work and rest need balance." },
    ], [
      { speaker: "A", text: "Miten pidät huolta terveydestäsi?", translation: "How do you take care of your health?" },
      { speaker: "B", text: "Liikun säännöllisesti ja nukun hyvin.", translation: "I exercise regularly and sleep well." },
      { speaker: "A", text: "Vähennätkö sokeria?", translation: "Do you reduce sugar?" },
      { speaker: "B", text: "Kyllä, terveellinen ravinto auttaa.", translation: "Yes, healthy nutrition helps." },
    ], { title: "Hyvinvoinnin tasapaino", text: "Hyvinvointi koostuu pienistä tavoista. Liikunta vahvistaa kehoa, uni palauttaa ja terveellinen ravinto antaa energiaa. Työn ja levon tasapaino auttaa jaksamaan.", translation: "Well-being consists of small habits. Exercise strengthens the body, sleep restores, and healthy nutrition gives energy. Balance between work and rest helps us cope." }),
  ],
  B1: [
    u("u28", "Työ ja viestintä", "Harjoittele työelämän keskusteluja ja yhteistyötä.", [
      w("kokous", "meeting", "noun", "Kokous alkaa kello yhdeksän.", "The meeting starts at nine."),
      w("tehtävä", "task", "noun", "Tehtävä on valmis.", "The task is ready."),
      w("palaute", "feedback", "noun", "Sain hyödyllistä palautetta.", "I received useful feedback."),
      w("aikataulu", "schedule", "noun", "Aikataulu muuttui.", "The schedule changed."),
      w("yhteistyö", "cooperation", "noun", "Yhteistyö toimii hyvin.", "The cooperation works well."),
      w("ehdottaa", "suggest", "verb", "Ehdotan uutta ratkaisua.", "I suggest a new solution."),
      w("sopia", "agree/suit", "verb", "Sovimme määräajasta.", "We agreed on a deadline."),
      w("ratkaista", "solve", "verb", "Ratkaisemme ongelman yhdessä.", "We solve the problem together."),
    ], [
      { phrase: "Voimmeko sopia tästä?", translation: "Can we agree on this?" },
      { phrase: "Ehdotan toista ratkaisua.", translation: "I suggest another solution." },
      { phrase: "Palaute auttaa kehittymään.", translation: "Feedback helps us improve." },
      { phrase: "Pidetään yhteyttä.", translation: "Let's keep in touch." },
    ], [
      { speaker: "A", text: "Ehtiikö tehtävä valmiiksi perjantaina?", translation: "Will the task be ready by Friday?" },
      { speaker: "B", text: "Kyllä, jos aikataulu pysyy samana.", translation: "Yes, if the schedule stays the same." },
      { speaker: "A", text: "Ehdotan, että tarkistamme sen yhdessä.", translation: "I suggest that we check it together." },
      { speaker: "B", text: "Sopii. Yhteistyö auttaa ratkaisemaan ongelman.", translation: "That works. Cooperation helps solve the problem." },
    ], { title: "Yhteinen ratkaisu", text: "Hyvä työyhteisö tarvitsee selkeän aikataulun ja avointa viestintää. Kokouksessa voidaan ehdottaa ratkaisuja, antaa palautetta ja sopia seuraavista tehtävistä.", translation: "A good workplace needs a clear schedule and open communication. In a meeting, people can suggest solutions, give feedback, and agree on the next tasks." }),
    u("u29", "Ympäristö ja yhteisö", "Keskustele paikallisista ympäristöteoista ja yhteisestä vastuusta.", [
      w("yhteisö", "community", "noun", "Yhteisö järjestää tapahtuman.", "The community organises an event."),
      w("vastuu", "responsibility", "noun", "Ympäristö on meidän vastuumme.", "The environment is our responsibility."),
      w("kulutus", "consumption", "noun", "Kulutus vaikuttaa luontoon.", "Consumption affects nature."),
      w("luonnonvara", "natural resource", "noun", "Vesi on tärkeä luonnonvara.", "Water is an important natural resource."),
      w("suojella", "protect", "verb", "Meidän täytyy suojella metsiä.", "We must protect forests."),
      w("säästää", "save", "verb", "Säästämme energiaa.", "We save energy."),
      w("lajitella", "sort", "verb", "Lajittelemme jätteet.", "We sort the waste."),
      w("osallistua", "participate", "verb", "Haluan osallistua talkoisiin.", "I want to participate in the community work."),
    ], [
      { phrase: "Voimme vaikuttaa yhdessä.", translation: "We can make a difference together." },
      { phrase: "Säästetään energiaa.", translation: "Let's save energy." },
      { phrase: "Ympäristö on yhteinen vastuu.", translation: "The environment is a shared responsibility." },
      { phrase: "Osallistu paikalliseen tapahtumaan.", translation: "Participate in a local event." },
    ], [
      { speaker: "A", text: "Miten yhteisö voi suojella luontoa?", translation: "How can the community protect nature?" },
      { speaker: "B", text: "Voimme säästää energiaa ja lajitella jätteet.", translation: "We can save energy and sort waste." },
      { speaker: "A", text: "Osallistutko viikonlopun talkoisiin?", translation: "Will you participate in the community work this weekend?" },
      { speaker: "B", text: "Kyllä, se on meidän yhteinen vastuumme.", translation: "Yes, it is our shared responsibility." },
    ], { title: "Naapurusto toimii", text: "Paikallinen yhteisö päätti suojella lähimetsää. Asukkaat lajittelevat jätteitä, säästävät energiaa ja osallistuvat siivoustalkoisiin. Pienet teot vähentävät kulutuksen vaikutuksia.", translation: "The local community decided to protect the nearby forest. Residents sort waste, save energy, and participate in a clean-up. Small actions reduce the effects of consumption." }),
  ],
  B2: [
    u("u28", "Talous ja teknologia", "Arvioi teknologian vaikutuksia talouteen ja työhön.", [
      w("tuottavuus", "productivity", "noun", "Teknologia voi lisätä tuottavuutta.", "Technology can increase productivity."),
      w("investointi", "investment", "noun", "Investointi vaatii suunnittelua.", "An investment requires planning."),
      w("automaatio", "automation", "noun", "Automaatio muuttaa työelämää.", "Automation changes working life."),
      w("innovaatio", "innovation", "noun", "Innovaatio ratkaisee ongelman.", "Innovation solves a problem."),
      w("kilpailu", "competition", "noun", "Kilpailu kannustaa yrityksiä.", "Competition encourages companies."),
      w("tehostaa", "make more efficient", "verb", "Uusi ohjelma tehostaa työtä.", "The new programme makes work more efficient."),
      w("ennustaa", "predict", "verb", "Asiantuntijat ennustavat kasvua.", "Experts predict growth."),
      w("sopeutua", "adapt", "verb", "Yrityksen täytyy sopeutua muutokseen.", "The company must adapt to change."),
    ], [
      { phrase: "Teknologia muuttaa työelämää.", translation: "Technology changes working life." },
      { phrase: "Investointi voi tuoda kasvua.", translation: "An investment can bring growth." },
      { phrase: "Muutokseen täytyy sopeutua.", translation: "One must adapt to change." },
      { phrase: "Innovaatio tarvitsee rohkeutta.", translation: "Innovation requires courage." },
    ], [
      { speaker: "A", text: "Lisääkö automaatio tuottavuutta?", translation: "Does automation increase productivity?" },
      { speaker: "B", text: "Usein kyllä, mutta työtehtävät muuttuvat.", translation: "Often yes, but job tasks change." },
      { speaker: "A", text: "Miten yritykset voivat sopeutua?", translation: "How can companies adapt?" },
      { speaker: "B", text: "Investoimalla koulutukseen ja innovaatioihin.", translation: "By investing in training and innovation." },
    ], { title: "Työn uusi teknologia", text: "Automaatio ja tekoäly voivat tehostaa tuotantoa, mutta ne vaativat myös uusia taitoja. Menestyvä yritys ennustaa muutoksia, investoi ihmisiin ja sopeutuu kilpailuun.", translation: "Automation and artificial intelligence can make production more efficient, but they also require new skills. A successful company predicts changes, invests in people, and adapts to competition." }),
    u("u29", "Kulttuuri ja media", "Analysoi median, kulttuurin ja mielipiteiden suhdetta.", [
      w("näkökulma", "perspective", "noun", "Artikkeli tarjoaa uuden näkökulman.", "The article offers a new perspective."),
      w("lähde", "source", "noun", "Tarkista tiedon lähde.", "Check the source of the information."),
      w("yleisö", "audience", "noun", "Elokuva tavoitti suuren yleisön.", "The film reached a large audience."),
      w("kuvaus", "portrayal", "noun", "Kuvaus oli yksipuolinen.", "The portrayal was one-sided."),
      w("vaikuttaa", "influence", "verb", "Media vaikuttaa mielipiteisiin.", "Media influences opinions."),
      w("tulkita", "interpret", "verb", "Katsoja tulkitsee kohtauksen eri tavoin.", "The viewer interprets the scene differently."),
      w("verrata", "compare", "verb", "Voimme verrata kahta uutista.", "We can compare two news reports."),
      w("kyseenalaistaa", "question", "verb", "Lukija kyseenalaistaa väitteen.", "The reader questions the claim."),
    ], [
      { phrase: "Mikä on lähteesi?", translation: "What is your source?" },
      { phrase: "Asiaa voi tarkastella eri näkökulmista.", translation: "The matter can be viewed from different perspectives." },
      { phrase: "Media vaikuttaa keskusteluun.", translation: "Media influences the discussion." },
      { phrase: "Tämä väite täytyy kyseenalaistaa.", translation: "This claim must be questioned." },
    ], [
      { speaker: "A", text: "Voimmeko luottaa tähän uutiseen?", translation: "Can we trust this news report?" },
      { speaker: "B", text: "Tarkista ensin lähde ja kirjoittajan näkökulma.", translation: "First check the source and the author's perspective." },
      { speaker: "A", text: "Miten yleisö tulkitsee kuvauksen?", translation: "How does the audience interpret the portrayal?" },
      { speaker: "B", text: "Se riippuu kokemuksesta ja kulttuurista.", translation: "It depends on experience and culture." },
    ], { title: "Kriittinen lukija", text: "Kriittinen lukija vertaa lähteitä ja kysyy, kenen näkökulma tekstissä näkyy. Media voi vaikuttaa mielipiteisiin, joten kuvausta pitää tulkita suhteessa yleisöön ja kulttuuriin.", translation: "A critical reader compares sources and asks whose perspective appears in a text. Media can influence opinions, so a portrayal must be interpreted in relation to the audience and culture." }),
  ],
  C1: [
    u("u28", "Tutkimus ja argumentointi", "Rakenna täsmällisiä perusteluja ja arvioi tutkimustietoa.", [
      w("väite", "claim", "noun", "Väite tarvitsee perustelun.", "A claim needs justification."),
      w("todiste", "evidence", "noun", "Tutkimus tarjoaa uutta todistetta.", "The study provides new evidence."),
      w("menetelmä", "method", "noun", "Menetelmä kuvataan tarkasti.", "The method is described precisely."),
      w("oletus", "assumption", "noun", "Oletus ei aina pidä paikkaansa.", "An assumption is not always correct."),
      w("johtopäätös", "conclusion", "noun", "Johtopäätös perustuu aineistoon.", "The conclusion is based on the data."),
      w("perustella", "justify", "verb", "Tutkija perustelee valintansa.", "The researcher justifies the choice."),
      w("arvioida", "assess", "verb", "Arvioimme tulosten luotettavuutta.", "We assess the reliability of the results."),
      w("kumota", "refute", "verb", "Uusi tieto voi kumota oletuksen.", "New information can refute an assumption."),
    ], [
      { phrase: "Aineisto tukee tätä väitettä.", translation: "The data supports this claim." },
      { phrase: "Johtopäätös on alustava.", translation: "The conclusion is preliminary." },
      { phrase: "Menetelmä on kuvattava avoimesti.", translation: "The method must be described transparently." },
      { phrase: "Tätä oletusta on syytä arvioida.", translation: "This assumption should be assessed." },
    ], [
      { speaker: "A", text: "Mihin väitteesi perustuu?", translation: "What is your claim based on?" },
      { speaker: "B", text: "Aineistoon ja selkeästi kuvattuun menetelmään.", translation: "On data and a clearly described method." },
      { speaker: "A", text: "Voiko uusi tutkimus kumota sen?", translation: "Can new research refute it?" },
      { speaker: "B", text: "Voi, jos todisteet ovat luotettavia.", translation: "It can, if the evidence is reliable." },
    ], { title: "Perusteltu johtopäätös", text: "Hyvä tutkimus erottaa oletukset, väitteet ja todisteet. Menetelmän avoin kuvaus auttaa lukijaa arvioimaan tuloksia. Johtopäätös on vahva vain, jos aineisto todella tukee sitä.", translation: "Good research distinguishes assumptions, claims, and evidence. An open description of the method helps the reader assess the results. A conclusion is strong only if the data truly supports it." }),
    u("u29", "Yhteiskunta ja etiikka", "Pohdi yhteiskunnallisia valintoja ja eettistä vastuuta.", [
      w("oikeudenmukaisuus", "justice", "noun", "Oikeudenmukaisuus vaatii tasapuolisuutta.", "Justice requires fairness."),
      w("arvo", "value", "noun", "Päätös heijastaa yhteisiä arvoja.", "The decision reflects shared values."),
      w("velvollisuus", "duty", "noun", "Meillä on velvollisuus auttaa.", "We have a duty to help."),
      w("seuraus", "consequence", "noun", "Päätöksellä on pitkä seuraus.", "The decision has a long-term consequence."),
      w("eriarvoisuus", "inequality", "noun", "Eriarvoisuus näkyy palveluissa.", "Inequality appears in services."),
      w("puolustaa", "defend", "verb", "Hän puolustaa heikompia.", "She defends the vulnerable."),
      w("harkita", "consider", "verb", "Päätöstä täytyy harkita.", "The decision must be considered."),
      w("vastustaa", "oppose", "verb", "Monet vastustavat ehdotusta.", "Many oppose the proposal."),
    ], [
      { phrase: "Päätöksellä on eettisiä seurauksia.", translation: "The decision has ethical consequences." },
      { phrase: "Kaikkien ääni pitäisi kuulla.", translation: "Everyone's voice should be heard." },
      { phrase: "Asia ei ole yksinkertainen.", translation: "The matter is not simple." },
      { phrase: "Meidän täytyy punnita vaihtoehtoja.", translation: "We must weigh the alternatives." },
    ], [
      { speaker: "A", text: "Miten oikeudenmukaisuus näkyy tässä päätöksessä?", translation: "How does justice appear in this decision?" },
      { speaker: "B", text: "Se riippuu siitä, miten seuraukset jaetaan.", translation: "It depends on how the consequences are distributed." },
      { speaker: "A", text: "Mitä velvollisuuksia meillä on?", translation: "What duties do we have?" },
      { speaker: "B", text: "Meidän pitää puolustaa ihmisiä, joilla on vähemmän mahdollisuuksia.", translation: "We should defend people who have fewer opportunities." },
    ], { title: "Eettinen valinta", text: "Yhteiskunnallinen päätös heijastaa arvoja ja tuottaa seurauksia. Oikeudenmukaisuutta arvioitaessa on kuultava eri ryhmiä ja harkittava, lisääkö ratkaisu vai vähentääkö se eriarvoisuutta.", translation: "A social decision reflects values and produces consequences. When assessing justice, different groups must be heard and we must consider whether the solution increases or reduces inequality." }),
  ],
  C2: [
    u("u28", "Retoriikka ja vaikutus", "Analysoi, miten kieli rakentaa vaikutusta ja auktoriteettia.", [
      w("retoriikka", "rhetoric", "noun", "Retoriikka ohjaa yleisön huomiota.", "Rhetoric directs the audience's attention."),
      w("vakuuttavuus", "persuasiveness", "noun", "Väitteeltä puuttuu vakuuttavuus.", "The claim lacks persuasiveness."),
      w("sävy", "tone", "noun", "Sävy muuttuu kappaleen lopussa.", "The tone changes at the end of the paragraph."),
      w("vertailukohta", "point of comparison", "noun", "Vertailukohta tekee eron näkyväksi.", "A point of comparison makes the difference visible."),
      w("ennakko-oletus", "preconception", "noun", "Ennakko-oletus vaikuttaa tulkintaan.", "A preconception affects interpretation."),
      w("korostaa", "emphasise", "verb", "Kirjoittaja korostaa vastuuta.", "The writer emphasises responsibility."),
      w("vihjata", "hint", "verb", "Lause vihjaa ongelmaan.", "The sentence hints at a problem."),
      w("uudelleenmääritellä", "redefine", "verb", "Teksti uudelleenmäärittelee käsitteen.", "The text redefines the concept."),
    ], [
      { phrase: "Sävy muuttaa viestin vaikutusta.", translation: "Tone changes the impact of a message." },
      { phrase: "Kirjoittaja vihjaa enemmän kuin sanoo.", translation: "The writer hints at more than they say." },
      { phrase: "Käsite on määriteltävä uudelleen.", translation: "The concept must be redefined." },
      { phrase: "Yleisö tulkitsee viestin omista lähtökohdistaan.", translation: "The audience interprets the message from its own starting points." },
    ], [
      { speaker: "A", text: "Miksi puhe on niin vakuuttava?", translation: "Why is the speech so persuasive?" },
      { speaker: "B", text: "Se korostaa yhteisiä arvoja ja käyttää tuttua vertailukohtaa.", translation: "It emphasises shared values and uses a familiar point of comparison." },
      { speaker: "A", text: "Mitä sävy vihjaa?", translation: "What does the tone hint at?" },
      { speaker: "B", text: "Se vihjaa epäilyyn, vaikka sanat kuulostavat varmoilta.", translation: "It hints at doubt even though the words sound certain." },
    ], { title: "Sanomatta jätetty", text: "Retoriikka ei ole vain sanoja, vaan myös järjestystä, sävyä ja hiljaisuutta. Kokenut lukija tunnistaa ennakko-oletukset ja huomaa, mitä tekstissä korostetaan tai jätetään vihjausten varaan.", translation: "Rhetoric is not only words but also order, tone, and silence. An experienced reader recognises preconceptions and notices what a text emphasises or leaves to implication." }),
    u("u29", "Kieli ja tieto", "Pohdi, miten kieli rajaa, välittää ja muuttaa tietoa.", [
      w("merkitys", "meaning", "noun", "Merkitys riippuu asiayhteydestä.", "Meaning depends on context."),
      w("käsitys", "understanding", "noun", "Käsitys muuttui keskustelun jälkeen.", "The understanding changed after the discussion."),
      w("tietoisuus", "consciousness", "noun", "Kieli vaikuttaa tietoisuuteen.", "Language affects consciousness."),
      w("epäselvyys", "ambiguity", "noun", "Epäselvyys voi olla tarkoituksellista.", "Ambiguity can be intentional."),
      w("viitekehys", "framework", "noun", "Viitekehys muuttaa kysymyksen.", "The framework changes the question."),
      w("välittää", "convey", "verb", "Kuva välittää tunteen.", "The image conveys a feeling."),
      w("rajata", "limit", "verb", "Määritelmä rajaa käsitteen.", "The definition limits the concept."),
      w("tarkentaa", "specify", "verb", "Kirjoittaja tarkentaa väitettään.", "The writer specifies the claim."),
    ], [
      { phrase: "Merkitys syntyy asiayhteydessä.", translation: "Meaning arises in context." },
      { phrase: "Kieli ei ole neutraali väline.", translation: "Language is not a neutral instrument." },
      { phrase: "Tämä viitekehys muuttaa tulkintaa.", translation: "This framework changes the interpretation." },
      { phrase: "Väite vaatii tarkemman määritelmän.", translation: "The claim requires a more precise definition." },
    ], [
      { speaker: "A", text: "Voiko kieli välittää kokemuksen kokonaan?", translation: "Can language convey an experience completely?" },
      { speaker: "B", text: "Se välittää jotakin, mutta rajaa samalla vaihtoehtoja.", translation: "It conveys something but at the same time limits alternatives." },
      { speaker: "A", text: "Miksi epäselvyys joskus säilytetään?", translation: "Why is ambiguity sometimes preserved?" },
      { speaker: "B", text: "Koska se voi avata useita merkityksiä.", translation: "Because it can open several meanings." },
    ], { title: "Kielen rajat", text: "Kieli välittää tietoa, mutta se ei ole läpinäkyvä ikkuna todellisuuteen. Jokainen viitekehys korostaa joitakin merkityksiä ja rajaa toisia. Siksi tarkka tulkinta vaatii sekä käsitteitä että epävarmuuden sietoa.", translation: "Language conveys knowledge, but it is not a transparent window onto reality. Every framework highlights some meanings and limits others. Therefore precise interpretation requires both concepts and tolerance of uncertainty." }),
  ],
};
