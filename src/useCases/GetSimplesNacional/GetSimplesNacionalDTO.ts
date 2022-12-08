export interface IGetSimplesNacionalDTO {

    id: string,
    cnpj: string,
    isSimplesNacional: boolean,
    startDate: Date,
    endDate: Date
    statusSimeiStr: string,
    statusSimplesNacionalStr: string,
    
}

export interface IGetSimplesNacionalDTORequest {
    cnpj: string,
}