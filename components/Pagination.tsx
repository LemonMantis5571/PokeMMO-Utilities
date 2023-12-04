'use client';
import { FC } from 'react'

import Link from 'next/link';
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
            <Link href={`?page=${prevPage}`}
                aria-disabled={currentPage === 1}
                className='rounded-l-md'
            >
                <Button variant={'outline'} size={'sm'} disabled={currentPage === 1}>
                    Prev
                </Button>
            </Link>

            {pageNumbers.map((number, index) => {
                return (
                    <Link key={index}
                        href={`?page=${number}`}
                    >
                        <Button key={index}
                            className={`mx-1 ${number === currentPage ? 'bg-sky-600' : 'bg-zinc-900'} `}
                            variant={'outline'}
                            size={'sm'}>
                            {number}
                        </Button>
                    </Link>

                )
            })}
            <Link href={`?page=${nextPage}`}
                aria-disabled={currentPage === totalPages}
                className='rounded-l-md'
            >
                <Button variant={'outline'} size={'sm'} disabled={currentPage === totalPages}>
                    Next
                </Button>
            </Link>
        </div>
    )

}

export default Pagination