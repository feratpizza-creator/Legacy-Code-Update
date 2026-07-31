// Additional Finnish curriculum units u30-u31 for every CEFR level.
// Content is deterministic local curriculum data; APIs are not used to generate it.

type Word = { word: string; translation: string; pos: string; example: string; exampleTranslation: string };
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

export const ADDITIONAL_FI_PART4_UNITS: Record<string, Unit[]> = {
  A0: [
    u("u30", "Keho ja vaatteet", "Nimeä kehonosia ja vaatteita.", [
      w("pää", "head", "noun", "Päätäni särkee.", "My head hurts."),
      w("käsi", "hand", "noun", "Nosta käsi.", "Raise your hand."),
      w("jalka", "foot", "noun", "Jalkani on kylmä.", "My foot is cold."),
      w("silmä", "eye", "noun", "Sulje toinen silmä.", "Close one eye."),
      w("paita", "shirt", "noun", "Paitani on sininen.", "My shirt is blue."),
      w("kenkä", "shoe", "noun", "Tämä kenkä on uusi.", "This shoe is new."),
      w("hattu", "hat", "noun", "Käytän hattua.", "I wear a hat."),
      w("takki", "coat", "noun", "Takki on lämmin.", "The coat is warm."),
    ], [
      { phrase: "Pese kätesi.", translation: "Wash your hands." },
      { phrase: "Missä kenkäni on?", translation: "Where is my shoe?" },
      { phrase: "Tarvitsen lämpimän takin.", translation: "I need a warm coat." },
      { phrase: "Avaa silmäsi.", translation: "Open your eyes." },
    ], [
      { speaker: "A", text: "Oletko valmis lähtemään?", translation: "Are you ready to go?" },
      { speaker: "B", text: "Melkein. Tarvitsen kengät ja takin.", translation: "Almost. I need my shoes and coat." },
      { speaker: "A", text: "Hattusi on tuolilla.", translation: "Your hat is on the chair." },
      { speaker: "B", text: "Kiitos!", translation: "Thank you!" },
    ], { title: "Pukeutuminen", text: "Ulkona on kylmä. Puen paidan, kengät ja lämpimän takin. Käytän myös hattua ennen kuin lähden kotoa.", translation: "It is cold outside. I put on my shirt, shoes, and warm coat. I also wear a hat before I leave home." }),
    u("u31", "Paikkoja ympärillämme", "Tunnista tavallisia paikkoja kaupungissa.", [
      w("puisto", "park", "noun", "Lapset leikkivät puistossa.", "The children play in the park."),
      w("kauppa", "shop", "noun", "Kauppa on auki.", "The shop is open."),
      w("koulu", "school", "noun", "Kouluni on lähellä.", "My school is nearby."),
      w("kirjasto", "library", "noun", "Luemme kirjastossa.", "We read in the library."),
      w("asema", "station", "noun", "Asema on vilkas.", "The station is busy."),
      w("sairaala", "hospital", "noun", "Sairaala on suuri.", "The hospital is large."),
      w("katu", "street", "noun", "Katumme on rauhallinen.", "Our street is quiet."),
      w("koti", "home", "noun", "Menen kotiin.", "I am going home."),
    ], [
      { phrase: "Missä puisto on?", translation: "Where is the park?" },
      { phrase: "Kirjasto on koulun lähellä.", translation: "The library is near the school." },
      { phrase: "Olen kotona.", translation: "I am at home." },
      { phrase: "Ylitä katu varovasti.", translation: "Cross the street carefully." },
    ], [
      { speaker: "A", text: "Minne olet menossa?", translation: "Where are you going?" },
      { speaker: "B", text: "Menen kirjastoon.", translation: "I am going to the library." },
      { speaker: "A", text: "Onko se aseman lähellä?", translation: "Is it near the station?" },
      { speaker: "B", text: "Kyllä, se on tällä kadulla.", translation: "Yes, it is on this street." },
    ], { title: "Kaupungissamme", text: "Kaupungissamme on koulu, kirjasto ja puisto. Kauppa on rauhallisella kadulla kotimme lähellä. Asema on aamulla vilkas.", translation: "Our town has a school, a library, and a park. The shop is on a quiet street near our home. The station is busy in the morning." }),
  ],
  A1: [
    u("u30", "Sää ja vaatteet", "Kerro säästä ja valitse sopivat vaatteet.", [
      w("aurinkoinen", "sunny", "adjective", "Tänään on aurinkoista.", "It is sunny today."),
      w("pilvinen", "cloudy", "adjective", "Taivas on pilvinen.", "The sky is cloudy."),
      w("sateinen", "rainy", "adjective", "Ulkona on sateista.", "It is rainy outside."),
      w("tuulinen", "windy", "adjective", "On hyvin tuulista.", "It is very windy."),
      w("sateenvarjo", "umbrella", "noun", "Ota sateenvarjo.", "Take an umbrella."),
      w("huivi", "scarf", "noun", "Käytän huivia talvella.", "I wear a scarf in winter."),
      w("käsineet", "gloves", "noun", "Käsineeni ovat lämpimät.", "My gloves are warm."),
      w("saappaat", "boots", "noun", "Nämä saappaat ovat vedenpitävät.", "These boots are waterproof."),
    ], [
      { phrase: "Millainen sää on?", translation: "What is the weather like?" },
      { phrase: "Myöhemmin voi sataa.", translation: "It might rain later." },
      { phrase: "Laita lämmin huivi.", translation: "Wear your warm scarf." },
      { phrase: "Tänään tuulee kovaa.", translation: "The wind is strong today." },
    ], [
      { speaker: "A", text: "Pitäisikö minun ottaa sateenvarjo?", translation: "Should I take an umbrella?" },
      { speaker: "B", text: "Kyllä, taivas on pilvinen.", translation: "Yes, the sky is cloudy." },
      { speaker: "A", text: "On myös hyvin tuulista.", translation: "It is also very windy." },
      { speaker: "B", text: "Sitten laita saappaatkin.", translation: "Then wear your boots too." },
    ], { title: "Sään muutos", text: "Aamulla on aurinkoista, mutta iltapäivällä tulee tummia pilviä. Otan sateenvarjon ja laitan saappaat, koska sadetta odotetaan.", translation: "The morning is sunny, but dark clouds arrive in the afternoon. I take an umbrella and wear my boots because rain is expected." }),
    u("u31", "Julkinen liikenne", "Käytä helppoa kieltä bussilla ja junalla matkustaessasi.", [
      w("bussi", "bus", "noun", "Bussi saapuu kahdeksalta.", "The bus arrives at eight."),
      w("juna", "train", "noun", "Junamme on myöhässä.", "Our train is late."),
      w("laituri", "platform", "noun", "Juna lähtee laiturilta kolme.", "The train leaves from platform three."),
      w("pysäkki", "stop", "noun", "Jää pois seuraavalla pysäkillä.", "Get off at the next stop."),
      w("matka", "journey", "noun", "Matka kestää tunnin.", "The journey takes an hour."),
      w("kuljettaja", "driver", "noun", "Pyydä kuljettajalta apua.", "Ask the driver for help."),
      w("kartta", "map", "noun", "Katso karttaa.", "Look at the map."),
      w("saapua", "arrive", "verb", "Saavumme ennen puoltapäivää.", "We arrive before noon."),
    ], [
      { phrase: "Mikä bussi menee keskustaan?", translation: "Which bus goes to the centre?" },
      { phrase: "Missä laituri kolme on?", translation: "Where is platform three?" },
      { phrase: "Juna on kymmenen minuuttia myöhässä.", translation: "The train is ten minutes late." },
      { phrase: "Jää pois seuraavalla pysäkillä.", translation: "Get off at the next stop." },
    ], [
      { speaker: "A", text: "Meneekö tämä bussi keskustaan?", translation: "Does this bus go to the centre?" },
      { speaker: "B", text: "Kyllä, mutta jää pois seuraavalla pysäkillä.", translation: "Yes, but get off at the next stop." },
      { speaker: "A", text: "Kuinka pitkä matka on?", translation: "How long is the journey?" },
      { speaker: "B", text: "Noin kaksikymmentä minuuttia.", translation: "About twenty minutes." },
    ], { title: "Kaupungin halki", text: "Menen bussilla asemalle ja vaihdan sitten junaan. Katson karttaa ja kuuntelen seuraavaa pysäkkiä. Matka on helppo, kun suunnittelen etukäteen.", translation: "I take the bus to the station and then change to a train. I check the map and listen for the next stop. The journey is simple when I plan ahead." }),
  ],
  A2: [
    u("u30", "Päätösten tekeminen", "Selitä valintoja, syitä ja mahdollisia tuloksia.", [
      w("valinta", "choice", "noun", "Tämä oli vaikea valinta.", "This was a difficult choice."),
      w("syy", "reason", "noun", "Mikä on muutoksen syy?", "What is the reason for the change?"),
      w("tulos", "result", "noun", "Tulos yllätti kaikki.", "The result surprised everyone."),
      w("vaihtoehto", "option", "noun", "Meillä on kaksi vaihtoehtoa.", "We have two options."),
      w("verrata", "compare", "verb", "Vertaa hintoja ensin.", "Compare the prices first."),
      w("valita", "choose", "verb", "Valitsin halvemman vaihtoehdon.", "I chose the cheaper option."),
      w("välttää", "avoid", "verb", "Meidän pitäisi välttää turhaa jätettä.", "We should avoid unnecessary waste."),
      w("parantaa", "improve", "verb", "Tämä suunnitelma voi parantaa rutiiniamme.", "This plan can improve our routine."),
    ], [
      { phrase: "Vaihtoehtoja on useita.", translation: "There are several options." },
      { phrase: "Tästä syystä olen samaa mieltä.", translation: "For this reason, I agree." },
      { phrase: "Verrataan tuloksia.", translation: "Let us compare the results." },
      { phrase: "Valitsin tämän, koska se on käytännöllinen.", translation: "I chose this option because it is practical." },
    ], [
      { speaker: "A", text: "Minkä vaihtoehdon valitsemme?", translation: "Which option should we choose?" },
      { speaker: "B", text: "Verrataan kustannuksia ja tulosta.", translation: "Let us compare the cost and the result." },
      { speaker: "A", text: "Pidän ensimmäisestä vaihtoehdosta.", translation: "I prefer the first option." },
      { speaker: "B", text: "Olen samaa mieltä, koska sitä on helpompi parantaa.", translation: "I agree because it is easier to improve." },
    ], { title: "Käytännöllinen valinta", text: "Ennen päätöstä vertaan vaihtoehtoja ja ajattelen mahdollista tulosta. Hyvällä valinnalla on selkeä syy, ja se auttaa meitä kehittymään.", translation: "Before making a decision, I compare the options and think about the possible result. A good choice has a clear reason and helps us improve." }),
    u("u31", "Tarinoita ja muistoja", "Kuvaile tärkeitä tapahtumia ja omia kokemuksia.", [
      w("muisto", "memory", "noun", "Tuo muisto saa minut hymyilemään.", "That memory makes me smile."),
      w("tapahtuma", "event", "noun", "Tapahtuma järjestettiin kesäkuussa.", "The event took place in June."),
      w("hetki", "moment", "noun", "Se oli tärkeä hetki.", "It was an important moment."),
      w("yllätys", "surprise", "noun", "Juhla oli yllätys.", "The party was a surprise."),
      w("tapahtua", "happen", "verb", "Mitä eilen tapahtui?", "What happened yesterday?"),
      w("muistaa", "remember", "verb", "Muistan paikan selvästi.", "I remember the place clearly."),
      w("juhlia", "celebrate", "verb", "Juhlimme hänen syntymäpäiväänsä.", "We celebrated her birthday."),
      w("kuulua", "belong", "verb", "Tämä kuva kuuluu isoäidilleni.", "This photo belongs to my grandmother."),
    ], [
      { phrase: "En unohda sitä päivää koskaan.", translation: "I will never forget that day." },
      { phrase: "Se tapahtui kauan sitten.", translation: "It happened a long time ago." },
      { phrase: "Tämä kuva palauttaa muistoja.", translation: "This photo brings back memories." },
      { phrase: "Juhlimme yhdessä.", translation: "We celebrated together." },
    ], [
      { speaker: "A", text: "Mikä on lempimuistosi?", translation: "What is your favourite memory?" },
      { speaker: "B", text: "Se on päivä, jolloin muutimme uuteen kotiin.", translation: "It is the day we moved to our new home." },
      { speaker: "A", text: "Mitä silloin tapahtui?", translation: "What happened then?" },
      { speaker: "B", text: "Juhlimme kaikkien ystäviemme kanssa.", translation: "We celebrated with all our friends." },
    ], { title: "Erityinen päivä", text: "Yksi selkeimmistä muistoistani on perhejuhla. Sinä päivänä tapahtui monia pieniä asioita, mutta tärkeintä oli yhdessäolo.", translation: "One of my clearest memories is a family celebration. Many small things happened that day, but the most important moment was being together." }),
  ],
  B1: [
    u("u30", "Ongelman ratkaiseminen", "Keskustele ongelmista, syistä ja käytännön ratkaisuista.", [
      w("ongelma", "problem", "noun", "Meidän täytyy ratkaista tämä ongelma.", "We need to solve this problem."),
      w("syy", "cause", "noun", "Syy on vielä tuntematon.", "The cause is still unknown."),
      w("ratkaisu", "solution", "noun", "He löysivät yksinkertaisen ratkaisun.", "They found a simple solution."),
      w("riski", "risk", "noun", "Jokaiseen suunnitelmaan liittyy riski.", "Every plan has some risk."),
      w("haaste", "challenge", "noun", "Kielen oppiminen on haaste.", "Learning a language is a challenge."),
      w("tunnistaa", "identify", "verb", "Tunnista ensin tärkein syy.", "First identify the main cause."),
      w("ehdottaa", "suggest", "verb", "Voitko ehdottaa ratkaisua?", "Can you suggest a solution?"),
      w("estää", "prevent", "verb", "Hyvä suunnittelu voi estää viivästyksiä.", "Good planning can prevent delays."),
    ], [
      { phrase: "Tarvitsemme pitkän aikavälin ratkaisun.", translation: "We need a long-term solution." },
      { phrase: "Pääsyy ei ole selvä.", translation: "The main cause is unclear." },
      { phrase: "Tämä voisi estää tulevia ongelmia.", translation: "This could prevent future problems." },
      { phrase: "Harkitaan riskejä.", translation: "Let us consider the risks." },
    ], [
      { speaker: "A", text: "Mikä aiheutti viivästyksen?", translation: "What caused the delay?" },
      { speaker: "B", text: "Emme ole vielä tunnistaneet syytä.", translation: "We have not identified the cause yet." },
      { speaker: "A", text: "Voitko ehdottaa ratkaisua?", translation: "Can you suggest a solution?" },
      { speaker: "B", text: "Voimme muuttaa aikataulua estääksemme uuden viivästyksen.", translation: "We can change the schedule to prevent another delay." },
    ], { title: "Eteenpäin", text: "Kun ongelma ilmestyy, tiimin pitäisi tunnistaa sen syy ennen ratkaisun valitsemista. Selkeä viestintä vähentää riskiä ja helpottaa tulevia haasteita.", translation: "When a problem appears, a team should identify its cause before choosing a solution. Clear communication reduces risk and makes future challenges easier to manage." }),
    u("u31", "Kulttuuri ja identiteetti", "Puhu perinteistä, identiteetistä ja kulttuurien kohtaamisesta.", [
      w("perinne", "tradition", "noun", "Tämä perinne on yli sata vuotta vanha.", "This tradition is over a hundred years old."),
      w("identiteetti", "identity", "noun", "Kieli on osa identiteettiä.", "Language is part of identity."),
      w("tapa", "custom", "noun", "Jokaisella alueella on omat tapansa.", "Every region has its own customs."),
      w("perintö", "heritage", "noun", "Rakennus kuuluu kulttuuriperintöömme.", "The building is part of our heritage."),
      w("yhteisö", "community", "noun", "Yhteisö toivottaa vieraat tervetulleiksi.", "The community welcomes visitors."),
      w("säilyttää", "preserve", "verb", "Museot säilyttävät tärkeitä esineitä.", "Museums preserve important objects."),
      w("vaikuttaa", "influence", "verb", "Matkustaminen voi vaikuttaa ajatuksiimme.", "Travel can influence our ideas."),
      w("sopeutua", "adapt", "verb", "Perinteet sopeutuvat ajan myötä.", "Traditions adapt over time."),
    ], [
      { phrase: "Kulttuuri muuttuu ajan myötä.", translation: "Culture changes over time." },
      { phrase: "Yhteisö jakaa tämän tavan.", translation: "This custom is shared by the community." },
      { phrase: "Meidän pitäisi säilyttää perintömme.", translation: "We should preserve our heritage." },
      { phrase: "Kohtaaminen lisää ymmärrystä.", translation: "Exchange creates understanding." },
    ], [
      { speaker: "A", text: "Miten matkustaminen vaikuttaa identiteettiin?", translation: "How does travel affect identity?" },
      { speaker: "B", text: "Se voi tuoda uusia ajatuksia poistamatta vanhoja perinteitä.", translation: "It can add new ideas without removing old traditions." },
      { speaker: "A", text: "Voivatko perinteet sopeutua?", translation: "Can traditions adapt?" },
      { speaker: "B", text: "Kyllä, jos yhteisö ymmärtää niiden arvon.", translation: "Yes, if the community understands their value." },
    ], { title: "Yhteinen perintö", text: "Kulttuuri ei ole muuttumaton. Perinteet muuttuvat, kun yhteisöt kohtaavat, matkustavat ja vaihtavat ajatuksia. Perinnön säilyttäminen auttaa ymmärtämään alkuperää ja pysymään avoimena muutokselle.", translation: "Culture is not fixed. Traditions change as communities meet, travel, and exchange ideas. Preserving heritage can help people understand where they come from while remaining open to change." }),
  ],
  B2: [
    u("u30", "Tiede ja todisteet", "Keskustele tieteellisistä ajatuksista, todisteista ja epävarmuudesta.", [
      w("hypoteesi", "hypothesis", "noun", "Tutkijat testasivat uuden hypoteesin.", "The researchers tested a new hypothesis."),
      w("todiste", "evidence", "noun", "Todisteet tukevat teoriaa.", "The evidence supports the theory."),
      w("koe", "experiment", "noun", "Koe kesti kolme viikkoa.", "The experiment lasted three weeks."),
      w("teoria", "theory", "noun", "Teoria selittää tulokset.", "The theory explains the results."),
      w("malli", "pattern", "noun", "Aineisto näyttää selvän mallin.", "The data shows a clear pattern."),
      w("havaita", "observe", "verb", "Tutkijat havaitsevat muutoksia tarkasti.", "Scientists observe changes carefully."),
      w("mitata", "measure", "verb", "Meidän täytyy mitata vaikutus.", "We need to measure the effect."),
      w("arvioida", "estimate", "verb", "Asiantuntijat arvioivat kustannukset.", "Experts estimate the cost."),
    ], [
      { phrase: "Todisteet ovat rajalliset.", translation: "The evidence is limited." },
      { phrase: "Lisätutkimusta tarvitaan.", translation: "Further research is needed." },
      { phrase: "Tulokset viittaavat malliin.", translation: "The results suggest a pattern." },
      { phrase: "Epävarmuutta ei pidä sivuuttaa.", translation: "We should not ignore uncertainty." },
    ], [
      { speaker: "A", text: "Todistaako koe teorian?", translation: "Does the experiment prove the theory?" },
      { speaker: "B", text: "Se tarjoaa todisteita, mutta lisätestejä tarvitaan.", translation: "It provides evidence, but more tests are needed." },
      { speaker: "A", text: "Minkä mallin he havaitsivat?", translation: "What pattern did they observe?" },
      { speaker: "B", text: "Vaikutus kasvoi, kun lämpötila muuttui.", translation: "The effect increased when the temperature changed." },
    ], { title: "Todisteiden lukeminen", text: "Tieteelliset johtopäätökset perustuvat huolelliseen havainnointiin ja mittaamiseen. Yksi koe voi viitata malliin, mutta luotettava tieto vaatii yleensä toistuvia testejä ja epävarmuuden rehellistä huomioimista.", translation: "Scientific conclusions depend on careful observation and measurement. A single experiment may suggest a pattern, but reliable knowledge usually requires repeated tests and honest attention to uncertainty." }),
    u("u31", "Liiketoiminta ja neuvottelu", "Käytä täsmällistä kieltä sopimuksista ja kompromisseista.", [
      w("sopimus", "agreement", "noun", "Molemmat osapuolet allekirjoittivat sopimuksen.", "Both sides signed the agreement."),
      w("ehdotus", "proposal", "noun", "Ehdotus sisältää kolme vaihetta.", "The proposal includes three stages."),
      w("budjetti", "budget", "noun", "Hanke pysyy budjetissa.", "The project is within budget."),
      w("prioriteetti", "priority", "noun", "Turvallisuus on tärkein prioriteettimme.", "Safety is our first priority."),
      w("hyöty", "benefit", "noun", "Muutos tarjoaa useita hyötyjä.", "The change offers several benefits."),
      w("neuvotella", "negotiate", "verb", "He neuvottelivat paremman hinnan.", "They negotiated a better price."),
      w("kompromissi", "compromise", "noun", "Tarvitsemme kompromissin edetäksemme.", "We need a compromise to move forward."),
      w("toimittaa", "deliver", "verb", "Tiimi toimittaa raportin perjantaina.", "The team will deliver the report Friday."),
    ], [
      { phrase: "Tarkastellaan ehdotusta.", translation: "Let us review the proposal." },
      { phrase: "Tämä on tärkein prioriteettimme.", translation: "This is our main priority." },
      { phrase: "Olemme valmiita kompromissiin.", translation: "We are willing to compromise." },
      { phrase: "Sopimus hyödyttää molempia osapuolia.", translation: "The agreement benefits both sides." },
    ], [
      { speaker: "A", text: "Pysymmekö budjetissa?", translation: "Can we meet the budget?" },
      { speaker: "B", text: "Kyllä, jos muutamme toimituspäivää.", translation: "Yes, if we change the delivery date." },
      { speaker: "A", text: "Se ei ole ensimmäinen valintamme.", translation: "That is not our first choice." },
      { speaker: "B", text: "Sitten meidän on neuvoteltava kompromissi.", translation: "Then we need to negotiate a compromise." },
    ], { title: "Reilu sopimus", text: "Onnistunut neuvottelu alkaa selkeistä prioriteeteista. Osapuolet kertovat tarpeistaan, tarkastelevat hyötyjä ja etsivät kompromissia, joka voidaan toteuttaa käytettävissä olevalla budjetilla.", translation: "Successful negotiation begins with clear priorities. Each side explains its needs, reviews the benefits, and looks for a compromise that can be delivered within the available budget." }),
  ],
  C1: [
    u("u30", "Julkinen politiikka", "Analysoi, miten politiikka vastaa yhteiskunnallisiin ongelmiin.", [
      w("politiikka", "policy", "noun", "Uusi politiikka keskittyy joukkoliikenteeseen.", "The new policy targets public transport."),
      w("sääntely", "regulation", "noun", "Sääntely suojelee kuluttajia.", "The regulation protects consumers."),
      w("täytäntöönpano", "implementation", "noun", "Täytäntöönpano kestää useita vuosia.", "Implementation will take several years."),
      w("sidosryhmä", "stakeholder", "noun", "Jokainen sidosryhmä kutsuttiin keskusteluun.", "Every stakeholder was invited to the discussion."),
      w("vaikutus", "impact", "noun", "Vaikutusta on vaikea ennustaa.", "The impact is difficult to predict."),
      w("kohdentaa", "allocate", "verb", "Kaupunki kohdisti varoja kouluille.", "The city allocated funds to schools."),
      w("arvioida", "evaluate", "verb", "Meidän täytyy arvioida politiikkaa oikeudenmukaisesti.", "We must evaluate the policy fairly."),
      w("priorisoida", "prioritise", "verb", "Hallitusten täytyy priorisoida haavoittuvia ryhmiä.", "Governments must prioritise vulnerable groups."),
    ], [
      { phrase: "Politiikalla on tahattomia seurauksia.", translation: "The policy has unintended consequences." },
      { phrase: "Täytäntöönpano vaatii yleistä luottamusta.", translation: "Implementation requires public trust." },
      { phrase: "Meidän on arvioitava pitkän aikavälin vaikutus.", translation: "We need to evaluate its long-term impact." },
      { phrase: "Kaikkia sidosryhmiä pitäisi kuulla.", translation: "All stakeholders should be consulted." },
    ], [
      { speaker: "A", text: "Kenen pitäisi arvioida uusi politiikka?", translation: "Who should evaluate the new policy?" },
      { speaker: "B", text: "Riippumattomien tutkijoiden ja vaikutuspiirissä olevien yhteisöjen.", translation: "Independent researchers and affected communities." },
      { speaker: "A", text: "Mikä on suurin riski?", translation: "What is the main risk?" },
      { speaker: "B", text: "Täytäntöönpano voi unohtaa haavoittuvat ryhmät.", translation: "Implementation may overlook vulnerable groups." },
    ], { title: "Politiikka käytännössä", text: "Hyvin suunniteltu politiikka voi silti epäonnistua täytäntöönpanossa. Sen vaikutusta pitäisi arvioida luotettavien todisteiden avulla ja kuulemalla päätöksestä eniten kärsiviä ihmisiä ja järjestöjä.", translation: "A well-designed policy can still fail during implementation. Its impact should be evaluated with reliable evidence and with input from the people and organisations most affected by the decision." }),
    u("u31", "Tutkimus ja tulkinta", "Keskustele siitä, miten todisteita tulkitaan akateemisessa työssä.", [
      w("tulkinta", "interpretation", "noun", "Tulokset sallivat useita tulkintoja.", "The results allow several interpretations."),
      w("viitekehys", "framework", "noun", "Viitekehys muovaa analyysiä.", "The framework shapes the analysis."),
      w("rajoitus", "limitation", "noun", "Tutkimus tunnustaa rajoituksensa.", "The study acknowledges its limitations."),
      w("luotettavuus", "reliability", "noun", "Mittauksen luotettavuus on epävarma.", "The reliability of the measure is uncertain."),
      w("asiayhteys", "context", "noun", "Asiayhteys muuttaa löydön merkitystä.", "Context changes the meaning of the finding."),
      w("erottaa", "distinguish", "verb", "Meidän täytyy erottaa fakta tulkinnasta.", "We must distinguish fact from interpretation."),
      w("päätellä", "infer", "verb", "Lukijat voivat päätellä toisenlaisen motiivin.", "Readers may infer a different motive."),
      w("rajata", "qualify", "verb", "Tekijä rajaa vahvinta väitettä.", "The author qualifies the strongest claim."),
    ], [
      { phrase: "Löydöt täytyy tulkita asiayhteydessä.", translation: "The findings must be interpreted in context." },
      { phrase: "Todisteet eivät tue yksinkertaista johtopäätöstä.", translation: "The evidence does not support a simple conclusion." },
      { phrase: "Tekijä rajaa väitettä.", translation: "The author qualifies the claim." },
      { phrase: "Useita tulkintoja on edelleen mahdollisia.", translation: "Several interpretations remain possible." },
    ], [
      { speaker: "A", text: "Miksi tutkijat rajaavat johtopäätöstään?", translation: "Why do the researchers qualify their conclusion?" },
      { speaker: "B", text: "Koska todisteilla on tärkeitä rajoituksia.", translation: "Because the evidence has important limitations." },
      { speaker: "A", text: "Voiko viitekehys vaikuttaa tulkintaan?", translation: "Can the framework affect interpretation?" },
      { speaker: "B", text: "Kyllä, erityisesti kun asiayhteys on monimutkainen.", translation: "Yes, especially when the context is complex." },
    ], { title: "Ensimmäisen lukemisen jälkeen", text: "Akateeminen tulkinta vaatii muutakin kuin todisteiden keräämistä. Tutkijoiden täytyy selittää viitekehys, tunnustaa rajoitukset ja erottaa datan osoittama asia siitä, mitä lukijat päättelevät.", translation: "Academic interpretation requires more than collecting evidence. Researchers must explain the framework, acknowledge limitations, and distinguish what the data shows from what readers infer." }),
  ],
  C2: [
    u("u30", "Kielifilosofia", "Tutki sanojen, merkityksen ja asiayhteyden yhteyttä.", [
      w("merkitys", "meaning", "noun", "Merkitys riippuu asiayhteydestä.", "Meaning depends on context."),
      w("viittaus", "reference", "noun", "Viittaus ei ole heti selvä.", "The reference is not immediately clear."),
      w("monitulkintaisuus", "ambiguity", "noun", "Monitulkintaisuus voi olla hyödyllistä.", "Ambiguity can be productive."),
      w("tarkoitus", "intention", "noun", "Puhujan tarkoitus on tärkeä.", "The speaker's intention matters."),
      w("asiayhteys", "context", "noun", "Asiayhteys rajaa mahdollisia merkityksiä.", "Context narrows possible meanings."),
      w("vihjata", "imply", "verb", "Lause vihjaa kritiikkiin.", "The phrase implies a criticism."),
      w("tarkoittaa", "denote", "verb", "Symboli tarkoittaa tiettyä ideaa.", "The symbol denotes a specific idea."),
      w("tulkita uudelleen", "reinterpret", "verb", "Myöhemmät lukijat tulkitsevat tekstin uudelleen.", "Later readers reinterpret the text."),
    ], [
      { phrase: "Asiayhteys muovaa merkitystä.", translation: "Meaning is shaped by context." },
      { phrase: "Sanamuoto jättää tilaa tulkinnalle.", translation: "The wording leaves room for interpretation." },
      { phrase: "Puhuja vihjaa enemmän kuin sanoo.", translation: "The speaker implies more than they state." },
      { phrase: "Viittaus ei ole aina vakaa.", translation: "Reference is not always stable." },
    ], [
      { speaker: "A", text: "Onko lauseella yksi merkitys?", translation: "Does the sentence have one meaning?" },
      { speaker: "B", text: "Ei välttämättä; asiayhteys ja tarkoitus muuttavat sitä.", translation: "Not necessarily; context and intention change it." },
      { speaker: "A", text: "Mitä viimeinen lause vihjaa?", translation: "What does the final phrase imply?" },
      { speaker: "B", text: "Se vihjaa kritiikkiin sanomatta sitä suoraan.", translation: "It implies a criticism without stating it directly." },
    ], { title: "Sanat asiayhteydessä", text: "Kieli välittää merkitystä sanojen, suhteiden ja tilanteiden kautta. Taitava lukija huomaa, mitä lause tarkoittaa, mitä se vihjaa ja miten myöhempi asiayhteys voi tulkita sen uudelleen.", translation: "Language carries meaning through words, relationships, and situations. A skilled reader notices what a sentence denotes, what it implies, and how a later context may reinterpret it." }),
    u("u31", "Globaalit haasteet", "Keskustele monimutkaisista kansainvälisistä ongelmista ja vastauksista.", [
      w("syrjäytyminen", "displacement", "noun", "Syrjäytyminen vaikuttaa kokonaisiin yhteisöihin.", "Displacement affects entire communities."),
      w("resilienssi", "resilience", "noun", "Yhteisö osoitti huomattavaa resilienssiä.", "The community showed remarkable resilience."),
      w("eriarvoisuus", "inequality", "noun", "Globaalilla eriarvoisuudella on monia syitä.", "Global inequality has many causes."),
      w("yhteistyö", "cooperation", "noun", "Kansainvälinen yhteistyö on välttämätöntä.", "International cooperation is essential."),
      w("vastuuvelvollisuus", "accountability", "noun", "Julkinen vastuuvelvollisuus lisää luottamusta.", "Public accountability builds trust."),
      w("lieventää", "mitigate", "verb", "Ohjelma pyrkii lieventämään haittaa.", "The programme aims to mitigate harm."),
      w("koordinoida", "coordinate", "verb", "Useat virastot koordinoivat vastaustaan.", "Several agencies coordinate their response."),
      w("sovittaa yhteen", "reconcile", "verb", "Meidän täytyy sovittaa kasvu yhteen kestävyyden kanssa.", "We must reconcile growth with sustainability."),
    ], [
      { phrase: "Kriisi vaatii koordinoidun vastauksen.", translation: "The crisis requires a coordinated response." },
      { phrase: "Pitkän aikavälin resilienssi vaatii investointeja.", translation: "Long-term resilience takes investment." },
      { phrase: "Kasvu täytyy sovittaa yhteen kestävyyden kanssa.", translation: "Growth must be reconciled with sustainability." },
      { phrase: "Vastuuvelvollisuus ei voi olla valinnaista.", translation: "Accountability cannot be optional." },
    ], [
      { speaker: "A", text: "Voiko yksi maa ratkaista tämän ongelman yksin?", translation: "Can one country solve this problem alone?" },
      { speaker: "B", text: "Ei. Yhteistyötä tarvitaan haitan lieventämiseksi.", translation: "No. Cooperation is needed to mitigate the harm." },
      { speaker: "A", text: "Miten instituutiot voivat rakentaa luottamusta?", translation: "How can institutions build trust?" },
      { speaker: "B", text: "Läpinäkyvyydellä, koordinoinnilla ja vastuuvelvollisuudella.", translation: "Through transparency, coordination, and accountability." },
    ], { title: "Yhteinen vastuu", text: "Globaalit haasteet ylittävät rajat, eikä niillä yleensä ole yhtä syytä. Kestävät vastaukset yhdistävät kansainvälisen yhteistyön, julkisen vastuuvelvollisuuden ja politiikan, joka sovittaa ihmisten tarpeet ympäristön rajoihin.", translation: "Global challenges cross borders and rarely have a single cause. Durable responses combine international cooperation, public accountability, and policies that reconcile human needs with environmental limits." }),
  ],
};
