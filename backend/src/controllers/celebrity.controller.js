const models = require("../../models");
const Celebrity = models.Celebrity;
const decode = require("../utils/token").decode;
const CelebrityRemarks = models.celebrityRemarks;

exports.createCelebrity = (req, res) => {
  console.log(req.body);
  const celebrity = req.body;
  Celebrity.create(celebrity)
    .then((data) => {
      console.log(data);
      res.status(200).send({
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getCelebrities = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const decoded = decode(token);
  const pl = decoded.privilege_level;

  if (pl > 7) {
    Celebrity.findAll({ where: { Status: "Active" } })
      .then((data) => {
        res.status(200).send(data);
      })
      .catch((err) => {
        res.status(500).send({
          status: "error",
          message: err.message,
        });
      });
  } else {
    res.status(401).send({
      status: "error",
      message: "Unauthorized",
    });
  }
};

exports.getCelebritiesIdsandNames = (req, res) => {
  Celebrity.findAll({
    attributes: ["id", "Name"],
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
  }
  
exports.getCelebrity = (req, res) => {
  const celebrityId = Number(req.params.id);
  Celebrity.findByPk(celebrityId)
    .then((data) => {
      res.status(200).send({ data });
    })
    .catch((err) => {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: "error",
          message: `Celebrity with id ${id} was not found`,
        });
        return;
      }
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.deleteCelebrity = (req, res) => {
  Celebrity.update({ Status: "InActive" }, { where: { id: req.params.id } })
    .then((data) => {
      res.status(200).send({
        status: "success",
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.updateCelebrity = (req, res) => {
  Celebrity.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.status(200).send({
        status: "success",
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};


// ------------------------- Celebrity Remarks -------------------------
exports.createCelebrityRemark = (req, res) => {
  const celebrityRemark = req.body;
  CelebrityRemarks.create(celebrityRemark)
    .then((data) => {
      console.log(data);
      res.status(200).send({
        status: "success",
        message: "Celebrity Remark Created",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getCelebrityRemarkById = (req, res) => {
  CelebrityRemarks.findByPk(req.params.id, {
    include: [
      {
        model: Celebrity,
        as: "celebrity",
        attributes: ["id", "Name"],
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

exports.getCelebrityRemarks = (req, res) => {
  const celebrityId = req.params.id;
  CelebrityRemarks.findAll({
    where: { celebrityId: celebrityId },
    include: [
      {
        model: models.User,
        as: "user",
        attributes: ["name"],
      },
    ],
    order: [["updatedAt", "DESC"]],
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

exports.updateCelebrityRemark = (req, res) => {
  CelebrityRemarks.update(req.body, { where: { id: req.params.id } })
    .then((data) => {
      res.status(200).send({
        status: "success",
        message: "Influencer Remark Updated",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.deleteCelebrityRemark = (req, res) => {
  CelebrityRemarks.destroy({ where: { id: req.params.id } })
    .then((data) => {
      res.status(200).send({
        status: "success",
        message: "Influencer Remark Deleted",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};
