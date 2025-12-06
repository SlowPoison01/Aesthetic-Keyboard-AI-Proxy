import React, { useState, useCallback, useEffect, useRef } from 'react';
// ORIGINAL IMPORTS:
// import { Keyboard } from './components/Keyboard';          <-- Replaced with local component/placeholder
// import { useAutoTyper } from './hooks/useAutoTyper';      <-- Replaced with local hook
// import { readTextFile } from './utils/fileUtils';         <-- Replaced with local function
// import type { Settings, Theme } from './types';           <-- Replaced with local types
// import { AutoTypeStatus } from './types';                 <-- Replaced with local enum
// import { Particles } from './components/Particles';       <-- Replaced with local component/placeholder
// import { FONT_STYLES, THEMES } from './constants';        <-- Replaced with local constants
// import { ThemeSwitcher } from './components/ThemeSwitcher'; <-- Replaced with local component/placeholder
// import { AIAssistantModal } from './components/AIAssistantModal'; <-- Replaced with local component/placeholder
// import { TranslatorModal } from './components/TranslatorModal'; <-- Replaced with local component/placeholder
// import { GoogleGenAI } from "@google/genai";              <-- Removed (error-prone external dependency)

// --- Local Types and Enums (types.ts se) ---
export interface Settings {
    messageDelayMs: number; // Sandesh (message) mein deri (delay)
}

export enum AutoTypeStatus {
    IDLE = 'idle',      // Shuruwaati avastha (Initial state)
    TYPING = 'typing',  // Type ho raha hai (Currently typing)
    WAITING = 'waiting',// Agle sandesh ka intezaar (Waiting for next message)
    FINISHED = 'finished',// Kaam poora hua (Finished task)
}

export interface Theme {
    name: string;
    cssVars: {
        '--bg-main': string;
        '--bg-textarea': string;
        '--text-primary': string;
        '--text-secondary': string;
        '--header-bg': string;
        '--header-text': string;
        '--keyboard-bg': string;
        '--key-primary-bg': string;
        '--key-primary-text': string;
        '--key-secondary-bg': string;
        '--key-secondary-text': string;
        '--key-special-bg': string;
        '--key-special-text': string;
        '--font-btn-bg': string;
        '--font-btn-active-bg': string;
        '--font-btn-text': string;
        '--watermark-text': string;
    };
}

// --- Local Constants (constants.ts se) ---
export interface FontStyle {
    name: string;
    family: string;
}

const FONT_STYLES: FontStyle[] = [
    { name: 'Default Sans', family: 'sans-serif' },
    // Kuch common aur safe fonts
    { name: 'Elegant Script', family: "'Dancing Script', cursive" },
    { name: 'Bold Serif', family: "'Merriweather', serif" },
    { name: 'Typewriter', family: "'Special Elite', system-ui" },
    { name: 'Pixel Type', family: "'Pixelify Sans', sans-serif" },
];

const DEFAULT_THEME_VARS = {
    '--bg-main': '#f0f0f0',
    '--bg-textarea': '#ffffff',
    '--text-primary': '#1f2937',
    '--text-secondary': '#4b5563',
    '--header-bg': '#e5e7eb',
    '--header-text': '#4f46e5',
    '--keyboard-bg': '#d1d5db',
    '--key-primary-bg': '#ffffff',
    '--key-primary-text': '#000000',
    '--key-secondary-bg': '#a5f3fc',
    '--key-secondary-text': '#000000',
    '--key-special-bg': '#7f1d1d',
    '--key-special-text': '#ffffff',
    '--font-btn-bg': '#4b5563',
    '--font-btn-active-bg': '#8b5cf6',
    '--font-btn-text': '#ffffff',
    '--watermark-text': 'rgba(44, 62, 80, 0.2)',
};

const THEMES: Theme[] = [
    { name: 'Light', cssVars: DEFAULT_THEME_VARS },
    { name: 'Dark', cssVars: { ...DEFAULT_THEME_VARS, '--bg-main': '#1f2937', '--bg-textarea': '#374151', '--text-primary': '#f3f4f6', '--header-bg': '#4b5563', '--key-primary-bg': '#4b5563', '--key-primary-text': '#f3f4f6' } },
];

