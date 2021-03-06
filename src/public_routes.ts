
/**
 * Public Routes are those API url's that anyone can request
 * whout having to be logged in, for example:
 * 
 * POST /user is the endpoint to create a new user or "sign up".
 * POST /token can be the endpoint to "log in" (generate a token)
 */
import { Router } from 'express';
import { safe } from './utils';
import { createUser, getCharacters, postCharacters, getPlanets, postPlanets, login, getCharacterId, getPlanetId} from './actions';

const router = Router();

// signup route, creates a new user in the DB
router.post('/user', safe(createUser));
router.get('/characters', safe(getCharacters));
router.post('/characters', safe(postCharacters));
router.get('/planets', safe(getPlanets));
router.post('/planets', safe(postPlanets));
router.post('/login',safe(login));
router.get('/characters/:characterid', safe(getCharacterId));
router.get('/planets/:planetid', safe(getPlanetId));


export default router;
