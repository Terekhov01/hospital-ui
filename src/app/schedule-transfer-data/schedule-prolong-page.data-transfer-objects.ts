import { Interval, RoundedTimeIntervalConverter, TimeRounded } from "./schedule-interval.data-transfer-objects";

export class ScheduleDayPattern
{
    dayNumber: number;
    timesRounded: TimeRounded[];

    constructor(dayId: number, intervals: Interval[])
    {
        this.dayNumber = dayId;
        this.timesRounded = [];
        this.addIntervals(intervals);
    }

    public getDayId(): number
    {
        return this.dayNumber;
    }

    public getTimesRounded(): TimeRounded[]
    {
        return this.timesRounded;
    }

    public addIntervals(intervals: Interval[]): void
    {
        let newRounded = RoundedTimeIntervalConverter.toRounded(intervals);
        
        for (let timeRounded of newRounded)
        {
            this.timesRounded.push(timeRounded);
        }
    }

    public getIntervals(): Interval[]
    {
        return RoundedTimeIntervalConverter.toIntervals(this.timesRounded);
    }
}

export class ScheduleTablePattern
{
    patternName: string;
    daysLength: number;
    scheduleDailyPatterns: ScheduleDayPattern[];

    constructor(patternName: string, daysLength: number, scheduleDayPattern: ScheduleDayPattern[])
    {
        this.patternName = patternName;
        this.daysLength = daysLength;
        this.scheduleDailyPatterns = scheduleDayPattern;
    }

    getPatternName(): string
    {
        return this.patternName;
    }
}