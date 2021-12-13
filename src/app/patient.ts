import {User} from "./user";

export class Patient extends User {
  id: number;
  constructor(lastName: string) {
    super(lastName);
  }
}
