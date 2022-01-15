export interface IUserNameId
{
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;
}

export class UserNameId
{
    id: number;
    firstName: string;
    lastName: string;
    middleName: string;

    constructor (iUserNameId: IUserNameId)
    {
        this.id = iUserNameId.id;
        this.firstName = iUserNameId.firstName;
        this.lastName = iUserNameId.lastName;
        this.middleName = iUserNameId.middleName;
    }
}