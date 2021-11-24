import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
 
@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  public title: string;
 
  @Column()
  public content: string;
}