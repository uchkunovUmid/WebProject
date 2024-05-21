import cors from 'cors';
import App from './app';
import logger from './middlewares/logger';
import { ArtistRoute } from './routes/artist.route';
import { AlbumRoute } from './routes/album.route';
import { TrackRoute } from './routes/track.route';
import { UsersRoute } from './routes/users.route';
import 'reflect-metadata';
import {TrackHistoryRoute} from "./routes/track.history.route";


const app = new App({
    port: 8000,
    middlewares: [logger(), cors()],
    routers: [new ArtistRoute(),new AlbumRoute(),new TrackRoute(),new UsersRoute(),new TrackHistoryRoute()],
});

app.listen();
