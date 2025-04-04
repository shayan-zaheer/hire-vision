// "use client";

// import { FlipWords } from "@/components/ui/flip-words";
// import Image from "next/image";

// const words = ["Top Talent", "Streamlined Hiring", "New Opportunities", "Great Candidates"];

// function page() {
//     return (
//         <div className="py-6 px-10 min-h-screen flex sm:justify-between items-center flex-col sm:flex-row">
//             <h1 className="text-xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] animate-gradient bg-clip-text text-transparent">
//                 Discover
//                 <br />
//                 <FlipWords
//                     words={words}
//                     duration={4000}
//                     className="bg-gradient-to-r from-[#6A00F4] via-[#D400A5] to-[#00E8FC] animate-gradient bg-clip-text text-transparent"
//                 />
//             </h1>
//             <div className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px] overflow-hidden mt-8 sm:mt-0 sm:ml-8">
//                 <Image
//                     src={"/hero.png"}
//                     className="animate-spin-slow object-contain brightness-150"
//                     alt={"Hero"}
//                     width={500}
//                     height={500}
//                 />
//             </div>
//         </div>
//     );
// }

// export default page;

"use client";

import { FlipWords } from "@/components/ui/flip-words";
import Image from "next/image";

const words = ["Top Talent", "Streamlined Hiring", "New Opportunities", "Great Candidates"];

function page() {
    return (
        <div className="py-6 px-10 min-h-screen flex justify-center items-center">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:w-full w-auto">
                <h1 className="text-xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-[#00E8FC] via-[#D400A5] to-[#6A00F4] animate-gradient bg-clip-text text-transparent text-center sm:text-left">
                    Discover
                    <br />
                    <FlipWords
                        words={words}
                        duration={4000}
                        className="bg-gradient-to-r from-[#6A00F4] via-[#D400A5] to-[#00E8FC] animate-gradient bg-clip-text text-transparent"
                    />
                </h1>
                    <Image
                        src={"/hero.png"}
                        className="animate-spin-slow object-contain brightness-150 overflow-hidden"
                        alt={"Hero"}
                        width={500}
                        height={500}
                    />
            </div>
        </div>
    );
}

export default page;
