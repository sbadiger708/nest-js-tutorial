import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Like, MoreThan, Repository } from "typeorm";
import { Attendee } from "./attendee.entity";
import { CreateEventDto } from "./create-event.dto";
import { Events } from "./event.entity";
import { UpdateEventDto } from "./update-event.dto";

@Controller('/events')
export class EventsController {
    private readonly logger = new Logger(EventsController.name);
    constructor(
        @InjectRepository(Events)
        private readonly repository: Repository<Events>,
        @InjectRepository(Attendee)
        private readonly attendee: Repository<Attendee>
    ) { }
    @Get()
    async findAll() {
        this.logger.log('Hit the FindAll API');
        const events = await this.repository.find({relations: ['attendees']});
        this.logger.debug(`Found ${events.length} Events!`)
        return events;
    }

    @Get('/practice2')
    async practice2() {
        const event = await this.repository.findOne({where: {id: 1}});
        const attendee = new Attendee()
        attendee.name = "Shiva";
        attendee.event = event;
        return await this.attendee.save(attendee)
    }

    @Get('/practice')
    async practice() {
        return await this.repository.find({
            select: ['id', 'name'],
            where: [
                {
                    id: MoreThan(6),
                    when: MoreThan(new Date('2022-10-19T13:00:00'))
                },
                {
                    description: Like('%Test1%')
                }
            ],
            //Offset in Sequelize
            take: 2,
            order: { id: 'ASC' }
        })
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id) {
        console.log(typeof id)
        const event = await this.repository.findOne(
            { where: { id: parseInt(id) }, relations: ['attendees'] },
            );
        if(!event) {
            throw new NotFoundException();
        }
        return event;
    }

    @Post()
    async create(@Body() input: CreateEventDto) {
        return await this.repository.save({
            ...input,
            when: new Date(input.when)
        })
    }

    @Patch(':id')
    async update(@Param('id') id, @Body() input: UpdateEventDto) {
        const event = await this.repository.findOne({ where: { id: parseInt(id) } })
        // return index;
        return await this.repository.save({
            ...event,
            ...input,
            when: input.when ? input.when : event.when
        })
    }

    @Delete(':id')
    // To specify perticualar status code
    // @HttpCode(204)
    async remove(@Param('id') id) {
        const event = await this.repository.findOne({ where: { id: parseInt(id) } });
        return await this.repository.remove(event);
    }
}