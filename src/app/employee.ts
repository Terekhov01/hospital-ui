import {Erole} from './erole';
import {Role} from './role';

export class Employee {
  id: number;
  firstName: string;
  lastName: string;
  patronymic: string;
  phone: string;
  username: string;
  email: string;
  roles: Set<Role>;
  password: string;
}
