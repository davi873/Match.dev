import { SimplesNacional } from "../../entities/SimplesNacional";
import { ISimplesNacionalProvider } from "../../providers/ISimplesNacionalProvider";
import { ISimplesNacionalRepository } from "../../repositories/ISimplesNacionalRepository";
import { IGetSimplesNacionalDTO, IGetSimplesNacionalDTORequest } from "./GetSimplesNacionalDTO";

export class GetSimplesNacionalUseCase {

    constructor(
        private simplesNacionalRepository: ISimplesNacionalRepository,
        private simplesNacionalProvider: ISimplesNacionalProvider
    ){}

   async execute (simplesNacional: IGetSimplesNacionalDTORequest): Promise<IGetSimplesNacionalDTO> {

        const simplesAlreadyExists = await this.simplesNacionalRepository.findByCNPJ(simplesNacional.cnpj);

        if(simplesAlreadyExists){
            const today = new Date();
            if(today > simplesAlreadyExists.endDate){
                return this.getAndSaveSimpleNacional(simplesNacional.cnpj);
            } else {
                return simplesAlreadyExists;
            }
        } else{
            return this.getAndSaveSimpleNacional(simplesNacional.cnpj);
        }
    }

    private async getAndSaveSimpleNacional(cnpj: string): Promise<IGetSimplesNacionalDTO> {
        const simpleDTO:IGetSimplesNacionalDTO = await this.simplesNacionalProvider.get(cnpj);
        const simplesModel = new SimplesNacional(null, simpleDTO.cnpj, simpleDTO.isSimplesNacional,simpleDTO.statusSimeiStr, simpleDTO.statusSimplesNacionalStr);
        simpleDTO.startDate = simplesModel.startDate;
        simpleDTO.endDate = simplesModel.endDate;
        return  await this.simplesNacionalRepository.create(simplesModel);
    }
}