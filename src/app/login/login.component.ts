import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import {Router} from '@angular/router';
import { ErrorHandleService } from '../_services/error-handle.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  phone = '';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router,
    private errorHandleService: ErrorHandleService) { }

  ngOnInit(): void
  {
    if (this.tokenStorage.getToken())
    {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.phone = this.tokenStorage.getUser().phone;
      setTimeout(() => 
      {
        if (this.router.url == '/login')
        {
          this.router.navigate(['home']);
        }
      }, 2000);
    }
  }

  onSubmit(): void
  {
    let authSubscription = this.authService.login(this.form).subscribe({
      next: (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.phone = this.tokenStorage.getUser().phone;
      },
      error: (err) => {
        this.errorMessage = this.errorHandleService.getMessage(err);
        this.isLoginFailed = true;
      },
      complete: () => {
        authSubscription.unsubscribe();
        this.reloadPage();
      }
    });
  }

  reloadPage(): void
  {
    location.reload();
  }
}
