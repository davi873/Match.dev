import UserRepository from "../../repositories/implementations/UserRepository";
import { Login } from "./LoginController";
import { LoginUseCase } from "./LoginUseCase";

const userRepository = new UserRepository();
const loginUseCase = new LoginUseCase(userRepository);
const loginController = new Login(loginUseCase);

export { loginController }