import {IRoute} from "../interface/IRoute.interface";
import {Router} from "express";
import {ArtistController} from "../controller/artist.controller";
import {TrackController} from "../controller/track.controller";
import { authValidate } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/check.role";


export class TrackRoute implements IRoute {
    path:string = '/tracks'
    router:Router = Router();

    private controller:TrackController

    constructor() {
        this.controller = new TrackController();
        this.init()
    }

    private init() {
        this.router.get('/', this.controller.getTracks);
        this.router.post('/',authValidate,checkRole('admin','user'),this.controller.createTrack)
				this.router.put('/:id',authValidate,checkRole('admin'),this.controller.updatePublish);
    }

}