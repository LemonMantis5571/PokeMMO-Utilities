import { cn } from "@/lib/utils"
import { NavigationMenuLink } from "@radix-ui/react-navigation-menu"
import { LucideIcon, LucideProps } from "lucide-react"
import React, { ComponentType } from "react"

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
    customIcon: LucideIcon
}

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    ListItemProps
>(({ className, title, children, customIcon: Icon, ...props }, ref,) => {

    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <div className="flex gap-4">
                        <Icon height={35} width={35}/>
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
