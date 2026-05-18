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
                        "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary border border-transparent hover:border-border",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-semibold text-foreground mb-2">{title}</div>
                    <div className="flex gap-3 items-start">
                        <Icon className="h-6 w-6 text-muted-foreground flex-shrink-0" />
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
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
