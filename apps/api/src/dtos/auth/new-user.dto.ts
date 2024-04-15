import { ApiProperty } from '@nestjs/swagger';

export class NewUserDTO {
  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ example: 'Test1234' })
  password: string;

  @ApiProperty({ example: 'test' })
  name: string;

  @ApiProperty({ example: 'test' })
  username: string;

  @ApiProperty({ example: '085118962476' })
  phone: string;
}
