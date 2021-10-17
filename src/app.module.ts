import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HealthModule } from './health/health.module';
// import { AuthModule } from 'artifacts/auth/auth.module';
import configuration from './config/configuration';
import { FooModule } from './foo/foo.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CategoryProductRelationsModule } from './category-product-relations/category-product-relations.module';
import { ProductPriceModule } from './product-price/product-price.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    HealthModule,
    // AuthModule,
    FooModule,
    CategoriesModule,
    ProductsModule,
    CategoryProductRelationsModule,
    ProductPriceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
