import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import * as mapboxgl from 'mapbox-gl';

(mapboxgl as any).accessToken = 'pk.eyJ1IjoicmpjaHYiLCJhIjoiY2wybWEwbGV3MGI2bzNjcDdrZGUzczZydCJ9.aupwdUxtC9BKvyuLU1-RIQ';

if( !navigator.geolocation ){
  alert('Navegador no soporta el geolocalización')
  throw new Error('Navegador no soporta el geolocalización');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
