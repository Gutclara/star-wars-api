/**
 * Pivate Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 * 
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using 
 * the POST /token endpoint
 * 
 * Please include in this file all your private URL endpoints.
 * 
 */

import { Router, Request, Response, NextFunction } from 'express';
import { safe } from './utils';
import * as actions from './actions';
import jwt from "jsonwebtoken";

// declare a new router to include all the endpoints
const router = Router();

const verifyToken= (req: Request,res:Response, next:NextFunction) =>{
    const token = req.header('Authorization')?.replace("Bearer ","");
    if(!token) return res.status(400).json('ACCESS DENIED');

    const decoded = jwt.verify(token as string, process.env.JWT_KEY as string)
    req.user = decoded;
    
    next()
}

router.get('/user', verifyToken, safe(actions.getUsers));
router.get('/user/favorites/:userid', verifyToken, safe(actions.getFavoritesId))
router.post('/favorites/planets/:planetid', verifyToken, safe(actions.postFavoritesPlanets))
router.post('/favorites/characters/:characterid', verifyToken, safe(actions.postFavoritesCharacters))
router.post('/favorites/planets/:planetid', verifyToken, safe(actions.postFavoritesPlanets))
router.post('/favorites/characters/:characterid', verifyToken, safe(actions.postFavoritesCharacters))
router.delete('/favorites/planets/:planetid', verifyToken, safe(actions.deleteFavoritesPlanets))
router.delete('/favorites/characters/:characterid', verifyToken, safe(actions.deleteFavoritesCharacters))
export default router;
