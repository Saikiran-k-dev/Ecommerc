//3rd party imports
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

//my imports
import UserRepository from "./user.repository.js"

//creation of usercontroller class
export default class UserController{
    constructor(){
        this.userRepository = new UserRepository();
    }

    //sign up function
    async signUp(req,res){
       try {
        const userDetails = req.body
        console.log(userDetails)
 
        //password hashing
        const hashedPassword = await bcrypt.hash(userDetails.password,12)
        userDetails.password = hashedPassword;
 
        //creating the user
        const createdUser = await this.userRepository.signUp(userDetails)
        res.status(200).send({message:"user created successfully", user: createdUser})
       } catch (error) {
        console.log(error)
        res.status(500).send({error})
       }
    }
    
    //creation of signin function
    async signIn(req,res){
    
       try {
         const {email,password} = req.body
         const isUserFound = await this.userRepository.signIn(email)
         if(!isUserFound){
             return res.status(400).send("incorrect email or password")
         }
 
         const isPasswordCorrect = await bcrypt.compare(password, isUserFound.password)
         if(!isPasswordCorrect){
             res.status(400).send("incorrect email or password")
         }
 
         //creating the jwt token
         const token = jwt.sign(
             {id: isUserFound._id, name:isUserFound.name, email:isUserFound.email, role:isUserFound.role},
             "SECRETT",
             {expiresIn:"2h"}
         )
         res.status(200).send({message:"signin successful",token})
       } catch (error) {
            res.status(500).send({error})
       }
    }   
}