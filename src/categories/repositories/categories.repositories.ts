import { Injectable } from '@nestjs/common';
import { AssociateRepository } from 'artifacts/rds/core/associate.repository';
import { RDSService } from 'artifacts/rds/rds.service';
import { DataTypes, Model, ModelCtor } from 'sequelize';
import { CategoryProductRelationsRepository } from 'src/category-product-relations/repositories/category-product-relations.repasotories';
import { ProductPriceRepository } from 'src/product-price/repositories/product-price.repository';
import { ProductRepository } from 'src/products/repositories/products.repositories';

@Injectable()
export class CategoriesRepository extends AssociateRepository {
  private categoriesModel: ModelCtor<Model>;

  constructor(
    private readonly rdsService: RDSService,
    private categoryProductRelationsRepository: CategoryProductRelationsRepository,
    private productRepository: ProductRepository,
    private productPriceRepository: ProductPriceRepository,
  ) {
    super();
  }

  protected init() {
    this.categoriesModel = this.rdsService
      .getRDSClient()
      .getModelBuilder()
      .define(
        'categories',
        {
          name: {
            type: DataTypes.STRING,
          },
          description: {
            type: DataTypes.STRING,
          },
          status: {
            type: DataTypes.STRING,
          },
          createdAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
          },
          updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
          },
        },
        'categories',
        true,
      );
    return this.categoriesModel;
  }

  protected setupAssociation(associateFetch: Map<string, any>) {
    this.categoriesModel.hasMany(
      this.categoryProductRelationsRepository.getModel(),
      {
        foreignKey: 'category_id',
        sourceKey: 'id',
      },
    );
    this.categoryProductRelationsRepository
      .getModel()
      .hasOne(this.productRepository.getModel(), {
        foreignKey: 'id',
        sourceKey: 'product_id',
      });

    this.productRepository
      .getModel()
      .hasOne(this.productPriceRepository.getModel(), {
        foreignKey: 'product_id',
        sourceKey: 'id',
      });

    associateFetch.set('category-product-relations', [
      {
        model: this.categoryProductRelationsRepository.getModel(),
        include: [
          {
            model: this.productRepository.getModel(),
            include: [
              {
                model: this.productPriceRepository.getModel(),
              },
            ],
          },
        ],
      },
    ]);

    // associateFetch.set('products', [
    //   { model: this.productRepository.getModel() },
    // ]);
  }
}
