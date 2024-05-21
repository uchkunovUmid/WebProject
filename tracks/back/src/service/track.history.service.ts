import {TrackHistoryDto} from "../dto/track.history.dto";
import {ITrackHistory} from "../interface/ITrack.history";
import {validate} from "class-validator";
import { TrackHistoryRepository } from "../repository/track.history.repository";

export class TrackHistoryService {
    private repository:TrackHistoryRepository

    constructor() {
        this.repository = new TrackHistoryRepository()

    }
    trackHistory = async(trackHistoryDto:TrackHistoryDto):Promise<ITrackHistory> => {
        const timestamp:string = new Date().toISOString();
        const newTrackDate = {
            datetime:timestamp,
            ...trackHistoryDto
        }
        const errors = await validate(trackHistoryDto, { whitelist: true, validationError: { target: false, value: false } });
        if (errors.length) throw errors;
        return await this.repository.trackHistory(newTrackDate)
}

getTrackHistory = async(userId:number):Promise<ITrackHistory[]> => {
	const log = await this.repository.getTrackHistory(userId)
	console.log(log)
  	return log
}

}