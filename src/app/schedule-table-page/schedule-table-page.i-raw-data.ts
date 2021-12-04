export interface ITableDailyInfo
{
    date: string;
    startOfDay: string;
    endOfDay: string;
}

export interface IDoctorScheduleTableData
{
    id: bigint;
    specializationName: string;
    doctorName: string;
    dailyInformation: Array<ITableDailyInfo>;
}