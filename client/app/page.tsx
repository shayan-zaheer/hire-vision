import React from "react";

function page() {
    // bg-[#f6f6f6]
    // bg-[#14162e]
    return (
        <div className="min-h-screen bg-[#f6f6f6] text-black font-gilroy">
            <h1 className="text-4xl font-bold line-clamp-2">
                Sign In to
                <br /> HireVision
            </h1>
            <div className="flex flex-col mx-20">
                <div className="size-32 bg-[#DDA82A] blur-3xl"></div>
                <div className="size-32 bg-[#4461F2] blur-3xl mx-24"></div>
            </div>
        </div>
    );
}

export default page;
