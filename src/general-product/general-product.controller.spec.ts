import { Test, TestingModule } from '@nestjs/testing';
import { GeneralProductController } from './general-product.controller';

describe('GeneralProductController', () => {
  let controller: GeneralProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GeneralProductController],
    }).compile();

    controller = module.get<GeneralProductController>(GeneralProductController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
