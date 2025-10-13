import { motion } from "framer-motion";
import { Globe, WifiOff } from "lucide-react";

interface ErrorProps {
    query?: string;
    message?: string;
    onClose?: () => void;
    onRetry?: () => void;
    type: "network" | "results";
}

export default function Error({ type, message, onRetry, onClose, query }: ErrorProps) {
    const isNetworkError = type === "network";
    const Icon = isNetworkError ? WifiOff : Globe;

    const primaryMessage = isNetworkError
        ? message || "We failed to connect to the country database. Please check your network."
        : query ? `"${query}" not found in the World Index.` : "No countries loaded.";

    const buttonText = isNetworkError ? "Retry Connection" : "Close";

    const handleClick = () => {
        if (isNetworkError && onRetry) onRetry();
        else if (onClose) onClose();
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.75, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        >
            <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl text-center max-w-sm">
                <div className={`w-16 h-16 ${isNetworkError ? "bg-red-500" : "bg-indigo-500"} rounded-full flex items-center justify-center mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                    {isNetworkError ? "Connection Lost!" : "No Results Found"}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 whitespace-pre-line">{primaryMessage}</p>

                <button
                    onClick={handleClick}
                    className={`px-6 py-2 rounded-lg text-white font-semibold ${isNetworkError ? "bg-red-500 hover:bg-red-600" : "bg-indigo-500 hover:bg-indigo-600"}`}
                >
                    {buttonText}
                </button>
            </div>
        </motion.div>
    );
}
