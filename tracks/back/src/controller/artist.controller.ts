import {ArtistService} from "../service/artist.service";
import { RequestHandler} from "express";
import {plainToInstance} from "class-transformer";
import {ArtistDto} from "../dto/artist.dto";
import {RequestWithUser} from "../interface/Request.interface";


export class ArtistController {
    private service:ArtistService

    constructor() {
        this.service = new ArtistService()
    }

    getArtists:RequestHandler = async (req,res) => {
        res.send( await this.service.getArtists())
    }
    createArtist:RequestHandler = async (req, res) => {
        const artistDto = plainToInstance(ArtistDto, req.body,{ excludeExtraneousValues: true });
        if(req.file)  artistDto.artist_image =req.file.filename;

    try {
    const artist = await this.service.createArtist(artistDto);
    res.send(artist)
    } catch (e) {
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