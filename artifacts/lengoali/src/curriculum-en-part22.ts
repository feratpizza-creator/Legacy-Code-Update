// Professional English enrichment unit u61 for every CEFR level.
// Reference PDFs informed read-only gap analysis only; they are not runtime imports.
import type { ReadingText, VocabularyItem } from "./learn-data";

type PhraseSpec = { phrase: string; translation: string };
type LineSpec = { speaker: string; text: string; translation: string };
type UnitSeed = {
  id: string;
  title: string;
  description: string;
  words: VocabularyItem[];
  phrases: PhraseSpec[];
  dialogue: LineSpec[];
  reading: ReadingText & { title: string };
};

const w = (
  word: string,
  translation: string,
  pos: string,
  ipa: string,
  definition: string,
  example: string,
  exampleTranslation: string,
  synonyms: string[],
  antonyms: string[],
  collocations: string[],
  wordFamily: string[],
  tags: string[],
  category: string,
): VocabularyItem => ({
  word, translation, pos, ipa, definition, example, exampleTranslation,
  synonyms, antonyms, collocations, wordFamily, tags, category,
});

const u = (
  title: string,
  description: string,
  words: VocabularyItem[],
  phrases: PhraseSpec[],
  dialogue: LineSpec[],
  reading: ReadingText & { title: string },
): UnitSeed => ({ id: "u61", title, description, words, phrases, dialogue, reading });

