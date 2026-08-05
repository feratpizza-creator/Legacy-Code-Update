// Professional English enrichment unit u57 for every CEFR level.
// English-only continuation; Finnish curriculum files are intentionally untouched.
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
type WordSpec = {
  word: string;
  translation: string;
  pos: string;
  ipa: string;
  definition: string;
  example: string;
  exampleTranslation: string;
  synonyms: string[];
  antonyms: string[];
  collocations: string[];
  wordFamily: string[];
  tags: string[];
  category: string;
};

const w = (spec: WordSpec): VocabularyItem => ({ ...spec });
const u = (
  id: string,
  title: string,
  description: string,
  words: VocabularyItem[],
  phrases: PhraseSpec[],
  dialogue: LineSpec[],
  reading: ReadingText & { title: string },
): UnitSeed => ({ id, title, description, words, phrases, dialogue, reading });

export const ADDITIONAL_EN_PART18_UNITS: Record<string, UnitSeed[]> = {
  A0: [
    u(
      "u57",
      "At the Playground",
      "Name simple playground objects and describe safe actions.",
      [
        w({ word: "playground", translation: "parque infantil", pos: "noun", ipa: "/ˈpleɪɡraʊnd/", definition: "an outdoor place where children play", example: "The children are at the playground.", exampleTranslation: "Los niños están en el parque infantil.", synonyms: ["play area"], antonyms: [], collocations: ["local playground", "go to the playground"], wordFamily: ["play", "playground"], tags: ["places", "children"], category: "place" }),
        w({ word: "slide", translation: "tobogán", pos: "noun", ipa: "/slaɪd/", definition: "a structure that children slide down for fun", example: "The boy is going down the slide.", exampleTranslation: "El niño baja por el tobogán.", synonyms: ["chute"], antonyms: [], collocations: ["go down the slide", "play on a slide"], wordFamily: ["slide", "sliding"], tags: ["play", "children"], category: "object" }),
        w({ word: "swing", translation: "columpio", pos: "noun", ipa: "/swɪŋ/", definition: "a seat that hangs and moves forwards and backwards", example: "She is on the swing.", exampleTranslation: "Ella está en el columpio.", synonyms: ["swing seat"], antonyms: [], collocations: ["ride a swing", "swing back and forth"], wordFamily: ["swing", "swung"], tags: ["play", "children"], category: "object" }),
        w({ word: "ball", translation: "pelota", pos: "noun", ipa: "/bɔːl/", definition: "a round object used in games", example: "Please pass me the ball.", exampleTranslation: "Pásame la pelota, por favor.", synonyms: ["sphere"], antonyms: [], collocations: ["kick a ball", "throw a ball"], wordFamily: ["ball", "ballgame"], tags: ["play", "objects"], category: "object" }),
        w({ word: "run", translation: "correr", pos: "verb", ipa: "/rʌn/", definition: "to move quickly on your feet", example: "We run on the grass.", exampleTranslation: "Corremos sobre la hierba.", synonyms: ["jog", "hurry"], antonyms: ["walk"], collocations: ["run fast", "run outside"], wordFamily: ["run", "runner", "running"], tags: ["movement", "play"], category: "action" }),
        w({ word: "jump", translation: "saltar", pos: "verb", ipa: "/dʒʌmp/", definition: "to push yourself off the ground and go into the air", example: "Do not jump from the table.", exampleTranslation: "No saltes desde la mesa.", synonyms: ["leap", "hop"], antonyms: ["stand"], collocations: ["jump high", "jump over"], wordFamily: ["jump", "jumper", "jumping"], tags: ["movement", "safety"], category: "action" }),
        w({ word: "careful", translation: "cuidadoso", pos: "adjective", ipa: "/ˈkerfəl/", definition: "trying to avoid danger or mistakes", example: "Be careful near the steps.", exampleTranslation: "Ten cuidado cerca de los escalones.", synonyms: ["cautious", "alert"], antonyms: ["careless"], collocations: ["be careful", "careful child"], wordFamily: ["care", "careful", "carefully"], tags: ["safety", "feelings"], category: "quality" }),
        w({ word: "together", translation: "juntos", pos: "adverb", ipa: "/təˈɡeðər/", definition: "with another person or group", example: "We play together after school.", exampleTranslation: "Jugamos juntos después de la escuela.", synonyms: ["jointly", "as a group"], antonyms: ["apart"], collocations: ["work together", "stay together"], wordFamily: ["together"], tags: ["people", "play"], category: "relationship" }),
      ],
      [
        { phrase: "Be careful!", translation: "¡Ten cuidado!" },
        { phrase: "Can I have a turn?", translation: "¿Puedo tener un turno?" },
        { phrase: "Let us play together.", translation: "Juguemos juntos." },
        { phrase: "Please wait for me.", translation: "Espérame, por favor." },
      ],
      [
        { speaker: "A", text: "Can I use the swing?", translation: "¿Puedo usar el columpio?" },
        { speaker: "B", text: "Yes, but be careful.", translation: "Sí, pero ten cuidado." },
        { speaker: "A", text: "I will wait for my turn.", translation: "Esperaré mi turno." },
        { speaker: "B", text: "Great. Then we can play together.", translation: "Muy bien. Entonces podemos jugar juntos." },
      ],
      { title: "A Safe Afternoon", text: "Two friends meet at the playground. They run on the grass, pass a ball, and take turns on the swing. An adult reminds them to be careful near the slide.", translation: "Dos amigos se encuentran en el parque infantil. Corren sobre la hierba, se pasan una pelota y toman turnos en el columpio. Un adulto les recuerda que tengan cuidado cerca del tobogán." },
    ),
  ],
  A1: [
    u(
      "u57",
      "Public Transport",
      "Ask about buses and trains, buy a ticket, and describe a journey.",
      [
        w({ word: "station", translation: "estación", pos: "noun", ipa: "/ˈsteɪʃən/", definition: "a place where buses or trains stop", example: "The station is next to the library.", exampleTranslation: "La estación está junto a la biblioteca.", synonyms: ["terminal", "stop"], antonyms: [], collocations: ["train station", "at the station"], wordFamily: ["station", "stationary"], tags: ["transport", "places"], category: "place" }),
        w({ word: "platform", translation: "andén", pos: "noun", ipa: "/ˈplætfɔːrm/", definition: "the raised area beside a railway track where passengers wait", example: "The train leaves from platform four.", exampleTranslation: "El tren sale del andén cuatro.", synonyms: ["railway platform"], antonyms: [], collocations: ["platform four", "wait on the platform"], wordFamily: ["platform"], tags: ["transport", "places"], category: "place" }),
        w({ word: "passenger", translation: "pasajero", pos: "noun", ipa: "/ˈpæsɪndʒər/", definition: "a person travelling in a vehicle but not driving it", example: "Every passenger needs a ticket.", exampleTranslation: "Cada pasajero necesita un billete.", synonyms: ["traveller", "rider"], antonyms: ["driver"], collocations: ["train passenger", "passenger seat"], wordFamily: ["pass", "passenger"], tags: ["transport", "people"], category: "person" }),
        w({ word: "route", translation: "ruta", pos: "noun", ipa: "/ruːt/", definition: "the way from one place to another", example: "This bus route goes to the city centre.", exampleTranslation: "Esta ruta de autobús va al centro de la ciudad.", synonyms: ["path", "way"], antonyms: [], collocations: ["bus route", "direct route"], wordFamily: ["route", "routing"], tags: ["transport", "places"], category: "direction" }),
        w({ word: "fare", translation: "tarifa", pos: "noun", ipa: "/fer/", definition: "the money paid for a journey on public transport", example: "The bus fare is two euros.", exampleTranslation: "La tarifa del autobús es de dos euros.", synonyms: ["ticket price", "charge"], antonyms: [], collocations: ["bus fare", "pay the fare"], wordFamily: ["fare"], tags: ["transport", "money"], category: "cost" }),
        w({ word: "arrive", translation: "llegar", pos: "verb", ipa: "/əˈraɪv/", definition: "to reach a place", example: "We arrive at the station at nine.", exampleTranslation: "Llegamos a la estación a las nueve.", synonyms: ["reach", "get to"], antonyms: ["leave", "depart"], collocations: ["arrive on time", "arrive at a station"], wordFamily: ["arrive", "arrival"], tags: ["transport", "time"], category: "movement" }),
        w({ word: "depart", translation: "salir", pos: "verb", ipa: "/dɪˈpɑːrt/", definition: "to leave a place, especially at the beginning of a journey", example: "The train departs at half past ten.", exampleTranslation: "El tren sale a las diez y media.", synonyms: ["leave", "set off"], antonyms: ["arrive"], collocations: ["depart from a station", "scheduled departure"], wordFamily: ["depart", "departure"], tags: ["transport", "time"], category: "movement" }),
        w({ word: "change", translation: "hacer transbordo", pos: "verb", ipa: "/tʃeɪndʒ/", definition: "to move from one bus or train to another during a journey", example: "You need to change at Central Station.", exampleTranslation: "Tienes que hacer transbordo en la Estación Central.", synonyms: ["transfer", "switch"], antonyms: [], collocations: ["change trains", "change at a station"], wordFamily: ["change", "changeover"], tags: ["transport", "directions"], category: "movement" }),
      ],
      [
        { phrase: "Which platform does it leave from?", translation: "¿De qué andén sale?" },
        { phrase: "How much is a single ticket?", translation: "¿Cuánto cuesta un billete sencillo?" },
        { phrase: "Does this bus go to the centre?", translation: "¿Este autobús va al centro?" },
        { phrase: "Where do I need to change?", translation: "¿Dónde tengo que hacer transbordo?" },
      ],
      [
        { speaker: "A", text: "Excuse me, which platform is the train to Bristol?", translation: "Disculpe, ¿qué andén es el tren a Bristol?" },
        { speaker: "B", text: "Platform four. It departs in ten minutes.", translation: "El andén cuatro. Sale en diez minutos." },
        { speaker: "A", text: "Do I need to change trains?", translation: "¿Tengo que hacer transbordo?" },
        { speaker: "B", text: "Yes, change at Reading station.", translation: "Sí, haz transbordo en la estación de Reading." },
      ],
      { title: "The Morning Train", text: "Nora arrives at the station early and checks the departure board. She buys a single ticket, finds platform four, and asks another passenger where to change. The journey is quiet and she arrives on time.", translation: "Nora llega temprano a la estación y consulta el panel de salidas. Compra un billete sencillo, encuentra el andén cuatro y pregunta a otro pasajero dónde hacer transbordo. El viaje es tranquilo y llega a tiempo." },
    ),
  ],
  A2: [
    u(
      "u57",
      "Making Plans",
      "Suggest activities, arrange a time, and handle a change of plan.",
      [
        w({ word: "suggest", translation: "sugerir", pos: "verb", ipa: "/səˈdʒest/", definition: "to offer an idea for someone to consider", example: "I suggest meeting after lunch.", exampleTranslation: "Sugiero reunirnos después de comer.", synonyms: ["propose", "recommend"], antonyms: ["reject"], collocations: ["suggest an idea", "suggest meeting"], wordFamily: ["suggest", "suggestion"], tags: ["planning", "communication"], category: "action" }),
        w({ word: "plan", translation: "planificar", pos: "verb", ipa: "/plæn/", definition: "to decide what you will do in the future", example: "We are planning a picnic for Saturday.", exampleTranslation: "Estamos planeando un picnic para el sábado.", synonyms: ["organise", "arrange"], antonyms: ["improvise"], collocations: ["plan a trip", "plan ahead"], wordFamily: ["plan", "planner", "planning"], tags: ["planning", "time"], category: "action" }),
        w({ word: "prefer", translation: "preferir", pos: "verb", ipa: "/prɪˈfɜːr/", definition: "to like one choice more than another", example: "I prefer the morning because it is quieter.", exampleTranslation: "Prefiero la mañana porque es más tranquila.", synonyms: ["favour", "choose"], antonyms: ["dislike"], collocations: ["prefer to do", "prefer one option"], wordFamily: ["prefer", "preference"], tags: ["choices", "communication"], category: "opinion" }),
        w({ word: "available", translation: "disponible", pos: "adjective", ipa: "/əˈveɪləbəl/", definition: "free at a particular time", example: "Are you available on Friday evening?", exampleTranslation: "¿Estás disponible el viernes por la tarde?", synonyms: ["free", "unoccupied"], antonyms: ["busy", "unavailable"], collocations: ["available time", "available on Friday"], wordFamily: ["avail", "available", "availability"], tags: ["planning", "time"], category: "schedule" }),
        w({ word: "instead", translation: "en su lugar", pos: "adverb", ipa: "/ɪnˈsted/", definition: "in place of someone or something else", example: "The museum is closed, so we will go to the gallery instead.", exampleTranslation: "El museo está cerrado, así que iremos a la galería en su lugar.", synonyms: ["alternatively", "rather"], antonyms: [], collocations: ["instead of", "do this instead"], wordFamily: ["instead"], tags: ["choices", "planning"], category: "alternative" }),
        w({ word: "postpone", translation: "aplazar", pos: "verb", ipa: "/poʊˈspoʊn/", definition: "to move an event to a later time", example: "We had to postpone the match because of rain.", exampleTranslation: "Tuvimos que aplazar el partido por la lluvia.", synonyms: ["delay", "put off"], antonyms: ["advance", "bring forward"], collocations: ["postpone a meeting", "postpone until Monday"], wordFamily: ["postpone", "postponement"], tags: ["planning", "time"], category: "change" }),
        w({ word: "confirm", translation: "confirmar", pos: "verb", ipa: "/kənˈfɜːrm/", definition: "to say that an arrangement is definite", example: "Please confirm the booking tonight.", exampleTranslation: "Confirma la reserva esta noche, por favor.", synonyms: ["verify", "approve"], antonyms: ["cancel"], collocations: ["confirm a booking", "confirm plans"], wordFamily: ["confirm", "confirmation"], tags: ["planning", "communication"], category: "action" }),
        w({ word: "arrangement", translation: "acuerdo", pos: "noun", ipa: "/əˈreɪndʒmənt/", definition: "a plan or agreement about what will happen", example: "Our travel arrangements are ready.", exampleTranslation: "Nuestros preparativos de viaje están listos.", synonyms: ["plan", "agreement"], antonyms: [], collocations: ["travel arrangements", "make an arrangement"], wordFamily: ["arrange", "arrangement"], tags: ["planning", "travel"], category: "plan" }),
      ],
      [
        { phrase: "What do you suggest?", translation: "¿Qué sugieres?" },
        { phrase: "Are you free this afternoon?", translation: "¿Estás libre esta tarde?" },
        { phrase: "Could we postpone it until tomorrow?", translation: "¿Podríamos aplazarlo hasta mañana?" },
        { phrase: "That works for me.", translation: "Me parece bien." },
      ],
      [
        { speaker: "A", text: "What do you suggest for Saturday?", translation: "¿Qué sugieres para el sábado?" },
        { speaker: "B", text: "We could visit the gallery and have lunch nearby.", translation: "Podríamos visitar la galería y comer cerca." },
        { speaker: "A", text: "The gallery is closed. Should we postpone the visit?", translation: "La galería está cerrada. ¿Deberíamos aplazar la visita?" },
        { speaker: "B", text: "No, let us go to the park instead.", translation: "No, vayamos al parque en su lugar." },
      ],
      { title: "A Flexible Weekend", text: "Sam and Elena make plans for Saturday. Their first idea changes when the gallery closes, but they do not cancel the day. They choose the park instead, confirm the meeting time, and enjoy a picnic.", translation: "Sam y Elena hacen planes para el sábado. Su primera idea cambia cuando cierra la galería, pero no cancelan el día. Eligen el parque en su lugar, confirman la hora de encuentro y disfrutan de un picnic." },
    ),
  ],
  B1: [
    u(
      "u57",
      "Problem Solving",
      "Describe a practical problem, evaluate options, and agree on a solution.",
      [
        w({ word: "issue", translation: "problema", pos: "noun", ipa: "/ˈɪʃuː/", definition: "a problem or subject that needs attention", example: "We need to discuss the delivery issue.", exampleTranslation: "Tenemos que hablar del problema de la entrega.", synonyms: ["problem", "matter"], antonyms: ["solution"], collocations: ["address an issue", "technical issue"], wordFamily: ["issue", "issued"], tags: ["work", "communication"], category: "problem" }),
        w({ word: "identify", translation: "identificar", pos: "verb", ipa: "/aɪˈdentɪfaɪ/", definition: "to recognise or find the nature of something", example: "First, we must identify the cause.", exampleTranslation: "Primero debemos identificar la causa.", synonyms: ["recognise", "detect"], antonyms: ["overlook"], collocations: ["identify a cause", "identify a risk"], wordFamily: ["identity", "identify", "identification"], tags: ["thinking", "work"], category: "analysis" }),
        w({ word: "option", translation: "opción", pos: "noun", ipa: "/ˈɑːpʃən/", definition: "one possible choice among several", example: "The cheapest option is not always the best.", exampleTranslation: "La opción más barata no siempre es la mejor.", synonyms: ["choice", "alternative"], antonyms: [], collocations: ["available option", "consider an option"], wordFamily: ["opt", "option", "optional"], tags: ["choices", "thinking"], category: "choice" }),
        w({ word: "priority", translation: "prioridad", pos: "noun", ipa: "/praɪˈɔːrəti/", definition: "something that is more important than other things", example: "Safety is our first priority.", exampleTranslation: "La seguridad es nuestra primera prioridad.", synonyms: ["importance", "precedence"], antonyms: [], collocations: ["top priority", "set priorities"], wordFamily: ["prior", "priority"], tags: ["planning", "work"], category: "importance" }),
        w({ word: "resource", translation: "recurso", pos: "noun", ipa: "/ˈriːsɔːrs/", definition: "a useful supply of money, time, people, or materials", example: "We do not have enough resources to start today.", exampleTranslation: "No tenemos suficientes recursos para empezar hoy.", synonyms: ["asset", "means"], antonyms: [], collocations: ["limited resources", "human resources"], wordFamily: ["resource", "resourceful"], tags: ["work", "planning"], category: "support" }),
        w({ word: "estimate", translation: "estimar", pos: "verb", ipa: "/ˈestɪmeɪt/", definition: "to calculate an amount or time approximately", example: "Can you estimate the cost of the repair?", exampleTranslation: "¿Puedes estimar el coste de la reparación?", synonyms: ["calculate", "assess"], antonyms: [], collocations: ["estimate the cost", "rough estimate"], wordFamily: ["estimate", "estimation"], tags: ["thinking", "money"], category: "analysis" }),
        w({ word: "resolve", translation: "resolver", pos: "verb", ipa: "/rɪˈzɑːlv/", definition: "to solve a problem or disagreement", example: "The team resolved the issue quickly.", exampleTranslation: "El equipo resolvió el problema rápidamente.", synonyms: ["solve", "settle"], antonyms: ["create", "complicate"], collocations: ["resolve a conflict", "resolve an issue"], wordFamily: ["resolve", "resolution"], tags: ["work", "communication"], category: "solution" }),
        w({ word: "practical", translation: "práctico", pos: "adjective", ipa: "/ˈpræktɪkəl/", definition: "useful and suitable for a real situation", example: "We need a practical solution, not a perfect theory.", exampleTranslation: "Necesitamos una solución práctica, no una teoría perfecta.", synonyms: ["realistic", "useful"], antonyms: ["impractical", "theoretical"], collocations: ["practical solution", "practical advice"], wordFamily: ["practice", "practical", "practically"], tags: ["thinking", "work"], category: "quality" }),
      ],
      [
        { phrase: "Let us identify the main issue.", translation: "Identifiquemos el problema principal." },
        { phrase: "What are our options?", translation: "¿Cuáles son nuestras opciones?" },
        { phrase: "Safety should be our top priority.", translation: "La seguridad debería ser nuestra máxima prioridad." },
        { phrase: "We need a practical solution.", translation: "Necesitamos una solución práctica." },
      ],
      [
        { speaker: "A", text: "The delivery is late. What is the main issue?", translation: "La entrega llega tarde. ¿Cuál es el problema principal?" },
        { speaker: "B", text: "The supplier has limited resources this week.", translation: "El proveedor tiene recursos limitados esta semana." },
        { speaker: "A", text: "What options do we have?", translation: "¿Qué opciones tenemos?" },
        { speaker: "B", text: "We can use another supplier and resolve the delay.", translation: "Podemos usar otro proveedor y resolver el retraso." },
      ],
      { title: "A Better Delivery Plan", text: "A small business identifies a delivery problem before it affects customers. The team estimates the extra cost of using another supplier and compares two options. Because reliability is a priority, they choose the practical solution and review the result later.", translation: "Una pequeña empresa identifica un problema de entrega antes de que afecte a los clientes. El equipo estima el coste adicional de usar otro proveedor y compara dos opciones. Como la fiabilidad es una prioridad, eligen la solución práctica y revisan el resultado más tarde." },
    ),
  ],
  B2: [
    u(
      "u57",
      "Climate Policy",
      "Discuss policy trade-offs, targets, and the distribution of costs and benefits.",
      [
        w({ word: "emission", translation: "emisión", pos: "noun", ipa: "/ɪˈmɪʃən/", definition: "a gas or substance released into the air", example: "The policy aims to reduce carbon emissions.", exampleTranslation: "La política pretende reducir las emisiones de carbono.", synonyms: ["discharge", "release"], antonyms: ["absorption"], collocations: ["carbon emission", "reduce emissions"], wordFamily: ["emit", "emission"], tags: ["environment", "policy"], category: "environment" }),
        w({ word: "mitigation", translation: "mitigación", pos: "noun", ipa: "/ˌmɪtɪˈɡeɪʃən/", definition: "action that reduces the harmful effects of a problem", example: "Climate mitigation requires long-term investment.", exampleTranslation: "La mitigación climática requiere inversión a largo plazo.", synonyms: ["reduction", "moderation"], antonyms: ["exacerbation"], collocations: ["risk mitigation", "climate mitigation"], wordFamily: ["mitigate", "mitigation"], tags: ["environment", "policy"], category: "strategy" }),
        w({ word: "adaptation", translation: "adaptación", pos: "noun", ipa: "/ˌædæpˈteɪʃən/", definition: "a change made to cope with new conditions", example: "Coastal adaptation will require careful planning.", exampleTranslation: "La adaptación costera requerirá una planificación cuidadosa.", synonyms: ["adjustment", "modification"], antonyms: [], collocations: ["climate adaptation", "adaptation strategy"], wordFamily: ["adapt", "adaptable", "adaptation"], tags: ["environment", "planning"], category: "strategy" }),
        w({ word: "target", translation: "objetivo", pos: "noun", ipa: "/ˈtɑːrɡɪt/", definition: "a result that a person or organisation intends to achieve", example: "The government announced a new emissions target.", exampleTranslation: "El gobierno anunció un nuevo objetivo de emisiones.", synonyms: ["goal", "objective"], antonyms: [], collocations: ["meet a target", "set a target"], wordFamily: ["target", "targeted"], tags: ["environment", "policy"], category: "goal" }),
        w({ word: "incentive", translation: "incentivo", pos: "noun", ipa: "/ɪnˈsentɪv/", definition: "something that encourages a person or group to act", example: "A tax incentive could encourage cleaner transport.", exampleTranslation: "Un incentivo fiscal podría fomentar un transporte más limpio.", synonyms: ["motivation", "inducement"], antonyms: ["disincentive"], collocations: ["financial incentive", "provide an incentive"], wordFamily: ["incentive"], tags: ["economy", "policy"], category: "motivation" }),
        w({ word: "subsidy", translation: "subvención", pos: "noun", ipa: "/ˈsʌbsədi/", definition: "money given by a government to support an activity", example: "The subsidy helped households install solar panels.", exampleTranslation: "La subvención ayudó a los hogares a instalar paneles solares.", synonyms: ["grant", "support"], antonyms: [], collocations: ["government subsidy", "energy subsidy"], wordFamily: ["subsidise", "subsidy"], tags: ["economy", "policy"], category: "finance" }),
        w({ word: "trade-off", translation: "compromiso", pos: "noun", ipa: "/ˈtreɪd ɑːf/", definition: "a situation where one benefit is gained by accepting a disadvantage", example: "Every climate policy involves a trade-off.", exampleTranslation: "Toda política climática implica un compromiso.", synonyms: ["compromise", "exchange"], antonyms: [], collocations: ["difficult trade-off", "policy trade-off"], wordFamily: ["trade", "trade-off"], tags: ["thinking", "policy"], category: "decision" }),
        w({ word: "equitable", translation: "equitativo", pos: "adjective", ipa: "/ˈekwɪtəbəl/", definition: "fair and reasonable for everyone involved", example: "The transition must be equitable for low-income families.", exampleTranslation: "La transición debe ser equitativa para las familias de bajos ingresos.", synonyms: ["fair", "just"], antonyms: ["unfair", "unequal"], collocations: ["equitable access", "equitable transition"], wordFamily: ["equity", "equitable"], tags: ["society", "policy"], category: "quality" }),
      ],
      [
        { phrase: "The target is ambitious but achievable.", translation: "El objetivo es ambicioso pero alcanzable." },
        { phrase: "What are the costs and benefits?", translation: "¿Cuáles son los costes y beneficios?" },
        { phrase: "The policy creates a difficult trade-off.", translation: "La política crea un compromiso difícil." },
        { phrase: "The transition should be equitable.", translation: "La transición debería ser equitativa." },
      ],
      [
        { speaker: "A", text: "How can the city reduce emissions?", translation: "¿Cómo puede la ciudad reducir las emisiones?" },
        { speaker: "B", text: "It could combine a subsidy with a clear emissions target.", translation: "Podría combinar una subvención con un objetivo claro de emisiones." },
        { speaker: "A", text: "Would that be equitable?", translation: "¿Sería eso equitativo?" },
        { speaker: "B", text: "Only if low-income households receive additional support.", translation: "Solo si los hogares de bajos ingresos reciben apoyo adicional." },
      ],
      { title: "A Fairer Transition", text: "A city council is designing a climate policy. Members want to reduce emissions, but they recognise that rapid change can be expensive for some households. They compare mitigation and adaptation measures, consider subsidies and incentives, and aim for an equitable transition.", translation: "Un ayuntamiento está diseñando una política climática. Los miembros quieren reducir las emisiones, pero reconocen que un cambio rápido puede ser caro para algunos hogares. Comparan medidas de mitigación y adaptación, consideran subvenciones e incentivos y aspiran a una transición equitativa." },
    ),
  ],
  C1: [
    u(
      "u57",
      "Digital Ethics",
      "Evaluate algorithmic decisions, accountability, and competing ethical principles.",
      [
        w({ word: "algorithmic", translation: "algorítmico", pos: "adjective", ipa: "/ˌælɡəˈrɪðmɪk/", definition: "relating to a set of rules used by a computer to solve a problem", example: "Algorithmic decisions can affect access to public services.", exampleTranslation: "Las decisiones algorítmicas pueden afectar al acceso a los servicios públicos.", synonyms: ["computational", "automated"], antonyms: ["manual"], collocations: ["algorithmic decision", "algorithmic system"], wordFamily: ["algorithm", "algorithmic"], tags: ["technology", "ethics"], category: "technology" }),
        w({ word: "accountability", translation: "rendición de cuentas", pos: "noun", ipa: "/əˌkaʊntəˈbɪləti/", definition: "responsibility for decisions and the duty to explain them", example: "Public systems require clear accountability.", exampleTranslation: "Los sistemas públicos requieren una rendición de cuentas clara.", synonyms: ["responsibility", "answerability"], antonyms: ["impunity"], collocations: ["public accountability", "ensure accountability"], wordFamily: ["account", "accountable", "accountability"], tags: ["ethics", "government"], category: "responsibility" }),
        w({ word: "transparency", translation: "transparencia", pos: "noun", ipa: "/trænsˈperənsi/", definition: "the quality of being open and easy to understand", example: "Transparency helps people question automated decisions.", exampleTranslation: "La transparencia ayuda a las personas a cuestionar las decisiones automatizadas.", synonyms: ["openness", "clarity"], antonyms: ["secrecy", "opacity"], collocations: ["institutional transparency", "increase transparency"], wordFamily: ["transparent", "transparency"], tags: ["ethics", "communication"], category: "quality" }),
        w({ word: "surveillance", translation: "vigilancia", pos: "noun", ipa: "/sərˈveɪləns/", definition: "the careful watching of people or places, especially by authorities", example: "The proposal raises concerns about digital surveillance.", exampleTranslation: "La propuesta plantea preocupaciones sobre la vigilancia digital.", synonyms: ["monitoring", "observation"], antonyms: ["privacy"], collocations: ["mass surveillance", "digital surveillance"], wordFamily: ["surveil", "surveillance"], tags: ["technology", "society"], category: "monitoring" }),
        w({ word: "consent", translation: "consentimiento", pos: "noun", ipa: "/kənˈsent/", definition: "permission for something to happen", example: "Users should give informed consent before sharing data.", exampleTranslation: "Los usuarios deberían dar su consentimiento informado antes de compartir datos.", synonyms: ["permission", "approval"], antonyms: ["refusal", "objection"], collocations: ["informed consent", "obtain consent"], wordFamily: ["consent", "consensual"], tags: ["ethics", "privacy"], category: "permission" }),
        w({ word: "discrimination", translation: "discriminación", pos: "noun", ipa: "/dɪˌskrɪmɪˈneɪʃən/", definition: "unfair treatment based on a characteristic such as race, age, or gender", example: "The audit found evidence of discrimination in the system.", exampleTranslation: "La auditoría encontró indicios de discriminación en el sistema.", synonyms: ["bias", "prejudice"], antonyms: ["fairness", "equality"], collocations: ["prevent discrimination", "discrimination risk"], wordFamily: ["discriminate", "discrimination"], tags: ["ethics", "society"], category: "harm" }),
        w({ word: "audit", translation: "auditar", pos: "verb", ipa: "/ˈɔːdɪt/", definition: "to examine a system or process carefully and independently", example: "Experts audit the model every year.", exampleTranslation: "Los expertos auditan el modelo cada año.", synonyms: ["inspect", "review"], antonyms: [], collocations: ["audit a system", "independent audit"], wordFamily: ["audit", "auditor"], tags: ["technology", "work"], category: "analysis" }),
        w({ word: "safeguard", translation: "salvaguarda", pos: "noun", ipa: "/ˈseɪfɡɑːrd/", definition: "a measure that protects people or things from harm", example: "The platform added safeguards for children.", exampleTranslation: "La plataforma añadió salvaguardas para los niños.", synonyms: ["protection", "precaution"], antonyms: ["hazard"], collocations: ["legal safeguard", "put safeguards in place"], wordFamily: ["safe", "safeguard"], tags: ["technology", "safety"], category: "protection" }),
      ],
      [
        { phrase: "Who is accountable for the decision?", translation: "¿Quién rinde cuentas por la decisión?" },
        { phrase: "Users should give informed consent.", translation: "Los usuarios deberían dar un consentimiento informado." },
        { phrase: "The system needs an independent audit.", translation: "El sistema necesita una auditoría independiente." },
        { phrase: "Transparency is an ethical safeguard.", translation: "La transparencia es una salvaguarda ética." },
      ],
      [
        { speaker: "A", text: "The system rejected the application automatically.", translation: "El sistema rechazó la solicitud automáticamente." },
        { speaker: "B", text: "Then we need transparency and an independent audit.", translation: "Entonces necesitamos transparencia y una auditoría independiente." },
        { speaker: "A", text: "What about the applicants' consent?", translation: "¿Qué ocurre con el consentimiento de los solicitantes?" },
        { speaker: "B", text: "They should know how their data is used and have a way to appeal.", translation: "Deberían saber cómo se usan sus datos y tener una forma de apelar." },
      ],
      { title: "A Responsible System", text: "A public agency introduces an algorithm to process applications. Critics ask how the model was trained, whether it produces discrimination, and who is accountable for its decisions. The agency responds by publishing an explanation, commissioning an audit, and adding safeguards and an appeal process.", translation: "Una agencia pública introduce un algoritmo para procesar solicitudes. Los críticos preguntan cómo se entrenó el modelo, si produce discriminación y quién rinde cuentas por sus decisiones. La agencia responde publicando una explicación, encargando una auditoría y añadiendo salvaguardas y un proceso de apelación." },
    ),
  ],
  C2: [
    u(
      "u57",
      "Pragmatics and Politeness",
      "Analyse indirectness, face, implication, and strategic politeness in conversation.",
      [
        w({ word: "indirectness", translation: "indirección", pos: "noun", ipa: "/ˌɪndəˈrektnəs/", definition: "the quality of expressing a meaning without stating it directly", example: "Indirectness can soften a difficult request.", exampleTranslation: "La indirección puede suavizar una petición difícil.", synonyms: ["impliedness", "circumlocution"], antonyms: ["directness"], collocations: ["strategic indirectness", "use indirectness"], wordFamily: ["indirect", "indirectly", "indirectness"], tags: ["linguistics", "communication"], category: "discourse" }),
        w({ word: "politeness", translation: "cortesía", pos: "noun", ipa: "/pəˈlaɪtnəs/", definition: "behaviour that shows respect and consideration for others", example: "Politeness depends on the relationship between speakers.", exampleTranslation: "La cortesía depende de la relación entre los hablantes.", synonyms: ["courtesy", "respect"], antonyms: ["rudeness"], collocations: ["conventional politeness", "politeness strategy"], wordFamily: ["polite", "politely", "politeness"], tags: ["linguistics", "society"], category: "social behaviour" }),
        w({ word: "face", translation: "imagen social", pos: "noun", ipa: "/feɪs/", definition: "a person's public self-image in social interaction", example: "The apology helped the manager save face.", exampleTranslation: "La disculpa ayudó al gerente a salvar su imagen social.", synonyms: ["social image", "dignity"], antonyms: ["humiliation"], collocations: ["save face", "lose face"], wordFamily: ["face", "face-saving"], tags: ["linguistics", "society"], category: "social meaning" }),
        w({ word: "implication", translation: "implicación", pos: "noun", ipa: "/ˌɪmplɪˈkeɪʃən/", definition: "a meaning or possible result suggested by words or actions", example: "The implication of her silence was difficult to miss.", exampleTranslation: "Era difícil no percibir la implicación de su silencio.", synonyms: ["suggestion", "consequence"], antonyms: [], collocations: ["hidden implication", "political implication"], wordFamily: ["imply", "implicit", "implication"], tags: ["linguistics", "thinking"], category: "meaning" }),
        w({ word: "rapport", translation: "sintonía", pos: "noun", ipa: "/ræˈpɔːr/", definition: "a friendly and trusting relationship", example: "The interpreter quickly established rapport with the group.", exampleTranslation: "El intérprete estableció rápidamente una sintonía con el grupo.", synonyms: ["understanding", "connection"], antonyms: ["tension"], collocations: ["build rapport", "establish rapport"], wordFamily: ["rapport"], tags: ["communication", "relationships"], category: "relationship" }),
        w({ word: "qualifier", translation: "matizador", pos: "noun", ipa: "/ˈkwɑːlɪfaɪər/", definition: "a word or phrase that limits or changes the force of a statement", example: "The qualifier 'perhaps' signals uncertainty.", exampleTranslation: "El matizador «quizás» indica incertidumbre.", synonyms: ["modifier", "limiter"], antonyms: [], collocations: ["hedging qualifier", "use a qualifier"], wordFamily: ["qualify", "qualification", "qualifier"], tags: ["linguistics", "writing"], category: "language" }),
        w({ word: "concession", translation: "concesión", pos: "noun", ipa: "/kənˈseʃən/", definition: "something accepted or admitted before making a different point", example: "The concession makes the criticism sound more balanced.", exampleTranslation: "La concesión hace que la crítica parezca más equilibrada.", synonyms: ["admission", "compromise"], antonyms: [], collocations: ["make a concession", "rhetorical concession"], wordFamily: ["concede", "concession"], tags: ["rhetoric", "communication"], category: "argument" }),
        w({ word: "reformulate", translation: "reformular", pos: "verb", ipa: "/ˌriːˈfɔːrmjəleɪt/", definition: "to express an idea in a different way", example: "The speaker reformulated the question to avoid ambiguity.", exampleTranslation: "El hablante reformuló la pregunta para evitar la ambigüedad.", synonyms: ["rephrase", "restate"], antonyms: [], collocations: ["reformulate a question", "reformulate an argument"], wordFamily: ["formula", "formulate", "reformulate"], tags: ["linguistics", "communication"], category: "action" }),
      ],
      [
        { phrase: "Could you possibly clarify that?", translation: "¿Podrías aclararlo, si fuera posible?" },
        { phrase: "I take your point, but...", translation: "Entiendo tu punto, pero..." },
        { phrase: "That may be difficult to accept.", translation: "Eso puede ser difícil de aceptar." },
        { phrase: "Let me reformulate the question.", translation: "Déjame reformular la pregunta." },
      ],
      [
        { speaker: "A", text: "Could you send the report today?", translation: "¿Podrías enviar el informe hoy?" },
        { speaker: "B", text: "I may be able to, although the final figures are not ready.", translation: "Puede que pueda, aunque las cifras finales no están listas." },
        { speaker: "A", text: "I take your point. What would be realistic?", translation: "Entiendo tu punto. ¿Qué sería realista?" },
        { speaker: "B", text: "Tomorrow morning would be safer, if that works for you.", translation: "Mañana por la mañana sería más seguro, si te parece bien." },
      ],
      { title: "Meaning Beyond the Request", text: "In professional conversation, speakers rarely rely on literal wording alone. A qualifier can soften a claim, an indirect request can protect the listener's face, and a concession can preserve rapport during disagreement. Skilled participants interpret implication while adapting their own level of directness to the context.", translation: "En la conversación profesional, los hablantes rara vez se basan únicamente en las palabras literales. Un matizador puede suavizar una afirmación, una petición indirecta puede proteger la imagen social del oyente y una concesión puede conservar la sintonía durante un desacuerdo. Los participantes competentes interpretan la implicación y adaptan su propio grado de directividad al contexto." },
    ),
  ],
};
