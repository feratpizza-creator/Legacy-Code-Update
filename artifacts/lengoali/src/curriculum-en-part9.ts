// Professional English enrichment units u40-u41 for every CEFR level.
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
  word, translation, pos, ipa, definition, example, exampleTranslation,
  synonyms, antonyms, collocations, wordFamily, tags, category,
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

export const ADDITIONAL_EN_PART9_UNITS: Record<string, UnitSeed[]> = {
  A0: [
    u("u40", "In the Classroom", "Use simple classroom language to take part in a lesson.", [
      w("board", "pizarra", "noun", "/bɔːrd/", "a surface used for writing in a classroom", "The teacher writes on the board.", "El profesor escribe en la pizarra.", ["blackboard", "whiteboard"], [], ["write on the board", "clean the board"], ["board, onboard"], ["school", "classroom"], "education"),
      w("lesson", "lección", "noun", "/ˈlesən/", "a period of learning about a subject", "The lesson starts at nine.", "La lección empieza a las nueve.", ["class", "session"], ["break"], ["attend a lesson", "English lesson"], ["lesson, lessening"], ["school", "learning"], "education"),
      w("question", "pregunta", "noun", "/ˈkwestʃən/", "something you ask to get information", "I have a question.", "Tengo una pregunta.", ["query", "request"], ["answer"], ["ask a question", "answer a question"], ["question, questioning"], ["classroom", "communication"], "education"),
      w("answer", "respuesta", "noun", "/ˈænsər/", "information given in reply to a question", "Your answer is correct.", "Tu respuesta es correcta.", ["reply", "response"], ["question"], ["correct answer", "give an answer"], ["answer, answering"], ["classroom", "communication"], "education"),
      w("read", "leer", "verb", "/riːd/", "to look at and understand written words", "Please read the sentence.", "Por favor, lee la frase.", ["study", "scan"], ["ignore"], ["read aloud", "read a sentence"], ["read, reader, reading"], ["literacy", "classroom"], "learning action"),
      w("write", "escribir", "verb", "/raɪt/", "to make words with letters or symbols", "Write your name here.", "Escribe tu nombre aquí.", ["record", "note"], ["erase"], ["write a sentence", "write down"], ["write, writer, writing"], ["literacy", "classroom"], "learning action"),
      w("listen", "escuchar", "verb", "/ˈlɪsən/", "to pay attention to a sound or speaker", "Listen to the teacher.", "Escucha al profesor.", ["hear", "pay attention"], ["ignore"], ["listen carefully", "listen to music"], ["listen, listener, listening"], ["speaking", "classroom"], "communication"),
      w("speak", "hablar", "verb", "/spiːk/", "to use your voice to communicate", "Please speak slowly.", "Por favor, habla despacio.", ["talk", "communicate"], ["be silent"], ["speak clearly", "speak English"], ["speak, speaker, speech"], ["speaking", "classroom"], "communication"),
    ], [
      { phrase: "Could you repeat that, please?", translation: "¿Podrías repetir eso, por favor?" },
      { phrase: "I do not know the answer yet.", translation: "Todavía no sé la respuesta." },
      { phrase: "Please write it on the board.", translation: "Por favor, escríbelo en la pizarra." },
      { phrase: "Let us read the sentence together.", translation: "Leamos la frase juntos." },
    ], [
      { speaker: "A", text: "Do you have a question?", translation: "¿Tienes una pregunta?" },
      { speaker: "B", text: "Yes. Could you repeat the word?", translation: "Sí. ¿Podrías repetir la palabra?" },
      { speaker: "A", text: "Of course. Listen and speak after me.", translation: "Claro. Escucha y habla después de mí." },
      { speaker: "B", text: "Thank you. I will write it down.", translation: "Gracias. La escribiré." },
    ], { title: "A Helpful Lesson", text: "In a helpful lesson, students listen to the teacher, read a short text, and write new words. They ask a question when they need help. The teacher writes a clear answer on the board.", translation: "En una lección útil, los estudiantes escuchan al profesor, leen un texto corto y escriben palabras nuevas. Hacen una pregunta cuando necesitan ayuda. El profesor escribe una respuesta clara en la pizarra." }),
    u("u41", "Faces and Senses", "Name parts of the face and describe simple senses.", [
      w("face", "cara", "noun", "/feɪs/", "the front part of a person's head", "Her face has a warm smile.", "Su cara tiene una sonrisa cálida.", ["countenance", "front"], ["back"], ["wash your face", "face to face"], ["face, facial"], ["body", "people"], "body"),
      w("ear", "oreja", "noun", "/ɪər/", "the part of the body used for hearing", "My ear hurts today.", "Me duele la oreja hoy.", ["auditory organ"], [], ["left ear", "clean your ears"], ["ear, eardrum"], ["body", "senses"], "body"),
      w("nose", "nariz", "noun", "/noʊz/", "the part of the face used for smelling and breathing", "The child has a small nose.", "El niño tiene una nariz pequeña.", [], [], ["touch your nose", "runny nose"], ["nose, nasal"], ["body", "senses"], "body"),
      w("finger", "dedo", "noun", "/ˈfɪŋɡər/", "one of the five parts at the end of a hand", "I cut my finger.", "Me corté el dedo.", ["digit"], [], ["point a finger", "fingerprint"], ["finger, fingertip"], ["body", "health"], "body"),
      w("smile", "sonrisa", "noun", "/smaɪl/", "a friendly expression made by moving the mouth upward", "Her smile is warm.", "Su sonrisa es cálida.", ["grin", "beam"], ["frown"], ["big smile", "share a smile"], ["smile, smiling, smiley"], ["emotion", "people"], "emotion"),
      w("see", "ver", "verb", "/siː/", "to notice something with your eyes", "I can see the blue car.", "Puedo ver el coche azul.", ["notice", "observe"], ["miss"], ["see clearly", "see a doctor"], ["see, sight, visible"], ["senses", "observation"], "perception"),
      w("hear", "oír", "verb", "/hɪər/", "to receive a sound with your ears", "Can you hear the music?", "¿Puedes oír la música?", ["listen", "detect"], ["ignore"], ["hear a voice", "hear clearly"], ["hear, hearing, audible"], ["senses", "communication"], "perception"),
      w("touch", "tocar", "verb", "/tʌtʃ/", "to put your hand or another part against something", "Do not touch the hot cup.", "No toques la taza caliente.", ["feel", "contact"], ["avoid"], ["touch gently", "touch the screen"], ["touch, touching, touchable"], ["senses", "safety"], "perception"),
    ], [
      { phrase: "I can hear you clearly.", translation: "Puedo oírte claramente." },
      { phrase: "Please do not touch that.", translation: "Por favor, no toques eso." },
      { phrase: "I cannot see the sign.", translation: "No puedo ver el letrero." },
      { phrase: "She greeted me with a smile.", translation: "Me saludó con una sonrisa." },
    ], [
      { speaker: "A", text: "Can you see the picture?", translation: "¿Puedes ver la imagen?" },
      { speaker: "B", text: "Yes, and I can hear the recording.", translation: "Sí, y puedo oír la grabación." },
      { speaker: "A", text: "Good. Please touch the blue button.", translation: "Bien. Toca el botón azul, por favor." },
      { speaker: "B", text: "I see it now. Thank you.", translation: "Ahora lo veo. Gracias." },
    ], { title: "Using Our Senses", text: "We use our senses every day. We see faces, hear voices, and touch objects carefully. A smile can show that a person is friendly, while our eyes and ears help us understand the world.", translation: "Usamos nuestros sentidos todos los días. Vemos caras, oímos voces y tocamos objetos con cuidado. Una sonrisa puede mostrar que una persona es amable, mientras nuestros ojos y oídos nos ayudan a entender el mundo." }),
  ],
  A1: [
    u("u40", "Getting Around", "Ask for basic transport information and describe a journey.", [
      w("station", "estación", "noun", "/ˈsteɪʃən/", "a place where trains or buses stop", "The station is near the museum.", "La estación está cerca del museo.", ["terminal", "stop"], [], ["train station", "leave the station"], ["station, stationary"], ["travel", "transport"], "transport"),
      w("platform", "andén", "noun", "/ˈplætfɔːrm/", "the raised area beside a railway track", "The train is waiting on platform three.", "El tren espera en el andén tres.", ["railway platform"], [], ["platform number", "wait on the platform"], ["platform, platformed"], ["travel", "trains"], "transport"),
      w("bus stop", "parada de autobús", "noun", "/ˈbʌs stɑːp/", "a place where a bus picks up passengers", "The bus stop is across the road.", "La parada de autobús está al otro lado de la calle.", ["bus station", "stop"], [], ["wait at a bus stop", "near the bus stop"], ["bus, stopping"], ["travel", "city"], "transport"),
      w("journey", "viaje", "noun", "/ˈdʒɜːrni/", "the act of travelling from one place to another", "The journey takes forty minutes.", "El viaje dura cuarenta minutos.", ["trip", "voyage"], ["stay"], ["long journey", "enjoy the journey"], ["journey, journeying"], ["travel", "time"], "transport"),
      w("driver", "conductor", "noun", "/ˈdraɪvər/", "a person who drives a vehicle", "The driver stopped for a passenger.", "El conductor se detuvo por un pasajero.", ["chauffeur", "motorist"], ["passenger"], ["bus driver", "safe driver"], ["drive, driver, driving"], ["travel", "jobs"], "transport"),
      w("passenger", "pasajero", "noun", "/ˈpæsɪndʒər/", "a person travelling in a vehicle but not driving it", "Every passenger needs a ticket.", "Cada pasajero necesita un billete.", ["traveller", "rider"], ["driver"], ["train passenger", "passenger seat"], ["passenger, passengerless"], ["travel", "people"], "transport"),
      w("catch", "coger", "verb", "/kætʃ/", "to get on a bus, train, or other service in time", "We need to catch the next train.", "Tenemos que coger el próximo tren.", ["take", "board"], ["miss"], ["catch a train", "catch a bus"], ["catch, catcher, catching"], ["travel", "time"], "travel action"),
      w("miss", "perder", "verb", "/mɪs/", "to arrive too late to use or see something", "I missed the last bus.", "Perdí el último autobús.", ["fail to catch", "overlook"], ["catch"], ["miss a train", "miss an opportunity"], ["miss, missed, missing"], ["travel", "time"], "travel action"),
    ], [
      { phrase: "Which platform does the train leave from?", translation: "¿De qué andén sale el tren?" },
      { phrase: "How long does the journey take?", translation: "¿Cuánto dura el viaje?" },
      { phrase: "We need to catch the next bus.", translation: "Tenemos que coger el próximo autobús." },
      { phrase: "I am sorry, we missed it.", translation: "Lo siento, lo perdimos." },
    ], [
      { speaker: "A", text: "Excuse me, where is the bus stop?", translation: "Perdón, ¿dónde está la parada de autobús?" },
      { speaker: "B", text: "It is beside the station.", translation: "Está al lado de la estación." },
      { speaker: "A", text: "Can I catch a bus to the centre?", translation: "¿Puedo coger un autobús al centro?" },
      { speaker: "B", text: "Yes, but do not miss the next one.", translation: "Sí, pero no pierdas el próximo." },
    ], { title: "A Short Journey", text: "Maya walks to the station and checks the platform. She wants to catch an early train, but the journey is delayed. The driver gives the passengers an update, so Maya knows when the train will leave.", translation: "Maya camina hasta la estación y comprueba el andén. Quiere coger un tren temprano, pero el viaje se retrasa. El conductor informa a los pasajeros, así que Maya sabe cuándo saldrá el tren." }),
    u("u41", "Weather Forecasts", "Describe common weather and understand a simple forecast.", [
      w("cloudy", "nublado", "adjective", "/ˈklaʊdi/", "covered with many clouds", "It is cloudy this morning.", "Esta mañana está nublado.", ["overcast", "grey"], ["sunny"], ["cloudy sky", "cloudy day"], ["cloud, cloudy"], ["weather", "nature"], "weather"),
      w("windy", "ventoso", "adjective", "/ˈwɪndi/", "having a lot of moving air", "It is too windy for a picnic.", "Hace demasiado viento para un picnic.", ["breezy", "blustery"], ["calm"], ["windy weather", "windy afternoon"], ["wind, windy, windiness"], ["weather", "nature"], "weather"),
      w("storm", "tormenta", "noun", "/stɔːrm/", "a period of strong wind, rain, or thunder", "The storm arrived during the night.", "La tormenta llegó durante la noche.", ["tempest", "thunderstorm"], ["calm"], ["heavy storm", "storm warning"], ["storm, stormy"], ["weather", "safety"], "weather"),
      w("season", "estación", "noun", "/ˈsiːzən/", "one of four parts of the year", "Autumn is my favourite season.", "El otoño es mi estación favorita.", ["period", "time of year"], [], ["winter season", "change of season"], ["season, seasonal"], ["calendar", "nature"], "time"),
      w("temperature", "temperatura", "noun", "/ˈtemprətʃər/", "how hot or cold something is", "The temperature is below zero.", "La temperatura está bajo cero.", ["heat", "degree"], [], ["high temperature", "room temperature"], ["temperature, temperate"], ["weather", "science"], "weather"),
      w("forecast", "pronóstico", "noun", "/ˈfɔːrkæst/", "a statement about what the weather will be like", "The forecast says it will rain.", "El pronóstico dice que lloverá.", ["prediction", "outlook"], ["hindsight"], ["weather forecast", "forecast says"], ["forecast, forecasting"], ["weather", "planning"], "weather"),
      w("shine", "brillar", "verb", "/ʃaɪn/", "to produce or reflect bright light", "The sun will shine later.", "El sol brillará más tarde.", ["glow", "gleam"], ["darken"], ["sun shines", "shine brightly"], ["shine, shiny, shining"], ["weather", "light"], "nature action"),
      w("freeze", "helarse", "verb", "/friːz/", "to become hard because of very low temperature", "Water can freeze overnight.", "El agua puede helarse durante la noche.", ["ice over", "chill"], ["melt"], ["freeze solid", "freeze water"], ["freeze, frozen, freezing"], ["weather", "science"], "nature action"),
    ], [
      { phrase: "What does the forecast say?", translation: "¿Qué dice el pronóstico?" },
      { phrase: "It will be cloudy but dry.", translation: "Estará nublado pero seco." },
      { phrase: "The temperature may fall tonight.", translation: "La temperatura puede bajar esta noche." },
      { phrase: "Take a coat because it is windy.", translation: "Lleva un abrigo porque hace viento." },
    ], [
      { speaker: "A", text: "What will the weather be like tomorrow?", translation: "¿Qué tiempo hará mañana?" },
      { speaker: "B", text: "It will be cloudy with strong wind.", translation: "Estará nublado y habrá mucho viento." },
      { speaker: "A", text: "Should we cancel the picnic?", translation: "¿Deberíamos cancelar el picnic?" },
      { speaker: "B", text: "Yes. The forecast mentions a storm.", translation: "Sí. El pronóstico menciona una tormenta." },
    ], { title: "Planning Around the Weather", text: "A good forecast helps people plan their day. When the sky is cloudy and the temperature is low, they may wear a coat. If a storm is expected, they stay indoors until the wind becomes calm.", translation: "Un buen pronóstico ayuda a las personas a planificar el día. Cuando el cielo está nublado y la temperatura es baja, pueden ponerse un abrigo. Si se espera una tormenta, se quedan dentro hasta que el viento se calme." }),
  ],
  A2: [
    u("u40", "Digital Communication", "Use common language for messages, websites, and online tasks.", [
      w("message", "mensaje", "noun", "/ˈmesɪdʒ/", "a short piece of information sent to someone", "I left you a message.", "Te dejé un mensaje.", ["note", "communication"], ["silence"], ["send a message", "text message"], ["message, messenger, messaging"], ["technology", "communication"], "digital life"),
      w("email", "correo electrónico", "noun", "/ˈiːmeɪl/", "a message sent through the internet", "Please send me an email.", "Por favor, envíame un correo electrónico.", ["electronic mail", "mail"], [], ["send an email", "email address"], ["email, emailing"], ["technology", "work"], "digital life"),
      w("password", "contraseña", "noun", "/ˈpæswɜːrd/", "a secret word used to enter an account", "Choose a strong password.", "Elige una contraseña segura.", ["passcode", "access code"], [], ["strong password", "reset a password"], ["password, password-protected"], ["security", "technology"], "digital safety"),
      w("website", "sitio web", "noun", "/ˈwebsaɪt/", "a group of pages available on the internet", "The website gives useful information.", "El sitio web ofrece información útil.", ["site", "web page"], ["offline page"], ["visit a website", "website address"], ["web, website, webmaster"], ["internet", "information"], "digital life"),
      w("upload", "subir", "verb", "/ˌʌpˈloʊd/", "to move a file from your device to the internet", "Upload the document before Friday.", "Sube el documento antes del viernes.", ["send", "transfer"], ["download"], ["upload a file", "upload a photo"], ["upload, uploader, uploaded"], ["technology", "work"], "digital action"),
      w("download", "descargar", "verb", "/ˌdaʊnˈloʊd/", "to copy a file from the internet to your device", "Download the form and complete it.", "Descarga el formulario y complétalo.", ["save", "retrieve"], ["upload"], ["download a file", "download an app"], ["download, downloadable"], ["technology", "work"], "digital action"),
      w("reply", "responder", "verb", "/rɪˈplaɪ/", "to answer a message or question", "I will reply this afternoon.", "Responderé esta tarde.", ["respond", "answer"], ["ignore"], ["reply to an email", "reply quickly"], ["reply, reply, response"], ["communication", "work"], "communication action"),
      w("share", "compartir", "verb", "/ʃer/", "to give someone access to information or an object", "Can you share the link?", "¿Puedes compartir el enlace?", ["distribute", "give"], ["withhold"], ["share a link", "share information"], ["share, shared, sharing"], ["technology", "social"], "communication action"),
    ], [
      { phrase: "I will reply to your email shortly.", translation: "Responderé pronto a tu correo." },
      { phrase: "Please reset your password.", translation: "Por favor, restablece tu contraseña." },
      { phrase: "Click here to download the form.", translation: "Haz clic aquí para descargar el formulario." },
      { phrase: "Could you share the website link?", translation: "¿Podrías compartir el enlace del sitio web?" },
    ], [
      { speaker: "A", text: "Did you receive my email?", translation: "¿Recibiste mi correo electrónico?" },
      { speaker: "B", text: "Yes, but I cannot open the website.", translation: "Sí, pero no puedo abrir el sitio web." },
      { speaker: "A", text: "I will share a new link and reply later.", translation: "Compartiré un enlace nuevo y responderé después." },
      { speaker: "B", text: "Thank you. I will download the document.", translation: "Gracias. Descargaré el documento." },
    ], { title: "A Clear Online Message", text: "Good digital communication is clear and secure. Use a strong password, check the website address, and reply to important messages. When you share or upload a file, make sure it contains the correct information.", translation: "Una buena comunicación digital es clara y segura. Usa una contraseña fuerte, comprueba la dirección del sitio web y responde a los mensajes importantes. Cuando compartas o subas un archivo, asegúrate de que contiene la información correcta." }),
    u("u41", "Preparing a Meal", "Talk about ingredients and describe basic cooking actions.", [
      w("recipe", "receta", "noun", "/ˈresəpi/", "instructions for preparing a dish", "This recipe serves four people.", "Esta receta es para cuatro personas.", ["instructions", "formula"], [], ["follow a recipe", "simple recipe"], ["recipe, recipe book"], ["food", "cooking"], "food"),
      w("ingredient", "ingrediente", "noun", "/ɪnˈɡriːdiənt/", "one of the foods used to make a dish", "Fresh ingredients improve the flavour.", "Los ingredientes frescos mejoran el sabor.", ["component", "element"], [], ["fresh ingredients", "main ingredient"], ["ingredient, ingredients"], ["food", "cooking"], "food"),
      w("meal", "comida", "noun", "/miːl/", "food eaten at a particular time of day", "We shared a meal after work.", "Compartimos una comida después del trabajo.", ["dish", "repast"], ["snack"], ["prepare a meal", "main meal"], ["meal, mealtime"], ["food", "daily life"], "food"),
      w("taste", "sabor", "noun", "/teɪst/", "the quality of food that you notice in your mouth", "The soup has a rich taste.", "La sopa tiene un sabor intenso.", ["flavour", "sensation"], ["tastelessness"], ["taste good", "strong taste"], ["taste, tasty, tasteless"], ["food", "senses"], "food"),
      w("boil", "hervir", "verb", "/bɔɪl/", "to cook something in very hot water", "Boil the potatoes for ten minutes.", "Hierve las patatas durante diez minutos.", ["cook", "simmer"], ["freeze"], ["boil water", "boil gently"], ["boil, boiled, boiling"], ["food", "cooking"], "cooking action"),
      w("bake", "hornear", "verb", "/beɪk/", "to cook food in an oven", "We bake bread on Sundays.", "Horneamos pan los domingos.", ["roast", "cook"], [], ["bake a cake", "bake in an oven"], ["bake, baker, bakery"], ["food", "cooking"], "cooking action"),
      w("slice", "cortar en rodajas", "verb", "/slaɪs/", "to cut food into thin flat pieces", "Slice the tomatoes carefully.", "Corta los tomates en rodajas con cuidado.", ["cut", "chop"], ["join"], ["slice bread", "thinly sliced"], ["slice, slicer, sliced"], ["food", "kitchen"], "cooking action"),
      w("serve", "servir", "verb", "/sɜːrv/", "to give food or drink to someone", "Serve the soup while it is hot.", "Sirve la sopa mientras está caliente.", ["offer", "provide"], ["remove"], ["serve dinner", "serve hot"], ["serve, server, service"], ["food", "hospitality"], "cooking action"),
    ], [
      { phrase: "What ingredients do we need?", translation: "¿Qué ingredientes necesitamos?" },
      { phrase: "Follow the recipe carefully.", translation: "Sigue la receta con cuidado." },
      { phrase: "Boil the water before you add the pasta.", translation: "Hierve el agua antes de añadir la pasta." },
      { phrase: "Serve the meal while it is warm.", translation: "Sirve la comida mientras está caliente." },
    ], [
      { speaker: "A", text: "What are you preparing?", translation: "¿Qué estás preparando?" },
      { speaker: "B", text: "A meal from my grandmother's recipe.", translation: "Una comida de la receta de mi abuela." },
      { speaker: "A", text: "Should I slice the vegetables?", translation: "¿Debo cortar las verduras?" },
      { speaker: "B", text: "Yes, then we can serve the soup.", translation: "Sí, después podemos servir la sopa." },
    ], { title: "From Recipe to Table", text: "A good meal begins with a clear recipe and fresh ingredients. First, prepare the vegetables and boil the water. Then bake or cook the main dish. Finally, taste the food and serve it while it is warm.", translation: "Una buena comida comienza con una receta clara e ingredientes frescos. Primero, prepara las verduras y hierve el agua. Después hornea o cocina el plato principal. Finalmente, prueba la comida y sírvela mientras está caliente." }),
  ],
  B1: [
    u("u40", "Relationships and Support", "Discuss trust, advice, disagreement, and healthy relationships.", [
      w("friendship", "amistad", "noun", "/ˈfrendʃɪp/", "a relationship between people who like and support each other", "Their friendship has lasted for years.", "Su amistad ha durado años.", ["companionship", "bond"], ["hostility"], ["close friendship", "build a friendship"], ["friend, friendly, friendship"], ["relationships", "emotion"], "relationships"),
      w("neighbour", "vecino", "noun", "/ˈneɪbər/", "a person who lives near you", "Our neighbour helped us yesterday.", "Nuestro vecino nos ayudó ayer.", ["resident", "local"], ["stranger"], ["next-door neighbour", "friendly neighbour"], ["neighbour, neighbourhood"], ["community", "people"], "community"),
      w("argument", "discusión", "noun", "/ˈɑːrɡjumənt/", "a disagreement between people", "They had an argument about money.", "Tuvieron una discusión sobre dinero.", ["dispute", "quarrel"], ["agreement"], ["have an argument", "win an argument"], ["argue, argument, argumentative"], ["relationships", "conflict"], "social interaction"),
      w("advice", "consejo", "noun", "/ədˈvaɪs/", "an opinion about what someone should do", "She gave me useful advice.", "Ella me dio un consejo útil.", ["guidance", "recommendation"], ["misdirection"], ["give advice", "follow advice"], ["advise, advice, advisory"], ["relationships", "decision-making"], "communication"),
      w("promise", "promesa", "noun", "/ˈprɑːmɪs/", "a statement that you will do something", "He kept his promise.", "Él cumplió su promesa.", ["commitment", "assurance"], ["breach"], ["make a promise", "keep a promise"], ["promise, promising"], ["relationships", "trust"], "communication"),
      w("support", "apoyo", "noun", "/səˈpɔːrt/", "help or encouragement given to someone", "Her family gave her support.", "Su familia le dio apoyo.", ["help", "assistance"], ["opposition"], ["emotional support", "offer support"], ["support, supportive, supporter"], ["relationships", "community"], "relationships"),
      w("forgive", "perdonar", "verb", "/fərˈɡɪv/", "to stop feeling angry with someone for a mistake", "It took time to forgive him.", "Tardé en perdonarlo.", ["pardon", "excuse"], ["blame"], ["forgive someone", "forgive a mistake"], ["forgive, forgiveness, forgiving"], ["emotion", "relationships"], "emotion action"),
      w("depend", "depender", "verb", "/dɪˈpend/", "to need someone or something for help or success", "Good results depend on preparation.", "Los buenos resultados dependen de la preparación.", ["rely", "count on"], ["manage alone"], ["depend on", "depend heavily"], ["depend, dependent, independence"], ["relationships", "decisions"], "relationships"),
    ], [
      { phrase: "Can I ask your advice?", translation: "¿Puedo pedirte consejo?" },
      { phrase: "We had an argument, but we talked it through.", translation: "Tuvimos una discusión, pero la hablamos." },
      { phrase: "You can depend on me.", translation: "Puedes depender de mí." },
      { phrase: "I forgive you, but please keep your promise.", translation: "Te perdono, pero por favor cumple tu promesa." },
    ], [
      { speaker: "A", text: "I had an argument with my neighbour.", translation: "Tuve una discusión con mi vecino." },
      { speaker: "B", text: "Would you like some advice?", translation: "¿Quieres algún consejo?" },
      { speaker: "A", text: "Yes. I want to repair the friendship.", translation: "Sí. Quiero reparar la amistad." },
      { speaker: "B", text: "Offer support and listen before you ask for forgiveness.", translation: "Ofrece apoyo y escucha antes de pedir perdón." },
    ], { title: "Repairing Trust", text: "Healthy relationships depend on honest communication. An argument does not always end a friendship. People can offer support, listen to advice, and forgive one another when they are willing to keep their promises.", translation: "Las relaciones sanas dependen de una comunicación honesta. Una discusión no siempre termina una amistad. Las personas pueden ofrecer apoyo, escuchar consejos y perdonarse cuando están dispuestas a cumplir sus promesas." }),
    u("u41", "Learning and Evidence", "Talk about research, challenges, solutions, and careful decisions.", [
      w("research", "investigación", "noun", "/rɪˈsɜːrtʃ/", "a careful study to discover facts or information", "The research took six months.", "La investigación duró seis meses.", ["study", "investigation"], ["guesswork"], ["conduct research", "research findings"], ["research, researcher, researched"], ["education", "science"], "learning"),
      w("result", "resultado", "noun", "/rɪˈzʌlt/", "something that happens because of an action or study", "The result surprised the team.", "El resultado sorprendió al equipo.", ["outcome", "consequence"], ["cause"], ["final result", "achieve a result"], ["result, resulting"], ["research", "decisions"], "learning"),
      w("method", "método", "noun", "/ˈmeθəd/", "a planned way of doing something", "The method is simple and reliable.", "El método es sencillo y fiable.", ["approach", "technique"], ["disorganisation"], ["research method", "effective method"], ["method, methodology, methodical"], ["education", "science"], "learning"),
      w("solution", "solución", "noun", "/səˈluːʃən/", "an answer to a problem", "We found a practical solution.", "Encontramos una solución práctica.", ["answer", "remedy"], ["problem"], ["find a solution", "propose a solution"], ["solve, solution, solvable"], ["problem-solving", "work"], "decisions"),
      w("challenge", "desafío", "noun", "/ˈtʃælɪndʒ/", "a difficult task that tests ability", "Learning a language is a challenge.", "Aprender un idioma es un desafío.", ["difficulty", "test"], ["ease"], ["face a challenge", "major challenge"], ["challenge, challenging"], ["learning", "work"], "learning"),
      w("improve", "mejorar", "verb", "/ɪmˈpruːv/", "to make something better", "Practice will improve your writing.", "La práctica mejorará tu escritura.", ["develop", "enhance"], ["damage"], ["improve skills", "improve performance"], ["improve, improvement, improved"], ["learning", "progress"], "learning action"),
      w("identify", "identificar", "verb", "/aɪˈdentɪfaɪ/", "to recognise or name something correctly", "Researchers identified the main cause.", "Los investigadores identificaron la causa principal.", ["recognise", "detect"], ["misidentify"], ["identify a problem", "identify a pattern"], ["identify, identification, identifiable"], ["research", "analysis"], "thinking action"),
      w("evaluate", "evaluar", "verb", "/ɪˈvæljueɪt/", "to judge the quality or value of something", "We need to evaluate the evidence.", "Tenemos que evaluar las pruebas.", ["assess", "judge"], ["ignore"], ["evaluate evidence", "evaluate performance"], ["evaluate, evaluation, evaluative"], ["research", "decisions"], "thinking action"),
    ], [
      { phrase: "The research produced an unexpected result.", translation: "La investigación produjo un resultado inesperado." },
      { phrase: "We need a method that we can repeat.", translation: "Necesitamos un método que podamos repetir." },
      { phrase: "Let us identify the real challenge first.", translation: "Identifiquemos primero el desafío real." },
      { phrase: "Evaluate the evidence before deciding.", translation: "Evalúa las pruebas antes de decidir." },
    ], [
      { speaker: "A", text: "What is the main challenge?", translation: "¿Cuál es el desafío principal?" },
      { speaker: "B", text: "We need to identify why the results differ.", translation: "Tenemos que identificar por qué difieren los resultados." },
      { speaker: "A", text: "Can we evaluate the method?", translation: "¿Podemos evaluar el método?" },
      { speaker: "B", text: "Yes, then we can propose a better solution.", translation: "Sí, después podremos proponer una solución mejor." },
    ], { title: "A Careful Investigation", text: "Good research begins with a clear question and a suitable method. Researchers identify a challenge, collect evidence, and evaluate the results. If the method is weak, the solution may not improve the situation.", translation: "Una buena investigación comienza con una pregunta clara y un método adecuado. Los investigadores identifican un desafío, reúnen pruebas y evalúan los resultados. Si el método es débil, la solución puede no mejorar la situación." }),
  ],
  B2: [
    u("u40", "Projects and Negotiation", "Use professional language for planning, deadlines, and shared outcomes.", [
      w("agenda", "orden del día", "noun", "/əˈdʒendə/", "a list of topics for a meeting", "The first item on the agenda is the budget.", "El primer punto del orden del día es el presupuesto.", ["schedule", "programme"], ["improvisation"], ["meeting agenda", "set an agenda"], ["agenda, agendas"], ["work", "meetings"], "business"),
      w("deadline", "fecha límite", "noun", "/ˈdedlaɪn/", "the latest time by which something must be finished", "We must meet the deadline.", "Debemos cumplir la fecha límite.", ["due date", "cut-off point"], ["extension"], ["tight deadline", "meet a deadline"], ["deadline, deadlines"], ["work", "planning"], "business"),
      w("stakeholder", "parte interesada", "noun", "/ˈsteɪkhoʊldər/", "a person or group affected by a project or decision", "Every stakeholder received an update.", "Cada parte interesada recibió una actualización.", ["participant", "interested party"], ["outsider"], ["key stakeholder", "stakeholder needs"], ["stakeholder, stakeholders"], ["work", "society"], "business"),
      w("budget", "presupuesto", "noun", "/ˈbʌdʒɪt/", "a plan for how money will be spent", "The project is within budget.", "El proyecto está dentro del presupuesto.", ["financial plan", "allowance"], ["overspending"], ["project budget", "limited budget"], ["budget, budgeting, budgetary"], ["work", "money"], "business"),
      w("negotiate", "negociar", "verb", "/nɪˈɡoʊʃieɪt/", "to discuss in order to reach an agreement", "They negotiated a fair contract.", "Negociaron un contrato justo.", ["bargain", "discuss"], ["impose"], ["negotiate a contract", "negotiate terms"], ["negotiate, negotiation, negotiator"], ["work", "communication"], "business action"),
      w("implement", "implementar", "verb", "/ˈɪmplɪment/", "to put a plan or decision into effect", "The team implemented the new policy.", "El equipo implementó la nueva política.", ["apply", "carry out"], ["abandon"], ["implement a plan", "implement changes"], ["implement, implementation"], ["work", "planning"], "business action"),
      w("coordinate", "coordinar", "verb", "/koʊˈɔːrdɪneɪt/", "to organise people or activities so they work together", "She coordinates the research teams.", "Ella coordina los equipos de investigación.", ["organise", "align"], ["disorganise"], ["coordinate efforts", "coordinate a project"], ["coordinate, coordination, coordinator"], ["work", "teamwork"], "business action"),
      w("outcome", "resultado", "noun", "/ˈaʊtkʌm/", "the final result of an action or process", "The outcome exceeded expectations.", "El resultado superó las expectativas.", ["result", "consequence"], ["input"], ["positive outcome", "desired outcome"], ["outcome, outcomes"], ["work", "decisions"], "business"),
    ], [
      { phrase: "Let us add this to the agenda.", translation: "Añadamos esto al orden del día." },
      { phrase: "Can we agree on a realistic deadline?", translation: "¿Podemos acordar una fecha límite realista?" },
      { phrase: "We need to negotiate the terms.", translation: "Tenemos que negociar las condiciones." },
      { phrase: "The outcome depends on coordination.", translation: "El resultado depende de la coordinación." },
    ], [
      { speaker: "A", text: "The deadline is close, but the budget is limited.", translation: "La fecha límite está cerca, pero el presupuesto es limitado." },
      { speaker: "B", text: "Then we should negotiate the scope with the stakeholders.", translation: "Entonces deberíamos negociar el alcance con las partes interesadas." },
      { speaker: "A", text: "I will coordinate the meeting.", translation: "Coordinaré la reunión." },
      { speaker: "B", text: "Good. A clear agenda will improve the outcome.", translation: "Bien. Un orden del día claro mejorará el resultado." },
    ], { title: "A Project Meeting", text: "Successful projects need a realistic budget, a clear agenda, and an agreed deadline. Managers coordinate stakeholders, negotiate difficult terms, and implement decisions. These choices shape the final outcome.", translation: "Los proyectos exitosos necesitan un presupuesto realista, un orden del día claro y una fecha límite acordada. Los responsables coordinan a las partes interesadas, negocian condiciones difíciles e implementan decisiones. Estas decisiones determinan el resultado final." }),
    u("u41", "Scientific Methods", "Discuss experiments, variables, observations, and reliable results.", [
      w("hypothesis", "hipótesis", "noun", "/haɪˈpɑːθəsɪs/", "an idea that can be tested by investigation", "The experiment tested our hypothesis.", "El experimento comprobó nuestra hipótesis.", ["proposal", "theory"], ["fact"], ["test a hypothesis", "working hypothesis"], ["hypothesis, hypothetical"], ["science", "research"], "science"),
      w("experiment", "experimento", "noun", "/ɪkˈsperɪmənt/", "a scientific test carried out to learn something", "The experiment produced useful data.", "El experimento produjo datos útiles.", ["test", "trial"], ["certainty"], ["conduct an experiment", "controlled experiment"], ["experiment, experimental, experimenter"], ["science", "research"], "science"),
      w("variable", "variable", "noun", "/ˈveriəbəl/", "a factor that can change in an experiment or situation", "Age was the main variable.", "La edad era la variable principal.", ["factor", "element"], ["constant"], ["independent variable", "control a variable"], ["vary, variable, variation"], ["science", "analysis"], "science"),
      w("sample", "muestra", "noun", "/ˈsæmpəl/", "a small group used to represent a larger group", "The sample included two hundred adults.", "La muestra incluía a doscientos adultos.", ["specimen", "selection"], ["population"], ["random sample", "sample size"], ["sample, sampling"], ["science", "research"], "science"),
      w("observe", "observar", "verb", "/əbˈzɜːrv/", "to watch carefully in order to notice facts", "We observed a change in behaviour.", "Observamos un cambio de comportamiento.", ["notice", "monitor"], ["overlook"], ["observe closely", "observe a pattern"], ["observe, observation, observer"], ["science", "attention"], "research action"),
      w("analyse", "analizar", "verb", "/ˈænəlaɪz/", "to examine information in detail", "The team analysed the results.", "El equipo analizó los resultados.", ["examine", "study"], ["ignore"], ["analyse data", "analyse a result"], ["analyse, analysis, analytical"], ["science", "thinking"], "research action"),
      w("reliable", "fiable", "adjective", "/rɪˈlaɪəbəl/", "likely to be correct or to work well consistently", "The instrument gives reliable readings.", "El instrumento da lecturas fiables.", ["dependable", "consistent"], ["unreliable"], ["reliable evidence", "reliable method"], ["rely, reliable, reliability"], ["science", "quality"], "evaluation"),
      w("significant", "significativo", "adjective", "/sɪɡˈnɪfɪkənt/", "important enough to be noticed or measured", "The difference was statistically significant.", "La diferencia fue estadísticamente significativa.", ["important", "substantial"], ["insignificant"], ["significant difference", "significant result"], ["signify, significant, significance"], ["science", "analysis"], "evaluation"),
    ], [
      { phrase: "The experiment tests a clear hypothesis.", translation: "El experimento comprueba una hipótesis clara." },
      { phrase: "We need a larger sample size.", translation: "Necesitamos un tamaño de muestra mayor." },
      { phrase: "Observe the variable carefully.", translation: "Observa la variable con cuidado." },
      { phrase: "The evidence is reliable and significant.", translation: "Las pruebas son fiables y significativas." },
    ], [
      { speaker: "A", text: "What did the experiment show?", translation: "¿Qué mostró el experimento?" },
      { speaker: "B", text: "The sample produced a significant difference.", translation: "La muestra produjo una diferencia significativa." },
      { speaker: "A", text: "Can we rely on the result?", translation: "¿Podemos confiar en el resultado?" },
      { speaker: "B", text: "Yes, the method was controlled and reliable.", translation: "Sí, el método fue controlado y fiable." },
    ], { title: "Testing an Idea", text: "A scientific experiment begins with a hypothesis. Researchers choose a sample, control important variables, and observe what happens. They analyse the data before deciding whether the result is reliable and significant.", translation: "Un experimento científico comienza con una hipótesis. Los investigadores eligen una muestra, controlan variables importantes y observan lo que ocurre. Analizan los datos antes de decidir si el resultado es fiable y significativo." }),
  ],
  C1: [
    u("u40", "Policy and Accountability", "Analyse public decisions, evidence, responsibility, and reform.", [
      w("legislation", "legislación", "noun", "/ˌledʒɪˈsleɪʃən/", "laws considered or made by a government", "The legislation protects vulnerable workers.", "La legislación protege a los trabajadores vulnerables.", ["law", "statute"], ["lawlessness"], ["new legislation", "pass legislation"], ["legislate, legislation, legislative"], ["government", "law"], "public policy"),
      w("accountability", "rendición de cuentas", "noun", "/əˌkaʊntəˈbɪləti/", "the duty to explain actions and accept responsibility", "Public accountability builds trust.", "La rendición de cuentas genera confianza.", ["responsibility", "answerability"], ["impunity"], ["public accountability", "ensure accountability"], ["account, accountable, accountability"], ["government", "ethics"], "public policy"),
      w("reform", "reforma", "noun", "/rɪˈfɔːrm/", "a change intended to improve a system", "The reform changed the health service.", "La reforma cambió el servicio de salud.", ["improvement", "revision"], ["decline"], ["political reform", "reform a system"], ["reform, reformer, reformist"], ["government", "society"], "public policy"),
      w("implication", "implicación", "noun", "/ˌɪmplɪˈkeɪʃən/", "a possible effect or meaning of an action or statement", "The decision has serious implications.", "La decisión tiene implicaciones graves.", ["consequence", "meaning"], ["cause"], ["practical implication", "wider implications"], ["imply, implication, implicit"], ["analysis", "decisions"], "reasoning"),
      w("framework", "marco", "noun", "/ˈfreɪmwɜːrk/", "a structure used to organise ideas or action", "The framework guides future policy.", "El marco orienta la política futura.", ["structure", "model"], ["disorder"], ["legal framework", "conceptual framework"], ["frame, framework, framed"], ["policy", "analysis"], "reasoning"),
      w("consensus", "consenso", "noun", "/kənˈsensəs/", "general agreement among a group", "The committee reached a consensus.", "El comité alcanzó un consenso.", ["agreement", "accord"], ["disagreement"], ["broad consensus", "reach consensus"], ["consent, consensus, consensual"], ["government", "communication"], "social process"),
      w("facilitate", "facilitar", "verb", "/fəˈsɪlɪteɪt/", "to make an action or process easier", "The meeting facilitated a useful exchange.", "La reunión facilitó un intercambio útil.", ["enable", "assist"], ["hinder"], ["facilitate discussion", "facilitate access"], ["facility, facilitate, facilitator"], ["work", "communication"], "process action"),
      w("allocate", "asignar", "verb", "/ˈæləkeɪt/", "to give money, time, or resources for a purpose", "The council allocated funds to housing.", "El ayuntamiento asignó fondos a la vivienda.", ["assign", "distribute"], ["withhold"], ["allocate resources", "allocate funding"], ["allocate, allocation"], ["government", "money"], "policy action"),
    ], [
      { phrase: "The legislation has wider implications.", translation: "La legislación tiene implicaciones más amplias." },
      { phrase: "Who is accountable for this decision?", translation: "¿Quién rinde cuentas por esta decisión?" },
      { phrase: "The framework facilitates cooperation.", translation: "El marco facilita la cooperación." },
      { phrase: "The committee reached a broad consensus.", translation: "El comité alcanzó un consenso amplio." },
    ], [
      { speaker: "A", text: "Will the reform improve public services?", translation: "¿Mejorará la reforma los servicios públicos?" },
      { speaker: "B", text: "That depends on how funds are allocated.", translation: "Eso depende de cómo se asignen los fondos." },
      { speaker: "A", text: "The framework also requires accountability.", translation: "El marco también requiere rendición de cuentas." },
      { speaker: "B", text: "Then public discussion should facilitate consensus.", translation: "Entonces el debate público debería facilitar el consenso." },
    ], { title: "Designing Better Policy", text: "Effective legislation needs a clear framework and public accountability. A reform may have positive implications, but its results depend on how resources are allocated. Open discussion can facilitate consensus and reveal responsibilities.", translation: "Una legislación eficaz necesita un marco claro y rendición de cuentas pública. Una reforma puede tener implicaciones positivas, pero sus resultados dependen de cómo se asignen los recursos. Un debate abierto puede facilitar el consenso y revelar responsabilidades." }),
    u("u41", "Argument and Interpretation", "Use precise language to discuss meaning, evidence, and competing readings.", [
      w("rhetoric", "retórica", "noun", "/ˈretərɪk/", "the art of using language effectively to persuade", "The speech relies on powerful rhetoric.", "El discurso se basa en una retórica poderosa.", ["persuasion", "oratory"], ["plain speech"], ["political rhetoric", "rhetorical question"], ["rhetoric, rhetorical, rhetorician"], ["language", "politics"], "discourse"),
      w("irony", "ironía", "noun", "/ˈaɪrəni/", "a contrast between what is said and what is meant", "The irony of the remark was clear.", "La ironía del comentario era clara.", ["sarcasm", "incongruity"], ["sincerity"], ["dramatic irony", "use irony"], ["irony, ironic, ironically"], ["language", "literature"], "discourse"),
      w("ambiguity", "ambigüedad", "noun", "/ˌæmbɪˈɡjuːəti/", "the quality of having more than one possible meaning", "The sentence contains deliberate ambiguity.", "La frase contiene una ambigüedad deliberada.", ["uncertainty", "vagueness"], ["clarity"], ["deliberate ambiguity", "resolve ambiguity"], ["ambiguous, ambiguity"], ["language", "analysis"], "discourse"),
      w("perspective", "perspectiva", "noun", "/pərˈspektɪv/", "a particular way of seeing or understanding something", "The novel shifts perspective.", "La novela cambia de perspectiva.", ["viewpoint", "outlook"], ["blindness"], ["different perspective", "from a perspective"], ["perspective, perspectival"], ["analysis", "culture"], "interpretation"),
      w("assertion", "afirmación", "noun", "/əˈsɜːrʃən/", "a confident statement that something is true", "The assertion requires evidence.", "La afirmación requiere pruebas.", ["claim", "declaration"], ["denial"], ["make an assertion", "unsupported assertion"], ["assert, assertion, assertive"], ["argument", "evidence"], "reasoning"),
      w("concession", "concesión", "noun", "/kənˈseʃən/", "an acknowledgement that another point is partly true", "The essay begins with a concession.", "El ensayo comienza con una concesión.", ["admission", "compromise"], ["rejection"], ["make a concession", "rhetorical concession"], ["concede, concession"], ["argument", "writing"], "reasoning"),
      w("coherent", "coherente", "adjective", "/koʊˈhɪrənt/", "clear and logically connected", "Her explanation was coherent and concise.", "Su explicación fue coherente y concisa.", ["logical", "consistent"], ["confused"], ["coherent argument", "coherent account"], ["cohere, coherent, coherence"], ["writing", "communication"], "discourse"),
      w("articulate", "articular", "verb", "/ɑːrˈtɪkjəleɪt/", "to express an idea clearly in words", "He articulated his concerns calmly.", "Él articuló sus preocupaciones con calma.", ["express", "formulate"], ["mumble"], ["articulate an argument", "clearly articulate"], ["articulate, articulation, articulate"], ["speaking", "writing"], "communication action"),
    ], [
      { phrase: "The argument is coherent but not conclusive.", translation: "El argumento es coherente pero no concluyente." },
      { phrase: "The author offers a useful perspective.", translation: "El autor ofrece una perspectiva útil." },
      { phrase: "This assertion needs further evidence.", translation: "Esta afirmación necesita más pruebas." },
      { phrase: "The concession strengthens the argument.", translation: "La concesión fortalece el argumento." },
    ], [
      { speaker: "A", text: "How should we interpret the passage?", translation: "¿Cómo debemos interpretar el pasaje?" },
      { speaker: "B", text: "Its ambiguity allows more than one perspective.", translation: "Su ambigüedad permite más de una perspectiva." },
      { speaker: "A", text: "Can the author articulate a coherent claim?", translation: "¿Puede el autor articular una afirmación coherente?" },
      { speaker: "B", text: "Yes, but the rhetoric is deliberately ironic.", translation: "Sí, pero la retórica es deliberadamente irónica." },
    ], { title: "Reading Between the Lines", text: "Interpretation requires more than identifying the words on a page. A coherent reader notices perspective, ambiguity, and irony. A strong argument articulates an assertion, acknowledges a concession, and supports its conclusion with evidence.", translation: "La interpretación requiere más que identificar las palabras de una página. Un lector coherente observa la perspectiva, la ambigüedad y la ironía. Un argumento sólido articula una afirmación, reconoce una concesión y apoya su conclusión con pruebas." }),
  ],
  C2: [
    u("u40", "Language in Context", "Examine dialect, register, meaning, and pragmatic effect.", [
      w("dialect", "dialecto", "noun", "/ˈdaɪəlekt/", "a form of a language used in a particular region or group", "The village has a distinctive dialect.", "El pueblo tiene un dialecto distintivo.", ["variety", "vernacular"], ["standard language"], ["regional dialect", "speak a dialect"], ["dialect, dialectal"], ["linguistics", "culture"], "language"),
      w("register", "registro", "noun", "/ˈredʒɪstər/", "a level of formality appropriate to a situation", "The email uses a formal register.", "El correo usa un registro formal.", ["style", "level"], ["informality"], ["formal register", "shift register"], ["register, registered"], ["linguistics", "communication"], "language"),
      w("semantics", "semántica", "noun", "/sɪˈmæntɪks/", "the study of meaning in language", "Semantics examines the meaning of words.", "La semántica examina el significado de las palabras.", ["meaning", "signification"], [], ["formal semantics", "semantic relation"], ["semantic, semantically"], ["linguistics", "meaning"], "language study"),
      w("pragmatics", "pragmática", "noun", "/præɡˈmætɪks/", "the study of meaning in relation to context and use", "Pragmatics explains the indirect request.", "La pragmática explica la petición indirecta.", ["language use", "contextual meaning"], [], ["pragmatic meaning", "study pragmatics"], ["pragmatic, pragmatically"], ["linguistics", "context"], "language study"),
      w("metaphor", "metáfora", "noun", "/ˈmetəfɔːr/", "a comparison that describes one thing as another", "The metaphor gives the poem force.", "La metáfora da fuerza al poema.", ["figure of speech", "image"], ["literal statement"], ["extended metaphor", "use a metaphor"], ["metaphor, metaphorical"], ["literature", "language"], "rhetoric"),
      w("connotation", "connotación", "noun", "/ˌkɑːnəˈteɪʃən/", "an additional feeling or idea associated with a word", "The word has a negative connotation.", "La palabra tiene una connotación negativa.", ["association", "implication"], ["denotation"], ["cultural connotation", "negative connotation"], ["connote, connotation"], ["linguistics", "culture"], "meaning"),
      w("infer", "inferir", "verb", "/ɪnˈfɜːr/", "to reach a conclusion from evidence rather than direct statement", "We can infer the speaker's attitude.", "Podemos inferir la actitud del hablante.", ["deduce", "conclude"], ["misinterpret"], ["infer meaning", "infer from evidence"], ["infer, inference, inferential"], ["analysis", "reading"], "thinking action"),
      w("disambiguate", "desambiguar", "verb", "/ˌdɪsæmˈbɪɡjuˌeɪt/", "to make a meaning clear when several are possible", "The context helps disambiguate the phrase.", "El contexto ayuda a desambiguar la frase.", ["clarify", "resolve"], ["confuse"], ["disambiguate a term", "disambiguate meaning"], ["ambiguity, disambiguate, disambiguation"], ["linguistics", "analysis"], "language action"),
    ], [
      { phrase: "The register changes with the audience.", translation: "El registro cambia según el público." },
      { phrase: "Context helps us infer the speaker's intention.", translation: "El contexto nos ayuda a inferir la intención del hablante." },
      { phrase: "The metaphor carries a cultural connotation.", translation: "La metáfora tiene una connotación cultural." },
      { phrase: "Pragmatics explains what is implied.", translation: "La pragmática explica lo que se comunica implícitamente." },
    ], [
      { speaker: "A", text: "Is the expression literal or metaphorical?", translation: "¿La expresión es literal o metafórica?" },
      { speaker: "B", text: "Its connotation changes in another dialect.", translation: "Su connotación cambia en otro dialecto." },
      { speaker: "A", text: "Can pragmatics disambiguate the request?", translation: "¿Puede la pragmática desambiguar la petición?" },
      { speaker: "B", text: "Yes, if we infer the context and register.", translation: "Sí, si inferimos el contexto y el registro." },
    ], { title: "Meaning Beyond Words", text: "Advanced language users notice that meaning depends on context. Semantics describes what words can mean, while pragmatics considers how speakers use them. Dialect, register, metaphor, and connotation all influence what a listener infers.", translation: "Los usuarios avanzados del idioma observan que el significado depende del contexto. La semántica describe lo que pueden significar las palabras, mientras la pragmática considera cómo las usan los hablantes. El dialecto, el registro, la metáfora y la connotación influyen en lo que infiere el oyente." }),
    u("u41", "Research Integrity", "Evaluate consent, transparency, privacy, and responsibility in research.", [
      w("integrity", "integridad", "noun", "/ɪnˈteɡrəti/", "the quality of being honest and guided by strong principles", "Research integrity protects public trust.", "La integridad de la investigación protege la confianza pública.", ["honesty", "uprightness"], ["corruption"], ["professional integrity", "maintain integrity"], ["integrity, integral"], ["ethics", "research"], "research ethics"),
      w("consent", "consentimiento", "noun", "/kənˈsent/", "permission given freely after receiving information", "Participants gave informed consent.", "Los participantes dieron su consentimiento informado.", ["permission", "agreement"], ["refusal"], ["informed consent", "obtain consent"], ["consent, consensual"], ["ethics", "research"], "research ethics"),
      w("anonymity", "anonimato", "noun", "/ˌænəˈnɪməti/", "the state of not being identified by name", "Anonymity protected the participants.", "El anonimato protegió a los participantes.", ["privacy", "namelessness"], ["identification"], ["protect anonymity", "guarantee anonymity"], ["anonymous, anonymity"], ["privacy", "research"], "research ethics"),
      w("conflict of interest", "conflicto de intereses", "noun", "/ˌkɑːnflɪkt əv ˈɪntrəst/", "a situation where personal interests could affect professional judgement", "The author disclosed a conflict of interest.", "El autor declaró un conflicto de intereses.", ["divided loyalty", "bias"], ["impartiality"], ["declare a conflict of interest", "potential conflict"], ["conflict, conflicting"], ["ethics", "work"], "research ethics"),
      w("misconduct", "mala conducta", "noun", "/ˌmɪsˈkɑːndʌkt/", "unacceptable or dishonest behaviour, especially in a profession", "The university investigated alleged misconduct.", "La universidad investigó una supuesta mala conducta.", ["wrongdoing", "malpractice"], ["integrity"], ["research misconduct", "professional misconduct"], ["misconduct, misconducted"], ["ethics", "research"], "research ethics"),
      w("transparency", "transparencia", "noun", "/trænsˈperənsi/", "openness about decisions, methods, or information", "Transparency makes the process easier to assess.", "La transparencia facilita la evaluación del proceso.", ["openness", "clarity"], ["secrecy"], ["institutional transparency", "increase transparency"], ["transparent, transparency"], ["ethics", "government"], "research ethics"),
      w("disclose", "declarar", "verb", "/dɪˈskloʊz/", "to make information known, especially formally", "Researchers must disclose relevant funding.", "Los investigadores deben declarar la financiación relevante.", ["reveal", "declare"], ["conceal"], ["disclose information", "disclose funding"], ["disclose, disclosure"], ["ethics", "communication"], "ethics action"),
      w("scrutinize", "examinar minuciosamente", "verb", "/ˈskruːtənaɪz/", "to examine something very carefully", "Reviewers scrutinize the evidence.", "Los revisores examinan minuciosamente las pruebas.", ["inspect", "examine"], ["overlook"], ["scrutinize evidence", "closely scrutinize"], ["scrutinize, scrutiny"], ["research", "analysis"], "thinking action"),
    ], [
      { phrase: "Participants must give informed consent.", translation: "Los participantes deben dar su consentimiento informado." },
      { phrase: "The study protects anonymity.", translation: "El estudio protege el anonimato." },
      { phrase: "Researchers should disclose their funding.", translation: "Los investigadores deberían declarar su financiación." },
      { phrase: "Independent reviewers scrutinize the evidence.", translation: "Revisores independientes examinan minuciosamente las pruebas." },
    ], [
      { speaker: "A", text: "How can the study maintain integrity?", translation: "¿Cómo puede el estudio mantener la integridad?" },
      { speaker: "B", text: "It should obtain consent and protect anonymity.", translation: "Debe obtener consentimiento y proteger el anonimato." },
      { speaker: "A", text: "What if the researcher has a conflict of interest?", translation: "¿Y si el investigador tiene un conflicto de intereses?" },
      { speaker: "B", text: "They must disclose it so others can scrutinize the work.", translation: "Debe declararlo para que otros puedan examinar el trabajo." },
    ], { title: "Trustworthy Research", text: "Research integrity requires more than accurate results. Participants need informed consent and protection of anonymity. Researchers should disclose conflicts of interest, avoid misconduct, and provide enough transparency for others to scrutinize the evidence.", translation: "La integridad de la investigación requiere más que resultados exactos. Los participantes necesitan consentimiento informado y protección del anonimato. Los investigadores deben declarar los conflictos de intereses, evitar la mala conducta y ofrecer suficiente transparencia para que otros examinen minuciosamente las pruebas." }),
  ],
};
