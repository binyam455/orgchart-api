import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrgChart } from '../entities/orgchart.entity';
import { DataService } from 'src/app.service';

@Controller("orgchart")
export class OrgChartController {
    constructor(
        @InjectRepository(OrgChart)
        private readonly orgChartRepository: Repository<OrgChart>,
        private readonly dataService: DataService
    ) {}

    // Get formatted orgchart data
    @Get('data')
    async getFormattedData(): Promise<any[]> {
        return await this.dataService.getFormattedChartData();
    }
    
      //get all the data
    @Get()
    async getAllChart(): Promise<OrgChart[]> {
        return await this.orgChartRepository.find();
    }

    //get single data
    @Get(":id")
    async getChartById(@Param("id") id: any): Promise<OrgChart|null> {
        return await this.orgChartRepository.findOneBy({ id : id });
    }

    //delete a record
    @Delete(":id")
    async deleteChart(@Param("id") id: number): Promise<void> {
        await this.orgChartRepository.delete(id);
        await this.dataService.deleteAssociatedRec(id);
    }

    //create a new data
    @Post()
    async createChart(@Body() orgchart: OrgChart) : Promise<OrgChart> {
        return await this.orgChartRepository.save(orgchart);
    }

    //update the record
    @Put(":id")
    async updateChart(@Param("id") id: any, @Body() orgchart: OrgChart): Promise<OrgChart|null> {
        await this.orgChartRepository.update(id, orgchart);  
        return await this.orgChartRepository.findOneBy({ id : id });
    }
}