import { RequestHandler } from 'express';
import {AuthService} from "../service/auth.service";
import {UserRepository} from "../repository/user.repository";
import {RequestWithUser} from "../interface/Request.interface";
import { ArtistRepository } from '../repository/artist.repository';

const userService = new AuthService();
const userRepository = new UserRepository();
const artistPublish = new ArtistRepository()
export const authValidate: RequestHandler = async (req: RequestWithUser, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).send({ error: { message: 'No token present' } });
        }
        const user = await userService.getUserByToken(token);
        const historyToken = await userRepository.findOneBy({ token })
        if (!user || !historyToken) return res.status(401).send({ error: { message: 'Wrong token' } });
        req.user = user;
        return next();
    } catch (e) {
        return res.status(500).send({ error: { message: 'Internal server error' } });
    }
};
