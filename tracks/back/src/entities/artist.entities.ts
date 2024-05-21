import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";


@Entity('artist')
export class ArtistEntities {
        @PrimaryGeneratedColumn()
        id!:number;
        @Column()
        artist_name!:string;
        @Column()
        artist_image!:string;
        @Column("text")
        description!:string;
				@Column({default:false})
				published!: true | false;
}