import User from "../../entities/User";
import { IUserRepository } from "../../repositories/IUserRespository";
import * as bcrypt from 'bcrypt'
import { Message } from "../../constant/Message";

export class LoginUseCase {

    constructor(private userRepository: IUserRepository){}

    async getUserByLogin(login:string, password): Promise<User>{

        const userRepository: IUserRepository = await this.userRepository.findByLogin(login);

        if(!userRepository){
            throw new Error(Message.ERROR_USER_NOT_FOUND)
        } 
        
        const user = new User(
                userRepository.id, 
                userRepository.name, 
                userRepository.profile, 
                userRepository.login, 
                userRepository.password);
        

        const isValidPassoword = await this.isValidPassoword(user, password);

        if(isValidPassoword){
            return user;
        } else{
            throw new Error(Message.ERROR_WRONG_PASSWORD)
        }
    }

    private async isValidPassoword(user:User, password): Promise<boolean>{
        return await bcrypt.compare(password, user.password);
    }
}