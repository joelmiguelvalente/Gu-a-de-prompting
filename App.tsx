import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { ContentCard } from './components/ContentCard';
import { getTranslatedContent } from './constants';
import { MenuIcon, XIcon, ChevronDownIcon } from './components/icons/Icons';
import type { PromptTechnique } from './types';

type Theme = 'light' | 'dark';
type Language = 'es' | 'en' | 'it' | 'pt';

const LANGUAGES: { code: Language; name: string }[] = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'it', name: 'Italiano' },
    { code: 'pt', name: 'Português' },
];

const ThemeToggle: React.FC<{ theme: Theme; toggleTheme: () => void }> = ({ theme, toggleTheme }) => (
    <button onClick={toggleTheme} className="p-2 text-2xl rounded-full hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors" aria-label="Toggle theme">
        {theme === 'light' ? '🌙' : '☀️'}
    </button>
);

const LanguageSelector: React.FC<{
    setLanguage: (lang: Language) => void;
    direction?: 'up' | 'down';
}> = ({ setLanguage, direction = 'down' }) => {
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    const handleLanguageChange = (langCode: Language) => {
        setLanguage(langCode);
        setIsLangMenuOpen(false);
    };

    return (
        <div className="relative">
            <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-1 p-2 text-stone-600 dark:text-stone-300 rounded-full hover:bg-stone-100 dark:hover:bg-slate-700 transition-colors">
                <span className="text-2xl">🌐</span>
                <ChevronDownIcon className={`transition-transform duration-200 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {isLangMenuOpen && (
                <div className={`absolute right-0 w-36 bg-white dark:bg-slate-700 rounded-md shadow-lg py-1 z-50 border border-stone-200 dark:border-slate-600 ${direction === 'down' ? 'mt-2' : 'bottom-full mb-2'}`}>
                    {LANGUAGES.map(lang => (
                        <a href="#" key={lang.code} onClick={(e) => { e.preventDefault(); handleLanguageChange(lang.code); }} className="block px-4 py-2 text-sm text-stone-700 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-slate-600">
                            {lang.name}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

const App: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<string>('');
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
            const storedTheme = localStorage.getItem('theme');
            if (storedTheme === 'dark' || storedTheme === 'light') return storedTheme;
        }
        if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    });
    const [language, setLanguage] = useState<Language>(() => (localStorage.getItem('language') as Language) || 'es');

    const translatedContent = getTranslatedContent(language);
    const { guideContent, categories, appTitle, appDescription, cardLabels } = translatedContent;

    useEffect(() => {
        if (!activeSection && guideContent.length > 0) {
            setActiveSection(guideContent[0].id);
        }
    }, [guideContent, activeSection]);

    const sectionRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('language', language);
    }, [language]);
    
    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    };

    const handleScroll = useCallback(() => {
        const pageYOffset = window.scrollY;
        let newActiveSection = activeSection;

        sectionRefs.current.forEach((ref, index) => {
            if (ref) {
                const sectionTop = ref.offsetTop - 120;
                const sectionHeight = ref.offsetHeight;
                if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                    newActiveSection = guideContent[index].id;
                }
            }
        });

        if (newActiveSection !== activeSection) {
            setActiveSection(newActiveSection);
        }
    }, [activeSection, guideContent]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <div className="relative min-h-screen md:flex">
            <div className="md:hidden sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg z-20 flex justify-between items-center p-4 border-b border-stone-200 dark:border-slate-700">
                <h1 className="text-xl font-bold text-teal-700 dark:text-teal-400">{appTitle.split(' ')[0]}</h1>
                <div className="flex items-center gap-2">
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                    <LanguageSelector setLanguage={setLanguage} direction="down" />
                    <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-stone-600 hover:text-teal-600 dark:text-stone-300 dark:hover:text-teal-400">
                        {isSidebarOpen ? <XIcon /> : <MenuIcon />}
                    </button>
                </div>
            </div>

            <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                activeSection={activeSection}
                categories={categories}
                techniques={guideContent}
                appTitle={appTitle}
            >
                <div className="hidden md:flex justify-between items-center gap-2 p-2 border-t border-stone-200 dark:border-slate-700">
                    <LanguageSelector setLanguage={setLanguage} direction="up" />
                    <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
                </div>
            </Sidebar>

            <main className="flex-1 p-4 sm:p-6 md:p-10 lg:p-12 md:ml-64 lg:ml-72 min-w-0">
                 <header className="mb-12 hidden md:block">
                    <h1 className="text-5xl font-extrabold text-stone-800 dark:text-white tracking-tight break-words">{appTitle}</h1>
                    <p className="mt-4 text-lg text-stone-500 dark:text-stone-400 max-w-3xl">{appDescription}</p>
                </header>
                <div className="space-y-16">
                    {guideContent.map((technique: PromptTechnique, index: number) => (
                        <div key={technique.id} id={technique.id} ref={el => { sectionRefs.current[index] = el; }}>
                            <ContentCard technique={technique} labels={cardLabels} />
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default App;