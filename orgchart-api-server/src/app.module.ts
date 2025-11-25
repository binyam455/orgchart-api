import { Module } from '@nestjs/common';
import { OrgChart } from './entities/orgchart.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrgChartController } from './controllers/orgchart.controller';
import { DataService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'abc123',
      database: 'orga_structure',
      entities: [OrgChart],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([OrgChart]),
  ],
  controllers: [OrgChartController],
  providers: [DataService]
})
export class AppModule {}
