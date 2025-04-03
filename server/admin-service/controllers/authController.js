const Admin = require("../models/admin");

exports.register = async (request, response) => {
    try {
        const existingAdmin = await Admin.findOne({where: { email: request.body?.email }});
        if (existingAdmin){
            return response.status(400).json({ message: "Email already in use" });  
        }

        await new Promise((resolve, reject) => {
            upload.single("profileImage")(request, response, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });

        const profileImage = request.file ? request.file.path : null;
        const payload = { ...request.body, profileImage };
        const admin = await Admin.create(payload);

        return response.status(201).json({
            status: "success",
            admin,
        });
    } catch (err) {
        console.error(err);
        return response.status(400).json({
            status: "failure",
            message: err.message,
        });
    }
};