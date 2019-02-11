import { MapsService } from './../../../services/maps.service';
import { Component, OnInit } from '@angular/core';
import { AgmCoreModule } from '@agm/core';


@Component({
  selector: 'app-institucion',
  templateUrl: './institucion.component.html',
  styleUrls: ['./institucion.component.css']
})
export class InstitucionComponent implements OnInit {

  lat : string = '';
  lon : string = '';

  location : any;

  constructor(private map: MapsService) { }

  ngOnInit() {
    this.map.getLocation().subscribe(data =>{
      
      this.location = data;
      this.lat = this.location.latitude;
      this.lon = this.location.longitude;

    });
  }

}
