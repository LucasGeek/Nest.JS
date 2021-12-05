import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryDto } from './create-category.dto';
import { Post } from '../../post/entities/post.entity';

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @IsNumber()
    @IsOptional()
    id: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsOptional()
    posts: Post[];
}
