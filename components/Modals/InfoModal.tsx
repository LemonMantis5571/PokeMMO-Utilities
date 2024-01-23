
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'


const InfoModal = () => {
    return (
        <Dialog >
            <DialogTrigger asChild className='flex flex-wrap m-auto mb-5'>
                <Button className='rounded'>INFO</Button>
            </DialogTrigger>
            <DialogContent className='flex flex-wrap' >
                <DialogHeader>
                    <DialogTitle>General Info</DialogTitle>
                    <DialogDescription>
                        <ul className='gap-2 flex flex-col flex-wrap p-4'>
                            <li>
                                <p>
                                    Evs & Nature are up to the player due to being really costly and not beginner friendly.
                                </p>
                            </li>
                            <li>
                                <p>
                                    The database such as pokemon, abilities and tiers are up to Dec 13th, if any mistake please make an issue
                                    or a PR will be super apreciated, I had mocked the data from pokemmo shout wiki big thanks to them.
                                </p>
                            </li>
                        </ul>
                    </DialogDescription>
                    <DialogTitle>Rules</DialogTitle>
                    <DialogDescription>
                        <ul className='gap-2 flex flex-col p-4'>
                            <li>
                                <p>
                                    Moves that are not available for x or y reason can be changed.
                                </p>
                            </li>
                            <li>
                                <p>
                                    If there are 2 pokemon of the same species, you can reroll or change that pokemon for a new one.
                                </p>
                            </li>
                            <li>
                                <p>
                                    Items are interchangeable between pokemon
                                    eg: Garchomp w/ whiteherb can change its item to pikachu with choice band.
                                </p>
                            </li>
                        </ul>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <p>Made by LemonMantis5571</p>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default InfoModal