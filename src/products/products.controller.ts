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
import { ProductSearchDTO } from './dto/products-search.dto';
import { ProductDTO } from './dto/products.dto';
import { ProductService } from './products.service';
// import { TodoService } from './todo.service';

@Controller('/products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  getArrayNumber() {
    return this.productsService.getProduct();
  }

  @Get('/search')
  @UsePipes(new ValidationPipe({ transform: true }))
  searchProduct(
    @Query() productSearchDTO: ProductSearchDTO,
  ): Promise<ResponseDTO<any[]>> {
    return this.productsService
      .searchProduct(productSearchDTO)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        Logger.error(err, err.stack, ProductService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Get('/:id')
  getProduct(@Param('id') id: string): Promise<ResponseDTO<ProductDTO>> {
    return this.productsService
      .read(id)
      .then((result) => {
        const response = new ResponseDTO<ProductDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, ProductService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Post('/create')
  createFoo(
    @Body() productDTO: RequestDTO<ProductDTO>,
  ): Promise<ResponseDTO<ProductDTO>> {
    return this.productsService
      .create(productDTO.data)
      .then((result) => {
        const response = new ResponseDTO<ProductDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, ProductService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Delete('/delete/:id')
  deleteFoo(@Param('id') id: string): Promise<ResponseDTO<any>> {
    return this.productsService
      .delete(id)
      .then((result) => {
        const response = new ResponseDTO<any>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, ProductService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Put('/update')
  updateFoo(
    @Body() FooUpdateDTO: RequestDTO<ProductDTO>,
  ): Promise<ResponseDTO<ProductDTO>> {
    return this.productsService
      .update(FooUpdateDTO.data)
      .then((result) => {
        const response = new ResponseDTO<ProductDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, ProductService.name);
        throw new BadRequestException(err.message);
      });
  }
}
