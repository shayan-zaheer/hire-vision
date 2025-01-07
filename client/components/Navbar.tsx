import Link from "next/link";
import { headers } from "next/headers";
import ProfileDropdown from "./ProfileDropdown";

async function fetchStatus() {
    try {
        const headersList = await headers();
        const cookies = headersList.get("cookie") || "";

        const response = await fetch("http://localhost:8000/auth/status", {
            headers: {
                Cookie: cookies,
            },
            cache: "no-cache",
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error("Error fetching status:", error);
        return { status: "unauthenticated", profile: null };
    }
}

async function Navbar() {
    let data;
    try {
        data = await fetchStatus();
    } catch (error) {
        console.error("Failed to fetch status:", error);
        data = { status: "unauthenticated", profile: null };
    }

    console.log(data);

    const isAuthenticated = data?.status === "authenticated";

    return (
        <nav className="h-[10vh] flex justify-between px-6 bg-[#14162e] text-white font-gilroy max-sm:text-sm">
            <ul className="flex items-center gap-4">
                {isAuthenticated && (
                    <>
                        <li>
                            <Link
                                href="/dashboard"
                                className="hover:underline hover:text-gray-300 transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/jobs"
                                className="hover:underline hover:text-gray-300 transition-colors duration-200"
                            >
                                Jobs
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/resumes"
                                className="hover:underline hover:text-gray-300 transition-colors duration-200"
                            >
                                Resumes
                            </Link>
                        </li>
                   </>
                )}
            </ul>
            <ul className="flex items-center gap-4">
                {isAuthenticated ? (
                    <ProfileDropdown profile={data.profile} />
                ) : (
                    <>
                        <li>
                            <Link
                                href="/login"
                                className="hover:underline hover:text-gray-300 transition-colors duration-200"
                            >
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/signup"
                                className="hover:underline hover:text-gray-300 transition-colors duration-200"
                            >
                                Signup
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;