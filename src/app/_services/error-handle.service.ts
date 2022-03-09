import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService {

    constructor() { }

    public getMessage(error: any): string
    {
        if (this.hasTypeString(error))
        {
            return error.toString();
        }

        if ("error" in error)
        {
            if (this.hasTypeString(error.error))
            {
                return error.error;
            }

            if ("message" in error.error && this.hasTypeString(error.error.message))
            {
                if (error.error.message == "Error: Unauthorized")
                {
                    return "Ошибка авторизации. Попытайтесь войти в аккаунт еще раз";
                }

                return error.error.message;
            }
        }

        if ("message" in error)
        {
            if (this.hasTypeString(error.message))
            {
                if (error.message.includes("0 Unknown Error"))
                {
                    return error.message.concat(" - вероятно, сервер отключен / недоступен. Попробуйте повторить позже");
                }

                return error.message;
            }
        }

        return error.toString();
    }

    private hasTypeString(value: any): boolean
    {
        return typeof value === 'string' || value instanceof String;
    }
}
