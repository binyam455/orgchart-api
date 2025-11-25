import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity('orgchart')
export class OrgChart {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  manager_id: number;
}