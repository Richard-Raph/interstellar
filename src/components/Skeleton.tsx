import { motion } from "framer-motion";

export default function Skeleton() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative w-full p-0.5 shadow-lg rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800"
        >
            <div className="absolute inset-0 z-0 bg-repeat [background-size:20px_20px] 
                bg-[radial-gradient(ellipse_at_center,_var(--tw-color-gray-200)_1px,_transparent_1px)] 
                dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-color-gray-700)_1px,_transparent_1px)]" />
            <div className="relative flex rounded-xl justify-between bg-white/90 dark:bg-gray-900/90 
                h-64 z-10 p-6 flex-col backdrop-blur-sm border border-transparent dark:border-gray-700 animate-pulse">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-12 bg-gray-300 rounded-md shadow-lg" />
                    <div className="h-8 w-32 bg-gray-300 rounded-md" />
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-3 mt-4">
                    <div className="h-4 bg-gray-300 rounded-md" />
                    <div className="h-4 bg-gray-300 rounded-md" />
                    <div className="h-4 bg-gray-300 rounded-md" />
                    <div className="h-4 bg-gray-300 rounded-md" />
                </div>
                <div className="w-1/3 h-1 bg-gray-300 rounded-full mx-auto mt-4" />
            </div>
        </motion.div>
    );
}
