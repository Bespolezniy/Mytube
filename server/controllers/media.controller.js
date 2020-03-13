import extend from "lodash/extend"
import formidable from "formidable"
import fs from "fs"
import mongoose from "mongoose"

import Media from "../models/media.model"
import errorHandler from "./../helpers/dbErrorHandler"

let gridfs = null
mongoose.connection.on("connected", () => {
  gridfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db)
})

const create = (req, res) => {
  let form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Video could not be uploaded"
      })
    }

    let media = new Media(fields)
    media.postedBy = req.profile

    if (files.video) {
      let writestream = gridfs.openUploadStream(media._id, {
        contentType: files.video.type || "binary/octet-stream"
      })
      fs.createReadStream(files.video.path).pipe(writestream)
    }

    try {
      let result = await media.save()
      res.status(200).json(result)
    }
    catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  })
}

export default {
  create,
}