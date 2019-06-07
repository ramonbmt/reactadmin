interface S3Object {
    bucket: string
    key: string
    localUri: File
    mimeType: string
    region: string
}

declare const createS3Object: (arg: File) => S3Object

export default createS3Object
