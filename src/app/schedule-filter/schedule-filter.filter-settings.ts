export class FilterSettings
{
  private id: number;
  private startDate: Date;
  private endDate: Date;

  constructor(id: number, startDate: Date, endDate: Date)
  {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  getId(): number
  {
    return this.id;
  }

  getStartDate(): Date
  {
    return this.startDate;
  }

  getEndDate(): Date
  {
    return this.endDate;
  }
}
