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
import { FooDTO } from './dto/foo.dto';
import { FooService } from './foo.service';
import { ResponseDTO } from 'src/common/dto/response.dto';
import { RequestDTO } from 'src/common/dto/request.dto';
import { FooSearchDTO } from './dto/foo-search.dto';

@Controller('/v1/foo')
export class FooController {
  constructor(private readonly fooService: FooService) {}

  @Get('/search')
  @UsePipes(new ValidationPipe({ transform: true }))
  searchFoo(@Query() fooSearchDTO: FooSearchDTO): Promise<ResponseDTO<any[]>> {
    return this.fooService
      .searchFoo(fooSearchDTO)
      .then((result) => {
        return result;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Get('/get/:id')
  getFoo(@Param('id') id: string): Promise<ResponseDTO<FooDTO>> {
    return this.fooService
      .read(id)
      .then((result) => {
        const response = new ResponseDTO<FooDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Post('/create')
  createFoo(@Body() FooDTO: RequestDTO<FooDTO>): Promise<ResponseDTO<FooDTO>> {
    return this.fooService
      .create(FooDTO.data)
      .then((result) => {
        const response = new ResponseDTO<FooDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Put('/update')
  updateFoo(
    @Body() FooUpdateDTO: RequestDTO<FooDTO>,
  ): Promise<ResponseDTO<FooDTO>> {
    return this.fooService
      .update(FooUpdateDTO.data)
      .then((result) => {
        const response = new ResponseDTO<FooDTO>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooService.name);
        throw new BadRequestException(err.message);
      });
  }

  @Delete('/delete/:id')
  deleteFoo(@Param('id') id: string): Promise<ResponseDTO<any>> {
    return this.fooService
      .delete(id)
      .then((result) => {
        const response = new ResponseDTO<any>();
        response.data = result;

        return response;
      })
      .catch((err) => {
        Logger.error(err, err.stack, FooService.name);
        throw new BadRequestException(err.message);
      });
  }
}
