import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import { SimplesNacional } from "../../entities/SimplesNacional";
import { IGetSimplesNacionalDTO } from "../../useCases/GetSimplesNacional/GetSimplesNacionalDTO";
import { ISimplesNacionalRepository } from "../ISimplesNacionalRepository";

@Table
export class SimplesNacionalRepository extends Model implements ISimplesNacionalRepository{
 
    @PrimaryKey
    @Column(DataType.STRING)
    public id: string;

    @Column(DataType.STRING)
    public cnpj: string;

    @Column(DataType.BOOLEAN)
    public isSimplesNacional: boolean;

    @Column(DataType.DATE)
    public startDate: Date;

    @Column(DataType.DATE)
    public endDate: Date;

    @Column(DataType.STRING)
    statusSimeiStr: string;

    @Column(DataType.STRING)
    statusSimplesNacionalStr: string;


    async findByCNPJ(cnpj: string): Promise<IGetSimplesNacionalDTO> | null {
        
        const simplesRepository = await SimplesNacionalRepository.findOne({where:{'cnpj': cnpj}});
        if(!simplesRepository){
            return null;
        }
        return this.mapperRepositoryToDto(simplesRepository);
    }

    async create(simplesNacional: SimplesNacional): Promise<IGetSimplesNacionalDTO> {

        this.id = simplesNacional.id;
        this.cnpj = simplesNacional.cnpj;
        this.isSimplesNacional = simplesNacional.isSimplesNacional;
        this.startDate = simplesNacional.startDate;
        this.endDate = simplesNacional.endDate;
        this.statusSimeiStr = simplesNacional.statusSimeiStr;
        this.statusSimplesNacionalStr = simplesNacional.statusSimplesNacionalStr;
        return this.mapperRepositoryToDto(await this.save())
    }

    mapperRepositoryToDto(simplesRepository: SimplesNacionalRepository):IGetSimplesNacionalDTO{
        const simplesDTO = {} as IGetSimplesNacionalDTO
        simplesDTO.id = simplesRepository.id;
        simplesDTO.cnpj = simplesRepository.cnpj+"";
        simplesDTO.isSimplesNacional = simplesRepository.isSimplesNacional;
        simplesDTO.startDate = simplesRepository.startDate;
        simplesDTO.endDate = simplesRepository.endDate;
        simplesDTO.statusSimeiStr = simplesRepository.statusSimeiStr;
        simplesDTO.statusSimplesNacionalStr = simplesRepository.statusSimplesNacionalStr;
        return simplesDTO;
    }
}