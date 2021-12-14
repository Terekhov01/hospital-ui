export class TimeRounded
{
    //0-60 minutes per interval
    private static readonly timeIntervalLength = 30;
    hour: number;
    minute: number;

    constructor()
    {
        this.hour = 0;
        this.minute = 0;
    }

    getTimeIntervalLength(): number
    {
        return TimeRounded.timeIntervalLength;
    }

    getHour(): number
    {
        return this.hour;
    }

    getMinute(): number
    {
        return this.minute;
    }

    isBefore(other: TimeRounded): boolean
    {
        if (this.hour < other.getHour() || (this.hour == other.getHour() && this.minute < other.getMinute()))
        {
            return true;
        }

        return false;
    }

    equals(other: TimeRounded): boolean
    {
        return this.hour === other.getHour() && this.minute === other.getMinute();
    }

    isAfter(other: TimeRounded): boolean
    {
        return !this.isBefore(other) && !this.equals(other);
    }

    compareTo(other: TimeRounded): number
    {
        if (this.isBefore(other))
        {
            return -1;
        }

        if(this.equals(other))
        {
            return 0;
        }

        return 1;
    }

    hasNextRounded(): boolean
    {
        let minute = this.minute + TimeRounded.timeIntervalLength;
        let hour = this.hour;

        if (minute >= 60)
        {
            minute -= 60;
            hour++;
        }

        if (hour >= 24)
        {
            return false;
        }

        return true;
    }

    getNextRounded(): TimeRounded
    {
        let minute = this.minute + TimeRounded.timeIntervalLength;
        let hour = this.hour;

        if (minute >= 60)
        {
            minute -= 60;
            hour++;
        }

        if (hour >= 24)
        {
            throw "Time overflow";
        }

        let retVal = new TimeRounded();
        retVal.setTime(hour, minute);
        return retVal;
    }

    toString(): string
    {
        return String(this.hour) + ":" + String(this.minute);
    }

    //Format: hh:mm
    toStringHHMM(): string
    {
        let retVal = "";
        let hourStr = String(this.hour);
        let minuteStr = String(this.minute);
        
        if (hourStr.length === 1)
        {
            retVal += 0;
        }

        retVal += hourStr + ":";

        if (minuteStr.length === 1)
        {
            retVal += 0;
        }

        retVal += minuteStr;

        return retVal;
    }

    private static isValidHour(hour: number): boolean
    {
        if (hour < 0 || hour > 23 || !Number.isInteger(hour))
        {
            return false;
        }

        return true;
    }

    private static parseHour(hour: string): number
    {
        let parsedHour = parseInt(hour);
        if (isNaN(parsedHour))
        {
            throw "Hour '" + hour + "' is not valid! Could not parse it to integer.";
        }

        return parsedHour;
    }

    private static isValidMinute(minute: number): boolean
    {
        if (minute < 0 || minute > 60 || !Number.isInteger(minute))
        {
            return false;
        }

        return true;
    }

    private static parseMinute(minute: string): number
    {
        let parsedMinute = parseInt(minute);
        if (isNaN(parsedMinute))
        {
            throw "Minute '" + minute + "' is not valid! Could not parse it to integer";
        }

        return parsedMinute;
    }


    setTime(hour: number, minute: number): void
    {
        if (!TimeRounded.isValidHour(hour) || !TimeRounded.isValidMinute(minute) || (hour * 60 + minute) % TimeRounded.timeIntervalLength !== 0)
        {
            throw "Could not set values of TimeRounded. Invalid setter function parameters. Values are: " + hour + " hours, " + minute + " minutes";
        }
        
        this.hour = hour;
        this.minute = minute;
    }
    
    setTimeByString(timeStr: string): void
    {
        let hourAndMinuteStr = timeStr.split(":");
        let hour: number, minute: number;
        if (hourAndMinuteStr.length !== 2)
        {
            throw "Time '" + timeStr + "' has invalid format!";
        }

        try
        {
            hour = TimeRounded.parseHour(hourAndMinuteStr[0]);
            minute = TimeRounded.parseMinute(hourAndMinuteStr[1]);
        }
        catch(error)
        {
            throw "Time '" + timeStr + "' is invalid." + error;
        }

        return this.setTime(hour, minute);
    }
}

export class Interval
{
    start: TimeRounded;
    end: TimeRounded;

    constructor(start: TimeRounded, end: TimeRounded)
    {
        if (!start.isBefore(end) && end.getHour() !== 0 && end.getMinute() !== 0)
        {
            throw "Illegal arguments: start time is before end time!";
        }

        this.start = start;
        this.end = end;
    }
}

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
        for (let interval of intervals)
        {
            let curTime = interval.start;
            
            if (interval.end.getHour() === 0 && interval.end.getMinute() === 0)
            {
                while (curTime.hasNextRounded())
                {
                    let timeRounded = new TimeRounded();
                    timeRounded.setTime(curTime.getHour(), curTime.getMinute());
                    this.timesRounded.push(timeRounded);
                    curTime = curTime.getNextRounded();
                }

                let timeRounded = new TimeRounded();
                timeRounded.setTime(curTime.getHour(), curTime.getMinute());
                this.timesRounded.push(timeRounded);
            }

            while (curTime.isBefore(interval.end))
            {
                let timeRounded = new TimeRounded();
                timeRounded.setTime(curTime.getHour(), curTime.getMinute());
                this.timesRounded.push(timeRounded);
                curTime = curTime.getNextRounded();
            }
        }

        this.timesRounded.sort((first, second) => 
        {
            return first.compareTo(second);
        });

        this.timesRounded = this.timesRounded.filter(function (e, i, a) 
        {
            if (i === 0) 
            {
                return true;
            }

            let debug = a[i - 1];
            let debug2 = !e.equals(a[i - 1]);

            return !e.equals(a[i - 1]);
        });
    }

    public getIntervals(): Interval[]
    {
        let retVal: Interval[] = [];
        let currentInterval: Interval = new Interval(new TimeRounded(), new TimeRounded());
        let prevTimeRounded: TimeRounded = null;
        for (let timeRounded of this.timesRounded)
        {
            if (prevTimeRounded == null)
            {
                currentInterval.start = timeRounded;
                currentInterval.end = timeRounded.getNextRounded();
            }
            else if (prevTimeRounded.getNextRounded().equals(timeRounded))
            {
                currentInterval.end = timeRounded.getNextRounded()
            }
            else
            {
                retVal.push(currentInterval);
                currentInterval.start = timeRounded;
                currentInterval.end = timeRounded.getNextRounded();
            }
            prevTimeRounded = timeRounded;
        }

        retVal.push(currentInterval);

        return retVal;
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