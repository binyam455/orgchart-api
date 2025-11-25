import { Repository } from 'typeorm';
import { OrgChart } from '../entities/orgchart.entity';
import { DataService } from 'src/app.service';
export declare class OrgChartController {
    private readonly orgChartRepository;
    private readonly dataService;
    constructor(orgChartRepository: Repository<OrgChart>, dataService: DataService);
    getFormattedData(): Promise<any[]>;
    getAllChart(): Promise<OrgChart[]>;
    getChartById(id: any): Promise<OrgChart | null>;
    deleteChart(id: number): Promise<void>;
    createChart(orgchart: OrgChart): Promise<OrgChart>;
    updateChart(id: any, orgchart: OrgChart): Promise<OrgChart | null>;
}
