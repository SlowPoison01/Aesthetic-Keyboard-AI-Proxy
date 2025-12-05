import type { Theme } from './types';

// Interface for Font Style definition
export interface FontStyle {
    name: string;
    family: string;
}

/**
 * List of aesthetic font styles sourced from Google Fonts.
 * NOTE: All these fonts must also be included in the <link> tag in index.html for them to load.
 */
export const FONT_STYLES: FontStyle[] = [
    // --- English Fancy & Themed ---
    { name: 'Elegant Script', family: "'Dancing Script', cursive" },
    { name: 'Bold Serif', family: "'Merriweather', serif" },
    { name: 'Pixel Type', family: "'Pixelify Sans', sans-serif" },
    { name: 'Graffiti', family: "'Oi', sans-serif" },
    { name: 'Handwriting', family: "'Caveat', cursive" },
    { name: 'Lobster', family: "'Lobster', sans-serif" },
    { name: 'Pacifico', family: "'Pacifico', cursive" },
    { name: '8-Bit', family: "'Press Start 2P', system-ui" },
    { name: 'Typewriter', family: "'Special Elite', system-ui" },
    { name: 'Monoton', family: "'Monoton', sans-serif" },
    { name: 'Doodle', family: "'Rubik Doodle Shadow', system-ui" },
    { name: 'Glitch', family: "'Rubik Glitch', system-ui" },
    { name: 'Storm', family: "'Rubik Storm', system-ui" },
    { name: 'Horror', family: "'Creepster', system-ui" },
    { name: 'Scary', family: "'Nosifier', system-ui" },
    { name: 'Heavy Metal', family: "'Metal Mania', system-ui" },
    { name: 'Western', family: "'Rye', system-ui" },
    { name: 'Bubble Gum', family: "'Slackside One', system-ui" },
    { name: 'Gothic', family: "'Pirata One', system-ui" },
    { name: 'Futuristic', family: "'Rubik Iso', system-ui" },
    
    // --- Urdu & Arabic Fonts ---
    { name: 'Nastaliq Urdu', family: "'Noto Nastaliq Urdu', serif" },
    { name: 'Mirza Arabic', family: "'Mirza', serif" },
    { name: 'Reem Kufi', family: "'Reem Kufi', sans-serif" },
    { name: 'Scheherazade', family: "'Scheherazade New', serif" },

    // --- Hindi / Devanagari Fonts ---
    { name: 'Hindi Simple', family: "'Mukta', sans-serif" },
    { name: 'Hindi Classic', family: "'Noto Sans Devanagari', sans-serif" },

    // --- Standard & Professional ---
    { name: 'Sans Serif', family: "'Inter', sans-serif" },
    { name: 'Monospace', family: "'Roboto Mono', monospace" },
    { name: 'Poppins', family: "'Poppins', sans-serif" },
    { name: 'Oswald', family: "'Oswald', sans-serif" },
];


/**
 * List of color themes for the application.
 * Each theme defines CSS custom properties (variables).
 */
export const THEMES: Theme[] = [
    {
        name: 'Default Light',
        cssVars: {
            '--bg-main': '#f9fafb',
            '--bg-textarea': '#ffffff',
            '--text-primary': '#1f2937',
            '--text-secondary': '#6b7280',
            '--header-bg': '#e5e7eb',
            '--header-text': '#4f46e5',
            '--keyboard-bg': '#f3f4f6',
            '--key-primary-bg': '#ffffff',
            '--key-primary-text': '#000000',
            '--key-secondary-bg': '#a5f3fc',
            '--key-secondary-text': '#000000',
            '--key-special-bg': '#7f1d1d',
            '--key-special-text': '#ffffff',
            '--font-btn-bg': '#4b5563',
            '--font-btn-active-bg': '#8b5cf6',
            '--font-btn-text': '#ffffff',
            '--watermark-text': 'rgba(31, 41, 55, 0.1)',
        }
    },
    {
        name: 'Dark Mode',
        cssVars: {
            '--bg-main': '#111827',
            '--bg-textarea': '#1f2937',
            '--text-primary': '#f9fafb',
            '--text-secondary': '#9ca3af',
            '--header-bg': '#374151',
            '--header-text': '#8b5cf6',
            '--keyboard-bg': '#1f2937',
            '--key-primary-bg': '#374151',
            '--key-primary-text': '#ffffff',
            '--key-secondary-bg': '#4b5563',
            '--key-secondary-text': '#f9fafb',
            '--key-special-bg': '#f87171',
            '--key-special-text': '#1f2937',
            '--font-btn-bg': '#4b5563',
            '--font-btn-active-bg': '#ec4899',
            '--font-btn-text': '#ffffff',
            '--watermark-text': 'rgba(243, 244, 246, 0.1)',
        }
    },
    {
        name: 'Ocean Deep',
        cssVars: {
            '--bg-main': '#2c3e50',
            '--bg-textarea': '#34495e',
            '--text-primary': '#ecf0f1',
            '--text-secondary': '#bdc3c7',
            '--header-bg': '#1abc9c',
            '--header-text': '#ffffff',
            '--keyboard-bg': '#34495e',
            '--key-primary-bg': '#ecf0f1',
            '--key-primary-text': '#2c3e50',
            '--key-secondary-bg': '#a9cce3',
            '--key-secondary-text': '#2c3e50',
            '--key-special-bg': '#e74c3c',
            '--key-special-text': '#ffffff',
            '--font-btn-bg': '#3498db',
            '--font-btn-active-bg': '#2980b9',
            '--font-btn-text': '#ffffff',
            '--watermark-text': 'rgba(44, 62, 80, 0.2)'
        }
    },
    {
        name: 'Volcano',
        cssVars: {
            '--bg-main': '#1a0000',
            '--bg-textarea': '#2b0000',
            '--text-primary': '#ffc2b3',
            '--text-secondary': '#ff6600',
            '--header-bg': '#3c0000',
            '--header-text': '#ff8c00',
            '--keyboard-bg': '#1f1f1f',
            '--key-primary-bg': '#4d0000',
            '--key-primary-text': '#ffc2b3',
            '--key-secondary-bg': '#800000',
            '--key-secondary-text': '#ffc2b3',
            '--key-special-bg': '#ff4500',
            '--key-special-text': '#ffffff',
            '--font-btn-bg': '#ff6600',
            '--font-btn-active-bg': '#e53935',
            '--font-btn-text': '#ffffff',
            '--watermark-text': 'rgba(255, 102, 0, 0.1)'
        }
    },
    {
        name: 'Cyberpunk',
        cssVars: {
            '--bg-main': '#0c001c',
            '--bg-textarea': '#1a0033',
            '--text-primary': '#00ffc8',
            '--text-secondary': '#ff00aa',
            '--header-bg': '#330066',
            '--header-text': '#9d00ff',
            '--keyboard-bg': '#110022',
            '--key-primary-bg': '#001a33',
            '--key-primary-text': '#00ffc8',
            '--key-secondary-bg': '#330066',
            '--key-secondary-text': '#ff00aa',
            '--key-special-bg': '#ff00aa',
            '--key-special-text': '#ffffff',
            '--font-btn-bg': '#9d00ff',
            '--font-btn-active-bg': '#ff00aa',
            '--font-btn-text': '#0c001c',
            '--watermark-text': 'rgba(0, 255, 200, 0.15)'
        }
    },
];

// Default settings
export const DEFAULT_SETTINGS = {
    messageDelayMs: 150, // Default typing speed (150ms per character)
};
