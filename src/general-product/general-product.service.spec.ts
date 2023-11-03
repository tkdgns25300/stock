import { Test, TestingModule } from '@nestjs/testing';
import { GeneralProductService } from './general-product.service';

describe('GeneralProductService', () => {
  let service: GeneralProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneralProductService],
    }).compile();

    service = module.get<GeneralProductService>(GeneralProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
