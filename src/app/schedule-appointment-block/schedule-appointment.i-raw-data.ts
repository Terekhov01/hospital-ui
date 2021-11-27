export interface IScheduleInterval
{
  intervalStartTime: string;
  isAssigned: string;
}

export class ScheduleInterval
{
  private intervalStartTime: Date;
  private isAssigned: boolean;

  constructor(iInterval: IScheduleInterval)
  {
    this.intervalStartTime = new Date(iInterval.intervalStartTime);
    this.isAssigned = iInterval.isAssigned == "true";
  }

  getIntervalStartTime(): Date
  {
    return this.intervalStartTime;
  }

  getIsAssigned(): boolean
  {
    return this.isAssigned;
  }
}

export interface IDoctorScheduleAppointmentsData
{
  id: bigint;
  specializationName: string;
  doctorName: string;
  intervalCollection: IScheduleInterval[];
}

export class DoctorScheduleAppointmentsDataDaily
{
  private id: bigint;
  private specializationName: string;
  private doctorName: string;
  private date: Date;
  private intervalCollection: ScheduleInterval[];

  constructor(doctorAppointmentData: IDoctorScheduleAppointmentsData, date: Date)
  {
    this.id = doctorAppointmentData.id;
    this.specializationName = doctorAppointmentData.specializationName;
    this.doctorName = doctorAppointmentData.doctorName;
    this.date = date;
    //Should be filled after constructor is called!
    //Cannot fill it in constructor due to lack of sorted set in typescript
    this.intervalCollection = [];
  }

  getSpecializationName(): string
  {
    return this.specializationName;
  }

  getDoctorName(): string
  {
    return this.doctorName;
  }

  getDate(): Date
  {
    return this.date;
  }

  getIntervalCollection(): ScheduleInterval[]
  {
    return this.intervalCollection;
  }

  setIntervalCollection(intervalArray: ScheduleInterval[]): void
  {
    this.intervalCollection = intervalArray;
  }

  isEmpty(): boolean
  {
    if (this.intervalCollection.length === 0)
    {
      return true;
    }

    return false;
  }
}
