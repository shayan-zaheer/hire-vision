const {
	BlobServiceClient,
	StorageSharedKeyCredential,
	generateBlobSASQueryParameters,
	BlobSASPermissions,
} = require("@azure/storage-blob");

const accountName = process.env.AZURE_STORAGE_ACC;
const accountKey = process.env.AZURE_STORAGE_KEY;
const containerName = process.env.AZURE_BLOB_NAME;

const sharedKeyCredential = new StorageSharedKeyCredential(
	accountName,
	accountKey
);

const blobServiceClient = new BlobServiceClient(
	`https://${accountName}.blob.core.windows.net`,
	sharedKeyCredential
);

const containerClient = blobServiceClient.getContainerClient(containerName);

module.exports = {sharedKeyCredential, blobServiceClient, containerClient, containerName};