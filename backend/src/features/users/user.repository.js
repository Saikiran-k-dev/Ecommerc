//3rd party imports
import mongoose from "mongoose";

//my imports
import userSchema from "./user.schema.js";

//creating the model
const UserModel = mongoose.model('User',userSchema)

//creating the user repository class
export default class UserRepository{
    constructor(){}

    //signup function
    async signUp(userDetails){
        try {
            const addNewUser = new UserModel(userDetails)
            await addNewUser.save()
            return addNewUser
        } catch (error) {
            throw new Error("error while creating the user")
        }
    }

    //signin function
    async signIn(email){
        try {
           const isUserValid = await UserModel.findOne({email})
           if(isUserValid){
            return isUserValid
           } else {
            throw new Error("email id is not registered")
           }
        } catch (error) {
            throw new Error("error while signing in")
        }
    }
}