import {Injectable} from '@nestjs/common';
import {waterfall} from 'async';
import * as request from 'request';
import {Observable, of, Subscriber} from 'rxjs';
import {URL} from 'url';

import {BaseConfigService} from '../config';

@Injectable()
export class OauthService {

    constructor(private readonly baseConfigService: BaseConfigService) {
    }

    public githubRedirectUrl(state?: string): Observable<string> {
        const url = new URL(this.baseConfigService.oauth.github.authorize_url);
        url.searchParams.set('client_id', this.baseConfigService.oauth.github.client_id);
        url.searchParams.set('redirect_uri', this.baseConfigService.oauth.github.redirect_uri);
        if (state) {
            url.searchParams.set('state', state);
        }
        return of(url.toString());
    }

    public githubAuthenticate(code: string): Observable<string> {
        return Observable.create((observer: Subscriber<string>) => {
            waterfall(
                [
                    (next) => {
                        request.post({
                            url: this.baseConfigService.oauth.github.access_token_url,
                            json: {
                                client_id: this.baseConfigService.oauth.github.client_id,
                                client_secret: this.baseConfigService.oauth.github.client_secret,
                                code,
                            },
                        }, (error, r, body: any) => {
                            if (error) {
                                next(error);
                            } else if (!body) {
                                next(new Error('oAuth: Bad access token response from GitHub'));
                            } else if (!body.access_token) {
                                next(new Error('oAuth: No access token from GitHub.'));
                            } else {
                                next(null, body.access_token);
                            }
                        })
                    },
                    (access_token: string, next) => {
                        request.get({
                            url: this.baseConfigService.oauth.github.user_profile_url,
                            json: true,
                            headers: {
                                'User-Agent': this.baseConfigService.oauth.github.user_agent_header,
                                Authorization: `token ${access_token}`,
                            },
                        }, (error, r, body) => {
                            if (error) {
                                next(error);
                            } else if (!body) {
                                next(new Error('oAuth: Bad profile response from GitHub.'))
                            } else if (!body.id) {
                                next(new Error('oAuth: No profile from GitHub profile.'))
                            } else {
                                next(null, body.id.toString());
                            }
                        });
                    },
                ],
                (error, github_id: string) => {
                    if (error) {
                        observer.error(error);
                    } else {
                        observer.next(github_id);
                        observer.complete();
                    }
                }
            );
        });
    }

}
