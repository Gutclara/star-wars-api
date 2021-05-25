import { Request, Response } from 'express'
import { getRepository } from 'typeorm'  // getRepository"  traer una tabla de la base de datos asociada al objeto
import { Users } from './entities/Users'
import { Exception } from './utils'
import { Characters } from './entities/Characters'

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
    let results
    for (let index = 0; index < req.body.length; index++) {
        
    if(!req.body.name) throw new Exception("Please provide a name")
	if(!req.body.height) throw new Exception("Please provide height")
	if(!req.body.weight) throw new Exception("Please provide weight")
    if(!req.body.hair_color) throw new Exception("Please provide hair color")
    if(!req.body.skin_color) throw new Exception("Please provide skin_color")
    if(!req.body.eye_color) throw new Exception("Please provide eye_color")
    if(!req.body.date_of_birth) throw new Exception("Please provide date_of_birth")
    if(!req.body.gender) throw new Exception("Please provide gender")
    if(!req.body.description) throw new Exception("Please provide description")
    if(!req.body.img_url) throw new Exception("Please provide img_url")

    const charactersRepo = getRepository(Characters)
	const character = await charactersRepo.findOne({ where: {name: req.body.name }})
	if(character) throw new Exception("This character already exists")

	const newCharacter = getRepository(Characters).create(req.body);  //Creo un usuario
	results = await getRepository(Characters).save(newCharacter); //Grabo el nuevo usuario 
        
    }
    
	return res.json(results);
}