import {AuthService} from "../service/auth.service";
import {RequestHandler} from "express";
import {plainToInstance} from "class-transformer";
import {RegisterLoginUserDto} from "../dto/register.login.user.dto";
import {RequestWithUser} from "../interface/Request.interface";

export class AuthController {
    private service:AuthService

    constructor() {
        this.service = new AuthService()
    }

    signIn:RequestHandler = async (req,res) => {
        try {
            const signInUserDto = plainToInstance(RegisterLoginUserDto,req.body);
            const user = await this.service.signIn(signInUserDto);
            return res.send(user)
        } catch (e) {
           return  res.status(400).send((e as Error).message);
        }
    }

    register:RequestHandler = async (req,res) => {
        try {

            const registerUserDto = plainToInstance(RegisterLoginUserDto,req.body,{excludeExtraneousValues:true});
            const users = await this.service.register(registerUserDto)
            return res.send(users)
        } catch (e) {
            console.dir(e)
            if ((e as {code:string}).code === 'ED_DUP_ENTRY') {
                return res.status(400).send({error:{message: 'user already exists'}});
            }
        }
        return res.status(500).send({error:{message:'internal server error'}});



    }

    secret:RequestHandler = async (req:RequestWithUser,res) => {
				req.user
        return res.send({message:`some secret message`});


    };

    logout: RequestHandler = async (req: RequestWithUser, res) => {
        if (!req.user?.token) return res.send({ message: `success ` });
        try {
            const { token } = req.user;

            await this.service.logout(token);
            return res.send({ message: `success ` });
        } catch (e) {
            console.log(e);

            return res.status(500).send({ error: { message: 'Internal server error' } });
        }
    };

}