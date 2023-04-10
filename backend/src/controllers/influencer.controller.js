const  models  = require('../../models');
const Influencer = models.Influencer;
const InfluencerRating = models.InfluencerRating;

exports.createInfluencer =  (req, res) => {
    const influencer = req.body;
    Influencer.create(influencer)
    .then(data => {
        res.status(200).send({
            status: "success",
        });
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    });
}

exports.getInfluencers =  (req, res) => {
 /* const page = parseInt(req.query.page) || 1;
 const limit = parseInt(req.query.limit) || 10;

    Influencer.findAndCountAll({
        where: { Status: "Active" },
        limit: limit,
        offset: (page - 1) * limit
    
    })
    .then( (result) => {  
         const totalPages = Math.ceil(result.count / limit);
        console.log({
            totalPages: totalPages,
            currentPage: page,
            perPage: limit,
            totalItems: result.count
        });
         res.status(200).send({
            data: result.rows,
            meta: {
                totalPages: totalPages,
                currentPage: page,
                perPage: limit,
                totalItems: result.count
            }
        });
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    }); */

    Influencer.findAll({ where: { Status: "Active" }})
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    });
}

exports.getInfluencer =  (req, res) => {
    const influencerId = Number(req.params.id);
    Influencer.findByPk(influencerId)
    .then(data => {
        res.status(200).send({data});
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    });
}

exports.deleteInfluencer =  (req, res) => {
    Influencer.update({ Status : "InActive" }, { where: { id: req.params.id } }).then(
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
    });
}

exports.updateInfluencer =  (req, res) => {
    Influencer.update(req.body, { where: { id: req.params.id } }).then(
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

exports.getInfluencerIdsandNames = (req, res) => {
    Influencer.findAll({ attributes: ['id', 'name'] })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        });
}

exports.getInfluencerNames = (req, res) => {
    Influencer.findAll({ attributes: ['id','name'] })
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        });
}


exports.createInfluencerRating =  (req, res) => {
    const influencerRating = req.body;
    InfluencerRating.create(influencerRating)
    .then(data => {
        res.status(200).send({
            status: "success",
        });
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    });
}


