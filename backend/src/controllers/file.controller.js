
const upload = require('../../config/multerConfig');
const models = require('../../models');
const File = models.File;
const SalesBrief = models.SalesBrief;



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

        let fileType;
        if (file.mimetype.includes('sheet')) {  
            fileType = 'sheet';
        } else if (file.mimetype.includes('presentation')) {
            fileType = 'presentation';
        }

        const newFile = {
            filename: file.filename,
            originalname: file.originalname,
            mimetype: file.mimetype,
            fileType: fileType,
            brief_id: briefId,
            uploaded_by: userId
        };


        File.create(newFile).then(fileData => {
            let updateField;
            if (fileData.fileType === 'sheet') {
            updateField = { BudgetSheetId : fileData.id };
            } else if (fileData.fileType === 'presentation') {
            updateField = { PresentationId : fileData.id };
            }
            if ( updateField ) {
            SalesBrief.update(updateField, {
                where: { id: briefId }
            }).then( data => {
                res.status(201).send({
                    status: 'success'
                  });
            }).catch(err => {
                res.status(500).send({
                    status: 'fail',
                    message: err.message
                  });
            });
            }
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


