import { useState, useEffect } from "react";
import { Mail, Twitter, LucideGithub } from "lucide-react";

interface AboutProps {
    onClose?: () => void; // optional, because you might not always pass it
}

export default function About({ onClose }: AboutProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem("hasVisited");
        if (!hasVisited) {
            setVisible(true);
            sessionStorage.setItem("hasVisited", "true");
        }
    }, []);

    const handleClose = () => {
        setVisible(false);
        onClose?.(); // call parent callback if provided
    };

    if (!visible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 max-w-sm w-full text-center relative">
                <button
                    onClick={handleClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                    Built with ❤️ by Richard
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    Web developer, UI tinkerer, caffeine enthusiast.
                </p>
                <div className="flex justify-center gap-4">
                    <a
                        href="https://github.com/your-handle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400"
                    >
                        <LucideGithub className="w-6 h-6" />
                    </a>
                    <a
                        href="https://twitter.com/your-handle"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-600"
                    >
                        <Twitter className="w-6 h-6" />
                    </a>
                    <a
                        href="mailto:you@example.com"
                        className="text-red-500 hover:text-red-600"
                    >
                        <Mail className="w-6 h-6" />
                    </a>
                </div>
            </div>
        </div>
    );
}
