const models = require('../../models');
const Notification = models.Notification;
const User = models.User;


exports.createNotification =  (req, res) => {
    const id = req.params.id;
    const {message, link} = req.body;
    Notification.create({
        user_id: id,
        message: message,
        link: link
    }).then((data) => {
        res.status(200).json({
            message: "Notification created successfully",
            data: data
        })
    }).catch((err) => {
        res.status(500).json({
            message: "Error occured while creating notification",
            error: err
        })
    })
}

exports.getNotifications = (req, res) => {
    const id = req.params.id;
    Notification.findAll({
        where: {
            user_id: id
        },
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((data) => {
        res.status(200).json({
            message: "Notifications fetched successfully",
            data: data
        })
    }).catch((err) => {
        res.status(500).json({
            message: "Error occured while fetching notifications",
            error: err
        })
    })
}

exports.getUnreadNotifications = (req, res) => {
    const id = req.params.id;
    Notification.findAll({
        where: {
            user_id: id,
            read: false
        }
    }).then((data) => {
        res.status(200).json({
            message: "Notifications fetched successfully",
            data: data
        })
    }).catch((err) => {
        res.status(500).json({
            message: "Error occured while fetching notifications",
            error: err
        })
    })
}

exports.updateNotification = (req, res) => {
    const id = req.params.id;
    Notification.update({
        read: true
    }, {
        where: {
            id: id
        }
    }).then((data) => {
        res.status(200).json({
            message: "Notification updated successfully",
            data: data
        })
    }).catch((err) => {
        res.status(500).json({
            message: "Error occured while updating notification",
            error: err
        })
    })
}


exports.deleteNotification = (req, res) => {
    const id = req.params.id;
    Notification.destroy({
        where: {
            id: id
        }
    }).then((data) => {
        res.status(200).json({
            message: "Notification deleted successfully",
            data: data
        })
    }).catch((err) => {
        res.status(500).json({
            message: "Error occured while deleting notification",
            error: err
        })
    })
}

exports.getNotificationById = (req, res) => {
    const id = req.params.id;
    Notification.findOne({
        where: {
            id: id
        }
    }).then((data) => {
        res.status(200).json({
            message: "Notification fetched successfully",
            data: data
        })
    }).catch((err) => {
        res.status(500).json({
            message: "Error occured while fetching notification",
            error: err
        })
    })
}

exports.getUnreadNotificationCountByUserId = (req, res) => {
    const id = req.params.id;
    Notification.count({
        where: {
            user_id: id,
            read: false
        }
    }).then((data) => {
        res.status(200).json({
                data : data
        })
    }).catch((err) => {
        res.status(500).json({
            message: "Error occured while fetching notification count",
            error: err
        })
    })
}