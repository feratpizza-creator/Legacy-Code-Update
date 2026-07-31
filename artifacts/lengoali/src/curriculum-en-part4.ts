// Additional English curriculum units u30-u31 for every CEFR level.
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

export const ADDITIONAL_EN_PART4_UNITS: Record<string, Unit[]> = {
  A0: [
    u("u30", "Body and Clothes", "Name simple body parts and clothes.", [
      w("head", "cabeza", "noun", "My head hurts.", "Me duele la cabeza."),
      w("hand", "mano", "noun", "Raise your hand.", "Levanta la mano."),
      w("foot", "pie", "noun", "My foot is cold.", "Tengo frío en el pie."),
      w("eye", "ojo", "noun", "Close one eye.", "Cierra un ojo."),
      w("shirt", "camisa", "noun", "My shirt is blue.", "Mi camisa es azul."),
      w("shoe", "zapato", "noun", "This shoe is new.", "Este zapato es nuevo."),
      w("hat", "sombrero", "noun", "I wear a hat.", "Llevo un sombrero."),
      w("coat", "abrigo", "noun", "The coat is warm.", "El abrigo es abrigado."),
    ], [
      { phrase: "Wash your hands.", translation: "Lávate las manos." },
      { phrase: "Where is my shoe?", translation: "¿Dónde está mi zapato?" },
      { phrase: "I need a warm coat.", translation: "Necesito un abrigo abrigado." },
      { phrase: "Open your eyes.", translation: "Abre los ojos." },
    ], [
      { speaker: "A", text: "Are you ready to go?", translation: "¿Estás listo para ir?" },
      { speaker: "B", text: "Almost. I need my shoes and coat.", translation: "Casi. Necesito mis zapatos y mi abrigo." },
      { speaker: "A", text: "Your hat is on the chair.", translation: "Tu sombrero está en la silla." },
      { speaker: "B", text: "Thank you!", translation: "¡Gracias!" },
    ], { title: "Getting Dressed", text: "It is cold outside. I put on my shirt, shoes, and warm coat. I also wear a hat before I leave home.", translation: "Hace frío afuera. Me pongo la camisa, los zapatos y el abrigo abrigado. También llevo un sombrero antes de salir de casa." }),
    u("u31", "Places Around Us", "Recognise common places in a town.", [
      w("park", "parque", "noun", "The children play in the park.", "Los niños juegan en el parque."),
      w("shop", "tienda", "noun", "The shop is open.", "La tienda está abierta."),
      w("school", "escuela", "noun", "My school is nearby.", "Mi escuela está cerca."),
      w("library", "biblioteca", "noun", "We read in the library.", "Leemos en la biblioteca."),
      w("station", "estación", "noun", "The station is busy.", "La estación está concurrida."),
      w("hospital", "hospital", "noun", "The hospital is large.", "El hospital es grande."),
      w("street", "calle", "noun", "Our street is quiet.", "Nuestra calle es tranquila."),
      w("home", "casa", "noun", "I am going home.", "Voy a casa."),
    ], [
      { phrase: "Where is the park?", translation: "¿Dónde está el parque?" },
      { phrase: "The library is near the school.", translation: "La biblioteca está cerca de la escuela." },
      { phrase: "I am at home.", translation: "Estoy en casa." },
      { phrase: "Cross the street carefully.", translation: "Cruza la calle con cuidado." },
    ], [
      { speaker: "A", text: "Where are you going?", translation: "¿Adónde vas?" },
      { speaker: "B", text: "I am going to the library.", translation: "Voy a la biblioteca." },
      { speaker: "A", text: "Is it near the station?", translation: "¿Está cerca de la estación?" },
      { speaker: "B", text: "Yes, it is on this street.", translation: "Sí, está en esta calle." },
    ], { title: "In Our Town", text: "Our town has a school, a library, and a park. The shop is on a quiet street near our home. The station is busy in the morning.", translation: "Nuestra ciudad tiene una escuela, una biblioteca y un parque. La tienda está en una calle tranquila cerca de nuestra casa. La estación está concurrida por la mañana." }),
  ],
  A1: [
    u("u30", "Weather and Clothes", "Talk about weather and choose suitable clothes.", [
      w("sunny", "soleado", "adjective", "It is sunny today.", "Hoy hace sol."),
      w("cloudy", "nublado", "adjective", "The sky is cloudy.", "El cielo está nublado."),
      w("rainy", "lluvioso", "adjective", "It is rainy outside.", "Afuera está lloviendo."),
      w("windy", "ventoso", "adjective", "It is very windy.", "Hace mucho viento."),
      w("umbrella", "paraguas", "noun", "Take an umbrella.", "Lleva un paraguas."),
      w("scarf", "bufanda", "noun", "I wear a scarf in winter.", "Llevo una bufanda en invierno."),
      w("gloves", "guantes", "noun", "My gloves are warm.", "Mis guantes son abrigados."),
      w("boots", "botas", "noun", "These boots are waterproof.", "Estas botas son impermeables."),
    ], [
      { phrase: "What is the weather like?", translation: "¿Qué tiempo hace?" },
      { phrase: "It might rain later.", translation: "Puede llover más tarde." },
      { phrase: "Wear your warm scarf.", translation: "Ponte tu bufanda abrigada." },
      { phrase: "The wind is strong today.", translation: "Hoy hace mucho viento." },
    ], [
      { speaker: "A", text: "Should I take an umbrella?", translation: "¿Debería llevar un paraguas?" },
      { speaker: "B", text: "Yes, the sky is cloudy.", translation: "Sí, el cielo está nublado." },
      { speaker: "A", text: "It is also very windy.", translation: "También hace mucho viento." },
      { speaker: "B", text: "Then wear your boots too.", translation: "Entonces ponte también las botas." },
    ], { title: "A Change in the Weather", text: "The morning is sunny, but dark clouds arrive in the afternoon. I take an umbrella and wear my boots because rain is expected.", translation: "La mañana es soleada, pero por la tarde llegan nubes oscuras. Llevo un paraguas y me pongo las botas porque se espera lluvia." }),
    u("u31", "Public Transport", "Use simple language when travelling by bus and train.", [
      w("bus", "autobús", "noun", "The bus arrives at eight.", "El autobús llega a las ocho."),
      w("train", "tren", "noun", "Our train is late.", "Nuestro tren llega tarde."),
      w("platform", "andén", "noun", "The train leaves from platform three.", "El tren sale del andén tres."),
      w("stop", "parada", "noun", "Get off at the next stop.", "Bájate en la próxima parada."),
      w("journey", "viaje", "noun", "The journey takes an hour.", "El viaje dura una hora."),
      w("driver", "conductor", "noun", "Ask the driver for help.", "Pide ayuda al conductor."),
      w("map", "mapa", "noun", "Look at the map.", "Mira el mapa."),
      w("arrive", "llegar", "verb", "We arrive before noon.", "Llegamos antes del mediodía."),
    ], [
      { phrase: "Which bus goes to the centre?", translation: "¿Qué autobús va al centro?" },
      { phrase: "Where is platform three?", translation: "¿Dónde está el andén tres?" },
      { phrase: "The train is ten minutes late.", translation: "El tren lleva diez minutos de retraso." },
      { phrase: "Get off at the next stop.", translation: "Bájate en la próxima parada." },
    ], [
      { speaker: "A", text: "Does this bus go to the centre?", translation: "¿Este autobús va al centro?" },
      { speaker: "B", text: "Yes, but get off at the next stop.", translation: "Sí, pero bájate en la próxima parada." },
      { speaker: "A", text: "How long is the journey?", translation: "¿Cuánto dura el viaje?" },
      { speaker: "B", text: "About twenty minutes.", translation: "Unos veinte minutos." },
    ], { title: "Going Across Town", text: "I take the bus to the station and then change to a train. I check the map and listen for the next stop. The journey is simple when I plan ahead.", translation: "Cojo el autobús hasta la estación y después cambio a un tren. Miro el mapa y escucho cuál es la próxima parada. El viaje es sencillo cuando lo planifico con antelación." }),
  ],
  A2: [
    u("u30", "Making Decisions", "Explain choices, reasons, and possible results.", [
      w("choice", "elección", "noun", "This was a difficult choice.", "Esta fue una elección difícil."),
      w("reason", "razón", "noun", "What is the reason for the change?", "¿Cuál es la razón del cambio?"),
      w("result", "resultado", "noun", "The result surprised everyone.", "El resultado sorprendió a todos."),
      w("option", "opción", "noun", "We have two options.", "Tenemos dos opciones."),
      w("compare", "comparar", "verb", "Compare the prices first.", "Compara primero los precios."),
      w("choose", "elegir", "verb", "I chose the cheaper option.", "Elegí la opción más barata."),
      w("avoid", "evitar", "verb", "We should avoid unnecessary waste.", "Deberíamos evitar los residuos innecesarios."),
      w("improve", "mejorar", "verb", "This plan can improve our routine.", "Este plan puede mejorar nuestra rutina."),
    ], [
      { phrase: "There are several options.", translation: "Hay varias opciones." },
      { phrase: "For this reason, I agree.", translation: "Por esta razón, estoy de acuerdo." },
      { phrase: "Let us compare the results.", translation: "Comparemos los resultados." },
      { phrase: "I chose this option because it is practical.", translation: "Elegí esta opción porque es práctica." },
    ], [
      { speaker: "A", text: "Which option should we choose?", translation: "¿Qué opción deberíamos elegir?" },
      { speaker: "B", text: "Let us compare the cost and the result.", translation: "Comparemos el coste y el resultado." },
      { speaker: "A", text: "I prefer the first option.", translation: "Prefiero la primera opción." },
      { speaker: "B", text: "I agree because it is easier to improve.", translation: "Estoy de acuerdo porque es más fácil de mejorar." },
    ], { title: "A Practical Choice", text: "Before making a decision, I compare the options and think about the possible result. A good choice has a clear reason and helps us improve.", translation: "Antes de tomar una decisión, comparo las opciones y pienso en el posible resultado. Una buena elección tiene una razón clara y nos ayuda a mejorar." }),
    u("u31", "Stories and Memories", "Describe memorable events and personal experiences.", [
      w("memory", "recuerdo", "noun", "That memory makes me smile.", "Ese recuerdo me hace sonreír."),
      w("event", "acontecimiento", "noun", "The event took place in June.", "El acontecimiento tuvo lugar en junio."),
      w("moment", "momento", "noun", "It was an important moment.", "Fue un momento importante."),
      w("surprise", "sorpresa", "noun", "The party was a surprise.", "La fiesta fue una sorpresa."),
      w("happen", "suceder", "verb", "What happened yesterday?", "¿Qué sucedió ayer?"),
      w("remember", "recordar", "verb", "I remember the place clearly.", "Recuerdo claramente el lugar."),
      w("celebrate", "celebrar", "verb", "We celebrated her birthday.", "Celebramos su cumpleaños."),
      w("belong", "pertenecer", "verb", "This photo belongs to my grandmother.", "Esta foto pertenece a mi abuela."),
    ], [
      { phrase: "I will never forget that day.", translation: "Nunca olvidaré ese día." },
      { phrase: "It happened a long time ago.", translation: "Sucedió hace mucho tiempo." },
      { phrase: "This photo brings back memories.", translation: "Esta foto trae recuerdos." },
      { phrase: "We celebrated together.", translation: "Celebramos juntos." },
    ], [
      { speaker: "A", text: "What is your favourite memory?", translation: "¿Cuál es tu recuerdo favorito?" },
      { speaker: "B", text: "It is the day we moved to our new home.", translation: "Es el día que nos mudamos a nuestra nueva casa." },
      { speaker: "A", text: "What happened then?", translation: "¿Qué sucedió entonces?" },
      { speaker: "B", text: "We celebrated with all our friends.", translation: "Celebramos con todos nuestros amigos." },
    ], { title: "A Special Day", text: "One of my clearest memories is a family celebration. Many small things happened that day, but the most important moment was being together.", translation: "Uno de mis recuerdos más claros es una celebración familiar. Ese día sucedieron muchas cosas pequeñas, pero el momento más importante fue estar juntos." }),
  ],
  B1: [
    u("u30", "Solving Problems", "Discuss problems, causes, and practical solutions.", [
      w("problem", "problema", "noun", "We need to solve this problem.", "Necesitamos resolver este problema."),
      w("cause", "causa", "noun", "The cause is still unknown.", "La causa todavía se desconoce."),
      w("solution", "solución", "noun", "They found a simple solution.", "Encontraron una solución sencilla."),
      w("risk", "riesgo", "noun", "Every plan has some risk.", "Cada plan tiene algún riesgo."),
      w("challenge", "desafío", "noun", "Learning a language is a challenge.", "Aprender un idioma es un desafío."),
      w("identify", "identificar", "verb", "First identify the main cause.", "Primero identifica la causa principal."),
      w("suggest", "sugerir", "verb", "Can you suggest a solution?", "¿Puedes sugerir una solución?"),
      w("prevent", "prevenir", "verb", "Good planning can prevent delays.", "Una buena planificación puede prevenir retrasos."),
    ], [
      { phrase: "We need a long-term solution.", translation: "Necesitamos una solución a largo plazo." },
      { phrase: "The main cause is unclear.", translation: "La causa principal no está clara." },
      { phrase: "This could prevent future problems.", translation: "Esto podría prevenir problemas futuros." },
      { phrase: "Let us consider the risks.", translation: "Consideremos los riesgos." },
    ], [
      { speaker: "A", text: "What caused the delay?", translation: "¿Qué causó el retraso?" },
      { speaker: "B", text: "We have not identified the cause yet.", translation: "Todavía no hemos identificado la causa." },
      { speaker: "A", text: "Can you suggest a solution?", translation: "¿Puedes sugerir una solución?" },
      { speaker: "B", text: "We can change the schedule to prevent another delay.", translation: "Podemos cambiar el horario para prevenir otro retraso." },
    ], { title: "Finding a Way Forward", text: "When a problem appears, a team should identify its cause before choosing a solution. Clear communication reduces risk and makes future challenges easier to manage.", translation: "Cuando aparece un problema, un equipo debe identificar su causa antes de elegir una solución. La comunicación clara reduce el riesgo y facilita la gestión de futuros desafíos." }),
    u("u31", "Culture and Identity", "Talk about traditions, identity, and cultural exchange.", [
      w("tradition", "tradición", "noun", "This tradition is over a hundred years old.", "Esta tradición tiene más de cien años."),
      w("identity", "identidad", "noun", "Language is part of identity.", "El idioma forma parte de la identidad."),
      w("custom", "costumbre", "noun", "Every region has its own customs.", "Cada región tiene sus propias costumbres."),
      w("heritage", "patrimonio", "noun", "The building is part of our heritage.", "El edificio forma parte de nuestro patrimonio."),
      w("community", "comunidad", "noun", "The community welcomes visitors.", "La comunidad recibe a los visitantes."),
      w("preserve", "preservar", "verb", "Museums preserve important objects.", "Los museos preservan objetos importantes."),
      w("influence", "influir", "verb", "Travel can influence our ideas.", "Viajar puede influir en nuestras ideas."),
      w("adapt", "adaptarse", "verb", "Traditions adapt over time.", "Las tradiciones se adaptan con el tiempo."),
    ], [
      { phrase: "Culture changes over time.", translation: "La cultura cambia con el tiempo." },
      { phrase: "This custom is shared by the community.", translation: "Esta costumbre es compartida por la comunidad." },
      { phrase: "We should preserve our heritage.", translation: "Deberíamos preservar nuestro patrimonio." },
      { phrase: "Exchange creates understanding.", translation: "El intercambio crea comprensión." },
    ], [
      { speaker: "A", text: "How does travel affect identity?", translation: "¿Cómo afecta viajar a la identidad?" },
      { speaker: "B", text: "It can add new ideas without removing old traditions.", translation: "Puede añadir ideas nuevas sin eliminar las tradiciones antiguas." },
      { speaker: "A", text: "Can traditions adapt?", translation: "¿Pueden adaptarse las tradiciones?" },
      { speaker: "B", text: "Yes, if the community understands their value.", translation: "Sí, si la comunidad entiende su valor." },
    ], { title: "Shared Heritage", text: "Culture is not fixed. Traditions change as communities meet, travel, and exchange ideas. Preserving heritage can help people understand where they come from while remaining open to change.", translation: "La cultura no es fija. Las tradiciones cambian cuando las comunidades se encuentran, viajan e intercambian ideas. Preservar el patrimonio puede ayudar a entender nuestros orígenes sin cerrarnos al cambio." }),
  ],
  B2: [
    u("u30", "Science and Evidence", "Discuss scientific ideas, evidence, and uncertainty.", [
      w("hypothesis", "hipótesis", "noun", "The researchers tested a new hypothesis.", "Los investigadores probaron una nueva hipótesis."),
      w("evidence", "evidencia", "noun", "The evidence supports the theory.", "La evidencia apoya la teoría."),
      w("experiment", "experimento", "noun", "The experiment lasted three weeks.", "El experimento duró tres semanas."),
      w("theory", "teoría", "noun", "The theory explains the results.", "La teoría explica los resultados."),
      w("pattern", "patrón", "noun", "The data shows a clear pattern.", "Los datos muestran un patrón claro."),
      w("observe", "observar", "verb", "Scientists observe changes carefully.", "Los científicos observan los cambios con cuidado."),
      w("measure", "medir", "verb", "We need to measure the effect.", "Necesitamos medir el efecto."),
      w("estimate", "estimar", "verb", "Experts estimate the cost.", "Los expertos estiman el coste."),
    ], [
      { phrase: "The evidence is limited.", translation: "La evidencia es limitada." },
      { phrase: "Further research is needed.", translation: "Se necesita más investigación." },
      { phrase: "The results suggest a pattern.", translation: "Los resultados sugieren un patrón." },
      { phrase: "We should not ignore uncertainty.", translation: "No deberíamos ignorar la incertidumbre." },
    ], [
      { speaker: "A", text: "Does the experiment prove the theory?", translation: "¿Demuestra el experimento la teoría?" },
      { speaker: "B", text: "It provides evidence, but more tests are needed.", translation: "Proporciona evidencia, pero se necesitan más pruebas." },
      { speaker: "A", text: "What pattern did they observe?", translation: "¿Qué patrón observaron?" },
      { speaker: "B", text: "The effect increased when the temperature changed.", translation: "El efecto aumentó cuando cambió la temperatura." },
    ], { title: "Reading the Evidence", text: "Scientific conclusions depend on careful observation and measurement. A single experiment may suggest a pattern, but reliable knowledge usually requires repeated tests and honest attention to uncertainty.", translation: "Las conclusiones científicas dependen de una observación y una medición cuidadosas. Un solo experimento puede sugerir un patrón, pero el conocimiento fiable suele requerir pruebas repetidas y atención honesta a la incertidumbre." }),
    u("u31", "Business and Negotiation", "Use precise language to discuss agreements and trade-offs.", [
      w("agreement", "acuerdo", "noun", "Both sides signed the agreement.", "Ambas partes firmaron el acuerdo."),
      w("proposal", "propuesta", "noun", "The proposal includes three stages.", "La propuesta incluye tres etapas."),
      w("budget", "presupuesto", "noun", "The project is within budget.", "El proyecto está dentro del presupuesto."),
      w("priority", "prioridad", "noun", "Safety is our first priority.", "La seguridad es nuestra primera prioridad."),
      w("benefit", "beneficio", "noun", "The change offers several benefits.", "El cambio ofrece varios beneficios."),
      w("negotiate", "negociar", "verb", "They negotiated a better price.", "Negociaron un precio mejor."),
      w("compromise", "llegar a un compromiso", "verb", "We must compromise to move forward.", "Debemos llegar a un compromiso para avanzar."),
      w("deliver", "entregar", "verb", "The team will deliver the report Friday.", "El equipo entregará el informe el viernes."),
    ], [
      { phrase: "Let us review the proposal.", translation: "Revisemos la propuesta." },
      { phrase: "This is our main priority.", translation: "Esta es nuestra prioridad principal." },
      { phrase: "We are willing to compromise.", translation: "Estamos dispuestos a llegar a un compromiso." },
      { phrase: "The agreement benefits both sides.", translation: "El acuerdo beneficia a ambas partes." },
    ], [
      { speaker: "A", text: "Can we meet the budget?", translation: "¿Podemos ajustarnos al presupuesto?" },
      { speaker: "B", text: "Yes, if we change the delivery date.", translation: "Sí, si cambiamos la fecha de entrega." },
      { speaker: "A", text: "That is not our first choice.", translation: "Esa no es nuestra primera opción." },
      { speaker: "B", text: "Then we need to negotiate a compromise.", translation: "Entonces tenemos que negociar un compromiso." },
    ], { title: "A Fair Agreement", text: "Successful negotiation begins with clear priorities. Each side explains its needs, reviews the benefits, and looks for a compromise that can be delivered within the available budget.", translation: "Una negociación exitosa comienza con prioridades claras. Cada parte explica sus necesidades, revisa los beneficios y busca un compromiso que pueda cumplirse dentro del presupuesto disponible." }),
  ],
  C1: [
    u("u30", "Public Policy", "Analyse how policies respond to complex social problems.", [
      w("policy", "política pública", "noun", "The new policy targets public transport.", "La nueva política se centra en el transporte público."),
      w("regulation", "regulación", "noun", "The regulation protects consumers.", "La regulación protege a los consumidores."),
      w("implementation", "implementación", "noun", "Implementation will take several years.", "La implementación tardará varios años."),
      w("stakeholder", "parte interesada", "noun", "Every stakeholder was invited to the discussion.", "Se invitó a todas las partes interesadas al debate."),
      w("impact", "impacto", "noun", "The impact is difficult to predict.", "El impacto es difícil de predecir."),
      w("allocate", "asignar", "verb", "The city allocated funds to schools.", "La ciudad asignó fondos a las escuelas."),
      w("evaluate", "evaluar", "verb", "We must evaluate the policy fairly.", "Debemos evaluar la política de forma justa."),
      w("prioritise", "dar prioridad", "verb", "Governments must prioritise vulnerable groups.", "Los gobiernos deben dar prioridad a los grupos vulnerables."),
    ], [
      { phrase: "The policy has unintended consequences.", translation: "La política tiene consecuencias imprevistas." },
      { phrase: "Implementation requires public trust.", translation: "La implementación requiere confianza pública." },
      { phrase: "We need to evaluate its long-term impact.", translation: "Tenemos que evaluar su impacto a largo plazo." },
      { phrase: "All stakeholders should be consulted.", translation: "Deberían consultarse todas las partes interesadas." },
    ], [
      { speaker: "A", text: "Who should evaluate the new policy?", translation: "¿Quién debería evaluar la nueva política?" },
      { speaker: "B", text: "Independent researchers and affected communities.", translation: "Investigadores independientes y comunidades afectadas." },
      { speaker: "A", text: "What is the main risk?", translation: "¿Cuál es el riesgo principal?" },
      { speaker: "B", text: "Implementation may overlook vulnerable groups.", translation: "La implementación puede pasar por alto a los grupos vulnerables." },
    ], { title: "Policy in Practice", text: "A well-designed policy can still fail during implementation. Its impact should be evaluated with reliable evidence and with input from the people and organisations most affected by the decision.", translation: "Una política bien diseñada puede fracasar durante la implementación. Su impacto debe evaluarse con evidencia fiable y con la participación de las personas y organizaciones más afectadas por la decisión." }),
    u("u31", "Research and Interpretation", "Discuss how evidence is interpreted in academic work.", [
      w("interpretation", "interpretación", "noun", "The results allow several interpretations.", "Los resultados permiten varias interpretaciones."),
      w("framework", "marco", "noun", "The framework shapes the analysis.", "El marco da forma al análisis."),
      w("limitation", "limitación", "noun", "The study acknowledges its limitations.", "El estudio reconoce sus limitaciones."),
      w("reliability", "fiabilidad", "noun", "The reliability of the measure is uncertain.", "La fiabilidad de la medida es incierta."),
      w("context", "contexto", "noun", "Context changes the meaning of the finding.", "El contexto cambia el significado del hallazgo."),
      w("distinguish", "distinguir", "verb", "We must distinguish fact from interpretation.", "Debemos distinguir el hecho de la interpretación."),
      w("infer", "inferir", "verb", "Readers may infer a different motive.", "Los lectores pueden inferir un motivo diferente."),
      w("qualify", "matizar", "verb", "The author qualifies the strongest claim.", "El autor matiza la afirmación más fuerte."),
    ], [
      { phrase: "The findings must be interpreted in context.", translation: "Los hallazgos deben interpretarse en contexto." },
      { phrase: "The evidence does not support a simple conclusion.", translation: "La evidencia no apoya una conclusión sencilla." },
      { phrase: "The author qualifies the claim.", translation: "El autor matiza la afirmación." },
      { phrase: "Several interpretations remain possible.", translation: "Siguen siendo posibles varias interpretaciones." },
    ], [
      { speaker: "A", text: "Why do the researchers qualify their conclusion?", translation: "¿Por qué matizan los investigadores su conclusión?" },
      { speaker: "B", text: "Because the evidence has important limitations.", translation: "Porque la evidencia tiene limitaciones importantes." },
      { speaker: "A", text: "Can the framework affect interpretation?", translation: "¿Puede el marco afectar a la interpretación?" },
      { speaker: "B", text: "Yes, especially when the context is complex.", translation: "Sí, especialmente cuando el contexto es complejo." },
    ], { title: "Beyond the First Reading", text: "Academic interpretation requires more than collecting evidence. Researchers must explain the framework, acknowledge limitations, and distinguish what the data shows from what readers infer.", translation: "La interpretación académica requiere más que recopilar evidencia. Los investigadores deben explicar el marco, reconocer las limitaciones y distinguir lo que muestran los datos de lo que infieren los lectores." }),
  ],
  C2: [
    u("u30", "Philosophy of Language", "Examine how words, meaning, and context interact.", [
      w("meaning", "significado", "noun", "Meaning depends on context.", "El significado depende del contexto."),
      w("reference", "referencia", "noun", "The reference is not immediately clear.", "La referencia no está clara de inmediato."),
      w("ambiguity", "ambigüedad", "noun", "Ambiguity can be productive.", "La ambigüedad puede ser productiva."),
      w("intention", "intención", "noun", "The speaker's intention matters.", "La intención del hablante importa."),
      w("context", "contexto", "noun", "Context narrows possible meanings.", "El contexto limita los significados posibles."),
      w("imply", "implicar", "verb", "The phrase implies a criticism.", "La frase implica una crítica."),
      w("denote", "denotar", "verb", "The symbol denotes a specific idea.", "El símbolo denota una idea específica."),
      w("reinterpret", "reinterpretar", "verb", "Later readers reinterpret the text.", "Los lectores posteriores reinterpretan el texto."),
    ], [
      { phrase: "Meaning is shaped by context.", translation: "El significado está determinado por el contexto." },
      { phrase: "The wording leaves room for interpretation.", translation: "La formulación deja margen para la interpretación." },
      { phrase: "The speaker implies more than they state.", translation: "El hablante implica más de lo que afirma." },
      { phrase: "Reference is not always stable.", translation: "La referencia no siempre es estable." },
    ], [
      { speaker: "A", text: "Does the sentence have one meaning?", translation: "¿Tiene la frase un solo significado?" },
      { speaker: "B", text: "Not necessarily; context and intention change it.", translation: "No necesariamente; el contexto y la intención lo cambian." },
      { speaker: "A", text: "What does the final phrase imply?", translation: "¿Qué implica la frase final?" },
      { speaker: "B", text: "It implies a criticism without stating it directly.", translation: "Implica una crítica sin afirmarla directamente." },
    ], { title: "Words in Context", text: "Language carries meaning through words, relationships, and situations. A skilled reader notices what a sentence denotes, what it implies, and how a later context may reinterpret it.", translation: "El lenguaje transmite significado mediante palabras, relaciones y situaciones. Un lector experto observa lo que denota una frase, lo que implica y cómo un contexto posterior puede reinterpretarla." }),
    u("u31", "Global Challenges", "Discuss complex international problems and possible responses.", [
      w("displacement", "desplazamiento", "noun", "Displacement affects entire communities.", "El desplazamiento afecta a comunidades enteras."),
      w("resilience", "resiliencia", "noun", "The community showed remarkable resilience.", "La comunidad mostró una resiliencia extraordinaria."),
      w("inequality", "desigualdad", "noun", "Global inequality has many causes.", "La desigualdad global tiene muchas causas."),
      w("cooperation", "cooperación", "noun", "International cooperation is essential.", "La cooperación internacional es esencial."),
      w("accountability", "rendición de cuentas", "noun", "Public accountability builds trust.", "La rendición de cuentas pública genera confianza."),
      w("mitigate", "mitigar", "verb", "The programme aims to mitigate harm.", "El programa pretende mitigar el daño."),
      w("coordinate", "coordinar", "verb", "Several agencies coordinate their response.", "Varias agencias coordinan su respuesta."),
      w("reconcile", "conciliar", "verb", "We must reconcile growth with sustainability.", "Debemos conciliar el crecimiento con la sostenibilidad."),
    ], [
      { phrase: "The crisis requires a coordinated response.", translation: "La crisis requiere una respuesta coordinada." },
      { phrase: "Long-term resilience takes investment.", translation: "La resiliencia a largo plazo requiere inversión." },
      { phrase: "Growth must be reconciled with sustainability.", translation: "El crecimiento debe conciliarse con la sostenibilidad." },
      { phrase: "Accountability cannot be optional.", translation: "La rendición de cuentas no puede ser opcional." },
    ], [
      { speaker: "A", text: "Can one country solve this problem alone?", translation: "¿Puede un solo país resolver este problema?" },
      { speaker: "B", text: "No. Cooperation is needed to mitigate the harm.", translation: "No. Se necesita cooperación para mitigar el daño." },
      { speaker: "A", text: "How can institutions build trust?", translation: "¿Cómo pueden las instituciones generar confianza?" },
      { speaker: "B", text: "Through transparency, coordination, and accountability.", translation: "Mediante transparencia, coordinación y rendición de cuentas." },
    ], { title: "A Shared Responsibility", text: "Global challenges cross borders and rarely have a single cause. Durable responses combine international cooperation, public accountability, and policies that reconcile human needs with environmental limits.", translation: "Los desafíos globales cruzan fronteras y rara vez tienen una sola causa. Las respuestas duraderas combinan cooperación internacional, rendición de cuentas pública y políticas que concilian las necesidades humanas con los límites ambientales." }),
  ],
};
