'use client'
import { FC } from 'react'
import { motion } from 'framer-motion'

interface MovesProps {
    move: string;
    className?: string;
}

const Moves: FC<MovesProps> = ({ move, className }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
                capitalize px-3 py-2 rounded text-sm font-medium
                bg-zinc-900 border border-zinc-700
                hover:border-zinc-600 hover:bg-zinc-800
                transition-colors duration-150
                text-zinc-200
                ${className}
            `}
        >
            {move}
        </motion.button>
    )
}

export default Moves