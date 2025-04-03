import { cookies } from "next/headers";

async function getUserFromCookies() {
    const cookieStore = await cookies();
    const userCookie = cookieStore.get("user");

    if (userCookie) {
        try {
            return JSON.parse(decodeURIComponent(userCookie.value));
        } catch (error) {
            console.error("Error parsing user cookie:", error);
            return null;
        }
    }

    return null;
}

export default getUserFromCookies;