const DEFAULT_SETTINGS: Settings = { messageDelayMs: 100 };

// --- Local Utility Functions (fileUtils.ts se) ---

/**
 * File se text content padhta hai aur usse line array mein badalta hai.
 * Reads text content from a file and converts it into an array of lines.
 */
const readTextFile = (file: File): Promise<string[]> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
            const textContent = e.target?.result as string;
            // Newline se split karna aur khaali lines ko hata dena
            const lines = textContent.split('\n').filter(line => line.trim() !== '');
            resolve(lines);
        };

        reader.onerror = (e) => {
            console.error("File padhne mein galti:", e); // File reading error
            reject(new Error("File padhne mein asafal (File reading failed)."));
        };

        reader.readAsText(file);
    });
};

// --- Local Custom Hooks (useAutoTyper.ts se) ---

/**
 * Auto-typing logic ko handle karta hai.
 * Handles the auto-typing logic.
 */
const useAutoTyper = ({ content, settings, onFinish }: { content: string[], settings: Settings, onFinish: () => void }) => {
    const [isTyping, setIsTyping] = useState(false);
    const [autoTypeStatus, setAutoTypeStatus] = useState(AutoTypeStatus.IDLE);
    const [autoTypeText, setAutoTypeText] = useState('');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const startAutoType = useCallback(() => {
        if (content.length === 0) {
            setAutoTypeStatus(AutoTypeStatus.FINISHED);
            onFinish();
            return;
        }

        // Pichle interval ko saaf karein agar koi ho
        if (intervalRef.current) clearInterval(intervalRef.current);

        setAutoTypeStatus(AutoTypeStatus.TYPING);
        setIsTyping(true);
        setAutoTypeText('');
        let fullText = content.join('\n');
        let index = 0;

        const typingInterval = setInterval(() => {
            if (index < fullText.length) {
                setAutoTypeText((prev) => prev + fullText[index]);
                index++;
            } else {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setAutoTypeStatus(AutoTypeStatus.FINISHED);
                setIsTyping(false);
                onFinish();
            }
        }, settings.messageDelayMs / 5); // Typing speed simulation

        intervalRef.current = typingInterval;

    }, [content, settings, onFinish]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);


    return { isTyping, autoTypeStatus, startAutoType, autoTypeText };
};

// --- Local Components (components/ se) ---

// Placeholder for Particles component
const Particles: React.FC<any> = () => (
    <div
        style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 10,
            opacity: 0.1,
            backgroundImage: 'radial-gradient(var(--text-primary), rgba(255,255,255,0) 70%)',
            animation: 'sparkle 10s infinite alternate',
        }}
    >
        <style>{`
            @keyframes sparkle {
                0% { transform: scale(1); opacity: 0.1; }
                50% { transform: scale(1.05); opacity: 0.2; }
                100% { transform: scale(1); opacity: 0.1; }
            }
        `}</style>
    </div>
);

// Placeholder for ThemeSwitcher component
interface ThemeSwitcherProps {
    currentTheme: Theme;
    onThemeChange: (theme: Theme) => void;
    onClose: () => void;
}
const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentTheme, onThemeChange, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Theme Chuno (Select Theme)</h2>
            <div className="space-y-3">
                {THEMES.map((theme) => (
                    <button
                        key={theme.name}
                        onClick={() => { onThemeChange(theme); }}
                        className={`w-full p-3 rounded-lg text-white font-medium transition duration-200 ${currentTheme.name === theme.name ? 'bg-indigo-600 ring-2 ring-indigo-300' : 'bg-gray-500 hover:bg-gray-600'}`}
                        style={{ 
                            backgroundColor: theme.cssVars['--key-special-bg'], 
                            color: theme.cssVars['--key-special-text'],
                            border: '1px solid var(--key-primary-bg)'
                        }}
                    >
                        {theme.name}
                    </button>
                ))}
            </div>
            <button onClick={onClose} className="mt-6 w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Band Karein (Close)</button>
        </div>
    </div>
);

