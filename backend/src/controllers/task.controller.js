const model = require('../../models')
const Sequelize = require('sequelize');
const Task = model.Task
const User = model.User
const usertasks = model.UserTasks
const SalesBrief = model.SalesBrief
const { Op } = require('sequelize');




exports.create = (req, res) => {
    Task.create(req.body)
        .then(data => {
            res.status(201).send({
                status: "success",
                data: data
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Task."
            });
        });
}

exports.getUnfinishedTasks = (req, res) => {
    Task.count({
        where: {
            status: 'Not Started',
            assigned_to: req.params.id
        }
    }).then(numRows => {
        console.log(numRows);
        res.status(200).send({
            status: "success",
            data: numRows
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Tasks."
        });
    });
}

exports.addUserToTask = (req, res) => {
    const { userId , taskId} = req.body;
    usertasks.create({
        userId: userId,
        taskId: taskId
    }).then(data => {
        res.status(201).send({
            status: 'success',
            data: data
        })
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while adding user to task."
        });
    }
    )
}

exports.updateUsersToTask = (req, res) => {
    const  taskId = req.params.id;
    const { userIds} = req.body;
    console.log(userIds);
    console.log(taskId);
    usertasks.destroy({
        where: {
            taskId: taskId
        }
    }).then(data => {
        userIds.forEach(userId => {
            usertasks.create({
                userId: userId,
                taskId: taskId
            }).then(data => {
                res.status(201).send({
                    status: 'success',
                    data: data
                })
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while adding user to task."
                });
            }
            )
        })
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while adding user to task."
        });
    }
    )
}


/* exports.getUserTasks = (req, res) => {
    Task.findAll({
        where: {
            assigned_to: req.params.id
        },
    }).then(data => {
        
        res.status(200).send({
            status: "success",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Tasks."
        });
    });
} */

exports.getUserTasks = (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Task,
                as: 'assignedUsers',
                through : { attributes: [] },
            }
        ],
    })
    .then(data => {
        res.status(200).send({
            status: "success",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Tasks."
        });
    });
}

exports.updateStatus = (req, res) => {
    const { id} = req.body;
    
    Task.update(
        { status: 'In Progress' },
        { where: {status: 'Not Started', id: id } }
    ).then(data => {
        res.status(200).send({
            status: 'success',
        })
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating the Task."
        });
    }
    )

}

exports.updateStatusToComplete = (req, res) => {
    const { assigned_to , id} = req.body;
    Task.update(
        { status: 'Completed' },
        { where: { assigned_to: assigned_to, status: 'In Progress', id: id } }
    ).then(data => {
        res.status(200).send({
            status: 'success',
        })
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating the Task."
        });
    }
    )
} 

/* exports.getUsersAndTaskWeights = (req, res) => {
    User.findAll({
        where: {
            role: 'talent',
            privilege_level: { [Op.lt]: 9 }
        },
      attributes: ['id',
       'name',
         [Sequelize.fn('SUM', Sequelize.col('assigned_to.weight')), 'totalWeight']
    ],
      include: [
        {
          model: Task,
          as: 'assigned_to',
          attributes: [],
          where: {
            status: {
              [Op.or]: ['Not Started', 'In Progress']
            }
            
          },
          required: false,
        }
      ],
      group: ['User.id', 'User.name'],
      raw: true,
      order: [['id', 'ASC']],
      logging: console.log
    })
    .then((users) => {
        const usersWithTasks = users.map((user) => ({
          id: user.id,
          name: user.name,
          totalWeight: user.totalWeight || 0
        }));
        res.status(200).json({ usersWithTasks });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err.message });
      });
  }; */


  exports.getUsersAndTaskWeights = (req, res) => {
    User.findAll({
        where: {
            role: 'talent',
            privilege_level: { [Op.lt]: 9 }
        },
        attributes: ['id', 'name', [Sequelize.fn('COALESCE', Sequelize.fn('SUM', Sequelize.col('assignedUsers.weight')), 0), 'totalWeight']
    ],
        include: [
            {
                model: Task,
                as: 'assignedUsers',
                through: usertasks,
                where : { status: { [Op.or]: ['Not Started', 'In Progress'] } },
                required: false,
            }
        ],
        group: ['User.id'],
        order : [['id', 'ASC']],
    })
    .then((users) => {
        const usersWithTasks = users.map((user) => ({
          id: user.dataValues.id,
          name: user.dataValues.name,
          totalWeight: user.dataValues.totalWeight || 0
        }));
        res.status(200).json({ usersWithTasks });
      })
        .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err.message });
        });
    };

     
  exports.getTaskByBriefId = (req, res) => {
    Task.findOne({
        where: {
            brief_id: req.params.id
        },
        include: [
            {
                model: User,
                as: 'assignedUsers',
                attributes: ['id', 'name'],
            }
        ],
            
    }).then(data => {
        res.status(200).send({
            status: "success",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while retrieving Tasks."
        });
    });
}
 

exports.deactivateTask = (req, res) => {
    Task.update(
        { status: 'Deactivated' },
        { where: { brief_id : req.params.id } }
    ).then(data => {
        res.status(200).send({
            status: 'success',
        })
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating the Task."
        });
    }
    )
}


exports.activateTask = (req, res) => {
    Task.update(
        { status: 'In Progress' },
        { where: { brief_id : req.params.id } }
    ).then(data => {
        res.status(200).send({
            status: 'success',
        })
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating the Task."
        });
    }
    )
}


exports.updateProgress = (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    const {progress}  = req.body;
    Task.update(
        { progress: progress },
        { where: { id: id } }
    ).then(data => {
        res.status(200).send({
            status: 'success',
        })
    }
    )
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating the Task."
        });
    }
    )
}

exports.deleteTask = (req, res) => {
    const id = req.params.id;
    Task.destroy({
        where: { id: id }
    }).then(data => {
        res.status(200).send({
            status: 'success',
        })
    }
    )
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while deleting the Task."
        });
    }
    )
}

exports.updateTask = (req, res) => {
    const id = req.params.id;
    const { weight , deadline } = req.body;

    Task.update(
        { weight: weight, deadline: deadline },
        { where: { id: id } }
    ).then(data => {
        res.status(200).send({
            status: 'success',
        })
    }
    )
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while updating the Task."
        });
    }
    )
}