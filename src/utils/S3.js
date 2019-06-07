import uuid from 'uuid/v4'
import { CLIENT_S3_OBJECT } from './constants'

const createS3Object = obj => {
    if (!obj) {
        return null
    }
    const {
            name,
            type: mimeType
        } = obj,
        [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(name),
        key = `${uuid()}${extension && '.'}${extension}`
    return {
        bucket   : CLIENT_S3_OBJECT.params.Bucket,
        key,
        localUri : obj,
        mimeType,
        region   : CLIENT_S3_OBJECT.region
    }
}

export default createS3Object
