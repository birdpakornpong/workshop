import { Injectable } from '@nestjs/common';
import { AssociateRepository } from 'artifacts/rds/core/associate.repository';
import { RDSService } from 'artifacts/rds/rds.service';
import { DataTypes, Model, ModelCtor } from 'sequelize';
import { ProductRepository } from 'src/products/repositories/products.repositories';

@Injectable()
export class CategoryProductRelationsRepository extends AssociateRepository {
  private categoryProductRelationsModel: ModelCtor<Model>;

  constructor(
    private rdsService: RDSService,
    private productRepository: ProductRepository,
  ) {
    super();
  }

  protected init() {
    this.categoryProductRelationsModel = this.rdsService
      .getRDSClient()
      .getModelBuilder()
      .define(
        'category_product_relations',
        {
          category_id: {
            type: DataTypes.NUMBER,
          },
          product_id: {
            type: DataTypes.NUMBER,
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
        'category_product_relations',
        true,
      );
    return this.categoryProductRelationsModel;
  }

  protected setupAssociation(associateFetch: Map<string, any>) {
    this.categoryProductRelationsModel.hasOne(
      this.productRepository.getModel(),
      {
        foreignKey: 'id',
        sourceKey: 'product_id',
      },
    );

    associateFetch.set('products', [
      { model: this.productRepository.getModel() },
    ]);
  }
}
