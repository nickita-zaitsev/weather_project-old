import { Component, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
// import { MyServiceService } from './my-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myproject';
  api:String = 'b38332c2f1dae29f60f26c6745ec89a3';
  cnt:Number = 14;
  searchParams:any;
  city:String;
  res:any;
  data:any;
  error:any;
  flagError:boolean = false;
  selected = '1'
  sortList:any = [
    {id: 1, name: 'Сортировать дату по возрастанию'},
    {id: 2, name: 'Сортировать дату по убыванию'},
    {id: 3, name: 'Сортировать температуру по возрастанию'},
    {id: 4, name: 'Сортировать температуру по убыванию'}
  ]
  constructor(private http: HttpClient){}

  public form: FormGroup = new FormGroup({
    search: new FormControl()
  });
  ngOnInit() {
    this.searchParams = new URLSearchParams(location.search);
    this.city = this.searchParams.get('City')
    if(Boolean(this.city)){
      this.submit()
    }
  }
  onSortChange (idSort) {
    if(idSort === 1) {
      this.data.sort(this.increaseDate)
    }
    if(idSort === 2) {
      this.data.sort(this.reductionDate)
    }
    if(idSort === 3) {
      this.data.sort(this.increaseWeather)
    }
    if(idSort === 4) {
      this.data.sort(this.reductionWeather)
    }
  }
  increaseWeather (a, b) {
    return a.temp - b.temp;
  }
  increaseDate (a, b) {
    return a.id - b.id;
  }
  reductionDate (a, b) {
    return b.id - a.id;
  }
  reductionWeather (a, b) {
    return b.temp - a.temp;
  }
  submit  (){
    if(this.form.value.search){
      this.city = this.form.value.search;
    }
    history.pushState(null, null, `?City=${this.city}`)
    this.http.get(`http://api.openweathermap.org/data/2.5/forecast?cnt=${this.cnt}&q=${this.city}&lang=ru&units=metric&appid=${this.api}`)
    .subscribe((response)=>{
      this.res = Object.assign({}, response);
      this.prepareWeather();
      this.flagError = false
    },
    (err) => {
      this.data = [];
      this.flagError = true
      this.error = Object.assign({}, err.error);
    })
    this.form.reset()
  }

  prepareWeather () {
    this.data = [];
    this.res.list.forEach((e, index) => {
      this.data.push({
        id: index,
        date: e.dt_txt,
        temp: Math.round(e.main.temp),
        pressure: Math.round(e.main.pressure),
        humidity: e.main.humidity,
        weather: e.weather[0].description
      });
    });
    return this.data;
  }
}
