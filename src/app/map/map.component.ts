import { Component, OnInit } from '@angular/core';
import { CovidApiService } from '../covid-api.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  // all state Data
  stateData = [];
  displayData = [];
  category: any;

  covidService: CovidApiService;
  subscription: any;
  subscription2: any;
  constructor(covidService: CovidApiService) {
    this.covidService = covidService;
  }

  ngOnInit(): void {
    // initialize api get data stuff
    this.covidService.fetchStateData();
    // subscribe to any changes to state data
    this.subscription = this.covidService.stateChanged.subscribe(
      () => {
        this.stateData = this.covidService.getStateData();
        console.log('map Data: ', this.stateData[0]);

      }
    );

    // subscribe to changes to data Category being displayed on the map
    this.subscription = this.covidService.categoryChanged.subscribe(
      () => {
        this.category = this.covidService.getCategory();
        console.log(this.stateData[0][this.category] );
        console.log('MAP...category: ', this.category);
        //console.log('category DATA: ', JSON.stringify(extractedData));

      }
    );
  }

}
