// Additional English curriculum units u28-u29 for every CEFR level.
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

export const ADDITIONAL_EN_PART3_UNITS: Record<string, Unit[]> = {
  A0: [
    u("u28", "Everyday Objects", "Name common objects and say where they are.", [
      w("table", "mesa", "noun", "The book is on the table.", "El libro está sobre la mesa."),
      w("chair", "silla", "noun", "The chair is by the window.", "La silla está junto a la ventana."),
      w("glass", "vaso", "noun", "The glass is in the kitchen.", "El vaso está en la cocina."),
      w("plate", "plato", "noun", "The plate is clean.", "El plato está limpio."),
      w("phone", "teléfono", "noun", "The phone is in the bag.", "El teléfono está en el bolso."),
      w("key", "llave", "noun", "The key is in my pocket.", "La llave está en mi bolsillo."),
      w("bag", "bolso", "noun", "The bag is heavy.", "El bolso es pesado."),
      w("paper", "papel", "noun", "The paper is on the table.", "El papel está sobre la mesa."),
    ], [
      { phrase: "Where is the key?", translation: "¿Dónde está la llave?" },
      { phrase: "It is on the table.", translation: "Está sobre la mesa." },
      { phrase: "Give me a glass, please.", translation: "Dame un vaso, por favor." },
      { phrase: "The bag is here.", translation: "El bolso está aquí." },
    ], [
      { speaker: "A", text: "Where is the phone?", translation: "¿Dónde está el teléfono?" },
      { speaker: "B", text: "It is in the bag.", translation: "Está en el bolso." },
      { speaker: "A", text: "And the key?", translation: "¿Y la llave?" },
      { speaker: "B", text: "The key is on the table.", translation: "La llave está sobre la mesa." },
    ], { title: "At Home", text: "There is a book and paper on the table. The chair is by the window. The phone and key are in the bag.", translation: "Hay un libro y papel sobre la mesa. La silla está junto a la ventana. El teléfono y la llave están en el bolso." }),
    u("u29", "Simple Actions", "Say what you do during an ordinary day.", [
      w("open", "abrir", "verb", "I open the door.", "Abro la puerta."),
      w("close", "cerrar", "verb", "I close the window.", "Cierro la ventana."),
      w("take", "tomar", "verb", "I take the book.", "Tomo el libro."),
      w("give", "dar", "verb", "I give a present.", "Doy un regalo."),
      w("sit", "sentarse", "verb", "I sit on the chair.", "Me siento en la silla."),
      w("stand", "estar de pie", "verb", "I stand by the door.", "Estoy de pie junto a la puerta."),
      w("wait", "esperar", "verb", "I wait for the bus.", "Espero el autobús."),
      w("help", "ayudar", "verb", "I help a friend.", "Ayudo a un amigo."),
    ], [
      { phrase: "Open the door, please.", translation: "Abre la puerta, por favor." },
      { phrase: "Wait a moment.", translation: "Espera un momento." },
      { phrase: "Can you help?", translation: "¿Puedes ayudar?" },
      { phrase: "I will take this.", translation: "Tomaré esto." },
    ], [
      { speaker: "A", text: "Can you open the window?", translation: "¿Puedes abrir la ventana?" },
      { speaker: "B", text: "Yes, I will open it now.", translation: "Sí, la abriré ahora." },
      { speaker: "A", text: "Thank you for the help.", translation: "Gracias por la ayuda." },
      { speaker: "B", text: "You are welcome.", translation: "De nada." },
    ], { title: "A Little Help", text: "In the morning I open the window and take the book. During the day I wait for the bus. When a friend needs help, I help them.", translation: "Por la mañana abro la ventana y tomo el libro. Durante el día espero el autobús. Cuando un amigo necesita ayuda, le ayudo." }),
  ],
  A1: [
    u("u28", "Shopping and Services", "Practise shopping and asking about prices.", [
      w("price", "precio", "noun", "What is the price of this?", "¿Cuál es el precio de esto?"),
      w("discount", "descuento", "noun", "This product has a discount.", "Este producto tiene un descuento."),
      w("receipt", "recibo", "noun", "Can I have a receipt?", "¿Puedo tener un recibo?"),
      w("checkout", "caja", "noun", "The checkout is over there.", "La caja está allí."),
      w("product", "producto", "noun", "This product is good.", "Este producto es bueno."),
      w("pay", "pagar", "verb", "I want to pay by card.", "Quiero pagar con tarjeta."),
      w("exchange", "cambiar", "verb", "Can I exchange the shirt?", "¿Puedo cambiar la camisa?"),
      w("offer", "oferta", "noun", "The offer ends tomorrow.", "La oferta termina mañana."),
    ], [
      { phrase: "How much does this cost?", translation: "¿Cuánto cuesta esto?" },
      { phrase: "I will pay by card.", translation: "Pagaré con tarjeta." },
      { phrase: "Can I have a receipt?", translation: "¿Puedo tener un recibo?" },
      { phrase: "Is this on offer?", translation: "¿Está esto de oferta?" },
    ], [
      { speaker: "A", text: "How much does this coat cost?", translation: "¿Cuánto cuesta este abrigo?" },
      { speaker: "B", text: "It costs forty euros.", translation: "Cuesta cuarenta euros." },
      { speaker: "A", text: "Does it have a discount?", translation: "¿Tiene descuento?" },
      { speaker: "B", text: "Yes, there is an offer today.", translation: "Sí, hoy hay una oferta." },
    ], { title: "In the Shop", text: "In the shop I look at the product price and ask about a discount. When I pay, I get a receipt. If the product does not fit, I can exchange it.", translation: "En la tienda miro el precio del producto y pregunto por un descuento. Cuando pago, recibo un recibo. Si el producto no me queda bien, puedo cambiarlo." }),
    u("u29", "Directions and Travel", "Ask for and give simple directions.", [
      w("straight", "recto", "adverb", "Go straight.", "Ve recto."),
      w("turn", "girar", "verb", "Turn left.", "Gira a la izquierda."),
      w("left", "izquierdo", "adjective", "The shop is on the left.", "La tienda está a la izquierda."),
      w("right", "derecho", "adjective", "The bank is on the right.", "El banco está a la derecha."),
      w("intersection", "cruce", "noun", "The intersection is nearby.", "El cruce está cerca."),
      w("bridge", "puente", "noun", "Walk across the bridge.", "Cruza el puente a pie."),
      w("near", "cerca", "adverb", "The station is near.", "La estación está cerca."),
      w("farther", "más lejos", "adverb", "The hospital is farther away.", "El hospital está más lejos."),
    ], [
      { phrase: "How do I get to the station?", translation: "¿Cómo llego a la estación?" },
      { phrase: "Go straight.", translation: "Ve recto." },
      { phrase: "Turn right.", translation: "Gira a la derecha." },
      { phrase: "It is behind the bridge.", translation: "Está detrás del puente." },
    ], [
      { speaker: "A", text: "Excuse me, where is the station?", translation: "Perdón, ¿dónde está la estación?" },
      { speaker: "B", text: "Go straight to this intersection.", translation: "Ve recto hasta este cruce." },
      { speaker: "A", text: "Do I turn left?", translation: "¿Giro a la izquierda?" },
      { speaker: "B", text: "Yes, the station is behind the bridge.", translation: "Sí, la estación está detrás del puente." },
    ], { title: "The Route to the Station", text: "The station is near the city centre. Go straight and turn right at the intersection. Walk across the bridge; the station is behind it.", translation: "La estación está cerca del centro. Ve recto y gira a la derecha en el cruce. Cruza el puente; la estación está detrás." }),
  ],
  A2: [
    u("u28", "Plans and Experiences", "Talk about plans and past experiences.", [
      w("plan", "plan", "noun", "The plan changed quickly.", "El plan cambió rápidamente."),
      w("experience", "experiencia", "noun", "The trip was a good experience.", "El viaje fue una buena experiencia."),
      w("decide", "decidir", "verb", "I decided to stay home.", "Decidí quedarme en casa."),
      w("succeed", "tener éxito", "verb", "The test went well.", "El examen salió bien."),
      w("forget", "olvidar", "verb", "Do not forget the ticket.", "No olvides el billete."),
      w("remember", "recordar", "verb", "I remember this day.", "Recuerdo este día."),
      w("goal", "objetivo", "noun", "My goal is to speak English.", "Mi objetivo es hablar inglés."),
      w("prepare", "prepararse", "verb", "I prepare for the trip.", "Me preparo para el viaje."),
    ], [
      { phrase: "I will prepare well.", translation: "Me prepararé bien." },
      { phrase: "I decided to try again.", translation: "Decidí intentarlo otra vez." },
      { phrase: "It was a good experience.", translation: "Fue una buena experiencia." },
      { phrase: "I do not want to forget it.", translation: "No quiero olvidarlo." },
    ], [
      { speaker: "A", text: "What is your plan for the weekend?", translation: "¿Cuál es tu plan para el fin de semana?" },
      { speaker: "B", text: "I will prepare for an exam.", translation: "Me prepararé para un examen." },
      { speaker: "A", text: "Do you have a goal?", translation: "¿Tienes un objetivo?" },
      { speaker: "B", text: "Yes, I want to succeed and remember everything.", translation: "Sí, quiero tener éxito y recordarlo todo." },
    ], { title: "A New Goal", text: "I decided to set a new goal. I prepare every day and write a plan. Earlier experiences help me succeed.", translation: "Decidí establecer un nuevo objetivo. Me preparo cada día y escribo un plan. Las experiencias anteriores me ayudan a tener éxito." }),
    u("u29", "Healthy Habits", "Discuss rest, exercise, and well-being.", [
      w("exercise", "ejercicio", "noun", "Exercise is good for you.", "El ejercicio es bueno para ti."),
      w("rest", "descanso", "noun", "I need more rest.", "Necesito más descanso."),
      w("sleep", "sueño", "noun", "Good sleep helps.", "Dormir bien ayuda."),
      w("nutrition", "nutrición", "noun", "Healthy nutrition is important.", "La nutrición saludable es importante."),
      w("habit", "hábito", "noun", "A morning walk is a good habit.", "Caminar por la mañana es un buen hábito."),
      w("reduce", "reducir", "verb", "I try to reduce sugar.", "Intento reducir el azúcar."),
      w("strengthen", "fortalecer", "verb", "Exercise strengthens the body.", "El ejercicio fortalece el cuerpo."),
      w("balance", "equilibrio", "noun", "Work and rest need balance.", "El trabajo y el descanso necesitan equilibrio."),
    ], [
      { phrase: "Take care of yourself.", translation: "Cuídate." },
      { phrase: "I need a good night's sleep.", translation: "Necesito dormir bien." },
      { phrase: "I try to exercise every day.", translation: "Intento hacer ejercicio cada día." },
      { phrase: "Work and rest need balance.", translation: "El trabajo y el descanso necesitan equilibrio." },
    ], [
      { speaker: "A", text: "How do you take care of your health?", translation: "¿Cómo cuidas tu salud?" },
      { speaker: "B", text: "I exercise regularly and sleep well.", translation: "Hago ejercicio regularmente y duermo bien." },
      { speaker: "A", text: "Do you reduce sugar?", translation: "¿Reduces el azúcar?" },
      { speaker: "B", text: "Yes, healthy nutrition helps.", translation: "Sí, la nutrición saludable ayuda." },
    ], { title: "A Balanced Life", text: "Well-being consists of small habits. Exercise strengthens the body, sleep restores, and healthy nutrition gives energy. Balance between work and rest helps us cope.", translation: "El bienestar consiste en pequeños hábitos. El ejercicio fortalece el cuerpo, el sueño restaura y la nutrición saludable da energía. El equilibrio entre trabajo y descanso ayuda a seguir adelante." }),
  ],
  B1: [
    u("u28", "Work and Communication", "Practise workplace conversations and collaboration.", [
      w("meeting", "reunión", "noun", "The meeting starts at nine.", "La reunión empieza a las nueve."),
      w("task", "tarea", "noun", "The task is ready.", "La tarea está lista."),
      w("feedback", "comentarios", "noun", "I received useful feedback.", "Recibí comentarios útiles."),
      w("schedule", "horario", "noun", "The schedule changed.", "El horario cambió."),
      w("cooperation", "cooperación", "noun", "The cooperation works well.", "La cooperación funciona bien."),
      w("suggest", "sugerir", "verb", "I suggest a new solution.", "Sugiero una nueva solución."),
      w("agree", "acordar", "verb", "We agreed on a deadline.", "Acordamos una fecha límite."),
      w("solve", "resolver", "verb", "We solve the problem together.", "Resolvemos el problema juntos."),
    ], [
      { phrase: "Can we agree on this?", translation: "¿Podemos acordar esto?" },
      { phrase: "I suggest another solution.", translation: "Sugiero otra solución." },
      { phrase: "Feedback helps us improve.", translation: "Los comentarios nos ayudan a mejorar." },
      { phrase: "Let's keep in touch.", translation: "Mantengamos el contacto." },
    ], [
      { speaker: "A", text: "Will the task be ready by Friday?", translation: "¿Estará lista la tarea el viernes?" },
      { speaker: "B", text: "Yes, if the schedule stays the same.", translation: "Sí, si el horario sigue igual." },
      { speaker: "A", text: "I suggest that we check it together.", translation: "Sugiero que la revisemos juntos." },
      { speaker: "B", text: "That works. Cooperation helps solve the problem.", translation: "De acuerdo. La cooperación ayuda a resolver el problema." },
    ], { title: "A Shared Solution", text: "A good workplace needs a clear schedule and open communication. In a meeting, people can suggest solutions, give feedback, and agree on the next tasks.", translation: "Un buen lugar de trabajo necesita un horario claro y comunicación abierta. En una reunión se pueden sugerir soluciones, dar comentarios y acordar las próximas tareas." }),
    u("u29", "Environment and Community", "Discuss local environmental action and shared responsibility.", [
      w("community", "comunidad", "noun", "The community organises an event.", "La comunidad organiza un evento."),
      w("responsibility", "responsabilidad", "noun", "The environment is our responsibility.", "El medio ambiente es nuestra responsabilidad."),
      w("consumption", "consumo", "noun", "Consumption affects nature.", "El consumo afecta a la naturaleza."),
      w("resource", "recurso", "noun", "Water is an important resource.", "El agua es un recurso importante."),
      w("protect", "proteger", "verb", "We must protect forests.", "Debemos proteger los bosques."),
      w("save", "ahorrar", "verb", "We save energy.", "Ahorramos energía."),
      w("sort", "separar", "verb", "We sort the waste.", "Separamos los residuos."),
      w("participate", "participar", "verb", "I participate in community work.", "Participo en el trabajo comunitario."),
    ], [
      { phrase: "We can make a difference together.", translation: "Podemos marcar la diferencia juntos." },
      { phrase: "Let's save energy.", translation: "Ahorremos energía." },
      { phrase: "The environment is a shared responsibility.", translation: "El medio ambiente es una responsabilidad compartida." },
      { phrase: "Participate in a local event.", translation: "Participa en un evento local." },
    ], [
      { speaker: "A", text: "How can the community protect nature?", translation: "¿Cómo puede la comunidad proteger la naturaleza?" },
      { speaker: "B", text: "We can save energy and sort waste.", translation: "Podemos ahorrar energía y separar los residuos." },
      { speaker: "A", text: "Will you participate this weekend?", translation: "¿Participarás este fin de semana?" },
      { speaker: "B", text: "Yes, it is our shared responsibility.", translation: "Sí, es nuestra responsabilidad compartida." },
    ], { title: "The Neighbourhood Acts", text: "The local community decided to protect the nearby forest. Residents sort waste, save energy, and participate in a clean-up. Small actions reduce the effects of consumption.", translation: "La comunidad local decidió proteger el bosque cercano. Los vecinos separan residuos, ahorran energía y participan en una limpieza. Las pequeñas acciones reducen los efectos del consumo." }),
  ],
  B2: [
    u("u28", "Economy and Technology", "Evaluate technology's effects on the economy and work.", [
      w("productivity", "productividad", "noun", "Technology can increase productivity.", "La tecnología puede aumentar la productividad."),
      w("investment", "inversión", "noun", "An investment requires planning.", "Una inversión requiere planificación."),
      w("automation", "automatización", "noun", "Automation changes working life.", "La automatización cambia la vida laboral."),
      w("innovation", "innovación", "noun", "Innovation solves a problem.", "La innovación resuelve un problema."),
      w("competition", "competencia", "noun", "Competition encourages companies.", "La competencia anima a las empresas."),
      w("streamline", "agilizar", "verb", "The new programme streamlines work.", "El nuevo programa agiliza el trabajo."),
      w("predict", "predecir", "verb", "Experts predict growth.", "Los expertos predicen crecimiento."),
      w("adapt", "adaptarse", "verb", "The company must adapt to change.", "La empresa debe adaptarse al cambio."),
    ], [
      { phrase: "Technology changes working life.", translation: "La tecnología cambia la vida laboral." },
      { phrase: "An investment can bring growth.", translation: "Una inversión puede traer crecimiento." },
      { phrase: "One must adapt to change.", translation: "Hay que adaptarse al cambio." },
      { phrase: "Innovation requires courage.", translation: "La innovación requiere valentía." },
    ], [
      { speaker: "A", text: "Does automation increase productivity?", translation: "¿La automatización aumenta la productividad?" },
      { speaker: "B", text: "Often yes, but job tasks change.", translation: "A menudo sí, pero cambian las tareas." },
      { speaker: "A", text: "How can companies adapt?", translation: "¿Cómo pueden adaptarse las empresas?" },
      { speaker: "B", text: "By investing in training and innovation.", translation: "Invirtiendo en formación e innovación." },
    ], { title: "New Technology at Work", text: "Automation and artificial intelligence can streamline production, but they also require new skills. A successful company predicts change, invests in people, and adapts to competition.", translation: "La automatización y la inteligencia artificial pueden agilizar la producción, pero también requieren nuevas habilidades. Una empresa exitosa predice los cambios, invierte en las personas y se adapta a la competencia." }),
    u("u29", "Culture and Media", "Analyse the relationship between media, culture, and opinion.", [
      w("perspective", "perspectiva", "noun", "The article offers a new perspective.", "El artículo ofrece una nueva perspectiva."),
      w("source", "fuente", "noun", "Check the source of the information.", "Comprueba la fuente de la información."),
      w("audience", "público", "noun", "The film reached a large audience.", "La película llegó a un público amplio."),
      w("portrayal", "representación", "noun", "The portrayal was one-sided.", "La representación fue unilateral."),
      w("influence", "influir", "verb", "Media influences opinions.", "Los medios influyen en las opiniones."),
      w("interpret", "interpretar", "verb", "The viewer interprets the scene differently.", "El espectador interpreta la escena de otra manera."),
      w("compare", "comparar", "verb", "We can compare two reports.", "Podemos comparar dos informes."),
      w("question", "cuestionar", "verb", "The reader questions the claim.", "El lector cuestiona la afirmación."),
    ], [
      { phrase: "What is your source?", translation: "¿Cuál es tu fuente?" },
      { phrase: "The matter has different perspectives.", translation: "El asunto tiene diferentes perspectivas." },
      { phrase: "Media influences the discussion.", translation: "Los medios influyen en el debate." },
      { phrase: "This claim must be questioned.", translation: "Hay que cuestionar esta afirmación." },
    ], [
      { speaker: "A", text: "Can we trust this news report?", translation: "¿Podemos confiar en esta noticia?" },
      { speaker: "B", text: "First check the source and perspective.", translation: "Primero comprueba la fuente y la perspectiva." },
      { speaker: "A", text: "How does the audience interpret it?", translation: "¿Cómo lo interpreta el público?" },
      { speaker: "B", text: "It depends on experience and culture.", translation: "Depende de la experiencia y la cultura." },
    ], { title: "The Critical Reader", text: "A critical reader compares sources and asks whose perspective appears in a text. Media can influence opinion, so a portrayal must be interpreted in relation to its audience and culture.", translation: "Un lector crítico compara fuentes y pregunta qué perspectiva aparece en un texto. Los medios pueden influir en la opinión, por lo que una representación debe interpretarse según su público y cultura." }),
  ],
  C1: [
    u("u28", "Research and Argument", "Build precise arguments and evaluate research evidence.", [
      w("claim", "afirmación", "noun", "A claim needs justification.", "Una afirmación necesita justificación."),
      w("evidence", "evidencia", "noun", "The study provides new evidence.", "El estudio proporciona nueva evidencia."),
      w("method", "método", "noun", "The method is described precisely.", "El método se describe con precisión."),
      w("assumption", "supuesto", "noun", "An assumption is not always correct.", "Un supuesto no siempre es correcto."),
      w("conclusion", "conclusión", "noun", "The conclusion is based on data.", "La conclusión se basa en datos."),
      w("justify", "justificar", "verb", "The researcher justifies the choice.", "El investigador justifica la elección."),
      w("assess", "evaluar", "verb", "We assess the reliability of the results.", "Evaluamos la fiabilidad de los resultados."),
      w("refute", "refutar", "verb", "New information can refute an assumption.", "La nueva información puede refutar un supuesto."),
    ], [
      { phrase: "The data supports this claim.", translation: "Los datos apoyan esta afirmación." },
      { phrase: "The conclusion is preliminary.", translation: "La conclusión es preliminar." },
      { phrase: "The method must be transparent.", translation: "El método debe ser transparente." },
      { phrase: "This assumption should be assessed.", translation: "Este supuesto debe evaluarse." },
    ], [
      { speaker: "A", text: "What is your claim based on?", translation: "¿En qué se basa tu afirmación?" },
      { speaker: "B", text: "On data and a clearly described method.", translation: "En datos y un método claramente descrito." },
      { speaker: "A", text: "Can new research refute it?", translation: "¿Puede refutarla una nueva investigación?" },
      { speaker: "B", text: "It can, if the evidence is reliable.", translation: "Sí, si la evidencia es fiable." },
    ], { title: "A Justified Conclusion", text: "Good research distinguishes assumptions, claims, and evidence. An open description of the method helps the reader assess results. A conclusion is strong only when the data truly supports it.", translation: "Una buena investigación distingue supuestos, afirmaciones y evidencia. Una descripción abierta del método ayuda a evaluar los resultados. Una conclusión solo es sólida cuando los datos la apoyan realmente." }),
    u("u29", "Society and Ethics", "Reflect on social choices and ethical responsibility.", [
      w("justice", "justicia", "noun", "Justice requires fairness.", "La justicia requiere equidad."),
      w("value", "valor", "noun", "The decision reflects shared values.", "La decisión refleja valores compartidos."),
      w("duty", "deber", "noun", "We have a duty to help.", "Tenemos el deber de ayudar."),
      w("consequence", "consecuencia", "noun", "The decision has a long-term consequence.", "La decisión tiene una consecuencia a largo plazo."),
      w("inequality", "desigualdad", "noun", "Inequality appears in services.", "La desigualdad aparece en los servicios."),
      w("defend", "defender", "verb", "She defends vulnerable people.", "Ella defiende a las personas vulnerables."),
      w("consider", "considerar", "verb", "The decision must be considered.", "La decisión debe ser considerada."),
      w("oppose", "oponerse", "verb", "Many oppose the proposal.", "Muchos se oponen a la propuesta."),
    ], [
      { phrase: "The decision has ethical consequences.", translation: "La decisión tiene consecuencias éticas." },
      { phrase: "Everyone's voice should be heard.", translation: "La voz de todos debe ser escuchada." },
      { phrase: "The matter is not simple.", translation: "El asunto no es sencillo." },
      { phrase: "We must weigh the alternatives.", translation: "Debemos sopesar las alternativas." },
    ], [
      { speaker: "A", text: "How does justice appear in this decision?", translation: "¿Cómo aparece la justicia en esta decisión?" },
      { speaker: "B", text: "It depends on how consequences are shared.", translation: "Depende de cómo se reparten las consecuencias." },
      { speaker: "A", text: "What duties do we have?", translation: "¿Qué deberes tenemos?" },
      { speaker: "B", text: "We should defend people with fewer opportunities.", translation: "Debemos defender a quienes tienen menos oportunidades." },
    ], { title: "An Ethical Choice", text: "A social decision reflects values and produces consequences. When assessing justice, different groups must be heard and we must consider whether a solution increases or reduces inequality.", translation: "Una decisión social refleja valores y produce consecuencias. Al evaluar la justicia, hay que escuchar a distintos grupos y considerar si una solución aumenta o reduce la desigualdad." }),
  ],
  C2: [
    u("u28", "Rhetoric and Influence", "Analyse how language creates influence and authority.", [
      w("rhetoric", "retórica", "noun", "Rhetoric directs the audience's attention.", "La retórica dirige la atención del público."),
      w("persuasiveness", "capacidad de persuasión", "noun", "The claim lacks persuasiveness.", "La afirmación carece de capacidad de persuasión."),
      w("tone", "tono", "noun", "The tone changes at the end.", "El tono cambia al final."),
      w("comparison", "punto de comparación", "noun", "A comparison makes the difference visible.", "Un punto de comparación hace visible la diferencia."),
      w("preconception", "preconcepción", "noun", "A preconception affects interpretation.", "Una preconcepción afecta la interpretación."),
      w("emphasise", "enfatizar", "verb", "The writer emphasises responsibility.", "El escritor enfatiza la responsabilidad."),
      w("hint", "insinuar", "verb", "The sentence hints at a problem.", "La frase insinúa un problema."),
      w("redefine", "redefinir", "verb", "The text redefines the concept.", "El texto redefine el concepto."),
    ], [
      { phrase: "Tone changes the impact of a message.", translation: "El tono cambia el impacto de un mensaje." },
      { phrase: "The writer hints at more than they say.", translation: "El escritor insinúa más de lo que dice." },
      { phrase: "The concept must be redefined.", translation: "El concepto debe redefinirse." },
      { phrase: "The audience interprets from its own position.", translation: "El público interpreta desde su propia posición." },
    ], [
      { speaker: "A", text: "Why is the speech so persuasive?", translation: "¿Por qué es tan persuasivo el discurso?" },
      { speaker: "B", text: "It emphasises shared values and uses a familiar comparison.", translation: "Enfatiza valores compartidos y usa una comparación conocida." },
      { speaker: "A", text: "What does the tone hint at?", translation: "¿Qué insinúa el tono?" },
      { speaker: "B", text: "It hints at doubt although the words sound certain.", translation: "Insinúa duda aunque las palabras suenan seguras." },
    ], { title: "What Is Left Unsaid", text: "Rhetoric is not only words but also order, tone, and silence. An experienced reader recognises preconceptions and notices what a text emphasises or leaves to implication.", translation: "La retórica no son solo palabras, sino también orden, tono y silencio. Un lector experimentado reconoce preconcepciones y observa lo que el texto enfatiza o deja implícito." }),
    u("u29", "Language and Knowledge", "Consider how language limits, conveys, and changes knowledge.", [
      w("meaning", "significado", "noun", "Meaning depends on context.", "El significado depende del contexto."),
      w("understanding", "comprensión", "noun", "The understanding changed after discussion.", "La comprensión cambió después del debate."),
      w("consciousness", "conciencia", "noun", "Language affects consciousness.", "El lenguaje afecta la conciencia."),
      w("ambiguity", "ambigüedad", "noun", "Ambiguity can be intentional.", "La ambigüedad puede ser intencional."),
      w("framework", "marco de referencia", "noun", "The framework changes the question.", "El marco de referencia cambia la pregunta."),
      w("convey", "transmitir", "verb", "The image conveys a feeling.", "La imagen transmite un sentimiento."),
      w("limit", "limitar", "verb", "The definition limits the concept.", "La definición limita el concepto."),
      w("specify", "precisar", "verb", "The writer specifies the claim.", "El escritor precisa la afirmación."),
    ], [
      { phrase: "Meaning arises in context.", translation: "El significado surge en el contexto." },
      { phrase: "Language is not a neutral instrument.", translation: "El lenguaje no es un instrumento neutral." },
      { phrase: "This framework changes the interpretation.", translation: "Este marco de referencia cambia la interpretación." },
      { phrase: "The claim needs a precise definition.", translation: "La afirmación necesita una definición precisa." },
    ], [
      { speaker: "A", text: "Can language convey an experience completely?", translation: "¿Puede el lenguaje transmitir una experiencia por completo?" },
      { speaker: "B", text: "It conveys something but also limits alternatives.", translation: "Transmite algo, pero también limita las alternativas." },
      { speaker: "A", text: "Why is ambiguity sometimes preserved?", translation: "¿Por qué a veces se conserva la ambigüedad?" },
      { speaker: "B", text: "Because it can open several meanings.", translation: "Porque puede abrir varios significados." },
    ], { title: "The Limits of Language", text: "Language conveys knowledge, but it is not a transparent window onto reality. Every framework highlights some meanings and limits others. Precise interpretation requires concepts and tolerance of uncertainty.", translation: "El lenguaje transmite conocimiento, pero no es una ventana transparente a la realidad. Cada marco resalta algunos significados y limita otros. La interpretación precisa requiere conceptos y tolerancia a la incertidumbre." }),
  ],
};
