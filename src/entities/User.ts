import { v4 as uuidv4 } from 'uuid';
import { ProfileEnum } from '../constant/ProfileEnum';

export default class User {

    public readonly id?: string;
    public name: string;
    public profile: ProfileEnum 
    public login: string;
    public password: string;

    constructor(
        id: string | null,
        name: string,
        profile: ProfileEnum,
        login: string,
        password: string
    ){
        if(!id){
            this.id = uuidv4();
        } else {
            this.id = id;
        }
        this.name = name;
        this.profile = profile;
        this.login = login;
        this.password = password;
    }
}