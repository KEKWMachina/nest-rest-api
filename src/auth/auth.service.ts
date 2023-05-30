import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(userCredentials: User): Promise<{ access_token: string }> {
    const user = await this.userModel.findOne({ name: userCredentials.name });

    if (user?.password !== userCredentials.password) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.name,
      password: user.password,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
