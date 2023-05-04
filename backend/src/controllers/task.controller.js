const model = require('../../models')
const Sequelize = require('sequelize');
const Task = model.Task
const User = model.User
const { Op } = require('sequelize');



exports.create = (req, res) => {
    Task.create(req.body)
        .then(data => {
            res.status(201).send({
                status: "success",
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

exports.getUserTasks = (req, res) => {
    Task.findAll({
        where: {
            assigned_to: req.params.id
        },
        include: [
            {
                model: model.SalesBrief,
                required: true,
                as: 'Brief',
                
            }
        ]
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

exports.updateStatus = (req, res) => {
    const { assigned_to , id} = req.body;
    console.log(req.body);
    Task.update(
        { status: 'In Progress' },
        { where: { assigned_to: assigned_to, status: 'Not Started', id: id } }
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

exports.getUsersAndTaskWeights = (req, res) => {
    User.findAll({
        where: {
            role: 'talent',
            privilege_level: { [Op.lt]: 8 }
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
      group: ['users.id', 'users.name'],
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
  };
      /* .then(users => {
        const results = users.map(users => {
            
          
            id: users.id,
            name: users.name,
            totalWeight: users['assigned_to.weight'] || 0
        }));
          res.status(200).json(users);
        })
      .catch(error => {
        console.error(error);
        res.status(500).json({ message: error.message });
      });
  }; */

