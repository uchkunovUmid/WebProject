import {Repository} from "typeorm";
import {User} from "../entities/user.entity";
import {appDataSource} from "../config/dataSource";
import {RegisterLoginUserDto} from "../dto/register.login.user.dto";
import {IUserInterface} from "../interface/IUser.interface";


export class UserRepository extends Repository<User> {
    constructor() {
        super(User,appDataSource.createEntityManager());
    }

    async signIn(signInUserDto: RegisterLoginUserDto): Promise<IUserInterface> {
        const user = await this.findOne({ where: { username: signInUserDto.username } });
        if (!user) throw new Error('User not exist');

        const isMatch = await user.comparePassword(signInUserDto.password);

        if (!isMatch) throw new Error('Login or password is wrong');

        user.generateToken();
        const userWithToken = await this.save(user);
        const { password, ...userWithoutTokenPassword } = userWithToken;
        return userWithoutTokenPassword;
    }

		async register(registerUserDto: RegisterLoginUserDto): Promise<IUserInterface> {
			const userData = await this.create(registerUserDto);
			userData.generateToken();
			const user = await this.save(userData);
			const { password, ...userWithoutPassword } = user;
			return userWithoutPassword;
		}


    async getUserByToken(token:string) {
        return await this.findOneBy({token});

    }

		async getUserByUsername(username: string): Promise<IUserInterface | null> {
			return await this.findOneBy({ username });
		}

    async clearToken(token: string) {
        const user = await this.getUserByToken(token);
				if (!user) return;
        user?.generateToken();
				await	this.save(user);
    }



}