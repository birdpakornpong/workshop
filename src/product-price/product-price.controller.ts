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
import { ProductPriceSearchDTO } from './dto/product-price-search.dto';
import { ProductPriceDTO } from './dto/product-price.dto';
import { ProductPriceService } from './product-price.service';

@Controller('/product-price')
export class ProductPriceController {
  constructor(private readonly productPriceService: ProductPriceService) {}

  @Get('/search')
  @UsePipes(new ValidationPipe({ transform: true }))
  searchFoo(
    @Query() fooSearchDTO: ProductPriceSearchDTO,
  ): Promise<ResponseDTO<any[]>> {
    return this.productPriceService
      .searchFoo(fooSearchDTO)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        Logger.error(err, err.stack, ProductPriceService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Get('/:id')
  getProduct(@Param('id') id: string): Promise<ResponseDTO<ProductPriceDTO>> {
    return this.productPriceService
      .read(id)
      .then((result) => {
        const response = new ResponseDTO<ProductPriceDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, ProductPriceService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Post('/create')
  createProductPrice(
    @Body() productPriceDTO: RequestDTO<ProductPriceDTO>,
  ): Promise<ResponseDTO<ProductPriceDTO>> {
    return this.productPriceService
      .create(productPriceDTO.data)
      .then((result) => {
        const response = new ResponseDTO<ProductPriceDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, ProductPriceService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Delete('/delete/:id')
  deleteFoo(@Param('id') id: string): Promise<ResponseDTO<any>> {
    return this.productPriceService
      .delete(id)
      .then((result) => {
        const response = new ResponseDTO<any>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, ProductPriceService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Put('/update')
  updateFoo(
    @Body() FooUpdateDTO: RequestDTO<ProductPriceDTO>,
  ): Promise<ResponseDTO<ProductPriceDTO>> {
    return this.productPriceService
      .update(FooUpdateDTO.data)
      .then((result) => {
        const response = new ResponseDTO<ProductPriceDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, ProductPriceService.name);
        throw new BadRequestException(err.message);
      });
  }
}
