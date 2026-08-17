export type ThemeType = 'first' | 'second' | 'third' | 'fourth' | 'fifth' | 'sixth';

export interface InputErrorProps {
    message?: string;
    className?: string;
}

export interface NoDataProps {
    setAddOpen?: (open: boolean) => void,
    animationData?: any;
    message: string;
    image?: boolean;
    src?: string;
}

export type PreventableEvent = { preventDefault: () => void };