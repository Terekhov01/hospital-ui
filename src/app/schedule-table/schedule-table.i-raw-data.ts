import { LocationChangeEvent } from "@angular/common";

export interface IScheduleInterval
{
    intervalStartTime: Date;
    isAssigned: boolean;
}

export interface IDoctorData
{
    id: bigint;
    specialization: string;
    doctorName: string;
    intervalSet: Set<IScheduleInterval>;
}