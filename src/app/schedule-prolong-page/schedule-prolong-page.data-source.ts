import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { map } from 'rxjs/operators';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { Interval, ScheduleTablePattern, TimeRounded } from "./schedule-prolong-page.i-raw-data";

export class SchedulePatternDataSource implements DataSource<AbstractControl>//, OnInit, OnDestroy
{
    public tableDataSubject = new BehaviorSubject<FormGroup>(new FormGroup({}));
    public tableDataObservable = this.tableDataSubject.pipe(map((rootFormGroup: FormGroup) => 
    {
        let rows = <FormArray> rootFormGroup.get("rows");

        if (rows == null)
        {
            return [];
        }

        let rowControls = <AbstractControl[]>rows.controls;
        return rowControls;
    }));

    private displayedColumns = new BehaviorSubject<string[]>(["1"]);

    constructor(private formBuilder: FormBuilder) 
    {
        this.tableDataSubject.next(  
            this.formBuilder.group({  
                rows: this.formBuilder.array(
                [
                    this.formBuilder.group(
                    {
                        cells: new FormArray(
                        [
                            this.formBuilder.group(
                            {
                                startTime: new FormControl(),
                                endTime: new FormControl()
                            },  
                            {
                                validators: [this.timeIntervalValidator()],
                                updateOn: 'change'
                            })
                        ])
                    })
                ])
            })
        );
    }

    displayPattern(schedulePattern: ScheduleTablePattern): void
    {
        let displayedColumnsTmp: string[] = [];
        let tableFormGroup = this.formBuilder.group({ rows: this.formBuilder.array([]) });

        //Fill column description
        for (let columnCounter = 1; columnCounter <= schedulePattern.daysLength; columnCounter++)
        {
            displayedColumnsTmp.push(String(columnCounter));
        }

        let maxIntervalAmount = 0;

        //Determine maximum interval amount that equals the amount of rows in table
        for (let dailyPattern of schedulePattern.scheduleDailyPatterns)
        {
            if (maxIntervalAmount < dailyPattern.getIntervals().length)
            {
                maxIntervalAmount = dailyPattern.getIntervals().length;
            }
        }

        //Create formgroup
        for (let rowCounter = 0; rowCounter < maxIntervalAmount; rowCounter++)
        {
            let rowArray = <FormArray>tableFormGroup.get("rows");
            rowArray.push(this.formBuilder.group({ cells: this.formBuilder.array([]) }));
            for (let columnCounter = 0; columnCounter < schedulePattern.daysLength; columnCounter++)
            {
                let curCellsGroup = <FormGroup>rowArray.get(String(rowCounter));
                let curCellsArray = <FormArray>curCellsGroup.get("cells");
                let curInterval: Interval = schedulePattern.scheduleDailyPatterns[columnCounter].getIntervals()[rowCounter];
                if (curInterval == null)
                {
                    curCellsArray.push(this.formBuilder.group(
                        {
                            startTime: new FormControl(""),
                            endTime: new FormControl("")
                        })
                    );
                }
                else
                {
                    curCellsArray.push(this.formBuilder.group(
                        {
                            startTime: new FormControl(curInterval.start.toStringHHMM()),
                            endTime: new FormControl(curInterval.end.toStringHHMM())
                        })
                    );
                }
            }
        }
        
        this.displayedColumns.next(displayedColumnsTmp);
        this.tableDataSubject.next(tableFormGroup);
    }

    getTableDataSubject(): BehaviorSubject<FormGroup>
    {
        let debug = this.tableDataSubject.value;
        return this.tableDataSubject;
    }

    connect(collectionViewer: CollectionViewer): Observable<AbstractControl[]>
    {
        return this.tableDataObservable;
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.tableDataSubject.complete();
        this.displayedColumns.complete();
    }

    getDisplayedColumns(): BehaviorSubject<string[]>
    {
        return this.displayedColumns;
    }

