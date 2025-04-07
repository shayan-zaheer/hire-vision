"use client";

import Card from "@/components/Card";
import { Compare } from "@/components/ui/compare";
import { FlipWords } from "@/components/ui/flip-words";
import ReactLenis from "@studio-freight/react-lenis";

const cards = [
    {
        title: "Efficient Candidate Screening",
        content: "Say goodbye to manual resume reviews. HireVision uses AI to quickly analyze candidate profiles and match them with your job requirements.",
        buttonText: "Start Screening Now"
    }, {
        title: "CV Management Made Easy",
        content: "Easily manage and review candidate CVs in real-time. HireVision's admin interface lets you track, sort, and make decisions faster.",
        buttonText: "Manage CVs"
    }, {
        title: "WA Chatbot for Candidate Interaction",
        content: "With HireVision's WhatsApp integration, candidates can interact with the chatbot to get instant responses to job inquiries and updates.",
        buttonText: "Try the Chatbot"
    }
]

function page() {
    return (
        <ReactLenis root>
            <div className="sm:px-10 flex flex-col justify-center items-center">
                <div className="flex flex-col sm:flex-row sm:justify-center items-center w-full gap-8 py-10">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] animate-gradient bg-clip-text text-transparent text-center sm:text-left"
                    >
                        Discover
                        <br />
                        <div className="min-w-[18ch] inline-block">
                            <FlipWords
                                words={[
                                    "Top Talent",
                                    "Streamlined Hiring",
                                    "New Opportunities",
                                    "Great Candidates",
                                ]}
                                duration={4000}
                                className="bg-gradient-to-r from-[#6A00F4] via-[#D400A5] to-[#00E8FC] animate-gradient bg-clip-text text-transparent"
                            />
                        </div>
                    </h1>
                    <div className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-2xl overflow-hidden brightness-125 contrast-125 saturate-150 hover:brightness-150 hover:contrast-150 hover:scale-105 transition-all duration-300 flex justify-center items-center">
                        <img
                            src="/hero.png"
                            alt="Hero"
                            className="w-full h-full object-contain animate-spin-slow scale-90"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-6 sm:px-10 px-4">
                    {cards.map((card, index) => (
                        <Card key={index} title={card.title} content={card.content} buttonText={card.buttonText}/>
                    ))}
                </div>
            </div>
            <div className="bg-[rgb(5,0,32)] flex justify-center items-center w-full py-6 sm:px-10">
                <div className="flex flex-col md:flex-row md:justify-center items-center gap-8 w-full py-10">
                    <div className="p-2 border rounded-3xl bg-[rgb(25,23,80)] border-[rgb(25,23,80)]">
                        <Compare
                            firstImage="https://assets.aceternity.com/code-problem.png"
                            secondImage="https://assets.aceternity.com/code-solution.png"
                            firstImageClassName="object-cover object-left-top"
                            secondImageClassname="object-cover object-left-top"
                            className="w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] lg:h-[450px] lg:w-[450px]"
                            slideMode="hover"
                        />
                    </div>
                    <div className="text-center md:text-left max-w-xl px-4 bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] animate-gradient bg-clip-text text-transparent">
                        <h2 className="font-semibold mb-4 text-3xl md:text-4xl">
                            From Tedious to Effortless
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground sm:text-left text-center">
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
        </ReactLenis>
    );
}

export default page;
