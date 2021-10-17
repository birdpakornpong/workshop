import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class ProductPriceDTO extends BaseDTO {
  @IsNumber()
  @ApiProperty({
    description: 'id of product',
    type: Number,
    example: 1,
  })
  id: number;

  @IsNumber()
  @ApiProperty({
    description: 'id of product',
    type: Number,
    example: 1,
  })
  productId: number;

  @IsNumber()
  @ApiProperty({
    description: 'id of product',
    type: Number,
    example: 1,
  })
  value: number;

  @IsString()
  @ApiProperty({
    description: 'name of product',
    type: String,
    example: 'products',
  })
  condition: string;

  @IsDate()
  @ApiProperty({
    description: 'Created date of product',
    type: Date,
    example: '',
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    description: 'Updated date of product',
    type: Date,
    example: '',
  })
  updatedAt: Date;

  @IsDate()
  @ApiProperty({
    description: 'deleted date of product',
    type: Date,
    example: '',
  })
  deletedAt: Date;
}
