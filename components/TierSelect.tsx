'use client'
import { FC, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { cn } from '@/lib/utils';
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover';
import { Check, ChevronsUpDown } from 'lucide-react';
import useTier from '@/hooks/useTier';

const Tiers = [
    { value: "OU", label: "OverUsed" },
    { value: "UU", label: "UnderUsed" },
    { value: "NU", label: "NeverUsed" },
    { value: "Untiered", label: "No-Tier" },
    { value: "ALL", label: "ALL" },
]

const TierSelect: FC = () => {
    const SelectedTier = useTier((state) => state.updateTier);
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState<String>();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[160px] justify-between bg-zinc-900 border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600"
                >
                    {value
                        ? Tiers.find((t) => t.value === value)?.label
                        : "Select Tier"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[160px] p-0 bg-black border border-zinc-700 rounded-lg shadow-xl z-[100]" sideOffset={5}>
                <Command className="bg-transparent">
                    <CommandInput placeholder="Search..." className="border-b border-zinc-800" />
                    <CommandEmpty>No tier found.</CommandEmpty>
                    <CommandGroup>
                        {Tiers.map((tier, index) => (
                            <CommandItem
                                key={index}
                                onSelect={() => {
                                    setValue(tier.value);
                                    SelectedTier({ value: tier.value });
                                    setOpen(false)
                                }}
                                className="hover:bg-zinc-900 cursor-pointer"
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === tier.value ? "opacity-100 text-red-500" : "opacity-0"
                                    )}
                                />
                                {tier.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default TierSelect