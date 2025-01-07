function cleanJobDescription(description) {
    return description.replace(/\r\n|\r|\n/g, ' ').replace(/\s+/g, ' ').trim();
}

module.exports = {cleanJobDescription};