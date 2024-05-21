import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user.entity";
import {TrackEntities} from "./track.entities";

@Entity('track_history')

export class TrackHistoryEntity {
    @PrimaryGeneratedColumn()
    id!:number;
    @Column()
    datetime!:string;
		@Column()
    userId!: number;
		@ManyToOne(() => User)
    @JoinColumn({name:'userId'})
    users!:User;
    @Column()
    trackId!: number;
    @ManyToOne(() => TrackEntities)
    @JoinColumn({name:'trackId'})
    track!:TrackEntities;

}