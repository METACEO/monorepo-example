import {Module} from '@nestjs/common';

import {LocalConfigService} from './local-config.service';

export abstract class BaseConfigService {
    public jwt: {
        signing_key: string;
    };
    public oauth: {
        github: {
            access_token_url: string;
            authorize_url: string;
            client_id: string;
            client_secret: string;
            redirect_uri: string;
            user_agent_header: string;
            user_profile_url: string;
        };
    };
    public storage: {
        type: string;
    };
}

@Module({
    providers: [
        {
            provide: BaseConfigService,
            useFactory: ConfigModule.Factory,
        }
    ],
    exports: [
        BaseConfigService,
    ],
})
export class ConfigModule {
    public static Factory() {
        switch (process.env['monorepoexampleCONFIG']) {
            case 'environment': {
                return null;
            }
            case 'dotenv': {
                return null;
            }
            default: {
                return new LocalConfigService();
            }
        }
    }
}
