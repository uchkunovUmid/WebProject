import {TrackHistoryService} from "../service/track.history.service";
import {RequestHandler} from "express";
import {plainToInstance} from "class-transformer";
import {TrackHistoryDto} from "../dto/track.history.dto";

export class TrackHistoryController {
    private service: TrackHistoryService;

    constructor() {
        this.service = new TrackHistoryService();
    }

        trackHistory:RequestHandler = async (req,res) => {
                try {
                    const trackHistoryDto = plainToInstance(TrackHistoryDto,req.body,{excludeExtraneousValues:true});
                    const trackHistory = await this.service.trackHistory(trackHistoryDto)
                    return res.send(trackHistory)
                }catch (e) {
                    console.dir(e)
                    if ((e as {code:string}).code === 'ED_DUP_ENTRY') {
                        return res.status(400).send({error:{message: 'user already exists'}});
                    }
                }
            return res.status(500).send({error:{message:'internal server error'}});

        };
				getTrackHistory:RequestHandler = async (req,res) => {
					const  {userId} = req.query;
					console.log('getTrackHistory');
					console.log(userId);
					
					
					if (userId) {
						res.send( await this.service.getTrackHistory(Number(userId)));
					} else  {
						throw new Error('some error')
					}

				}

}