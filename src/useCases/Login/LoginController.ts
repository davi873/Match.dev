import { Request, Response } from "express";
import { encodeSession } from "../../auth/Atuh";
import { Message } from "../../constant/Message";
import User from "../../entities/User";
import { LoginUseCase } from "./LoginUseCase";

export class Login {


    constructor(
        private loginUseCase: LoginUseCase
    ){}
    
    async execute(req: Request, res: Response): Promise<any> {

        try{  
            const login = req.body.username;
            const password = req.body.password;
    
            if(!login || !password){
                res.status(401).json({Authorization: false, message: Message.ERROR_USERNAME_PASS});
            }

            const userLogged: User = await this.loginUseCase.getUserByLogin(login, password);

            const session = encodeSession(process.env.TOKEN_JWT, {
                id: userLogged.id,
                username: userLogged.name,
                dateCreated: Date.now()        
            });
            
            res.status(201).json(session);
            
        }catch(error){
            res.status(401).json({Authorization: false, message: error.message} );
        }
    };
}