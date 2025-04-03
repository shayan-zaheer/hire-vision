import Modal from "@/components/Modal";
import { headers } from "next/headers";
import Link from "next/link";
import axios from "axios";
import handleResumeAction from "../actions";

interface Applicant {
    _id: string;
    name: string;
    email: string;
    job: Job;
    resumeLink: string;
    goodPoints: string[];
    improvementAreas: string[];
    score: number;
}

interface Job {
    title: string;
}

async function getApplicants() {
    try {
        const headersList = await headers();
        const cookies = headersList.get("cookie") || "";

        const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/applicants`,
            {
                headers: {
                    Cookie: cookies,
                },
                withCredentials: true,
            }
        );

        if (response.status !== 200) {
            throw new Error(
                `Failed to retrieve resumes: ${response.statusText}`
            );
        }

        return response.data?.applicants || [];
    } catch (err) {
        console.error(err);
        return [];
    }
}

function ResumeReview({ applicant }: { applicant: Applicant }) {
    return (
        <div className="flex flex-col lg:flex-row bg-white rounded-xl overflow-x-hidden shadow-2xl w-full h-full">
            <div className="bg-gradient-to-br from-[#6D28D9] to-[#8B5CF6] p-8 flex flex-col justify-between text-white lg:w-1/3">
                <div>
                    <h2 className="text-3xl font-bold mb-4">Resume Review</h2>
                    <div className="mb-6">
                        <h3 className="text-xl font-semibold mb-3">
                            Overall Score
                        </h3>
                        <div className="w-24 h-24 flex items-center justify-center bg-white/10 rounded-full shadow-lg">
                            <p className="text-4xl font-bold">
                                {applicant?.score}%
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-4">
                    <Link
                        href={`?modal=resume&applicantId=${applicant._id}`}
                        className="px-6 py-3 bg-white/10 rounded-lg font-semibold text-center hover:bg-white/20 transition-all"
                    >
                        ← Back
                    </Link>
                    <form
                        action={handleResumeAction}
                        
                    >
                        <input
                            type="hidden"
                            name="applicantId"
                            value={applicant._id}
                        />
                            <input type="hidden" name="action" value="reject" />

                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-red-500 rounded-lg font-semibold hover:bg-red-600 transition-all"
                        >
                            Reject
                        </button>
                    </form>
                    <form
                        action={handleResumeAction}
                        
                    >
                        <input
                            type="hidden"
                            name="applicantId"
                            value={applicant._id}
                        />
                            <input type="hidden" name="action" value="accept" />

                        <button
                            type="submit"
                            className="w-full px-6 py-3 bg-green-500 rounded-lg font-semibold hover:bg-green-600 transition-all"
                        >
                            Approve
                        </button>
                    </form>
                </div>
            </div>

            <div className="p-8">
                <div className="mb-8">
                    <h3 className="text-2xl font-bold text-[#6D28D9] mb-4">
                        Good Points
                    </h3>
                    <ul className="space-y-3">
                        {applicant?.goodPoints?.map((point, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-green-500 mr-3">✔</span>
                                <span className="text-gray-700">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-[#6D28D9] mb-4">
                        Areas for Improvement
                    </h3>
                    <ul className="space-y-3">
                        {applicant?.improvementAreas?.map((point, index) => (
                            <li key={index} className="flex items-start">
                                <span className="text-red-500 mr-3">✘</span>
                                <span className="text-gray-700">{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

function ResumeViewer({ applicant }: { applicant: Applicant }) {
    console.log(applicant);
    return (
        <div className="flex flex-col items-center h-full w-full">
            <iframe
                className="h-full w-full border-none rounded-lg"
                src={`${applicant?.resumeLink}`}
            />
            <Link
                href={`?modal=resume&applicantId=${applicant._id}&view=review`}
                className="mt-4 px-4 py-2 bg-[#4461F2] rounded-md font-semibold hover:bg-[#3651c2] transition"
            >
                Next →
            </Link>
        </div>
    );
}

export default async function Resumes({ searchParams }) {
    const applicants = await getApplicants();
    const selectedApplicantId = (await searchParams).applicantId;

    const isModalOpen = (await searchParams).modal === "resume";
    const showReview = isModalOpen && (await searchParams).view === "review";

    return (
        <div className="min-h-[90vh] flex flex-col items-center">
            <h1 className="text-5xl font-bold mt-8">Review Resumes</h1>
            <div className="w-full max-w-4xl mt-8 space-y-4">
                <div className="bg-[#1b1f3a] p-6 rounded-md shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">
                        Submitted Resumes
                    </h2>
                    <ul className="space-y-4">
                        {applicants?.map((applicant: Applicant) => {
                            return (
                                <li
                                    key={applicant?._id}
                                    className="p-4 bg-[#14162e] rounded-md flex justify-between items-center"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold">
                                            {applicant?.name}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            {applicant?.job?.title}
                                        </p>
                                    </div>
                                    {isModalOpen &&
                                        selectedApplicantId ===
                                            applicant._id && (
                                            <Modal>
                                                {!showReview ? (
                                                    <ResumeViewer
                                                        applicant={applicant}
                                                    />
                                                ) : (
                                                    <ResumeReview
                                                        applicant={applicant}
                                                    />
                                                )}
                                            </Modal>
                                        )}
                                    <div className="flex space-x-2">
                                        <Link
                                            href={`?modal=resume&applicantId=${applicant._id}`}
                                        >
                                            <button className="px-4 py-2 bg-[#4461F2] rounded-md font-semibold hover:bg-[#3651c2] transition">
                                                View Resume
                                            </button>
                                        </Link>
                                        <form
                                            action={handleResumeAction}
                                            
                                        >
                                            <input
                                                type="hidden"
                                                name="applicantId"
                                                value={applicant._id}
                                            />
                                                <input type="hidden" name="action" value="reject" />

                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-red-600 rounded-md font-semibold hover:bg-red-500 transition"
                                            >
                                                Reject
                                            </button>
                                        </form>
                                        <form
                                            action={handleResumeAction}
                                            
                                        >
                                            <input
                                                type="hidden"
                                                name="applicantId"
                                                value={applicant._id}
                                            />
                                                <input type="hidden" name="action" value="accept" />

                                            <button
                                                type="submit"
                                                className="px-4 py-2 bg-[#DDA82A] rounded-md font-semibold hover:bg-[#c38d25] transition"
                                            >
                                                Approve
                                            </button>
                                        </form>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
}
