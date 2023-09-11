import { FC } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface pageProps {

}

const page: FC<pageProps> = ({ }) => {
    return (
        <div className="flex min-h-full w-full items-center justify-center p-24">
            <div className="grid grid-cols-3 gap-4">
                <Card className="w-72 h-72">
                    <CardHeader>
                        <CardTitle>Card Title</CardTitle>
                        <CardDescription>Card Description</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>Card Content</p>
                    </CardContent>
                    <CardFooter>
                        <p>Card Footer</p>
                    </CardFooter>
                </Card>
            </div>
        </div>)
}

export default page