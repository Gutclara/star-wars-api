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
    let results= []
    for (let index = 0; index < req.body.length; index++) {
        
    if(!req.body[index].name) results.push(`Please provide a name ${index}`)
	if(!req.body[index].height) results.push(`Please provide some height ${index}`)
	if(!req.body[index].weight) results.push(`Please provide some weight ${index}`)
    if(!req.body[index].hair_color) results.push(`Please provide some hair color ${index}`)
    if(!req.body[index].skin_color)results.push(`Please provide some skin_color ${index}`)
    if(!req.body[index].eye_color) results.push(`Please provide some eye_color ${index}`)
    if(!req.body[index].date_of_birth) results.push(`Please provide the date_of_birth ${index}`)
    if(!req.body[index].gender) results.push(`Please provide somegender ${index}`)
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