import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Employee,
  EmployeeDocument,
} from 'src/employee/schemas/employee.shema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  async create(createEmployee: Employee): Promise<EmployeeDocument> {
    const employee = new this.employeeModel(createEmployee);
    return employee.save();
  }

  async findAll(): Promise<EmployeeDocument[]> {
    return this.employeeModel.find().exec();
  }

  async findOne(id: string) {
    return this.employeeModel.findById(id);
  }

  async update(
    id: string,
    updateEmployee: Employee,
  ): Promise<EmployeeDocument> {
    return this.employeeModel.findByIdAndUpdate(id, updateEmployee);
  }

  async remove(id: string) {
    return this.employeeModel.findByIdAndRemove(id);
  }
}
