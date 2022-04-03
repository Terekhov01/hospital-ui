import {Doctor} from "./doctor";

export class Specialist {
  id: number;
  specialization: string;
  doctors: Set<Doctor>;
  constructor() {
    this.id = 0;
    this.specialization = '';
    // @ts-ignore
    this.doctors = new Set<Doctor>();
  }
}
