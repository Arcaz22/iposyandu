import { ApiProperty } from '@nestjs/swagger';

export class ExistingUserDTO {
  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Test1234' })
  password: string;
}
