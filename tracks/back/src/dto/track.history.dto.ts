import {Expose} from "class-transformer";
import {IsNotEmpty} from "class-validator";

export class TrackHistoryDto {
    @Expose()
    @IsNotEmpty({message:'Поле userId обязательно'})
    userId!:number;
    @Expose()
    @IsNotEmpty({message:'Поле trackId обязательно'})
    trackId!:number;
}