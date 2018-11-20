import {MiddlewareConsumer, Module} from '@nestjs/common';
import {ConfigModule} from './config';
import {StorageModule} from './storage';
import * as cookieParser from 'cookie-parser';
require('dotenv').config();

import * as controllersRoot from './controllers';
import * as middlewaresRoot from './middlewares';
import * as servicesRoot from './services';

@Module({
    imports: [
        ConfigModule,
        StorageModule,
    ],
    controllers: [
        controllersRoot.AppController,
        controllersRoot.ApiController,
    ],
    providers: [
        servicesRoot.AppService,
        servicesRoot.UserService,
        servicesRoot.OauthService,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(middlewaresRoot.CorsMiddleware)
            .with({credentials: true, origin: 'http://localhost:4200', preflightContinue: true, methods: 'GET,POST,PUT,DELETE,OPTIONS'})
            .forRoutes(controllersRoot.ApiController);
        consumer
            .apply(cookieParser(), middlewaresRoot.JwtSessionMiddleware)
            .forRoutes(controllersRoot.ApiController);
    }
}
