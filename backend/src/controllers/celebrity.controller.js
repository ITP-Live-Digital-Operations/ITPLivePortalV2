const models = require("../../models");
const Celebrity = models.Celebrity;
const decode = require("../utils/token").decode;
const CelebrityRemarks = models.celebrityRemarks;
const CelebrityFiles = models.CelebrityFiles;
const { celebrityFileUpload } = require("../../config/multerConfig")
const path = require("path");


// ------------------------- Celebrity -------------------------
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
  console.log(req.body);
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


// ------------------------- Celebrity File -------------------------
exports.uploadCelebrityFile = (req, res) => {
  celebrityFileUpload.single("file")(req, res, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send({
        status: "error",
        message: err.message,
      });
      return;
    }
    const file = req.file;
    const id = Number(req.params.id);
    console.log(file);

    const fileType = file.mimetype.split("/")[1];
    console.log(fileType);

    const newFile = {
      filename : file.filename,
      mimetype : file.mimetype,
      fileType : fileType,
      celebrityId : id
    }

    CelebrityFiles.create(newFile)
      .then((data) => {
        res.status(200).send({
          status: "success",
          message: "File Uploaded",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: "error",
          message: err.message,
        });
      });
  });
}

exports.getCelebrityFiles = (req, res) => {
  const celebrityId = req.params.id;
  CelebrityFiles.findAll({ where: { celebrityId: celebrityId } })
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

exports.downloadCelebrityFile = (req, res) => {
  const fileId = req.params.id;
  CelebrityFiles.findByPk(fileId)
    .then((data) => {
      const file = path.resolve(__dirname, `../../uploads/celebrity/files/${data.filename}`);
      
      const encodedFileName = encodeURIComponent(data.filename);
      
      res.setHeader(
        "Content-Disposition",
        "attachment; filename*=UTF-8''" + encodedFileName
      );

      res.sendFile(file);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
}

exports.deleteCelebrityFile = (req, res) => {
  const id = req.params.id;
  CelebrityFiles.destroy({ where: { id: id } })
    .then((data) => {
      res.status(200).send({
        status: "success",
        message: "File Deleted",
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

