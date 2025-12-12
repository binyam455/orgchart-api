import { Body, Param } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrgChart } from '../../../entities/orgchart.entity';
import { DataSource } from 'typeorm'; 

@Injectable()
export class OrgChartService {
    constructor(
        @InjectRepository(OrgChart) private readonly orgChartRepository: Repository<OrgChart>,
            @InjectDataSource() private readonly dataSource: DataSource
    ) {}

    async getAllChart(): Promise<OrgChart[]> {
            return await this.orgChartRepository.find();
    }

    async getChartById(@Param("id") id: any): Promise<OrgChart|null> {
        return await this.orgChartRepository.findOneBy({ id : id });
    }

    async createChart(@Body() orgchart: OrgChart) : Promise<OrgChart> {
        return await this.orgChartRepository.save(orgchart);
    }
    
    async updateChart(@Param("id") id: any, @Body() body: any): Promise<OrgChart|null> {
        await this.orgChartRepository.update(id, 
                                             { id: body.id,
                                               name: body.name,
                                               description: body.description,
                                               manager_id: body.manager_selid
                                             });  
        return await this.orgChartRepository.findOneBy({ id : id });
    }

    async getFormattedChartData(): Promise<any[]> {
        const result = await this.dataSource.query(
        "WITH Recursive emps AS (" +
        "SELECT id, name, description, manager_id, 1 AS level, name AS path " +
        "FROM orgchart WHERE manager_id = 0 " +
        "UNION ALL " +
        "SELECT o.id, o.name, o.description, o.manager_id, " +
        "e.level + 1 AS level, e.path || ' ->> ' || o.name AS path " +
        "FROM orgchart o INNER JOIN emps e ON o.manager_id = e.id ) " +
        "SELECT id, name, description, manager_id, level, path " +
        "FROM emps ORDER BY level;");
        
        return result;
    }

    async deleteNodeAndChildren(id: number): Promise<void> {
        await this.orgChartRepository.delete(id);  

        await this.dataSource.query(
            "DELETE FROM orgchart WHERE manager_id IN (" +
            "WITH Recursive emps AS (" +
            "SELECT id " +
            "FROM orgchart WHERE manager_id = $1 " +
            "UNION ALL " +
            "SELECT o.id " +
            "FROM orgchart o INNER JOIN emps e ON o.manager_id = e.id ) " +
            "SELECT id FROM emps)", [id]);

        await this.dataSource.query(
            "DELETE FROM orgchart WHERE manager_id = $1", [id]
        )
    }
    }