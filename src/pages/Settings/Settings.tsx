import { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Settings = () => {
    const [timeFormat, setTimeFormat] = useState('24h');
    const [mode, setMode] = useState('light');

    const themeColors = [
        'bg-chart-1', 'bg-chart-2', 'bg-chart-3',
        'bg-chart-4', 'bg-chart-5', 'bg-primary'
    ];

    return (
        <div className="xl:mt-12 animate-page">

            <Card className="max-w-4xl border-none shadow-none bg-card p-10 ">
                <div className="space-y-12">
                    {/* Header */}
                    <div>
                        <h2 className="text-muted-foreground text-lg font-medium">Choose your preference</h2>
                        <div className="h-px bg-border w-full mt-6" />
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-16">

                        {/* Time Format */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-foreground text-lg">Time format</h3>
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setTimeFormat('24h')}
                                    className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all font-bold ${timeFormat === '24h'
                                        ? 'border-primary text-foreground'
                                        : 'border-transparent bg-secondary text-muted-foreground'
                                        }`}
                                >
                                    24 Hours
                                </button>
                                <button
                                    onClick={() => setTimeFormat('12h')}
                                    className={`flex-1 py-4 px-6 rounded-xl border-2 transition-all font-bold ${timeFormat === '12h'
                                        ? 'border-primary text-foreground'
                                        : 'border-transparent bg-secondary text-muted-foreground'
                                        }`}
                                >
                                    12 Hours
                                </button>
                            </div>

                            <div className="pt-8">
                                <Button className="w-full bg-primary hover:opacity-90 text-primary-foreground py-7 rounded-xl text-lg font-bold shadow-lg shadow-primary/20">
                                    Reset Default
                                </Button>
                            </div>
                        </div>

                        {/* Theme Colors */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-foreground text-lg">Theme</h3>
                            <div className="grid grid-cols-3 gap-4">
                                {themeColors.map((color, index) => (
                                    <div
                                        key={index}
                                        className={`${color} aspect-square rounded-lg cursor-pointer hover:scale-105 transition-transform`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Mode (Sun & Moon) */}
                        <div className="space-y-6">
                            <h3 className="font-bold text-foreground text-lg">Mode</h3>
                            <div className="space-y-4">
                                {/* Light Mode */}
                                <div
                                    onClick={() => setMode('light')}
                                    className={`flex items-center justify-center p-6 rounded-xl cursor-pointer transition-all ${mode === 'light' ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground'
                                        }`}
                                >
                                    <Sun size={42} strokeWidth={1.5} />
                                </div>

                                {/* Dark Mode */}
                                <div
                                    onClick={() => setMode('dark')}
                                    className={`flex items-center justify-center p-6 rounded-xl cursor-pointer transition-all ${mode === 'dark' ? 'bg-foreground text-background' : 'bg-secondary text-muted-foreground'
                                        }`}
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