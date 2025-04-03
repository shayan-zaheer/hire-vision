import axios from "axios";

const handleResumeAction = async (formData: FormData) => {
    "use server";
    try {
        const applicantId = formData.get("applicantId") as string;
        const action = formData.get("action") as string;

        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/${action}-resume/${applicantId}`, {}, {
            withCredentials: true,
        });
    } catch (error) {
        console.error("Error:", error);
    }
};

export default handleResumeAction;