export interface Settings {
    messageDelayMs: number;
}

export enum AutoTypeStatus {
    IDLE = 'idle',
    TYPING = 'typing',
    WAITING = 'waiting',
    FINISHED = 'finished',
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
