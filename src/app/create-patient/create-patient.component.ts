import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { ErrorHandleService } from '../_services/error-handle.service';

@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.css']
})
export class CreatePatientComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isPasswordHidden = true;

  constructor(private authService: AuthService, private errorHandleService: ErrorHandleService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    let subscription = this.authService.registerPatient(this.form).subscribe({
      next: (data) =>
      {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      error: (err) =>
      {
        // this.errorMessage = err.error.message;
        this.errorMessage = this.errorHandleService.getMessage(err); // То же самое, что и выше, только может отловить больше ошибок
        this.isSignUpFailed = true;
      },
      complete: () =>
      {
        setTimeout(() => {
          this.router.navigate(['login']);
      }, 2000);
        subscription.unsubscribe();
      }
    });
  }
}
