// Professional English enrichment units u42-u43 for every CEFR level.
// Finnish curriculum is intentionally untouched. APIs may enrich these records later,
// but they never generate the local curriculum.
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
  word,
  translation,
  pos,
  ipa,
  definition,
  example,
  exampleTranslation,
  synonyms,
  antonyms,
  collocations,
  wordFamily,
  tags,
  category,
});

const u = (
  id: string,
  title: string,
  description: string,
  words: VocabularyItem[],
  phrases: PhraseSpec[],
  dialogue: LineSpec[],
  reading: ReadingText & { title: string },
): UnitSeed => ({ id, title, description, words, phrases, dialogue, reading });

export const ADDITIONAL_EN_PART10_UNITS: Record<string, UnitSeed[]> = {
  A0: [
    u("u42", "At Home", "Name familiar rooms and objects in a simple home.", [
      w("room", "habitación", "noun", "/ruːm/", "a space inside a building", "This room is bright.", "Esta habitación es luminosa.", ["space", "chamber"], ["outside"], ["living room", "clean a room"], ["room, roomy"], ["home", "places"], "home"),
      w("door", "puerta", "noun", "/dɔːr/", "a movable barrier used to enter or leave a place", "Please close the door.", "Por favor, cierra la puerta.", ["entrance", "gateway"], ["opening"], ["open the door", "front door"], ["door, doorway"], ["home", "objects"], "home"),
      w("window", "ventana", "noun", "/ˈwɪndoʊ/", "an opening in a wall that lets in light and air", "The window is open.", "La ventana está abierta.", ["opening", "pane"], ["wall"], ["open a window", "window frame"], ["window, windowsill"], ["home", "objects"], "home"),
      w("table", "mesa", "noun", "/ˈteɪbəl/", "a piece of furniture with a flat top", "The keys are on the table.", "Las llaves están sobre la mesa.", ["desk", "surface"], [], ["set the table", "kitchen table"], ["table, tabletop"], ["home", "furniture"], "home"),
      w("chair", "silla", "noun", "/tʃer/", "a seat for one person, usually with a back", "The chair is next to the desk.", "La silla está junto al escritorio.", ["seat", "stool"], [], ["sit on a chair", "wooden chair"], ["chair, chairperson"], ["home", "furniture"], "home"),
      w("sleep", "dormir", "verb", "/sliːp/", "to rest with your eyes closed", "I sleep eight hours.", "Duermo ocho horas.", ["rest", "nap"], ["wake"], ["sleep well", "go to sleep"], ["sleep, sleepy, sleeping"], ["home", "health"], "daily action"),
      w("cook", "cocinar", "verb", "/kʊk/", "to prepare food using heat", "We cook dinner together.", "Cocinamos la cena juntos.", ["prepare", "make"], ["order"], ["cook dinner", "cook at home"], ["cook, cooker, cooking"], ["food", "home"], "daily action"),
      w("clean", "limpiar", "verb", "/kliːn/", "to remove dirt from something", "They clean the kitchen on Saturday.", "Limpian la cocina el sábado.", ["wash", "tidy"], ["dirty"], ["clean the room", "clean carefully"], ["clean, cleaner, cleaning"], ["home", "routine"], "daily action"),
    ], [
      { phrase: "Please close the door.", translation: "Por favor, cierra la puerta." },
      { phrase: "The keys are on the table.", translation: "Las llaves están sobre la mesa." },
      { phrase: "I cook dinner at home.", translation: "Cocino la cena en casa." },
      { phrase: "It is time to sleep.", translation: "Es hora de dormir." },
    ], [
      { speaker: "A", text: "Where are the keys?", translation: "¿Dónde están las llaves?" },
      { speaker: "B", text: "They are on the table by the window.", translation: "Están sobre la mesa junto a la ventana." },
      { speaker: "A", text: "Can you clean the room later?", translation: "¿Puedes limpiar la habitación más tarde?" },
      { speaker: "B", text: "Yes, after I cook dinner.", translation: "Sí, después de cocinar la cena." },
    ], { title: "A Comfortable Home", text: "A home has rooms, doors, windows, and furniture. People cook in the kitchen, sit at a table, and sleep in a bedroom. A clean room feels comfortable.", translation: "Una casa tiene habitaciones, puertas, ventanas y muebles. Las personas cocinan en la cocina, se sientan a una mesa y duermen en un dormitorio. Una habitación limpia resulta cómoda." }),
    u("u43", "Family and Friends", "Talk about close people using simple descriptions.", [
      w("parent", "padre o madre", "noun", "/ˈperənt/", "a mother or father", "My parent is waiting outside.", "Mi padre o madre está esperando fuera.", ["mother", "father"], ["child"], ["parent and child", "new parent"], ["parent, parental, parenting"], ["family", "people"], "family"),
      w("child", "niño", "noun", "/tʃaɪld/", "a young person who is not yet an adult", "The child is reading a book.", "El niño está leyendo un libro.", ["kid", "youngster"], ["adult"], ["young child", "care for a child"], ["child, childhood, childish"], ["family", "people"], "family"),
      w("brother", "hermano", "noun", "/ˈbrʌðər/", "a male child of the same parents", "My brother likes music.", "A mi hermano le gusta la música.", ["sibling", "relative"], [], ["older brother", "younger brother"], ["brother, brotherly"], ["family", "people"], "family"),
      w("sister", "hermana", "noun", "/ˈsɪstər/", "a female child of the same parents", "My sister lives nearby.", "Mi hermana vive cerca.", ["sibling", "relative"], [], ["older sister", "younger sister"], ["sister, sisterly"], ["family", "people"], "family"),
      w("friend", "amigo", "noun", "/frend/", "a person you know and like", "A good friend listens.", "Un buen amigo escucha.", ["companion", "mate"], ["enemy"], ["close friend", "best friend"], ["friend, friendly, friendship"], ["relationships", "people"], "relationships"),
      w("kind", "amable", "adjective", "/kaɪnd/", "caring and helpful to other people", "She is kind to everyone.", "Ella es amable con todos.", ["caring", "helpful"], ["unkind"], ["kind person", "be kind"], ["kind, kindness, kindly"], ["emotion", "relationships"], "character"),
      w("help", "ayudar", "verb", "/help/", "to make something easier for someone", "Can you help me?", "¿Puedes ayudarme?", ["assist", "support"], ["hinder"], ["help a friend", "ask for help"], ["help, helper, helpful"], ["relationships", "communication"], "social action"),
      w("visit", "visitar", "verb", "/ˈvɪzɪt/", "to go to see a person or place", "We visit our family on Sunday.", "Visitamos a nuestra familia el domingo.", ["see", "call on"], ["avoid"], ["visit a friend", "visit family"], ["visit, visitor, visiting"], ["family", "travel"], "social action"),
    ], [
      { phrase: "This is my older sister.", translation: "Esta es mi hermana mayor." },
      { phrase: "A good friend listens.", translation: "Un buen amigo escucha." },
      { phrase: "Can you help me, please?", translation: "¿Puedes ayudarme, por favor?" },
      { phrase: "We visit our family on Sunday.", translation: "Visitamos a nuestra familia el domingo." },
    ], [
      { speaker: "A", text: "Who is visiting this weekend?", translation: "¿Quién viene de visita este fin de semana?" },
      { speaker: "B", text: "My brother and his child.", translation: "Mi hermano y su hijo." },
      { speaker: "A", text: "That is nice. Can I help?", translation: "Qué bien. ¿Puedo ayudar?" },
      { speaker: "B", text: "Yes, please. You are a kind friend.", translation: "Sí, por favor. Eres un amigo amable." },
    ], { title: "People We Love", text: "Families can be different, but parents, children, brothers, and sisters often help one another. Friends can also become an important part of daily life when they are kind and ready to listen.", translation: "Las familias pueden ser diferentes, pero los padres, los hijos, los hermanos y las hermanas suelen ayudarse. Los amigos también pueden convertirse en una parte importante de la vida diaria cuando son amables y saben escuchar." }),
  ],
  A1: [
    u("u42", "Making Appointments", "Arrange a time and place for a simple appointment.", [
      w("appointment", "cita", "noun", "/əˈpɔɪntmənt/", "an arranged time to meet or do something", "I have a doctor's appointment tomorrow.", "Tengo una cita médica mañana.", ["meeting", "booking"], [], ["make an appointment", "cancel an appointment"], ["appoint, appointment"], ["time", "health"], "planning"),
      w("available", "disponible", "adjective", "/əˈveɪləbəl/", "free to be used or able to meet", "Are you available at three?", "¿Estás disponible a las tres?", ["free", "accessible"], ["busy"], ["available time", "available tomorrow"], ["avail, available, availability"], ["time", "planning"], "planning"),
      w("schedule", "horario", "noun", "/ˈskedʒuːl/", "a plan showing when activities will happen", "My schedule is full today.", "Mi horario está lleno hoy.", ["timetable", "plan"], ["disorder"], ["busy schedule", "check the schedule"], ["schedule, scheduled"], ["time", "work"], "planning"),
      w("cancel", "cancelar", "verb", "/ˈkænsəl/", "to decide that an arranged event will not happen", "Please cancel my appointment.", "Por favor, cancela mi cita.", ["call off", "withdraw"], ["confirm"], ["cancel a booking", "cancel an appointment"], ["cancel, cancellation"], ["time", "communication"], "planning action"),
      w("confirm", "confirmar", "verb", "/kənˈfɜːrm/", "to say or show that something is certain", "Please confirm the time by email.", "Confirma la hora por correo, por favor.", ["verify", "approve"], ["deny"], ["confirm a booking", "confirm details"], ["confirm, confirmation"], ["communication", "planning"], "planning action"),
      w("early", "temprano", "adverb", "/ˈɜːrli/", "before the expected or usual time", "I arrived early for the meeting.", "Llegué temprano a la reunión.", ["ahead of time", "in advance"], ["late"], ["arrive early", "early morning"], ["early, earlier, earliest"], ["time", "routine"], "time"),
      w("late", "tarde", "adverb", "/leɪt/", "after the expected or usual time", "The bus is late again.", "El autobús vuelve a llegar tarde.", ["delayed", "behind time"], ["early"], ["arrive late", "late appointment"], ["late, later, latest"], ["time", "travel"], "time"),
      w("remind", "recordar", "verb", "/rɪˈmaɪnd/", "to help someone remember something", "Remind me about the meeting.", "Recuérdame la reunión.", ["prompt", "alert"], ["forget"], ["remind someone", "remind me to call"], ["remind, reminder"], ["time", "communication"], "planning action"),
    ], [
      { phrase: "Are you available on Thursday?", translation: "¿Estás disponible el jueves?" },
      { phrase: "Could we move the appointment?", translation: "¿Podríamos cambiar la cita?" },
      { phrase: "Please confirm the time.", translation: "Confirma la hora, por favor." },
      { phrase: "Remind me to call them.", translation: "Recuérdame llamarles." },
    ], [
      { speaker: "A", text: "Are you available for an appointment on Friday?", translation: "¿Estás disponible para una cita el viernes?" },
      { speaker: "B", text: "I am free in the morning, but not at noon.", translation: "Estoy libre por la mañana, pero no al mediodía." },
      { speaker: "A", text: "Nine o'clock works. Shall I confirm it?", translation: "Las nueve está bien. ¿Lo confirmo?" },
      { speaker: "B", text: "Yes, please remind me the day before.", translation: "Sí, recuérdamelo el día anterior." },
    ], { title: "A Well-Planned Week", text: "A clear schedule helps people manage appointments. They check when they are available, confirm the details, and arrive early. If a plan changes, they cancel or move the appointment and remind everyone involved.", translation: "Un horario claro ayuda a las personas a gestionar las citas. Comprueban cuándo están disponibles, confirman los detalles y llegan temprano. Si cambia un plan, cancelan o cambian la cita y avisan a todos los implicados." }),
    u("u43", "Eating Out", "Order food politely and talk about a restaurant meal.", [
      w("menu", "menú", "noun", "/ˈmenjuː/", "a list of food and drinks available in a restaurant", "Could I see the menu?", "¿Podría ver el menú?", ["list", "card"], [], ["read the menu", "menu item"], ["menu, menu-based"], ["food", "restaurants"], "restaurant"),
      w("dish", "plato", "noun", "/dɪʃ/", "a particular type of food prepared as part of a meal", "This dish contains rice and vegetables.", "Este plato contiene arroz y verduras.", ["meal", "course"], [], ["main dish", "local dish"], ["dish, dishy"], ["food", "restaurants"], "food"),
      w("ingredient", "ingrediente", "noun", "/ɪnˈɡriːdiənt/", "one of the foods used to make a dish", "What are the ingredients?", "¿Cuáles son los ingredientes?", ["component", "element"], [], ["fresh ingredients", "main ingredient"], ["ingredient, ingredients"], ["food", "cooking"], "food"),
      w("order", "pedir", "verb", "/ˈɔːrdər/", "to ask for food or drink in a restaurant", "We are ready to order.", "Estamos listos para pedir.", ["request", "choose"], ["cancel"], ["order a meal", "take an order"], ["order, ordering, orderly"], ["food", "communication"], "restaurant action"),
      w("recommend", "recomendar", "verb", "/ˌrekəˈmend/", "to suggest something as a good choice", "What do you recommend?", "¿Qué recomienda?", ["suggest", "advise"], ["discourage"], ["highly recommend", "recommend a dish"], ["recommend, recommendation"], ["food", "communication"], "restaurant action"),
      w("spicy", "picante", "adjective", "/ˈspaɪsi/", "having a strong hot flavour from spices", "The sauce is quite spicy.", "La salsa es bastante picante.", ["hot", "seasoned"], ["mild"], ["spicy food", "spicy sauce"], ["spice, spicy, spiciness"], ["food", "taste"], "taste"),
      w("fresh", "fresco", "adjective", "/freʃ/", "recently made, collected, or prepared", "The salad is fresh.", "La ensalada está fresca.", ["new", "recent"], ["stale"], ["fresh food", "fresh vegetables"], ["fresh, freshness"], ["food", "quality"], "quality"),
      w("bill", "cuenta", "noun", "/bɪl/", "a statement showing how much money is owed", "Could we have the bill, please?", "¿Podríamos tener la cuenta, por favor?", ["check", "invoice"], [], ["pay the bill", "split the bill"], ["bill, billing, billed"], ["money", "restaurants"], "payment"),
    ], [
      { phrase: "Could we have a table for two?", translation: "¿Podríamos tener una mesa para dos?" },
      { phrase: "What do you recommend?", translation: "¿Qué recomienda?" },
      { phrase: "Does this dish contain nuts?", translation: "¿Este plato contiene frutos secos?" },
      { phrase: "Could we have the bill, please?", translation: "¿Podríamos tener la cuenta, por favor?" },
    ], [
      { speaker: "A", text: "Are you ready to order?", translation: "¿Están listos para pedir?" },
      { speaker: "B", text: "Yes. What do you recommend?", translation: "Sí. ¿Qué recomienda?" },
      { speaker: "A", text: "The local dish is fresh but slightly spicy.", translation: "El plato local es fresco pero un poco picante." },
      { speaker: "B", text: "That sounds good. We will have two.", translation: "Suena bien. Tomaremos dos." },
    ], { title: "Choosing a Meal", text: "Before ordering, diners read the menu and ask about ingredients. A server may recommend a local dish. After the meal, the diners ask for the bill and decide whether to pay together or split it.", translation: "Antes de pedir, los comensales leen el menú y preguntan por los ingredientes. Un camarero puede recomendar un plato local. Después de la comida, piden la cuenta y deciden si pagan juntos o la dividen." }),
  ],
  A2: [
    u("u42", "Workplace Communication", "Write clear messages and describe everyday responsibilities at work.", [
      w("deadline", "fecha límite", "noun", "/ˈdedlaɪn/", "the latest time by which something must be finished", "The deadline is next Monday.", "La fecha límite es el próximo lunes.", ["due date", "time limit"], [], ["meet a deadline", "tight deadline"], ["deadline, deadlines"], ["work", "time"], "work"),
      w("task", "tarea", "noun", "/tæsk/", "a piece of work that needs to be done", "I finished my main task.", "Terminé mi tarea principal.", ["job", "assignment"], [], ["complete a task", "daily task"], ["task, tasked"], ["work", "planning"], "work"),
      w("feedback", "comentarios", "noun", "/ˈfiːdbæk/", "comments that help someone improve their work", "The manager gave useful feedback.", "El gerente dio comentarios útiles.", ["response", "evaluation"], ["silence"], ["constructive feedback", "receive feedback"], ["feed back, feedback"], ["work", "learning"], "communication"),
      w("colleague", "colega", "noun", "/ˈkɑːliːɡ/", "a person you work with", "My colleague joined the meeting.", "Mi colega se unió a la reunión.", ["coworker", "associate"], ["competitor"], ["close colleague", "work with colleagues"], ["colleague, collegial"], ["work", "people"], "work"),
      w("prioritize", "priorizar", "verb", "/praɪˈɔːrətaɪz/", "to decide which tasks are most important", "We must prioritize urgent requests.", "Debemos priorizar las solicitudes urgentes.", ["rank", "organize"], ["neglect"], ["prioritize tasks", "carefully prioritize"], ["priority, prioritize, prioritization"], ["work", "planning"], "work action"),
      w("delegate", "delegar", "verb", "/ˈdelɪɡeɪt/", "to give a task or responsibility to another person", "Good leaders delegate clearly.", "Los buenos líderes delegan con claridad.", ["assign", "entrust"], ["keep"], ["delegate a task", "delegate responsibility"], ["delegate, delegation, delegatee"], ["work", "leadership"], "work action"),
      w("efficient", "eficiente", "adjective", "/ɪˈfɪʃənt/", "working well without wasting time or resources", "The new process is efficient.", "El nuevo proceso es eficiente.", ["effective", "productive"], ["wasteful"], ["efficient system", "energy-efficient"], ["efficiency, efficient, efficiently"], ["work", "quality"], "quality"),
      w("flexible", "flexible", "adjective", "/ˈfleksəbəl/", "able to change or adapt easily", "Our schedule is flexible.", "Nuestro horario es flexible.", ["adaptable", "adjustable"], ["rigid"], ["flexible hours", "flexible approach"], ["flex, flexible, flexibility"], ["work", "planning"], "quality"),
    ], [
      { phrase: "What is the deadline for this task?", translation: "¿Cuál es la fecha límite para esta tarea?" },
      { phrase: "Could you give me some feedback?", translation: "¿Podrías darme algunos comentarios?" },
      { phrase: "Let us prioritize the urgent requests.", translation: "Prioricemos las solicitudes urgentes." },
      { phrase: "I can delegate part of the work.", translation: "Puedo delegar parte del trabajo." },
    ], [
      { speaker: "A", text: "Which task should we do first?", translation: "¿Qué tarea debemos hacer primero?" },
      { speaker: "B", text: "Prioritize the report because its deadline is tomorrow.", translation: "Prioriza el informe porque su fecha límite es mañana." },
      { speaker: "A", text: "Can I delegate the data check to my colleague?", translation: "¿Puedo delegar la comprobación de datos a mi colega?" },
      { speaker: "B", text: "Yes. That will make the process more efficient.", translation: "Sí. Eso hará que el proceso sea más eficiente." },
    ], { title: "A Productive Team", text: "A productive team understands its tasks and deadlines. Colleagues share feedback, prioritize urgent work, and delegate responsibilities when necessary. A flexible and efficient process leaves time for careful review.", translation: "Un equipo productivo comprende sus tareas y fechas límite. Los colegas comparten comentarios, priorizan el trabajo urgente y delegan responsabilidades cuando es necesario. Un proceso flexible y eficiente deja tiempo para una revisión cuidadosa." }),
    u("u43", "Health and Recovery", "Describe symptoms, treatment, and practical steps for recovery.", [
      w("symptom", "síntoma", "noun", "/ˈsɪmptəm/", "a change that may show an illness or condition", "A cough can be a symptom of an infection.", "La tos puede ser un síntoma de una infección.", ["sign", "indication"], ["health"], ["common symptom", "report symptoms"], ["symptom, symptomatic"], ["health", "medicine"], "health"),
      w("treatment", "tratamiento", "noun", "/ˈtriːtmənt/", "medical care given to improve a condition", "The doctor recommended a short treatment.", "El médico recomendó un tratamiento corto.", ["therapy", "care"], ["neglect"], ["medical treatment", "receive treatment"], ["treat, treatment, treatable"], ["health", "medicine"], "health"),
      w("recovery", "recuperación", "noun", "/rɪˈkʌvəri/", "the process of becoming healthy again", "Her recovery was quick.", "Su recuperación fue rápida.", ["healing", "rehabilitation"], ["illness"], ["full recovery", "recovery time"], ["recover, recovery, recovered"], ["health", "wellbeing"], "health"),
      w("appointment", "cita", "noun", "/əˈpɔɪntmənt/", "an arranged meeting with a health professional", "I booked an appointment with a nurse.", "Reservé una cita con una enfermera.", ["visit", "consultation"], [], ["medical appointment", "book an appointment"], ["appoint, appointment"], ["health", "time"], "health"),
      w("improve", "mejorar", "verb", "/ɪmˈpruːv/", "to become better or make something better", "Rest can improve your health.", "El descanso puede mejorar tu salud.", ["enhance", "recover"], ["worsen"], ["improve health", "improve gradually"], ["improve, improvement, improved"], ["health", "progress"], "change action"),
      w("recover", "recuperarse", "verb", "/rɪˈkʌvər/", "to become well again after illness or difficulty", "He recovered after a week of rest.", "Se recuperó después de una semana de descanso.", ["heal", "get better"], ["decline"], ["recover fully", "recover from illness"], ["recover, recovery, recoverable"], ["health", "time"], "health action"),
      w("severe", "grave", "adjective", "/sɪˈvɪr/", "very serious or intense", "The patient had severe pain.", "El paciente tenía un dolor grave.", ["serious", "intense"], ["mild"], ["severe pain", "severe symptoms"], ["severity, severe"], ["health", "medicine"], "health"),
      w("mild", "leve", "adjective", "/maɪld/", "not strong, serious, or extreme", "She has mild symptoms.", "Tiene síntomas leves.", ["slight", "moderate"], ["severe"], ["mild pain", "mild infection"], ["mild, mildly"], ["health", "medicine"], "health"),
    ], [
      { phrase: "How long have you had these symptoms?", translation: "¿Cuánto tiempo has tenido estos síntomas?" },
      { phrase: "The pain is mild today.", translation: "El dolor es leve hoy." },
      { phrase: "Please book a medical appointment.", translation: "Reserva una cita médica, por favor." },
      { phrase: "Rest will support your recovery.", translation: "El descanso apoyará tu recuperación." },
    ], [
      { speaker: "A", text: "How are you feeling today?", translation: "¿Cómo te sientes hoy?" },
      { speaker: "B", text: "The symptoms are mild, but I still feel tired.", translation: "Los síntomas son leves, pero todavía me siento cansado." },
      { speaker: "A", text: "You should book an appointment.", translation: "Deberías reservar una cita." },
      { speaker: "B", text: "I hope the treatment will improve my recovery.", translation: "Espero que el tratamiento mejore mi recuperación." },
    ], { title: "A Careful Recovery", text: "People should report unusual symptoms and seek advice when necessary. A health professional can recommend treatment and explain whether symptoms are mild or severe. Rest, patience, and follow-up support recovery.", translation: "Las personas deben comunicar los síntomas inusuales y pedir consejo cuando sea necesario. Un profesional de la salud puede recomendar un tratamiento y explicar si los síntomas son leves o graves. El descanso, la paciencia y el seguimiento apoyan la recuperación." }),
  ],
  B1: [
    u("u42", "News and Sources", "Evaluate news reports and distinguish evidence from opinion.", [
      w("headline", "titular", "noun", "/ˈhedlaɪn/", "the title of a news story", "The headline attracted public attention.", "El titular atrajo la atención pública.", ["title", "caption"], [], ["news headline", "front-page headline"], ["head, headline"], ["media", "news"], "media"),
      w("source", "fuente", "noun", "/sɔːrs/", "a person or place that provides information", "The article names its source.", "El artículo menciona su fuente.", ["origin", "reference"], ["destination"], ["reliable source", "primary source"], ["source, sourcing"], ["media", "research"], "information"),
      w("claim", "afirmación", "noun", "/kleɪm/", "a statement that something is true", "The report makes a surprising claim.", "El informe hace una afirmación sorprendente.", ["assertion", "allegation"], ["denial"], ["support a claim", "unverified claim"], ["claim, claimant, claimed"], ["media", "argument"], "reasoning"),
      w("bias", "sesgo", "noun", "/ˈbaɪəs/", "an unfair preference that affects judgement", "Readers should look for bias.", "Los lectores deben buscar sesgos.", ["prejudice", "partiality"], ["fairness"], ["political bias", "detect bias"], ["bias, biased"], ["media", "society"], "reasoning"),
      w("verify", "verificar", "verb", "/ˈverɪfaɪ/", "to check that information is true or accurate", "Journalists verify important facts.", "Los periodistas verifican los hechos importantes.", ["check", "confirm"], ["misrepresent"], ["verify a source", "verify information"], ["verify, verification, verifiable"], ["media", "research"], "research action"),
      w("report", "informar", "verb", "/rɪˈpɔːrt/", "to give information about an event or situation", "The newspaper reported the decision.", "El periódico informó sobre la decisión.", ["describe", "cover"], ["conceal"], ["report an event", "report accurately"], ["report, reporter, reporting"], ["media", "communication"], "communication action"),
      w("objective", "objetivo", "adjective", "/əbˈdʒektɪv/", "based on facts rather than personal feelings", "The article aims to be objective.", "El artículo intenta ser objetivo.", ["impartial", "neutral"], ["subjective"], ["objective account", "remain objective"], ["object, objective, objectivity"], ["media", "research"], "quality"),
      w("credible", "creíble", "adjective", "/ˈkredəbəl/", "believable because it seems reliable", "The witness gave a credible account.", "El testigo dio un relato creíble.", ["believable", "trustworthy"], ["unconvincing"], ["credible evidence", "credible source"], ["credit, credible, credibility"], ["media", "evidence"], "quality"),
    ], [
      { phrase: "Where did this information come from?", translation: "¿De dónde procede esta información?" },
      { phrase: "We should verify the source first.", translation: "Deberíamos verificar primero la fuente." },
      { phrase: "The claim is not yet credible.", translation: "La afirmación todavía no es creíble." },
      { phrase: "The report should remain objective.", translation: "El informe debería mantenerse objetivo." },
    ], [
      { speaker: "A", text: "Did you read the headline this morning?", translation: "¿Leíste el titular esta mañana?" },
      { speaker: "B", text: "Yes, but I want to verify the source.", translation: "Sí, pero quiero verificar la fuente." },
      { speaker: "A", text: "The article makes a strong claim.", translation: "El artículo hace una afirmación fuerte." },
      { speaker: "B", text: "We should check for bias before accepting it.", translation: "Debemos buscar sesgos antes de aceptarlo." },
    ], { title: "Reading the News Carefully", text: "A headline can attract attention, but it does not tell the whole story. Responsible readers identify the source, examine the claim, and verify important facts. They also consider whether bias affects the report and whether the evidence is credible.", translation: "Un titular puede atraer la atención, pero no cuenta toda la historia. Los lectores responsables identifican la fuente, examinan la afirmación y verifican los hechos importantes. También consideran si el sesgo afecta al informe y si las pruebas son creíbles." }),
    u("u43", "The Natural World", "Discuss habitats, conservation, and changes in the environment.", [
      w("habitat", "hábitat", "noun", "/ˈhæbɪtæt/", "the natural home of a plant or animal", "Wetlands are an important habitat.", "Los humedales son un hábitat importante.", ["environment", "home"], ["laboratory"], ["natural habitat", "protect a habitat"], ["habitat, habitable"], ["nature", "science"], "environment"),
      w("species", "especie", "noun", "/ˈspiːʃiːz/", "a group of living things with similar characteristics", "The species is threatened by habitat loss.", "La especie está amenazada por la pérdida de hábitat.", ["kind", "type"], [], ["endangered species", "native species"], ["species, speciate"], ["nature", "science"], "environment"),
      w("conservation", "conservación", "noun", "/ˌkɑːnsərˈveɪʃən/", "the protection of nature and resources", "Conservation requires local cooperation.", "La conservación requiere cooperación local.", ["preservation", "protection"], ["destruction"], ["nature conservation", "conservation project"], ["conserve, conservation, conservationist"], ["nature", "society"], "environment"),
      w("ecosystem", "ecosistema", "noun", "/ˈiːkoʊsɪstəm/", "a community of living things and their environment", "The forest ecosystem is complex.", "El ecosistema forestal es complejo.", ["ecological system", "biome"], [], ["healthy ecosystem", "ecosystem service"], ["ecology, ecosystem, ecological"], ["nature", "science"], "environment"),
      w("decline", "disminuir", "verb", "/dɪˈklaɪn/", "to become smaller, weaker, or less common", "Several bird populations declined.", "Varias poblaciones de aves disminuyeron.", ["decrease", "drop"], ["increase"], ["decline rapidly", "population decline"], ["decline, declining"], ["nature", "change"], "change action"),
      w("restore", "restaurar", "verb", "/rɪˈstɔːr/", "to return something to a better or original condition", "The project will restore the river.", "El proyecto restaurará el río.", ["repair", "renew"], ["damage"], ["restore a habitat", "restore an ecosystem"], ["restore, restoration, restorative"], ["nature", "action"], "environment action"),
      w("sustainable", "sostenible", "adjective", "/səˈsteɪnəbəl/", "able to continue without harming resources or nature", "The city needs sustainable transport.", "La ciudad necesita un transporte sostenible.", ["renewable", "viable"], ["unsustainable"], ["sustainable development", "sustainable practice"], ["sustain, sustainable, sustainability"], ["environment", "society"], "environment"),
      w("vulnerable", "vulnerable", "adjective", "/ˈvʌlnərəbəl/", "easily harmed or affected", "Young plants are vulnerable to drought.", "Las plantas jóvenes son vulnerables a la sequía.", ["at risk", "exposed"], ["protected"], ["vulnerable species", "particularly vulnerable"], ["vulnerability, vulnerable"], ["nature", "risk"], "environment"),
    ], [
      { phrase: "The species is vulnerable to climate change.", translation: "La especie es vulnerable al cambio climático." },
      { phrase: "Conservation protects the local habitat.", translation: "La conservación protege el hábitat local." },
      { phrase: "The river needs to be restored.", translation: "El río necesita ser restaurado." },
      { phrase: "Sustainable choices reduce long-term damage.", translation: "Las decisiones sostenibles reducen el daño a largo plazo." },
    ], [
      { speaker: "A", text: "Why is this forest important?", translation: "¿Por qué es importante este bosque?" },
      { speaker: "B", text: "It is a habitat for several vulnerable species.", translation: "Es un hábitat para varias especies vulnerables." },
      { speaker: "A", text: "Can conservation restore the ecosystem?", translation: "¿Puede la conservación restaurar el ecosistema?" },
      { speaker: "B", text: "Yes, if local people support sustainable practices.", translation: "Sí, si la población local apoya prácticas sostenibles." },
    ], { title: "Protecting a Living System", text: "An ecosystem depends on relationships between species and their habitat. When a habitat declines, vulnerable species may disappear. Conservation projects can restore damaged places, but long-term success usually requires sustainable choices by communities.", translation: "Un ecosistema depende de las relaciones entre las especies y su hábitat. Cuando un hábitat disminuye, las especies vulnerables pueden desaparecer. Los proyectos de conservación pueden restaurar lugares dañados, pero el éxito a largo plazo suele requerir decisiones sostenibles de las comunidades." }),
  ],
  B2: [
    u("u42", "Money and Decisions", "Discuss personal finance, risk, and responsible financial choices.", [
      w("budget", "presupuesto", "noun", "/ˈbʌdʒɪt/", "a plan for how money will be earned and spent", "We need a realistic household budget.", "Necesitamos un presupuesto familiar realista.", ["financial plan", "allowance"], ["overspending"], ["set a budget", "tight budget"], ["budget, budgetary, budgeting"], ["finance", "planning"], "finance"),
      w("income", "ingresos", "noun", "/ˈɪnkʌm/", "money received regularly from work or another source", "Her income changed after the move.", "Sus ingresos cambiaron después de la mudanza.", ["earnings", "revenue"], ["expense"], ["annual income", "household income"], ["income, incoming"], ["finance", "work"], "finance"),
      w("expense", "gasto", "noun", "/ɪkˈspens/", "money that must be paid for something", "Rent is our largest expense.", "El alquiler es nuestro mayor gasto.", ["cost", "outlay"], ["income"], ["monthly expense", "cover expenses"], ["expense, expensive"], ["finance", "home"], "finance"),
      w("interest", "interés", "noun", "/ˈɪntrəst/", "money charged for borrowing or paid for saving money", "The loan has a high interest rate.", "El préstamo tiene un tipo de interés alto.", ["charge", "return"], ["principal"], ["interest rate", "pay interest"], ["interest, interested"], ["finance", "banking"], "finance"),
      w("invest", "invertir", "verb", "/ɪnˈvest/", "to put money into something to gain a future benefit", "They invest in renewable energy.", "Invierten en energía renovable.", ["fund", "finance"], ["withdraw"], ["invest money", "invest in research"], ["invest, investment, investor"], ["finance", "business"], "finance action"),
      w("borrow", "pedir prestado", "verb", "/ˈbɑːroʊ/", "to receive and use something that must later be returned", "Can I borrow your calculator?", "¿Puedo pedir prestada tu calculadora?", ["take on loan", "use temporarily"], ["lend"], ["borrow money", "borrow a book"], ["borrow, borrower, borrowing"], ["finance", "daily life"], "finance action"),
      w("affordable", "asequible", "adjective", "/əˈfɔːrdəbəl/", "not too expensive for someone to pay", "The apartment is small but affordable.", "El apartamento es pequeño pero asequible.", ["reasonably priced", "within reach"], ["unaffordable"], ["affordable housing", "remain affordable"], ["afford, affordable, affordability"], ["finance", "housing"], "finance"),
      w("risky", "arriesgado", "adjective", "/ˈrɪski/", "involving the possibility of harm or loss", "That investment seems risky.", "Esa inversión parece arriesgada.", ["dangerous", "uncertain"], ["safe"], ["risky investment", "risky decision"], ["risk, risky, riskiness"], ["finance", "decisions"], "risk"),
    ], [
      { phrase: "We need to review the household budget.", translation: "Tenemos que revisar el presupuesto familiar." },
      { phrase: "The loan has a high interest rate.", translation: "El préstamo tiene un tipo de interés alto." },
      { phrase: "Is this investment too risky?", translation: "¿Es demasiado arriesgada esta inversión?" },
      { phrase: "Affordable housing is difficult to find.", translation: "Es difícil encontrar vivienda asequible." },
    ], [
      { speaker: "A", text: "Can we afford this apartment?", translation: "¿Podemos permitirnos este apartamento?" },
      { speaker: "B", text: "It is affordable, but the interest on the loan is high.", translation: "Es asequible, pero el interés del préstamo es alto." },
      { speaker: "A", text: "Then we should review our income and expenses.", translation: "Entonces debemos revisar nuestros ingresos y gastos." },
      { speaker: "B", text: "Agreed. We should avoid a risky decision.", translation: "De acuerdo. Debemos evitar una decisión arriesgada." },
    ], { title: "A Responsible Choice", text: "Financial decisions require more than comparing prices. A household should consider its income, regular expenses, and available budget. Borrowing or investing may be useful, but people should understand interest and assess whether a risk is affordable.", translation: "Las decisiones financieras requieren más que comparar precios. Un hogar debe considerar sus ingresos, gastos habituales y presupuesto disponible. Pedir prestado o invertir puede ser útil, pero las personas deben entender el interés y evaluar si un riesgo es asequible." }),
    u("u43", "Mind and Behaviour", "Explain habits, motivation, attention, and emotional responses.", [
      w("habit", "hábito", "noun", "/ˈhæbɪt/", "a regular behaviour that is often done automatically", "Reading before bed is a useful habit.", "Leer antes de dormir es un hábito útil.", ["routine", "practice"], ["exception"], ["healthy habit", "break a habit"], ["habit, habitual, habitually"], ["psychology", "routine"], "psychology"),
      w("motivation", "motivación", "noun", "/ˌmoʊtɪˈveɪʃən/", "the reason or desire that makes someone act", "Progress gave her motivation to continue.", "El progreso le dio motivación para continuar.", ["drive", "incentive"], ["apathy"], ["strong motivation", "intrinsic motivation"], ["motivate, motivation, motivational"], ["psychology", "learning"], "psychology"),
      w("attention", "atención", "noun", "/əˈtenʃən/", "the act of focusing on something", "The task requires careful attention.", "La tarea requiere mucha atención.", ["focus", "concentration"], ["distraction"], ["pay attention", "attention span"], ["attend, attention, attentive"], ["psychology", "learning"], "psychology"),
      w("emotion", "emoción", "noun", "/ɪˈmoʊʃən/", "a strong feeling such as joy, fear, or anger", "Fear is a powerful emotion.", "El miedo es una emoción poderosa.", ["feeling", "sentiment"], ["indifference"], ["strong emotion", "emotional response"], ["emotion, emotional, emotionally"], ["psychology", "feelings"], "psychology"),
      w("reinforce", "reforzar", "verb", "/ˌriːɪnˈfɔːrs/", "to make a behaviour or idea stronger", "Praise can reinforce good habits.", "Los elogios pueden reforzar los buenos hábitos.", ["strengthen", "support"], ["weaken"], ["reinforce a habit", "reinforce learning"], ["force, reinforce, reinforcement"], ["psychology", "learning"], "psychology action"),
      w("regulate", "regular", "verb", "/ˈreɡjəleɪt/", "to control or manage something", "Sleep helps regulate mood.", "El sueño ayuda a regular el estado de ánimo.", ["control", "manage"], ["disrupt"], ["regulate emotions", "regulate behaviour"], ["regulate, regulation, regulatory"], ["psychology", "health"], "psychology action"),
      w("impulsive", "impulsivo", "adjective", "/ɪmˈpʌlsɪv/", "acting suddenly without careful thought", "Impulsive choices can cause problems.", "Las decisiones impulsivas pueden causar problemas.", ["spontaneous", "rash"], ["deliberate"], ["impulsive behaviour", "impulsive decision"], ["impulse, impulsive, impulsively"], ["psychology", "decisions"], "psychology"),
      w("resilient", "resiliente", "adjective", "/rɪˈzɪliənt/", "able to recover after difficulty", "Resilient people learn from setbacks.", "Las personas resilientes aprenden de los contratiempos.", ["strong", "adaptable"], ["fragile"], ["resilient community", "remain resilient"], ["resilience, resilient"], ["psychology", "wellbeing"], "psychology"),
    ], [
      { phrase: "Attention is limited when we are tired.", translation: "La atención es limitada cuando estamos cansados." },
      { phrase: "Motivation can change over time.", translation: "La motivación puede cambiar con el tiempo." },
      { phrase: "Praise reinforces a useful habit.", translation: "Los elogios refuerzan un hábito útil." },
      { phrase: "Resilient people recover from setbacks.", translation: "Las personas resilientes se recuperan de los contratiempos." },
    ], [
      { speaker: "A", text: "Why is it difficult to focus today?", translation: "¿Por qué es difícil concentrarse hoy?" },
      { speaker: "B", text: "My attention is affected by stress and poor sleep.", translation: "Mi atención está afectada por el estrés y el mal sueño." },
      { speaker: "A", text: "A small routine could reinforce better habits.", translation: "Una pequeña rutina podría reforzar mejores hábitos." },
      { speaker: "B", text: "That sounds helpful and realistic.", translation: "Eso parece útil y realista." },
    ], { title: "Changing a Routine", text: "Habits can guide behaviour without conscious effort. Motivation helps people begin a change, while attention helps them notice what they are doing. Repetition can reinforce a new routine, and resilience helps people continue after setbacks.", translation: "Los hábitos pueden guiar el comportamiento sin esfuerzo consciente. La motivación ayuda a iniciar un cambio, mientras la atención ayuda a observar lo que se hace. La repetición puede reforzar una nueva rutina y la resiliencia ayuda a continuar después de los contratiempos." }),
  ],
  C1: [
    u("u42", "Leadership and Trust", "Discuss leadership, delegation, credibility, and organisational culture.", [
      w("vision", "visión", "noun", "/ˈvɪʒən/", "a clear idea of a desired future", "The director presented a vision for the organisation.", "El director presentó una visión para la organización.", ["strategy", "outlook"], ["confusion"], ["shared vision", "long-term vision"], ["visual, vision, visionary"], ["leadership", "planning"], "leadership"),
      w("authority", "autoridad", "noun", "/əˈθɔːrəti/", "the power or right to make decisions", "The manager has authority over the project.", "El gerente tiene autoridad sobre el proyecto.", ["power", "control"], ["powerlessness"], ["legal authority", "exercise authority"], ["authorize, authority, authoritative"], ["leadership", "government"], "leadership"),
      w("credibility", "credibilidad", "noun", "/ˌkredəˈbɪləti/", "the quality of being trusted or believed", "Consistency strengthens a leader's credibility.", "La coherencia fortalece la credibilidad de un líder.", ["trustworthiness", "reputation"], ["doubt"], ["build credibility", "professional credibility"], ["credible, credibility"], ["leadership", "communication"], "leadership"),
      w("culture", "cultura", "noun", "/ˈkʌltʃər/", "the shared values and practices of a group or organisation", "The company culture encourages learning.", "La cultura de la empresa fomenta el aprendizaje.", ["ethos", "environment"], ["isolation"], ["organisational culture", "workplace culture"], ["culture, cultural, culturally"], ["work", "society"], "organisation"),
      w("inspire", "inspirar", "verb", "/ɪnˈspaɪər/", "to encourage someone to act or feel positively", "Her example inspired the team.", "Su ejemplo inspiró al equipo.", ["motivate", "encourage"], ["discourage"], ["inspire confidence", "inspire a team"], ["inspire, inspiration, inspirational"], ["leadership", "emotion"], "leadership action"),
      w("negotiate", "negociar", "verb", "/nɪˈɡoʊʃieɪt/", "to discuss in order to reach an agreement", "They negotiated a fair contract.", "Negociaron un contrato justo.", ["bargain", "mediate"], ["impose"], ["negotiate a contract", "negotiate terms"], ["negotiate, negotiation, negotiator"], ["work", "communication"], "communication action"),
      w("inclusive", "inclusivo", "adjective", "/ɪnˈkluːsɪv/", "designed to include people with different identities or needs", "The policy creates an inclusive workplace.", "La política crea un lugar de trabajo inclusivo.", ["open", "welcoming"], ["exclusive"], ["inclusive culture", "inclusive practice"], ["include, inclusive, inclusion"], ["society", "work"], "society"),
      w("ethical", "ético", "adjective", "/ˈeθɪkəl/", "involving principles about what is right and fair", "The board faced an ethical choice.", "El consejo se enfrentó a una decisión ética.", ["moral", "principled"], ["unethical"], ["ethical leadership", "ethical responsibility"], ["ethics, ethical, ethically"], ["leadership", "society"], "ethics"),
    ], [
      { phrase: "A shared vision can inspire a team.", translation: "Una visión compartida puede inspirar a un equipo." },
      { phrase: "Trust strengthens organisational culture.", translation: "La confianza fortalece la cultura organizativa." },
      { phrase: "The parties negotiated the contract terms.", translation: "Las partes negociaron los términos del contrato." },
      { phrase: "Ethical leadership requires accountability.", translation: "El liderazgo ético requiere responsabilidad." },
    ], [
      { speaker: "A", text: "How can the new director build credibility?", translation: "¿Cómo puede el nuevo director construir credibilidad?" },
      { speaker: "B", text: "By communicating a clear vision and acting consistently.", translation: "Comunicando una visión clara y actuando con coherencia." },
      { speaker: "A", text: "Will the culture become more inclusive?", translation: "¿Será la cultura más inclusiva?" },
      { speaker: "B", text: "That depends on ethical decisions and genuine participation.", translation: "Eso depende de decisiones éticas y participación genuina." },
    ], { title: "Leading with Purpose", text: "Leadership is not only the exercise of authority. A credible leader communicates a vision, negotiates responsibly, and creates a culture in which people can contribute. Inclusive and ethical practices turn formal responsibility into earned trust.", translation: "El liderazgo no consiste solo en ejercer autoridad. Un líder creíble comunica una visión, negocia con responsabilidad y crea una cultura en la que las personas pueden contribuir. Las prácticas inclusivas y éticas convierten la responsabilidad formal en confianza ganada." }),
    u("u43", "Innovation and Evidence", "Evaluate new ideas, uncertainty, and responsible technological change.", [
      w("innovation", "innovación", "noun", "/ˌɪnəˈveɪʃən/", "a new idea or method that improves something", "Innovation changed the way the service works.", "La innovación cambió la forma en que funciona el servicio.", ["invention", "breakthrough"], ["stagnation"], ["technological innovation", "encourage innovation"], ["innovate, innovation, innovative"], ["technology", "business"], "innovation"),
      w("prototype", "prototipo", "noun", "/ˈproʊtətaɪp/", "an early model used to test a design", "The team tested a prototype.", "El equipo probó un prototipo.", ["model", "trial version"], ["final product"], ["build a prototype", "working prototype"], ["prototype, prototyping"], ["technology", "design"], "innovation"),
      w("evidence", "evidencia", "noun", "/ˈevɪdəns/", "facts or information that support a conclusion", "The evidence remains limited.", "La evidencia sigue siendo limitada.", ["proof", "indication"], ["disproof"], ["gather evidence", "strong evidence"], ["evident, evidence"], ["research", "reasoning"], "research"),
      w("uncertainty", "incertidumbre", "noun", "/ʌnˈsɜːrtənti/", "the state of not being known or certain", "There is uncertainty about the outcome.", "Hay incertidumbre sobre el resultado.", ["doubt", "unpredictability"], ["certainty"], ["deal with uncertainty", "scientific uncertainty"], ["certain, uncertainty, uncertain"], ["research", "decisions"], "reasoning"),
      w("adapt", "adaptarse", "verb", "/əˈdæpt/", "to change in order to work in a new situation", "The system must adapt to new needs.", "El sistema debe adaptarse a nuevas necesidades.", ["adjust", "modify"], ["resist"], ["adapt to change", "adapt a design"], ["adapt, adaptation, adaptable"], ["technology", "change"], "change action"),
      w("validate", "validar", "verb", "/ˈvælɪdeɪt/", "to test or confirm that something is sound or effective", "Users helped validate the design.", "Los usuarios ayudaron a validar el diseño.", ["confirm", "test"], ["invalidate"], ["validate a model", "validate results"], ["valid, validate, validation"], ["research", "design"], "research action"),
      w("scalable", "escalable", "adjective", "/ˈskeɪləbəl/", "able to grow without losing effectiveness", "The platform uses a scalable design.", "La plataforma utiliza un diseño escalable.", ["expandable", "extendable"], ["limited"], ["scalable solution", "scalable system"], ["scale, scalable, scalability"], ["technology", "business"], "technology"),
      w("disruptive", "disruptivo", "adjective", "/dɪsˈrʌptɪv/", "causing a major change in an established system", "The technology could be disruptive.", "La tecnología podría ser disruptiva.", ["transformative", "radical"], ["conventional"], ["disruptive technology", "disruptive innovation"], ["disrupt, disruption, disruptive"], ["technology", "business"], "innovation"),
    ], [
      { phrase: "The prototype needs further validation.", translation: "El prototipo necesita más validación." },
      { phrase: "Evidence should guide innovation.", translation: "La evidencia debería guiar la innovación." },
      { phrase: "How will the system adapt to growth?", translation: "¿Cómo se adaptará el sistema al crecimiento?" },
      { phrase: "The outcome remains uncertain.", translation: "El resultado sigue siendo incierto." },
    ], [
      { speaker: "A", text: "Is the prototype ready for users?", translation: "¿Está listo el prototipo para los usuarios?" },
      { speaker: "B", text: "Not yet. We need evidence that it works reliably.", translation: "Todavía no. Necesitamos evidencia de que funciona de forma fiable." },
      { speaker: "A", text: "Can the design adapt as demand grows?", translation: "¿Puede el diseño adaptarse al crecer la demanda?" },
      { speaker: "B", text: "Yes, it was built as a scalable system.", translation: "Sí, se construyó como un sistema escalable." },
    ], { title: "Testing Before Expansion", text: "Innovation creates opportunities but also uncertainty. A prototype allows a team to test an idea before investing heavily. Evidence can validate the design, reveal limitations, and show whether a scalable system will adapt to new demands.", translation: "La innovación crea oportunidades pero también incertidumbre. Un prototipo permite a un equipo probar una idea antes de invertir mucho. La evidencia puede validar el diseño, revelar limitaciones y mostrar si un sistema escalable se adaptará a nuevas demandas." }),
  ],
  C2: [
    u("u42", "Jurisprudence and Justice", "Analyse legal reasoning, precedent, interpretation, and competing principles.", [
      w("jurisprudence", "jurisprudencia", "noun", "/ˌdʒʊrɪsˈpruːdəns/", "the study and theory of law", "Jurisprudence examines the meaning of justice.", "La jurisprudencia examina el significado de la justicia.", ["legal theory", "philosophy of law"], [], ["legal jurisprudence", "study jurisprudence"], ["jurisprudence, jurisprudential"], ["law", "philosophy"], "law"),
      w("precedent", "precedente", "noun", "/ˈpresɪdənt/", "an earlier decision used as a guide in a later case", "The judgement followed an important precedent.", "La sentencia siguió un precedente importante.", ["example", "authority"], ["novelty"], ["legal precedent", "set a precedent"], ["precede, precedent"], ["law", "history"], "law"),
      w("statute", "ley escrita", "noun", "/ˈstætʃuːt/", "a law formally written and passed by a legislature", "The statute protects consumer rights.", "La ley escrita protege los derechos de los consumidores.", ["act", "law"], ["custom"], ["statutory law", "interpret a statute"], ["statute, statutory"], ["law", "government"], "law"),
      w("equity", "equidad", "noun", "/ˈekwəti/", "fairness that considers individual circumstances", "The court considered equity as well as strict rules.", "El tribunal consideró la equidad además de las reglas estrictas.", ["fairness", "justice"], ["inequity"], ["principle of equity", "equitable remedy"], ["equal, equity, equitable"], ["law", "ethics"], "justice"),
      w("adjudicate", "resolver judicialmente", "verb", "/əˈdʒuːdɪkeɪt/", "to make a formal decision about a dispute", "The tribunal will adjudicate the dispute.", "El tribunal resolverá judicialmente la disputa.", ["judge", "decide"], ["defer"], ["adjudicate a case", "adjudicate a dispute"], ["judge, adjudicate, adjudication"], ["law", "decisions"], "law action"),
      w("construe", "interpretar", "verb", "/kənˈstruː/", "to understand a word or action in a particular way", "The clause was construed narrowly.", "La cláusula se interpretó de forma restrictiva.", ["interpret", "understand"], ["misread"], ["construe a provision", "construe narrowly"], ["construe, construction, constructive"], ["law", "language"], "interpretation action"),
      w("arbitrary", "arbitrario", "adjective", "/ˈɑːrbətreri/", "based on personal choice rather than a fair reason", "The rule appeared arbitrary.", "La regla parecía arbitraria.", ["random", "capricious"], ["reasoned"], ["arbitrary decision", "arbitrary power"], ["arbitrate, arbitrary, arbitrariness"], ["law", "government"], "justice"),
      w("proportional", "proporcional", "adjective", "/prəˈpɔːrʃənəl/", "appropriate in size or degree to something else", "The response should be proportional to the harm.", "La respuesta debería ser proporcional al daño.", ["commensurate", "balanced"], ["disproportionate"], ["proportional response", "proportional measure"], ["proportion, proportional, proportionally"], ["law", "ethics"], "justice"),
    ], [
      { phrase: "The court relied on legal precedent.", translation: "El tribunal se basó en un precedente jurídico." },
      { phrase: "The provision can be construed narrowly.", translation: "La disposición puede interpretarse de forma restrictiva." },
      { phrase: "The penalty should be proportional to the harm.", translation: "La sanción debería ser proporcional al daño." },
      { phrase: "Equity may require a different remedy.", translation: "La equidad puede requerir un remedio diferente." },
    ], [
      { speaker: "A", text: "Why did the court reject the argument?", translation: "¿Por qué rechazó el tribunal el argumento?" },
      { speaker: "B", text: "It construed the statute in light of a binding precedent.", translation: "Interpretó la ley escrita a la luz de un precedente vinculante." },
      { speaker: "A", text: "Was the remedy equitable?", translation: "¿Fue equitativo el remedio?" },
      { speaker: "B", text: "Yes, and the response was proportional to the harm.", translation: "Sí, y la respuesta fue proporcional al daño." },
    ], { title: "Reasoning About Justice", text: "Legal reasoning balances written statutes, precedent, and principles such as equity. A court may construe a provision narrowly or broadly, but its decision should not be arbitrary. The remedy should remain proportionate to the harm and defensible in principle.", translation: "El razonamiento jurídico equilibra las leyes escritas, los precedentes y principios como la equidad. Un tribunal puede interpretar una disposición de forma restrictiva o amplia, pero su decisión no debería ser arbitraria. El remedio debe seguir siendo proporcional al daño y defendible en principio." }),
    u("u43", "Knowledge and Doubt", "Discuss justification, interpretation, objectivity, and the limits of certainty.", [
      w("epistemology", "epistemología", "noun", "/ɪˌpɪstəˈmɑːlədʒi/", "the study of knowledge and how it is justified", "Epistemology asks what counts as knowledge.", "La epistemología pregunta qué cuenta como conocimiento.", ["theory of knowledge", "philosophy"], [], ["social epistemology", "epistemological question"], ["epistemology, epistemological"], ["philosophy", "knowledge"], "philosophy"),
      w("justification", "justificación", "noun", "/ˌdʒʌstɪfɪˈkeɪʃən/", "a reason or evidence that supports a belief or action", "The claim lacks sufficient justification.", "La afirmación carece de justificación suficiente.", ["reason", "support"], ["refutation"], ["provide justification", "epistemic justification"], ["justify, justification, justifiable"], ["philosophy", "reasoning"], "knowledge"),
      w("certainty", "certeza", "noun", "/ˈsɜːrtənti/", "the state of being completely confident that something is true", "Absolute certainty is difficult to achieve.", "La certeza absoluta es difícil de alcanzar.", ["assurance", "conviction"], ["doubt"], ["degree of certainty", "claim with certainty"], ["certain, certainty, certainly"], ["philosophy", "knowledge"], "reasoning"),
      w("objectivity", "objetividad", "noun", "/ˌɑːbdʒekˈtɪvəti/", "the quality of being based on facts rather than personal views", "Objectivity is an important research ideal.", "La objetividad es un ideal importante de la investigación.", ["impartiality", "neutrality"], ["subjectivity"], ["scientific objectivity", "claim objectivity"], ["object, objective, objectivity"], ["research", "philosophy"], "knowledge"),
      w("presuppose", "presuponer", "verb", "/ˌpriːsəˈpoʊz/", "to accept something as true before examining it", "The argument presupposes a stable definition.", "El argumento presupone una definición estable.", ["assume", "take for granted"], ["question"], ["presuppose an answer", "presuppose a distinction"], ["suppose, presuppose, presupposition"], ["philosophy", "language"], "reasoning action"),
      w("question", "cuestionar", "verb", "/ˈkwestʃən/", "to express doubt about an idea or assumption", "The evidence questions the traditional account.", "La evidencia cuestiona la explicación tradicional.", ["challenge", "doubt"], ["accept"], ["question an assumption", "question a conclusion"], ["question, questioning, questionable"], ["philosophy", "research"], "reasoning action"),
      w("tentative", "provisional", "adjective", "/ˈtentətɪv/", "not yet certain or final", "The conclusion remains tentative.", "La conclusión sigue siendo provisional.", ["provisional", "uncertain"], ["definite"], ["tentative conclusion", "tentative proposal"], ["tentatively, tentative"], ["philosophy", "research"], "knowledge"),
      w("fallible", "falible", "adjective", "/ˈfæləbəl/", "capable of making mistakes", "Human observation is fallible.", "La observación humana es falible.", ["imperfect", "error-prone"], ["infallible"], ["fallible observer", "recognise fallibility"], ["fall, fallible, fallibility"], ["philosophy", "science"], "knowledge"),
    ], [
      { phrase: "The claim needs further justification.", translation: "La afirmación necesita más justificación." },
      { phrase: "Absolute certainty may be impossible.", translation: "La certeza absoluta puede ser imposible." },
      { phrase: "The argument presupposes a stable definition.", translation: "El argumento presupone una definición estable." },
      { phrase: "The conclusion remains tentative.", translation: "La conclusión sigue siendo provisional." },
    ], [
      { speaker: "A", text: "Can we claim certainty from this evidence?", translation: "¿Podemos afirmar certeza a partir de estas pruebas?" },
      { speaker: "B", text: "Not yet. The justification is still tentative.", translation: "Todavía no. La justificación sigue siendo provisional." },
      { speaker: "A", text: "Does the argument presuppose objectivity?", translation: "¿Presupone el argumento la objetividad?" },
      { speaker: "B", text: "Yes, but every observer is fallible.", translation: "Sí, pero todo observador es falible." },
    ], { title: "The Limits of Knowing", text: "Epistemology studies how beliefs become knowledge. Evidence may justify a conclusion, but certainty is often a matter of degree. A careful thinker identifies presuppositions, questions inherited claims, and accepts that observation is fallible.", translation: "La epistemología estudia cómo las creencias se convierten en conocimiento. La evidencia puede justificar una conclusión, pero la certeza suele ser una cuestión de grado. Un pensador cuidadoso identifica presuposiciones, cuestiona afirmaciones heredadas y acepta que la observación es falible." }),
  ],
};
