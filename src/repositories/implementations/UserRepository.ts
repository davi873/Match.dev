import { DataTypes } from "sequelize";
import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";
import { ProfileEnum } from "../../constant/ProfileEnum";
import User from "../../entities/User";
import { IUserRepository } from "../IUserRespository";

@Table
export default class UserRepository extends Model implements IUserRepository {
    
    @PrimaryKey
    @Column(DataTypes.STRING)
    id: string;

    @Column(DataTypes.STRING)
    name: string;
    
    @Column(DataTypes.STRING)
    profile: ProfileEnum;

    @Column(DataTypes.STRING)
    login: string;

    @Column(DataTypes.STRING)
    password: string;

    async findByLogin(login: string): Promise<IUserRepository> {
        const userRepository: UserRepository = await UserRepository.findOne({where:{'login': login}});
        return userRepository;
    }

    create(user: any) {
        const userRepository: UserRepository = Object.assign(new UserRepository(), user);
        userRepository.save();
    }

}