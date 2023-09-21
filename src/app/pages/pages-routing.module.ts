import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { CharacteresComponent } from './characteres/characteres.component';
import { FavoritesComponent } from './favorites/favorites.component';

const routes: Routes = [
  {
    path:'',
    component: PagesComponent,
    children: [
      {
        path: 'characteres',
        component: CharacteresComponent

      },
      {
        path: 'favorites',
        component: FavoritesComponent
      },
      {
        path: '',
        redirectTo: 'characteres',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'characteres',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
