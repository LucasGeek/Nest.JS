import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryNotFoundException } from './exception/categorynotfound.exception'

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const newPost = await this.categoriesRepository.create(createCategoryDto);
    await this.categoriesRepository.save(newPost);
    return newPost;
  }

  findAll() {
    return this.categoriesRepository.find({ relations: ['posts'] });
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne(id, { relations: ['posts'] });
    if (category) {
      return category;
    }
    throw new CategoryNotFoundException(id);
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.categoriesRepository.update(id, updateCategoryDto);
    const updatedCategory = await this.categoriesRepository.findOne(id, { relations: ['posts'] });
    if (updatedCategory) {
      return updatedCategory
    }
    throw new CategoryNotFoundException(id);
  }

  async remove(id: number) {
    const deleteResponse = await this.categoriesRepository.delete(id);
    if (!deleteResponse.affected) {
      throw new CategoryNotFoundException(id);
    }
  }
}
