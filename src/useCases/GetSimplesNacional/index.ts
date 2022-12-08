import { SimplesNacionalProvider } from "../../providers/implementations/SimplesNacionalProvider";
import { SimplesNacionalRepository } from "../../repositories/implementations/SimplesNacionalRepository";
import { GetSimplesNacionalController } from "./GetSimplesNacionalController";
import { GetSimplesNacionalUseCase } from "./GetSimplesNacionalUseCase";

const simplesNacionalRepository: SimplesNacionalRepository = new SimplesNacionalRepository();
const simplesNacionalProvider: SimplesNacionalProvider = new SimplesNacionalProvider();

const getSimplesNacionalUseCase: GetSimplesNacionalUseCase = new GetSimplesNacionalUseCase(
    simplesNacionalRepository, simplesNacionalProvider
) 

const getSimplesNacionalController: GetSimplesNacionalController = new GetSimplesNacionalController(getSimplesNacionalUseCase);

export {getSimplesNacionalController}