export const ADDITIONAL_EN_PART22_UNITS: Record<string, UnitSeed[]> = {
  A0: [
    u("Colors and Shapes", "Name bright colors and simple shapes while describing pictures and objects.", [
      w("crimson", "carmesí", "adjective", "/ˈkrɪmzən/", "a deep, strong red color", "The flower is crimson.", "La flor es carmesí.", ["deep red"], ["pale"], ["crimson flower", "crimson paint"], ["crimson"], ["colors", "art"], "color"),
      w("azure", "azul celeste", "adjective", "/ˈæʒər/", "a bright blue color like a clear sky", "The sky is azure today.", "El cielo es azul celeste hoy.", ["sky-blue"], ["dark"], ["azure sky", "azure water"], ["azure"], ["colors", "nature"], "color"),
      w("violet", "violeta", "adjective", "/ˈvaɪələt/", "a blue-purple color", "She draws a violet line.", "Ella dibuja una línea violeta.", ["purple"], ["yellow"], ["violet dress", "violet light"], ["violet"], ["colors", "art"], "color"),
      w("oval", "óvalo", "noun", "/ˈoʊvəl/", "a round shape that is longer than it is wide", "The mirror is an oval.", "El espejo es un óvalo.", ["egg shape"], ["square"], ["oval mirror", "oval shape"], ["oval"], ["shapes", "objects"], "shape"),
      w("rectangle", "rectángulo", "noun", "/ˈrektæŋɡəl/", "a shape with four straight sides and four corners", "Color the rectangle blue.", "Colorea el rectángulo de azul.", ["four-sided shape"], ["circle"], ["blue rectangle", "draw a rectangle"], ["rectangular"], ["shapes", "school"], "shape"),
      w("star", "estrella", "noun", "/stɑːr/", "a shape with pointed arms, or a bright object in the sky", "Put a star on the card.", "Pon una estrella en la tarjeta.", ["asterisk"], ["dot"], ["draw a star", "bright star"], ["starry", "star-shaped"], ["shapes", "sky"], "shape"),
      w("match", "combinar", "verb", "/mætʃ/", "to look good together or be the same as something else", "Match the red circle with the red card.", "Combina el círculo rojo con la tarjeta roja.", ["pair", "go with"], ["mismatch"], ["match colors", "match a picture"], ["match", "matching"], ["classroom", "action"], "action"),
      w("stripe", "raya", "noun", "/straɪp/", "a long narrow band of color", "The shirt has a yellow stripe.", "La camisa tiene una raya amarilla.", ["band", "line"], ["plain area"], ["blue stripe", "striped shirt"], ["stripe", "striped"], ["clothes", "patterns"], "pattern"),
    ], [
      { phrase: "What color is it?", translation: "¿De qué color es?" },
      { phrase: "It is bright blue.", translation: "Es azul brillante." },
      { phrase: "Draw a small circle.", translation: "Dibuja un círculo pequeño." },
      { phrase: "These colors match.", translation: "Estos colores combinan." },
    ], [
      { speaker: "A", text: "What shape is this?", translation: "¿Qué forma es esta?" },
      { speaker: "B", text: "It is an oval with a violet stripe.", translation: "Es un óvalo con una raya violeta." },
      { speaker: "A", text: "Can I use crimson paint?", translation: "¿Puedo usar pintura carmesí?" },
      { speaker: "B", text: "Yes. Match it with the red card.", translation: "Sí. Combínala con la tarjeta roja." },
    ], { title: "A Colorful Picture", text: "Nora makes a picture with an oval, a rectangle, and a star. She uses azure, violet, and crimson paint. A yellow stripe makes the shapes match, and Nora puts the picture on the wall.", translation: "Nora hace un dibujo con un óvalo, un rectángulo y una estrella. Usa pintura azul celeste, violeta y carmesí. Una raya amarilla hace que las formas combinen y Nora pone el dibujo en la pared." }),
  ],
  A1: [
    u("Everyday Health", "Talk about simple symptoms, basic care, and what to do when you feel unwell.", [
      w("allergy", "alergia", "noun", "/ˈælərdʒi/", "a health problem caused by a reaction to a substance", "My allergy is worse in spring.", "Mi alergia es peor en primavera.", ["sensitivity"], ["immunity"], ["food allergy", "seasonal allergy"], ["allergy", "allergic"], ["health", "symptoms"], "condition"),
      w("dizzy", "mareado", "adjective", "/ˈdɪzi/", "feeling that everything is moving and that you may fall", "I feel dizzy when I stand up quickly.", "Me siento mareado cuando me levanto rápido.", ["light-headed"], ["steady"], ["feel dizzy", "slightly dizzy"], ["dizzy", "dizziness"], ["health", "feelings"], "symptom"),
      w("sore", "dolorido", "adjective", "/sɔːr/", "painful, especially after illness or exercise", "My throat is sore today.", "Hoy me duele la garganta.", ["painful", "tender"], ["comfortable"], ["sore throat", "sore muscles"], ["sore", "soreness"], ["health", "body"], "symptom"),
      w("sneeze", "estornudar", "verb", "/sniːz/", "to suddenly force air out through the nose and mouth", "Dust makes me sneeze.", "El polvo me hace estornudar.", ["sniffle"], ["breathe in"], ["sneeze loudly", "make someone sneeze"], ["sneeze", "sneezing"], ["health", "actions"], "action"),
      w("thermometer", "termómetro", "noun", "/θərˈmɑːmɪtər/", "a tool used to measure temperature", "The thermometer shows thirty-eight degrees.", "El termómetro marca treinta y ocho grados.", ["temperature gauge"], [], ["use a thermometer", "digital thermometer"], ["thermometer", "thermal"], ["health", "objects"], "instrument"),
      w("tablet", "pastilla", "noun", "/ˈtæblət/", "a small solid piece of medicine that you swallow", "Take one tablet with water.", "Toma una pastilla con agua.", ["pill"], [], ["take a tablet", "pain tablet"], ["tablet"], ["health", "medicine"], "medicine"),
      w("rash", "sarpullido", "noun", "/ræʃ/", "an area of red or irritated skin", "The cream helped my rash.", "La crema ayudó con mi sarpullido.", ["skin irritation"], ["clear skin"], ["red rash", "develop a rash"], ["rash", "rash-covered"], ["health", "skin"], "symptom"),
      w("nausea", "náuseas", "noun", "/ˈnɔːziə/", "the sick feeling that makes you want to vomit", "The smell gave me nausea.", "El olor me produjo náuseas.", ["sickness"], ["comfort"], ["feel nausea", "severe nausea"], ["nausea", "nauseous"], ["health", "feelings"], "symptom"),
    ], [
      { phrase: "I do not feel well.", translation: "No me siento bien." },
      { phrase: "You should get some rest.", translation: "Deberías descansar un poco." },
      { phrase: "Are you allergic to anything?", translation: "¿Tienes alergia a algo?" },
      { phrase: "Take it with water.", translation: "Tómalo con agua." },
    ], [
      { speaker: "A", text: "I feel dizzy and my throat is sore.", translation: "Me siento mareado y me duele la garganta." },
      { speaker: "B", text: "Let us check your temperature.", translation: "Vamos a comprobar tu temperatura." },
      { speaker: "A", text: "The thermometer says thirty-seven degrees.", translation: "El termómetro marca treinta y siete grados." },
      { speaker: "B", text: "Rest, drink water, and call the clinic if it gets worse.", translation: "Descansa, bebe agua y llama a la clínica si empeora." },
    ], { title: "A Quiet Day at Home", text: "After breakfast, Elena feels dizzy and notices a sore throat. She checks her temperature with a thermometer and drinks water. She has no rash or nausea, so she rests at home and asks a friend to collect her tablets.", translation: "Después del desayuno, Elena se siente mareada y nota dolor de garganta. Comprueba su temperatura con un termómetro y bebe agua. No tiene sarpullido ni náuseas, así que descansa en casa y pide a una amiga que recoja sus pastillas." }),
  ],
  A2: [
    u("Cooking at Home", "Follow a recipe, describe cooking actions, and prepare a simple meal safely.", [
      w("saucepan", "cacerola", "noun", "/ˈsɔːspən/", "a deep cooking pot with a handle", "Heat the soup in a saucepan.", "Calienta la sopa en una cacerola.", ["pot"], ["plate"], ["small saucepan", "saucepan lid"], ["sauce", "saucepan"], ["cooking", "kitchen"], "tool"),
      w("chop", "picar", "verb", "/tʃɑːp/", "to cut food into small pieces", "Chop the onions carefully.", "Pica las cebollas con cuidado.", ["cut", "dice"], ["join"], ["chop vegetables", "chop finely"], ["chop", "chopped", "chopping"], ["cooking", "actions"], "action"),
      w("grate", "rallar", "verb", "/ɡreɪt/", "to rub food against a rough surface to make small pieces", "Grate some cheese over the pasta.", "Ralla un poco de queso sobre la pasta.", ["shred"], ["slice"], ["grate cheese", "grate finely"], ["grate", "grater", "grated"], ["cooking", "actions"], "action"),
      w("knead", "amasar", "verb", "/niːd/", "to press and fold dough with your hands", "Knead the dough for five minutes.", "Amasa la masa durante cinco minutos.", ["work", "press"], ["leave untouched"], ["knead dough", "knead by hand"], ["knead", "kneading"], ["cooking", "baking"], "action"),
      w("simmer", "cocer a fuego lento", "verb", "/ˈsɪmər/", "to cook gently in liquid just below boiling", "Let the sauce simmer for ten minutes.", "Deja que la salsa cueza a fuego lento durante diez minutos.", ["cook gently"], ["freeze"], ["simmer gently", "simmer the sauce"], ["simmer", "simmering"], ["cooking", "heat"], "action"),
      w("garnish", "decorar", "verb", "/ˈɡɑːrnɪʃ/", "to add a small amount of food to make a dish look attractive", "Garnish the soup with herbs.", "Decora la sopa con hierbas.", ["decorate", "finish"], ["strip"], ["garnish a dish", "garnish with herbs"], ["garnish", "garnish"], ["cooking", "presentation"], "action"),
      w("whisk", "batir", "verb", "/wɪsk/", "to mix something quickly with a whisk or fork", "Whisk the eggs in a bowl.", "Bate los huevos en un bol.", ["beat", "mix"], ["separate"], ["whisk eggs", "whisk together"], ["whisk", "whisked", "whisking"], ["cooking", "actions"], "action"),
      w("dough", "masa", "noun", "/doʊ/", "a soft mixture of flour and liquid used for bread or baking", "The dough needs more flour.", "La masa necesita más harina.", ["mixture"], ["liquid"], ["bread dough", "roll out dough"], ["dough", "doughy"], ["cooking", "baking"], "ingredient"),
    ], [
      { phrase: "Follow the recipe step by step.", translation: "Sigue la receta paso a paso." },
      { phrase: "Chop the vegetables finely.", translation: "Pica las verduras finamente." },
      { phrase: "Let the sauce simmer.", translation: "Deja que la salsa cueza a fuego lento." },
      { phrase: "Taste it before serving.", translation: "Pruébalo antes de servirlo." },
    ], [
      { speaker: "A", text: "What should I do with the dough?", translation: "¿Qué debo hacer con la masa?" },
      { speaker: "B", text: "Knead it, then leave it to rest.", translation: "Amásala y luego déjala reposar." },
      { speaker: "A", text: "Should I whisk the eggs now?", translation: "¿Debo batir los huevos ahora?" },
      { speaker: "B", text: "Yes, and simmer the sauce while you work.", translation: "Sí, y cuece la salsa a fuego lento mientras trabajas." },
    ], { title: "A Shared Recipe", text: "Marta and Luis cook together on Saturday. Luis chops vegetables and simmers a tomato sauce in a saucepan. Marta kneads dough, whisks eggs, and grates cheese. They taste the meal, add herbs as a garnish, and serve it warm.", translation: "Marta y Luis cocinan juntos el sábado. Luis pica verduras y cuece una salsa de tomate a fuego lento en una cacerola. Marta amasa la masa, bate huevos y ralla queso. Prueban la comida, añaden hierbas como decoración y la sirven caliente." }),
  ],
  B1: [
    u("Respectful Disagreement", "Express a different view, clarify assumptions, and keep a difficult conversation constructive.", [
      w("perspective", "perspectiva", "noun", "/pərˈspektɪv/", "a particular way of seeing or understanding a situation", "From my perspective, the deadline is realistic.", "Desde mi perspectiva, el plazo es realista.", ["viewpoint", "outlook"], ["blindness"], ["different perspective", "from a perspective"], ["perspective"], ["communication", "discussion"], "viewpoint"),
      w("concern", "preocupación", "noun", "/kənˈsɜːrn/", "a worry about a problem or situation", "I understand your concern about the cost.", "Entiendo tu preocupación por el coste.", ["worry", "reservation"], ["confidence"], ["raise a concern", "serious concern"], ["concern", "concerned"], ["communication", "work"], "feeling"),
      w("acknowledge", "reconocer", "verb", "/əkˈnɑːlɪdʒ/", "to accept or show that something is true or important", "We should acknowledge the limits of the plan.", "Deberíamos reconocer los límites del plan.", ["recognize", "admit"], ["deny"], ["acknowledge a concern", "acknowledge a mistake"], ["knowledge", "acknowledge", "acknowledgement"], ["communication", "reasoning"], "action"),
      w("assumption", "suposición", "noun", "/əˈsʌmpʃən/", "a belief accepted without proof", "That assumption needs more evidence.", "Esa suposición necesita más pruebas.", ["belief", "presumption"], ["certainty"], ["make an assumption", "question an assumption"], ["assume", "assumption"], ["reasoning", "discussion"], "idea"),
      w("respectful", "respetuoso", "adjective", "/rɪˈspektfəl/", "showing politeness and consideration for another person", "They had a respectful disagreement.", "Tuvieron un desacuerdo respetuoso.", ["polite", "considerate"], ["rude"], ["respectful tone", "respectful dialogue"], ["respect", "respectful", "respectfully"], ["communication", "relationships"], "quality"),
      w("reframe", "reformular", "verb", "/ˌriːˈfreɪm/", "to describe an idea or problem in a new way", "Let me reframe the question.", "Déjame reformular la pregunta.", ["recast", "restate"], ["misrepresent"], ["reframe a problem", "reframe the debate"], ["frame", "reframe", "reframing"], ["communication", "problem solving"], "action"),
      w("disagree", "discrepar", "verb", "/ˌdɪsəˈɡriː/", "to have a different opinion from someone else", "It is possible to disagree without being hostile.", "Es posible discrepar sin ser hostil.", ["differ", "object"], ["agree"], ["respectfully disagree", "disagree with a view"], ["agree", "disagree", "disagreement"], ["communication", "opinions"], "action"),
      w("courtesy", "cortesía", "noun", "/ˈkɜːrtəsi/", "polite behaviour that shows consideration for others", "A little courtesy improved the discussion.", "Un poco de cortesía mejoró el debate.", ["politeness", "civility"], ["discourtesy"], ["common courtesy", "professional courtesy"], ["courteous", "courtesy"], ["communication", "relationships"], "quality"),
    ], [
      { phrase: "I see your point, but I disagree.", translation: "Entiendo tu punto, pero discrepo." },
      { phrase: "Could we examine that assumption?", translation: "¿Podríamos examinar esa suposición?" },
      { phrase: "Let us keep the tone respectful.", translation: "Mantengamos un tono respetuoso." },
      { phrase: "That is another useful perspective.", translation: "Esa es otra perspectiva útil." },
    ], [
      { speaker: "A", text: "I disagree with the proposed schedule.", translation: "Discrepo del calendario propuesto." },
      { speaker: "B", text: "I understand your concern. What assumption are you questioning?", translation: "Entiendo tu preocupación. ¿Qué suposición cuestionas?" },
      { speaker: "A", text: "We assume that every task will take one day.", translation: "Suponemos que cada tarea tardará un día." },
      { speaker: "B", text: "Let us reframe the plan and discuss it with courtesy.", translation: "Reformulemos el plan y hablemos con cortesía." },
    ], { title: "A Better Conversation", text: "During a project review, Ana and Karim disagree about a deadline. Instead of dismissing one another, they acknowledge each concern and examine the assumptions behind the schedule. By reframing the problem, they find a respectful way to revise the plan.", translation: "Durante una revisión del proyecto, Ana y Karim discrepan sobre un plazo. En lugar de ignorarse, reconocen cada preocupación y examinan las suposiciones detrás del calendario. Al reformular el problema, encuentran una manera respetuosa de revisar el plan." }),
  ],
  B2: [
    u("Climate Adaptation", "Discuss ecological risk, resilience, and practical responses to a changing climate.", [
      w("resilient", "resiliente", "adjective", "/rɪˈzɪliənt/", "able to recover or continue after difficulty", "Resilient communities prepare for extreme weather.", "Las comunidades resilientes se preparan para el clima extremo.", ["strong", "adaptable"], ["fragile"], ["resilient community", "resilient system"], ["resilience", "resilient"], ["climate", "society"], "quality"),
      w("drought", "sequía", "noun", "/draʊt/", "a long period with very little or no rain", "The drought reduced the harvest.", "La sequía redujo la cosecha.", ["dry spell", "water shortage"], ["flood"], ["severe drought", "drought conditions"], ["drought", "drought-stricken"], ["climate", "agriculture"], "event"),
      w("habitat", "hábitat", "noun", "/ˈhæbɪtæt/", "the natural home of an animal or plant", "Wetlands provide habitat for many birds.", "Los humedales proporcionan hábitat a muchas aves.", ["natural home", "environment"], ["artificial space"], ["natural habitat", "habitat loss"], ["habitat"], ["environment", "biology"], "place"),
      w("renewable", "renovable", "adjective", "/rɪˈnuːəbəl/", "able to be replaced naturally and not used up permanently", "Solar power is a renewable source of energy.", "La energía solar es una fuente renovable de energía.", ["sustainable", "replenishable"], ["finite", "non-renewable"], ["renewable energy", "renewable resource"], ["renew", "renewable", "renewal"], ["energy", "environment"], "quality"),
      w("vulnerability", "vulnerabilidad", "noun", "/ˌvʌlnərəˈbɪləti/", "the state of being easily harmed or affected", "The map shows the area's vulnerability to heat.", "El mapa muestra la vulnerabilidad de la zona al calor.", ["exposure", "weakness"], ["protection"], ["climate vulnerability", "reduce vulnerability"], ["vulnerable", "vulnerability"], ["climate", "risk"], "condition"),
      w("conservation", "conservación", "noun", "/ˌkɑːnsərˈveɪʃən/", "the protection of nature, resources, or historic places", "Conservation protects the river habitat.", "La conservación protege el hábitat del río.", ["preservation", "protection"], ["destruction"], ["nature conservation", "conservation project"], ["conserve", "conservationist", "conservation"], ["environment", "policy"], "practice"),
      w("ecosystem", "ecosistema", "noun", "/ˈiːkoʊsɪstəm/", "a community of living things and their physical environment", "A healthy ecosystem supports diverse species.", "Un ecosistema sano sostiene especies diversas.", ["ecological system"], ["isolated organism"], ["marine ecosystem", "healthy ecosystem"], ["ecology", "ecosystem"], ["environment", "biology"], "system"),
      w("biodiversity", "biodiversidad", "noun", "/ˌbaɪoʊdaɪˈvɜːrsəti/", "the variety of living things in a place or on Earth", "Biodiversity makes forests more stable.", "La biodiversidad hace que los bosques sean más estables.", ["biological variety"], ["uniformity"], ["protect biodiversity", "loss of biodiversity"], ["biodiverse", "biodiversity"], ["environment", "science"], "quality"),
    ], [
      { phrase: "We need to adapt to new conditions.", translation: "Tenemos que adaptarnos a nuevas condiciones." },
      { phrase: "The region is vulnerable to drought.", translation: "La región es vulnerable a la sequía." },
      { phrase: "Protect the local habitat.", translation: "Protege el hábitat local." },
      { phrase: "Renewable energy can reduce emissions.", translation: "La energía renovable puede reducir las emisiones." },
    ], [
      { speaker: "A", text: "The drought has damaged the local ecosystem.", translation: "La sequía ha dañado el ecosistema local." },
      { speaker: "B", text: "We need conservation measures and a more resilient water system.", translation: "Necesitamos medidas de conservación y un sistema de agua más resiliente." },
      { speaker: "A", text: "Which communities face the greatest vulnerability?", translation: "¿Qué comunidades afrontan la mayor vulnerabilidad?" },
      { speaker: "B", text: "Those with fewer resources and less access to renewable energy.", translation: "Las que tienen menos recursos y menos acceso a energía renovable." },
    ], { title: "Preparing for Change", text: "A coastal region is planning for hotter summers and longer periods of drought. Its adaptation strategy combines renewable energy, habitat restoration, and water conservation. Officials also map vulnerability so that support reaches communities most exposed to climate risk and biodiversity loss.", translation: "Una región costera se prepara para veranos más calurosos y periodos de sequía más largos. Su estrategia de adaptación combina energía renovable, restauración del hábitat y conservación del agua. Las autoridades también cartografían la vulnerabilidad para que el apoyo llegue a las comunidades más expuestas al riesgo climático y a la pérdida de biodiversidad." }),
  ],
  C1: [
    u("Research Design and Evidence", "Analyse study design, measurement quality, and the limits of conclusions drawn from data.", [
      w("operationalize", "operacionalizar", "verb", "/ˌɑːpəˈreɪʃənəlaɪz/", "to define an abstract idea in a way that can be measured", "The team operationalized trust as repeated cooperation.", "El equipo operacionalizó la confianza como cooperación repetida.", ["define measurably", "specify"], ["leave vague"], ["operationalize a concept", "operationalize a variable"], ["operation", "operational", "operationalize"], ["research", "methodology"], "action"),
      w("confounder", "factor de confusión", "noun", "/kənˈfaʊndər/", "a hidden factor that affects both the presumed cause and the result", "Age was a possible confounder in the analysis.", "La edad era un posible factor de confusión en el análisis.", ["confounding factor"], ["controlled factor"], ["potential confounder", "control for a confounder"], ["confound", "confounding", "confounder"], ["research", "statistics"], "factor"),
      w("blinding", "enmascaramiento", "noun", "/ˈblaɪndɪŋ/", "a method of keeping participants or researchers unaware of group assignments", "Blinding reduced the risk of expectation effects.", "El enmascaramiento redujo el riesgo de efectos de expectativa.", ["masking"], ["disclosure"], ["double blinding", "maintain blinding"], ["blind", "blinding"], ["research", "experiments"], "method"),
      w("cohort", "cohorte", "noun", "/ˈkoʊhɔːrt/", "a group of people studied over a period of time", "The cohort was followed for five years.", "La cohorte fue observada durante cinco años.", ["study group", "panel"], ["individual"], ["birth cohort", "cohort study"], ["cohort"], ["research", "people"], "group"),
      w("baseline", "línea de base", "noun", "/ˈbeɪslaɪn/", "a starting level used for comparison", "The survey established a baseline before the intervention.", "La encuesta estableció una línea de base antes de la intervención.", ["starting point", "benchmark"], ["endpoint"], ["baseline measurement", "baseline data"], ["base", "baseline"], ["research", "measurement"], "measure"),
      w("protocol", "protocolo", "noun", "/ˈproʊtəkɑːl/", "a detailed plan for carrying out a study or procedure", "Every laboratory followed the same protocol.", "Cada laboratorio siguió el mismo protocolo.", ["procedure", "procedure plan"], ["improvisation"], ["research protocol", "follow a protocol"], ["protocol", "protocol-driven"], ["research", "methods"], "document"),
      w("robustness", "solidez", "noun", "/ˈroʊbʌtnəs/", "the quality of continuing to work well under different conditions", "The robustness of the result was tested with another model.", "La solidez del resultado se comprobó con otro modelo.", ["stability", "strength"], ["fragility"], ["test robustness", "robustness check"], ["robust", "robustness"], ["research", "analysis"], "quality"),
      w("generalizability", "generalización", "noun", "/ˌdʒenərələˈzɪbələ­ti/", "the extent to which findings apply beyond the studied group", "The small sample limits generalizability.", "La muestra pequeña limita la generalización.", ["transferability", "wider applicability"], ["specificity"], ["assess generalizability", "limited generalizability"], ["generalize", "generalizable", "generalizability"], ["research", "evidence"], "quality"),
    ], [
      { phrase: "How was the concept measured?", translation: "¿Cómo se midió el concepto?" },
      { phrase: "The study controls for age.", translation: "El estudio controla la edad." },
      { phrase: "The result needs a robustness check.", translation: "El resultado necesita una comprobación de solidez." },
      { phrase: "The sample limits generalizability.", translation: "La muestra limita la generalización." },
    ], [
      { speaker: "A", text: "How did the researchers operationalize trust?", translation: "¿Cómo operacionalizaron la confianza los investigadores?" },
      { speaker: "B", text: "They measured repeated cooperation, but age was a possible confounder.", translation: "Midieron la cooperación repetida, pero la edad era un posible factor de confusión." },
      { speaker: "A", text: "Was the study blinded?", translation: "¿El estudio estaba enmascarado?" },
      { speaker: "B", text: "Partly. Further testing is needed before generalizing the result.", translation: "Parcialmente. Se necesitan más pruebas antes de generalizar el resultado." },
    ], { title: "Reading a Study Carefully", text: "A research team designs a study with a clear protocol and a defined baseline. It operationalizes abstract concepts and uses blinding where possible, while checking for confounders. The findings appear robust, but the cohort is small, so their generalizability remains limited.", translation: "Un equipo de investigación diseña un estudio con un protocolo claro y una línea de base definida. Operacionaliza conceptos abstractos y usa enmascaramiento cuando es posible, mientras comprueba los factores de confusión. Los resultados parecen sólidos, pero la cohorte es pequeña, por lo que su generalización sigue siendo limitada." }),
  ],
  C2: [
    u("Advanced Meaning and Reference", "Examine how linguistic form, context, and cultural convention shape interpretation.", [
      w("speech act", "acto de habla", "noun", "/ˈspiːtʃ ækt/", "an utterance that performs an action such as promising or ordering", "The apology is a speech act, not just a description.", "La disculpa es un acto de habla, no solo una descripción.", ["utterance act", "performative utterance"], ["silent observation"], ["speech act theory", "perform a speech act"], ["speech", "speak", "speech act"], ["linguistics", "pragmatics"], "concept"),
      w("indexicality", "indexicalidad", "noun", "/ˌɪndɪkəˈkæləti/", "the property of pointing to a speaker, place, time, or social context", "The word 'here' has indexicality because its reference changes.", "La palabra «aquí» tiene indexicalidad porque su referencia cambia.", ["context dependence", "deictic reference"], ["fixed reference"], ["social indexicality", "indexicality of language"], ["index", "indexical", "indexicality"], ["linguistics", "context"], "property"),
      w("lexicalize", "lexicalizar", "verb", "/ˈleksɪkəlaɪz/", "to express an idea as a word or fixed lexical item", "Languages lexicalize colors in different ways.", "Las lenguas lexicalizan los colores de maneras diferentes.", ["express in words", "name"], ["leave unexpressed"], ["lexicalize a distinction", "lexicalize a concept"], ["lexicon", "lexical", "lexicalize"], ["linguistics", "vocabulary"], "action"),
      w("homonymy", "homonimia", "noun", "/həˈmɑːnəmi/", "the relationship between words that share a form but have unrelated meanings", "Homonymy can create ambiguity in a sentence.", "La homonimia puede crear ambigüedad en una oración.", ["word-form overlap"], ["distinct form"], ["lexical homonymy", "homonymy and ambiguity"], ["homonym", "homonymous", "homonymy"], ["linguistics", "semantics"], "relation"),
      w("synecdoche", "sinécdoque", "noun", "/sɪˈnekdəki/", "a figure of speech in which a part represents a whole or the whole represents a part", "The phrase 'all hands' uses synecdoche.", "La expresión «todas las manos» usa una sinécdoque.", ["part-for-whole figure"], ["literal naming"], ["use synecdoche", "synecdoche in rhetoric"], ["synecdoche"], ["rhetoric", "literature"], "figure"),
      w("culturally bound", "ligado culturalmente", "adjective", "/ˈkʌltʃərəli baʊnd/", "strongly shaped by the customs and knowledge of a particular culture", "The greeting is culturally bound and needs context.", "El saludo está ligado culturalmente y necesita contexto.", ["culture-specific", "culture-bound"], ["universal"], ["culturally bound expression", "culturally bound meaning"], ["culture", "cultural", "culturally"], ["translation", "culture"], "quality"),
      w("connotation", "connotación", "noun", "/ˌkɑːnəˈteɪʃən/", "an additional feeling or idea suggested by a word", "The word carries a negative connotation in this context.", "La palabra tiene una connotación negativa en este contexto.", ["suggested meaning", "association"], ["denotation"], ["positive connotation", "cultural connotation"], ["connote", "connotative", "connotation"], ["linguistics", "meaning"], "meaning"),
      w("semanticization", "semanticización", "noun", "/sɪˌmæntɪsəˈzeɪʃən/", "the process by which a form acquires or develops a meaning", "Repeated use led to the semanticization of the new expression.", "El uso repetido llevó a la semanticización de la nueva expresión.", ["meaning development", "semantic formation"], ["meaning loss"], ["process of semanticization", "semanticization of a form"], ["semantic", "semanticize", "semanticization"], ["linguistics", "language change"], "process"),
    ], [
      { phrase: "The expression depends on context.", translation: "La expresión depende del contexto." },
      { phrase: "This word carries a strong connotation.", translation: "Esta palabra tiene una connotación fuerte." },
      { phrase: "The reference is culturally bound.", translation: "La referencia está ligada culturalmente." },
      { phrase: "A part can represent the whole.", translation: "Una parte puede representar el todo." },
    ], [
      { speaker: "A", text: "Why does the word 'here' change meaning?", translation: "¿Por qué cambia de significado la palabra «aquí»?" },
      { speaker: "B", text: "Its indexicality depends on who is speaking and where.", translation: "Su indexicalidad depende de quién habla y dónde." },
      { speaker: "A", text: "Could homonymy explain the ambiguity?", translation: "¿Podría la homonimia explicar la ambigüedad?" },
      { speaker: "B", text: "Possibly, but the connotation and cultural context matter too.", translation: "Es posible, pero también importan la connotación y el contexto cultural." },
    ], { title: "Meaning in Context", text: "Meaning is not stored in words alone. Indexicality links an expression to its speaker and setting, while homonymy can create competing readings. A culturally bound phrase may carry a connotation that a literal gloss misses, and rhetorical devices such as synecdoche add another layer of interpretation.", translation: "El significado no está almacenado solo en las palabras. La indexicalidad vincula una expresión con su hablante y su situación, mientras que la homonimia puede crear lecturas competidoras. Una frase ligada culturalmente puede tener una connotación que una traducción literal no capta, y recursos retóricos como la sinécdoque añaden otra capa de interpretación." }),
  ],
};
