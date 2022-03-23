import { CommonUtilsService } from "../_services/common-utils.service";
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

    constructor(date: Date)
    {
        this.date = new Date(date);
    }

    fillDefaultIntervalAmount(intervalAmount: number)
    {
        this.timeIntervals = [];
        for (let i = 0; i < intervalAmount; i++)
        {
            this.timeIntervals.push(null);
        }
    }

    isWeekend(): boolean
    {
        return !this.timeIntervals.some((element) => element != null);
    }
}

export class WeeklyInformation
{
    dailyInformation: DailyInformation[];

    constructor(weekStartDate: Date, intervalAmount: number)
    {
        this.dailyInformation = [];

        if (weekStartDate.getDay() != 1)
        {
            console.warn("В конструктор недели передана дата, не являющаяся понедельником. Используется ближайший понедельник перед указанной датой!");
            
            let day = weekStartDate.getDay();
            let diff = weekStartDate.getDate() - day + (day == 0 ? -6:1);
            weekStartDate =  new Date(weekStartDate.setDate(diff));
        }
        
        let weekStartDateCpy = new Date(weekStartDate);

        for (let dateCounter = new Date(weekStartDate); dateCounter < CommonUtilsService.getSundayAfter(weekStartDate); dateCounter.setDate(dateCounter.getDate() + 1))
        {
            let dailyInformation = new DailyInformation(dateCounter);
            dailyInformation.fillDefaultIntervalAmount(intervalAmount);
            this.dailyInformation.push(dailyInformation);
        }
    }
}

export class DoctorSchedule
{
    startDate: Date;
    endDate: Date;
    doctorInfo: DoctorInfo;
    weeklyInformation: WeeklyInformation[];

    constructor(startDate: Date, endDate: Date)
    {
        this.startDate = new Date(startDate);
        this.endDate = new Date(endDate);
        this.weeklyInformation = [];
        this.doctorInfo = new DoctorInfo();
    }
}

export class DoctorInfo
{
    id: bigint;
    specializationNames: string[];
    firstName: string;
    lastName: string;
    middleName: string;

    constructor()
    {
        this.specializationNames = [];
    }
}