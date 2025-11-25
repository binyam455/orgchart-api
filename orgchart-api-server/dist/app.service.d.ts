import { DataSource } from 'typeorm';
export declare class DataService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getFormattedChartData(): Promise<any[]>;
    deleteAssociatedRec(id: number): Promise<void>;
}
export declare class AppService {
    getHello(): string;
}
