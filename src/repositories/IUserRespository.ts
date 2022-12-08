import { ProfileEnum } from "../constant/ProfileEnum";
import User from "../entities/User";

export interface IUserRepository{

    id: string | null,
    name: string,
    profile: ProfileEnum,
    login: string,
    password: string

    findByLogin(login: string): Promise<IUserRepository>;
    create(user: User);
}