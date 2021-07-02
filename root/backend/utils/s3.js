require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
});

// uploads a file to s3
function uploadFile(filePath, fileName) {
    const fileStream = fs.createReadStream(filePath);

    const uploadParams = {
        Bucket: bucketName,
        Body: fileStream,
        Key: fileName,
    };

    console.log(uploadParams);

    return s3.upload(uploadParams).promise();
}
exports.uploadFile = uploadFile;

// downloads a file from s3
function getFileStream(fileKey) {
    const downloadParams = {
        Key: fileKey,
        Bucket: bucketName,
    };

    console.log(fileKey);

    return s3.getObject(downloadParams).createReadStream();
}
exports.getFileStream = getFileStream;
