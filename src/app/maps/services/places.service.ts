// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { placesApiClient } from '../api';
import { Feature, PlacesResponse } from '../interfaces/places';
import { MapService } from './map.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];

  get isUserLocationReady(): boolean{
    return !!this.userLocation;
  }

  constructor( private placesApi : placesApiClient,
      private mapService: MapService ) { 
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number,number]>{
    return new Promise((resolve, reject)=>{
      navigator.geolocation.watchPosition(
        ( { coords } ) => {
          this.userLocation = [coords.longitude,coords.latitude];
          resolve(this.userLocation);
          },
          (
            (err) => {
              alert('No se pudo obtener la geolocalización');
              console.log(err);
              reject();
            }
          )
      );
    });
  }

  getPlacesByQuery( query: string = '' ){
    if(query.length === 0){
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }
    if(!this.userLocation) throw new Error("No hay userLocation");
    this.isLoadingPlaces = true;
    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: this.userLocation.join(',')
      }
    })
      .subscribe( resp => {
        console.log(resp.features);
        this.isLoadingPlaces = false;
        this.places = resp.features;
        this.mapService.createMarkersFromPlaces(this.places, this.userLocation!);
      });
  }

  deletePlaces(){
    this.places = [];
  }
  
}
