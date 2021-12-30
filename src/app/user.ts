import {Patient} from "./patient";

export class User {
  id: bigint;
  firstName: string;
  lastName: string;
  patronymic: string;
  phone: string;
  username: string;
  email: string;
  password: string;

  constructor(firstname: string, lastname: string, patronymic: string, phone: string, username: string, email: string, password: string) {
    this.firstName = firstname;
    this.lastName = lastname;
    this.patronymic = patronymic;
    this.phone = phone;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}
