import { Component, OnInit, Input} from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  
  vis:boolean = false;
  @Input() dataWeather: any;

  constructor() { }

  ngOnInit() {
  }
}
