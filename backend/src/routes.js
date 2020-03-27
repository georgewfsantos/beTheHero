const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");
const OngController = require("./app/controllers/OngController");
const IncidentController = require("./app/controllers/IncidentController");
const IndividualOngController = require("./app/controllers/IndividualOngController");
const SessionController = require("./app/controllers/SessionController");

const routes = express.Router();

routes.post("/sessions", SessionController.store);

// ongs
routes.get("/ongs", OngController.index);

routes.post(
  "/ongs",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .email()
        .required(),
      whatsapp: Joi.string()
        .min(10)
        .max(11)
        .required(),
      city: Joi.string().required(),
      uf: Joi.string()
        .length(2)
        .required()
    })
  }),
  OngController.store
);

// incidents

routes.get(
  "/incidents",
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  IncidentController.index
);

routes.post("/incidents", IncidentController.store);

routes.delete(
  "/incidents/:id",
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  IncidentController.delete
);

// cases per ong

routes.get(
  "/ong_incidents",
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  IndividualOngController.index
);

module.exports = routes;
