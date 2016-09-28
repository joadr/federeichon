import _ from 'underscore'
import { Tracker } from 'meteor/tracker'

export const deleteFunction = function ({ file, onReady, onError }) {
  S3.delete(file.meta.s3Path, function (error, result) {
    if (error) {
      onError('Ocurrió un error al eliminar el archivo')
      console.log(error)
    } else {
      onReady()
    }
  })
}

export const uploadFunction = function ({ file, onProgress, onReady, onError }) {
  const uploader = _.uniqueId('uploader')

  S3.upload({
    files: [file],
    path: 'profile',
    uploader: uploader
  }, function (error, result) {
    if (error) {
      onError('Error subiendo el archivo')
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

function analizeColorFromBase64 (base64) {
  var image = new Image()
  image.src = base64
  var width = image.naturalWidth
  var height = image.naturalHeight

  return {
    width: width,
    height: height
  }
}

function getBase64Image (file, callback) {
  var FR = new FileReader()
  FR.onload = function (e) {
    callback(e.target.result)
  }
  FR.readAsDataURL(file)
}
