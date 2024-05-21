import {TrackRepository} from "../repository/track.repository";
import {ITrackInterface} from "../interface/ITrack.interface";
import {TrackDto} from "../dto/track.dto";
import {validate} from "class-validator";
import {formatErrors} from "../helper/formatErrots";

export class TrackService {
    private repository:TrackRepository

    constructor() {
        this.repository = new TrackRepository()
    }

    getTracks = async ():Promise<ITrackInterface[]> => {
        return this.repository.getTracks()
}

    getTracksByAlbumId = async (albumId:number) :Promise<ITrackInterface[]> => {
        return this.repository.getTracksByAlbum(albumId)
    }

    createTrack = async (trackDto:TrackDto) :Promise<ITrackInterface> => {
        const error =await validate(trackDto, {whitelist:true,validationError:{target:false}})
        if (error.length) throw formatErrors(error)
        return this.repository.createTrack(trackDto)
}

updatePublishById = async (id:number):Promise<ITrackInterface> => {
	return await this.repository.updatePublish(id)
}
}