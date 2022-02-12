// import { Patient } from './patient';
// import { Doctor } from './doctor';
import { Byte } from "@angular/compiler/src/util";
import { AppointmentRegistration } from "./appointment-registration";

export class Appointment {
    id: bigint;
    appointmentRegistration: AppointmentRegistration;
    // patient: Patient;
    // doctor: Doctor;
    description: string;
    recipe: string;
    treatPlan: string;
    rehabPlan: string;
    docStatement: string;
    // files: File[];
    // file: File;
    constructor() {
        // this.doctor = new Doctor("");
        // this.patient = new Patient("");
    }
}

export class FileDTO
{
    name: string;
    fileData: Uint8Array;

    constructor(name: string, fileData: Uint8Array) {
        this.name = name;
        this.fileData = fileData;
    }
}

export class AppointmentCreationDTO
{
    appointmentRegistrationId: bigint;
    description: string;
    recipe: string;
    treatPlan: string;
    rehabPlan: string;
    docStatement: string;

    filesToUpload: File[];
    sickListNeeded: boolean;
    recoveryDate: Date;

    constructor() {
        this.filesToUpload = [];
    }
}
