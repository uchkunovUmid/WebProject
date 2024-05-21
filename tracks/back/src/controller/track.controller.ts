import {AlbumService} from "../service/album.service";
import {RequestHandler} from "express";
import {plainToInstance} from "class-transformer";
import {AlbumDto} from "../dto/album.dto";
import {TrackService} from "../service/track.service";
import {TrackDto} from "../dto/track.dto";
import { RequestWithUser } from "../interface/Request.interface";


export class TrackController {
    private service:TrackService;

    constructor() {
        this.service = new TrackService()

    }

    // getTracks:RequestHandler = async (req, res) => {
    //     res.send(await this.service.getTracks())
    // }

    // getTracksByAlbumId:RequestHandler = async (req,res) => {
    //     const albumId = req.query.albumId
    //     res.send(this.service.getTracksByAlbumId(Number(albumId)))
    // }

		getTracks:RequestHandler = async (req, res) => {

			const  {albumId} = req.query;
				if (req.params && !albumId)  {
					res.send(await this.service.getTracks())
				} else if (albumId){
						res.send(await this.service.getTracksByAlbumId(Number(albumId)))
				}

    }

    createTrack:RequestHandler = async (req,res) => {
        const trackDto =plainToInstance(TrackDto, req.body, {excludeExtraneousValues:true});
        try {
            const track = await this.service.createTrack(trackDto);
            res.send(track)
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