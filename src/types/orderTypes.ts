import { Types } from 'mongoose';


export interface ICustomer {
  name: string;
    address: string;
    phone: string;
}

export interface IOrderItem {
  name: string;
  quantity: number;
  price: number;
}


export interface IOrder {
  _id: Types.ObjectId;
  orderNumber: string;
partnerId?: Types.ObjectId;
  customer: ICustomer;
  area: string;
  items: IOrderItem[];
  status: 'pending' | 'assigned' | 'picked' | 'delivered';
  scheduledFor: string;
  assignedTo?: string;
  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
