// Additional Finnish curriculum units u36-u37 for every CEFR level.
// Deterministic local curriculum data; APIs may enrich it but never generate it.
type Word = { word: string; translation: string; pos: string; example: string; exampleTranslation: string };
type Unit = { id: string; title: string; description: string; words: Word[]; phrases: { phrase: string; translation: string }[]; dialogue: { speaker: string; text: string; translation: string }[]; reading: { title: string; text: string; translation: string } };
const w = (word: string, translation: string, pos: string, example: string, exampleTranslation: string): Word => ({ word, translation, pos, example, exampleTranslation });
const u = (id: string, title: string, description: string, words: Word[]): Unit => ({
  id, title, description, words,
  phrases: words.slice(0, 4).map((item) => ({ phrase: item.example, translation: item.exampleTranslation })),
  dialogue: [0, 1, 2, 3].map((index) => ({ speaker: index % 2 === 0 ? "A" : "B", text: words[index]!.example, translation: words[index]!.exampleTranslation })),
  reading: { title, text: words.slice(0, 4).map((item) => item.example).join(" "), translation: words.slice(0, 4).map((item) => item.exampleTranslation).join(" ") },
});

export const ADDITIONAL_FI_PART7_UNITS: Record<string, Unit[]> = {
  A0: [
    u("u36", "Koulu ja luokka", "Nimeä luokan esineitä ja puhu koulusta.", [
      w("koulu", "school", "noun", "Koulu alkaa maanantaina.", "School starts on Monday."), w("luokka", "classroom", "noun", "Luokka on valoisa.", "The classroom is bright."), w("kynä", "pen", "noun", "Kynä on pöydällä.", "The pen is on the table."), w("paperi", "paper", "noun", "Paperi on valkoinen.", "The paper is white."), w("opettaja", "teacher", "noun", "Opettaja puhuu hitaasti.", "The teacher speaks slowly."), w("oppilas", "pupil", "noun", "Oppilas lukee kirjaa.", "The pupil reads a book."), w("oppia", "learn", "verb", "Haluan oppia suomea.", "I want to learn Finnish."), w("kirjoittaa", "write", "verb", "Kirjoitan nimeni.", "I write my name."),
    ]),
    u("u37", "Keho ja terveys", "Nimeä kehon osia ja kerro yksinkertaisista tuntemuksista.", [
      w("pää", "head", "noun", "Pääni on kipeä.", "My head hurts."), w("silmä", "eye", "noun", "Silmä on sininen.", "The eye is blue."), w("käsi", "hand", "noun", "Pese kädet.", "Wash your hands."), w("jalka", "leg", "noun", "Jalka on vahva.", "The leg is strong."), w("suu", "mouth", "noun", "Avaa suu.", "Open your mouth."), w("kipu", "pain", "noun", "Minulla on kipua.", "I have pain."), w("levätä", "rest", "verb", "Minun pitää levätä.", "I need to rest."), w("hengittää", "breathe", "verb", "Hengitä rauhallisesti.", "Breathe calmly."),
    ]),
  ],
  A1: [
    u("u36", "Sää ja vuodenajat", "Kuvaile säätä ja suunnittele päivän tekemistä.", [
      w("kevät", "spring", "noun", "Kevät alkaa pian.", "Spring begins soon."), w("kesä", "summer", "noun", "Kesä on lämmin.", "Summer is warm."), w("syksy", "autumn", "noun", "Syksyllä lehdet putoavat.", "In autumn the leaves fall."), w("talvi", "winter", "noun", "Talvi on kylmä.", "Winter is cold."), w("lumi", "snow", "noun", "Lumi peittää tien.", "Snow covers the road."), w("tuuli", "wind", "noun", "Tuuli on voimakas.", "The wind is strong."), w("paistaa", "shine", "verb", "Aurinko paistaa.", "The sun is shining."), w("varautua", "prepare", "verb", "Varaudumme sateeseen.", "We prepare for rain."),
    ]),
    u("u37", "Lääkäri ja ajanvaraus", "Varaa aika ja kuvaile tavallisia terveysongelmia.", [
      w("aika", "appointment", "noun", "Tarvitsen lääkäriajan.", "I need a doctor's appointment."), w("vastaanotto", "reception", "noun", "Vastaanotto alkaa kahdeksalta.", "The reception opens at eight."), w("potilas", "patient", "noun", "Potilas odottaa huoneessa.", "The patient waits in the room."), w("oire", "symptom", "noun", "Oire alkoi eilen.", "The symptom started yesterday."), w("lääke", "medicine", "noun", "Lääke auttaa kipuun.", "The medicine helps with the pain."), w("kuume", "fever", "noun", "Minulla on kuume.", "I have a fever."), w("varata", "book", "verb", "Haluan varata ajan.", "I want to book an appointment."), w("parantua", "get better", "verb", "Toivon parantuvani pian.", "I hope to get better soon."),
    ]),
  ],
  A2: [
    u("u36", "Asuminen ja naapurusto", "Kuvaile asuntoa ja keskustele naapurustosta.", [
      w("asunto", "apartment", "noun", "Asunto on lähellä keskustaa.", "The apartment is near the centre."), w("vuokra", "rent", "noun", "Vuokra maksetaan kuussa.", "The rent is paid monthly."), w("naapuri", "neighbour", "noun", "Naapuri auttaa usein.", "The neighbour often helps."), w("parveke", "balcony", "noun", "Parvekkeelta näkee puiston.", "You can see the park from the balcony."), w("hissi", "lift", "noun", "Hissi ei toimi.", "The lift does not work."), w("melu", "noise", "noun", "Melu häiritsee yöllä.", "Noise is disturbing at night."), w("muuttaa", "move", "verb", "Muutamme uuteen asuntoon.", "We are moving to a new apartment."), w("korjata", "repair", "verb", "Omistaja korjaa oven.", "The owner repairs the door."),
    ]),
    u("u37", "Palvelut ja asiointi", "Hoida tavallisia asioita virastossa ja palvelupisteessä.", [
      w("palvelu", "service", "noun", "Palvelu on nopeaa.", "The service is fast."), w("lomake", "form", "noun", "Täytä tämä lomake.", "Fill in this form."), w("todistus", "certificate", "noun", "Tarvitsen uuden todistuksen.", "I need a new certificate."), w("hakemus", "application", "noun", "Hakemus on valmis.", "The application is ready."), w("virasto", "office", "noun", "Virasto sulkee neljältä.", "The office closes at four."), w("numero", "number", "noun", "Ota odotusnumero.", "Take a waiting number."), w("pyytää", "request", "verb", "Voinko pyytää apua?", "Can I request help?"), w("täyttää", "fill in", "verb", "Täytän hakemuksen verkossa.", "I fill in the application online."),
    ]),
  ],
  B1: [
    u("u36", "Opiskelu ja ongelmanratkaisu", "Kuvaile opiskelutapoja ja ratkaise oppimisen haasteita.", [
      w("tehtävä", "task", "noun", "Tehtävä pitää palauttaa huomenna.", "The task must be submitted tomorrow."), w("ratkaisu", "solution", "noun", "Löysimme hyvän ratkaisun.", "We found a good solution."), w("haaste", "challenge", "noun", "Uusi aihe on haaste.", "The new topic is a challenge."), w("taito", "skill", "noun", "Kielitaito kehittyy harjoittelemalla.", "Language skill develops through practice."), w("palaute", "feedback", "noun", "Opettaja antaa hyödyllistä palautetta.", "The teacher gives useful feedback."), w("muistiinpanot", "notes", "noun", "Teen muistiinpanoja luennolla.", "I take notes during the lecture."), w("ratkaista", "solve", "verb", "Yritämme ratkaista ongelman.", "We try to solve the problem."), w("soveltaa", "apply", "verb", "Sovellan sääntöä esimerkissä.", "I apply the rule in an example."),
    ]),
    u("u37", "Kulttuuri ja juhlat", "Kerro kulttuurisista tavoista ja yhteisistä juhlista.", [
      w("juhla", "celebration", "noun", "Juhla alkaa illalla.", "The celebration begins in the evening."), w("tapa", "custom", "noun", "Tämä tapa on vanha.", "This custom is old."), w("perinne", "tradition", "noun", "Perinne yhdistää sukupolvia.", "Tradition connects generations."), w("vieras", "guest", "noun", "Vieraat saapuvat pian.", "The guests arrive soon."), w("lahja", "gift", "noun", "Lahja on kauniisti pakattu.", "The gift is beautifully wrapped."), w("musiikki", "music", "noun", "Musiikki kuuluu kadulle.", "Music can be heard in the street."), w("juhlia", "celebrate", "verb", "Juhlimme valmistumista.", "We celebrate graduation."), w("kunnioittaa", "respect", "verb", "Kunnioitamme paikallista tapaa.", "We respect the local custom."),
    ]),
  ],
  B2: [
    u("u36", "Talous ja yrittäjyys", "Keskustele yrityksistä, markkinoista ja taloudellisista riskeistä.", [
      w("yritys", "company", "noun", "Yritys kasvaa nopeasti.", "The company is growing quickly."), w("liikevaihto", "turnover", "noun", "Liikevaihto nousi viime vuonna.", "Turnover increased last year."), w("asiakas", "customer", "noun", "Asiakas odottaa vastausta.", "The customer is waiting for an answer."), w("kilpailu", "competition", "noun", "Kilpailu on kovaa.", "Competition is intense."), w("investointi", "investment", "noun", "Investointi vaatii suunnittelua.", "An investment requires planning."), w("velka", "debt", "noun", "Velka pitää maksaa takaisin.", "The debt must be repaid."), w("perustaa", "establish", "verb", "Hän perusti uuden yrityksen.", "She established a new company."), w("kasvattaa", "increase", "verb", "Yritys kasvattaa tuotantoa.", "The company increases production."),
    ]),
    u("u37", "Tiede ja innovaatio", "Selitä tieteellisiä havaintoja ja uusien ratkaisujen kehittämistä.", [
      w("keksintö", "invention", "noun", "Keksintö muutti arkea.", "The invention changed daily life."), w("tutkimus", "research", "noun", "Tutkimus kestää kolme vuotta.", "The research takes three years."), w("laboratorio", "laboratory", "noun", "Laboratorio on hyvin varustettu.", "The laboratory is well equipped."), w("aineisto", "data", "noun", "Aineisto sisältää tuhansia vastauksia.", "The data contains thousands of answers."), w("teoria", "theory", "noun", "Teoria selittää havainnon.", "The theory explains the observation."), w("sovellus", "application", "noun", "Sovellus säästää energiaa.", "The application saves energy."), w("kehittää", "develop", "verb", "Tiimi kehittää uutta menetelmää.", "The team develops a new method."), w("todistaa", "prove", "verb", "Tulokset eivät vielä todista väitettä.", "The results do not yet prove the claim."),
    ]),
  ],
  C1: [
    u("u36", "Media ja retoriikka", "Analysoi argumentteja, vaikuttamista ja julkista keskustelua.", [
      w("retoriikka", "rhetoric", "noun", "Retoriikka vaikuttaa yleisöön.", "Rhetoric influences the audience."), w("argumentti", "argument", "noun", "Argumentti perustuu näyttöön.", "The argument is based on evidence."), w("yleisö", "audience", "noun", "Yleisö esitti vaikeita kysymyksiä.", "The audience asked difficult questions."), w("kehystys", "framing", "noun", "Kehystys muuttaa aiheen tulkintaa.", "Framing changes the interpretation of the topic."), w("otsikko", "headline", "noun", "Otsikko yksinkertaisti asiaa.", "The headline simplified the issue."), w("lähdekritiikki", "source criticism", "noun", "Lähdekritiikki kuuluu tutkimukseen.", "Source criticism is part of research."), w("vakuuttaa", "persuade", "verb", "Kirjoittaja vakuuttaa lukijan.", "The writer persuades the reader."), w("liioitella", "exaggerate", "verb", "Otsikko liioittelee riskiä.", "The headline exaggerates the risk."),
    ]),
    u("u37", "Muutto ja osallisuus", "Pohdi muuttoliikettä, kotoutumista ja yhteisöön kuulumista.", [
      w("muutto", "migration", "noun", "Muutto muuttaa kaupungin rakennetta.", "Migration changes the structure of a city."), w("maahanmuuttaja", "immigrant", "noun", "Maahanmuuttaja rakentaa uutta elämää.", "The immigrant builds a new life."), w("kotoutuminen", "integration", "noun", "Kotoutuminen vaatii aikaa.", "Integration takes time."), w("kuuluminen", "belonging", "noun", "Kuuluminen vahvistaa turvallisuutta.", "Belonging strengthens security."), w("ennakkoluulo", "prejudice", "noun", "Ennakkoluulo voi estää yhteistyötä.", "Prejudice can prevent cooperation."), w("monimuotoisuus", "diversity", "noun", "Monimuotoisuus rikastuttaa yhteisöä.", "Diversity enriches the community."), w("sopeutua", "adapt", "verb", "Ihmiset sopeutuvat uuteen ympäristöön.", "People adapt to a new environment."), w("osallistaa", "include", "verb", "Päätösten pitäisi osallistaa asukkaita.", "Decisions should include residents."),
    ]),
  ],
  C2: [
    u("u36", "Kieli ja filosofia", "Pohdi kielen, merkityksen ja tulkinnan filosofisia kysymyksiä.", [
      w("merkitys", "meaning", "noun", "Merkitys syntyy asiayhteydessä.", "Meaning emerges in context."), w("viittaus", "reference", "noun", "Viittaus yhdistää tekstin historiaan.", "A reference connects the text to history."), w("käsite", "concept", "noun", "Käsite vaatii tarkan määritelmän.", "A concept requires a precise definition."), w("epäselvyys", "ambiguity", "noun", "Epäselvyys voi olla tarkoituksellista.", "Ambiguity can be intentional."), w("tulkinta", "interpretation", "noun", "Tulkinta riippuu lukijasta.", "Interpretation depends on the reader."), w("totuusarvo", "truth value", "noun", "Lauseella voi olla kiistanalainen totuusarvo.", "A sentence can have a contested truth value."), w("määritellä", "define", "verb", "Kirjoittaja määrittelee käsitteen uudelleen.", "The writer redefines the concept."), w("merkitä", "signify", "verb", "Sana voi merkitä eri asioita.", "A word can signify different things."),
    ]),
    u("u37", "Globaali hallinto", "Arvioi kansainvälisiä instituutioita ja yhteisiä ratkaisuja.", [
      w("hallinto", "governance", "noun", "Globaali hallinto tarvitsee yhteistyötä.", "Global governance requires cooperation."), w("instituutio", "institution", "noun", "Instituutio ylläpitää sääntöjä.", "An institution maintains rules."), w("sopimus", "treaty", "noun", "Sopimus sitoo valtioita.", "The treaty binds states."), w("suvereniteetti", "sovereignty", "noun", "Suvereniteetti rajoittaa yhteistä päätöksentekoa.", "Sovereignty limits collective decision-making."), w("vastuullisuus", "accountability", "noun", "Vastuullisuus lisää luottamusta.", "Accountability increases trust."), w("neuvottelu", "diplomacy", "noun", "Neuvottelu voi ehkäistä konfliktin.", "Diplomacy can prevent conflict."), w("koordinoida", "coordinate", "verb", "Maat koordinoivat toimiaan.", "Countries coordinate their actions."), w("ratifioida", "ratify", "verb", "Parlamentti ratifioi sopimuksen.", "Parliament ratifies the treaty."),
    ]),
  ],
};
