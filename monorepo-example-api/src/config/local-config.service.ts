import {Injectable} from '@nestjs/common';

import {BaseConfigService} from './config.module';

@Injectable()
export class LocalConfigService implements BaseConfigService {
    public jwt = {
        signing_key: 'have a secret here',
    };
    public oauth = {
        github: {
            access_token_url: 'https://github.com/login/oauth/access_token',
            authorize_url: 'https://github.com/login/oauth/authorize',
            client_id: '56509e88ff9eba87edd1',
            client_secret: '9c5819d89f0e5adc733b719b9bfaac1ae94d8f83',
            redirect_uri: 'http://localhost:3000/api/oauth/github',
            user_agent_header: 'METACEO',
            user_profile_url: 'https://api.github.com/user',
        },
    };
    public storage = {
        type: 'memory',
    };
}
