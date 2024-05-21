import { RequestHandler } from 'express';
import { IRoute } from '../../../../hw-7/back/src/interface/IRoute.interface';

export interface AppInit {
    port: number;
    middlewares: RequestHandler[];
    routers: IRoute[];
}
