import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { CovidData } from '../app/model/covid-data';

@Injectable({
  providedIn: 'root'
})
export class CovidApiService {
  // base url to make api calls
  private baseURL = 'http://covidtracking.com/api/';
  // hold covid data after api call
  private covidData = [];
  // helps send data to subscribers
  dataSubject = new Subject<void>();

  constructor(private http: HttpClient) {
    this.http = http;
  }

  getData(): any{
    console.log('getData' + this.covidData);
    return this.covidData;
  }

  fetchCovidData(dataOption: string): any{
    const apiString = this.baseURL + dataOption;

    this.http.get<any>(apiString).subscribe(
      (data: any) => {
        console.log('test ' + JSON.stringify(data[0]));
        this.covidData = data[0];
        this.dataSubject.next();
        /*
        const extractedData = data.map((x: any) => {
          return {
            date: x.date,
            positive: x.positive,
            negative: x.negative,
            hospitalizedCurrently: x.hospitalizedCurrently
          };
        });
        */
      });
    console.log('from service ' + JSON.stringify(this.covidData));
  }
}
