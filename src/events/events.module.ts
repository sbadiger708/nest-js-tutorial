import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attendee } from './attendee.entity';
import { Events } from './event.entity';
import { EventsController } from './events.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([Events, Attendee]),
    ],
    controllers: [EventsController],
    providers: []
})
export class EventsModule {}
