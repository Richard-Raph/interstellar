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
    const isNetwork = type === "network";
    const Icon = isNetwork ? WifiOff : Globe;

    const title = isNetwork ? "Connection Lost!" : "No Results Found";
    const primaryMessage = isNetwork
        ? message || "We failed to connect to the country database. Please check your network and try again."
        : query
            ? `No results found for “${query}”.`
            : "No countries found.";

    // Common animated icon block
    const AnimatedIcon = (
        <motion.div
            animate={{ rotate: [0, 10, -10, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className={`w-14 h-14 ${isNetwork ? "bg-red-500" : "bg-indigo-500"
                } rounded-full flex items-center justify-center mb-4`}
        >
            <Icon className="w-7 h-7 text-white" />
        </motion.div>
    );

    // For network errors → full modal overlay
    if (isNetwork) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            >
                <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full">
                    {AnimatedIcon}

                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">{primaryMessage}</p>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onRetry}
                        className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold"
                    >
                        Retry Connection
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    // For search/no-results → inline block
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center text-center mt-12 p-6"
        >
            {AnimatedIcon}
            <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">{primaryMessage}</p>

            {onClose && (
                <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={onClose}
                    className="mt-4 px-5 py-1.5 rounded-md bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium"
                >
                    Close
                </motion.button>
            )}
        </motion.div>
    );
}
