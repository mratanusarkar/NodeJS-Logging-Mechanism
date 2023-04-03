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

/**
 * 
 * @param { String } blobRoot the root of the blob file structure. expected format: `project/repo`
 * @param { String } logFilename the log file name should be in the format: `logDir/YYYY-MM-DD-HH-fileName`
 */
async function toAzBlob(blobRoot, logFilename) {
    try {
        let nameSplit = (logFilename.split(`logFiles${path.sep}`)[1].split("-"));
        let _L_YY = nameSplit[0];
        let _L_MM = nameSplit[1];
        let _L_DD = nameSplit[2];
        let _L_TYPE = nameSplit[nameSplit.length-1];    // log type: use it in future if required. (eg: split error and combo logs into different places)
        const blobFullPath = `${blobRoot}/${_L_YY}/${_L_MM}/${_L_DD}/${uid}/${nameSplit.join("-")}`;
        
        const data = fs.readFileSync(path.resolve(logFilename), 'utf8');
        uploadFileString(containerName, blobFullPath, data).then((value) => {
            console.log(value);
            return {
                success: true,
                message: "transfer to azure blob completed"
            }
        }).catch((reason) => {
            console.log(reason);
            return {
                success: false,
                message: "ERROR: transfer to azure blob failed!"
            }
        });
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "ERROR: issue occurred while reading the log file and preparing the blob path!"
        }
    }
}


module.exports.toAzBlob = toAzBlob;
