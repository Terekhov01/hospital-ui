import {User} from "./user";

export class Doctor extends User {
  id: number;
  constructor(lastName: string) {
    super(lastName);
  }
}
