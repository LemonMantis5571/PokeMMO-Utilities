import LegendCalendar from '@/components/LegendCalendar/LegendCalendar'

export const fetchCache = 'force-no-store';
// revalidate everyday
export const revalidate = 86400;

const page = () => {
    return (
        <LegendCalendar />
    )
}

export default page