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
                diagram: <FewShotDiagram />,
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
            // ... (partial translation for brevity)
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
            // ... (partial translation for brevity)
        }
    }
};

const STATIC_CONTENT = [
    { id: 'zero-shot', categoryKey: 'basic', diagram: <ZeroShotDiagram /> },
    { id: 'one-shot', categoryKey: 'basic', diagram: <OneShotDiagram /> },
    { id: 'few-shot', categoryKey: 'basic', diagram: <FewShotDiagram /> },
    { id: 'chain-of-thought', categoryKey: 'advanced', diagram: <CoTDiagram /> },
    { id: 'reflection', categoryKey: 'advanced', diagram: <ReflectionDiagram /> },
    { id: 'delimiters', categoryKey: 'structure', diagram: <DelimiterDiagram /> },
    { id: 'format-specification', categoryKey: 'structure', diagram: <FormatDiagram /> },
    { id: 'prompt-reframing', categoryKey: 'optimization', diagram: <ReframingDiagram /> },
    { id: 'adaptation-personalization', categoryKey: 'optimization', diagram: <PersonalizationDiagram /> },
    { id: 'context-expansion', categoryKey: 'optimization', diagram: <ContextExpansionDiagram /> },
];

export const getTranslatedContent = (lang: string) => {
    const langKey = lang as keyof typeof translations;
    const t = { ...translations['es'], ...translations[langKey] }; // Fallback to Spanish
    const contentT = { ...translations['es'].content, ...translations[langKey]?.content };

    const guideContent: PromptTechnique[] = STATIC_CONTENT.map(item => {
        const translatedItem = contentT[item.id as keyof typeof contentT];
        return {
            ...item,
            title: translatedItem.title,
            explanation: translatedItem.explanation,
            analogy: translatedItem.analogy,
            example: translatedItem.example,
        };
    });

    return {
        appTitle: t.appTitle,
        appDescription: t.appDescription,
        categories: t.categories,
        guideContent,
    };
};