import {SpecialistModule} from "./specialist/specialist.module";
import {RoomModule} from "./room/room.module";

export interface User {

  id: number;
  dateOfEmployment: string;
  education: string;
  room: RoomModule;
  specialist: SpecialistModule[];
}
