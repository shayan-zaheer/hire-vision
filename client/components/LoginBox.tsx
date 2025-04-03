"use client";
import Image from "next/image";

function LoginBox() {
    const handleGoogle = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
    };
    
    const handleGithub = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/github`;
    };

    return (
        <div className="font-gilroy flex flex-col gap-4 text-[#4F555A]">
            <input
                className="p-2 w-64 rounded-lg bg-[#EAF0F7] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Enter Email"
            />
            <input
                className="p-2 w-64 rounded-lg bg-[#EAF0F7] font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="*********"
            />

            <button
                type="submit"
                className="bg-blue-500 w-64 text-white font-semibold p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Sign Up
            </button>

            <div className="flex items-center justify-center space-x-4">
                <hr className="border-0 h-px bg-[#EAF0F7] flex-1" />
                <p className="text-xs text-white">Or continue with</p>
                <hr className="border-0 h-px bg-[#EAF0F7] flex-1" />
            </div>

            <div className="flex items-center justify-center space-x-4">
                <button
                    onClick={handleGoogle}
                    className="bg-[#EAF0F7] px-8 py-2 rounded-lg"
                    aria-label="Sign in with Google"
                >
                    <Image src="/g.png" width={16} height={16} alt="Google" />
                </button>
                <button
                    onClick={handleGithub}
                    className="bg-[#EAF0F7] px-8 py-2 rounded-lg"
                    aria-label="Sign in with GitHub"
                >
                    <Image src="/git.png" width={16} height={16} alt="GitHub" />
                </button>
            </div>
        </div>
    );
}

export default LoginBox;
