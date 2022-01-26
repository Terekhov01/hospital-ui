import { Interval, TimeRounded } from "./schedule-interval.data-transfer-objects";

export interface IDailyInformation
{
    date: string;
    timeIntervals: string[];
}

export interface IDoctorSchedule
{
    id: bigint;
    specializationNames: string[];
    firstName: string;
    lastName: string;
    middleName: string;
    dailyInformation: IDailyInformation[];
}

export class DailyInformation
{
    date: Date;
    timeIntervals: Interval[];
}

export class DoctorInfo
{
    id: bigint;
    specializationNames: string[];
    firstName: string;
    lastName: string;
    middleName: string;
    //dailyInformation: DailyInformation[];
}