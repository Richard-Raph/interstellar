import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
    pageSize: number;
    totalItems: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    pageSize,
    totalItems,
    currentPage,
    onPageChange,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / pageSize);
    if (totalPages <= 1) return null;

    const navBtn = (disabled: boolean) =>
        `w-10 h-10 flex items-center justify-center rounded-full transition ${disabled
            ? "text-gray-400 cursor-not-allowed dark:text-gray-600"
            : "text-gray-700 hover:bg-indigo-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-500"
        }`;

    const pageBtn = (active: boolean) =>
        `w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition ${active
            ? "bg-indigo-600 text-white shadow-md dark:bg-indigo-500"
            : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
        }`;

    const pages =
        totalPages <= 2
            ? Array.from({ length: totalPages }, (_, i) => i + 1)
            : [
                1,
                currentPage === 1 ? 2 : currentPage === totalPages ? totalPages - 1 : currentPage,
                totalPages,
            ];

    return (
        <nav className="flex items-center self-center space-x-2 p-2 rounded-xl shadow-md bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
            <button
                aria-label="Previous Page"
                disabled={currentPage === 1}
                className={navBtn(currentPage === 1)}
                onClick={() => onPageChange(currentPage - 1)}
            >
                <ChevronLeft className="w-5 h-5" />
            </button>

            {pages.map((p) => (
                <button key={p} onClick={() => onPageChange(p)} className={pageBtn(p === currentPage)}>
                    {p}
                </button>
            ))}

            <button
                aria-label="Next Page"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className={navBtn(currentPage === totalPages)}
            >
                <ChevronRight className="w-5 h-5" />
            </button>
        </nav>
    );
}
