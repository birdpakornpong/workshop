import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class CategoryProductRelationsDTO extends BaseDTO {
  @IsNumber()
  @ApiProperty({
    description: 'id of category',
    type: Number,
    example: 1,
  })
  id: number;

  @IsNumber()
  @ApiProperty({
    description: 'name of category',
    type: Number,
    example: 'categorys',
  })
  categoryId: number;

  @IsNumber()
  @ApiProperty({
    description: 'description of category',
    type: Number,
    example: 'description',
  })
  productId: number;

  @IsDate()
  @ApiProperty({
    description: 'Created date of category',
    type: Date,
    example: '',
  })
  createdAt: Date;

  @IsDate()
  @ApiProperty({
    description: 'Updated date of category',
    type: Date,
    example: '',
  })
  updatedAt: Date;

  @IsDate()
  @ApiProperty({
    description: 'deleted date of category',
    type: Date,
    example: '',
  })
  deletedAt: Date;
}
