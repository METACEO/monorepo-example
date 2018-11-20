import {Get, Controller} from '@nestjs/common';

import * as servicesRoot from '../services';

@Controller()
export class AppController {
    constructor(private readonly appService: servicesRoot.AppService) {
    }

    @Get()
    root(): string {
        return this.appService.root();
    }
}
