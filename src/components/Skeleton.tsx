import { motion } from "framer-motion";

interface SkeletonProps {
    type: 'card' | 'info';
}

const Box = ({ w, h, className = '' }: { w: string; h: string; className?: string }) => (
    <div className={`bg-gray-100 dark:bg-gray-800 rounded ${className}`} style={{ width: w, height: h }} />
);

const Line = ({ w, h, className = '' }: { w: string; h: string; className?: string }) => (
    <div className={`bg-gray-300 dark:bg-gray-700 rounded ${className}`} style={{ width: w, height: h }} />
);

const Circle = ({ size, className = '' }: { size: string; className?: string }) => (
    <div className={`bg-gray-300 dark:bg-gray-700 rounded-full ${className}`} style={{ width: size, height: size }} />
);

const AnimatedWrapper = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <motion.div
        className={className}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
    >
        {children}
    </motion.div>
);

export default function Skeleton({ type }: SkeletonProps) {
    if (type === 'card') {
        return (
            <AnimatedWrapper className="relative w-full p-0.5 shadow-lg rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800">
                <div className="absolute inset-0 z-0 bg-repeat [background-size:20px_20px] 
                    bg-[radial-gradient(ellipse_at_center,_var(--tw-color-gray-200)_1px,_transparent_1px)] 
                    dark:bg-[radial-gradient(ellipse_at_center,_var(--tw-color-gray-700)_1px,_transparent_1px)]" />
                <div className="relative flex flex-col justify-between rounded-xl bg-white/90 dark:bg-gray-900/90 
                    h-64 z-10 p-6 backdrop-blur-sm border border-transparent dark:border-gray-700 animate-pulse">
                    <div className="flex items-center space-x-4">
                        <Box w="4rem" h="3rem" className="shadow-lg" />
                        <Line w="8rem" h="2rem" />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <Line w="100%" h="1rem" />
                        <Line w="100%" h="1rem" />
                        <Line w="100%" h="1rem" />
                        <Line w="100%" h="1rem" />
                    </div>
                    <Line w="33%" h="0.25rem" className="mx-auto mt-4 rounded-full" />
                </div>
            </AnimatedWrapper>
        );
    }

    return (
        <AnimatedWrapper className="pb-10 pt-4">
            <div className="w-full h-96 mb-10 bg-gray-200 dark:bg-gray-700 rounded-none md:rounded-2xl animate-pulse overflow-hidden shadow-xl relative">
                <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between py-4 px-7 bg-black/40 backdrop-blur-sm">
                    <Line w="6rem" h="1rem" className="bg-gray-400/50 rounded-sm" />
                    <Line w="8rem" h="0.75rem" className="bg-green-400/30 rounded-sm" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-7 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-between">
                    <div className="space-y-2">
                        <Line w="16rem" h="2.5rem" className="rounded-lg mb-2" />
                        <Line w="12rem" h="1.5rem" className="bg-gray-300/70 rounded-md" />
                    </div>
                    <Box w="12rem" h="8rem" className="rounded-lg shadow-2xl border-4 border-white/50" />
                </div>
            </div>

            <div className="rounded-2xl p-6 lg:p-10 shadow-2xl bg-white/70 dark:bg-gray-900/70 border border-gray-300/50 dark:border-indigo-900/50 animate-pulse">
                <Line w="12rem" h="1.5rem" className="mb-6 border-b border-indigo-400/50 pb-2" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-10">
                    {[...Array(6)].map((_, i) => <Box key={i} w="100%" h="5rem" />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-3">
                        <Line w="10rem" h="1.25rem" className="mb-4" />
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-start gap-2">
                                <Circle size="1rem" />
                                <Line w="12rem" h="1rem" />
                                <Line w="100%" h="1rem" className="bg-gray-300/50 dark:bg-gray-700/50 ml-4" />
                            </div>
                        ))}
                    </div>
                    <div className="lg:col-span-1">
                        <Line w="10rem" h="1.25rem" className="mb-4" />
                        <div className="flex flex-wrap gap-3">
                            {[...Array(4)].map((_, i) => <Line key={i} w="6rem" h="2rem" className="rounded-full" />)}
                        </div>
                    </div>
                </div>
            </div>
        </AnimatedWrapper>
    );
}
