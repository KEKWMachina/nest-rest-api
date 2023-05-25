import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { UserModel } from 'src/models/users.model';

@Injectable()
export class UsersService {
  private users: UserModel[] = [
    { userId: 11, name: 'Nickname' },
    { userId: 22, name: 'Blankname' },
    { userId: 33, name: 'Testname' },
  ];

  public getUsers(): UserModel[] {
    return this.users;
  }

  public getUser(id: number): UserModel {
    const user = this.users.find((user) => user.userId === id);

    if (!user) {
      throw new NotFoundException('Post not found.');
    }

    return user;
  }

  public createUser(newUser: UserModel): UserModel {
    const userAlreadyExists = this.users.some((user: UserModel) => {
      return user.name === newUser.name;
    });

    if (userAlreadyExists) {
      throw new UnprocessableEntityException(
        'User with the same nickname already exists.',
      );
    }

    const maxId: number = Math.max(...this.users.map((user) => user.userId), 0);
    const newId: number = maxId + 1;
    const createdUser = { userId: newId, name: newUser.name };

    this.users.push(createdUser);

    return createdUser;
  }

  public updateUser(userId: number, userData: UserModel): UserModel {
    const userIndex = this.users.findIndex((user) => user.userId === userId);

    if (userIndex === -1) {
      throw new NotFoundException('User not found.');
    }

    const nameIsAlreadyPresent = this.users.some(
      (user) => user.name === userData.name,
    );

    if (nameIsAlreadyPresent) {
      throw new UnprocessableEntityException(
        'User with this name already exists.',
      );
    }

    const updatedUser = { userId, ...userData };

    this.users[userIndex] = updatedUser;

    return this.users[userIndex];
  }

  public deleteUser(userId: number): boolean {
    const userIndex = this.users.findIndex((user) => user.userId === userId);

    if (userIndex !== -1) {
      this.users.splice(userIndex, 1);

      return true;
    }

    return false;
  }
}
