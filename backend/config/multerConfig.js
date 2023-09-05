// config/multerConfig.js
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../uploads`);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  console.log("filter");
  const ext = file.originalname.split('.').pop();
  console.log(ext);
  if (ext === 'xlsx' || ext === 'xls' || ext === 'ods' || 
  ext === 'pptx' || ext === 'ppt' || ext === 'odp' ||
  ext === 'pdf' || ext === 'epub' || ext === 'mobi' ||
  ext === 'docx' || ext === 'doc' || ext === 'odt') {
  cb(null, true);
} else {
  cb(null, false);
}
}

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 100 //100MB
  }
});

module.exports = upload;
