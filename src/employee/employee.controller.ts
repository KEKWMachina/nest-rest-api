import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';

import { EmployeeService } from './employee.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { Employee } from './entities/employee.entity';

@Controller('employee')
@UseGuards(AuthGuard)
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Post()
  create(@Body() createEmployee: Employee) {
    return this.employeeService.create(createEmployee);
  }

  @Get()
  findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateEmployee: Employee) {
    return this.employeeService.update(id, updateEmployee);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
