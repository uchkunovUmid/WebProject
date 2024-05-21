import {Repository} from "typeorm";
import {ArtistEntities} from "../entities/artist.entities";
import {appDataSource} from "../config/dataSource";
import {IArtistInterface} from "../interface/IArtist.interface";
import {ArtistDto} from "../dto/artist.dto";
import {validate} from "class-validator";
import {formatErrors} from "../helper/formatErrots";


export class ArtistRepository extends Repository<ArtistEntities> {
    constructor() {
        super(ArtistEntities, appDataSource.createEntityManager());
    }

       async getArtists():Promise<IArtistInterface[]> {
                return await this.find()
        }

        async createArtist(artistDto:ArtistDto):Promise<IArtistInterface> {
            const error =await validate(artistDto, {whitelist:true,validationError:{target:false}})
            if (error.length) throw formatErrors(error)
                return await this.save(artistDto)
        }
				async updatePublish(id: number): Promise<IArtistInterface> {
					const artist = await this.findOne({
							where:{id}
						});
	
					if (!artist) {
							throw new Error('Альбом с указанным ID не найден.');
					}
					artist.published = true;
					return await this.save(artist);
			}
}