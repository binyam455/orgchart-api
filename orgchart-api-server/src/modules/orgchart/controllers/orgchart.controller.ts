import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { OrgChartService } from '../services/orgchart.service';
import { OrgChart } from '../../../entities/orgchart.entity';

@Controller("orgchart")
export class OrgChartController {
    constructor(
        private readonly orgChartService: OrgChartService
    ) {}

    // Get formatted orgchart data
    @Get('data')
    async getFormattedData(): Promise<any[]> {
        return await this.orgChartService.getFormattedChartData();
    }
    
      //get all the data
    @Get()
    async getAllChart() {
        return await this.orgChartService.getAllChart();
    }

    //get single data
    @Get(":id")
    async getChartById(@Param("id") id: any) {
        return await this.orgChartService.getChartById({ id : id });
    }

    //delete a record
    @Delete(":id")
    async deleteChart(@Param("id") id: number) {
        await this.orgChartService.deleteNodeAndChildren(id);
    }

    //create a new data
    @Post()
    async createChart(@Body() orgchart: OrgChart) {
        return await this.orgChartService.createChart(orgchart);
    }

    //update the record
    @Put(":id")
    async updateChart(@Param("id") id: any, @Body() orgchart: OrgChart): Promise<OrgChart|null> {
        return await this.orgChartService.updateChart(id, orgchart);  
    }
}