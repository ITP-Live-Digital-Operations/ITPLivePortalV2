const models = require("../../models");
const SalesBrief = models.SalesBrief;
const Task = models.Task;
const Campaign = models.Campaign;

exports.create = (req, res) => {
  SalesBrief.create(req.body)
    .then((data) => {
      res.status(201).send({
        id: data.id,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the SalesBrief.",
      });
    });
};

exports.getBirefsNotViewedByTalent = (req, res) => {
  SalesBrief.count({
    where: {
      ViewedByTalent: 0,
    },
  })
    .then((numRows) => {
      res.status(200).send({
        status: "success",
        data: numRows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SalesBriefs.",
      });
    });
};

exports.getAllBriefs = (req, res) => {
  SalesBrief.findAll()
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SalesBriefs.",
      });
    });
};

exports.getAllActiveBriefs = (req, res) => {
  SalesBrief.findAll({ where: { Status: "Active" } })
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SalesBriefs.",
      });
    });
};

exports.getAllAssignedBriefs = (req, res) => {
  SalesBrief.findAll({
    where: {
      assigned: 1,
    },
  })
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SalesBriefs.",
      });
    });
};

exports.ViewedByTalent = (req, res) => {
  SalesBrief.update(
    { ViewedByTalent: 1 },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SalesBriefs.",
      });
    });
};

exports.getSalesBrief = (req, res) => {
  SalesBrief.findAll({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: models.Clients,
        required: false,
        as: "client",
      },
    ],
  })
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data[0],
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SalesBriefs.",
      });
    });
};

exports.getSalesBriefIdByTaskId = (req, res) => {
  Task.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["brief_id"],
  })
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SalesBriefs.",
      });
    });
};

exports.getSalesBriefWithFiles = (req, res) => {
  SalesBrief.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: models.File,
        required: false,
        as: "files",
        where: {
          department: 2,
        },
      },
      {
        model: models.Clients,
        required: false,
        as: "client",
      },
      {
        model: models.Campaign,
        required: false,
        as: "campaign",
      },
    ],
  })
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SalesBriefs.",
      });
    });
};

exports.updateAssignedStatus = (req, res) => {
  SalesBrief.update(
    { assigned: 1 },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      res.status(200).send({
        id: data.id,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SalesBriefs.",
      });
    });
};

exports.updateStatus = (req, res) => {
  SalesBrief.update(
    { status: req.body.status },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SalesBriefs.",
      });
    });
};

exports.salesBriefReady = (req, res) => {
  SalesBrief.update(
    { Ready: 1 },
    {
      where: {
        id: req.params.id,
        ResultsViewed: 0,
      },
    }
  )
    .then((data) => {
      res.status(200).send({
        status: "success",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getBriefByCreatedbyId = (req, res) => {
  SalesBrief.findAll({
    where: {
      CreatedbyID: req.params.id,
      Ready: 1,
    },
    include: [
      {
        model: models.Clients,
        required: false,
        as: "client",
      },
    ],
  })
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.changeStatus = (req, res) => {
  console.log(req.body.status);
  SalesBrief.update(
    { Status: req.body.status },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      res.status(200).send({
        status: "success",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.getUserReadyBriefs = (req, res) => {
  SalesBrief.count({
    where: {
      Ready: 1,
      CreatedbyID: req.params.id,
      ResultsViewed: 0,
    },
    include: [
      {
        model: models.Clients,
        required: false,
        as: "client",
      },
    ],
  })
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.viewBriefBySales = (req, res) => {
  SalesBrief.update(
    { ResultsViewed: 1 },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      res.status(200).send({
        status: "success",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.viewMyBriefs = (req, res) => {
  SalesBrief.findAll({
    where: {
      CreatedbyID: req.params.id,
    },
    include: [
      {
        model: models.Clients,
        required: false,
        as: "client",
      },
    ],
  })
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.updateBrief = (req, res) => {
  SalesBrief.update(req.body, { where: { id: req.params.id } })
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

exports.deleteBrief = (req, res) => {
  SalesBrief.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.status(200).send({
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.setPriority = (req, res) => {
  SalesBrief.update(
    { Priority: req.body.priority },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      res.status(200).send({
        status: "success",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.updatePriorities = (req, res) => {
  const updates = req.body;

  SalesBrief.sequelize
    .transaction((transaction) =>
      Promise.all(
        updates.map((item) => {
          return SalesBrief.update(
            { Priority: item.newPriority },
            {
              where: { id: item.id },
              transaction: transaction,
            }
          );
        })
      )
    )
    .then(() => {
      res.status(200).send({
        status: "success",
        message: "Priorities updated successfully",
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getAllBriefsWithTask = (req, res) => {
  SalesBrief.findAll({
    include: [
      {
        model: models.Task,
        required: false,
        as: "task",
        include: [
          {
            model: models.User,
            required: false,
            as: "assignedUsers",
            attributes: ["id", "name"],
          },
        ],
      },
      {
        model: models.Clients,
        required: false,
        as: "client",
      },
    ],
  })
    .then((data) => {
      res.status(200).send({
        status: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving SalesBriefs.",
      });
    });
};
