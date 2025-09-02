import React from 'react';
import type { PromptTechnique } from './types';
import {
    ZeroShotDiagram,
    OneShotDiagram,
    FewShotDiagram,
    CoTDiagram,
    ReflectionDiagram,
    DelimiterDiagram,
    FormatDiagram,
    ReframingDiagram,
    PersonalizationDiagram,
    ContextExpansionDiagram
} from './components/diagrams/Diagrams';

const translations = {
    es: {
        appTitle: 'Guía Interactiva de Prompting',
        appDescription: 'Domina el arte de comunicarte con modelos de IA. Explora técnicas, desde los fundamentos hasta estrategias avanzadas, para obtener resultados precisos y creativos.',
        categories: {
            basic: 'Técnicas Básicas',
            advanced: 'Técnicas Avanzadas',
            structure: 'Estructura y Claridad',
            optimization: 'Optimización y Refinamiento'
        },
        card: {
            whatIsIt: '¿Qué es?',
            analogy: 'Analogía Simple',
            diagram: 'Diagrama de Flujo',
            example: 'Ejemplo y Plantilla',
            promptExample: 'Ejemplo de Prompt',
            template: 'Plantilla',
            copy: 'Copiar',
            copied: 'Copiado',
        },
        diagrams: {
            question: 'Pregunta',
            aiModel: 'Modelo IA',
            answer: 'Respuesta',
            singleExample: 'Ejemplo Único',
            guidedAnswer: 'Respuesta Guiada',
            example1: 'Ejemplo 1',
            example2: 'Ejemplo 2',
            patternAnswer: 'Respuesta con Patrón',
            complexQuestion: 'Pregunta Compleja',
            stepByStep: '"Piensa paso a paso..."',
            finalAnswer: 'Respuesta Final',
            initialPrompt: 'Prompt Inicial',
            draft: 'Borrador',
            critiquePrompt: 'Prompt de Crítica',
            refinedAnswer: 'Respuesta Refinada',
            instruction: 'Instrucción',
            context: 'Contexto',
            task: 'Tarea',
            formatAsJson: '"Formatea como JSON"',
            vagueQuestion: 'Pregunta Vaga',
            specificQuestion: 'Pregunta Específica',
            betterAnswer: 'Mejor Respuesta',
            actAsRole: '"Actúa como [Rol]"',
            tonedAnswer: 'Respuesta con Tono',
            detailedContext: 'Contexto Detallado',
            specificTask: 'Tarea Específica',
            preciseAnswer: 'Respuesta Precisa'
        },
        content: {
            'zero-shot': {
                title: 'Zero-Shot Prompting',
                explanation: 'Consiste en hacer una pregunta directa al modelo de lenguaje sin proporcionarle ningún ejemplo previo. El modelo utiliza su conocimiento general preexistente para generar una respuesta.',
                analogy: 'Es como preguntarle a un experto "¿Qué es la fotosíntesis?" sin darle ninguna pista. Confías en que ya sabe la respuesta.',
                example: {
                    prompt: `Clasifica el siguiente texto como "Positivo", "Negativo" o "Neutral":\n\nTexto: "La película fue increíble, la mejor que he visto en años."\n\nClasificación:`,
                    template: `[Instrucción o Pregunta Directa]\n\n[Tu Texto/Dato Aquí]\n\nRespuesta:`
                }
            },
            'one-shot': {
                title: 'One-Shot Prompting',
                explanation: 'Se proporciona un único ejemplo de la tarea deseada junto con la pregunta. Esto ayuda al modelo a entender mejor el contexto y el formato de la respuesta esperada.',
                analogy: 'Es como decir: "Un perro dice \'guau\'. ¿Qué dice un gato?". Le das una pista para que entienda el patrón.',
                example: {
                    prompt: `Traduce del inglés al francés:\n\nsea otter -> loutre de mer\n\ncheese ->`,
                    template: `[Descripción de la tarea]\n\n[Ejemplo: Entrada -> Salida]\n\n[Tu Entrada] ->`
                }
            },
            'few-shot': {
                title: 'Few-Shot Prompting',
                explanation: 'Se ofrecen varios ejemplos (generalmente de 2 a 5) para guiar al modelo. Esta técnica es muy eficaz para tareas complejas o con formatos de salida específicos, ya que establece un patrón claro.',
                analogy: 'Es como enseñarle a un niño a sumar mostrándole "2+2=4", "3+3=6" y luego preguntarle "¿Cuánto es 4+4?".',
                example: {
                    prompt: `Extrae el nombre del producto y el color de las frases:\n\nFrase: "Quiero comprar una camiseta roja."\nProducto: camiseta, Color: rojo\n\nFrase: "Me interesan los pantalones azules."\nProducto: pantalones, Color: azul\n\nFrase: "Busco una sudadera verde."\nProducto:`,
                    template: `[Descripción de la tarea]\n\n[Ejemplo 1: Entrada -> Salida]\n[Ejemplo 2: Entrada -> Salida]\n...\n[Tu Entrada] ->`
                }
            },
             'chain-of-thought': {
                title: 'Chain-of-Thought (CoT)',
                explanation: 'Se le pide al modelo que "piense en voz alta" o desglose su razonamiento paso a paso antes de dar la respuesta final. Esto mejora drásticamente el rendimiento en problemas lógicos, matemáticos y de varias etapas.',
                analogy: 'Es como pedirle a un matemático que no solo te dé el resultado de un problema, sino que muestre todo el desarrollo en la pizarra. Así es más probable que llegue a la solución correcta.',
                example: {
                    prompt: `P: Juan tiene 5 manzanas. Compra 2 cajas de manzanas con 6 manzanas cada una. ¿Cuántas manzanas tiene ahora?\n\nR: Juan empezó con 5 manzanas. Luego compró 2 cajas de 6 manzanas, que son 2 * 6 = 12 manzanas. Por lo tanto, ahora tiene 5 + 12 = 17 manzanas. La respuesta es 17.\n\nP: María tiene 3 globos. Le regalan el doble de los que tiene y luego explota uno. ¿Cuántos globos le quedan?\n\nR:`,
                    template: `P: [Pregunta Compleja 1]\nR: [Razonamiento paso a paso 1]... La respuesta es [Respuesta 1].\n\nP: [Tu Pregunta Compleja]\nR:`
                }
            },
            'reflection': {
                title: 'Reflection Prompting',
                explanation: 'Esta técnica implica un proceso de dos pasos: primero, se genera una respuesta inicial. Luego, se le pide al modelo que evalúe, critique o mejore esa primera respuesta, lo que lleva a un resultado final más refinado y preciso.',
                analogy: 'Es como escribir un borrador de un ensayo (primera respuesta) y luego dárselo a un editor (el propio modelo en un segundo prompt) para que lo revise y sugiera mejoras.',
                example: {
                    prompt: `[PASO 1 - GENERACIÓN INICIAL]\n"Escribe un párrafo corto sobre los beneficios de la energía solar."\n\n[PASO 2 - REFLEXIÓN Y MEJORA]\n"Revisa el siguiente párrafo y mejóralo para que sea más persuasivo y mencione datos específicos:\n\n[Párrafo generado en el paso 1]"\n\nVersión mejorada:`,
                    template: `[Paso 1: Generación]\n[Prompt Inicial]\n\n[Paso 2: Reflexión]\n"Evalúa la siguiente respuesta [criterio: coherencia, precisión, etc.] y genera una versión mejorada:\n\n[Respuesta del Paso 1]"`
                }
            },
            'delimiters': {
                title: 'Uso de Delimitadores',
                explanation: 'Utilizar delimitadores claros (como comillas triples ```, XML <tag>, o guiones ---) para separar distintas partes de tu prompt, como instrucciones, contexto y datos de entrada. Esto ayuda al modelo a no confundir las instrucciones con el texto que debe procesar.',
                analogy: 'Es como usar comillas para citar a alguien en un texto. Dejas claro qué palabras son tuyas y cuáles son la cita. Los delimitadores hacen lo mismo para el modelo.',
                example: {
                    prompt: `Resume el texto que se encuentra entre las comillas triples en una sola frase.\n\n\`\`\`\n[Aquí iría un texto largo y detallado sobre cualquier tema.]\n\`\`\`\n\nResumen:`,
                    template: `[Instrucción]\n\n[Delimitador de Inicio]\n[Tu Texto/Contexto/Dato]\n[Delimitador de Fin]`
                }
            },
            'format-specification': {
                title: 'Especificación de Formato',
                explanation: 'Indicar explícitamente el formato de salida deseado. Puedes pedirle que genere la respuesta en JSON, Markdown, una lista con viñetas, una tabla, etc. Cuanto más específico seas, mejor será el resultado.',
                analogy: 'Es como pedir una pizza. No solo dices "quiero una pizza", especificas los ingredientes, el tamaño y si la quieres con el borde relleno de queso. Das instrucciones claras para obtener lo que quieres.',
                example: {
                    prompt: `Genera una lista de tres ideas para un nombre de blog sobre cocina vegana. Formatea la respuesta como un objeto JSON con las claves "nombre" y "descripcion".\n\nJSON:`,
                    template: `[Instrucción]\n\nGenera la respuesta en el siguiente formato:\n[Descripción del formato, ej: JSON, Markdown, Lista]`
                }
            },
            'prompt-reframing': {
                title: 'Prompt Reframing',
                explanation: 'Consiste en reformular o cambiar el enfoque de tu pregunta para guiar al modelo hacia una mejor respuesta. A veces, un pequeño cambio en la perspectiva puede desbloquear resultados mucho más precisos o creativos.',
                analogy: 'Si le preguntas a un GPS "¿Cómo evito el tráfico?", puede que no te dé la mejor ruta. Pero si le preguntas "¿Cuál es la ruta más rápida a mi destino ahora mismo?", optimizará la respuesta en función de ese objetivo.',
                example: {
                    prompt: `[Prompt Original]\n"Escribe sobre por qué los perros son buenas mascotas."\n\n[Prompt Reformulado (Mejor)]\n"Actúa como un veterinario experto. Redacta un artículo para un blog familiar explicando los beneficios emocionales y de salud de tener un perro como mascota, citando ejemplos concretos."`,
                    template: `[Prompt Vago/Inicial]\n"Háblame sobre [Tema X]"\n\n[Prompt Reformulado]\n"Actúa como [Rol Experto]. Tu objetivo es [Objetivo Claro]. Escribe sobre [Tema X] para una audiencia de [Audiencia Específica]."`
                }
            },
            'adaptation-personalization': {
                title: 'Adaptación y Personalización',
                explanation: 'Asignarle al modelo un "rol" o una "persona" específica (ej. "Actúa como un pirata", "Eres un experto en física cuántica"). Esto ajusta el tono, el estilo y el nivel de conocimiento de la respuesta para que se adapte mejor a tus necesidades.',
                analogy: 'Es la diferencia entre pedirle un consejo a un amigo y pedírselo a un abogado. El rol define la perspectiva y el tipo de respuesta que recibirás.',
                example: {
                    prompt: `Actúa como un guía turístico entusiasta de Roma. Describe el Coliseo en tres frases cortas, transmitiendo emoción y asombro.`,
                    template: `Actúa como un [Rol/Persona].\n\n[Tu Pregunta o Tarea]`
                }
            },
            'context-expansion': {
                title: 'Context Expansion',
                explanation: 'Proporcionar contexto relevante y suficiente dentro del prompt. Esto puede incluir información de fondo, datos clave, o definir términos ambiguos para asegurar que el modelo tenga toda la información necesaria para generar una respuesta de alta calidad.',
                analogy: 'Es como contratar a un diseñador. No le dices "hazme un logo". Le das información sobre tu empresa, tu público objetivo, tus colores corporativos y ejemplos que te gustan. Más contexto = mejor resultado.',
                example: {
                    prompt: `Contexto: Estamos desarrollando una app de fitness para principiantes. El tono debe ser motivador y sencillo.\n\nTarea: Escribe 3 mensajes de notificación para recordar al usuario que debe hacer ejercicio hoy.\n\nMensajes:`,
                    template: `Contexto: [Información de fondo relevante]\n\nDefiniciones: [Si hay términos ambiguos]\n\nTarea: [Tu Petición Específica]`
                }
            },
        }
    },
    en: {
        appTitle: 'Interactive Prompting Guide',
        appDescription: 'Master the art of communicating with AI models. Explore techniques, from fundamentals to advanced strategies, to get precise and creative results.',
        categories: {
            basic: 'Basic Techniques',
            advanced: 'Advanced Techniques',
            structure: 'Structure & Clarity',
            optimization: 'Optimization & Refinement'
        },
        card: {
            whatIsIt: 'What is it?',
            analogy: 'Simple Analogy',
            diagram: 'Flow Diagram',
            example: 'Example & Template',
            promptExample: 'Prompt Example',
            template: 'Template',
            copy: 'Copy',
            copied: 'Copied',
        },
        diagrams: {
            question: 'Question',
            aiModel: 'AI Model',
            answer: 'Answer',
            singleExample: 'Single Example',
            guidedAnswer: 'Guided Answer',
            example1: 'Example 1',
            example2: 'Example 2',
            patternAnswer: 'Patterned Answer',
            complexQuestion: 'Complex Question',
            stepByStep: '"Think step-by-step..."',
            finalAnswer: 'Final Answer',
            initialPrompt: 'Initial Prompt',
            draft: 'Draft',
            critiquePrompt: 'Critique Prompt',
            refinedAnswer: 'Refined Answer',
            instruction: 'Instruction',
            context: 'Context',
            task: 'Task',
            formatAsJson: '"Format as JSON"',
            vagueQuestion: 'Vague Question',
            specificQuestion: 'Specific Question',
            betterAnswer: 'Better Answer',
            actAsRole: '"Act as [Role]"',
            tonedAnswer: 'Toned Answer',
            detailedContext: 'Detailed Context',
            specificTask: 'Specific Task',
            preciseAnswer: 'Precise Answer'
        },
        content: {
            'zero-shot': {
                title: 'Zero-Shot Prompting',
                explanation: 'It consists of asking a direct question to the language model without providing any prior examples. The model uses its pre-existing general knowledge to generate a response.',
                analogy: 'It\'s like asking an expert "What is photosynthesis?" without giving any clues. You trust that they already know the answer.',
                example: {
                    prompt: `Classify the following text as "Positive", "Negative", or "Neutral":\n\nText: "The movie was incredible, the best I've seen in years."\n\nClassification:`,
                    template: `[Direct Instruction or Question]\n\n[Your Text/Data Here]\n\nAnswer:`
                }
            },
            'one-shot': {
                title: 'One-Shot Prompting',
                explanation: 'A single example of the desired task is provided along with the question. This helps the model better understand the context and expected response format.',
                analogy: 'It\'s like saying: "A dog says \'woof\'. What does a cat say?". You give it a hint to understand the pattern.',
                example: {
                    prompt: `Translate from English to French:\n\nsea otter -> loutre de mer\n\ncheese ->`,
                    template: `[Task Description]\n\n[Example: Input -> Output]\n\n[Your Input] ->`
                }
            },
             'few-shot': {
                title: 'Few-Shot Prompting',
                explanation: 'Several examples (usually 2 to 5) are provided to guide the model. This technique is very effective for complex tasks or specific output formats as it establishes a clear pattern.',
                analogy: 'It\'s like teaching a child to add by showing them "2+2=4", "3+3=6", and then asking "What is 4+4?".',
                example: {
                    prompt: `Extract the product name and color from the sentences:\n\nSentence: "I want to buy a red t-shirt."\nProduct: t-shirt, Color: red\n\nSentence: "I'm interested in the blue pants."\nProduct: pants, Color: blue\n\nSentence: "I'm looking for a green hoodie."\nProduct:`,
                    template: `[Task Description]\n\n[Example 1: Input -> Output]\n[Example 2: Input -> Output]\n...\n[Your Input] ->`
                }
            },
            'chain-of-thought': {
                title: 'Chain-of-Thought (CoT)',
                explanation: 'The model is asked to "think out loud" or break down its reasoning step-by-step before giving the final answer. This dramatically improves performance on logical, mathematical, and multi-step problems.',
                analogy: 'It\'s like asking a mathematician not just for the result of a problem, but to show all the steps on the blackboard. This makes it more likely to arrive at the correct solution.',
                example: {
                    prompt: `Q: John has 5 apples. He buys 2 boxes of apples with 6 apples each. How many apples does he have now?\n\nA: John started with 5 apples. Then he bought 2 boxes of 6 apples, which is 2 * 6 = 12 apples. Therefore, he now has 5 + 12 = 17 apples. The answer is 17.\n\nQ: Mary has 3 balloons. She is given twice as many as she has and then one pops. How many balloons does she have left?\n\nA:`,
                    template: `Q: [Complex Question 1]\nA: [Step-by-step reasoning 1]... The answer is [Answer 1].\n\nQ: [Your Complex Question]\nA:`
                }
            },
            'reflection': {
                title: 'Reflection Prompting',
                explanation: 'This technique involves a two-step process: first, an initial response is generated. Then, the model is asked to evaluate, critique, or improve that first response, leading to a more refined and accurate final result.',
                analogy: 'It\'s like writing a draft of an essay (first response) and then giving it to an editor (the model itself in a second prompt) to review and suggest improvements.',
                example: {
                    prompt: `[STEP 1 - INITIAL GENERATION]\n"Write a short paragraph about the benefits of solar energy."\n\n[STEP 2 - REFLECTION AND IMPROVEMENT]\n"Review the following paragraph and improve it to be more persuasive and mention specific data:\n\n[Paragraph generated in step 1]"\n\nImproved version:`,
                    template: `[Step 1: Generation]\n[Initial Prompt]\n\n[Step 2: Reflection]\n"Evaluate the following response based on [criteria: coherence, accuracy, etc.] and generate an improved version:\n\n[Response from Step 1]"`
                }
            },
            'delimiters': {
                title: 'Using Delimiters',
                explanation: 'Use clear delimiters (like triple backticks ```, XML <tag>, or dashes ---) to separate different parts of your prompt, such as instructions, context, and input data. This helps the model not to confuse the instructions with the text it needs to process.',
                analogy: 'It\'s like using quotation marks to quote someone in a text. You make it clear which words are yours and which are the quote. Delimiters do the same for the model.',
                example: {
                    prompt: `Summarize the text enclosed in triple backticks in a single sentence.\n\n\`\`\`\n[A long and detailed text on any topic would go here.]\n\`\`\`\n\nSummary:`,
                    template: `[Instruction]\n\n[Start Delimiter]\n[Your Text/Context/Data]\n[End Delimiter]`
                }
            },
            'format-specification': {
                title: 'Format Specification',
                explanation: 'Explicitly state the desired output format. You can ask it to generate the response in JSON, Markdown, a bulleted list, a table, etc. The more specific you are, the better the result.',
                analogy: 'It\'s like ordering a pizza. You don\'t just say "I want a pizza," you specify the ingredients, the size, and if you want it with a cheese-stuffed crust. You give clear instructions to get what you want.',
                example: {
                    prompt: `Generate a list of three name ideas for a vegan cooking blog. Format the response as a JSON object with "name" and "description" keys.\n\nJSON:`,
                    template: `[Instruction]\n\nGenerate the response in the following format:\n[Format description, e.g., JSON, Markdown, List]`
                }
            },
            'prompt-reframing': {
                title: 'Prompt Reframing',
                explanation: 'This involves rephrasing or changing the focus of your question to guide the model towards a better answer. Sometimes, a small change in perspective can unlock much more accurate or creative results.',
                analogy: 'If you ask a GPS "How do I avoid traffic?", it might not give you the best route. But if you ask "What is the fastest route to my destination right now?", it will optimize the response based on that goal.',
                example: {
                    prompt: `[Original Prompt]\n"Write about why dogs are good pets."\n\n[Reframed Prompt (Better)]\n"Act as an expert veterinarian. Write an article for a family blog explaining the emotional and health benefits of having a dog as a pet, citing concrete examples."`,
                    template: `[Vague/Initial Prompt]\n"Tell me about [Topic X]"\n\n[Reframed Prompt]\n"Act as an [Expert Role]. Your goal is to [Clear Objective]. Write about [Topic X] for an audience of [Specific Audience]."`
                }
            },
            'adaptation-personalization': {
                title: 'Adaptation & Personalization',
                explanation: 'Assign the model a specific "role" or "persona" (e.g., "Act as a pirate," "You are a quantum physics expert"). This adjusts the tone, style, and level of knowledge of the response to better suit your needs.',
                analogy: 'It\'s the difference between asking a friend for advice and asking a lawyer. The role defines the perspective and the type of response you will receive.',
                example: {
                    prompt: `Act as an enthusiastic tour guide in Rome. Describe the Colosseum in three short sentences, conveying excitement and awe.`,
                    template: `Act as a [Role/Persona].\n\n[Your Question or Task]`
                }
            },
            'context-expansion': {
                title: 'Context Expansion',
                explanation: 'Provide relevant and sufficient context within the prompt. This may include background information, key data, or defining ambiguous terms to ensure the model has all the necessary information to generate a high-quality response.',
                analogy: 'It\'s like hiring a designer. You don\'t just say "make me a logo." You give them information about your company, your target audience, your corporate colors, and examples you like. More context = better result.',
                example: {
                    prompt: `Context: We are developing a fitness app for beginners. The tone should be motivating and simple.\n\nTask: Write 3 notification messages to remind the user to exercise today.\n\nMessages:`,
                    template: `Context: [Relevant background information]\n\nDefinitions: [If there are ambiguous terms]\n\nTask: [Your Specific Request]`
                }
            },
        }
    },
    it: {
        appTitle: 'Guida Interattiva al Prompting',
        appDescription: 'Padroneggia l\'arte di comunicare con i modelli IA. Esplora tecniche, dai fondamenti alle strategie avanzate, per ottenere risultati precisi e creativi.',
        categories: {
            basic: 'Tecniche di Base',
            advanced: 'Tecniche Avanzate',
            structure: 'Struttura e Chiarezza',
            optimization: 'Ottimizzazione e Rifinitura'
        },
        card: {
            whatIsIt: 'Cos\'è?',
            analogy: 'Analogia Semplice',
            diagram: 'Diagramma di Flusso',
            example: 'Esempio e Template',
            promptExample: 'Esempio di Prompt',
            template: 'Template',
            copy: 'Copia',
            copied: 'Copiato',
        },
        diagrams: {
            question: 'Domanda',
            aiModel: 'Modello IA',
            answer: 'Risposta',
            singleExample: 'Esempio Singolo',
            guidedAnswer: 'Risposta Guidata',
            example1: 'Esempio 1',
            example2: 'Esempio 2',
            patternAnswer: 'Risposta con Pattern',
            complexQuestion: 'Domanda Complessa',
            stepByStep: '"Pensa passo dopo passo..."',
            finalAnswer: 'Risposta Finale',
            initialPrompt: 'Prompt Iniziale',
            draft: 'Bozza',
            critiquePrompt: 'Prompt di Critica',
            refinedAnswer: 'Risposta Rifinita',
            instruction: 'Istruzione',
            context: 'Contesto',
            task: 'Compito',
            formatAsJson: '"Formatta come JSON"',
            vagueQuestion: 'Domanda Vaga',
            specificQuestion: 'Domanda Specifica',
            betterAnswer: 'Risposta Migliore',
            actAsRole: '"Agisci come [Ruolo]"',
            tonedAnswer: 'Risposta con Tono',
            detailedContext: 'Contesto Dettagliato',
            specificTask: 'Compito Specifico',
            preciseAnswer: 'Risposta Precisa'
        },
        content: {
            'zero-shot': {
                title: 'Prompting Zero-Shot',
                explanation: 'Consiste nel porre una domanda diretta al modello linguistico senza fornire alcun esempio precedente. Il modello utilizza la sua conoscenza generale preesistente per generare una risposta.',
                analogy: 'È come chiedere a un esperto "Cos\'è la fotosintesi?" senza dargli alcun indizio. Ti fidi che conosca già la risposta.',
                example: {
                    prompt: `Classifica il seguente testo come "Positivo", "Negativo" o "Neutrale":\n\nTesto: "Il film è stato incredibile, il migliore che abbia visto da anni."\n\nClassificazione:`,
                    template: `[Istruzione o Domanda Diretta]\n\n[Il Tuo Testo/Dato Qui]\n\nRisposta:`
                }
            },
            'one-shot': {
                title: 'Prompting One-Shot',
                explanation: 'Viene fornito un singolo esempio del compito desiderato insieme alla domanda. Questo aiuta il modello a comprendere meglio il contesto e il formato di risposta atteso.',
                analogy: 'È come dire: "Un cane fa \'bau\'. Cosa fa un gatto?". Gli dai un indizio per capire lo schema.',
                example: {
                    prompt: `Traduci dall'inglese al francese:\n\nsea otter -> loutre de mer\n\ncheese ->`,
                    template: `[Descrizione del compito]\n\n[Esempio: Input -> Output]\n\n[Il Tuo Input] ->`
                }
            },
            'few-shot': {
                title: 'Prompting Few-Shot',
                explanation: 'Vengono forniti diversi esempi (di solito da 2 a 5) per guidare il modello. Questa tecnica è molto efficace per compiti complessi o formati di output specifici poiché stabilisce un pattern chiaro.',
                analogy: 'È come insegnare a un bambino ad addizionare mostrandogli "2+2=4", "3+3=6", e poi chiedendogli "Quanto fa 4+4?".',
                example: {
                    prompt: `Estrai il nome del prodotto e il colore dalle frasi:\n\nFrase: "Voglio comprare una maglietta rossa."\nProdotto: maglietta, Colore: rosso\n\nFrase: "Sono interessato ai pantaloni blu."\nProdotto: pantaloni, Colore: blu\n\nFrase: "Sto cercando una felpa verde."\nProdotto:`,
                    template: `[Descrizione del compito]\n\n[Esempio 1: Input -> Output]\n[Esempio 2: Input -> Output]\n...\n[Il Tuo Input] ->`
                }
            },
            'chain-of-thought': {
                title: 'Chain-of-Thought (CoT)',
                explanation: 'Al modello viene chiesto di "pensare ad alta voce" o di scomporre il suo ragionamento passo dopo passo prima di dare la risposta finale. Ciò migliora notevolmente le prestazioni su problemi logici, matematici e a più fasi.',
                analogy: 'È come chiedere a un matematico non solo il risultato di un problema, ma di mostrare tutti i passaggi sulla lavagna. In questo modo è più probabile che arrivi alla soluzione corretta.',
                example: {
                    prompt: `D: Giovanni ha 5 mele. Compra 2 scatole di mele con 6 mele ciascuna. Quante mele ha adesso?\n\nR: Giovanni ha iniziato con 5 mele. Poi ha comprato 2 scatole da 6 mele, che sono 2 * 6 = 12 mele. Pertanto, ora ha 5 + 12 = 17 mele. La risposta è 17.\n\nD: Maria ha 3 palloncini. Gliene regalano il doppio di quelli che ha e poi uno scoppia. Quanti palloncini le rimangono?\n\nR:`,
                    template: `D: [Domanda Complessa 1]\nR: [Ragionamento passo-passo 1]... La risposta è [Risposta 1].\n\nD: [La Tua Domanda Complessa]\nR:`
                }
            },
            'reflection': {
                title: 'Prompting di Riflessione',
                explanation: 'Questa tecnica prevede un processo in due fasi: prima viene generata una risposta iniziale. Poi, al modello viene chiesto di valutare, criticare o migliorare quella prima risposta, portando a un risultato finale più rifinito e accurato.',
                analogy: 'È come scrivere la bozza di un saggio (prima risposta) e poi darla a un editor (il modello stesso in un secondo prompt) per revisionarla e suggerire miglioramenti.',
                example: {
                    prompt: `[PASSO 1 - GENERAZIONE INIZIALE]\n"Scrivi un breve paragrafo sui benefici dell'energia solare."\n\n[PASSO 2 - RIFLESSIONE E MIGLIORAMENTO]\n"Rivedi il seguente paragrafo e miglioralo per renderlo più persuasivo e menzionare dati specifici:\n\n[Paragrafo generato nel passo 1]"\n\nVersione migliorata:`,
                    template: `[Passo 1: Generazione]\n[Prompt Iniziale]\n\n[Passo 2: Riflessione]\n"Valuta la seguente risposta in base a [criteri: coerenza, accuratezza, ecc.] e genera una versione migliorata:\n\n[Risposta del Passo 1]"`
                }
            },
            'delimiters': {
                title: 'Uso di Delimitatori',
                explanation: 'Usa delimitatori chiari (come tripli apici ```, tag XML <tag>, o trattini ---) per separare diverse parti del tuo prompt, come istruzioni, contesto e dati di input. Questo aiuta il modello a non confondere le istruzioni con il testo che deve elaborare.',
                analogy: 'È come usare le virgolette per citare qualcuno in un testo. Rendi chiaro quali parole sono tue e quali sono la citazione. I delimitatori fanno lo stesso per il modello.',
                example: {
                    prompt: `Riassumi il testo racchiuso tra tripli apici in una sola frase.\n\n\`\`\`\n[Qui andrebbe un testo lungo e dettagliato su qualsiasi argomento.]\n\`\`\`\n\nRiassunto:`,
                    template: `[Istruzione]\n\n[Delimitatore di Inizio]\n[Il Tuo Testo/Contesto/Dato]\n[Delimitatore di Fine]`
                }
            },
            'format-specification': {
                title: 'Specificazione del Formato',
                explanation: 'Indica esplicitamente il formato di output desiderato. Puoi chiedergli di generare la risposta in JSON, Markdown, un elenco puntato, una tabella, ecc. Più sei specifico, migliore sarà il risultato.',
                analogy: 'È come ordinare una pizza. Non dici solo "voglio una pizza", specifichi gli ingredienti, la dimensione e se la vuoi con il cornicione ripieno di formaggio. Dai istruzioni chiare per ottenere ciò che vuoi.',
                example: {
                    prompt: `Genera un elenco di tre idee per un nome di blog sulla cucina vegana. Formatta la risposta come un oggetto JSON con le chiavi "nome" e "descrizione".\n\nJSON:`,
                    template: `[Istruzione]\n\nGenera la risposta nel seguente formato:\n[Descrizione del formato, es: JSON, Markdown, Elenco]`
                }
            },
            'prompt-reframing': {
                title: 'Riformulazione del Prompt',
                explanation: 'Consiste nel riformulare o cambiare il focus della tua domanda per guidare il modello verso una risposta migliore. A volte, un piccolo cambiamento di prospettiva può sbloccare risultati molto più accurati o creativi.',
                analogy: 'Se chiedi a un GPS "Come evito il traffico?", potrebbe non darti il percorso migliore. Ma se chiedi "Qual è il percorso più veloce per la mia destinazione in questo momento?", ottimizzerà la risposta in base a quell\'obiettivo.',
                example: {
                    prompt: `[Prompt Originale]\n"Scrivi perché i cani sono buoni animali domestici."\n\n[Prompt Riformulato (Migliore)]\n"Agisci come un veterinario esperto. Scrivi un articolo per un blog familiare spiegando i benefici emotivi e per la salute di avere un cane come animale domestico, citando esempi concreti."`,
                    template: `[Prompt Vago/Iniziale]\n"Parlami di [Argomento X]"\n\n[Prompt Riformulato]\n"Agisci come [Ruolo Esperto]. Il tuo obiettivo è [Obiettivo Chiaro]. Scrivi di [Argomento X] per un pubblico di [Pubblico Specifico]."`
                }
            },
            'adaptation-personalization': {
                title: 'Adattamento e Personalizzazione',
                explanation: 'Assegna al modello un "ruolo" o una "persona" specifica (es. "Agisci come un pirata", "Sei un esperto di fisica quantistica"). Questo adatta il tono, lo stile e il livello di conoscenza della risposta per soddisfare meglio le tue esigenze.',
                analogy: 'È la differenza tra chiedere un consiglio a un amico e chiederlo a un avvocato. Il ruolo definisce la prospettiva e il tipo di risposta che riceverai.',
                example: {
                    prompt: `Agisci come una guida turistica entusiasta a Roma. Descrivi il Colosseo in tre brevi frasi, trasmettendo emozione e stupore.`,
                    template: `Agisci come un [Ruolo/Persona].\n\n[La Tua Domanda o Compito]`
                }
            },
            'context-expansion': {
                title: 'Espansione del Contesto',
                explanation: 'Fornisci un contesto pertinente e sufficiente all\'interno del prompt. Ciò può includere informazioni di base, dati chiave o la definizione di termini ambigui per garantire che il modello disponga di tutte le informazioni necessarie per generare una risposta di alta qualità.',
                analogy: 'È come assumere un designer. Non dici solo "fammi un logo". Gli fornisci informazioni sulla tua azienda, il tuo pubblico di destinazione, i tuoi colori aziendali ed esempi che ti piacciono. Più contesto = risultato migliore.',
                example: {
                    prompt: `Contesto: Stiamo sviluppando un'app di fitness per principianti. Il tono deve essere motivante e semplice.\n\nCompito: Scrivi 3 messaggi di notifica per ricordare all'utente di fare esercizio oggi.\n\nMessaggi:`,
                    template: `Contesto: [Informazioni di base pertinenti]\n\nDefinizioni: [Se ci sono termini ambigui]\n\nCompito: [La Tua Richiesta Specifica]`
                }
            },
        }
    },
    pt: {
        appTitle: 'Guia Interativo de Prompting',
        appDescription: 'Domine a arte de se comunicar com modelos de IA. Explore técnicas, desde os fundamentos até estratégias avançadas, para obter resultados precisos e criativos.',
        categories: {
            basic: 'Técnicas Básicas',
            advanced: 'Técnicas Avançadas',
            structure: 'Estrutura e Clareza',
            optimization: 'Otimização e Refinamento'
        },
        card: {
            whatIsIt: 'O que é?',
            analogy: 'Analogia Simples',
            diagram: 'Diagrama de Fluxo',
            example: 'Exemplo e Modelo',
            promptExample: 'Exemplo de Prompt',
            template: 'Modelo',
            copy: 'Copiar',
            copied: 'Copiado',
        },
        diagrams: {
            question: 'Pergunta',
            aiModel: 'Modelo de IA',
            answer: 'Resposta',
            singleExample: 'Exemplo Único',
            guidedAnswer: 'Resposta Guiada',
            example1: 'Exemplo 1',
            example2: 'Exemplo 2',
            patternAnswer: 'Resposta com Padrão',
            complexQuestion: 'Pergunta Complexa',
            stepByStep: '"Pense passo a passo..."',
            finalAnswer: 'Resposta Final',
            initialPrompt: 'Prompt Inicial',
            draft: 'Rascunho',
            critiquePrompt: 'Prompt de Crítica',
            refinedAnswer: 'Resposta Refinada',
            instruction: 'Instrução',
            context: 'Contexto',
            task: 'Tarefa',
            formatAsJson: '"Formatar como JSON"',
            vagueQuestion: 'Pergunta Vaga',
            specificQuestion: 'Pergunta Específica',
            betterAnswer: 'Melhor Resposta',
            actAsRole: '"Aja como [Papel]"',
            tonedAnswer: 'Resposta com Tom',
            detailedContext: 'Contexto Detalhado',
            specificTask: 'Tarefa Específica',
            preciseAnswer: 'Resposta Precisa'
        },
        content: {
            'zero-shot': {
                title: 'Prompting Zero-Shot',
                explanation: 'Consiste em fazer uma pergunta direta ao modelo de linguagem sem fornecer nenhum exemplo prévio. O modelo usa seu conhecimento geral preexistente para gerar uma resposta.',
                analogy: 'É como perguntar a um especialista "O que é fotossíntese?" sem dar nenhuma pista. Você confia que ele já sabe a resposta.',
                example: {
                    prompt: `Classifique o seguinte texto como "Positivo", "Negativo" ou "Neutro":\n\nTexto: "O filme foi incrível, o melhor que vi em anos."\n\nClassificação:`,
                    template: `[Instrução ou Pergunta Direta]\n\n[Seu Texto/Dado Aqui]\n\nResposta:`
                }
            },
            'one-shot': {
                title: 'Prompting One-Shot',
                explanation: 'Um único exemplo da tarefa desejada é fornecido junto com a pergunta. Isso ajuda o modelo a entender melhor o contexto e o formato de resposta esperado.',
                analogy: 'É como dizer: "Um cachorro diz \'au\'. O que um gato diz?". Você dá uma dica para ele entender o padrão.',
                example: {
                    prompt: `Traduza do inglês para o francês:\n\nsea otter -> loutre de mer\n\ncheese ->`,
                    template: `[Descrição da tarefa]\n\n[Exemplo: Entrada -> Saída]\n\n[Sua Entrada] ->`
                }
            },
            'few-shot': {
                title: 'Prompting Few-Shot',
                explanation: 'Vários exemplos (geralmente 2 a 5) são fornecidos para guiar o modelo. Esta técnica é muito eficaz para tarefas complexas ou formatos de saída específicos, pois estabelece um padrão claro.',
                analogy: 'É como ensinar una criança a somar mostrando "2+2=4", "3+3=6" e depois perguntar "Quanto é 4+4?".',
                example: {
                    prompt: `Extraia o nome do produto e a cor das frases:\n\nFrase: "Quero comprar uma camiseta vermelha."\nProduto: camiseta, Cor: vermelho\n\nFrase: "Estou interessado nas calças azuis."\nProduto: calças, Cor: azul\n\nFrase: "Procuro um moletom verde."\nProduto:`,
                    template: `[Descrição da tarefa]\n\n[Exemplo 1: Entrada -> Saída]\n[Exemplo 2: Entrada -> Saída]\n...\n[Sua Entrada] ->`
                }
            },
            'chain-of-thought': {
                title: 'Chain-of-Thought (CoT)',
                explanation: 'Pede-se ao modelo que "pense em voz alta" ou detalhe seu raciocínio passo a passo antes de dar a resposta final. Isso melhora drasticamente o desempenho em problemas lógicos, matemáticos e de várias etapas.',
                analogy: 'É como pedir a um matemático que não apenas dê o resultado de um problema, mas que mostre todo o desenvolvimento no quadro. Assim, é mais provável que ele chegue à solução correta.',
                example: {
                    prompt: `P: João tem 5 maçãs. Ele compra 2 caixas de maçãs com 6 maçãs cada. Quantas maçãs ele tem agora?\n\nR: João começou com 5 maçãs. Depois, comprou 2 caixas de 6 maçãs, o que dá 2 * 6 = 12 maçãs. Portanto, agora ele tem 5 + 12 = 17 maçãs. A resposta é 17.\n\nP: Maria tem 3 balões. Ela ganha o dobro do que tem e depois um estoura. Com quantos balões ela fica?\n\nR:`,
                    template: `P: [Pergunta Complexa 1]\nR: [Raciocínio passo a passo 1]... A resposta é [Resposta 1].\n\nP: [Sua Pergunta Complexa]\nR:`
                }
            },
            'reflection': {
                title: 'Prompting de Reflexão',
                explanation: 'Esta técnica envolve um processo de duas etapas: primeiro, uma resposta inicial é gerada. Em seguida, pede-se ao modelo que avalie, critique ou melhore essa primeira resposta, o que leva a um resultado final mais refinado e preciso.',
                analogy: 'É como escrever um rascunho de uma redação (primeira resposta) e depois entregá-lo a um editor (o próprio modelo em um segundo prompt) para que ele revise e sugira melhorias.',
                example: {
                    prompt: `[PASSO 1 - GERAÇÃO INICIAL]\n"Escreva um parágrafo curto sobre os benefícios da energia solar."\n\n[PASSO 2 - REFLEXÃO E MELHORIA]\n"Revise o parágrafo a seguir e melhore-o para que seja mais persuasivo e mencione dados específicos:\n\n[Parágrafo gerado no passo 1]"\n\nVersão melhorada:`,
                    template: `[Passo 1: Geração]\n[Prompt Inicial]\n\n[Passo 2: Reflexão]\n"Avalie a seguinte resposta [critério: coerência, precisão, etc.] e gere uma versão melhorada:\n\n[Resposta do Passo 1]"`
                }
            },
            'delimiters': {
                title: 'Uso de Delimitadores',
                explanation: 'Utilize delimitadores claros (como crases triplas ```, tags XML <tag>, ou hifens ---) para separar diferentes partes do seu prompt, como instruções, contexto e dados de entrada. Isso ajuda o modelo a não confundir as instruções com o texto que ele deve processar.',
                analogy: 'É como usar aspas para citar alguém em um texto. Você deixa claro quais palavras são suas e quais são a citação. Os delimitadores fazem o mesmo para o modelo.',
                example: {
                    prompt: `Resuma o texto que está entre as crases triplas em uma única frase.\n\n\`\`\`\n[Aqui iria um texto longo e detalhado sobre qualquer tema.]\n\`\`\`\n\nResumo:`,
                    template: `[Instrução]\n\n[Delimitador de Início]\n[Seu Texto/Contexto/Dado]\n[Delimitador de Fim]`
                }
            },
            'format-specification': {
                title: 'Especificação de Formato',
                explanation: 'Indique explicitamente o formato de saída desejado. Você pode pedir para ele gerar a resposta em JSON, Markdown, uma lista com marcadores, uma tabela, etc. Quanto mais específico você for, melhor será o resultado.',
                analogy: 'É como pedir uma pizza. Você não diz apenas "quero uma pizza", você especifica os ingredientes, o tamanho e se quer com a borda recheada de queijo. Você dá instruções claras para obter o que quer.',
                example: {
                    prompt: `Gere uma lista de três ideias para um nome de blog sobre culinária vegana. Formate a resposta como um objeto JSON com as chaves "nome" e "descricao".\n\nJSON:`,
                    template: `[Instrução]\n\nGere a resposta no seguinte formato:\n[Descrição do formato, ex: JSON, Markdown, Lista]`
                }
            },
            'prompt-reframing': {
                title: 'Reenquadramento de Prompt',
                explanation: 'Consiste em reformular ou mudar o foco da sua pergunta para guiar o modelo a uma resposta melhor. Às vezes, uma pequena mudança na perspectiva pode desbloquear resultados muito mais precisos ou criativos.',
                analogy: 'Se você perguntar a um GPS "Como evito o trânsito?", ele pode não te dar a melhor rota. Mas se você perguntar "Qual é a rota mais rápida para o meu destino agora?", ele otimizará a resposta com base nesse objetivo.',
                example: {
                    prompt: `[Prompt Original]\n"Escreva sobre por que cachorros são bons animais de estimação."\n\n[Prompt Reenquadrado (Melhor)]\n"Aja como um veterinário especialista. Redija um artigo para um blog familiar explicando os benefícios emocionais e de saúde de ter um cachorro como animal de estimação, citando exemplos concretos."`,
                    template: `[Prompt Vago/Inicial]\n"Fale-me sobre [Tópico X]"\n\n[Prompt Reenquadrado]\n"Aja como [Papel de Especialista]. Seu objetivo é [Objetivo Claro]. Escreva sobre [Tópico X] para uma audiência de [Público Específico]."`
                }
            },
            'adaptation-personalization': {
                title: 'Adaptação e Personalização',
                explanation: 'Atribuir ao modelo um "papel" ou "persona" específico (ex: "Aja como um pirata", "Você é um especialista em física quântica"). Isso ajusta o tom, o estilo e o nível de conhecimento da resposta para se adequar melhor às suas necessidades.',
                analogy: 'É a diferença entre pedir um conselho a um amigo e pedir a um advogado. O papel define a perspectiva e o tipo de resposta que você receberá.',
                example: {
                    prompt: `Aja como um guia turístico entusiasmado de Roma. Descreva o Coliseu em três frases curtas, transmitindo emoção e admiração.`,
                    template: `Aja como um [Papel/Persona].\n\n[Sua Pergunta ou Tarefa]`
                }
            },
            'context-expansion': {
                title: 'Expansão de Contexto',
                explanation: 'Forneça contexto relevante e suficiente dentro do prompt. Isso pode incluir informações de fundo, dados-chave ou definir termos ambíguos para garantir que o modelo tenha todas as informações necessárias para gerar uma resposta de alta qualidade.',
                analogy: 'É como contratar um designer. Você não diz apenas "faça um logotipo para mim". Você fornece informações sobre sua empresa, seu público-alvo, suas cores corporativas e exemplos que você gosta. Mais contexto = melhor resultado.',
                example: {
                    prompt: `Contexto: Estamos desenvolvendo um aplicativo de fitness para iniciantes. O tom deve ser motivador e simples.\n\nTarefa: Escreva 3 mensagens de notificação para lembrar o usuário de se exercitar hoje.\n\nMensagens:`,
                    template: `Contexto: [Informações de fundo relevantes]\n\nDefinições: [Se houver termos ambíguos]\n\nTarefa: [Sua Solicitação Específica]`
                }
            },
        }
    }
};

