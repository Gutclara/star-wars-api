"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.deleteFavoritesCharacters = exports.deleteFavoritesPlanets = exports.postFavoritesCharacters = exports.postFavoritesPlanets = exports.getFavoritesId = exports.getPlanetId = exports.getCharacterId = exports.login = exports.postPlanets = exports.getPlanets = exports.postCharacters = exports.getCharacters = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm"); // getRepository"  traer una tabla de la base de datos asociada al objeto
var Users_1 = require("./entities/Users");
var utils_1 = require("./utils");
var Characters_1 = require("./entities/Characters");
var Planets_1 = require("./entities/Planets");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var Favorites_1 = require("./entities/Favorites");
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // important validations to avoid ambiguos errors, the client needs to understand what went wrong
                if (!req.body.username)
                    throw new utils_1.Exception("Please provide an username"); //modifique segun mi tabla de users
                if (!req.body.name)
                    throw new utils_1.Exception("Please provide a name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(Users_1.Users).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var getCharacters = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var characters;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).find()];
            case 1:
                characters = _a.sent();
                return [2 /*return*/, res.json(characters)];
        }
    });
}); };
exports.getCharacters = getCharacters;
var postCharacters = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results, index, charactersRepo, character, newCharacter, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                results = [];
                if (!req.body.length)
                    return [2 /*return*/, res.status(400).json('this is empty')];
                index = 0;
                _c.label = 1;
            case 1:
                if (!(index < req.body.length)) return [3 /*break*/, 7];
                if (!req.body[index].name)
                    results.push("Please provide a name " + index);
                if (!req.body[index].height)
                    results.push("Please provide some height " + index);
                if (!req.body[index].weight)
                    results.push("Please provide some weight " + index);
                if (!req.body[index].hair_color)
                    results.push("Please provide some hair color " + index);
                if (!req.body[index].skin_color)
                    results.push("Please provide some skin_color " + index);
                if (!req.body[index].eye_color)
                    results.push("Please provide some eye_color " + index);
                if (!req.body[index].date_of_birth)
                    results.push("Please provide the date_of_birth " + index);
                if (!req.body[index].gender)
                    results.push("Please provide some gender " + index);
                if (!req.body[index].description)
                    results.push("Please provide adescription " + index);
                if (!req.body[index].img_url)
                    results.push("Please provide an img_url " + index);
                charactersRepo = typeorm_1.getRepository(Characters_1.Characters);
                return [4 /*yield*/, charactersRepo.findOne({ where: { name: req.body[index].name } })];
            case 2:
                character = _c.sent();
                if (!character) return [3 /*break*/, 3];
                results.push("That character alrady exists");
                return [3 /*break*/, 6];
            case 3:
                if (!(!req.body[index].name || !req.body[index].height || !req.body[index].weight || !req.body[index].hair_color || !req.body[index].skin_color || !req.body[index].eye_color || !req.body[index].date_of_birth || !req.body[index].gender || !req.body[index].description || !req.body[index].img_url)) return [3 /*break*/, 4];
                results.push("that character " + req.body[index].name + " wasnt save");
                return [3 /*break*/, 6];
            case 4:
                newCharacter = typeorm_1.getRepository(Characters_1.Characters).create(req.body[index]);
                _b = (_a = results).push;
                return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).save(newCharacter)];
            case 5:
                _b.apply(_a, [_c.sent()]);
                _c.label = 6;
            case 6:
                index++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.postCharacters = postCharacters;
var getPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).find()];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getPlanets = getPlanets;
var postPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var results, index, planetsRepo, planet, newPlanet, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                results = [];
                if (!req.body.length)
                    return [2 /*return*/, res.status(400).json('this is empty')];
                index = 0;
                _c.label = 1;
            case 1:
                if (!(index < req.body.length)) return [3 /*break*/, 7];
                if (!req.body[index].name)
                    results.push("Please provide a name " + index);
                if (!req.body[index].diameter)
                    results.push("Please provide some diameter " + index);
                if (!req.body[index].rotation_period)
                    results.push("Please provide some the rotation period " + index);
                if (!req.body[index].orbital_period)
                    results.push("Please provide the orbital period " + index);
                if (!req.body[index].gravity)
                    results.push("Please provide the gravity " + index);
                if (!req.body[index].population)
                    results.push("Please provide the population " + index);
                if (!req.body[index].weather)
                    results.push("Please provide the weather " + index);
                if (!req.body[index].land)
                    results.push("Please provide the land " + index);
                if (!req.body[index].water_on_surface)
                    results.push("Please provide water_on_surface " + index);
                if (!req.body[index].img_url)
                    results.push("Please provide an img_url " + index);
                planetsRepo = typeorm_1.getRepository(Planets_1.Planets);
                return [4 /*yield*/, planetsRepo.findOne({ where: { name: req.body[index].name } })];
            case 2:
                planet = _c.sent();
                if (!planet) return [3 /*break*/, 3];
                results.push("That planet alrady exists");
                return [3 /*break*/, 6];
            case 3:
                if (!(!req.body[index].name || !req.body[index].diameter || !req.body[index].rotation_period || !req.body[index].orbital_period || !req.body[index].gravity || !req.body[index].population || !req.body[index].weather || !req.body[index].land || !req.body[index].water_on_surface || !req.body[index].img_url)) return [3 /*break*/, 4];
                results.push("that planet " + req.body[index].name + " wasnt save");
                return [3 /*break*/, 6];
            case 4:
                newPlanet = typeorm_1.getRepository(Planets_1.Planets).create(req.body[index]);
                _b = (_a = results).push;
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).save(newPlanet)];
            case 5:
                _b.apply(_a, [_c.sent()]);
                _c.label = 6;
            case 6:
                index++;
                return [3 /*break*/, 1];
            case 7: return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.postPlanets = postPlanets;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, token;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.email)
                    throw new utils_1.Exception("Please specify an email on your request body", 400);
                if (!req.body.password)
                    throw new utils_1.Exception("Please specify a password on your request body", 400);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users)];
            case 1:
                userRepo = _a.sent();
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email, password: req.body.password } })];
            case 2:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("Invalid email or password", 401);
                token = jsonwebtoken_1["default"].sign({ user: user }, process.env.JWT_KEY, { expiresIn: 60 * 60 });
                return [2 /*return*/, res.json({ user: user, token: token })];
        }
    });
}); };
exports.login = login;
var getCharacterId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var character;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).findOne(req.params.characterid)];
            case 1:
                character = _a.sent();
                return [2 /*return*/, res.json({ character: character })];
        }
    });
}); };
exports.getCharacterId = getCharacterId;
var getPlanetId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne(req.params.planetid)];
            case 1:
                planet = _a.sent();
                return [2 /*return*/, res.json({ planet: planet })];
        }
    });
}); };
exports.getPlanetId = getPlanetId;
var getFavoritesId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var favorites;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Favorites_1.Favorites).find({ relations: ["character", "planet"], where: { userid: req.params.userid } })];
            case 1:
                favorites = _a.sent();
                return [2 /*return*/, res.json(favorites)];
        }
    });
}); };
exports.getFavoritesId = getFavoritesId;
var postFavoritesPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, newFavoritePlanet, planet, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                newFavoritePlanet = new Favorites_1.Favorites();
                newFavoritePlanet.userid = token.user;
                return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne(req.params.planetid)];
            case 1:
                planet = _a.sent();
                newFavoritePlanet.planet = planet;
                return [4 /*yield*/, typeorm_1.getRepository(Favorites_1.Favorites).save(newFavoritePlanet)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.postFavoritesPlanets = postFavoritesPlanets;
var postFavoritesCharacters = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var token, newFavoriteCharacter, character, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                token = req.user;
                newFavoriteCharacter = new Favorites_1.Favorites();
                newFavoriteCharacter.userid = token.user;
                return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).findOne(req.params.characterid)];
            case 1:
                character = _a.sent();
                newFavoriteCharacter.character = character;
                return [4 /*yield*/, typeorm_1.getRepository(Favorites_1.Favorites).save(newFavoriteCharacter)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.postFavoritesCharacters = postFavoritesCharacters;
var deleteFavoritesPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet, favoritesPlanets, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planets_1.Planets).findOne(req.params.planetaid)];
            case 1:
                planet = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Favorites_1.Favorites).findOne({ where: { planet: planet } })];
            case 2:
                favoritesPlanets = _a.sent();
                if (!favoritesPlanets)
                    throw new utils_1.Exception("YOu dont have that planet in Favorites");
                return [4 /*yield*/, typeorm_1.getRepository(Favorites_1.Favorites)["delete"]({ planet: planet })];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteFavoritesPlanets = deleteFavoritesPlanets;
var deleteFavoritesCharacters = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var character, favoritesCharacters, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Characters_1.Characters).findOne(req.params.characterid)];
            case 1:
                character = _a.sent();
                return [4 /*yield*/, typeorm_1.getRepository(Favorites_1.Favorites).findOne({ where: { character: character } })];
            case 2:
                favoritesCharacters = _a.sent();
                if (!favoritesCharacters)
                    throw new utils_1.Exception("YOu dont have that character in Favorites");
                return [4 /*yield*/, typeorm_1.getRepository(Favorites_1.Favorites)["delete"]({ character: character })];
            case 3:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.deleteFavoritesCharacters = deleteFavoritesCharacters;
