import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { PostModel } from 'src/models/post.model';

@Injectable()
export class PostsService {
  private posts: PostModel[] = [];

  public findAll(): PostModel[] {
    return this.posts;
  }

  public findOne(id: number): PostModel {
    const post: PostModel = this.posts.find((post) => post.id === id);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    return post;
  }

  public create(post: PostModel): PostModel {
    const titleExists: boolean = this.posts.some(
      (item) => item.title === post.title,
    );

    if (titleExists) {
      throw new UnprocessableEntityException('Post title already exists.');
    }

    const maxId: number = Math.max(...this.posts.map((post) => post.id), 0);
    const id: number = maxId + 1;

    const blogPost: PostModel = {
      ...post,
      id,
    };

    this.posts.push(blogPost);

    return blogPost;
  }

  public delete(id: number): void {
    const index: number = this.posts.findIndex((post) => post.id === id);

    if (index === -1) {
      throw new NotFoundException('Post not found.');
    }

    this.posts.splice(index, 1);
  }

  public update(id: number, post: PostModel): PostModel {
    const index: number = this.posts.findIndex((post) => post.id === id);

    if (index === -1) {
      throw new NotFoundException('Post not found.');
    }

    const titleExists: boolean = this.posts.some(
      (item) => item.title === post.title && item.id !== id,
    );

    if (titleExists) {
      throw new UnprocessableEntityException('Post title already exists.');
    }

    const blogPost: PostModel = {
      ...post,
      id,
    };

    this.posts[index] = blogPost;

    return blogPost;
  }
}
