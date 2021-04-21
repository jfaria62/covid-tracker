import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';
import { CovidData } from '../app/model/covid-data';

@Injectable({
  providedIn: 'root'
})
export class CovidApiService {
  // base url to make api calls
  private baseURL = 'https://api.covidtracking.com/v1/';
  // hold covid data after api call

  private covidData = [];
  // helps send data to subscribers
  dataChanged = new Subject<void>();
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  fetchCovidData(dataOption: string): any{
    const apiString = this.baseURL + dataOption;

    this.http.get<any>(apiString).subscribe(
      (data: any) => {

        const extractedData = data;
        // map data to something manageable
        const stats = extractedData.map((x: any) => {
          return {
            date: x.date,
            positive: x.positive,
            negative: x.negative,
            hospitalizedCurrently: x.hospitalizedCurrently
          };
        });

        this.covidData = stats;
        console.log('test ' + JSON.stringify(stats));
        // emit data for components to subscribe to
        this.dataChanged.next();

    });
  }

  getData(): any{
    console.log('getData' + this.covidData);
    return this.covidData;
  }

}
