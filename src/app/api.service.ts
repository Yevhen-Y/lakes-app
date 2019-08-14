import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILakeViewModel } from './models/lake.view-model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  configUrl: string;
  collection: string;
  lakeType: string;

  constructor(private http: HttpClient) {
    this.collection = '/lakes/'
    this.configUrl = 'http://localhost:8081' + this.collection;
  };

  public getAllLakes(): Observable<Object> {
    return this.http.get(this.configUrl).pipe(map(res => {
      return res;
    }))
  };

  public updateLake(typeOfLake: string, fishType: ILakeViewModel): Observable<any> {
    return this.http.put(this.configUrl + typeOfLake, fishType);
  };

}
