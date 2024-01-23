import { type ClassValue, clsx } from "clsx"
import data from "@/data/pokemmo.mock.data.json"
import randomItem from "@/data/items.mock.data.json"
import { twMerge } from "tailwind-merge"


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Pokemon {
  number: string; // yeah I should modify the json to be number instead of string. Either that or Cast to int lol
  name: string;
  types: string[];
  abilities: string[];
  tier: string;
}