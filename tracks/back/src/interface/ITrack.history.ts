import { TrackEntities } from "../entities/track.entities";

export interface ITrackHistory {
    id:number;
    trackId:number;
    userId:number;
    datetime:string;
		track: TrackEntities;
}