import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EmployersService } from './employers.service';
import { EmployersController } from './employers.controller';
import { Employer, EmployerSchema } from './schemas/employer.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Employer.name,
        schema: EmployerSchema,
      },
    ]),
  ],
  providers: [EmployersService],
  controllers: [EmployersController],
})
export class EmployersModule {}
