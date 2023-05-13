import { Module } from '@nestjs/common';
import { Module as Mod } from './api/module/entities/module.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventModule } from './api/event/event.module';
import { ClientModule } from './api/client/client.module';
import { UserModule } from './api/user/user.module';
import { MessageModule } from './api/message/message.module';
import { ConfirmationModule } from './api/confirmation/confirmation.module';
import { RoleModule } from './api/role/role.module';
import { ModuleModule } from './api/module/module.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessModule } from './api/business/business.module';
import { Business } from './api/business/entities/business.entity';
import { Client } from './api/client/entities/client.entity';
import { Confirmation } from './api/confirmation/entities/confirmation.entity';
import { Event } from './api/event/entities/event.entity';
import { Message } from './api/message/entities/message.entity';
import { Role } from './api/role/entities/role.entity';
import { User } from './api/user/entities/user.entity';

@Module({
  imports: [
    EventModule,
    ClientModule,
    UserModule,
    MessageModule,
    ConfirmationModule,
    RoleModule,
    ModuleModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: +configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_DATABASE'),
        synchronize: true,
        entities: [
          Business,
          Client,
          Confirmation,
          Event,
          Message,
          Mod,
          Role,
          User,
        ],
      }),
    }),
    BusinessModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
