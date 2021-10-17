import { Module } from '@nestjs/common';
import { RDSModule } from 'artifacts/rds/rds.module';
import { CategoryProductRelationsRepository } from 'src/category-product-relations/repositories/category-product-relations.repasotories';
import { ProductPriceRepository } from 'src/product-price/repositories/product-price.repository';
import { ProductRepository } from 'src/products/repositories/products.repositories';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './repositories/categories.repositories';
@Module({
  imports: [RDSModule],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    CategoriesRepository,
    CategoryProductRelationsRepository,
    ProductRepository,
    ProductPriceRepository,
  ],
})
export class CategoriesModule {}
