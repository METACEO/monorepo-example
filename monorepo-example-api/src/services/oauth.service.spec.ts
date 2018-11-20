import {Test, TestingModule} from '@nestjs/testing';
import {OauthService} from './oauth.service';

describe('OauthService', () => {
    let service: OauthService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OauthService],
        }).compile();
        service = module.get<OauthService>(OauthService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
