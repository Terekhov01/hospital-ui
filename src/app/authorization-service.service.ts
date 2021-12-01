import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthorizationServiceService {

  constructor() { }

  getCurrentUserId(): number
  {
    return 1;
  }

  getCurrentUserRole(): string
  {
    return "doctor";
  }
}
