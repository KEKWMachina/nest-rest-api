import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Employer, EmployerDocument } from './schemas/employer.schema';

@Injectable()
export class EmployersService {
  constructor(
    @InjectModel(Employer.name)
    private readonly employerModel: Model<EmployerDocument>,
  ) {}

  async createEmployer(createEmployee: Employer): Promise<EmployerDocument> {
    const employee = new this.employerModel(createEmployee);
    return employee.save();
  }

  async getEmployers(): Promise<EmployerDocument[]> {
    return this.employerModel.find().exec();
  }

  async findEmployer(id: string) {
    return this.employerModel.findById(id);
  }

  async updateEmployer(
    id: string,
    updateEmployee: Employer,
  ): Promise<EmployerDocument> {
    return this.employerModel.findByIdAndUpdate(id, updateEmployee);
  }

  async removeEmployer(id: string) {
    return this.employerModel.findByIdAndRemove(id);
  }
}
