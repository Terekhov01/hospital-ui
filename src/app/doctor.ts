import {User} from "./user";
import {Room} from "./room";

export class Doctor {
  id: bigint;
  dateOfEmployment: Date;
  education: string;
  user: User;
  room: Room;

  constructor(firstname: string, lastname: string, patronymic: string, phone: string, username: string, email:string, password:string, dateOfEmployment: Date, education: string) {
    this.user = new User(firstname, lastname, patronymic, phone, username, email, password);
    this.dateOfEmployment = dateOfEmployment;
    this.education = education;
    this.room = new Room();
  }
}
