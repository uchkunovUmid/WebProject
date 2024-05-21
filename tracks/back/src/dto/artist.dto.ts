import {Expose} from "class-transformer";
import {IsNotEmpty, IsString} from "class-validator";

export class ArtistDto {
    @Expose()
    @IsNotEmpty({message:'Поле name обязательно'})
    @IsString()
    artist_name!:string;
    @Expose()
    @IsNotEmpty({message:'Поле artist_image обязательно'})
    artist_image!:string;
    @Expose()
    @IsNotEmpty({message:'Поле description обязательно'})
    @IsString()
    description!:string;
}