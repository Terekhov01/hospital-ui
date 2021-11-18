import {Patient} from "./patient";
import {Doctor} from "./doctor";

export class AppointmentRegistration {
   id: number;
   service: string;
   start: Date;
   end: Date;
   address: string;
   room: string;
   patient: Patient;
   doctor: Doctor;

  constructor() {
    this.doctor = new Doctor("Noname");
    this.patient = new Patient("Noname");
  }
}
