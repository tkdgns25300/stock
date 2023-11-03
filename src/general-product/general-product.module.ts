import { Module } from '@nestjs/common';
import { GeneralProductController } from './general-product.controller';
import { GeneralProductService } from './general-product.service';

@Module({
  controllers: [GeneralProductController],
  providers: [GeneralProductService]
})
export class GeneralProductModule {}
