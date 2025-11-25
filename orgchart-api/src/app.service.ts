import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm'; // Or @InjectConnection()
import { DataSource } from 'typeorm'; // Or Connection

@Injectable()
export class DataService {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {} // Or @InjectConnection() private readonly connection: Connection

  async getFormattedChartData(): Promise<any[]> {
    const result = await this.dataSource.query(
      "WITH Recursive emps AS (" +
      "SELECT id, name, description, manager_id, 1 AS level " +
      "FROM orgchart WHERE manager_id = 0 " +
      "UNION ALL " +
      "SELECT o.id, o.name, o.description, o.manager_id, e.level + 1 AS level " +
      "FROM orgchart o INNER JOIN emps e ON o.manager_id = e.id ) " +
      "SELECT id, name, description, manager_id, level " +
      "FROM emps ORDER BY level;");
    
      return result;
  }

  async deleteAssociatedRec(id: number): Promise<void> {
    await this.dataSource.query(
        "DELETE FROM orgchart WHERE manager_id IN (" +
        "WITH Recursive emps AS (" +
        "SELECT id " +
        "FROM orgchart WHERE manager_id = " + id + " " +
        "UNION ALL " +
        "SELECT o.id " +
        "FROM orgchart o INNER JOIN emps e ON o.manager_id = e.id ) " +
        "SELECT id FROM emps)");

    await this.dataSource.query("DELETE FROM orgchart WHERE manager_id=" + id);
  }
}
    
  export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
