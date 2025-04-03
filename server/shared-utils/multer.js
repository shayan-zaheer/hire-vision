const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const UPLOADCARE_PUBLIC_KEY = process.env.UPLOADCARE_PUBLIC_KEY;
const WHATSAPP_TOKEN = process.env.WHATSAPP_TOKEN;

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const uploadToUploadcare = async (fileBuffer) => {
    try {
        const formData = new FormData();
        formData.append("UPLOADCARE_PUB_KEY", UPLOADCARE_PUBLIC_KEY);
        formData.append("file", fileBuffer, { filename: "document.pdf" });

        const response = await axios.post("https://upload.uploadcare.com/base/", formData, {
            headers: formData.getHeaders(),
        });

        if (!response.data.file) throw new Error("Upload to Uploadcare failed");

        return `https://ucarecdn.com/${response.data.file}/-/inline/yes/`; // st0ring uuid to fetch later in frontend
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const fetchAndUploadFile = async (fileId) => {
    try {
        const linkResponse = await axios.get(`https://graph.facebook.com/v21.0/${fileId}`, {
            headers: {
                Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            },
        });

        const fileUrl = linkResponse?.data?.url;
        if (!fileUrl) throw new Error("File URL not found");

        const fileResponse = await axios.get(fileUrl, {
            headers: {
                Authorization: `Bearer ${WHATSAPP_TOKEN}`,
            },
            responseType: "arraybuffer",
        });

        const fileBuffer = Buffer.from(fileResponse.data);

        const uploadcareUrl = await uploadToUploadcare(fileBuffer);
        console.log("Uploaded to Uploadcare:", uploadcareUrl);

        return uploadcareUrl;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = {
    upload,
    fetchAndUploadFile,
};
