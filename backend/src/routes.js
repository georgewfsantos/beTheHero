const express = require("express");
//const connection = require("./database/index");

const OngController = require("./app/controllers/OngController");
const IncidentController = require("./app/controllers/IncidentController");
const IndividualOngController = require("./app/controllers/IndividualOngController");
const SessionController = require("./app/controllers/SessionController");

const routes = express.Router();

routes.post("/sessions", SessionController.store);

// ongs
routes.get("/ongs", OngController.index);

routes.post("/ongs", OngController.store);

// incidents

routes.get("/incidents", IncidentController.index);

routes.post("/incidents", IncidentController.store);

routes.delete("/incidents/:id", IncidentController.delete);

// cases per ong

routes.get("/ong_incidents", IndividualOngController.index);

module.exports = routes;
