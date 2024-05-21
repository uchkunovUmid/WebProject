import { Request } from 'express';
import { IUserInterface } from './IUser.interface';

export interface RequestWithUser extends Request {
  user?: IUserInterface;
}
