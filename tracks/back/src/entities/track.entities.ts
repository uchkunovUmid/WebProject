import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {AlbumEntities} from "./album.entities";


@Entity('track')
export class TrackEntities {
    @PrimaryGeneratedColumn()
    id!:number;
    @Column()
    track_name!:string;
    @Column()
    duration!:number;
    @Column()
    albumId!:number;
		@Column()
		track_number!:number;
		@Column({default:false})
		published!: true | false;
    @ManyToOne(() => AlbumEntities)
    @JoinColumn({name:'albumId'})
    album!:AlbumEntities
}