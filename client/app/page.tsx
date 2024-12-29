import LoginBox from "@/components/LoginBox";

function page() {
    return (
        <div className="min-h-screen bg-[#14162e] text-white font-gilroy flex justify-center items-center ">
            <div className="flex items-center justify-around space-x-5">
                <div>
                    <div className="flex justify-center items-center">
                        <div className="relative">
                            <div className="size-32 bg-[#DDA82A] blur-3xl"></div>
                            <div className="size-32 bg-[#4461F2] blur-3xl mx-24"></div>
                        </div>
                        <h1 className="text-5xl font-bold line-clamp-2 absolute z-10 max-w-sm leading-snug">
                            Sign In to HireVision
                        </h1>
                    </div>
                </div>
                <img src="/man.png" className="max-w-sm mt-24" alt="" />
                <LoginBox />
            </div>
        </div>
    );
}

export default page;