const STATIC_CONTENT = [
    { id: 'zero-shot', categoryKey: 'basic', DiagramComponent: ZeroShotDiagram },
    { id: 'one-shot', categoryKey: 'basic', DiagramComponent: OneShotDiagram },
    { id: 'few-shot', categoryKey: 'basic', DiagramComponent: FewShotDiagram },
    { id: 'chain-of-thought', categoryKey: 'advanced', DiagramComponent: CoTDiagram },
    { id: 'reflection', categoryKey: 'advanced', DiagramComponent: ReflectionDiagram },
    { id: 'delimiters', categoryKey: 'structure', DiagramComponent: DelimiterDiagram },
    { id: 'format-specification', categoryKey: 'structure', DiagramComponent: FormatDiagram },
    { id: 'prompt-reframing', categoryKey: 'optimization', DiagramComponent: ReframingDiagram },
    { id: 'adaptation-personalization', categoryKey: 'optimization', DiagramComponent: PersonalizationDiagram },
    { id: 'context-expansion', categoryKey: 'optimization', DiagramComponent: ContextExpansionDiagram },
];

export const getTranslatedContent = (lang: string) => {
    const langKey = lang as keyof typeof translations;
    const t = translations[langKey] || translations['es'];
    const contentT = t.content;
    const diagramLabels = t.diagrams;

    const guideContent: PromptTechnique[] = STATIC_CONTENT.map(item => {
        const translatedItem = contentT[item.id as keyof typeof contentT];
        const { DiagramComponent } = item;
        return {
            id: item.id,
            categoryKey: item.categoryKey,
            title: translatedItem.title,
            explanation: translatedItem.explanation,
            analogy: translatedItem.analogy,
            example: translatedItem.example,
            diagram: <DiagramComponent labels={diagramLabels} />,
        };
    });

    return {
        appTitle: t.appTitle,
        appDescription: t.appDescription,
        categories: t.categories,
        cardLabels: t.card,
        guideContent,
    };
};