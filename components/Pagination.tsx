'use client'
import { FC } from 'react'
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaginationProps {
    prevPage: number;
    nextPage: number;
    currentPage: number;
    totalPages: number;
}

const Pagination: FC<PaginationProps> = ({ prevPage, nextPage, currentPage, totalPages }) => {
    const goToPage = (page: number) => {
        window.location.href = `?page=${page}`;
    };

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showPages = 3;

        if (totalPages <= showPages + 2) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            pages.push(1);
            if (currentPage > 3) pages.push('...');
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);
            for (let i = start; i <= end; i++) {
                if (!pages.includes(i)) pages.push(i);
            }
            if (currentPage < totalPages - 2) pages.push('...');
            if (!pages.includes(totalPages)) pages.push(totalPages);
        }
        return pages;
    };

    return (
        <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(prevPage)}
                disabled={currentPage === 1}
                className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800 disabled:opacity-30 px-3"
            >
                <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1">
                {getPageNumbers().map((page, index) => (
                    typeof page === 'number' ? (
                        <Button
                            key={index}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => goToPage(page)}
                            className={`min-w-[36px] ${currentPage === page
                                    ? 'bg-red-600 hover:bg-red-700 text-white border-0'
                                    : 'bg-zinc-900 border-zinc-700 hover:bg-zinc-800'
                                }`}
                        >
                            {page}
                        </Button>
                    ) : (
                        <span key={index} className="text-zinc-600 px-2">...</span>
                    )
                ))}
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(nextPage)}
                disabled={currentPage >= totalPages}
                className="bg-zinc-900 border-zinc-700 hover:bg-zinc-800 disabled:opacity-30 px-3"
            >
                <ChevronRight className="w-4 h-4" />
            </Button>
        </motion.div>
    )
}

export default Pagination