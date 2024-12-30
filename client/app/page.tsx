import LoginBox from "@/components/LoginBox";
import Navbar from "@/components/Navbar";

function page() {
    return (
        <div className="bg-[#14162e] text-white font-gilroy ">
            <Navbar />
            <div className="min-h-[90vh] flex items-center justify-around">
                <div className="flex ">
                    <div className="relative">
                        <div className="size-32 bg-[#DDA82A] blur-3xl"></div>
                        <div className="size-32 bg-[#4461F2] blur-3xl mx-24"></div>
                    </div>
                    <h1 className="text-5xl font-bold absolute z-10 max-w-sm leading-snug">
                        Sign In to HireVision
                    </h1>
                </div>
                <img src="/man.png" className="absolute max-w-sm mt-24" alt="" />
                <LoginBox />
            </div>
        </div>
    );
}

export default page;
