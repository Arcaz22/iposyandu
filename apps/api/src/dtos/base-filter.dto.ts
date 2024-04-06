import { ApiProperty } from '@nestjs/swagger';

export class BaseFilterDTO {
  @ApiProperty({
    required: false,
    readOnly: true,
  })
  search?: string;

  @ApiProperty({
    required: false,
    readOnly: true,
  })
  page?: number;

  @ApiProperty({
    required: false,
    readOnly: true,
  })
  pageSize?: number;
}
