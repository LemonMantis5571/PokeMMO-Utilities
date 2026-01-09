'use client'
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const UserAvatar = () => {
    return (
        <Link href="/" className="flex items-center gap-2 group">
            <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="relative w-8 h-8"
            >
                <Image
                    src="/favicon.ico"
                    alt="PokeMMO Tools"
                    fill
                    className="object-contain"
                />
            </motion.div>
            <span className="font-bold text-lg hidden sm:block text-white hover:text-red-500 transition-colors">
                PokeMMO Tools
            </span>
        </Link>
    );
}

export default UserAvatar;