// Placeholder for AIAssistantModal
interface AIAssistantModalProps {
    onClose: () => void;
}
const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">AI Sahayak (AI Assistant)</h2>
            <p className="text-gray-600 mb-4">Yah ek AI Assistant placeholder hai. Asli application mein, yah Gemini API ka upyog karega. (This is an AI Assistant placeholder. In a real application, it would use the Gemini API.)</p>
            <button onClick={onClose} className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Band Karein (Close)</button>
        </div>
    </div>
);

// Placeholder for TranslatorModal
interface TranslatorModalProps {
    onTranslate: (text: string) => void;
    onClose: () => void;
}
const TranslatorModal: React.FC<TranslatorModalProps> = ({ onTranslate, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Anuvadak (Translator)</h2>
            <p className="text-gray-600 mb-4">Yah ek Translator placeholder hai. (This is a Translator placeholder.)</p>
            <button onClick={() => { onTranslate('Translated Text Placeholder'); onClose(); }} className="mr-2 py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">Anuvad Karein (Translate)</button>
            <button onClick={onClose} className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Band Karein (Close)</button>
        </div>
    </div>
);

// Placeholder for Keyboard component
interface KeyboardProps {
    onKeyPress: (key: string) => void;
    isTyping: boolean;
    isRecording: boolean;
    onFontChange: (family: string) => void;
    activeFontFamily: string;
}
const Keyboard: React.FC<KeyboardProps> = ({ onKeyPress, isTyping, onFontChange, activeFontFamily }) => {
    // Keyboard buttons ka simple representation
    const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'SPACE', 'ENTER', 'BACKSPACE'];

    return (
        <div className="p-4 bg-[var(--keyboard-bg)] rounded-xl shadow-inner">
            <div className="flex flex-wrap justify-center gap-2 mb-4">
                {keys.map(key => (
                    <button
                        key={key}
                        onClick={() => onKeyPress(key.length > 1 ? key : key.toLowerCase())}
                        className="p-3 text-lg font-bold rounded-lg shadow-md transition duration-150 active:scale-95 disabled:opacity-50"
                        style={{
                            backgroundColor: key.length > 1 ? 'var(--key-special-bg)' : 'var(--key-primary-bg)',
                            color: key.length > 1 ? 'var(--key-special-text)' : 'var(--key-primary-text)',
                            pointerEvents: isTyping ? 'none' : 'auto',
                            minWidth: key === 'SPACE' ? '40%' : '50px' // Spacebar ko bada rakha
                        }}
                        disabled={isTyping}
                    >
                        {key === 'SPACE' ? 'Space' : key === 'ENTER' ? 'Enter' : key === 'BACKSPACE' ? 'Back' : key}
                    </button>
                ))}
            </div>
            {/* Font Selector */}
            <div className="flex flex-wrap justify-center gap-2 pt-2 border-t border-gray-400">
                {FONT_STYLES.map((font) => (
                    <button
                        key={font.name}
                        onClick={() => onFontChange(font.family)}
                        className={`text-sm py-1 px-3 rounded-full font-medium transition-all duration-300 ${activeFontFamily === font.family ? 'ring-2 ring-offset-2 ring-[var(--font-btn-active-bg)]' : 'hover:opacity-80'}`}
                        style={{
                            fontFamily: font.family,
                            backgroundColor: 'var(--font-btn-bg)',
                            color: 'var(--font-btn-text)',
                        }}
                        title={font.name} // Tooltip mein font ka naam dikhayein
                    >
                        Aa
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- Main App Component ---
const App: React.FC = () => {
    const [text, setText] = useState<string>('');
    const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);
    const [autoTypeContent, setAutoTypeContent] = useState<string[]>([]); // Woh content jo file se load hoga
    const [activeFontFamily, setActiveFontFamily] = useState<string>(FONT_STYLES[0].family);
    const [activeTheme, setActiveTheme] = useState<Theme>(THEMES[0]);
    const [showAnimation, setShowAnimation] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false); // Recording state placeholder

    // Modal states
    const [showThemeSwitcher, setShowThemeSwitcher] = useState<boolean>(false);
    const [showAIAssistant, setShowAIAssistant] = useState<boolean>(false);
    const [showTranslator, setShowTranslator] = useState<boolean>(false);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // useAutoTyper Hook ka upyog
    const { isTyping, autoTypeStatus, startAutoType, autoTypeText } = useAutoTyper({
        content: autoTypeContent,
        settings: settings,
        onFinish: () => {
            console.log("Auto-typing poora hua (Auto-typing finished).");
            setShowAnimation(true);
            setTimeout(() => setShowAnimation(false), 2000); // 2 second ke liye Animation dikhayein
        }
    });

    // Auto-typed content ko text area mein update karna
    useEffect(() => {
        if (autoTypeStatus === AutoTypeStatus.TYPING) {
            setText(autoTypeText);
            // Text area ko scroll down karein
            if (textAreaRef.current) {
                textAreaRef.current.scrollTop = textAreaRef.current.scrollHeight;
            }
        }
    }, [autoTypeText, autoTypeStatus]);


    // Theme CSS variables ko apply karna (index.html mein variables hone chahiye)
    useEffect(() => {
        const root = document.documentElement;
        Object.entries(activeTheme.cssVars).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
    }, [activeTheme]);

    // Handlers
    const handleFileChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            try {
                const content = await readTextFile(file);
                setAutoTypeContent(content);
                setText(''); // Purana text saaf karein
                // Agar pehle se typing poora ho chuka hai, to status reset karein
                // Note: useAutoTyper ko use karke status reset karna behtar hoga
                console.log(`File load hua: ${content.length} lines`);
            } catch (error) {
                console.error("File load error:", error);
            }
        }
    }, []);

    const handleStartAutoType = useCallback(() => {
        if (autoTypeContent.length > 0 && autoTypeStatus !== AutoTypeStatus.TYPING) {
            startAutoType();
        } else {
            console.warn('Pehle ek text file chunein ya typing khatm hone ka intezaar karein.');
        }
    }, [autoTypeContent.length, startAutoType, autoTypeStatus]);

    const handleStopAutoType = useCallback(() => {
        // useAutoTyper hook mein stop logic add karna chahiye
        console.warn('Auto-typing rokne ki suvidha abhi hook mein implement nahi hai.');
        // Temporary: Page reload ya state reset karke roka ja sakta hai, lekin yeh accha tareeka nahi hai
    }, []);

    const handleKeyPress = useCallback((key: string) => {
        if (isTyping) return; // Agar auto-typing chal raha hai, to manual input ignore karein

        if (key === 'BACKSPACE') {
            setText(prev => prev.slice(0, -1));
        } else if (key === 'ENTER') {
            setText(prev => prev + '\n');
        } else if (key === 'SPACE') {
            setText(prev => prev + ' ');
        } else if (key.length === 1) { // Single character keys
            setText(prev => prev + key);
        }
    }, [isTyping]);

    const handleFontChange = useCallback((family: string) => {
        setActiveFontFamily(family);
    }, []);

    const handleThemeChange = useCallback((theme: Theme) => {
        setActiveTheme(theme);
        // Theme switcher modal band karne ke liye hook ka upyog karein
        setShowThemeSwitcher(false); 
    }, []);

    const handleTranslate = useCallback((translatedText: string) => {
        setText(translatedText);
    }, []);

    const getStatusMessage = () => {
        switch (autoTypeStatus) {
            case AutoTypeStatus.IDLE:
                return autoTypeContent.length > 0 ? `File loaded: ${autoTypeContent.length} lines. Press START.` : 'Shuru karne ke liye File Chunein (Select File to Start)';
            case AutoTypeStatus.TYPING:
                return 'Auto-typing Jaari Hai... (Auto-typing in Progress...)';
            case AutoTypeStatus.WAITING:
                return 'Agla Sandesh Chahiye (Waiting for Next Message)';
            case AutoTypeStatus.FINISHED:
                return 'Auto-typing Poora Hua! (Auto-typing Finished!)';
            default:
                return 'Tayyar (Ready)';
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden transition-colors duration-500" style={{ backgroundColor: 'var(--bg-main)' }}>
            
            {showAnimation && <Particles />}

            {showThemeSwitcher && <ThemeSwitcher currentTheme={activeTheme} onThemeChange={handleThemeChange} onClose={() => setShowThemeSwitcher(false)} />}
            {showAIAssistant && <AIAssistantModal onClose={() => setShowAIAssistant(false)} />}
            {showTranslator && <TranslatorModal onTranslate={handleTranslate} onClose={() => setShowTranslator(false)} />}

            <header className="flex-shrink-0 p-2 sm:p-4 flex justify-between items-center bg-[var(--header-bg)] border-b border-gray-300">
                <h1 className="text-lg sm:text-2xl font-bold text-[var(--header-text)]">AutoType & Aesthetic Keyboard</h1>
                <div className="flex gap-2">
                    {/* Theme Switcher Button */}
                    <button 
                        onClick={() => setShowThemeSwitcher(true)}
                        className="p-2 rounded-full bg-gray-500 text-white hover:bg-gray-600 transition shadow-md active:scale-95"
                        title="Theme Badlein (Change Theme)"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M16 7.5l-1.5 1.5-1.5-1.5m4-3l-1.5 1.5-1.5-1.5"></path></svg>
                    </button>
                    {/* AI Assistant Button */}
                    <button 
                        onClick={() => setShowAIAssistant(true)}
                        className="p-2 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 transition shadow-md active:scale-95"
                        title="AI Sahayak (AI Assistant)"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2m-6 0h.01"></path></svg>
                    </button>
                    {/* Translator Button */}
                    <button 
                        onClick={() => setShowTranslator(true)}
                        className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600 transition shadow-md active:scale-95"
                        title="Anuvadak (Translator)"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.033 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.033-3-9s1.343-9 3-9m-9 9h.01"></path></svg>
                    </button>
                    {/* File Upload Hidden Input */}
                    <input 
                        type="file" 
                        id="file-upload" 
                        onChange={handleFileChange} 
                        className="hidden" 
                        accept=".txt" 
                    />
                    {/* File Upload Button */}
                    <button 
                        onClick={() => document.getElementById('file-upload')?.click()}
                        className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition shadow-md active:scale-95"
                        title="File Chunein (Select File)"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                    </button>
                    {/* Auto-type Start/Stop Button */}
                    <button 
                        onClick={isTyping ? handleStopAutoType : handleStartAutoType}
                        className={`p-2 rounded-full text-white transition shadow-md active:scale-95 disabled:opacity-50 ${isTyping ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-600 hover:bg-purple-700'}`}
                        title={isTyping ? 'Rok Dein (Stop)' : 'Shuru Karein (Start)'}
                        disabled={autoTypeContent.length === 0}
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            {isTyping ? (
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd"></path>
                            ) : (
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"></path>
                            )}
                        </svg>
                    </button>
                </div>
            </header>

            <main className="flex-1 flex flex-col p-2 sm:p-4 gap-4 overflow-hidden">
                <div className="flex-1 flex flex-col min-h-0 bg-[var(--bg-textarea)] rounded-lg shadow-2xl border border-gray-300">
                    <div className="p-3 bg-[var(--header-bg)] border-b border-gray-300 text-center">
                        <p className="text-xs text-[var(--header-text)] truncate">{getStatusMessage()}</p>
                    </div>
                    <textarea
                        ref={textAreaRef}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="flex-1 p-4 bg-transparent text-[var(--text-primary)] placeholder-gray-500 w-full h-full resize-none focus:outline-none"
                        placeholder="Yahan type karein ya auto-typer ko kaam karne dein... (Type here or let the auto-typer work...)"
                        style={{ fontFamily: activeFontFamily }}
                        readOnly={isTyping} // Auto-typing ke dauraan manual input rok dein
                    />
                </div>
            </main>

            <footer className="flex-shrink-0 p-1 sm:p-2">
                <Keyboard 
                    onKeyPress={handleKeyPress} 
                    isTyping={isTyping}
                    isRecording={isRecording}
                    onFontChange={handleFontChange}
                    activeFontFamily={activeFontFamily}
                />
            </footer>
        </div>
    );
};

export default App;
