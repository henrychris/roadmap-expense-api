import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import JwtConfig from 'src/config/jwtConfig';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<JwtConfig>) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: {
          expiresIn: '1h',
        },
      }),
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
