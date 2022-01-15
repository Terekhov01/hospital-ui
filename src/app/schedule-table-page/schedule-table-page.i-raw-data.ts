export interface ITableDailyInfo
{
    date: string;
    startOfDay: string;
    endOfDay: string;
}

export interface IDoctorScheduleTableData
{
    id: bigint;
    specializationNames: string[];
    firstName: string;
    lastName: string;
    middleName: string;
    dailyInformation: Array<ITableDailyInfo>;
}