import { Inject, Injectable } from "@nestjs/common";

@Injectable()
export class AppJapanService {
    constructor(
        @Inject('APP_NAME')
        private readonly name: string,
        @Inject('MESSAGE')
        private readonly message: string
    ) {}
    getHello(): string {
        console.log({host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME})
        return 'HHHHHHH from ' + this.name + ' Message ' + this.message;
      }
}