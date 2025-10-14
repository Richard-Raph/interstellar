import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Layout() {
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem("theme") === "dark");

    useEffect(() => {
        document.body.classList.toggle("dark", darkMode);
        localStorage.setItem("theme", darkMode ? "dark" : "light");
    }, [darkMode]);

    return (
        <>
            <Navbar darkMode={darkMode} toggleDark={() => setDarkMode(!darkMode)} />
            <main className="flex flex-col gap-14 px-8 py-6 md:px-16 md:py-10 min-h-[calc(100dvh-80px)]">
                <Outlet />
            </main>
        </>
    );
}
