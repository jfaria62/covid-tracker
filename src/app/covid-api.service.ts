import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CovidApiService {
  // base url to make api calls
  private baseURL = 'https://api.covidtracking.com/v1/us/current.json';
  private stateURL = 'https://api.covidtracking.com/v1/states/current.json';

  // hold covid data after api call
  private nationalData = [];
  // holds all state data
  private stateData = [];
  // holds currenly selected category data for individual states
  private category = 'positive';

  // helps send data to subscribers
  nationalChanged = new Subject<void>();
  stateChanged = new Subject<void>();
  categoryChanged = new Subject<void>();
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  fetchNationalData(): any{
    // get data from api
    this.http.get<any>(this.baseURL).subscribe(
      (data: any) => {
        const extractedData = data;
        // map data to something manageable
        const stats = extractedData.map((x: any) => {
          return {
            date: x.date,
            positive: x.positive,
            hospitalizedCurrently: x.hospitalizedCurrently,
            death: x.death,
            positiveIncrease: x.positiveIncrease
            /*other data available:
              negative,
              inIcuCurrently,
              deathIncrease,
              hospitalizedIncrease,
              negativeIncrease
            */
          };
        });

        this.nationalData = stats;
        // console.log('test ' + JSON.stringify(stats));
        // emit data for components to subscribe to
        this.nationalChanged.next();
    });
  }

  fetchStateData(): any{

    this.http.get<any>(this.stateURL).subscribe(
      (data: any) => {
        const extractedData = data;
        // map data to something manageable
        const stats = extractedData.map((x: any) => {
          return {
            date: x.date,
            state: x.state,
            positive: x.positive,
            hospitalizedCurrently: x.hospitalizedCurrently,
            death: x.death,
            positiveIncrease: x.positiveIncrease
            /*other data available:
              negative,
              inIcuCurrently,
              deathIncrease,
              hospitalizedIncrease,
              negativeIncrease
            */
          };
        });

        this.stateData = stats;
        // console.log(stats);
        // emit data for components to subscribe/listen to
        this.stateChanged.next();

        // send out initial category to listeners
        this.categoryChanged.next();
    });
  }

  getStateData(): any{
    // console.log(this.stateData);
    return this.stateData;
  }

  getCategory(): any{
    return this.category;
  }

  // changes state category, updates subscribers like map component
  onChangeCategory(statToDisplay: any): any{
    this.category = statToDisplay;
    this.categoryChanged.next();
  }
  // get data for side Stat Boxes
  getData(): any{
    // console.log('getData' + this.covidData);
    return this.nationalData;
  }

}
