import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AuthGuard } from 'src/auth/auth.guard';
import { EmployersService } from './employers.service';
import { Employer } from './entities/employer.entity';

@Controller('employers')
@UseGuards(AuthGuard)
export class EmployersController {
  constructor(private employersService: EmployersService) {}

  @Post()
  create(@Body() createEmployee: Employer) {
    return this.employersService.createEmployer(createEmployee);
  }

  @Get()
  findAll() {
    return this.employersService.getEmployers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employersService.findEmployer(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEmployee: Employer) {
    return this.employersService.updateEmployer(id, updateEmployee);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employersService.removeEmployer(id);
  }
}
