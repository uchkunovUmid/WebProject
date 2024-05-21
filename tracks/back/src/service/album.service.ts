import {AlbumRepository} from "../repository/album.repository";
import {IAlbumInterface} from "../interface/IAlbum.interface";
import {AlbumDto} from "../dto/album.dto";
import {validate} from "class-validator";
import {formatErrors} from "../helper/formatErrots";

export class AlbumService {
    private repository:AlbumRepository
    constructor() {
        this.repository = new AlbumRepository()
    }

    getAlbums = async ():Promise<IAlbumInterface[]> => {
        return this.repository.getAlbums()
    };

    getAlbumByArtistId = async (artistId:number):Promise<IAlbumInterface[]> => {
        return this.repository.getAlbumsByArtist(artistId)
    }

    createAlbum = async (albumDto:AlbumDto):Promise<IAlbumInterface> => {


        const error = await validate(albumDto, {whitelist:true,validationError:{target:false}})
        if (error.length) throw formatErrors(error)
        return this.repository.createAlbum(albumDto)
    }

    deleteAlbum = async (id:number):Promise<IAlbumInterface> => {

        const deleteMy= this.repository.deleteAlbum(id);

        if(!deleteMy ) {
            throw new Error('invalid id')
        }
            return deleteMy

    }

    getAlbum = async (id:number):Promise<IAlbumInterface> => {
        const album = this.repository.getAlbum(id);
    if (!album){
            throw new Error('invalid id')
    } else {
        return album
    }
    }

		updatePublishById = async (id:number):Promise<IAlbumInterface> => {
			return await this.repository.updatePublish(id)
		}
}