    getColumnAmount(): number
    {
        return this.displayedColumns.value.length;
    }

    addColumn(): void
    {
        let stateToUpdate = <FormGroup> this.tableDataSubject.value;
        let rows = <FormArray> stateToUpdate.get("rows");

        for (let rowNum = 0; rowNum < rows.length; rowNum++)
        {
            let row = <FormGroup> rows.get(String(rowNum));
            let cellArray = <FormArray> row.get("cells");

            let newCellControl = new FormGroup(
                {
                    startTime: new FormControl(),
                    endTime: new FormControl()
                },  
                {
                    validators: [this.timeIntervalValidator()],
                    updateOn: 'change'
                });

            cellArray.push(newCellControl);
        }

        this.tableDataSubject.next(stateToUpdate);

        let displayedColumnsToUpdate = this.displayedColumns.value;
        displayedColumnsToUpdate.push(String(displayedColumnsToUpdate.length + 1));
        this.displayedColumns.next(displayedColumnsToUpdate);
    }

    removeColumn(): void
    {
        let stateToUpdate = <FormGroup>this.tableDataSubject.value;
        let rows = <FormArray>stateToUpdate.get("rows");

        for (let rowNum = 0; rowNum < rows.length; rowNum++)
        {
            let row = <FormGroup> rows.get(String(rowNum));
            let cellArray = <FormArray> row.get("cells");

            cellArray.removeAt(cellArray.length - 1);
        }

        this.tableDataSubject.next(stateToUpdate);
        let displayedColumnsToUpdate = this.displayedColumns.value;
        displayedColumnsToUpdate.pop();
        this.displayedColumns.next(displayedColumnsToUpdate);
    }

    addRow(): void
    {
        let stateToUpdate = <FormGroup> this.tableDataSubject.value;
        let rows = <FormArray> stateToUpdate.get("rows");

        let newRow = this.formBuilder.group(
            {
                cells: this.formBuilder.array([])
            }
        );

        let newRowCellsArray = <FormArray> newRow.get("cells");
        for (let i = 0; i < this.displayedColumns.value.length; i++)
        {
            let curGroup = this.formBuilder.group(
            {
                startTime: new FormControl(),
                endTime: new FormControl()
            },
            {
                validators: [this.timeIntervalValidator()],
                updateOn: 'change'
            });

            newRowCellsArray.push(curGroup);
        }

        rows.push(newRow);

        this.tableDataSubject.next(stateToUpdate);
    }

    removeRow(): void
    {
        let stateToUpdate = <FormGroup>this.tableDataSubject.value;
        let rows = <FormArray>stateToUpdate.get("rows");

        rows.removeAt(rows.length - 1);

        this.tableDataSubject.next(stateToUpdate);
    }

    timeIntervalValidator(): ValidatorFn
    {
        return (intervalGroup: AbstractControl) =>
        {
            let startTime = new TimeRounded(), endTime = new TimeRounded();
            
            let startTimeForm = intervalGroup.get("startTime");
            let endTimeForm = intervalGroup.get("endTime");

            if(startTimeForm!.value == null && endTimeForm!.value == null)
            {
                return null;
            }

            if (startTimeForm!.value == null || endTimeForm!.value == null)
            {
                return { timeIntervalValidator: { message: "Input is invalid! One of cells contains exactly one time picker with input. Cannot associate it with an interval" } };
            }

            startTime.setTimeByString(startTimeForm!.value);
            endTime.setTimeByString(endTimeForm!.value);

            if (endTime.getHour() === 0 && endTime.getMinute() === 0)
            {
                return null;
            }

            if (!endTime.isAfter(startTime))
            {
                return { timeIntervalValidator: { message: "Time in the second input field: '" + endTimeForm!.value 
                                                    + "' is before than time in the first input field: '" + startTimeForm!.value + "'!" } };
            }
            
            return null;
        }
    }
}