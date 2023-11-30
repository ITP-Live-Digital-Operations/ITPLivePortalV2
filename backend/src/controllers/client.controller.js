const models = require("../../models");
const Clients = models.Clients;

exports.getClients = (req, res) => {
  Clients.findAll({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};


exports.addClient = (req, res) => {
  console.log(req.body);
    const client = {
        name: req.body.name,
        industry: req.body.industry,
        updatedBy: req.body.updatedBy,
        createdAt: new Date(),
    };
    Clients.create(client)
    .then((data) => {
        res.status(200).send({
        status: "success",
        message: "Client added successfully",
        });
    })
    .catch((err) => {
        res.status(500).send({
        status: "error",
        message: err.message,
        });
    });
}