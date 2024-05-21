import express from 'express';
import { Application, RequestHandler } from 'express';
import {appDataSource} from "./config/dataSource";
import {IRoute} from "./interface/IRoute.interface";;
import errorHandler from './middlewares/error.handler.middlewares';
import notFoundHandler from './middlewares/notFound';
import {AppInit} from "./interface/AppInit.interface";


class App {
    public app: Application;
    public port: number;
    constructor(appInit: AppInit) {
        this.app = express();
        this.port = appInit.port;

        this.initAssets();
        this.initMiddlewares(appInit.middlewares);
        this.initRoutes(appInit.routers);
				this.initErrorHandler();
    }
    private initMiddlewares(middlewares: RequestHandler[]) {
        middlewares.forEach((middleware) => {
            this.app.use(middleware);
        });
    }
		private initErrorHandler() {
			this.app.use(errorHandler);
			this.app.use('*', notFoundHandler);
		}
    private initRoutes(routes: IRoute[]) {
        routes.forEach((route) => {
            this.app.use(route.path, route.router);
        });
    }
    private initAssets() {
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }
    public async listen() {
        await appDataSource.initialize();
        this.app.listen(this.port, () => {
            console.log(`App listening  on the http://localhost:${this.port}`);
        });

        process.on('exit', () => {
            appDataSource.destroy();
        });
    }
}

export default App;
