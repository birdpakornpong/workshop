import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsString } from 'class-validator';
import { BaseDTO } from 'src/common/dto/base.dto';

export class CategoryDTO extends BaseDTO {
  @IsNumber()
  @ApiProperty({
    description: 'id of category',
    type: Number,
    example: 1,
  })
  id: number;

  @IsString()
  @ApiProperty({
    description: 'name of category',
    type: String,
    example: 'categorys',
  })
  name: string;

  @IsString()
  @ApiProperty({
    description: 'description of category',
    type: String,
    example: 'description',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'status of category',
    type: String,
    example: 'status',
  })
  status: string;

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
