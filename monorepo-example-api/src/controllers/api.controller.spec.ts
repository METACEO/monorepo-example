import { Test, TestingModule } from '@nestjs/testing';
import { ApiController } from './api.controller';

describe('Api Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [ApiController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: ApiController = module.get<ApiController>(ApiController);
    expect(controller).toBeDefined();
  });
});
