'use client'
import { cn } from "@/lib/utils"
import {
    NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import { LucideIcon } from "lucide-react"
import React from "react"

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
    customIcon: LucideIcon
    isBlank?: boolean
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    ListItemProps
>(({ className, title, children, isBlank, customIcon: Icon, ...props }, ref) => {

    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    target={isBlank ? "_blank" : "_self"}
                    className={cn(
                        "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-900 border border-transparent hover:border-zinc-800",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-semibold text-white mb-2">{title}</div>
                    <div className="flex gap-3 items-start">
                        <Icon className="h-6 w-6 text-zinc-500 flex-shrink-0" />
                        <p className="line-clamp-2 text-sm leading-snug text-zinc-500">
                            {children}
                        </p>
                    </div>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"

export default ListItem
