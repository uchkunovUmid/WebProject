import {IRoute} from "../interface/IRoute.interface";
import {Router} from "express";
import {AlbumController} from "../controller/album.controller";
import {albumRoot} from "../middlewares/album";
import { authValidate } from "../middlewares/auth.middleware";
import { checkRole } from "../middlewares/check.role";


export class AlbumRoute implements IRoute {
    path:string = '/albums';
    router:Router = Router()
    private controller:AlbumController;

    constructor() {
        this.controller = new AlbumController()
        this.init()
    }

    private init() {
        this.router.get('/', this.controller.getAlbums);
        this.router.get('/:id',this.controller.getAlbumById);
        this.router.delete('/:id',this.controller.deleteAlbumById);
        this.router.post('/',authValidate,checkRole('admin','user'),albumRoot.single('album_image'),this.controller.createAlbum)
				this.router.put('/:id',authValidate,checkRole('admin'),this.controller.updatePublish);

    }
}