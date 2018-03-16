const Multer = require('multer');
const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
});

const storage = require('@google-cloud/storage');
const fs = require('fs')
const serviceKey = require('../../serviceKey')
const gcs = storage({
  projectId: serviceKey.project_id,
  keyFilename: '../../serviceKey.json'
});

const bucketName = serviceKey.project_id
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

uploadToGcs = (req, res, next) => {
  if(!req.file) {
    console.log("no file")
    return next();
  }

  // Can optionally add a path to the gcsname below by concatenating it before the filename
  const gcsname = req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
    next();
  });

  stream.end(req.file.buffer);
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
exports.upload = [multer.single('file'), uploadToGcs, function (req, res) {
  const data = req.body;
  if (req.file && req.file.cloudStoragePublicUrl) {
    data.imageUrl = req.file.cloudStoragePublicUrl
  }

  res.send(data);
}]