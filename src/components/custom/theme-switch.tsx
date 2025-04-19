import React from 'react';
import { useTheme } from 'next-themes';
import { Moon, Sun, Tv2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const themeOptions: Record<string, 'system' | 'light' | 'dark'> = {
    dark: 'system',
    system: 'light',
    light: 'dark'
};

interface ThemeSwitchProps {
    className?: string;
}

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ className }) => {
    const { theme, setTheme } = useTheme();

    const Icon = theme === 'light' ? Sun : theme === 'dark' ? Moon : Tv2;

    return (
        <Button
            size="icon"
            variant="ghost"
            className={cn(
                'size-7',
                className
            )}
            onClick={() => {
                theme && setTheme(themeOptions[theme]);
            }}
        >
            <Icon size={20} />
        </Button>
    );
};

export default ThemeSwitch;
