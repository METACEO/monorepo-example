import {Test, TestingModule} from '@nestjs/testing';

import {MemoryStorageService} from './memory-storage.service';

describe('MemoryStorage', () => {
    let service: MemoryStorageService;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MemoryStorageService],
        }).compile();
        service = module.get<MemoryStorageService>(MemoryStorageService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
