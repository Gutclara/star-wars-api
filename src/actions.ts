import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { Characters } from './entities/Characters'
import { Planets } from './entities/Planets'
import jwt from 'jsonwebtoken'
import { Favorites } from './entities/Favorites'

export const createUser = async (req: Request, res:Response): Promise<Response> =>{

	// important validations to avoid ambiguos errors, the client needs to understand what went wrong
    if(!req.body.username) throw new Exception("Please provide an username") //modifique segun mi tabla de users
    if(!req.body.name) throw new Exception("Please provide a name")
	if(!req.body.last_name) throw new Exception("Please provide a last_name")
	if(!req.body.email) throw new Exception("Please provide an email")
	if(!req.body.password) throw new Exception("Please provide a password")

	const userRepo = getRepository(Users)
	// fetch for any user with this email
	const user = await userRepo.findOne({ where: {email: req.body.email }})
	if(user) throw new Exception("Users already exists with this email")

	const newUser = getRepository(Users).create(req.body);  //Creo un usuario
	const results = await getRepository(Users).save(newUser); //Grabo el nuevo usuario 
	return res.json(results);
}

export const getUsers = async (req: Request, res: Response): Promise<Response> =>{
		const users = await getRepository(Users).find();
		return res.json(users);
}

export const getCharacters = async (req: Request, res: Response): Promise<Response> =>{
    const characters = await getRepository(Characters).find();        
    return res.json(characters);
}

export const postCharacters = async (req: Request, res: Response): Promise<Response> =>{
    let results= []
    if (!req.body.length) return res.status(400).json('this is empty')
    for (let index = 0; index < req.body.length; index++) {
        
    if(!req.body[index].name) results.push(`Please provide a name ${index}`)
	if(!req.body[index].height) results.push(`Please provide some height ${index}`)
	if(!req.body[index].weight) results.push(`Please provide some weight ${index}`)
    if(!req.body[index].hair_color) results.push(`Please provide some hair color ${index}`)
    if(!req.body[index].skin_color)results.push(`Please provide some skin_color ${index}`)
    if(!req.body[index].eye_color) results.push(`Please provide some eye_color ${index}`)
    if(!req.body[index].date_of_birth) results.push(`Please provide the date_of_birth ${index}`)
    if(!req.body[index].gender) results.push(`Please provide some gender ${index}`)
    if(!req.body[index].description) results.push(`Please provide adescription ${index}`)
    if(!req.body[index].img_url) results.push(`Please provide an img_url ${index}`)

    const charactersRepo = getRepository(Characters)
	const character = await charactersRepo.findOne({ where: {name: req.body[index].name }})
    if(character)results.push("That character alrady exists")
    else if (!req.body[index].name||!req.body[index].height||!req.body[index].weight||!req.body[index].hair_color||!req.body[index].skin_color||!req.body[index].eye_color||!req.body[index].date_of_birth||!req.body[index].gender||!req.body[index].description||!req.body[index].img_url)
    {
        results.push(`that character ${req.body[index].name} wasnt save`)
    } else {const newCharacter = getRepository(Characters).create(req.body[index]);  //Creo un usuario
	results.push(await getRepository(Characters).save(newCharacter))} //Grabo el nuevo usuario )
    
       
    }
    
	return res.json(results);
}

export const getPlanets = async (req: Request, res: Response): Promise<Response> =>{
    const planets = await getRepository(Planets).find();        
    return res.json(planets);
}

