import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ArtistEntities} from "./artist.entities";


@Entity('album')
export class AlbumEntities {
    @PrimaryGeneratedColumn()
    id!:number;
    @Column()
    album_name!:string;
    @Column()
    year!:number;
    @Column()
    album_image!:string;
    @Column()
    artistId!:number;
		@Column({default:false})
		published!: true | false;
    @ManyToOne(() => ArtistEntities,{ cascade: true })
    @JoinColumn({name:'artistId'})
    artist!:ArtistEntities;
}