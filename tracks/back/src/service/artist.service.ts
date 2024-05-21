import {ArtistRepository} from "../repository/artist.repository";
import {IArtistInterface} from "../interface/IArtist.interface";
import {ArtistDto} from "../dto/artist.dto";
import {validate} from "class-validator";
import {formatErrors} from "../helper/formatErrots";

export class ArtistService {
    private repository:ArtistRepository;

    constructor() {
        this.repository = new ArtistRepository()
    }

    getArtists = async ():Promise<IArtistInterface[]> =>  {
        return await this.repository.getArtists()
};
    createArtist = async (artistDto:ArtistDto):Promise<IArtistInterface> =>  {
        const error =await validate(artistDto, {whitelist:true,validationError:{target:false}})
        if (error.length) throw formatErrors(error)
        return this.repository.createArtist(artistDto)
}

updatePublishById = async (id:number):Promise<IArtistInterface> => {
	return await this.repository.updatePublish(id)
}
}