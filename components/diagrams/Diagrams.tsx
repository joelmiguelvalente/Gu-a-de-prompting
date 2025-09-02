import React from 'react';
import { ArrowRightIcon } from '../icons/Icons';

interface DiagramLabels {
    [key: string]: string;
}

interface DiagramProps {
    labels: DiagramLabels;
}

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

export const ZeroShotDiagram: React.FC<DiagramProps> = ({ labels }) => (
    <DiagramContainer>
        <DiagramBox>{labels.question}</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>{labels.aiModel}</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox>{labels.answer}</HighlightBox>
    </DiagramContainer>
);

export const OneShotDiagram: React.FC<DiagramProps> = ({ labels }) => (
    <DiagramContainer>
        <DiagramBox>{labels.singleExample}</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>{labels.question}</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>{labels.aiModel}</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox>{labels.guidedAnswer}</HighlightBox>
    </DiagramContainer>
);

export const FewShotDiagram: React.FC<DiagramProps> = ({ labels }) => (
    <DiagramContainer>
        <DiagramBox>{labels.example1}</DiagramBox>
        <DiagramBox>{labels.example2}</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>{labels.question}</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>{labels.aiModel}</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox>{labels.patternAnswer}</HighlightBox>
    </DiagramContainer>
);

export const CoTDiagram: React.FC<DiagramProps> = ({ labels }) => (
     <DiagramContainer>
        <DiagramBox>{labels.complexQuestion}</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>{labels.aiModel}</DiagramBox>
        <ArrowRightIcon />
        <AccentBox>{labels.stepByStep}</AccentBox>
        <ArrowRightIcon />
        <HighlightBox>{labels.finalAnswer}</HighlightBox>
    </DiagramContainer>
);

export const ReflectionDiagram: React.FC<DiagramProps> = ({ labels }) => (
    <DiagramContainer>
        <DiagramBox>{labels.initialPrompt}</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>{labels.aiModel}</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox className="bg-stone-200 dark:bg-slate-600">{labels.draft}</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>{labels.critiquePrompt}</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>{labels.aiModel}</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox>{labels.refinedAnswer}</HighlightBox>
    </DiagramContainer>
);

export const DelimiterDiagram: React.FC<DiagramProps> = ({ labels }) => (
    <DiagramContainer>
        <DiagramBox>{labels.instruction}</DiagramBox>
        <div className="font-mono text-teal-600 dark:text-teal-400">+</div>
        <HighlightBox className="font-mono">```</HighlightBox>
        <div className="font-mono text-teal-600 dark:text-teal-400">+</div>
        <DiagramBox>{labels.context}</DiagramBox>
        <div className="font-mono text-teal-600 dark:text-teal-400">+</div>
        <HighlightBox className="font-mono">```</HighlightBox>
        <ArrowRightIcon />
        <DiagramBox>{labels.aiModel}</DiagramBox>
    </DiagramContainer>
);

export const FormatDiagram: React.FC<DiagramProps> = ({ labels }) => (
    <DiagramContainer>
        <DiagramBox>{labels.task}</DiagramBox>
        <div className="font-mono text-teal-600 dark:text-teal-400">+</div>
        <AccentBox>{labels.formatAsJson}</AccentBox>
        <ArrowRightIcon />
        <DiagramBox>{labels.aiModel}</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox className="font-mono">{"{ ... }"}</HighlightBox>
    </DiagramContainer>
);

export const ReframingDiagram: React.FC<DiagramProps> = ({ labels }) => (
    <DiagramContainer>
        <DiagramBox className="line-through text-stone-400 dark:text-slate-500">{labels.vagueQuestion}</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>{labels.specificQuestion}</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>{labels.aiModel}</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox>{labels.betterAnswer}</HighlightBox>
    </DiagramContainer>
);

export const PersonalizationDiagram: React.FC<DiagramProps> = ({ labels }) => (
    <DiagramContainer>
        <AccentBox>{labels.actAsRole}</AccentBox>
        <div className="font-mono text-teal-600 dark:text-teal-400">+</div>
        <DiagramBox>{labels.question}</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>{labels.aiModel}</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox>{labels.tonedAnswer}</HighlightBox>
    </DiagramContainer>
);

export const ContextExpansionDiagram: React.FC<DiagramProps> = ({ labels }) => (
     <DiagramContainer>
        <DiagramBox>{labels.detailedContext}</DiagramBox>
        <div className="font-mono text-teal-600 dark:text-teal-400">+</div>
        <DiagramBox>{labels.specificTask}</DiagramBox>
        <ArrowRightIcon />
        <DiagramBox>{labels.aiModel}</DiagramBox>
        <ArrowRightIcon />
        <HighlightBox>{labels.preciseAnswer}</HighlightBox>
    </DiagramContainer>
);