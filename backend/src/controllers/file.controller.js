
const upload = require('../../config/multerConfig');
const models = require('../../models');
const File = models.File;
const SalesBrief = models.SalesBrief;
const path = require('path');
const fs = require('fs');

const ExcelJS = require('exceljs');




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
            status: 'success',
            fileData: fileData
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

exports.uploadTable = async (req, res, next) => {

        const briefId = Number(req.body.brief_id);
        const userId = Number(req.body.uploaded_by);
        const fileName = req.body.fileName;
        const tableData = req.body.table;
        

        const workbook = new ExcelJS.Workbook();
    
        // Load the template workbook
        const templatePath = path.resolve(__dirname, '../utils/template-budget-sheet.xlsx');
        await workbook.xlsx.readFile(templatePath);
        
        // Get the Template worksheet
        templateWorksheet = workbook.getWorksheet('Template');
        templateWorksheet.getCell('A1').value = "ITP Live x " + fileName;
        // Get the Data worksheet
        const dataWorksheet = workbook.getWorksheet('Data');
        
        // Add data to the Data worksheet
        for(let i = 0; i < tableData.length; i++){
            
            let row = tableData[i];
            let newRow = [];
        
            // Push data to newRow considering its type
            for(let key in row) {
              let value = row[key];
        
              // Depending on the column, you may need to set cell type to number or string
              if(['col1', 'col5', 'col7'].includes(key)) value = Number(value);
        
              newRow.push(value);
            }
            dataWorksheet.addRow(newRow);
          }
          
          
          const filePath = path.resolve(__dirname ,  '../../uploads/'); 
          const newfileName = fileName + "-" + Date.now() + '.xlsx'; 
          
          
          await workbook.xlsx.writeFile( path.join(filePath, newfileName), workbook)
          

          const buffer =  fs.readFileSync(path.join(filePath, newfileName));
    
          req.file = {
            buffer,
            originalname: newfileName,
            filename: newfileName,
            mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          };

          req.body.brief_id = briefId;
          req.body.uploaded_by = userId;
          

          next();
       
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

exports.sendFile = (req, res) => {
    const id = req.params.id;
    File.findByPk(id).then(data => {
        const file = path.resolve(__dirname, '../../uploads/', data.filename);
        res.sendFile(file);
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            status: 'fail',
            message: err.message
        });
    });
}





