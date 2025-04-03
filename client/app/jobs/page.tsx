import { revalidatePath } from "next/cache";
import Form from "next/form";
import { headers } from "next/headers";
import { v4 as uuidv4 } from 'uuid';

interface Job {
    _id: string;
    title: string;
    description: string;
}

async function page() {
    const addData = async (formData: FormData) => {
        "use server";
        try {
            const title = formData.get("title");
            const jobDescription = formData.get("description");

            const headersList = await headers();
            const cookies = headersList.get("cookie") || "";

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/add-job`,
                {
                    method: "POST",
                    headers: {
                        Cookie: cookies,
                        "Content-Type": "application/json",
                    },
                    cache: "no-cache",
                    body: JSON.stringify({
                        jobId: uuidv4(),
                        jobDescription,
                        title,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error(`Failed to save job: ${response.statusText}`);
            }

            const result = await response.json();
            revalidatePath("/admin/jobs");
        } catch (err) {
            console.error(err);
        }
    };

    const getAllJobs = async () => {
        try {
            const headersList = await headers();
            const cookies = headersList.get("cookie") || "";

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/all-jobs`,
                {
                    headers: {
                        Cookie: cookies,
                    },
                    cache: "no-cache",
                }
            );

            if (!response.ok) {
                throw new Error(
                    `Failed to retrieve jobs: ${response.statusText}`
                );
            }

            return response.json();
        } catch (err) {
            console.error(err);
        }
    };

    let { jobs } = await getAllJobs();
    console.log(jobs);

    return (
            <div className="min-h-[90vh] flex flex-col items-center px-4 sm:px-10 py-6">
                <h1 className="text-3xl sm:text-5xl font-bold mt-4 sm:mt-8 text-center">
                    Manage Jobs
                </h1>
                <div className="w-full max-w-2xl sm:max-w-4xl mt-6 sm:mt-8 space-y-6">
                    <div className="bg-[#1b1f3a] p-4 sm:p-6 rounded-md shadow-md">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
                            Create / Update Job
                        </h2>
                        <Form action={addData} className="space-y-4">
                            <input
                                type="text"
                                name="title"
                                placeholder="Job Title"
                                className="w-full p-2 sm:p-3 bg-[#14162e] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4461F2]"
                            />
                            <textarea
                                placeholder="Job Description"
                                name="description"
                                rows={4}
                                className="w-full p-2 sm:p-3 bg-[#14162e] border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4461F2]"
                            ></textarea>
                            <button
                                type="submit"
                                className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-[#4461F2] rounded-md font-semibold hover:bg-[#3651c2] transition"
                            >
                                Save Job
                            </button>
                        </Form>
                    </div>

                    <div className="bg-[#1b1f3a] p-4 sm:p-6 rounded-md shadow-md">
                        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center sm:text-left">
                            Existing Jobs
                        </h2>
                        <ul className="space-y-4">
                            {jobs?.length != 0 ? (
                                jobs.map((job: Job) => (
                                    <li
                                        className="p-4 bg-[#14162e] rounded-md flex flex-col sm:flex-row sm:justify-between sm:items-center"
                                        key={job?._id}
                                    >
                                        <div className="text-center sm:text-left">
                                            <h3 className="text-lg font-bold">
                                                {job?.title}
                                            </h3>
                                            <h2 className="text-sm font-semibold italic">
                                                Job Description:
                                            </h2>
                                            <p className="text-sm text-justify sm:pr-8 text-gray-400">
                                                {job?.description}
                                            </p>
                                            <h2 className="text-sm font-semibold italic">
                                                Requirements:
                                            </h2>
                                        </div>
                                        <div className="flex justify-center sm:justify-between space-x-2 mt-4 sm:mt-0">
                                            <button className="px-4 py-2 bg-[#DDA82A] rounded-md font-semibold hover:bg-[#c38d25] transition">
                                                Edit
                                            </button>
                                            <button className="px-4 py-2 bg-red-600 rounded-md font-semibold hover:bg-red-500 transition">
                                                Delete
                                            </button>
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <li className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
                                    You haven't added any jobs yet!
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
    );
}

export default page;
