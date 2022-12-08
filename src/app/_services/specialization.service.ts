import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Observable } from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SpecializationService
{
    private specializationAutocompleteOptions: string;

    constructor(private http: HttpClient, private tokenStorage: TokenStorageService)
    {
        this.specializationAutocompleteOptions = environment.apiUrl + "/specializations";
    }

    getSpecializationAutocompleteOptions(): Observable<Map<string, string[]>>
    {
        return this.http.get<Map<string, string[]>>(this.specializationAutocompleteOptions);
    }

    getSpecList(): Observable<any[]>{
      return this.http.get<any[]>(`${this.specializationAutocompleteOptions}/all`);
    }
}
