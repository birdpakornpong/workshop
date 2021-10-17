import { Injectable } from '@nestjs/common';
import { DataTypes, Model, ModelCtor } from 'sequelize';
import { RDSService } from 'artifacts/rds/rds.service';
import { BaseRepository } from 'artifacts/rds/core/base.repository';

@Injectable()
export class ProductPriceRepository extends BaseRepository {
  private productPriceModel: ModelCtor<Model>;

  constructor(private rdsService: RDSService) {
    super();
  }

  protected init() {
    this.productPriceModel = this.rdsService
      .getRDSClient()
      .getModelBuilder()
      .define(
        'product_prices',
        {
          product_id: {
            type: DataTypes.NUMBER,
          },
          value: {
            type: DataTypes.NUMBER,
          },
          condition: {
            type: DataTypes.STRING,
          },
          created_at: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
          },
          updated_at: {
            type: DataTypes.DATE,
            defaultValue: Date.now,
          },
        },
        'product_prices',
        true,
      );
    return this.productPriceModel;
  }

  // protected setupAssociation(associateFetch: Map<string, any>) {
  //   this.productPriceModel.belongsTo(this.productRepository.getModel(), {
  //     foreignKey: 'product_id',
  //   });

  //   associateFetch.set('products', [
  //     { model: this.productRepository.getModel() },
  //   ]);
  // }
}
