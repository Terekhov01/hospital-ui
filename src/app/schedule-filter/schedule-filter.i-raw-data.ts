export interface IDoctorShortInformation
{
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    specializationNames: string[];
}

export class DoctorShortInformation implements IDoctorShortInformation
{
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    specializationNames: string[];
    
    constructor(instane: IDoctorShortInformation)
    {
        this.id = instane.id;
        this.firstName = instane.firstName;
        this.middleName = instane.middleName;
        this.lastName = instane.lastName;
        this.specializationNames = instane.specializationNames;
    }

    toString(): string
    {
        return this.lastName.concat(" ").concat(this.firstName).concat(" ").concat(this.middleName);
    }
}