import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { CharacteresComponent } from './characteres/characteres.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SharedModule } from '../shared/shared.module';
import { PagesService } from './services/pages.service';
import { HttpClientModule } from '@angular/common/http'
import { ImgBrokenDirective } from '../directives/img-broken.directive';

@NgModule({
  declarations: [
    PagesComponent,
    CharacteresComponent,
    FavoritesComponent,
    ImgBrokenDirective
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    PagesService
  ]
})
export class PagesModule { }
