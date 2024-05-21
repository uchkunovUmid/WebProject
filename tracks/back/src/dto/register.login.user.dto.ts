import {Expose} from "class-transformer";
import {IsNotEmpty, IsString} from "class-validator";
import { IsUserAlreadyExist } from "../validator/IsUniqueUserName";

export class RegisterLoginUserDto {
    @Expose()
    @IsString()
    @IsNotEmpty()
		@IsUserAlreadyExist({ message: 'User $value already exists. Choose another name.' })
    username!:string;

    @Expose()
    @IsString()
    @IsNotEmpty()
    password!:string;


}