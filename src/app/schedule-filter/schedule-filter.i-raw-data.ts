export interface IDoctorShortInformation
{
    id: number;
    doctorName: string;
    specializationName: string;
}

export class DoctorShortInformation implements IDoctorShortInformation
{
    id: number;
    doctorName: string;
    specializationName: string;
    
    constructor(instane: IDoctorShortInformation)
    {
        this.id = instane.id;
        this.doctorName = instane.doctorName;
        this.specializationName = instane.specializationName;
    }

    toString(): string
    {
        return this.specializationName.concat(" - ").concat(this.doctorName).concat(" (").concat(String(this.id)).concat(")");
    }
}