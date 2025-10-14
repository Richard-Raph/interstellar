import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { X, Book, Mail, Github, Monitor, Linkedin, Smartphone } from "lucide-react";

interface AboutProps { onClose?: () => void; }

const CARD_DURATION = 0.3;

const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
        scale: 1,
        opacity: 1,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            staggerChildren: 0.1,
            when: "beforeChildren",
        }
    },
    exit: { opacity: 0, scale: 0.95, transition: { duration: CARD_DURATION, ease: "easeIn" } }
};

const childVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const InfoLine = ({ icon: Icon, text, color = "text-indigo-500" }: { icon: React.ElementType, text: string, color?: string }) => (
    <motion.div variants={childVariants} className="flex items-center gap-3 py-1.5 max-w-[280px]">
        <Icon className={`w-5 h-5 ${color} shrink-0`} />
        <span className="font-mono text-sm text-gray-800 dark:text-gray-300 text-center whitespace-pre-wrap flex-1">{text}</span>
    </motion.div>
);

export default function About({ onClose }: AboutProps) {
    const [visible, setVisible] = useState(false);

    useEffect(() => setVisible(true), []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => onClose?.(), CARD_DURATION * 1000);
    };

    return (
        <motion.div
            exit="exit"
            initial="hidden"
            variants={cardVariants}
            animate={visible ? "visible" : "exit"}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 dark:bg-black/70 backdrop-blur-sm p-4"
        >
            <div className="relative w-full max-w-sm p-10 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 text-center">

                <motion.button
                    aria-label="Close"
                    onClick={handleClose}
                    variants={childVariants}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition-all"
                >
                    <X className="w-5 h-5" />
                </motion.button>

                <motion.h1 variants={childVariants} className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
                    RICHARD RAPHAEL
                </motion.h1>

                <div className="flex flex-col gap-2 mb-6">
                    <InfoLine icon={Monitor} text={"WEB DEVELOPER\n(FRONTEND/BACKEND)"} color="text-indigo-600 dark:text-indigo-400" />
                    <InfoLine icon={Smartphone} text={"APP DEVELOPER\n(REACT NATIVE)"} color="text-green-600 dark:text-green-400" />
                    <InfoLine icon={Book} text={"INSTRUCTOR/MENTOR\n(WEB DEVELOPMENT)"} color="text-yellow-600 dark:text-yellow-400" />
                </div>

                <motion.h2 variants={childVariants} className="text-xl font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-4 border-b border-indigo-300 dark:border-indigo-500 pb-2">
                    GET IN TOUCH
                </motion.h2>

                <div className="flex justify-center gap-10">
                    <motion.a variants={childVariants} href="https://github.com/Richard-Raph" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-transform hover:scale-110">
                        <Github className="w-8 h-8" />
                    </motion.a>
                    <motion.a variants={childVariants} href="https://www.linkedin.com/in/rich-tech123" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-600 transition-transform hover:scale-110">
                        <Linkedin className="w-8 h-8" />
                    </motion.a>
                    <motion.a variants={childVariants} href="mailto:arm.techtonic@gmail.com" className="text-red-500 hover:text-red-600 transition-transform hover:scale-110">
                        <Mail className="w-8 h-8" />
                    </motion.a>
                </div>
            </div>
        </motion.div>
    );
}
