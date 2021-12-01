import {RoomModule} from "./room/room.module";
import {SpecialistModule} from "./specialist/specialist.module";

export interface DoctorRequest {


  dateOfEmployment: string;
  education: string;
  room: RoomModule;
  specialist: SpecialistModule[];

}
