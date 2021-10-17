import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class ProductDTO extends BaseDTO {
  @IsNumber()
  @ApiProperty({
    description: 'id of product',
    type: Number,
    example: 1,
  })
  id: number;

  @IsString()
  @ApiProperty({
    description: 'name of product',
    type: String,
    example: 'products',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'sku of product',
    type: String,
    example: 'sku',
  })
  sku: string;

  @IsString()
  @ApiProperty({
    description: 'description of product',
    type: String,
    example: 'description',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'image_urls of product',
    type: String,
    example: 'image_urls',
  })
  image_urls: string;

  @IsString()
  @ApiProperty({
    description: 'status of product',
    type: String,
    example: 'status',
  })
  status: string;

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
