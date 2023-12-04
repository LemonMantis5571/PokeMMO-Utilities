'use client';
import { FC } from 'react'
import { Button } from './ui/button';

interface PaginationProps {
    prevPage: number;
    nextPage: number;
    currentPage: number;
    totalPages: number;
}

const Pagination: FC<PaginationProps> = ({ prevPage, nextPage, currentPage, totalPages }) => {
    const pageNumbers = [];
    const offsetNumber = 3;
    for (let i = currentPage - offsetNumber; i <= currentPage + offsetNumber; i++) {
        if (i >= 1 && i <= totalPages) {
            pageNumbers.push(i);
        }
    }
    
    return (
        <div className='flex items-center justify-center'>
            <Button
                disabled={currentPage === 1}
                onClick={() => window.location.href = `?page=${prevPage}`}
                className='rounded-l-md'
                variant={'outline'}
            >
                Prev
            </Button>
            {pageNumbers.map((number) => {
                return (
                    <Button
                        key={number}
                        onClick={() => window.location.href = `?page=${number}`}
                        className={`mx-1 ${number === currentPage ? 'bg-sky-600' : 'bg-zinc-900'}`}
                    >
                        {number}
                    </Button>
                )
            })}
            <Button
                disabled={currentPage === totalPages}
                onClick={() => window.location.href = `?page=${nextPage}`}
                className='rounded-r-md'
                variant={'outline'}
            >
                Next
            </Button>
        </div>
    )



}

export default Pagination