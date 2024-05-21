import {AlbumService} from "../service/album.service";
import {RequestHandler} from "express";
import {plainToInstance} from "class-transformer";
import {AlbumDto} from "../dto/album.dto";
import { RequestWithUser } from "../interface/Request.interface";



export class AlbumController {
    private service:AlbumService;

    constructor() {
        this.service = new AlbumService()

    }

    getAlbums:RequestHandler = async (req, res) => {
			
			const  {artistId} = req.query;
				if (req.params && !artistId)  {
					res.send(await this.service.getAlbums())
				} else if (artistId){
						res.send(await this.service.getAlbumByArtistId(Number(artistId)))
				}

    }
    deleteAlbumById:RequestHandler = async (req, res) => {
        const {id} = req.params
        console.log('delete')
        res.send(await this.service.deleteAlbum(Number(id)))
    }
    getAlbumById:RequestHandler = async (req,res) => {
        const { id } = req.params;
        console.log('get')
        res.send(await this.service.getAlbum(Number(id)));
    }

    createAlbum:RequestHandler = async (req,res) => {
        const albumDto = plainToInstance(AlbumDto,req.body , { excludeExtraneousValues: true} );
        if (req.file) albumDto.album_image = req.file.filename

        try {
            const album = await this.service.createAlbum(albumDto)
            res.send(album)
        }catch (e) {
           if (Array.isArray(e)) {
               console.log(e)
               res.status(400).send(e)
           } else {
               res.status(500).send(e)
           }
        }
    }

		updatePublish:RequestHandler = async (req:RequestWithUser, res) => {
			const {id} = req.params
            const userRole = req.user?.role
			console.log('PUT')
            if (userRole !== 'admin') {
                return res.status(403).json({ error: 'У вас нет прав для выполнения этой операции' });
            }
            try {
                const updatedArtist = await this.service.updatePublishById(Number(id));
                res.send(updatedArtist);
            } catch (error) {
                res.status(500).json({ error: 'Произошла ошибка при выполнении операции' });
            }
	}
}