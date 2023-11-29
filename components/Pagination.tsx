import { FC } from 'react'
import { Button } from './ui/button';

interface PaginationProps {
    itemsPerPage: number;
    totalItems: number | undefined;
    paginate: (pageNumber: number) => void;
    currentPage: number;
}

const Pagination: FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];
    if (!totalItems) return (<></>)
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }


    return (<nav>
        <ul className='inline-flex -space-x-px text-sm'>
            {pageNumbers.map(number => (
                <li key={number}>
                    <Button onClick={() => paginate(number)}
                        variant={'outline'} className={currentPage === number ? 'bg-card' : ''} >{number}</Button>
                </li>
            ))}
        </ul>
    </nav>)
}

export default Pagination