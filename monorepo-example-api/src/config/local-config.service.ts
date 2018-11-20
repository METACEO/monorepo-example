import {Injectable} from '@nestjs/common';

import {BaseConfigService} from './config.module';

@Injectable()
export class LocalConfigService implements BaseConfigService {
    public jwt = {
        signing_key: process.env.MONOREPO_EXAMPLE_JWT_SIGNINGKEY,
    };
    public oauth = {
        github: {
            access_token_url: process.env.MONOREPO_EXAMPLE_OAUTH_GITHUB_ACCESSTOKENURL,
            authorize_url: process.env.MONOREPO_EXAMPLE_OAUTH_GITHUB_AUTHORIZEURL,
            client_id: process.env.MONOREPO_EXAMPLE_OAUTH_GITHUB_CLIENTID,
            client_secret: process.env.MONOREPO_EXAMPLE_OAUTH_GITHUB_CLIENTSECRET,
            redirect_uri: process.env.MONOREPO_EXAMPLE_OAUTH_GITHUB_REDIRECTURI,
            user_agent_header: process.env.MONOREPO_EXAMPLE_OAUTH_GITHUB_USERAGENTHEADER,
            user_profile_url: process.env.MONOREPO_EXAMPLE_OAUTH_GITHUB_USERPROFILEURL,
        },
    };
    public storage = {
        type: process.env.MONOREPO_EXAMPLE_STORAGE_TYPE,
    };
}
