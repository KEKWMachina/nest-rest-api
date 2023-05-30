import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EmployerDocument = Employer & Document;

@Schema()
export class Employer {
  @Prop()
  companyName: string;

  @Prop()
  yearFounded: number;

  @Prop()
  field: string;

  @Prop()
  email: string;

  @Prop()
  phoneNumber: number;

  @Prop()
  address: string;
}

export const EmployerSchema = SchemaFactory.createForClass(Employer);
