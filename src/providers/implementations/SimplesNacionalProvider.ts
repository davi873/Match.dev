
import axios from 'axios'
import { IGetSimplesNacionalDTO } from "../../useCases/GetSimplesNacional/GetSimplesNacionalDTO";
import { ISimplesNacionalProvider } from "../ISimplesNacionalProvider";

type SimplesNacionalProviderResponse = {
    code: number;
    code_message: string;
    data: {
        cnpj: string;
        consulta_datahora:Date;
        simples_nacional_situacao: string;
        simei_situacao: string;
    }
};

const PREFIX_SIMPLES_NACINAL:string = 'Optante pelo Simples Nacional desde';

export class SimplesNacionalProvider implements ISimplesNacionalProvider{
    
    async get(cnpj: string): Promise<IGetSimplesNacionalDTO> {

        try{
            //UPDATE MATCH DEV
            const result = await this.mockMactchDev(cnpj);

                // const result = await axios.post<SimplesNacionalProviderResponse>(
                //     process.env.URL_SIMPLES_API,
                //     {cnpj},
                //     {headers: {
                //         'Content-Type': 'application/json',
                //         'Authorization': process.env.TOKEN_SIMPLES_API
                //     }});
    
                const dataResult = result.data;
    
                const simplesDTO: IGetSimplesNacionalDTO = {} as IGetSimplesNacionalDTO;
    
                simplesDTO.cnpj = dataResult.cnpj;
                simplesDTO.isSimplesNacional = this.checkStatusSimplesNacional(dataResult.simples_nacional_situacao);
                simplesDTO.statusSimeiStr = dataResult.simei_situacao;
                simplesDTO.statusSimplesNacionalStr = dataResult.simples_nacional_situacao;

                return simplesDTO;

        } catch(err){
            throw err;
        }
    }

    checkStatusSimplesNacional(statusSimplesNacional: string): boolean{
        return (statusSimplesNacional.indexOf(PREFIX_SIMPLES_NACINAL) != -1);
    }

    async mockMactchDev(cnpj: string): Promise<SimplesNacionalProviderResponse>{
        return new Promise<SimplesNacionalProviderResponse>((resolve) => {
            const mockedResult = {
                code: 200,
                code_message: 'OK',
                data: {
                    cnpj,
                    consulta_datahora: new Date(),
                    simples_nacional_situacao: 'Optante pelo Simples Nacional desde 01/01/2010',
                    simei_situacao: 'Não optante pelo Simei',
                }

            } as SimplesNacionalProviderResponse
            resolve(mockedResult)
        })
    }

}