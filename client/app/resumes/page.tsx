import Navbar from "@/components/Navbar";

function page() {
    return (
        <div className="bg-[#14162e] text-white font-gilroy">
            <Navbar />
            <div className="min-h-[90vh] flex flex-col items-center">
                <h1 className="text-5xl font-bold mt-8">Review Resumes</h1>
                <div className="w-full max-w-4xl mt-8 space-y-4">
                    <div className="bg-[#1b1f3a] p-6 rounded-md shadow-md">
                        <h2 className="text-2xl font-semibold mb-4">Submitted Resumes</h2>
                        <ul className="space-y-4">
                            <li className="p-4 bg-[#14162e] rounded-md flex justify-between items-center">
                                <div>
                                    <h3 className="text-lg font-bold">John Doe</h3>
                                    <p className="text-sm text-gray-400">Frontend Developer Application</p>
                                </div>
                                <div className="flex space-x-2">
                                    <button className="px-4 py-2 bg-[#4461F2] rounded-md font-semibold hover:bg-[#3651c2] transition">
                                        View Resume
                                    </button>
                                    <button className="px-4 py-2 bg-red-600 rounded-md font-semibold hover:bg-red-500 transition">
                                        Reject
                                    </button>
                                    <button className="px-4 py-2 bg-[#DDA82A] rounded-md font-semibold hover:bg-[#c38d25] transition">
                                        Approve
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default page;
