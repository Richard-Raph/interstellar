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
            <main className="grid p-8 md:p-16 min-h-[calc(100dvh-80px)]">
                <Outlet />
            </main>
        </>
    );
}
