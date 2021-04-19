import { Component, OnInit, Output } from '@angular/core';
import { CovidApiService } from './covid-api.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'covid-tracker';
  covidData = [];
  selectedDate = '20210101';
  // set ma to default state
  selectedState = 'ma';

  // set strings for api calls
  private current = 'us';
  private stateData = 'states';

  private date = 'us/' + this.selectedDate + '.json';
  private stateMetadata = 'states/' + this.selectedState + '/info.json';
  private histStateData = 'states/' + this.selectedState + '/daily.json';

  activatedRoute: ActivatedRoute;
  covidService: CovidApiService;
  subscription: any;

  constructor(activatedRoute: ActivatedRoute, covidService: CovidApiService) {
    this.covidService = covidService;
    this.activatedRoute = activatedRoute;
  }

  ngOnInit() {
    this.covidService.fetchCovidData(this.current);

    this.subscription = this.covidService.dataSubject.subscribe(() => {
        this.covidData = this.covidService.getData();
      }
    );

    console.log(this.covidData);

  }

}

