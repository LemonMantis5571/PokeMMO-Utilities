/* eslint-disable @next/next/no-img-element */
'use client';
import { Calendar } from "@/components/ui/calendar"
import React from 'react'
import BirdDayComponent from "./BirdDayComponent";
import birds from '@/components/imgs/birds.png';
import dogs from '@/components/imgs/dogs.png';
import BeastDayComponent from "./BeastDayComponent";
import Footer from "./Footer";



const LegendCalendar = () => {
    const [birdDate, setBirdDate] = React.useState<Date | undefined>(new Date());
    const [beastDate, setBeastDate] = React.useState<Date | undefined>(new Date());
    const birdMonth = birdDate?.getMonth();
    const beastMonth = beastDate?.getMonth();



    return (
        <div className="container mt-8 flex justify-evenly items-center">
            <div className="hidden sm:block">
                <img
                    src={birds.src}
                    alt="birds"
                />
            </div>
            <div className="flex flex-col">
                <div className="flex flex-col justify-center items-center">
                    <h1 className="text-2xl font-semibold">Legendary Calendar</h1>
                    <p className="text-sm text-muted-foreground">Select a date to see the legendary Pokemon of each month!</p>
                </div>
                <div className="w-fit flex flex-col sm:flex-row m-auto mt-12 gap-12 mb-4">
                    <Calendar
                        fromYear={2023}
                        fromMonth={new Date(2023, 7)}
                        key="BirdsCalendar"
                        components={{ DayContent: BirdDayComponent }}
                        mode="single"
                        onMonthChange={(month) => setBirdDate(month)}
                        selected={birdDate}
                        required
                        onSelect={setBirdDate}
                        className="rounded-md border w-fit"

                    />
                    <Calendar
                        key="BeastsCalendar"
                        fromYear={2023}
                        fromMonth={new Date(2023, 7)}
                        components={{ DayContent: BeastDayComponent }}
                        mode="single"
                        onMonthChange={(month) => setBeastDate(month)}
                        selected={beastDate}
                        required
                        onSelect={setBeastDate}
                        className="rounded-md border w-fit"
                    />
                </div>
                <Footer beastMonth={beastMonth} birdMonth={birdMonth} />
            </div>
            <div className="hidden sm:block">
                <img
                    src={dogs.src}
                    alt="beasts"
                />
            </div>
        </div>

    )
}

export default LegendCalendar