import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SpecializationService
{
    private specializationAutocompleteOptions: string;

    constructor(private http: HttpClient, private tokenStorage: TokenStorageService)
    {
        this.specializationAutocompleteOptions = "http://localhost:8080/specializations";
    }

    getSpecializationAutocompleteOptions(): Observable<Map<string, string[]>>
    {
        return this.http.get<Map<string, string[]>>(this.specializationAutocompleteOptions);
    }

    getSpecList(): Observable<any[]>{
      return this.http.get<any[]>(`${this.specializationAutocompleteOptions}/all`);
    }
}
