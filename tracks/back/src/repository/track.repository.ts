import {Repository} from "typeorm";
import {TrackEntities} from "../entities/track.entities";
import {appDataSource} from "../config/dataSource";
import {ITrackInterface} from "../interface/ITrack.interface";
import {TrackDto} from "../dto/track.dto";
import { validate } from "class-validator";
import { formatErrors } from "../helper/formatErrots";

export class TrackRepository extends Repository<TrackEntities> {
    constructor() {
        super(TrackEntities,appDataSource.createEntityManager());
    }

    async getTracks():Promise<ITrackInterface[]> {
        return await this.find({relations:{album:true}})
    }

    async getTracksByAlbum(albumId:number):Promise<ITrackInterface[]> {
        const track =  await this.find({where :{albumId},relations:{album:true},order:{track_number: 'ASC'}});

        if (!track) {
            throw new Error('альбома с таким айди нету')
        }

        return track
    }

    async createTrack(trackDto:TrackDto):Promise<ITrackInterface> {
			const error =await validate(trackDto, {whitelist:true,validationError:{target:false}})
			if (error.length) throw formatErrors(error)
        return this.save(trackDto)
    }

		async updatePublish(id: number): Promise<ITrackInterface> {
			const album = await this.findOne({
					where:{id}
				});

			if (!album) {
					throw new Error('Альбом с указанным ID не найден.');
			}
			album.published = true;
			return await this.save(album);
	}
}