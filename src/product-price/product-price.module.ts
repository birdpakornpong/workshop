import { Module } from '@nestjs/common';
import { RDSModule } from 'artifacts/rds/rds.module';
import { ProductPriceController } from './product-price.controller';
import { ProductPriceService } from './product-price.service';
import { ProductPriceRepository } from './repositories/product-price.repository';

@Module({
  imports: [RDSModule],
  controllers: [ProductPriceController],
  providers: [ProductPriceService, ProductPriceRepository],
  exports: [ProductPriceService],
})
export class ProductPriceModule {}
