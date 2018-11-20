import {AppConfigAdapter, AppConfigModel, SessionAdapter, SessionModel} from '@monorepo-example/shared';
import {Body, Controller, Get, Options, Post, Query, Res, Session} from '@nestjs/common';
import {Response} from 'express';
import {sign} from 'jsonwebtoken';
import {get} from 'lodash';
import {of}from 'rxjs';
import {catchError, switchMap} from 'rxjs/operators';
import * as uuid from 'uuid/v4';

import {BaseConfigService} from '../config';
import {OauthService, UserService} from '../services';

@Controller('api')
export class ApiController {

    constructor(private readonly baseConfigService: BaseConfigService,
                private readonly oauthService: OauthService,
                private readonly userService: UserService) {
    }

    @Options('*')
    apiOptions(): void {
    }

    @Get('app-config')
    apiGetAppConfig(@Session() session: SessionModel = null): AppConfigModel {
        if (!session) {
            return AppConfigAdapter.adapt({});
        }
        return AppConfigAdapter.adapt({
            session: SessionAdapter.adapt({
                id: session.id,
                userId: session.userId,
            }),
        });
    }

    @Post('sign-out')
    apiPostSignOut(@Body() body,
                   @Res() res: Response,
                   @Session() session: SessionModel = null): any {
        if (get(body, 'id') === get(session, 'id')) {
            res.clearCookie('token');
            res.send({error: null});
        } else {
            res.send({error: true});
        }
    }

    @Get('sign-in/github')
    apiGetSignInGithub(@Res() res: Response): void {
        const state = Date.now().toString();
        this.oauthService.githubRedirectUrl(state)
            .subscribe((redirect_url) => res.redirect(redirect_url));
    }

    @Get('oauth/github')
    apiGetOauthGithub(@Session() session: SessionModel = null,
                      @Query('code') code: string,
                      @Query('state') state: string,
                      @Res() res: Response): void {
        this.oauthService.githubAuthenticate(code)
            .pipe(
                catchError((err) => {
                    console.log({err});
                    return of(null);
                }),
                switchMap((githubId: string) => this.userService.getUserByGithubId(githubId, true)),
            )
            .subscribe(
                (user) => {
                    const userId = user.id;
                    const encode = String;
                    const httpOnly = true;
                    const id = uuid();
                    const jwtToken = sign({userId, id}, this.baseConfigService.jwt.signing_key);
                    res.cookie('token', jwtToken, {encode, httpOnly});
                    res.redirect('http://localhost:4200/');
                }
            );
    }
}
