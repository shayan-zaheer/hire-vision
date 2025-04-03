import LoginBox from "@/components/LoginBox";

function page() {
    return (
        <div className="min-h-[90vh] flex max-sm:flex-col items-center justify-around max-sm:justify-center">
            <div className="flex ">
                <div className="relative max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center">
                    <div className="max-sm:size-20 size-32 bg-[#DDA82A] blur-3xl"></div>
                    <div className="max-sm:size-20 size-32 bg-[#4461F2] blur-3xl mx-24"></div>
                </div>
                <h1 className="text-5xl font-bold absolute z-10 leading-snug max-sm:text-center max-sm:top-1/4 max-sm:left-1/2 max-sm:-translate-x-1/2">
                    Sign In to <br /> HireVision
                </h1>
            </div>
            <img
                src="/man.png"
                className="absolute max-w-sm mt-24 sm:hidden max-sm:top-0 max-sm:w-64 xl:block"
                alt=""
            />
            <LoginBox />
        </div>
    );
}

export default page;
