
const upload = require('../../config/multerConfig');
const models = require('../../models');
const File = models.File;
const SalesBrief = models.SalesBrief;
const path = require('path');


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
        console.log(file.mimetype)
        const ext = file.originalname.split('.').pop();
        if (ext === 'xlsx'){
            fileType = 'sheet';
        }
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
        console.log(`file name: ${data.originalname}`)
        const file = path.resolve(__dirname, '../../uploads/', data.filename);
        console.log(`file path: ${file}`);
        res.sendFile(file);
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

exports.approveFile = (req, res) => {
    const id = req.params.id;
    File.update({ approved: true }, {
        where: { id: id }
    }).then( data => {
        res.status(200).send({
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


exports.addNotes = (req, res) => {
    const id = req.params.id;
    const notes = req.body.notes;
    File.update({ notes: notes }, {
        where: { id: id }
    }).then( data => {
        res.status(200).send({
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

