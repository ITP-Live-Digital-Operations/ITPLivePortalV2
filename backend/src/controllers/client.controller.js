const models = require("../../models");
const Clients = models.Clients;
const Brand = models.brand;

exports.getClients = (req, res) => {
  Clients.findAll({
    include: [
      {
        model: models.brand,
        as: "brands",
      },
    ],
  })
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
        pocName: req.body.pocName,
        pocEmail: req.body.pocEmail,
        pocNumber: req.body.pocNumber,
        updatedBy: req.body.updatedBy,
        createdAt: new Date(),
    };
    Clients.create(client)
    .then((data) => {
        res.status(200).send({
        status: "success",
        message: "Client added successfully",
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

exports.getClientById = (req, res) => {
  Clients.findByPk(req.params.id, 
    
    {
      include: [
        {
          model: models.brand,
          as: "brands",
        },
      ],
    
    })
    .then((client) => {
      res.status(200).send(client);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
}

exports.updateClient = (req, res) => {
  Clients.update(req.body, {
    where: { id: req.params.id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: "success",
          message: "Client updated successfully",
        });
      } else {
        res.status(200).send({
          status: "error",
          message: "Client not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
}

exports.addBrandToClient = (req, res) => {
  const brand = {
    name: req.body.name,
    clientId: req.params.id,
    updatedBy: req.body.updatedBy,
    createdAt: new Date(),
  };
  Brand.create(brand)
    .then((data) => {
      res.status(200).send({
        status: "success",
        message: "Brand added successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
}

exports.deleteBrand = (req, res) => {
  Brand.destroy({
    where: { id: req.params.brandId },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: "success",
          message: "Brand deleted successfully",
        });
      } else {
        res.status(200).send({
          status: "error",
          message: "Brand not found",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
}