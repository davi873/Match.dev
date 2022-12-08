import { SimplesNacional } from "../entities/SimplesNacional";
import { IGetSimplesNacionalDTO } from "../useCases/GetSimplesNacional/GetSimplesNacionalDTO";

export interface ISimplesNacionalRepository {

    id: string;
    cnpj: string;
    isSimplesNacional: boolean;
    startDate: Date;
    endDate: Date;
    statusSimeiStr: string;
    statusSimplesNacionalStr: string;

    findByCNPJ(cnpj:string): Promise<IGetSimplesNacionalDTO>;
    create(simplesNacional: SimplesNacional): Promise<IGetSimplesNacionalDTO>;
}