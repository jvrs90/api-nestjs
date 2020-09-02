import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UserModule } from '../api/user/user.module'

import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UserSchema } from '../api/user/schemas/user.schema';
import { AuthController } from './auth.controller';

@Module({
	imports: [
		PassportModule.register({
			defaultStrategy: 'jwt'
		}),
		ConfigModule.forRoot(),
		MongooseModule.forFeature([{name: 'User', schema: UserSchema}], 'book'),
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: { expiresIn: '24h'}
		}),
		UserModule,
	],
	controllers: [AuthController],
	exports:[AuthService],
	providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}