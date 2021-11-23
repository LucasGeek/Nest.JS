import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  private lastPostId = 0;
  private posts: Post[] = [];

  create(post: CreatePostDto) {
    const newPost = {
      id: ++this.lastPostId,
      ...post
    }
    this.posts.push(newPost);
    return newPost;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    const post = this.posts.find(post => post.id === id);
    if (post) {
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  update(id: number, post: UpdatePostDto) {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex > -1) {
      this.posts[postIndex] = post;
      return post;
    }
    throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
  }

  remove(id: number) {
    const postIndex = this.posts.findIndex(post => post.id === id);
    if (postIndex > -1) {
      this.posts.splice(postIndex, 1);
    } else {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
