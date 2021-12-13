import {User} from "./user";

export class Doctor extends User {
  id: number;
  specialization: string;
  address: string;
  room: string;

  constructor(lastName: string, specialization: string, address: string, room: string) {
    super(lastName);
    this.address = address;
    this.room = room;
    this.specialization = specialization;
  }
}
