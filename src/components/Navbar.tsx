import { useState } from "react";
import { Sun, Moon } from "lucide-react";

interface Props {
    darkMode: boolean;
    toggleDark: () => void;
}

export default function Navbar({ darkMode, toggleDark }: Props) {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        toggleDark();
        setTimeout(() => setClicked(false), 300);
    };

    return (
        <header className="sticky z-50 top-0 flex items-center justify-between bg-white dark:bg-gray-900 shadow-md p-6 md:px-16">
            <h1 className="text-xl font-semibold">The Interstellar Atlas</h1>

            <button
                onClick={handleClick}
                className={`relative flex items-center w-16 h-8 rounded-full transition-all duration-500 
                    ${darkMode ? "bg-gray-700" : "bg-indigo-400"}
                    ${clicked ? "scale-95" : "scale-100"}
                    focus:outline-none`}
            >
                <div className={`
                    absolute top-1 left-1 flex items-center justify-center rounded-full bg-white dark:bg-gray-800 
                    w-6 h-6 shadow-md transition-all duration-500 transform ${darkMode ? "translate-x-8" : "translate-x-0"}
                `}>
                    {darkMode ? (
                        <Moon className="w-4 h-4 text-blue-400 transition-transform duration-500" />
                    ) : (
                        <Sun className="w-4 h-4 text-indigo-500 transition-transform duration-500" />
                    )}
                </div>
            </button>
        </header>
    );
}
