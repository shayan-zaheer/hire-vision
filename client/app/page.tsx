"use client";

import { Compare } from "@/components/ui/compare";
import { FlipWords } from "@/components/ui/flip-words";
import Image from "next/image";

const words = [
    "Top Talent",
    "Streamlined Hiring",
    "New Opportunities",
    "Great Candidates",
];

function page() {
    return (
        <>
            <div className="px-4 sm:px-10 flex flex-col justify-center items-center">
                <div className="flex flex-col-reverse sm:flex-row justify-around items-center w-full min-h-screen">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] animate-gradient bg-clip-text text-transparent text-center sm:text-left">
                        Discover
                        <br />
                        <div className="md:min-w-[20ch] inline-block">
                            <FlipWords
                                words={words}
                                duration={4000}
                                className="bg-gradient-to-r from-[#6A00F4] via-[#D400A5] to-[#00E8FC] animate-gradient bg-clip-text text-transparent"
                            />
                        </div>
                    </h1>
                    <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] relative overflow-hidden">
                        <Image
                            src={"/hero.png"}
                            className="animate-spin-slow object-contain brightness-150"
                            alt={"Hero"}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                </div>
            </div>
            <div className="bg-[rgb(5,0,32)] flex justify-center items-center w-full py-6 px-4">
                <div className="flex flex-col md:flex-row md:justify-around items-center gap-10 w-full min-h-screen">
                    <div className="p-2 border rounded-3xl bg-[rgb(25,23,80)] border-[rgb(25,23,80)]">
                        <Compare
                            firstImage="https://assets.aceternity.com/code-problem.png"
                            secondImage="https://assets.aceternity.com/code-solution.png"
                            firstImageClassName="object-cover object-left-top"
                            secondImageClassname="object-cover object-left-top"
                            className="w-[350px] h-[350px] lg:h-[500px] lg:w-[500px]"
                            slideMode="hover"
                        />
                    </div>
                    <div className="text-center md:text-left max-w-xl px-4 bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] animate-gradient bg-clip-text text-transparent">
                        <h2 className="font-semibold mb-4 text-3xl md:text-4xl">
                            From Tedious to Effortless
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground text-left">
                            Whether you're looking to{" "}
                            <FlipWords
                                words={[
                                    "hire fast",
                                    "scale teams",
                                    "improve interviews",
                                ]}
                            />
                            , HireVision has your back.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default page;
