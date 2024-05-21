import {IRoute} from "../interface/IRoute.interface";
import {AuthController} from "../controller/auth.controller";
import {Router} from "express";
import {authValidate} from "../middlewares/auth.middleware";

export class UsersRoute implements IRoute {
    public path:string = '/users';
    public router:Router = Router();
    private controller:AuthController;

    constructor() {
        this.controller = new AuthController();
        this.init();
    }

    private init() {
        this.router.post('/register',this.controller.register);
        this.router.post('/sessions',this.controller.signIn);
        this.router.get('/secret',authValidate,this.controller.secret);
        this.router.delete('/logout', authValidate, this.controller.logout);

    }
}