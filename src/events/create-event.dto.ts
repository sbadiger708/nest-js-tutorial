import { IsDateString, IsString, Length } from "class-validator";

export class CreateEventDto {
    @IsString()
    @Length(5, 255, { message: 'Name length is wrong!'})
    name: string;
    @Length(5, 255)
    description: string;
    @IsDateString()
    when: Date;
    @Length(5, 255)
    address: string;
}