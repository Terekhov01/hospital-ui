import {User} from "./user";

export class Patient {
  id: bigint;
  user: User;
  passport: string;
  polys: string;


  initFields(passport: string, polys: string, patient: bigint, firstname: string, lastname: string, patronymic: string, phone: string, username: string, email: string, password: string) {
    this.user = new User();
    this.user.initFields(firstname, lastname, patronymic, phone, username, email, password);
    this.passport = passport;
    this.polys = polys;
  }
}

