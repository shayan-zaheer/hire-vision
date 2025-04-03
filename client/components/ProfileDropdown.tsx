"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Profile{
    _id: string,
    displayName: string,
    email: string,
    profilePhoto: string,
    provider: string,
    providerId: string,
};

export default function ProfileDropdown({ profile } : {profile: Profile}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    return (
        <div className="relative">
            <div onClick={toggleDropdown} className="cursor-pointer">
                <Image
                    src={profile?.profilePhoto}
                    width={40}
                    height={40}
                    alt="profile"
                    className="max-sm:size-8 rounded-full object-cover border border-green-500"
                />
            </div>

            {isDropdownOpen && (
                <div
                    className="absolute right-0 mt-2 w-64 bg-[#1b1f3a] text-white rounded-lg shadow-lg"
                >
                    <div className="px-4 py-2">
                        <p className="font-medium">{profile?.displayName || "No name"}</p>
                        <p className="text-sm text-gray-500">{profile?.email || "No email"}</p>
                    </div>
                    <hr className="border-gray-200" />
                    <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm hover:bg-[#646fb3]"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/resumes"
                        className="block px-4 py-2 text-sm hover:bg-[#646fb3]"
                    >
                        Resumes
                    </Link>
                    <Link
                        href="http://localhost:8000/auth/logout"
                        className="block px-4 py-2 text-sm hover:bg-[#646fb3]"
                    >
                        Logout
                    </Link>
                </div>
            )}
        </div>
    );
}
