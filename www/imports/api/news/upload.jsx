import _ from 'underscore'
import { Tracker } from 'meteor/tracker'

export const uploadFunction = function ({ file, onProgress, onReady, onError }) {
  const uploader = _.uniqueId('uploader')

  S3.upload({
    files: [file],
    path: 'uploads',
    uploader: uploader
  }, function (error, result) {
    if (error) {
      Error('Error subiendo el archivo')
      console.log(error)
    } else {
      onReady({
        url: result.secure_url,
        meta: { s3Path: result.relative_url }
      })
    }
  })

  Tracker.autorun(function () {
    const file = S3.collection.findOne({ uploader })
    if (file) {
      onProgress(file.percent_uploaded * 0.01)
    }
  })
}

export const deleteFunction = function ({ file, onReady, onError }) {
  global.S3.delete(file.meta.s3Path, function (error, result) {
    if (error) {
      onError('Ocurrió un error al eliminar el archivo')
      console.log(error)
    } else {
      onReady()
    }
  })
}
