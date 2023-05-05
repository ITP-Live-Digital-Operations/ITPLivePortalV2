
const upload = require('../../config/multerConfig');
const models = require('../../models');
const File = models.File;



exports.uploadFile = (req, res) => {
    upload.single('file')(req, res, function (err) {
        if (err) {
        res.status(400).send({
            status: 'fail',
            message: err.message
        });
        } else {
        const file = req.file;
        const briefId = Number(req.body.brief_id);
        const userId = Number(req.body.uploaded_by);
        const newFile = {
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            brief_id: briefId,
            uploaded_by: userId
        };
        File.create(newFile).then(data => {
            res.status(201).send({
            status: 'success'
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
            status: 'fail',
            message: err.message
            });
        });
        }
    });
    };

    
exports.downloadFile = (req, res) => {
    const id = req.params.id;
    File.findByPk(id).then(data => {
        const file = `${__dirname}/../../uploads/${data.filename}`;
        res.download(file);
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            status: 'fail',
            message: err.message
        });
    });
}

exports.getFileById = (req, res) => {
    const id = req.params.id;
    File.findByPk(id).then(data => {
        res.status(200).send({
            status: 'success',
            data: data
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            status: 'fail',
            message: err.message
        });
    });
}


