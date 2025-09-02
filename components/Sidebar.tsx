import React from 'react';
import type { PromptTechnique } from '../types';

interface SidebarProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    activeSection: string;
    categories: Record<string, string>;
    techniques: PromptTechnique[];
    appTitle: string;
    children?: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen, activeSection, categories, techniques, appTitle, children }) => {
    
    const groupedTechniques = techniques.reduce((acc, technique) => {
        const { categoryKey } = technique;
        if (!acc[categoryKey]) {
            acc[categoryKey] = [];
        }
        acc[categoryKey].push(technique);
        return acc;
    }, {} as Record<string, PromptTechnique[]>);
    
    const handleLinkClick = () => {
        if (window.innerWidth < 768) { // md breakpoint
            setIsOpen(false);
        }
    };

    const navContent = (
        <nav className="mt-4 md:mt-8 flex-1 overflow-y-auto">
            {Object.entries(groupedTechniques).map(([categoryKey, techniquesInCategory]) => (
                <div key={categoryKey} className="mb-6">
                    <h3 className="px-4 mb-2 text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                        {categories[categoryKey]}
                    </h3>
                    <ul>
                        {techniquesInCategory.map((technique) => (
                            <li key={technique.id}>
                                <a
                                    href={`#${technique.id}`}
                                    onClick={handleLinkClick}
                                    className={`
                                        flex items-center px-4 py-2 text-sm font-medium transition-colors duration-150
                                        ${
                                            activeSection === technique.id
                                                ? 'text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-slate-700/50 border-r-4 border-teal-600 dark:border-teal-400'
                                                : 'text-stone-600 dark:text-stone-300 hover:text-teal-600 dark:hover:text-teal-400 hover:bg-stone-100 dark:hover:bg-slate-700'
                                        }
                                    `}
                                >
                                    {technique.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <aside
                className={`
                    fixed top-0 left-0 h-full bg-white dark:bg-slate-800 border-r border-stone-200 dark:border-slate-700 z-40 transition-transform duration-300 ease-in-out
                    w-64 lg:w-72 flex flex-col
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 
                `}
            >
                 <div className="px-4 pt-6 pb-2 hidden md:block border-b border-stone-200 dark:border-slate-700">
                     <h2 className="text-2xl font-bold text-teal-700 dark:text-teal-400">{appTitle}</h2>
                 </div>
                {navContent}
                {children}
            </aside>
        </>
    );
};