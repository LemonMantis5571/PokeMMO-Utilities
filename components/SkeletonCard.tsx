import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Skeleton } from "./ui/skeleton"

const SkeletonCard = () => {
  return (
    <Card className="pvp-card h-full flex flex-col animate-pulse">
      <CardHeader className="pb-3 border-b border-zinc-800">
        <Skeleton className="h-5 w-28 mx-auto rounded-full bg-zinc-800" />
        <div className="flex justify-center gap-2 mt-2">
          <Skeleton className="h-5 w-14 rounded-full bg-zinc-800" />
          <Skeleton className="h-5 w-14 rounded-full bg-zinc-800" />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center flex-grow pt-4 gap-4">
        <div className="w-full flex items-center justify-between">
          <Skeleton className="w-24 h-24 rounded-lg bg-zinc-800" />
          <Skeleton className="h-8 w-28 rounded bg-zinc-800" />
        </div>
        <div className="grid grid-cols-2 gap-2 w-full">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-9 rounded bg-zinc-800" />
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-3 border-t border-zinc-800">
        <div className="flex items-center justify-between w-full">
          <Skeleton className="h-4 w-24 rounded-full bg-zinc-800" />
          <Skeleton className="h-5 w-10 rounded bg-zinc-800" />
        </div>
      </CardFooter>
    </Card>
  )
}

export default SkeletonCard