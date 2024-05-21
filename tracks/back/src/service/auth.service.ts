import {UserRepository} from "../repository/user.repository";
import {RegisterLoginUserDto} from "../dto/register.login.user.dto";
import {IUserInterface} from "../interface/IUser.interface";


export class AuthService {
    private repository:UserRepository

    constructor() {
        this.repository = new UserRepository()
    }

    signIn = async (signIn:RegisterLoginUserDto):Promise<IUserInterface> => {
        return await this.repository.signIn(signIn)
    }

    register = async (registerUserDto:RegisterLoginUserDto):Promise<IUserInterface> => {
        return await this.repository.register(registerUserDto)
    }
    getUserByToken = async (token:string) :Promise<IUserInterface | null> => {
        return await this.repository.getUserByToken(token);
    };

    async logout(token: string): Promise<void> {
        await this.repository.clearToken(token);
    }
}