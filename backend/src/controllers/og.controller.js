const models = require("../../models");
const ogShows = models.ogshows;
const ogBookings = models.ogbookings;
const ogBookingForm = models.ogbookingForm;


exports.getOgShows = async (req, res) => {
  ogShows
    .findAll()
    .then((ogShows) => {
      res.status(200).send(ogShows);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getOgShowById = async (req, res) => {
  const ogShowId = req.params.id;
  ogShows
    .findByPk(ogShowId)
    .then((ogShow) => {
      if (!ogShow) {
        res.status(404).send({
          status: "error",
          message: "OG Show not found",
        });
      } else {
        res.status(200).send(ogShow);
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.editShowById = async (req, res) => {
  const ogShowId = req.params.id;

  ogShows
    .update(req.body, {
      where: {
        id: ogShowId,
      },
    })
    .then((ogShow) => {
      if (!ogShow) {
        res.status(404).send({
          status: "error",
          message: "OG Show not found",
        });
      } else {
        res.status(200).send({
          status: "success",
          message: "Show Updated Successfully",
          data: ogShow,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.addOgShow = async (req, res) => {
  ogShows
    .create(req.body)
    .then((ogShow) => {
      res.status(200).send({
        status: "success",
        message: "Show Added Successfully",
        data: ogShow,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getOgBookings = async (req, res) => {
  ogBookings
    .findAll({
      include: [
        {
          model: ogShows,
          attributes: ["id", "name"],
        },
        {
          model: models.User,
          attributes: ["id", "name"],
        }
      ],
    })
    .then((ogBookings) => {
      res.status(200).send(ogBookings);
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getOgBookingById = async (req, res) => {
  const ogBookingId = req.params.id;
  ogBookings
    .findByPk(ogBookingId)
    .then((ogBooking) => {
      if (!ogBooking) {
        res.status(404).send({
          status: "error",
          message: "OG Booking not found",
        });
      } else {
        res.status(200).send(ogBooking);
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.createOgBooking = async (req, res) => {
  const {
    staffId,
    showId,
    team,
    shootName,
    numberOfGuests,
    guestNames,
    startingDate,
    endingDate,
    progress,
    notes,
  } = req.body;
  ogBookings
    .create({
      staffId: staffId,
      showId: showId,
      team: team,
      shootName: shootName,
      numberOfGuests: numberOfGuests,
      guestNames: guestNames,
      startingDate: startingDate,
      endingDate: endingDate,
      progress: progress,
      notes: notes,
    })
    .then((ogBooking) => {
      res.status(200).send({
        status: "success",
        message: "Booking Added Successfully",
        data: ogBooking,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.editOgBookingById = async (req, res) => {
  const ogBookingId = req.params.id;

  ogBookings
    .update(req.body, {
      where: {
        id: ogBookingId,
      },
    })
    .then((ogBooking) => {
      if (!ogBooking) {
        res.status(404).send({
          status: "error",
          message: "OG Booking not found",
        });
      } else {
        res.status(200).send({
          status: "success",
          message: "Booking Updated Successfully",
          data: ogBooking,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getOgBookingByTeam = async (req, res) => {
  const team = req.params.team;
  ogBookings
    .findAll({
      where: {
        team: team,
      },
    })
    .then((ogBooking) => {
      if (!ogBooking) {
        res.status(404).send({
          status: "error",
          message: "OG Booking not found",
        });
      } else {
        res.status(200).send(ogBooking);
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
}

exports.createOgBookingForm = async (req, res) => {
  ogBookingForm
    .create(req.body)
    .then((ogBookingForm) => {
      res.status(200).send({
        status: "success",
        message: "Booking Form Added Successfully",
        data: ogBookingForm,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getOgBookingProductionFormById = async (req, res) => {
  const ogBookingId = req.params.id;
  ogBookingForm
    .findByPk(
      ogBookingId,
      (attributes = [
        "id",
        "ogbookingId",
        "locationOfShoot",
        "fullShootBrief",
        "equipmentNeeded",
        "cameraNumber",
        "nicMicNumber",
        "paintingOrProps",
        'createdAt',
        'updatedAt',
      ])
    )
    .then((ogBookingForm) => {
      if (!ogBookingForm) {
        res.status(404).send({
          status: "error",
          message: "OG Booking Form not found",
        });
      } else {
        res.status(200).send(ogBookingForm);
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getOgBookingEditorFormById = async (req, res) => {
  const ogBookingId = req.params.id;
  ogBookingForm
    .findByPk(
      ogBookingId,
      (attributes = [
        "id",
        "ogbookingId",
        "deadlineDateDraft1",
        "deadlineDateDraft1Link",
        "deadlineDateDraft1Comments",
        "deadlineDateDraft2",
        "deadlineDateDraft2Link",
        "deadlineDateDraft2Comments",
        "deadlineDateFinal",
        "deadlineDateFinalLink",
        "dateOfEpisodeGoingLive",
        "fullEpisodeBrief",
        "linkOfFootage",
        "music",
        "brolls",
        "graphics",
        "textNeeded",
        "guestSocialMediaLinks",
        "requestedEditorId",
        'createdAt',
        'updatedAt',
      ])
    )
    .then((ogBookingForm) => {
      if (!ogBookingForm) {
        res.status(404).send({
          status: "error",
          message: "OG Booking Form not found",
        });
      } else {
        res.status(200).send(ogBookingForm);
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getOgBookingGraphicsFormById = async (req, res) => {
  const ogBookingId = req.params.id;
  ogBookingForm
    .findByPk(
      ogBookingId,
      (attributes = [
        "id",
        "ogbookingId",
        "deadlineDateDraft1",
        "deadlineDateDraft1Link",
        "deadlineDateDraft1Comments",
        "deadlineDateFinal",
        "deadlineDateFinalLink",
        "dateOfThumbnailGoingLive",
        "fullThumbnailBrief",
        "linkOfPictures",
        "requestedGraphicDesignerId",
        'createdAt',
        'updatedAt',
      ])
    )
    .then((ogBookingForm) => {
      if (!ogBookingForm) {
        res.status(404).send({
          status: "error",
          message: "OG Booking Form not found",
        });
      } else {
        res.status(200).send(ogBookingForm);
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });

}

exports.editOgBookingFormById = async (req, res) => {
  const ogBookingId = req.params.id;

  ogBookingForm
    .update(req.body, {
      where: {
        id: ogBookingId,
      },
    })
    .then((ogBookingForm) => {
      if (!ogBookingForm) {
        res.status(404).send({
          status: "error",
          message: "OG Booking Form not found",
        });
      } else {
        res.status(200).send({
          status: "success",
          message: "Booking Form Updated Successfully",
          data: ogBookingForm,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });
};

exports.getBookingProductonFormByBookingId = async (req, res) => {
  const ogBookingId = req.params.id;
  ogBookingForm
    .findOne({
      where: {
        ogbookingId: ogBookingId,
      },
      attributes: [
        "id",
        "ogbookingId",
        "locationOfShoot",
        "fullShootBrief",
        "equipmentNeeded",
        "cameraNumber",
        "nicMicNumber",
        "paintingOrProps",
        'createdAt',
        'updatedAt',
      ],
    })
    .then((ogBookingForm) => {
      if (!ogBookingForm) {
        res.status(404).send({
          status: "error",
          message: "OG Booking Form not found",
        });
      } else {
        res.status(200).send(ogBookingForm);
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });

}

exports.getBookingEditorFormByBookingId = async (req, res) => {
  const ogBookingId = req.params.id;
  ogBookingForm
    .findOne({
      where: {
        ogbookingId: ogBookingId,
      },
      attributes: [
        "id",
        "ogbookingId",
        "deadlineDateDraft1",
        "deadlineDateDraft1Link",
        "deadlineDateDraft1Comments",
        "deadlineDateDraft2",
        "deadlineDateDraft2Link",
        "deadlineDateDraft2Comments",
        "deadlineDateFinal",
        "deadlineDateFinalLink",
        "dateOfEpisodeGoingLive",
        "fullEpisodeBrief",
        "linkOfFootage",
        "music",
        "brolls",
        "graphics",
        "textNeeded",
        "guestSocialMediaLinks",
        "requestedEditorId",
        'createdAt',
        'updatedAt',
      ],
    })
    .then((ogBookingForm) => {
      if (!ogBookingForm) {
        res.status(404).send({
          status: "error",
          message: "OG Booking Form not found",
        });
      } else {
        res.status(200).send(ogBookingForm);
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });

}

exports.getBookingGraphicsFormByBookingId = async (req, res) => {
  const ogBookingId = req.params.id;
  ogBookingForm
    .findOne({
      where: {
        ogbookingId: ogBookingId,
      },
      attributes: [
        "id",
        "ogbookingId",
        "deadlineDateDraft1",
        "deadlineDateDraft1Link",
        "deadlineDateDraft1Comments",
        "deadlineDateFinal",
        "deadlineDateFinalLink",
        "dateOfThumbnailGoingLive",
        "fullThumbnailBrief",
        "linkOfPictures",
        "requestedGraphicDesignerId",
        'createdAt',
        'updatedAt',
      ],
    })
    .then((ogBookingForm) => {
      if (!ogBookingForm) {
        res.status(404).send({
          status: "error",
          message: "OG Booking Form not found",
        });
      } else {
        res.status(200).send(ogBookingForm);
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: "error",
        message: err.message,
      });
    });

}

exports.addProductionTeamMembersToBooking = async (req, res) => {
  const { ogbookingFormId, productionStaffIds } = req.body;
  
  ogBookingForm.findByPk(ogbookingFormId)
    .then((ogBookingFormFound) => {
      if (!ogBookingFormFound) {
        res.status(404).send({
          status: "error",
          message: "OG Booking Form not found",
        });
      } else {
        ogBookingFormFound.addProductionStaff(productionStaffIds)
        .then((data) => {
          res.status(200).send({
            status: "success",
            message: "Production Staff Added Successfully",
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
    }
  )}


exports.updateProductionTeamMembersToBooking = async (req, res) => {
  const { ogbookingFormId, productionStaffIds } = req.body;
  
  ogBookingForm.findByPk(ogbookingFormId)
    .then((ogBookingFormFound) => {
      if (!ogBookingFormFound) {
        res.status(404).send({
          status: "error",
          message: "OG Booking Form not found",
        });
      } else {
        ogBookingFormFound.setProductionStaff(productionStaffIds)
        .then((data) => {
          res.status(200).send({
            status: "success",
            message: "Production Staff Updated Successfully",
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
    }
  )
}

exports.getProductionTeamMembersByBookingId = async (req, res) => {
  const ogbookingFormId = req.params.id;
  ogBookingForm.findByPk(ogbookingFormId)
    .then((ogBookingFormFound) => {
      if (!ogBookingFormFound) {
        res.status(404).send({
          status: "error",
          message: "OG Booking Form not found",
        });
      } else {
        ogBookingFormFound.getProductionStaff({
          attributes: ['id', 'name']
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
    }
  )
}
