import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CommonUtilsService } from '../common-utils.service';

import { DoctorScheduleService } from '../doctor-schedule.service';
import { DoctorSharedShortInformationService } from '../doctor-shared-short-information.service';
import { FilterSettings } from '../schedule-filter/schedule-filter.filter-settings';
import { IDoctorScheduleAppointmentsData, DoctorScheduleAppointmentsDataDaily, ScheduleInterval } from './schedule-appointment.i-raw-data';
import {Router,ActivatedRoute} from "@angular/router";
import {AppointmentRegistrationInfoService} from "../appointment-registration-info.service";

@Component({
  selector: 'app-schedule-appointment-block',
  templateUrl: './schedule-appointment-block.component.html',
  styleUrls: ['./schedule-appointment-block.component.css'],
  // providers: [AppointmentRegistrationInfoService]
})
export class ScheduleAppointmentBlockComponent implements OnInit
{
  //Initializing with NaN to prevent possible errors of accessing uninitialized instance
  public requestedInformation: FilterSettings = new FilterSettings(NaN, new Date(), new Date());
  private doctorShortInformationSubscription: Subscription | undefined;
  private doctorAppointmentDataSubscription: Subscription | undefined;

  public doctorScheduleDailyAppointmentsArray: DoctorScheduleAppointmentsDataDaily[] = [];

  constructor(private doctorScheduleService: DoctorScheduleService, private doctorShortInfoService: DoctorSharedShortInformationService, public utilsService: CommonUtilsService, private router: Router, private appointmentRegistrationInfoService: AppointmentRegistrationInfoService)
  {
    console.log(this.router.getCurrentNavigation()?.extras.state);
  }

  ngOnInit(): void
  {
    this.doctorShortInformationSubscription = this.doctorShortInfoService.sharedRequestedInformationAsObservable.subscribe(sharedInformation =>
      {
        this.requestedInformation = sharedInformation;

        // if (isNaN(this.requestedInformation.getId()))
        // {
        //   console.log("NaN in onInit")
        //   // return;
        // }
        this.presentAppointmentDates();
      },
      (error) => alert("Internal error. \
                            Failed loading available appointments data to ScheduleAppointmentBlockComponent. \
                            Cannot invoke presentAppointmentDates method."));
  }

  goToAppointmentRegistrationUpdate(info: DoctorScheduleAppointmentsDataDaily, interval: ScheduleInterval): void {
    // this.appointmentRegistrationInfoService = new AppointmentRegistrationInfoService(info, interval);
    // this.appointmentRegistrationInfoService.info = info;
    // this.appointmentRegistrationInfoService.interval = interval;
    // this.appointmentRegistrationInfoService.


    // this.appointmentRegistrationInfoService.setId(info.getId());
    // this.appointmentRegistrationInfoService.setSpecializationName(info.getSpecializationName());
    // this.appointmentRegistrationInfoService.setDoctorName(info.getDoctorName());
    // this.appointmentRegistrationInfoService.setDate(info.getDate());
    //
    // this.appointmentRegistrationInfoService.setIntervalStartTime(interval.getIntervalStartTime());
    // this.appointmentRegistrationInfoService.setIsAssigned(interval.getIsAssigned());

    this.appointmentRegistrationInfoService.id.next(info.getId());
    this.appointmentRegistrationInfoService.specializationName.next(info.getSpecializationName());
    this.appointmentRegistrationInfoService.doctorName.next(info.getDoctorName());
    this.appointmentRegistrationInfoService.date.next(info.getDate());

    this.appointmentRegistrationInfoService.intervalStartTime.next(interval.getIntervalStartTime());
    this.appointmentRegistrationInfoService.isAssigned.next(interval.getIsAssigned());

    // this.appointmentRegistrationInfoService.changeDoctorName(info.getDoctorName());

    console.log("Written information to shared service!")

    // this.appointmentRegistrationInfoService.doctorName.subscribe(data => {
    //   console.log("WRITTEN: " + data);
    // })
    //
    // this.appointmentRegistrationInfoService.doctorName.unsubscribe();

    let result = this.router.navigate(['create-appointment-registration']);
  }

