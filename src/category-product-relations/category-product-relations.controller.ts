import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RequestDTO } from 'src/common/dto/request.dto';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { CategoryProductRelationsService } from './category-product-relations.service';
import { CategoryProductRelationsSearchDTO } from './dto/category-product-relations-search.dto';
import { CategoryProductRelationsDTO } from './dto/category-product-relations.dto';

@Controller('/category-product-relations')
export class CategoryProductRelationsController {
  constructor(
    private readonly categoryProductRelationsService: CategoryProductRelationsService,
  ) {}

  @Get('/search')
  @UsePipes(new ValidationPipe({ transform: true }))
  searchCategory(
    @Query() categorySearchDTO: CategoryProductRelationsSearchDTO,
  ): Promise<ResponseDTO<any[]>> {
    return this.categoryProductRelationsService
      .searchCategory(categorySearchDTO)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        Logger.error(err, err.stack, CategoryProductRelationsService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Get('/:id')
  getProduct(
    @Param('id') id: string,
  ): Promise<ResponseDTO<CategoryProductRelationsDTO>> {
    return this.categoryProductRelationsService
      .read(id)
      .then((result) => {
        const response = new ResponseDTO<CategoryProductRelationsDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, CategoryProductRelationsService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Post()
  createFoo(
    @Body() productDTO: RequestDTO<CategoryProductRelationsDTO>,
  ): Promise<ResponseDTO<CategoryProductRelationsDTO>> {
    return this.categoryProductRelationsService
      .create(productDTO.data)
      .then((result) => {
        const response = new ResponseDTO<CategoryProductRelationsDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, CategoryProductRelationsService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Delete('/:id')
  deleteFoo(@Param('id') id: string): Promise<ResponseDTO<any>> {
    return this.categoryProductRelationsService
      .delete(id)
      .then((result) => {
        const response = new ResponseDTO<any>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, CategoryProductRelationsService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Put()
  updateFoo(
    @Body() FooUpdateDTO: RequestDTO<CategoryProductRelationsDTO>,
  ): Promise<ResponseDTO<CategoryProductRelationsDTO>> {
    return this.categoryProductRelationsService
      .update(FooUpdateDTO.data)
      .then((result) => {
        const response = new ResponseDTO<CategoryProductRelationsDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, CategoryProductRelationsService.name);
        throw new BadRequestException(err.message);
      });
  }
}
