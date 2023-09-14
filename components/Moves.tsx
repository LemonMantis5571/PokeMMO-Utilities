import { FC } from 'react'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip'

interface MovesProps {
    move: string;
}

const Moves: FC<MovesProps> = ({ move }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" className='capitalize'>{move}</Button>
                </TooltipTrigger>
            </Tooltip>
        </TooltipProvider>
    )
}

export default Moves