import {Injectable, MiddlewareFunction, NestMiddleware} from '@nestjs/common';
import {Request} from 'express';
import {verify} from 'jsonwebtoken';

import {BaseConfigService} from '../config';

@Injectable()
export class JwtSessionMiddleware implements NestMiddleware {

    constructor(private readonly baseConfigService: BaseConfigService) {
    }

    public static getToken(req: Request): string {
        if (req.headers.authorization) {
            const authorizationPair = req.headers.authorization.split(' ');
            if (authorizationPair[0] === 'Bearer') {
                return authorizationPair[1];
            }
        }
        if (req.cookies && req.cookies.token) {
            return req.cookies.token;
        }
        if (req.query && req.query.token) {
            return req.query.token;
        }
    }

    resolve(...args: any[]): MiddlewareFunction {
        return (req, res, next) => {
            const access_token = JwtSessionMiddleware.getToken(req);
            if (access_token) {
                try {
                    (req as any).session = verify(access_token, this.baseConfigService.jwt.signing_key);
                } catch(err) {
                    (req as any).session = null;
                }
            }
            next()
        };
    }

}
