import { Module } from '@nestjs/common';
import { OrgChart } from './entities/orgchart.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgChartController } from './modules/orgchart/controllers/orgchart.controller';
import { OrgChartService } from './modules/orgchart/services/orgchart.service';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [OrgChart],
      synchronize: false,
      migrationsRun: false,
    }),
    TypeOrmModule.forFeature([OrgChart]),
  ],
  controllers: [OrgChartController, AppController],
  providers: [OrgChartService, AppService]
})
export class AppModule {}
