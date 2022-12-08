import { IGetSimplesNacionalDTO } from "../useCases/GetSimplesNacional/GetSimplesNacionalDTO";

export interface ISimplesNacionalProvider {
    get(cnpj:string): Promise<IGetSimplesNacionalDTO>
}
