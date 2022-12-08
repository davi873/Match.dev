import { v4 as uuidv4 } from 'uuid';
import { IGetSimplesNacionalDTO } from '../useCases/GetSimplesNacional/GetSimplesNacionalDTO';

export class SimplesNacional implements IGetSimplesNacionalDTO{

    public readonly id: string;
    public readonly cnpj: string;
    public isSimplesNacional: boolean;
    private _startDate: Date;
    private _endDate: Date;
    public readonly statusSimeiStr: string;
    public readonly statusSimplesNacionalStr: string;

    constructor(
        id: string, 
        cnpj: string, 
        isSimplesNacional: boolean,
        statusSimeiStr: string,
        statusSimplesNacionalStr: string
        ){
    
        this.cnpj = cnpj;
        this.isSimplesNacional = isSimplesNacional;
        this.statusSimeiStr = statusSimeiStr;
        this.statusSimplesNacionalStr = statusSimplesNacionalStr
   
        this.setValiditySimplesNacional();
       
        if(!id){
            this.id = uuidv4();
        }
    }

    private setValiditySimplesNacional(){
        this._startDate = new Date();
        this._endDate = new Date();
        this._endDate.setMonth(this._startDate.getMonth() +1);
    }

    public get startDate(): Date {
        return this._startDate;
    }

    public get endDate(): Date {
        return this._endDate;
    }
}