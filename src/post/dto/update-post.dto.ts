import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreatePostDto } from './create-post.dto';
import { User } from '../../user/entities/user.entity'
import { Category } from '../../category/entities/category.entity'

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    content: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    title: string;

    @IsOptional()
    author: User

    @IsOptional()
    categories: Category[]
}