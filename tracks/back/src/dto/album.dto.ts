import {Expose} from "class-transformer";
import {IsNotEmpty, IsNumberString, IsString} from "class-validator";


export class AlbumDto {
    @Expose()
    @IsNotEmpty({message:'Поле album_name обязательно'})
    @IsString()
    album_name!:string
    @Expose()
    @IsNotEmpty({message:'Поле album_image обязательно'})
    @IsString()
    album_image!:string
    @Expose()
    @IsNotEmpty({message:'Поле year обязательно'})
    @IsString()
    year!:number
    @Expose()
    @IsNotEmpty({message:'Поле artistId обязательно'})
    @IsNumberString()
    artistId!:number

}