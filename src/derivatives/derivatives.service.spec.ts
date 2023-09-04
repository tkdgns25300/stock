import { Test, TestingModule } from '@nestjs/testing';
import { DerivativesService } from './derivatives.service';

describe('DerivativesService', () => {
  let service: DerivativesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DerivativesService],
    }).compile();

    service = module.get<DerivativesService>(DerivativesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
