import { Request, response, Response } from "express";
import {describe, expect, test} from '@jest/globals';
import  httpMocks  from 'node-mocks-http'

import { GetSimplesNacionalController } from "./GetSimplesNacionalController";
import { IGetSimplesNacionalDTORequest } from "./GetSimplesNacionalDTO";
import { GetSimplesNacionalUseCase } from "./GetSimplesNacionalUseCase";
import { Message } from "../../constant/Message";
import  * as utils  from "../../utils/Utils";
import { SimplesNacionalRepository } from "../../repositories/implementations/SimplesNacionalRepository";
import { SimplesNacionalProvider } from "../../providers/implementations/SimplesNacionalProvider";


jest.mock('./GetSimplesNacionalUseCase');
jest.mock('../../providers/implementations/SimplesNacionalProvider');
jest.mock('../../repositories/implementations/SimplesNacionalRepository');

const GetSimplesNacionalUseCaseMock = GetSimplesNacionalUseCase as jest.Mock<GetSimplesNacionalUseCase>;
const SimplesNacionalRepositoryMock = SimplesNacionalRepository as unknown as jest.Mock<SimplesNacionalRepository>;
const SimplesNacionalProviderMock = SimplesNacionalProvider as jest.Mock<SimplesNacionalProvider>;

const setup = () =>{
    const getSimplesNacionalUserCaseMock = new GetSimplesNacionalUseCaseMock() as jest.Mocked<GetSimplesNacionalUseCase>;
    const simplesNacionalRepository = new SimplesNacionalRepositoryMock() as jest.Mocked<SimplesNacionalRepository>;
    const simplesNacionalProvider = new SimplesNacionalProviderMock() as jest.Mocked<SimplesNacionalProvider>
    const requestMock = httpMocks.createRequest();
    const responseMock = httpMocks.createResponse();
    responseMock.status = jest.fn().mockReturnValue(responseMock);
    responseMock.send = jest.fn().mockReturnValue(responseMock);

    const sut = new GetSimplesNacionalController(getSimplesNacionalUserCaseMock);

    return{
        sut,
        getSimplesNacionalUserCaseMock,
        requestMock,
        responseMock,
        simplesNacionalRepository,
        simplesNacionalProvider
    }
}

describe('GetSimplesNacionalController', () =>{

    test('should throw an error with invalid request', async () =>{

        const { sut, requestMock, responseMock } = setup();
        requestMock.body = {} as IGetSimplesNacionalDTORequest;

        await sut.execute(requestMock, responseMock, (err) =>{
            expect(err).toBeTruthy();
            expect(err.message).toBe(Message.ERROR_EXPECTED_CNPJ);
        });
      
        expect(responseMock.status).toHaveBeenCalledWith(400);
       
    });


    test('should trow error with invalid cnpj', async () => {
       
        const {sut, requestMock, responseMock } = setup();
        requestMock.body = {
            cnpj:'11111111111'
        } as IGetSimplesNacionalDTORequest;
        
        await sut.execute(requestMock, responseMock , (err) =>{
            expect(err).toBeTruthy();
            expect(err.message).toBe(Message.ERROR_INVALID_CNPJ)
        });
        expect(responseMock.status).toHaveBeenCalledWith(400);
    });

    test('should call getSimplesNacionalUseCase once and get sucess', async () => {

        const {sut, requestMock, responseMock, getSimplesNacionalUserCaseMock } = setup();
        requestMock.body = {
            cnpj:'17931564000140'
        } as IGetSimplesNacionalDTORequest;

        const chekcAndFormatCNPJStub = jest.spyOn(utils, 'checkAndFormatCNPJ');
        const endDate = new Date();
        endDate.setMonth(endDate.getMonth() +1);
        const mockResult = {
            "id":"01",
            "cnpj": '17931564000140',
            "isSimplesNacional": true,
            "startDate": new Date(),
            "endDate": endDate,
            "statusSimeiStr": "NÃO enquadrado no SIMEI",
            "statusSimplesNacionalStr": "Optante pelo Simples Nacional desde 07/06/2021"
        }
        
        getSimplesNacionalUserCaseMock.execute.mockResolvedValueOnce(mockResult);

        await sut.execute(requestMock, responseMock, (err) =>{
            expect(err).toBeFalsy();
        });

        expect(chekcAndFormatCNPJStub).toHaveBeenCalledTimes(1);
        expect(getSimplesNacionalUserCaseMock.execute).toHaveBeenCalledWith(requestMock.body);
        expect(responseMock.status).toHaveBeenCalledWith(200);
        expect(responseMock.send).toHaveBeenCalledWith(mockResult);
    })
})