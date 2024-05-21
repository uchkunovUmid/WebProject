import {IRoute} from "../interface/IRoute.interface";
import {Router} from "express";
import {ArtistController} from "../controller/artist.controller";
import {artistRoot} from "../middlewares/artist";
import { authValidate } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/check.role";


export class ArtistRoute implements IRoute {
    path:string ='/artists';
    router:Router = Router();
    private controller:ArtistController

    constructor() {
        this.controller = new ArtistController();
        this.init()
}

    private init() {
        this.router.get('/',authValidate,checkRole('user','admin'),this.controller.getArtists);
				this.router.put('/:id',authValidate,checkRole('admin'),this.controller.updatePublish);
        this.router.post('/',authValidate,checkRole('user','admin'),artistRoot.single('artist_image'),this.controller.createArtist)
    }
}

