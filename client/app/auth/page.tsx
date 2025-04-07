"use client";

import ReactLenis from "@studio-freight/react-lenis";
import { Eye, Mail } from "lucide-react";

function page() {
    return (
        <ReactLenis root>
            <div className="relative grid grid-cols-1 sm:grid-cols-[60%_40%] items-center bg-[#160430] text-white min-h-screen font-poppins">
                <img
                    src="world.png"
                    alt="World"
                    className="w-full h-full object-cover sm:[mask-image:linear-gradient(to_right,black_80%,transparent_100%)] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)] absolute top-0 left-0 z-0 sm:static"
                />
                <div className="flex flex-col sm:items-start p-8 text-left gap-4 relative z-10 sm:static items-center text-shadow-lg">
                    <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
                        SIGN IN
                    </h1>
                    <p>Sign In with Email Address</p>
                    <div className="relative w-full">
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-lg rounded-md border border-white/20 shadow-lg text-white placeholder-white/50 focus:outline-none text-sm"
                        />
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                    </div>
                    <div className="relative w-full">
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-lg rounded-md border border-white/20 shadow-lg text-white placeholder-white/50 focus:outline-none text-sm"
                        />
                        <Eye className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
                    </div>
                    <button className="animate-gradient bg-gradient-to-r w-full from-[#00E8FC] via-[#D400A5] to-[#6A00F4] py-2 rounded-md">
                        Sign In
                    </button>
                    <div className="flex items-center gap-4 w-full">
                        <hr className="flex-1 h-px bg-white/20 border-0" />
                        <p className="text-sm whitespace-nowrap">
                            Or continue with
                        </p>
                        <hr className="flex-1 h-px bg-white/20 border-0" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 w-full gap-2">
                        <div className="relative w-full">
                            <button className="bg-white/10 backdrop-blur-lg rounded-md border border-white/20 shadow-lg py-2 w-full">
                                Google
                            </button>
                            <img
                                src="g.png"
                                alt=""
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                            />
                        </div>
                        <div className="relative w-full">
                            <button className="bg-white/10 backdrop-blur-lg rounded-md border border-white/20 shadow-lg py-2 w-full">
                                GitHub
                            </button>
                            <img
                                src="git.png"
                                alt=""
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"
                            />
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10" />
            </div>
        </ReactLenis>
    );
}

export default page;
