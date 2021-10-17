import { Injectable } from '@nestjs/common';
import { ICRUDService } from 'artifacts/rds/core/common/interfaces/interface.crud.service';
import { Op } from 'sequelize';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { ProductPriceSearchDTO } from './dto/product-price-search.dto';
import { ProductPriceDTO } from './dto/product-price.dto';
import { ProductPriceRepository } from './repositories/product-price.repository';

@Injectable()
export class ProductPriceService
  implements ICRUDService<ProductPriceDTO, void>
{
  constructor(
    private readonly productPriceRepository: ProductPriceRepository,
  ) {}
  async create(productPriceDTO: ProductPriceDTO): Promise<ProductPriceDTO> {
    const product = await this.productPriceRepository.insert(productPriceDTO);
    return new ProductPriceDTO(product);
  }

  async read(id: string): Promise<ProductPriceDTO> {
    const product = await this.productPriceRepository
      //   .include('products')
      .where({ id: id }, 'id')
      .findOne();
    console.log('product: ', product);
    return new ProductPriceDTO(product);
  }

  async update(updateDTO: ProductPriceDTO): Promise<ProductPriceDTO> {
    updateDTO.updatedAt = new Date();

    const productUpdated = await this.productPriceRepository.update(updateDTO, {
      where: { id: updateDTO.id },
      returning: true,
    });

    return new ProductPriceDTO(productUpdated[1][0]);
  }

  async delete(id: string): Promise<any> {
    return {
      deleteCount: await this.productPriceRepository.where({ id: id }).delete(),
    };
  }

  async searchFoo(
    productPriceSearch: ProductPriceSearchDTO,
  ): Promise<ResponseDTO<ProductPriceDTO[]>> {
    this.productPriceRepository.page(
      productPriceSearch.page,
      productPriceSearch.limit,
    );

    if (productPriceSearch.query) {
      this.productPriceRepository.where({
        name: { [Op.iLike]: `%${productPriceSearch.query}%` },
      });
    }
    if (productPriceSearch.status && productPriceSearch.status !== 'all') {
      this.productPriceRepository.where({
        status: productPriceSearch.status,
      });
    }
    if (productPriceSearch.orderBy) {
      if (productPriceSearch.orderType === 'asc') {
        this.productPriceRepository.order(productPriceSearch.orderBy, 'ASC');
      } else {
        this.productPriceRepository.order(productPriceSearch.orderBy, 'DESC');
      }
    }
    if (productPriceSearch.between && productPriceSearch.betweenDate) {
      const betweenCondition = {};
      betweenCondition[productPriceSearch.between] = {
        [Op.between]: [
          new Date(productPriceSearch.getStartDate()).toUTCString(),
          new Date(productPriceSearch.getEndDate()).toUTCString(),
        ],
      };
      this.productPriceRepository.where(betweenCondition);
    }

    const fooDTOs: ProductPriceDTO[] = [];
    const responseDTO = new ResponseDTO<ProductPriceDTO[]>();

    if (productPriceSearch.count) {
      const { count, rows } = await this.productPriceRepository.findAndCountAll(
        {
          distinct: true,
        },
      );
      responseDTO.totalItems = count;
      responseDTO.data = Object.assign(fooDTOs, rows);
    } else {
      responseDTO.data = Object.assign(
        fooDTOs,
        await this.productPriceRepository.findAll(),
      );
    }
    return responseDTO;
  }
}
