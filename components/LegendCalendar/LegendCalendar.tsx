'use client';
import { Calendar } from "@/components/ui/calendar"
import React from 'react'
import DayComponent from "./DayComponent";
import BeastDayComponent from "./BeastDayComponent";
import Footer from "./Footer";
import { set } from "date-fns";



const LegendCalendar = () => {
    const [birdDate, setBirdDate] = React.useState<Date | undefined>(new Date());
    const [beastDate, setBeastDate] = React.useState<Date | undefined>(new Date());
    const birdMonth = birdDate?.getMonth();
    const beastMonth = beastDate?.getMonth();

    return (
        <div className="container mt-8">
            <div className="flex flex-col justify-center  items-center">
                <h1 className="text-2xl font-semibold">Legendary Calendar</h1>
                <p className="text-sm text-muted-foreground">Select a date to see the legendary Pokemon of each month!</p>
            </div>
            <div className="w-fit flex flex-col sm:flex-row m-auto mt-12 gap-12 mb-4">
                <Calendar
                    key={'BirdsCalendar'}
                    components={{
                        DayContent: DayComponent,
                    }}
                    mode="single"
                    onMonthChange={(month) => setBirdDate(month)}
                    selected={birdDate}
                    onSelect={setBirdDate}
                    className="rounded-md border w-fit"
                />
                <Calendar
                    key={'BeastsCalendar'}
                    components={{
                        DayContent: BeastDayComponent,
                    }}
                    mode="single"
                    onMonthChange={(month) => setBeastDate(month)}
                    selected={beastDate}
                    onSelect={setBeastDate}
                    className="rounded-md border w-fit"
                />
            </div>
            <Footer beastMonth={beastMonth} birdMonth={birdMonth} />
        </div>

    )
}

export default LegendCalendar