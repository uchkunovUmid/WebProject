import {Expose} from "class-transformer";
import {IsNotEmpty, IsString} from "class-validator";


export class TrackDto {
    @Expose()
    @IsNotEmpty({message:'Поле track_name обязательно'})
    @IsString()
    track_name!:string;
    @Expose()
    @IsNotEmpty({message:'Поле duration обязательно'})
    duration!:number;
    @Expose()
    @IsNotEmpty({message:'Поле albumId обязательно'})
    albumId!:number;
		@Expose()
    @IsNotEmpty({message:'Поле albumId обязательно'})
    track_number!:number;

}