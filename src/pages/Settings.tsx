import { Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useModeContext } from '@/contexts/mode/ModeProvider';
import { useThemeContext } from '@/contexts/theme/ThemeProvider';
import { useTimeContext } from '@/contexts/time/TimeProvider';

const Settings = () => {
    const { timeFormat, setTimeFormat } = useTimeContext();

    const { theme, themes, setTheme } = useThemeContext();

    const { mode, setLight, setDark } = useModeContext();

    const disabledButton = theme === "first" && timeFormat === "12" && mode === "light"

    const colors = {
        first: "bg-first",
        second: "bg-second",
        third: "bg-third",
        fourth: "bg-fourth",
        fifth: "bg-fifth",
        sixth: "bg-sixth"
    }

    return (
        <div className="xl:mt-12 animate-page">

            <Card className="max-w-4xl border-none shadow-none p-10 transition-all ">
                <div className="space-y-12">
                    {/* Header */}
                    <div>
                        <h2 className="text-muted-foreground text-lg font-medium">Choose your preference</h2>
                        <div className="h-px bg-border w-full mt-6 transition-all" />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-16">

                        {/* Time Format */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-foreground text-lg">Time format</h3>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setTimeFormat('12')}
                                    className={`cursor-pointer flex-1 py-4 px-6 rounded-xl transition-all border-2 font-bold ${timeFormat === '12'
                                        ? 'border-primary text-foreground'
                                        : 'border-transparent bg-secondary text-muted-foreground'
                                        }`}
                                >
                                    12 Hours
                                </button>
                                <button
                                    onClick={() => setTimeFormat('24')}
                                    className={`cursor-pointer flex-1 py-4 px-6 rounded-xl transition-all border-2 font-bold ${timeFormat === '24'
                                        ? 'border-primary text-foreground'
                                        : 'border-transparent bg-secondary text-muted-foreground'
                                        }`}
                                >
                                    24 Hours
                                </button>
                            </div>

                            <div className="pt-8">
                                <Button
                                    disabled={disabledButton}
                                    onClick={() => {
                                        setTheme("first");
                                        setLight();
                                        setTimeFormat("12");
                                    }}
                                    className="transition-none w-full text-white bg-primary hover:opacity-90 py-7 rounded-xl text-lg font-bold shadow-lg shadow-primary/20">
                                    Reset Default
                                </Button>
                            </div>
                        </div>

                        {/* Theme Colors */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-foreground text-lg">Theme</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {themes.map((color, index) => {
                                    const active = color === theme;
                                    return (
                                        <button
                                            onClick={() => {
                                                setTheme(color);
                                            }}
                                            key={index}
                                            className={`
                                                ${colors[color]}
                                                ${active ? 'opacity-100' : 'opacity-20'} aspect-square rounded-lg cursor-pointer hover:scale-105 transition-transform`}
                                        />
                                    );
                                })}
                            </div>
                        </div>

                        {/* Mode (Sun & Moon) */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-foreground text-lg">Mode</h3>
                            <div className="space-y-4">
                                {/* Light Mode */}
                                <div
                                    onClick={() => setLight()}
                                    className={`flex items-center justify-center p-6 rounded-xl cursor-pointer transition-all bg-foreground text-background dark:bg-secondary dark:text-muted-foreground`}
                                >
                                    <Sun size={42} strokeWidth={1.5} />
                                </div>

                                {/* Dark Mode */}
                                <div
                                    onClick={() => setDark()}
                                    className={`flex items-center justify-center p-6 rounded-xl cursor-pointer transition-all dark:bg-foreground dark:text-background bg-secondary text-muted-foreground`}
                                >
                                    <Moon size={42} strokeWidth={1.5} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Card>
        </div>

    );
};

export default Settings;