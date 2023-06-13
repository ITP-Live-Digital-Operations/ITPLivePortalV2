const { Sequelize } = require('sequelize');
const  models  = require('../../models');
const Influencer = models.Influencer;
const InfluencerRating = models.InfluencerRating;
const User = models.User;

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
    Influencer.findAll({
        where: { Status: "Active" }, 
        attributes: ['id', 'name'] })
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

exports.getAverageInfluencerRating = (req, res) => {
    const influencerId = Number(req.params.id);
    InfluencerRating.findAll({
         where: { influencer_id: influencerId },
         attributes: ['responseRate', 'contentQuality', 'creativity', 'flexibility', 'campaignPerformance' ]
         })
        .then(data => {
            let sum = 0;
            data.forEach(element => {
                sum = sum + element.responseRate + element.contentQuality + element.creativity + element.flexibility + element.campaignPerformance;
            });
            let average = sum / (data.length * 5);
            res.status(200).send({ average });
        })
        .catch(err => {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        });
}

exports.getInfluencerRating = (req, res) => {
    const influencerId = Number(req.params.id);
    InfluencerRating.findAll({ 
        where: { influencer_id: influencerId },
        include: [{
            model: User,
            as: 'userID',
            attributes: ['name']
        }]
    })
        .then(data => {
            res.status(200).send({data });
        })
        .catch(err => {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        });
}


exports.getGenders = (req, res) => {
    Influencer.findAll({ 
        attributes : [
            [Sequelize.fn('DISTINCT', Sequelize.col('gender')), 'genders']
        ]
    })
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

exports.getCities = (req, res) => {
    Influencer.findAll({
         attributes : [
        [Sequelize.fn('DISTINCT', Sequelize.col('CityLocation')), 'cities']
    ]})
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

exports.getVerticals = (req, res) => {
    Influencer.findAll({ attributes : [
        [Sequelize.fn('DISTINCT', Sequelize.col('mainVertical')), 'verticals']
    ]})
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

exports.getLocations = (req, res) => {
    Influencer.findAll({ attributes :[
        [Sequelize.fn('DISTINCT', Sequelize.col('countryLocation')), 'locations']
    ]})
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

exports.getNationalities = (req, res) => { 
    Influencer.findAll({ attributes : [
        [Sequelize.fn('DISTINCT', Sequelize.col('Nationality')), 'nationalities']
    ]})
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





exports.getAllInfluencersWithAverageRating = (req, res) => {
    Influencer.findAll({
        include: [{
            model: InfluencerRating,
            as: 'influencerRating',
            attributes: ['responseRate', 'contentQuality', 'creativity', 'flexibility', 'campaignPerformance' ]
        }]
    })
        .then(data => {
            let influencers = [];
            data.forEach(element => {
                let sum = 0;
                element.influencerRating.forEach(rating => {
                    sum = sum + rating.responseRate + rating.contentQuality + rating.creativity + rating.flexibility + rating.campaignPerformance;
                });
                let itpAverageRating = sum / (element.influencerRating.length * 5);
                influencers.push({ ...element.get(), itpAverageRating });
            });
            res.status(200).send({influencers});
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



    