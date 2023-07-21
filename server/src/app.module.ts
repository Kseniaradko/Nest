import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule, TypeOrmModuleOptions} from "@nestjs/typeorm";
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
      ConfigModule.forRoot({ isGlobal:true, envFilePath: '.env' }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.get('DB_HOST'),
              port: configService.get('BB_PORT'),
              username: configService.get('DB_USERNAME'),
              password: configService.get('DB_PASSWORD'),
              database: configService.get('DB_NAME'),
              synchronize: true,
              entities: [__dirname + '/**/*.entity{.js, .ts}']
          }) as TypeOrmModuleOptions
      }),
      UserModule,
      AuthModule,
      PostsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
