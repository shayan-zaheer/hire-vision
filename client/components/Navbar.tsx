import ProfileDropdown from "./ProfileDropdown";
import getUserFromCookies from "@/utils/get-user";
import Link from "next/link";

async function Navbar() {
    const userData = await getUserFromCookies();
    const isAuthenticated = !!userData;
    const data = { profile: userData };

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