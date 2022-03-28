import {Patient} from "./patient";

export enum Role
{
  ROLE_PATIENT = "PATIENT",
  ROLE_DOCTOR = "DOCTOR",
  ROLE_ADMIN = "ADMIN"
}

export class User {
  id: bigint;
  firstName: string;
  lastName: string;
  patronymic: string;
  phone: string;
  username: string;
  email: string;
  password: string;

  initFields(firstname: string, lastname: string, patronymic: string, phone: string, username: string, email: string, password: string) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.patronymic = patronymic;
    this.phone = phone;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}