import { useState, useEffect } from "react";
import type { Country } from "../types/country";
import { Check, Search, ChevronDown } from "lucide-react";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function Toolbar({ countries, onFilter }: {
    countries: Country[];
    onFilter: (filtered: Country[], search: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [region, setRegion] = useState("");
    const [count, setCount] = useState(countries.length);

    useEffect(() => {
        const filtered = countries.filter(c =>
            (!region || c.region.toLowerCase() === region.toLowerCase()) &&
            (!search.trim() || c.name.common.toLowerCase().includes(search.toLowerCase()))
        );
        setCount(filtered.length);
        onFilter(filtered, search);
    }, [search, region, countries, onFilter]);

    const infoText = search && !count ? `NO DATA MATCHES: ${search.toUpperCase()}`
        : search ? `QUERY MATCH: ${count} item${count !== 1 ? "s" : ""}.` : region ?
            `REGION: ${region.toUpperCase()} - ${count} COUNTRIES.` : `GLOBAL DATASET: ${count} RECORDS ONLINE.`;

    const bgText = "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100";
    const baseBorder = "border border-gray-300 dark:border-gray-700 hover:border-indigo-500 transition-colors";

    return (
        <header className={`flex flex-col gap-6 p-4 rounded-xl shadow-lg ${bgText} ${baseBorder}`}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full sm:max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <input
                        value={search}
                        placeholder="SEARCH DATA BANK..."
                        onChange={e => setSearch(e.target.value)}
                        className={`w-full pl-12 pr-4 py-3 rounded-xl font-mono text-sm shadow-md 
                            ${bgText} ${baseBorder} focus:outline-none focus:border-indigo-500`}
                    />
                </div>

                <div className="relative w-full sm:w-64">
                    <button
                        onClick={() => setOpen(!open)}
                        className={`w-full px-5 py-3 flex items-center justify-between rounded-xl shadow-md 
                            transition-colors ${bgText} ${baseBorder} ${open ? "border-indigo-500" : ""}`}
                    >
                        <span className="font-mono text-sm">{region || "Filter by Region"}</span>
                        <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>

                    {open && (
                        <div className={`absolute top-full p-2 mt-2 w-full rounded-xl shadow-xl z-20 ${bgText} border border-indigo-500`}>
                            <div className="max-h-60 overflow-y-auto space-y-1">
                                {[{ label: "All Regions", val: "" }, ...regions.map(r => ({ label: r, val: r }))].map(({ label, val }) => {
                                    const active = region === val;
                                    return (
                                        <button
                                            key={label}
                                            onClick={() => { setRegion(val); setOpen(false); }}
                                            className={`w-full text-left px-4 py-2 text-sm rounded-lg flex justify-between 
                                                font-medium ${active ? "bg-indigo-600 text-white" : "hover:bg-gray-100 dark:hover:bg-gray-700"}`}
                                        >
                                            {label} {active && <Check className="w-4 h-4 text-white" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <p className={`text-sm font-mono tracking-wide text-center sm:text-left pt-2 border-t 
                ${count ? "text-indigo-600 dark:text-indigo-400" : "text-red-600 dark:text-red-500 animate-pulse"}`}>
                &gt; STATUS: {infoText}
            </p>
        </header>
    );
}
