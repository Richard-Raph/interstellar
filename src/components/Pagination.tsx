// src/components/Pagination.tsx

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    totalItems: number;
    pageSize: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

// Controls how many page buttons are visible in the center (e.g., 5 total, including current)
const MAX_VISIBLE_PAGES = 4;

export default function Pagination({
    totalItems,
    pageSize,
    currentPage,
    onPageChange,
}: PaginationProps) {
    const totalPages = Math.ceil(totalItems / pageSize);

    if (totalPages <= 1) return null;

    const navButtonClass = (isDisabled: boolean) =>
        `w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${isDisabled
            ? 'text-gray-400 cursor-not-allowed dark:text-gray-600'
            : 'text-gray-700 hover:bg-indigo-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-indigo-600 dark:hover:text-indigo-500'
        }`;

    const pageButtonClass = (isActive: boolean) =>
        `w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${isActive
            ? 'bg-indigo-600 text-white shadow-lg dark:bg-indigo-500'
            : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
        }`;

    // --- Logic to determine which page numbers to show ---
    const half = Math.floor(MAX_VISIBLE_PAGES / 2);
    let startPage = Math.max(1, currentPage - half);
    let endPage = Math.min(totalPages, currentPage + half);

    // Adjust boundaries to ensure MAX_VISIBLE_PAGES are shown if possible
    if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
        if (currentPage <= half) {
            endPage = Math.min(totalPages, MAX_VISIBLE_PAGES);
        } else if (currentPage > totalPages - half) {
            startPage = Math.max(1, totalPages - MAX_VISIBLE_PAGES + 1);
        }
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    // ----------------------------------------------------

    const renderPageButton = (page: number) => (
        <button
            key={page}
            onClick={() => onPageChange(page)}
            className={pageButtonClass(page === currentPage)}
            aria-current={page === currentPage ? 'page' : undefined}
        >
            {page}
        </button>
    );

    return (
        <section className="flex justify-center">
            <nav className="flex items-center space-x-2 p-2 rounded-xl shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">

                {/* Previous Button */}
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={navButtonClass(currentPage === 1)}
                    aria-label="Previous Page"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* First Page Button and Start Ellipsis */}
                {pages[0] > 1 && (
                    <>
                        {renderPageButton(1)}
                        {pages[0] > 2 && (
                            <span className="text-gray-500 dark:text-gray-400">...</span>
                        )}
                    </>
                )}

                {/* Visible Page Numbers */}
                {pages.map(renderPageButton)}

                {/* End Ellipsis and Last Page Button */}
                {pages[pages.length - 1] < totalPages && (
                    <>
                        {pages[pages.length - 1] < totalPages - 1 && (
                            <span className="text-gray-500 dark:text-gray-400">...</span>
                        )}
                        {renderPageButton(totalPages)}
                    </>
                )}

                {/* Next Button */}
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={navButtonClass(currentPage === totalPages)}
                    aria-label="Next Page"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </nav>
        </section>
    );
}