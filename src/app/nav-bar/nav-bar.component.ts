import { Component, OnInit } from '@angular/core';
import { CovidApiService } from '../covid-api.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  covidService: CovidApiService;

  constructor(covidService: CovidApiService) {
    this.covidService = covidService;
  }

  ngOnInit(): void {
  }

  changeCategory(statToDisplay: any){
    this.covidService.onChangeCategory(statToDisplay);
  }
}
