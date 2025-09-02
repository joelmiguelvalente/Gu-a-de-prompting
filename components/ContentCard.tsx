import React, { useState } from 'react';
import type { PromptTechnique } from '../types';
import { CopyIcon, CheckIcon } from './icons/Icons';

interface ContentCardProps {
    technique: PromptTechnique;
    labels: {
        whatIsIt: string;
        analogy: string;
        diagram: string;
        example: string;
        promptExample: string;
        template: string;
        copy: string;
        copied: string;
    };
}

export const ContentCard: React.FC<ContentCardProps> = ({ technique, labels }) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(technique.example.template).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        });
    };

    return (
        <article className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg dark:shadow-2xl dark:shadow-slate-900/50 border border-stone-200/80 dark:border-slate-700/80 transition-shadow hover:shadow-xl">
            <h2 className="text-3xl font-bold text-stone-800 dark:text-white break-words">{technique.title}</h2>
            
            <div className="mt-6 space-y-8">
                <div>
                    <h3 className="font-semibold text-lg text-teal-700 dark:text-teal-400 mb-2">{labels.whatIsIt}</h3>
                    <p className="text-stone-600 dark:text-stone-300 leading-relaxed break-words">{technique.explanation}</p>
                </div>
                
                <div>
                    <h3 className="font-semibold text-lg text-teal-700 dark:text-teal-400 mb-2">{labels.analogy}</h3>
                    <div className="flex items-start gap-3 bg-stone-50 dark:bg-slate-700/50 p-4 rounded-lg border border-stone-200 dark:border-slate-600">
                        <span className="text-2xl mt-1">💡</span>
                        <p className="text-stone-600 dark:text-stone-300 italic break-words">"{technique.analogy}"</p>
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-lg text-teal-700 dark:text-teal-400 mb-2">{labels.diagram}</h3>
                    <div className="p-4 bg-stone-50 dark:bg-slate-700/50 rounded-lg border border-stone-200 dark:border-slate-600">
                        {technique.diagram}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-lg text-teal-700 dark:text-teal-400 mb-2">{labels.example}</h3>
                    <div className="bg-slate-800 dark:bg-slate-900 rounded-lg overflow-hidden border border-stone-200/10">
                        <div className="px-4 py-2 bg-stone-700 dark:bg-slate-700 text-stone-300 text-sm font-mono flex justify-between items-center">
                            <span>{labels.promptExample}</span>
                        </div>
                        <pre className="p-4 text-sm text-white overflow-x-auto">
                            <code>{technique.example.prompt}</code>
                        </pre>
                        <div className="px-4 py-2 bg-stone-700 dark:bg-slate-700 text-stone-300 text-sm font-mono flex justify-between items-center">
                            <span>{labels.template}</span>
                             <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 text-xs px-2 py-1 bg-stone-600 dark:bg-slate-600 hover:bg-stone-500 dark:hover:bg-slate-500 rounded transition-colors"
                            >
                                {isCopied ? <><CheckIcon /> {labels.copied}</> : <><CopyIcon /> {labels.copy}</>}
                            </button>
                        </div>
                         <pre className="p-4 text-sm text-teal-300 dark:text-teal-400 bg-stone-900 dark:bg-black/50 overflow-x-auto">
                            <code>{technique.example.template}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </article>
    );
};