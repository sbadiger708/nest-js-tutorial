import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Events } from "./event.entity";

@Entity()
export class Attendee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Events, (event) => event.attendees, {
        nullable: false
    })
    @JoinColumn({
        name: 'event_id',
        referencedColumnName: 'id'
    })
    event: Events;
}