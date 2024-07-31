import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt-strategy';
import { 
  AstraGrupBisnis,
  AstraPerusahaan,
  Bayi,
  BayiImunisasi,
  BayiMeninggal,
  BayiPengukuran,
  Desa,
  Kabupaten,
  Kecamatan,
  PostgresModule,
  Posyandu,
  Provinsi,
  Puskesmas,
  SharedModule,
  SharedService,
  User,
} from '@app/shared';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService],
    }),

    SharedModule,
    PostgresModule,

    TypeOrmModule.forFeature([
      User,
      Posyandu,
      Puskesmas,
      Kecamatan,
      Kabupaten,
      Desa,
      Provinsi,
      AstraGrupBisnis,
      AstraPerusahaan,
      Bayi,
      BayiImunisasi,
      BayiPengukuran,
      BayiMeninggal
    ]),
  ],
  controllers: [AuthController],
  providers: [
    JwtGuard,
    JwtStrategy,
    {
      provide: 'AuthServiceInterface',
      useClass: AuthService,
    },
    {
      provide: 'SharedServiceInterface',
      useClass: SharedService,
    },
  ],
})
export class AuthModule {}
