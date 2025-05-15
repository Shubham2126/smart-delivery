import { Types } from 'mongoose';

export interface IAssignment {
  _id?: Types.ObjectId;
  orderId: Types.ObjectId;     
  partnerId?: Types.ObjectId;   
  status: 'success' | 'failed';
  reason?: string;   
  createdAt?: Date; 
  updatedAt?: Date;        
}
