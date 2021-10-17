import { Injectable } from '@nestjs/common';
import { ICRUDService } from 'artifacts/rds/core/common/interfaces/interface.crud.service';
import { Op } from 'sequelize';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { CategoryProductRelationsSearchDTO } from './dto/category-product-relations-search.dto';
import { CategoryProductRelationsDTO } from './dto/category-product-relations.dto';
import { CategoryProductRelationsRepository } from './repositories/category-product-relations.repasotories';

@Injectable()
export class CategoryProductRelationsService
  implements ICRUDService<CategoryProductRelationsDTO, void>
{
  constructor(
    private readonly categoryProductRelationsRepository: CategoryProductRelationsRepository,
  ) {}

  async create(
    categoryProductRelationsDTO: CategoryProductRelationsDTO,
  ): Promise<CategoryProductRelationsDTO> {
    const category = await this.categoryProductRelationsRepository.insert(
      categoryProductRelationsDTO,
    );
    console.log('category', category);
    return new CategoryProductRelationsDTO(category);
  }

  async read(id: string): Promise<CategoryProductRelationsDTO> {
    const category = await this.categoryProductRelationsRepository
      .include('products')
      .where({ id: id }, 'id')
      .findOne();
    return new CategoryProductRelationsDTO(category);
  }

  async update(
    updateDTO: CategoryProductRelationsDTO,
  ): Promise<CategoryProductRelationsDTO> {
    updateDTO.updatedAt = new Date();

    const categoryUpdated =
      await this.categoryProductRelationsRepository.update(updateDTO, {
        where: { id: updateDTO.id },
        returning: true,
      });

    return new CategoryProductRelationsDTO(categoryUpdated[1][0]);
  }

  async delete(id: string): Promise<any> {
    return {
      deleteCount: await this.categoryProductRelationsRepository
        .where({ id: id })
        .delete(),
    };
  }

  async searchCategory(
    categoryProductRelationsDTO: CategoryProductRelationsSearchDTO,
  ): Promise<ResponseDTO<CategoryProductRelationsDTO[]>> {
    this.categoryProductRelationsRepository.page(
      categoryProductRelationsDTO.page,
      categoryProductRelationsDTO.limit,
    );

    if (categoryProductRelationsDTO.query) {
      this.categoryProductRelationsRepository.where({
        category_id: { [Op.iLike]: `%${categoryProductRelationsDTO.query}%` },
      });
    }
    if (
      categoryProductRelationsDTO.status &&
      categoryProductRelationsDTO.status !== 'all'
    ) {
      this.categoryProductRelationsRepository.where({
        status: categoryProductRelationsDTO.status,
      });
    }

    if (categoryProductRelationsDTO.orderBy) {
      if (categoryProductRelationsDTO.orderType === 'asc') {
        this.categoryProductRelationsRepository.order(
          categoryProductRelationsDTO.orderBy,
          'ASC',
        );
      } else {
        this.categoryProductRelationsRepository.order(
          categoryProductRelationsDTO.orderBy,
          'DESC',
        );
      }
    }
    if (
      categoryProductRelationsDTO.between &&
      categoryProductRelationsDTO.betweenDate
    ) {
      const betweenCondition = {};
      betweenCondition[categoryProductRelationsDTO.between] = {
        [Op.between]: [
          new Date(categoryProductRelationsDTO.getStartDate()).toUTCString(),
          new Date(categoryProductRelationsDTO.getEndDate()).toUTCString(),
        ],
      };
      this.categoryProductRelationsRepository.where(betweenCondition);
    }

    const CategoryProductRelationsDTOs: CategoryProductRelationsDTO[] = [];
    const responseDTO = new ResponseDTO<CategoryProductRelationsDTO[]>();

    if (categoryProductRelationsDTO.count) {
      const { count, rows } =
        await this.categoryProductRelationsRepository.findAndCountAll({
          distinct: true,
        });
      responseDTO.totalItems = count;
      responseDTO.data = Object.assign(CategoryProductRelationsDTOs, rows);
    } else {
      responseDTO.data = Object.assign(
        CategoryProductRelationsDTOs,
        await this.categoryProductRelationsRepository.findAll(),
      );
    }
    return responseDTO;
  }
}