export const postPlanets = async (req: Request, res: Response): Promise<Response> =>{
    let results= []
    if (!req.body.length) return res.status(400).json('this is empty')
    for (let index = 0; index < req.body.length; index++) {
        
    if(!req.body[index].name) results.push(`Please provide a name ${index}`)
	if(!req.body[index].diameter) results.push(`Please provide some diameter ${index}`)
	if(!req.body[index].rotation_period) results.push(`Please provide some the rotation period ${index}`)
    if(!req.body[index].orbital_period) results.push(`Please provide the orbital period ${index}`)
    if(!req.body[index].gravity) results.push(`Please provide the gravity ${index}`)
    if(!req.body[index].population) results.push(`Please provide the population ${index}`)
    if(!req.body[index].weather) results.push(`Please provide the weather ${index}`)
    if(!req.body[index].land) results.push(`Please provide the land ${index}`)
    if(!req.body[index].water_on_surface) results.push(`Please provide water_on_surface ${index}`)
    if(!req.body[index].img_url) results.push(`Please provide an img_url ${index}`)

    const planetsRepo = getRepository(Planets)
	const planet = await planetsRepo.findOne({ where: {name: req.body[index].name }})
    if(planet)results.push("That planet alrady exists")
    else if (!req.body[index].name||!req.body[index].diameter||!req.body[index].rotation_period||!req.body[index].orbital_period||!req.body[index].gravity||!req.body[index].population||!req.body[index].weather||!req.body[index].land||!req.body[index].water_on_surface||!req.body[index].img_url)
    {
        results.push(`that planet ${req.body[index].name} wasnt save`)
    } else {const newPlanet = getRepository(Planets).create(req.body[index]);  //Creo un usuario
	results.push(await getRepository(Planets).save(newPlanet))} //Grabo el nuevo usuario )
    
       
    }
    
	return res.json(results);
}

export const login = async (req: Request, res: Response): Promise<Response> =>{
    if(!req.body.email) throw new Exception("Please specify an email on your request body", 400)
    if(!req.body.password) throw new Exception("Please specify a password on your request body", 400)

    const userRepo = await getRepository(Users)

    const user = await userRepo.findOne({where: {email: req.body.email, password: req.body.password}})
    if(!user) throw new Exception("Invalid email or password", 401)

    const token = jwt.sign({user}, process.env.JWT_KEY as string, {expiresIn: 60 * 60});

    return res.json({user, token});
}

export const getCharacterId = async (req: Request, res: Response): Promise<Response> =>{
    const character = await getRepository(Characters).findOne(req.params.characterid);
    return res.json({character});
}

export const getPlanetId = async (req: Request, res: Response): Promise<Response> =>{
    const planet = await getRepository(Planets).findOne(req.params.planetid);
    return res.json({planet});
}

export const getFavoritesId = async (req: Request, res: Response): Promise<Response> =>{
    const favorites = await getRepository(Favorites).find({relations:["character","planet"], where: {userid: req.params.userid }});
    return res.json(favorites);
}

interface IToken{
    user: Users,
    iat: number,
    exp: number
}


export const postFavoritesPlanets = async (req: Request, res: Response): Promise<Response> =>{
   const token = req.user as IToken
   let newFavoritePlanet = new Favorites()
   newFavoritePlanet.userid = token.user
   const planet = await getRepository(Planets).findOne(req.params.planetid);
   newFavoritePlanet.planet = planet as Planets
   const results = await getRepository(Favorites).save(newFavoritePlanet)
   return res.json(results);
}

export const postFavoritesCharacters = async (req: Request, res: Response): Promise<Response> =>{
   const token = req.user as IToken
   let newFavoriteCharacter = new Favorites()
   newFavoriteCharacter.userid = token.user
   const character = await getRepository(Characters).findOne(req.params.characterid);
   newFavoriteCharacter.character = character as Characters
   const results = await getRepository(Favorites).save(newFavoriteCharacter)
   return res.json(results);
}

export const deleteFavoritesPlanets = async (req: Request, res: Response): Promise<Response> =>{
    const planet = await getRepository(Planets).findOne(req.params.planetaid);
    const favoritesPlanets = await getRepository(Favorites).findOne({where: {planet:planet}})
    if(!favoritesPlanets) throw new Exception("YOu dont have that planet in Favorites")
    const results = await getRepository(Favorites).delete({planet:planet})
    return res.json(results);
   
}

export const deleteFavoritesCharacters = async (req: Request, res: Response): Promise<Response> =>{
    const character = await getRepository(Characters).findOne(req.params.characterid);
    const favoritesCharacters = await getRepository(Favorites).findOne({where: {character:character}})
    if(!favoritesCharacters) throw new Exception("YOu dont have that character in Favorites")
    const results = await getRepository(Favorites).delete({character: character})
    return res.json(results);
}
