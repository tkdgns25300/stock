import { Test, TestingModule } from '@nestjs/testing';
import { DerivativesController } from './derivatives.controller';

describe('DerivativesController', () => {
  let controller: DerivativesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DerivativesController],
    }).compile();

    controller = module.get<DerivativesController>(DerivativesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
