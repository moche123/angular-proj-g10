import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PagesService } from '../services/pages.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {
  public favorites$: Observable<any[]> = new Observable();

  constructor( private _apiService: PagesService ){}

  ngOnInit(): void {
    this.favorites$ = this._apiService.getFavorites();
  }

}
