import React from 'react';
import { ArrowRightIcon } from '../icons/Icons';

const DiagramBox: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`text-center py-2 px-4 rounded-md border border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-700 shadow-sm text-sm text-stone-700 dark:text-stone-200 ${className}`}>
        {children}
    </div>
);

const DiagramContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="flex items-center justify-center flex-wrap gap-2">{children}</div>
);

const HighlightBox: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <DiagramBox className={`bg-teal-50 dark:bg-teal-900/40 border-teal-300 dark:border-teal-700 text-teal-800 dark:text-teal-200 font-semibold ${className}`}>
        {children}
    </DiagramBox>
);

const AccentBox: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <DiagramBox className={`bg-amber-50 dark:bg-amber-900/40 border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-200 ${className}`}>
        {children}
    </DiagramBox>
);

export const ZeroShotDiagram: React.FC = () => (
    <DiagramContainer>
        <DiagramBox>Pregunta</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>Modelo IA</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox>Respuesta</HighlightBox>
    </DiagramContainer>
);

export const OneShotDiagram: React.FC = () => (
    <DiagramContainer>
        <DiagramBox>Ejemplo Único</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>Pregunta</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>Modelo IA</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox>Respuesta Guiada</HighlightBox>
    </DiagramContainer>
);

export const FewShotDiagram: React.FC = () => (
    <DiagramContainer>
        <DiagramBox>Ejemplo 1</DiagramBox>
        <DiagramBox>Ejemplo 2</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>Pregunta</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>Modelo IA</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox>Respuesta con Patrón</HighlightBox>
    </DiagramContainer>
);

export const CoTDiagram: React.FC = () => (
     <DiagramContainer>
        <DiagramBox>Pregunta Compleja</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>Modelo IA</DiagramBox>
        <ArrowRightIcon />
        <AccentBox>"Piensa paso a paso..."</AccentBox>
        <ArrowRightIcon />
        <HighlightBox>Respuesta Final</HighlightBox>
    </DiagramContainer>
);

export const ReflectionDiagram: React.FC = () => (
    <DiagramContainer>
        <DiagramBox>Prompt Inicial</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>Modelo IA</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox className="bg-stone-200 dark:bg-slate-600">Borrador</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>Prompt de Crítica</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>Modelo IA</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox>Respuesta Refinada</HighlightBox>
    </DiagramContainer>
);

export const DelimiterDiagram: React.FC = () => (
    <DiagramContainer>
        <DiagramBox>Instrucción</DiagramBox>
        <div className="font-mono text-teal-600 dark:text-teal-400">+</div>
        <HighlightBox className="font-mono">```</HighlightBox>
        <div className="font-mono text-teal-600 dark:text-teal-400">+</div>
        <DiagramBox>Contexto</DiagramBox>
        <div className="font-mono text-teal-600 dark:text-teal-400">+</div>
        <HighlightBox className="font-mono">```</HighlightBox>
        <ArrowRightIcon />
        <DiagramBox>Modelo IA</DiagramBox>
    </DiagramContainer>
);

export const FormatDiagram: React.FC = () => (
    <DiagramContainer>
        <DiagramBox>Tarea</DiagramBox>
        <div className="font-mono text-teal-600 dark:text-teal-400">+</div>
        <AccentBox>"Formatea como JSON"</AccentBox>
        <ArrowRightIcon />
        <DiagramBox>Modelo IA</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox className="font-mono">{"{ ... }"}</HighlightBox>
    </DiagramContainer>
);

export const ReframingDiagram: React.FC = () => (
    <DiagramContainer>
        <DiagramBox className="line-through text-stone-400 dark:text-slate-500">Pregunta Vaga</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>Pregunta Específica</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>Modelo IA</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox>Mejor Respuesta</HighlightBox>
    </DiagramContainer>
);

export const PersonalizationDiagram: React.FC = () => (
    <DiagramContainer>
        <AccentBox>"Actúa como [Rol]"</AccentBox>
        <div className="font-mono text-teal-600 dark:text-teal-400">+</div>
        <DiagramBox>Pregunta</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>Modelo IA</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox>Respuesta con Tono</HighlightBox>
    </DiagramContainer>
);

export const ContextExpansionDiagram: React.FC = () => (
     <DiagramContainer>
        <DiagramBox>Contexto Detallado</DiagramBox>
        <div className="font-mono text-teal-600 dark:text-teal-400">+</div>
        <DiagramBox>Tarea Específica</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>Modelo IA</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox>Respuesta Precisa</HighlightBox>
    </DiagramContainer>
);