const  models  = require('../../models');
const Celebrity = models.Celebrity;
const decode = require('../utils/token').decode;


exports.createCelebrity =  (req, res) => {

    const celebrity = req.body;
    Celebrity.create(celebrity)
    .then(data => {
        res.status(200).send({
            status: "success",
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).send({
            status: "error",
            message: err.message
        });
    });
}

exports.getCelebrities =  (req, res) => {
    
    /* const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.match(/Bearer\s(.+)/)[1];
    const decoded = decode(token); */
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = decode(token);
    const pl = decoded.privilege_level;
    
    if (pl > 7) {
    Celebrity.findAll({ where: { Status: "Active" }})
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    });
} else {
    res.status(401).send({
        status: "error",
        message: "Unauthorized"
    });
}
}

exports.getCelebrity =  (req, res) => {
    const celebrityId = Number(req.params.id);
    Celebrity.findByPk(celebrityId)
    .then(data => {
        res.status(200).send({data});
    })
    .catch(err => {
        if (err.kind === "not_found") {
            res.status(404).send({
                status: 'error',
                message: `Celebrity with id ${id} was not found`
            });
            return;
        }
        res.status(500).send({
            status: "error",
            message: err.message
        });
    });
}

exports.deleteCelebrity =  (req, res) => {
    Celebrity.update({ Status : "InActive" }, { where: { id: req.params.id } }).then(
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

exports.updateCelebrity =  (req, res) => {
    Celebrity.update(req.body, { where: { id: req.params.id } }).then(
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
