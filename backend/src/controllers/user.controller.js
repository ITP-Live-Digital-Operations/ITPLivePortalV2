const  models  = require('../../models');
const User = models.User;
const TimeForm = models.TimeForm;
const { generate: generateToken } = require('../utils/token');
const crypto = require('crypto');
const cryptojs = require('crypto-js');

const comparePassword = require('../utils/password').compare;

exports.register =  (req, res) => {

    
    const { name, email, password, status, role, privilege_level, parentId } = req.body;

    const hash = crypto.randomBytes(32).toString('hex');
    const encryptedPassword = cryptojs.AES.encrypt(password, hash).toString();
    
     User.create({name: name, email: email, password : encryptedPassword, status : status, role : role,
         privilege_level: privilege_level, parentId : parentId, hash : hash, createdAt: new Date(), updatedAt: new Date()}).then(
        (user) => { 
            
            res.status(200).send(
                {
                    status: 'success',
                    data: { token: generateToken(user.id, user.name, user.role, user.privilege_level), role: user.role }
                }
            );
        }) 
    
};


exports.login = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ where: { email } }).then((user) => {

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    if (comparePassword(password, user.password, user.hash)) {
        const token = generateToken( user.id, user.name, user.role, user.privilege_level);
        return res.status(200).send({
            status: 'success',
            data: { token, role: user.role }
        });
    }

    res.status(401).json({ message: 'Invalid credentials' });
    })
    .catch((err) => {
    res.status(500).json({ message: 'Something went wrong' });
    }
    );
}

exports.getAllUsers =  (req, res) => {
    User.findAll().then(users => {
    res.status(200).send(users);
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    });
};

exports.getUserByID =  (req, res) => {
    User.findByPk(req.params.id).then(user => {
    res.status(200).send(user);
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    }
    );
};

exports.getTalentUserIdNames =  (req, res) => {
    User.findAll({attributes: ['id', 'name'], where: {role: 'talent'}}).then(users => {
    res.status(200).send(users);
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    }
    );

};

exports.getChildrenIdsNames = (req, res) => {
    User.findAll({attributes: ['id', 'name'], where: {parentId: req.body.id}}).then(users => {
    res.status(200).send(users);
    })
    .catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    }
    );
};


exports.changePassword =  (req, res) => {
    const { oldPassword, newPassword, id } = req.body;
    User.findByPk(id).then(user => {

        if (comparePassword(oldPassword, user.password, user.hash)) {
            encryptedNewPassword = cryptojs.AES.encrypt(newPassword, user.hash).toString();
            User.update({password: encryptedNewPassword}, {where: {id: id}}).then( (data) => {
                res.status(200).send({
                    status: "success",
                });
            }
            )

        }
        else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    })
};


exports.addTimeForm =  (req, res) => {
    const { user_id, Date, Agency, Client, MainTaskType, ExtraNotes, TimeSpentInHours } = req.body;
    TimeForm.create({user_id: user_id, Date: Date, Agency: Agency, Client: Client, MainTaskType: MainTaskType,
        ExtraNotes: ExtraNotes, TimeSpentInHours: TimeSpentInHours}).then(
        (timeform) => { 
            
            res.status(200).send(
                {
                    status: 'success',
                }
            );
        })
        .catch(err => {
            res.status(500).send({
                status: "error",
                message: err.message
            });
        } 
        );

    
}

exports.getTimeFormsById =  (req, res) => {
    TimeForm.findAll({where: {user_id: req.params.id}}).then(timeform => {
    res.status(200).send(timeform);
    }).catch(err => {
        res.status(500).send({
            status: "error",
            message: err.message
        });
    }
    );
};
