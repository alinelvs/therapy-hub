import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Specialist } from '../../../shared/models/specialist';

@Injectable({
  providedIn: 'root',
})
export class SpecialistsService {
  private readonly BASE_API_URL = environment.baseURL;

  constructor(private http: HttpClient) { }

  public getAllSpecialists(): Observable<Specialist[]> {
    return this.http.get<Specialist[]>(`${this.BASE_API_URL}/specialists`);
  }

  public getSpecialistDetails(id: number): Observable<Specialist> {
    return this.http.get<Specialist[]>(`${this.BASE_API_URL}/specialists?id=${id}`)
      .pipe(
        map(specialists => specialists[0])
      );
  }
}
