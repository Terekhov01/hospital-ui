import {SpecialistModule} from "./specialist/specialist.module";
import {RoomModule} from "./room/room.module";

export interface User {

  id: number;
  firstname: string;
  lastname: string;
  dateOfEmployment: string;
  education: string;
  room: RoomModule;
  specialist: SpecialistModule[];
}
