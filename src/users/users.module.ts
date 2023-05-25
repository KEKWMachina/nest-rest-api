import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersGetMiddleware } from './middlewares/users-get.middleware';
import { UsersPostMiddleware } from './middlewares/users-post.middleware';

@Module({
  providers: [UsersService, UsersGetMiddleware],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersGetMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET });
    consumer
      .apply(UsersPostMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.POST });
  }
}
