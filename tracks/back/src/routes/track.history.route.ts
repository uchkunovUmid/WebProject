import {IRoute} from "../interface/IRoute.interface";
import {Router} from "express";
import {TrackHistoryController} from "../controller/track.history.controller";
import {authValidate} from "../middlewares/auth.middleware";

export class TrackHistoryRoute implements IRoute {
    path:string = '/track_history';
    router:Router = Router()
    private controller:TrackHistoryController;

    constructor() {
        this.controller = new TrackHistoryController();
        this.init()
    }

    private init() {
        this.router.post('/',authValidate,this.controller.trackHistory)
				this.router.get('/',this.controller.getTrackHistory)
    }
}