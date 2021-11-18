// import { Patient } from './patient';
// import { Doctor } from './doctor';
import { AppointmentRegistration } from "./appointment-registration";

export class Appointment {
  id: number;
  appointmentRegistration: AppointmentRegistration;
  // patient: Patient;
  // doctor: Doctor;
  description: string;
  recipe: string;
  treatPlan: string;
  rehabPlan: string;
  docStatement: string;
  file: Blob;
  constructor() {
    // this.doctor = new Doctor("");
    // this.patient = new Patient("");
  }
}
