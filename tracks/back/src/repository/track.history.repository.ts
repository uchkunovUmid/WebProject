import {Repository} from "typeorm";
import {TrackHistoryEntity} from "../entities/track.history.entity";
import {appDataSource} from "../config/dataSource";
import {ITrackHistory} from "../interface/ITrack.history";
import {TrackHistoryDto} from "../dto/track.history.dto";
import {IUserInterface} from "../interface/IUser.interface";

export class TrackHistoryRepository extends Repository<TrackHistoryEntity> {
    constructor() {
        super(TrackHistoryEntity,appDataSource.createEntityManager());

    }

    async trackHistory(trackHistoryDto:TrackHistoryDto):Promise<ITrackHistory> {
        return await this.save(trackHistoryDto)
    }

		async getTrackHistory(userId:number):Promise<ITrackHistory[]> {
			const track = await this.find({ 
				where:{userId: userId},
				relations:{track:true,users:true},
				order:{datetime:"DESC"}
			})

			if (!track) {
				throw new Error("track с таким айди нету")
		}

		return track
		}
}