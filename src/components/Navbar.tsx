interface Props {
    darkMode: boolean;
    toggleDark: () => void;
}

export default function Navbar({ darkMode, toggleDark }: Props) {
    return (
        <header className="sticky top-0 flex items-center justify-between bg-white dark:bg-gray-900 shadow-md px-6 py-4">
            <h1 className="text-xl font-semibold">The Interstellar Atlas</h1>
            <button
                onClick={toggleDark}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-800"
            >
                {darkMode ? "Light Mode" : "Dark Mode"}
            </button>
        </header>
    );
}
