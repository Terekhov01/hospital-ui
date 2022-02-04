export interface ISchedulePatternShortInfo
{
    id: number;
    name: string;
    daysLength: number;
}

export class SchedulePatternShortInfo
{
    id: number;
    name: string;
    daysLength: number;

    constructor(shortInfo: ISchedulePatternShortInfo)
    {
        this.id = shortInfo.id;
        this.name = shortInfo.name;
        this.daysLength = shortInfo.daysLength;
    }
}