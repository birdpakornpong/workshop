import { Module } from '@nestjs/common';
import { RDSModule } from 'artifacts/rds/rds.module';
import { ProductPriceRepository } from 'src/product-price/repositories/product-price.repository';
import { ProductsController } from './products.controller';
import { ProductService } from './products.service';
import { ProductRepository } from './repositories/products.repositories';

@Module({
  imports: [RDSModule],
  controllers: [ProductsController],
  providers: [ProductService, ProductRepository, ProductPriceRepository],
  exports: [ProductService],
})
export class ProductsModule {}
