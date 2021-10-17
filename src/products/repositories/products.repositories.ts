import { Injectable } from '@nestjs/common';
import { DataTypes, Model, ModelCtor } from 'sequelize';
import { RDSService } from 'artifacts/rds/rds.service';
import { ProductPriceRepository } from 'src/product-price/repositories/product-price.repository';
import { AssociateRepository } from 'artifacts/rds/core/associate.repository';

@Injectable()
export class ProductRepository extends AssociateRepository {
  private productModel: ModelCtor<Model>;

  constructor(
    private rdsService: RDSService,
    private productPriceRepository: ProductPriceRepository,
  ) {
    super();
  }

  protected init() {
    this.productModel = this.rdsService
      .getRDSClient()
      .getModelBuilder()
      .define(
        'products',
        {
          name: {
            type: DataTypes.STRING,
          },
          sku: {
            type: DataTypes.STRING,
          },
          description: {
            type: DataTypes.STRING,
          },
          image_urls: {
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
        'products',
        true,
      );
    return this.productModel;
  }

  protected setupAssociation(associateFetch: Map<string, any>) {
    this.productModel.hasOne(this.productPriceRepository.getModel(), {
      foreignKey: 'product_id',
      sourceKey: 'id',
    });

    associateFetch.set('product-price', [
      { model: this.productPriceRepository.getModel() },
    ]);
  }
}
