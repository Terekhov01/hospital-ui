export class FileDTO
{
    originalName: string;
    creationDate: Date;
    content: string;
    mimetype: string;

    constructor(originalName: string, creationDate: Date, content: string, mimetype: string)
    {
        this.originalName = originalName;
        this.creationDate = creationDate;
        this.content = content;
        this.mimetype = mimetype;
    }
}