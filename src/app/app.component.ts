import { Component, OnInit, Output } from '@angular/core';
import { CovidApiService } from './covid-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'National Covid-19 Tracker';
  covidData = [];

  // set strings for api calls

  covidService: CovidApiService;
  subscription: any;

  constructor(covidService: CovidApiService) {
    this.covidService = covidService;
  }

  ngOnInit() {
    this.covidService.fetchNationalData();
    // country data for Stat Boxes
    // when country data changes, this listens
    this.subscription = this.covidService.nationalChanged.subscribe(
      () => {
        this.covidData = this.covidService.getData();
        // console.log('component here: ', this.covidData);
      }
    );
  }
}

