"use strict";
exports.__esModule = true;
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 *
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
var express_1 = require("express");
var utils_1 = require("./utils");
var actions_1 = require("./actions");
var router = express_1.Router();
// signup route, creates a new user in the DB
router.post('/user', utils_1.safe(actions_1.createUser));
router.get('/characters', utils_1.safe(actions_1.getCharacters));
router.post('/characters', utils_1.safe(actions_1.postCharacters));
router.get('/planets', utils_1.safe(actions_1.getPlanets));
router.post('/planets', utils_1.safe(actions_1.postPlanets));
router.post('/login', utils_1.safe(actions_1.login));
router.get('/personajes/:characterid', utils_1.safe(actions_1.getCharacterId));
router.get('/planetas/:planetid', utils_1.safe(actions_1.getPlanetId));
exports["default"] = router;
