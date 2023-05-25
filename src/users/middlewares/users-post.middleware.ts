import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class UsersPostMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const hasValidNickname = !/[<>'";`%~#^*]/.test(req.body.name);
    const hasValidCharacterLenght = req.body.name.length < 20;

    if (hasValidNickname && hasValidCharacterLenght) {
      next();
    } else {
      res.send('Invalid user nickname');
    }
  }
}
