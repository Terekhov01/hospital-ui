import {Erole} from './erole';
import {Role} from './role';
import {Patient} from './patient';

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
  passport: string;
  patient: Patient;
  polys: string;
  role: string;
}
