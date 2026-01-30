import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext
} from "@/components/ui/carousel"
import { MemberCard } from "./MemberCard"

const members: null[] = [null, null, null, null, null];

export function MembersList({ title = "Members" }: { title?: string }) {
    return (
        <div className="col-span-3 mt-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-primary">{title}</h3>
            </div>

            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <div className="absolute right-12 -top-12 flex gap-1">
                    <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-8 w-8 border-none hover:bg-slate-100 text-primary/70 hover:text-primary" />
                    <CarouselNext className="relative right-0 bottom-0 top-0 translate-y-0 h-8 w-8 border-none hover:bg-slate-100 text-primary/70 hover:text-primary" />
                </div>

                <CarouselContent className="-ml-6">
                    {members.map((_, i) => (
                        <CarouselItem key={i} className="pl-6 lg:basis-1/2">
                            <MemberCard member={{
                                name: "Ali",
                                role: "Frontend Developer",
                                bio: "I am a frontend developer with 2 years of experience in web development.",
                                tasks: 10,
                                rating: 5,
                                image: "https://github.com/shadcn.png"
                            }}
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    )
}