  presentAppointmentDates(): void
  {
    if (isNaN(this.requestedInformation.getId()))
    {
      // console.log("NaN after onInit")
      return;
    }

    let appointmentDataObservables = this.doctorScheduleService.getDoctorScheduleAppointmentDataObservables(
      this.requestedInformation.getId(),
      this.requestedInformation.getStartDate(),
      this.requestedInformation.getEndDate(),
      true);

    this.doctorAppointmentDataSubscription = appointmentDataObservables.pipe(
      catchError((error) =>
      {
        console.error();
        alert("Server inacessible or data malformed! Cannot load available appointment dates.");
        return of([]);
      })
    ).subscribe((doctorAppointmentsData) =>
      {
        let doctorScheduleAppointmentsSubjects = new BehaviorSubject<IDoctorScheduleAppointmentsData[]>([]);
        doctorScheduleAppointmentsSubjects.next(doctorAppointmentsData);

        //Here we assume that there is only one doctor contained in responce from server. Function on server is capable
        //of sending msny doctors' info, but we want to present data nicely so we create a request and recieve data of
        //the only doctor. Next if statement checks if server responds with relative information.
        if (doctorScheduleAppointmentsSubjects.value.length > 1)
        {
          alert("Server responce is invalid - multiple doctors' information recieved. Parsing first doctor.");
        }

        if (doctorScheduleAppointmentsSubjects.value.length === 0)
        {
          alert("No appointments available.");
        }

        if (doctorScheduleAppointmentsSubjects.value.length == 1) {
          console.log("Received one doctor's information")
        }

        let doctorScheduleAppointments = doctorScheduleAppointmentsSubjects.value[0];

        console.log("Specialization is: " + doctorScheduleAppointments.specializationName)

        let intervalCounter = 0;
        let curDate = this.requestedInformation.getStartDate();
        // console.log("cur date is: " + curDate.toISOString());
        // console.log("doctorScheduleAppointments.intervalCollection.length is: " + doctorScheduleAppointments.intervalCollection.length);
        let intervalArray: ScheduleInterval[] = [];
        let curInterval: ScheduleInterval;
        while (curDate <= this.requestedInformation.getEndDate() && intervalCounter < doctorScheduleAppointments.intervalCollection.length)
        {
          curInterval = new ScheduleInterval(doctorScheduleAppointments.intervalCollection[intervalCounter])
          // console.log("curInterval.getIntervalStartTime()" + curInterval.getIntervalStartTime().toISOString());
          if (datesHaveSameYearMonthAndDate(curDate, curInterval.getIntervalStartTime()))
          {
            // console.log("interval array push")
            intervalArray.push(curInterval);
            intervalCounter++;
          }
          else
          {
            // console.log("array length: " + intervalArray.length);
            if (intervalArray.length !== 0)
            {
              let doctorScheduleDailyAppointments = new DoctorScheduleAppointmentsDataDaily(doctorScheduleAppointments, new Date(curDate));
              doctorScheduleDailyAppointments.setIntervalCollection(intervalArray);

              this.doctorScheduleDailyAppointmentsArray.push(doctorScheduleDailyAppointments);
              // console.log("Pushing in array")
              intervalArray = [];
            }

            curDate.setDate(curDate.getDate() + 1);
          }
        }
      }, (error) =>
      {
        alert("Error translating data from server! Cannot load available appointment dates.");
        console.error();
      },
      () => {
        if (isNaN(this.requestedInformation.getId()))
        {
          console.log("NaN in update")
          return;
        } else {
          console.log("RequestedInformation is not NaN!")
        }
        console.log("Receiving information successful");
      });
  }

}

function datesHaveSameYearMonthAndDate(first: Date, second: Date): boolean
{
  if (first.getFullYear() === second.getFullYear() && first.getMonth() === second.getMonth() && first.getDate() === second.getDate())
  {
    return true;
  }
  return false;
}

