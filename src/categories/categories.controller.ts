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
import { CategoriesService } from './categories.service';
import { CategoryDTO } from './dto/categories.dto';
import { CategorySearchDTO } from './dto/catrgories-search.dto';
// import { TodoService } from './todo.service';

@Controller('/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('/get/:id')
  getProduct(@Param('id') id: string): Promise<ResponseDTO<CategoryDTO>> {
    return this.categoriesService
      .read(id)
      .then((result) => {
        const response = new ResponseDTO<CategoryDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, CategoriesService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Post()
  createFoo(
    @Body() productDTO: RequestDTO<CategoryDTO>,
  ): Promise<ResponseDTO<CategoryDTO>> {
    return this.categoriesService
      .create(productDTO.data)
      .then((result) => {
        const response = new ResponseDTO<CategoryDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, CategoriesService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Delete('/:id')
  deleteFoo(@Param('id') id: string): Promise<ResponseDTO<any>> {
    return this.categoriesService
      .delete(id)
      .then((result) => {
        const response = new ResponseDTO<any>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, CategoriesService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Put()
  updateFoo(
    @Body() FooUpdateDTO: RequestDTO<CategoryDTO>,
  ): Promise<ResponseDTO<CategoryDTO>> {
    return this.categoriesService
      .update(FooUpdateDTO.data)
      .then((result) => {
        const response = new ResponseDTO<CategoryDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, CategoriesService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Get('/search')
  @UsePipes(new ValidationPipe({ transform: true }))
  searchCategory(
    @Query() categorySearchDTO: CategorySearchDTO,
  ): Promise<ResponseDTO<any[]>> {
    return this.categoriesService
      .searchCategory(categorySearchDTO)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        Logger.error(err, err.stack, CategoriesService.name);
        throw new BadRequestException(err.message);
      });
  }
}
