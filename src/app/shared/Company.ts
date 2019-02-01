import {User} from './models/User.model';

export class Company {
  name: string;
  responsibleName: string;
  responsibleEmail: string;
  responsiblePhone: string;
  id?: string;
  _rev?: string;
  clients?: User[];
}
