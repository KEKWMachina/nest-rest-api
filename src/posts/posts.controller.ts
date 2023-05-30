import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { PostsService } from './posts.service';
import { PostModel } from 'src/models/post.model';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  public findAll(): PostModel[] {
    return this.postsService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id', ParseIntPipe) id: number): PostModel {
    return this.postsService.findOne(id);
  }

  @Post()
  public create(@Body() post: PostModel): PostModel {
    return this.postsService.create(post);
  }

  @Delete(':id')
  public delete(@Param('id', ParseIntPipe) id: number): void {
    this.postsService.delete(id);
  }

  @Put(':id')
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() post: PostModel,
  ): PostModel {
    return this.postsService.update(id, post);
  }
}
