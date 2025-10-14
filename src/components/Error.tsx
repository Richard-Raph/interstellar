import { motion } from "framer-motion";
import { Globe, WifiOff } from "lucide-react";

interface ErrorProps {
    query?: string;
    onRetry?: () => void;
    type: "network" | "results";
}

export default function Error({ type, query, onRetry }: ErrorProps) {
    if (type === "network") {
        return (
            <motion.div
                animate={{ opacity: 1, scale: 1 }}
                initial={{ opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 250, damping: 22 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            >
                <div className="flex flex-col items-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full">
                    <motion.div
                        animate={{ rotate: [0, 10, -10, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                        className="w-14 h-14 bg-red-500 rounded-full flex items-center justify-center mb-4"
                    >
                        <WifiOff className="w-7 h-7 text-white" />
                    </motion.div>

                    <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">
                        Connection Lost!
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-5">
                        We failed to connect to the country database.<br />Please check your network and try again.
                    </p>

                    <motion.button
                        onClick={onRetry}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-semibold"
                    >
                        Retry Connection
                    </motion.button>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            initial={{ opacity: 0, y: 15 }}
            className="flex flex-col items-center justify-center text-center mt-12 p-6"
        >
            <Globe className="w-10 h-10 text-indigo-500 mb-3" />
            <h3 className="text-lg font-semibold mb-1 text-gray-800 dark:text-gray-100">
                Oops! No Country Found
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
                No results found for “{query}”.
            </p>
        </motion.div>
    );
}
