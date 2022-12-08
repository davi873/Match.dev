import { Router } from "express";
import { getSimplesNacionalController } from "./useCases/GetSimplesNacional";
import { loginController } from "./useCases/Login";

const routerAuth = Router();
const routerSimplesNacional = Router();

routerAuth.post('/auth',(req, resp) => loginController.execute(req, resp));
routerSimplesNacional.post('/simplesNacional',(req, resp, next) => getSimplesNacionalController.execute(req, resp, next));


export { routerSimplesNacional, routerAuth };