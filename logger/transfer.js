const fs = require('fs');
const path = require('path')
const { v4: uuidv4 } = require('uuid');
const { BlobServiceClient } = require("@azure/storage-blob");

// Azure metadata
let uid = uuidv4(); // ideally get pod-name or pod-id
let containerName = "winston-logs"

const connectionString = process.env.BLOB_CONNSTR;
const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);


/* Promise for upload file to blob */
async function uploadFileString(containerName, fileName, fileString) {
    /*
    * containerName: string containing the name of the Azure Storage Container
    * fileName: (blobName) string containing the full file path with file name
    * fileString: (content) string containing file content in serialized String format
    */
    return new Promise(async (resolve, reject) => {
        try {
            const containerClient = blobServiceClient.getContainerClient(containerName);
            const blockBlobClient = containerClient.getBlockBlobClient(fileName);
            const uploadBlobResponse = await blockBlobClient.upload(fileString, fileString.length);

            resolve({
                success: true,
                message: `Successfully uploaded File '${fileName}' to Azure Blob storage: ${containerName}`,
                requestId: uploadBlobResponse.requestId,
                httpResponse: uploadBlobResponse._response.status,
                uploadResponse: uploadBlobResponse
            });
        }
        catch (err) {
            reject({
                success: false,
                error: err,
                message: `Failed to upload ${fileName} to Azure Blob storage: ${containerName}`
            });
        }
    });
}


module.exports.uploadFileString = uploadFileString;
