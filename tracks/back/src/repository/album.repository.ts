import {Repository} from "typeorm";
import {AlbumEntities} from "../entities/album.entities";
import {appDataSource} from "../config/dataSource";
import {IAlbumInterface} from "../interface/IAlbum.interface";
import {AlbumDto} from "../dto/album.dto";
import {TrackRepository} from "./track.repository";

export class AlbumRepository extends Repository<AlbumEntities> {
    constructor() {
        super(AlbumEntities, appDataSource.createEntityManager());
    }

    async getAlbums():Promise<IAlbumInterface[]> {
        return await this.find({relations:{artist:true}})
    }

    async getAlbumsByArtist(artistId:number):Promise<IAlbumInterface[]> {
            const album = await this.find({
                where:{artistId},
                order: { year: 'ASC' },
                relations:{artist:true}
            })

        if (!album) {
            throw new Error("артиста с таким айди нету")
        }

        return album;
    }


    async getAlbum(id:number):Promise<IAlbumInterface> {
        const albumId = await this.findOne({
            where: {id},
            relations:{artist:true}
        })

        if (!albumId) {
            throw new Error("Артиста с таким не существует")
        }

        return albumId
    }

    async deleteAlbum(id: number): Promise<IAlbumInterface> {
        const album = await this.findOne({
            where:{id},
            relations:{artist:true}
        });

        if (!album) {
            throw new Error('Альбом с указанным ID не найден.');
        }



      return await this.remove(album);
    }

    async createAlbum(albumDto:AlbumDto):Promise<IAlbumInterface> {

        return await this.save(albumDto)
    }

		async updatePublish(id: number): Promise<IAlbumInterface> {
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