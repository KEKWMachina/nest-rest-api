import { Module } from '@nestjs/common';

import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { EmployeeModule } from './employee/employee.module';
import { ConfigModule } from '@nestjs/config';
import { EmployersModule } from './employers/employers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PostsModule,
    UsersModule,
    AuthModule,
    EmployeeModule,
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_ACCESS_NAME}:${process.env.DB_ACCESS_PASSWORD}@cluster0.fbzuyvk.mongodb.net/?retryWrites=true&w=majority`,
    ),
    EmployersModule,
  ],
})
export class AppModule {}
