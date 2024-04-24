const models = require("../../models");
const Suggestions = models.Suggestions;


exports.addSuggestion = (req, res) => {
    Suggestions.create(req.body)
        .then((suggestion) => {
            res.status(200).send({
                status: "success",
                message: "Suggestion added successfully",
            });
        })
        .catch((err) => {
            res.status(500).send({
                status: "error",
                message: err.message,
            });
        });
}

exports.getSuggestionsByDevelopement = (req, res) => {
    Suggestions.findAll({
        where: { status : "PENDING"},
        include : [
            {
                model: models.User,
                as: "user",
                attributes: ["id", "name"],
                required: true,
                where: {
                    position: "DEVELOPMENT"
                }
            }
        ],
    }).then((data) => {
        res.status(200).send({
            status: "success",
            message: "Suggestions fetched successfully",
            data: data,
    });
    }).catch((err) => {
        res.status(500).send({
            status: "error",
            message: err.message,
        });
    });
}

exports.getSuggestionsByTeam = (req, res) => {
    Suggestions.findAll({
        where: { status : "PENDING"},
        include : [
            {
                model: models.User,
                as: "user",
                attributes: ["id", "name"],
                required: true,
                where: {
                    // not development
                    position: {
                        [models.Sequelize.Op.not]: "DEVELOPMENT"
                }
            },
    }]
    })
    .then((data) => {
        res.status(200).send({
            status: "success",
            message: "Suggestions fetched successfully",
            data: data,
        });
    })
    .catch((err) => {
        res.status(500).send({
            status: "error",
            message: err.message,
        });
    });
}

exports.getSuggestionsByUserId = (req, res) => {
    Suggestions.findAll({
        where: {
            suggestedBy: req.params.id
        }
    })
    .then((data) => {
        res.status(200).send({
            status: "success",
            message: "Suggestions fetched successfully",
            data: data,
        });
    })
    .catch((err) => {
        res.status(500).send({
            status: "error",
            message: err.message,
        });
    });
}

exports.getSuggestionsByPriorityASC = (req, res) => {
    Suggestions.findAll({
        where: {  status: "APPROVED"},
        order: [
            ["priority", "ASC"]
        ]
    })
    .then((data) => {
        res.status(200).send({
            status: "success",
            message: "Suggestions fetched successfully",
            data: data,
        });
    })
    .catch((err) => {
        res.status(500).send({
            status: "error",
            message: err.message,
        });
    });
}


exports.rejectSuggestion = (req, res) => {
    Suggestions.update(
        { status: "REJECTED" },
        { where: { id: req.params.id } }
    )
    .then((data) => {
        res.status(200).send({
            status: "success",
            message: "Suggestion rejected successfully",
        });
    })
    .catch((err) => {
        res.status(500).send({
            status: "error",
            message: err.message,
        });
    });
}

exports.approveSuggestion = (req, res) => {
    Suggestions.update(
        { status: "APPROVED" },
        { where: { id: req.params.id } }
    )
    .then((data) => {
        res.status(200).send({
            status: "success",
            message: "Suggestion approved successfully",
        });
    })
    .catch((err) => {
        res.status(500).send({
            status: "error",
            message: err.message,
        });
    });
}

exports.updatePriority = (req, res) => {
    Suggestions.update(
        { priority: req.body.priority },
        { where: { id: req.params.id } }
    )
    .then((data) => {
        res.status(200).send({
            status: "success",
            message: "Priority updated successfully",
        });
    })
    .catch((err) => {
        res.status(500).send({
            status: "error",
            message: err.message,
        });
    });
}
