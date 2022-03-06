import { Injectable } from '@angular/core';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { Subject } from 'rxjs';
import { ErrorHandleService } from './error-handle.service';

@Injectable({
  providedIn: 'root'
})
export class PopUpMessageService
{
    private static defaultDisplayDurationSeconds = 5;
    public isMessageDisplayingLock = new Subject<boolean>();
    public static isMessageDisplaying = false;

    horizontalPosition: MatSnackBarHorizontalPosition = 'end';
    verticalPosition: MatSnackBarVerticalPosition = 'bottom';

    constructor(private toastEvokeService: ToastEvokeService, private errorHandleService: ErrorHandleService) 
    {}

    public displayConfirmation(message: string, title?: string)
    {
        this.toastEvokeService.success("Подтверждение", message).subscribe();
    }

    public displayInfo(message: string, title?: string)
    {
        this.toastEvokeService.info("Информация", message).subscribe();
    }

    public displayWarning(message: string, title?: string)
    {
        this.toastEvokeService.warning("Предупреждение", message).subscribe();
    }

    public displayError(error: any, comment?: string, title?: string)
    {
        let message = this.errorHandleService.getMessage(error);
        if (comment != undefined)
        {
            message = comment + ".\n" + message;
        }
        this.toastEvokeService.danger("Ошибка", message).subscribe();
    }

    public static setDefaultDisplayDuration(displayDurationSeconds: number): void
    {
        this.defaultDisplayDurationSeconds = displayDurationSeconds;
    }

    public static getDefaultDisplayDuration(): number
    {
        return this.defaultDisplayDurationSeconds;
    }
}
