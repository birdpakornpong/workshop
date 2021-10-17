import { Module } from '@nestjs/common';
import { RDSModule } from 'artifacts/rds/rds.module';
import { ProductPriceRepository } from 'src/product-price/repositories/product-price.repository';
import { ProductRepository } from 'src/products/repositories/products.repositories';
import { CategoryProductRelationsController } from './category-product-relations.controller';
import { CategoryProductRelationsService } from './category-product-relations.service';
import { CategoryProductRelationsRepository } from './repositories/category-product-relations.repasotories';

@Module({
  imports: [RDSModule],
  controllers: [CategoryProductRelationsController],
  providers: [
    CategoryProductRelationsService,
    CategoryProductRelationsRepository,
    ProductRepository,
    ProductPriceRepository,
  ],
})
export class CategoryProductRelationsModule {}
