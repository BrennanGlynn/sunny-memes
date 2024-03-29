const Meme = require("./meme.model");

// Multer takes incoming files and attaches them to req.files
// Fields are under req.body
const Multer = require('multer');
const multer = Multer({
  storage: Multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
});

// Set up google cloud storage with credentials
// Requires the secret serviceKey.json file in the project root
const storage = require('@google-cloud/storage');
const gcs = storage({
  projectId: 'sunny-memes',
  keyFilename: './serviceKey.json'
});
const bucketName = 'sunny-memes.appspot.com'
const bucket = gcs.bucket(bucketName);

function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${bucketName}/${filename}`;
}

uploadToGcs = (req, res, next) => {
  if(!req.file) {
    return next();
  }

  // Can optionally add a path to the gcsname below by concatenating it before the filename
  const gcsname = Date.now() + req.file.originalname;
  const file = bucket.file(gcsname);

  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype
    }
  });

  stream.on('error', (err) => {
    console.log(err)
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
    let memeData = {
      title: data.title,
      fileName: req.file.cloudStorageObject,
      url: data.imageUrl,
      uploaded_by: req.user._id,
      characters: req.body.characters ? req.body.characters.split(',') : []
    };

    // Store memes in database
    Meme.create(memeData, function (err, meme) {
      if (err) {
        console.log(err);
        return res.status(500).send({err: 'Error creating memes: '});
      }
      return res.json({meme});
    });
  }

}]

exports.destroy = (req, res) => {

  // get details about memes getting deleted
  Meme.findOne({_id: req.params.id}, function (err, meme) {
    if (meme) {
      // if authorized
      if (JSON.stringify(req.user._id) ===  JSON.stringify(meme.uploaded_by) || req.user.admin) {
        // delete memes
        Meme.remove({_id: req.params.id}, function (err, result) {
          if (err) console.log(err)

          // remove image from server
          let file = bucket.file(meme.fileName)
          file.delete(function (err, response) {})

          // return original memes
          return res.json(meme)
        })
      } else {
        return res.json({error: "not authorized to delete this file"})
      }
    }
  })
}