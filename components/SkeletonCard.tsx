import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

const SkeletonCard = () => {
    return (<div className="container mt-5">
        <Card className="text-center" >
            <CardHeader>
                <CardTitle className='capitalize text-base' >
                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </CardTitle>
                <CardDescription className='flex flex-col justify-center gap-2'>
                    <Skeleton className="w-[100px] h-[20px] rounded-full" />
                </CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col items-center'>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </CardContent>
            <CardFooter>
                <Skeleton className="w-[100px] h-[20px] rounded-full" />
            </CardFooter>
        </Card>
    </div>);
}

export default SkeletonCard;