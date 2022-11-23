import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Attendee } from "./attendee.entity";

@Entity('event', { name: 'event' })
export class Events {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    when: Date;
    
    @Column()
    address: string;

    @OneToMany(() => Attendee, (attendee) => attendee.event)
    attendees: Attendee[];
}