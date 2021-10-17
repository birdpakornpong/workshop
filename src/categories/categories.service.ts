import { Injectable } from '@nestjs/common';
import { ICRUDService } from 'artifacts/rds/core/common/interfaces/interface.crud.service';
import { Op } from 'sequelize';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { CategoryDTO } from './dto/categories.dto';
import { CategorySearchDTO } from './dto/catrgories-search.dto';
import { CategoriesRepository } from './repositories/categories.repositories';

@Injectable()
export class CategoriesService implements ICRUDService<CategoryDTO, void> {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async create(categoryDTO: CategoryDTO): Promise<CategoryDTO> {
    const category = await this.categoriesRepository.insert(categoryDTO);
    return new CategoryDTO(category);
  }

  async read(id: string): Promise<CategoryDTO> {
    const category = await this.categoriesRepository
      .include('category-product-relations')
      // .include('products')
      .where({ id: id }, 'id')
      .findOne();
    return new CategoryDTO(category);
  }

  async update(updateDTO: CategoryDTO): Promise<CategoryDTO> {
    updateDTO.updatedAt = new Date();

    const categoryUpdated = await this.categoriesRepository.update(updateDTO, {
      where: { id: updateDTO.id },
      returning: true,
    });

    return new CategoryDTO(categoryUpdated[1][0]);
  }

  async delete(id: string): Promise<any> {
    return {
      deleteCount: await this.categoriesRepository.where({ id: id }).delete(),
    };
  }

  async searchCategory(
    categorySearchDTO: CategorySearchDTO,
  ): Promise<ResponseDTO<CategoryDTO[]>> {
    this.categoriesRepository.page(
      categorySearchDTO.page,
      categorySearchDTO.limit,
    );

    if (categorySearchDTO.query) {
      this.categoriesRepository.where({
        name: { [Op.iLike]: `%${categorySearchDTO.query}%` },
      });
    }
    if (categorySearchDTO.status && categorySearchDTO.status !== 'all') {
      this.categoriesRepository.where({
        status: categorySearchDTO.status,
      });
    }

    if (categorySearchDTO.orderBy) {
      if (categorySearchDTO.orderType === 'asc') {
        this.categoriesRepository.order(categorySearchDTO.orderBy, 'ASC');
      } else {
        this.categoriesRepository.order(categorySearchDTO.orderBy, 'DESC');
      }
    }
    if (categorySearchDTO.between && categorySearchDTO.betweenDate) {
      const betweenCondition = {};
      betweenCondition[categorySearchDTO.between] = {
        [Op.between]: [
          new Date(categorySearchDTO.getStartDate()).toUTCString(),
          new Date(categorySearchDTO.getEndDate()).toUTCString(),
        ],
      };
      this.categoriesRepository.where(betweenCondition);
    }

    const CategoryDTOs: CategoryDTO[] = [];
    const responseDTO = new ResponseDTO<CategoryDTO[]>();

    if (categorySearchDTO.count) {
      const { count, rows } = await this.categoriesRepository.findAndCountAll({
        distinct: true,
      });
      responseDTO.totalItems = count;
      responseDTO.data = Object.assign(CategoryDTOs, rows);
    } else {
      responseDTO.data = Object.assign(
        CategoryDTOs,
        await this.categoriesRepository
          .include('category-product-relations')
          .findAll(),
      );
    }
    return responseDTO;
  }
}
