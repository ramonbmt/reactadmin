const TOKEN_KEY = `@${process.env.TOKEN_KEY}/token`

const noop = () => {}

const CLIENT_S3_OBJECT = {
    params: {
        ACL     : 'public-read',
        Bucket  : process.env.S3_BUCKET,
        Expires : 60
    },
    region: process.env.S3_REGION
}

const S3_OBJECT = {
    accessKeyId     : process.env.S3_KEY,
    secretAccessKey : process.env.S3_SECRET,
    params          : {
        Bucket: process.env.S3_BUCKET
    },
    region: process.env.S3_REGION
}

export {
    CLIENT_S3_OBJECT,
    noop,
    S3_OBJECT,
    TOKEN_KEY
}
