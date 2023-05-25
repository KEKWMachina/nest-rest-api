import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { UserModel } from 'src/models/users.model';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public getUsers(): UserModel[] {
    return this.usersService.getUsers();
  }

  @Get(':userId')
  public findUser(@Param('userId', ParseIntPipe) userId: number): UserModel {
    return this.usersService.getUser(userId);
  }

  @Post()
  public createUser(@Body() newUser: UserModel): UserModel {
    return this.usersService.createUser(newUser);
  }

  @Put(':userId')
  public updateUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() post: UserModel,
  ): UserModel {
    return this.usersService.updateUser(userId, post);
  }

  @Delete(':userId')
  public deleteUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Res() res: Response,
  ): void {
    const result = this.usersService.deleteUser(userId);

    if (result) {
      res.status(HttpStatus.OK).send('User was deleted');
    } else {
      res.status(HttpStatus.GONE).send('No such user was found');
    }
  }
}
