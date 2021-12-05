import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { Post } from '../../post/entities/post.entity'

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @ManyToMany(() => Post, (post: Post) => post.categories)
    public posts: Post[];
}