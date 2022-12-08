import { Request, Response } from "express";
import  { checkAndFormatCNPJ }  from '../../utils/Utils'
import { Message } from "../../constant/Message";
import { IGetSimplesNacionalDTORequest } from "./GetSimplesNacionalDTO";
import { GetSimplesNacionalUseCase } from "./GetSimplesNacionalUseCase";

export class GetSimplesNacionalController {

    constructor(
        private getSimplesNacionalUserCase: GetSimplesNacionalUseCase
    ){}

    async execute(req: Request<{},{}, IGetSimplesNacionalDTORequest>, resp: Response, next?): Promise<any> {

        try{
            
            let dataRequest: IGetSimplesNacionalDTORequest = req.body;

            if(!dataRequest.cnpj){
                throw new Error(Message.ERROR_EXPECTED_CNPJ);
            }
            
            dataRequest.cnpj = checkAndFormatCNPJ(String(dataRequest.cnpj));

            const result  = await this.getSimplesNacionalUserCase.execute(dataRequest);

            resp.status(200).send(result);
            
            return result;
        } catch (err){
            resp.status(400).send({message: err.message || Message.UNEXPECTED_ERROR})
            next(err);
        }

    }

}