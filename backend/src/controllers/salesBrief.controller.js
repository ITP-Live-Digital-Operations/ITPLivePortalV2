const  models  = require('../../models');
const SalesBrief = models.SalesBrief;
const Task = models.Task;

exports.create =  (req, res) => {
    SalesBrief.create(req.body)
        .then(data => {
            res.status(201).send({
                status: "success",  
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the SalesBrief."
            });
        });
}

exports.getBirefsNotViewedByTalent = (req, res) => {
    SalesBrief.count({
        where: {
            ViewedByTalent: 0
        }
    }).then( numRows => {
        res.status(200).send({
            status: "success",
            data: numRows
        });
    }).catch(err => {
        console.log(err);
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving SalesBriefs."
        });
    });
}

exports.getAllBriefs = (req, res) => {
    SalesBrief.findAll()
        .then(data => {
            res.status(200).send({
                status: "success",
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving SalesBriefs."
            });
        });
}

exports.ViewedByTalent = (req, res) => {
    SalesBrief.update({ViewedByTalent: 1}, {
        where: {
            id: req.params.id
        }
    }).then( data => {
        res.status(200).send({
            status: "success",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving SalesBriefs."
        });
    });
}

exports.getSalesBrief = (req, res) => {
    SalesBrief.findAll({
        where: {
            id: req.params.id
        }
    }).then( data => {
        
        res.status(200).send({
            status: "success",
            data: data[0]
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving SalesBriefs."
        });
    });
}

exports.getSalesBriefIdByTaskId = (req, res) => {
    Task.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['brief_id']
    })
    .then(data => {
        res.status(200).send({
            status: "success",
            data: data
        });
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving SalesBriefs."
        });
    }
    );
}

exports.getSalesBriefWithFiles = (req, res) => {
    SalesBrief.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: models.File,
                required: false,
                as: 'files',
            }
        ]
    }).then(data => {
        res.status(200).send({
            status: "success",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving SalesBriefs."
        });
    });
}

exports.updateAssignedStatus = (req, res) => {
    SalesBrief.update({assigned: 1}, {
        where: {
            id: req.params.id
        }
    }).then( data => {
        res.status(200).send({
            status: "success",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving SalesBriefs."
        });
    });
}

exports.updateStatus = (req, res) => {
    SalesBrief.update({status: req.body.status}, {
        where: {
            id: req.params.id
        }
    }).then( data => {
        res.status(200).send({
            status: "success",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving SalesBriefs."
        });
    });
}

exports.salesBriefReady = (req, res) => {
    SalesBrief.update({Ready: 1}, {
        where: {
            id: req.params.id,
            ResultsViewed: 0
        }
    }).then( data => {
        res.status(200).send({
            status: "success",
            
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message
        });
    });
}

exports.getBriefByCreatedbyId = (req, res) => {
    SalesBrief.findAll({
        where: {
            CreatedbyID : req.params.id,
            Ready : 1
        }
    }).then( data => {
        res.status(200).send({
            status: "success",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message
        });
    });
}

exports.changeStatus = (req, res) => {
    console.log(req.body.status);
    SalesBrief.update({Status: req.body.status}, {
        where: {
            id: req.params.id
        }
    }).then( data => {
        res.status(200).send({
            status: "success",
            
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message
        });
    });
}


exports.getUserReadyBriefs = (req, res) => {
    SalesBrief.count({
        where: {
            Ready : 1, 
            CreatedbyID : req.params.id, 
            ResultsViewed : 0
        }
    }).then( data => {
        res.status(200).send({
            status: "success",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message
        });
    });
}

exports.viewBriefBySales = (req, res) => {
    SalesBrief.update({ResultsViewed: 1}, {
        where: {
            id: req.params.id
        }
    }).then( data => {
        res.status(200).send({
            status: "success",
            
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message
        });
    });
}


exports.viewMyBriefs = (req, res) => {
    SalesBrief.findAll({
        where: {
            CreatedbyID : req.params.id
        }
    }).then( data => {
        res.status(200).send({
            status: "success",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message
        });
    });
}

exports.updateBrief = (req, res) => {
    SalesBrief.update(req.body, { where: { id: req.params.id } }).then(
        (data) => {
            res.status(200).send({
                status: "success",
            });
        }
    )
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    }
    );
}