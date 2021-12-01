import {Patient} from "./patient";
import {Appointment} from "./appointment";

export class MedCard {
  id: number;
  patient: Patient;
  contraindications: string;
  hereditary: string;
  appointments: Appointment[];

  constructor() {
    this.id = 0;
    this.patient = new Patient("asd");
    this.contraindications = "contraindications";
    this.hereditary = "hereditary";
    this.appointments = [];
  }

}
