import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor(private placeService: PlacesService,
    private mapService: MapService) { }

  ngAfterViewInit(): void {
    if (!this.placeService.userLocation)
      throw new Error("No hay placeService.userLocation");
      
    const map = new mapboxgl.Map({
      container: this.mapDivElement.nativeElement, // container ID
      // style: 'mapbox://styles/mapbox/streets-v11', // style URL
      style: 'mapbox://styles/mapbox/light-v10', // style URL
      center: this.placeService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
      });

    const popup = new mapboxgl.Popup()
      .setHTML(`
        <h6>Aquí estoy</h6>
        <span>Estoy en este lugar del mundo</span>
      `);  
    new mapboxgl.Marker({ color: 'red' })  
      .setLngLat(this.placeService.userLocation)
      .setPopup(popup)
      .addTo(map);
    this.mapService.setMap(map);
  }

}
