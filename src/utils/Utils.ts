import { cnpj } from 'cpf-cnpj-validator'
import { Message } from '../constant/Message';

    export const checkAndFormatCNPJ = (parmCnpj: string): string  => {
        let numberCnpj:string;
        numberCnpj = parmCnpj.replace(/[^0-9\.]+/g, '');

        if(!cnpj.isValid(String(numberCnpj))){
            throw new Error(Message.ERROR_INVALID_CNPJ);
        }
        return numberCnpj;
    }
