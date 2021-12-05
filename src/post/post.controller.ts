import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../authentication/guard/jwt-authentication.guard';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FindOneParams } from '../utils/findOneParams';
import { RequestWithUser } from '../authentication/interface/requestWithUser.interface'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) { }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  create(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postService.create(post, req.user);
  }

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthenticationGuard)
  findOne(@Param() { id }: FindOneParams) {
    return this.postService.findOne(+Number(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthenticationGuard)
  update(@Param() { id }: FindOneParams, @Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(+Number(id), updatePostDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthenticationGuard)
  remove(@Param() { id }: FindOneParams) {
    return this.postService.remove(+Number(id));
  }
}
