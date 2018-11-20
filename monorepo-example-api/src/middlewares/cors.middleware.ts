import {Injectable, MiddlewareFunction, NestMiddleware} from '@nestjs/common';
import * as cors from 'cors';

@Injectable()
export class CorsMiddleware implements NestMiddleware {
    resolve(corsOptions): MiddlewareFunction {
        return cors(corsOptions);
    }
}
