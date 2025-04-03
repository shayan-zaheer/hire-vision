function cleanJobDescription(description) {
    return description.replace(/\r\n|\r|\n/g, ' ').replace(/\s+/g, ' ').trim();
}

function extractPublicId(cloudinaryUrl) {
    const regex = /\/upload\/(?:v\d+\/)?(.+?)(\.[^./]+)?$/;
    const match = cloudinaryUrl.match(regex);
    return match ? match[1] : null;
}

module.exports = {cleanJobDescription, extractPublicId};